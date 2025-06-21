// Error codes and messages for structured responses
const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    GITLAB_API_ERROR: 'GITLAB_API_ERROR',
    FILE_NOT_FOUND: 'FILE_NOT_FOUND',
    BRANCH_CREATE_ERROR: 'BRANCH_CREATE_ERROR',
    RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
};

const createErrorResponse = (statusCode, errorCode, message, details = null) => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
    },
    body: JSON.stringify({
        error: {
            code: errorCode,
            message,
            details,
            timestamp: new Date().toISOString()
        }
    })
});

const validateCommentInput = (body) => {
    const errors = [];
    const { name, email, message, postFilename } = body;

    // Required field validation
    if (!name?.trim()) errors.push('Name is required');
    if (!email?.trim()) errors.push('Email is required');
    if (!message?.trim()) errors.push('Message is required');
    if (!postFilename?.trim()) errors.push('Post filename is required');

    // Length validation
    if (name && name.length > 100) errors.push('Name must be 100 characters or less');
    if (message && message.length > 5000) errors.push('Message must be 5000 characters or less');

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Invalid email address format');
    }

    // Basic content validation
    if (message && message.trim().length < 5) {
        errors.push('Message must be at least 5 characters long');
    }

    // Check for suspicious content patterns
    const suspiciousPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /data:text\/html/gi
    ];
    
    const allText = `${name} ${email} ${message}`;
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(allText)) {
            errors.push('Content contains potentially harmful elements');
            break;
        }
    }

    return errors;
};

const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed:`, error.message);
            
            // Don't retry on certain error types
            if (error.message.includes('404') || error.message.includes('401') || error.message.includes('403')) {
                throw error;
            }
            
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    }
    
    throw lastError;
};

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return createErrorResponse(405, ERROR_CODES.VALIDATION_ERROR, 'Method not allowed');
    }

    // Environment variable validation
    if (!process.env.GITLAB_TOKEN) {
        console.error('Missing GITLAB_TOKEN environment variable');
        return createErrorResponse(500, ERROR_CODES.INTERNAL_ERROR, 'GitLab configuration missing');
    }
    
    if (!process.env.GITLAB_PROJECT_ID) {
        console.error('Missing GITLAB_PROJECT_ID environment variable');
        return createErrorResponse(500, ERROR_CODES.INTERNAL_ERROR, 'GitLab project ID missing');
    }

    try {
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (parseError) {
            return createErrorResponse(400, ERROR_CODES.VALIDATION_ERROR, 'Invalid JSON in request body');
        }

        const { name, email, message, postFilename } = body;

        // Input validation using the utility function
        const validationErrors = validateCommentInput(body);
        if (validationErrors.length > 0) {
            return createErrorResponse(400, ERROR_CODES.VALIDATION_ERROR, 'Validation failed', validationErrors);
        }

        const projectId = process.env.GITLAB_PROJECT_ID;
        const gitlabHost = process.env.GITLAB_HOST || 'https://gitlab.com';
        const token = process.env.GITLAB_TOKEN;
        
        const timestamp = new Date().toISOString();
        const commentId = Date.now().toString();
        const branchName = `comment-${postFilename}-${commentId}`;

        const fetch = (await import('node-fetch')).default;
        
        // Get project info to determine default branch
        const defaultBranch = await retryOperation(async () => {
            const projectUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}`;
            const projectResp = await fetch(projectUrl, { headers: { 'PRIVATE-TOKEN': token } });
            if (!projectResp.ok) {
                const errorText = await projectResp.text();
                throw new Error(`Failed to fetch project info: ${projectResp.status} ${errorText}`);
            }
            const project = await projectResp.json();
            return project.default_branch;
        });

        // Find the blog post file
        const blogPostPath = await retryOperation(async () => {
            const postsPath = 'src/blog';
            const perPage = 100;
            
            // Get the total number of pages
            const headResp = await fetch(`${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/repository/tree?ref=${defaultBranch}&path=${encodeURIComponent(postsPath)}&per_page=${perPage}`, {
                method: 'HEAD',
                headers: { 'PRIVATE-TOKEN': token },
            });
            
            if (!headResp.ok) {
                throw new Error(`Failed to get repository tree: ${headResp.status}`);
            }
            
            const totalPages = parseInt(headResp.headers.get('x-total-pages') || '1', 10);
            
            // Fetch the last page
            const postsUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/repository/tree?ref=${defaultBranch}&path=${encodeURIComponent(postsPath)}&per_page=${perPage}&page=${totalPages}`;
            const postsResponse = await fetch(postsUrl, {
                headers: { 'PRIVATE-TOKEN': token },
            });
            
            if (!postsResponse.ok) {
                throw new Error(`Failed to fetch posts directory: ${postsResponse.status}`);
            }
            
            const postsTree = await postsResponse.json();
            const targetFile = postsTree.find(f => f.name === postFilename);
            
            if (!targetFile) {
                throw new Error(`Blog post not found: ${postFilename}`);
            }
            
            return targetFile.path || `src/blog/${targetFile.name}`;
        });

        // Create new branch
        await retryOperation(async () => {
            const branchUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/repository/branches`;
            const branchPayload = { branch: branchName, ref: defaultBranch };
            const branchResp = await fetch(branchUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'PRIVATE-TOKEN': token },
                body: JSON.stringify(branchPayload),
            });
            
            if (!branchResp.ok && branchResp.status !== 400) { // 400 if branch already exists
                const errorText = await branchResp.text();
                throw new Error(`Failed to create branch: ${branchResp.status} ${errorText}`);
            }
            
            // Wait for branch to be available
            await new Promise(r => setTimeout(r, 1500));
        });

        // Get the current content of the blog post file and update it
        const updatedContent = await retryOperation(async () => {
            const fileShowUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(blogPostPath)}?ref=${defaultBranch}`;
            const fileShowResp = await fetch(fileShowUrl, { headers: { 'PRIVATE-TOKEN': token } });
            
            if (!fileShowResp.ok) {
                const errorText = await fileShowResp.text();
                throw new Error(`Failed to fetch file content: ${fileShowResp.status} ${errorText}`);
            }
            
            const blogPostFileContent = await fileShowResp.json();
            const currentContent = Buffer.from(blogPostFileContent.content, 'base64').toString('utf-8');

            // Remove placeholder 'none' if present
            const cleanedContent = currentContent.replace(/^[ \t]*none[ \t]*$/gm, '').trimEnd() + '\n';

            // Format the comment to append
            const commentHeader = `## ${name}`;
                
            const commentText = `
${commentHeader}

${message}

*Posted on ${new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*

---
`;
            
            return cleanedContent + commentText;
        });

        // Check if file exists on the new branch and update/create it
        const mergeRequestUrl = await retryOperation(async () => {
            // Check if the file exists on the new branch
            let fileExistsOnBranch = true;
            const fileShowBranchUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(blogPostPath)}?ref=${branchName}`;
            const fileShowBranchResp = await fetch(fileShowBranchUrl, { headers: { 'PRIVATE-TOKEN': token } });
            
            if (fileShowBranchResp.status === 404) {
                fileExistsOnBranch = false;
            } else if (!fileShowBranchResp.ok) {
                const errorText = await fileShowBranchResp.text();
                throw new Error(`Failed to check file on new branch: ${fileShowBranchResp.status} ${errorText}`);
            }

            // Update or create the blog post file on the new branch
            const fileUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(blogPostPath)}`;
            const filePayload = {
                branch: branchName,
                content: updatedContent,
                commit_message: `Add comment by ${name} on ${postFilename}`,
            };
            
            const fileMethod = fileExistsOnBranch ? 'PUT' : 'POST';
            const fileResponse = await fetch(fileUrl, {
                method: fileMethod,
                headers: {
                    'Content-Type': 'application/json',
                    'PRIVATE-TOKEN': token,
                },
                body: JSON.stringify(filePayload),
            });
            
            if (!fileResponse.ok) {
                const errorText = await fileResponse.text();
                throw new Error(`GitLab API file ${fileMethod === 'PUT' ? 'edit' : 'create'} failed: ${fileResponse.status} ${errorText}`);
            }

            // Create merge request
            const mrUrl = `${gitlabHost}/api/v4/projects/${encodeURIComponent(projectId)}/merge_requests`;
            const mrPayload = {
                source_branch: branchName,
                target_branch: defaultBranch,
                title: `Comment: ${postFilename}`,
                description: `Automated comment submission for ${postFilename}`,
            };
            
            const mrResponse = await fetch(mrUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'PRIVATE-TOKEN': token,
                },
                body: JSON.stringify(mrPayload),
            });
            
            if (!mrResponse.ok) {
                const errorText = await mrResponse.text();
                throw new Error(`GitLab API merge request failed: ${mrResponse.status} ${errorText}`);
            }
            
            const mergeRequest = await mrResponse.json();
            return mergeRequest.web_url;
        });
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
            },
            body: JSON.stringify({
                message: 'Comment submitted successfully! It will appear after moderation.',
                mergeRequestUrl: mergeRequestUrl,
            }),
        };

    } catch (error) {
        console.error('Error processing comment:', error);
        console.error('Error stack:', error.stack);
        
        // Determine error type and return appropriate response
        if (error.message.includes('Blog post not found')) {
            return createErrorResponse(404, ERROR_CODES.FILE_NOT_FOUND, 'Blog post not found', error.message);
        }
        
        if (error.message.includes('Failed to create branch')) {
            return createErrorResponse(500, ERROR_CODES.BRANCH_CREATE_ERROR, 'Failed to create branch', error.message);
        }
        
        if (error.message.includes('GitLab API') || error.message.includes('Failed to fetch')) {
            return createErrorResponse(502, ERROR_CODES.GITLAB_API_ERROR, 'GitLab API error', error.message);
        }
        
        if (error.message.includes('rate limit') || error.message.includes('429')) {
            return createErrorResponse(429, ERROR_CODES.RATE_LIMIT_ERROR, 'Rate limit exceeded', 'Please try again later');
        }
        
        // Generic server error
        return createErrorResponse(500, ERROR_CODES.INTERNAL_ERROR, 'Internal server error', 
            process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred');
    }
};

// Export utility functions for testing
module.exports = {
    handler: exports.handler,
    validateCommentInput,
    createErrorResponse,
    ERROR_CODES,
    retryOperation
};