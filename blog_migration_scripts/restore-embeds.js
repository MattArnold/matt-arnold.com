#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Input file
const restorationPlanFile = path.join(__dirname, 'embed-restoration-plan.json');

// Function to create modern embed code
function createEmbedCode(video) {
    switch (video.type) {
        case 'YouTube':
            return `<div class="video-embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.videoId}" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
</div>`;
        
        case 'Vimeo':
            return `<div class="video-embed">
<iframe src="https://player.vimeo.com/video/${video.videoId}" 
        width="640" height="360" frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen></iframe>
</div>`;
        
        default:
            return `<!-- Unknown video type: ${video.type} -->`;
    }
}

// Function to restore embeds in markdown file
function restoreEmbedsInFile(filePath, videoUrls, siteEmbedTags) {
    console.log(`\nRestoring embeds in: ${path.basename(filePath)}`);
    
    if (!fs.existsSync(filePath)) {
        console.error(`  ERROR: File not found: ${filePath}`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // First try to find the site-embed tags directly
    siteEmbedTags.forEach((tag, index) => {
        if (videoUrls[index] && content.includes(tag)) {
            const video = videoUrls[index];
            const embedCode = createEmbedCode(video);
            content = content.replace(tag, embedCode);
            console.log(`  ✓ Replaced ${tag} with ${video.type} embed (${video.videoId})`);
            hasChanges = true;
        }
    });
    
    // If no direct replacements found, look for patterns that suggest where embeds should go
    if (!hasChanges && videoUrls.length > 0) {
        const video = videoUrls[0]; // Use the first video
        const embedCode = createEmbedCode(video);
        
        // Look for common patterns where embeds were likely removed:
        // 1. Multiple consecutive blank lines
        // 2. Text that references a video but no video present
        // 3. Context clues from the post content
        
        const patterns = [
            /\n\n\n+/g,  // Multiple blank lines
            /(\. Do you have a second\?)\n\n+/g,  // Specific pattern from "Approaching Effortful Tasks As Play"
            /(Despite the ending of the video being a punchline[^.]*\.)\n\n+/g,
        ];
        
        for (const pattern of patterns) {
            const originalContent = content;
            
            if (pattern.test(content)) {
                // Replace the pattern with the embed
                content = content.replace(pattern, (match, ...args) => {
                    const prefix = args.length > 0 ? args[0] : '';
                    return prefix + '\n\n' + embedCode + '\n\n';
                });
                
                if (content !== originalContent) {
                    console.log(`  ✓ Inserted ${video.type} embed (${video.videoId}) using pattern matching`);
                    hasChanges = true;
                    break;
                }
            }
        }
        
        // If still no changes, insert after the first paragraph
        if (!hasChanges) {
            const lines = content.split('\n');
            const frontmatterEnd = lines.findIndex((line, index) => 
                index > 0 && line === '---'
            );
            
            if (frontmatterEnd !== -1) {
                // Find the first non-empty line after frontmatter
                let insertIndex = frontmatterEnd + 1;
                while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
                    insertIndex++;
                }
                
                // Skip the first paragraph, then insert
                while (insertIndex < lines.length && lines[insertIndex].trim() !== '') {
                    insertIndex++;
                }
                
                // Insert the embed after the first paragraph
                lines.splice(insertIndex, 0, '', embedCode, '');
                content = lines.join('\n');
                console.log(`  ✓ Inserted ${video.type} embed (${video.videoId}) after first paragraph`);
                hasChanges = true;
            }
        }
    }
    
    // Add any additional videos at the end
    if (videoUrls.length > 1) {
        for (let i = 1; i < videoUrls.length; i++) {
            const video = videoUrls[i];
            const embedCode = createEmbedCode(video);
            content += '\n\n' + embedCode;
            console.log(`  ✓ Appended ${video.type} embed (${video.videoId})`);
            hasChanges = true;
        }
    }
    
    if (hasChanges) {
        // Create backup
        const backupPath = filePath + '.backup-' + Date.now();
        fs.writeFileSync(backupPath, fs.readFileSync(filePath));
        console.log(`  📄 Backup created: ${path.basename(backupPath)}`);
        
        // Write updated content
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ File updated successfully`);
        return true;
    } else {
        console.log(`  ℹ No changes made - could not determine where to place embed`);
        return false;
    }
}

// Main function
function main() {
    console.log('Starting embed restoration...');
    
    if (!fs.existsSync(restorationPlanFile)) {
        console.error(`Restoration plan file not found: ${restorationPlanFile}`);
        console.error('Please run create-restoration-plan.js first.');
        process.exit(1);
    }
    
    const restorationPlan = JSON.parse(fs.readFileSync(restorationPlanFile, 'utf8'));
    
    // Find posts that can be restored
    const restorablePosts = restorationPlan.posts.filter(post => 
        post.restorationStatus === 'can_restore' && post.videoUrls.length > 0
    );
    
    console.log(`Found ${restorablePosts.length} posts that can be restored:`);
    
    const results = {
        timestamp: new Date().toISOString(),
        totalProcessed: 0,
        successful: 0,
        failed: 0,
        details: []
    };
    
    restorablePosts.forEach(post => {
        results.totalProcessed++;
        
        try {
            const success = restoreEmbedsInFile(
                post.mdFile,
                post.videoUrls,
                post.siteEmbedTags
            );
            
            if (success) {
                results.successful++;
                results.details.push({
                    file: post.mdFile,
                    title: post.title,
                    status: 'success',
                    videosRestored: post.videoUrls.length
                });
            } else {
                results.failed++;
                results.details.push({
                    file: post.mdFile,
                    title: post.title,
                    status: 'no_changes',
                    reason: 'No changes were made to the file'
                });
            }
        } catch (error) {
            results.failed++;
            results.details.push({
                file: post.mdFile,
                title: post.title,
                status: 'error',
                error: error.message
            });
            console.error(`  ERROR: ${error.message}`);
        }
    });
    
    // Write results
    const resultsFile = path.join(__dirname, 'embed-restoration-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('EMBED RESTORATION COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total processed: ${results.totalProcessed}`);
    console.log(`Successful: ${results.successful}`);
    console.log(`Failed: ${results.failed}`);
    console.log(`Results saved to: ${path.basename(resultsFile)}`);
    
    if (results.successful > 0) {
        console.log('\n✅ Successfully restored embeds in:');
        results.details
            .filter(d => d.status === 'success')
            .forEach(detail => {
                console.log(`   - ${detail.title} (${detail.videosRestored} video${detail.videosRestored > 1 ? 's' : ''})`);
            });
    }
    
    if (results.failed > 0) {
        console.log('\n⚠️  Issues with:');
        results.details
            .filter(d => d.status !== 'success')
            .forEach(detail => {
                console.log(`   - ${detail.title}: ${detail.reason || detail.error}`);
            });
    }
    
    // Show next steps
    const manualPosts = restorationPlan.posts.filter(post => 
        post.restorationStatus === 'dreamwidth_only'
    );
    
    if (manualPosts.length > 0) {
        console.log('\n📋 NEXT STEPS:');
        console.log(`${manualPosts.length} posts need manual investigation:`);
        manualPosts.forEach(post => {
            console.log(`   - "${post.title}"`);
            console.log(`     Check: ${post.originalUrl}`);
        });
        console.log('\nThese posts have Dreamwidth proxy embeddings that need to be traced back to their original sources.');
    }
}

main();
