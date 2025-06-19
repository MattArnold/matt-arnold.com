#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Paths
const dreamwidthDir = path.join(__dirname, '../dreamwidth');
const blogPostsDir = path.join(__dirname, '../src/blog');
const outputFile = path.join(__dirname, 'audit-embeds.json');

// Function to recursively search for files containing site-embed
function findFilesWithSiteEmbed(dir) {
    const results = [];
    
    function searchDirectory(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                searchDirectory(fullPath);
            } else if (stat.isFile() && path.extname(item) === '.html') {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    if (content.includes('site-embed')) {
                        // Extract site-embed tags with regex
                        const siteEmbedMatches = content.match(/<site-embed[^>]*>/g) || [];
                        
                        // Extract title from the HTML
                        const titleMatch = content.match(/<h3 class="entry-title"><a[^>]*>([^<]+)<\/a><\/h3>/);
                        const title = titleMatch ? titleMatch[1] : null;
                        
                        // Extract original URL from the HTML
                        const originalUrlMatch = content.match(/<a href="(https:\/\/nemorathwald\.dreamwidth\.org\/[^"]+)">Original<\/a>/);
                        const originalUrl = originalUrlMatch ? originalUrlMatch[1] : null;
                        
                        // Extract date from the HTML
                        const dateMatch = content.match(/<span class="datetime">([^<]+)<\/span>/);
                        const dateString = dateMatch ? dateMatch[1] : null;
                        
                        results.push({
                            htmlFile: fullPath,
                            title: title,
                            originalUrl: originalUrl,
                            dateString: dateString,
                            siteEmbedTags: siteEmbedMatches
                        });
                    }
                } catch (error) {
                    console.error(`Error reading file ${fullPath}:`, error.message);
                }
            }
        }
    }
    
    searchDirectory(dir);
    return results;
}

// Function to find corresponding markdown files
function findCorrespondingMarkdownFiles(htmlResults) {
    const results = [];
    
    for (const htmlResult of htmlResults) {
        let correspondingMdFile = null;
        let frontmatter = null;
        
        if (htmlResult.title) {
            // Search for markdown files containing this title
            try {
                const mdFiles = fs.readdirSync(blogPostsDir);
                
                for (const mdFile of mdFiles) {
                    if (path.extname(mdFile) === '.md') {
                        const mdFilePath = path.join(blogPostsDir, mdFile);
                        const content = fs.readFileSync(mdFilePath, 'utf8');
                        
                        // Check if this markdown file contains the title
                        if (content.includes(htmlResult.title)) {
                            correspondingMdFile = mdFilePath;
                            
                            // Extract frontmatter
                            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
                            if (frontmatterMatch) {
                                try {
                                    frontmatter = yaml.load(frontmatterMatch[1]);
                                } catch (yamlError) {
                                    console.error(`Error parsing YAML frontmatter in ${mdFilePath}:`, yamlError.message);
                                }
                            }
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error(`Error searching for markdown files:`, error.message);
            }
        }
        
        results.push({
            ...htmlResult,
            correspondingMdFile: correspondingMdFile,
            frontmatter: frontmatter,
            frontmatterOriginalUrl: frontmatter ? frontmatter.original_url : null
        });
    }
    
    return results;
}

// Main execution
console.log('Starting embed audit...');

// Step 1: Find HTML files with site-embed tags
console.log('Searching for site-embed tags in dreamwidth folder...');
const htmlFilesWithEmbeds = findFilesWithSiteEmbed(dreamwidthDir);
console.log(`Found ${htmlFilesWithEmbeds.length} HTML files with site-embed tags.`);

// Step 2: Find corresponding markdown files and extract frontmatter
console.log('Finding corresponding markdown files...');
const auditResults = findCorrespondingMarkdownFiles(htmlFilesWithEmbeds);

// Step 3: Generate summary statistics
const summary = {
    totalHtmlFilesWithEmbeds: auditResults.length,
    htmlFilesWithCorrespondingMd: auditResults.filter(r => r.correspondingMdFile).length,
    htmlFilesWithoutCorrespondingMd: auditResults.filter(r => !r.correspondingMdFile).length,
    totalSiteEmbedTags: auditResults.reduce((sum, r) => sum + r.siteEmbedTags.length, 0)
};

// Step 4: Create final audit object
const auditData = {
    summary: summary,
    timestamp: new Date().toISOString(),
    results: auditResults
};

// Step 5: Write results to JSON file
console.log('Writing audit results to file...');
fs.writeFileSync(outputFile, JSON.stringify(auditData, null, 2));

console.log('\nAudit completed!');
console.log(`Results written to: ${outputFile}`);
console.log('\nSummary:');
console.log(`- Total HTML files with site-embed tags: ${summary.totalHtmlFilesWithEmbeds}`);
console.log(`- HTML files with corresponding MD files: ${summary.htmlFilesWithCorrespondingMd}`);
console.log(`- HTML files without corresponding MD files: ${summary.htmlFilesWithoutCorrespondingMd}`);
console.log(`- Total site-embed tags found: ${summary.totalSiteEmbedTags}`);

// Step 6: Print detailed results
console.log('\nDetailed results:');
auditResults.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.title || 'Untitled'}`);
    console.log(`   HTML file: ${path.relative(__dirname, result.htmlFile)}`);
    console.log(`   MD file: ${result.correspondingMdFile ? path.relative(__dirname, result.correspondingMdFile) : 'NOT FOUND'}`);
    console.log(`   Original URL (HTML): ${result.originalUrl || 'Not found'}`);
    console.log(`   Original URL (frontmatter): ${result.frontmatterOriginalUrl || 'Not found'}`);
    console.log(`   Site-embed tags: ${result.siteEmbedTags.length}`);
    result.siteEmbedTags.forEach(tag => {
        console.log(`     - ${tag}`);
    });
});
