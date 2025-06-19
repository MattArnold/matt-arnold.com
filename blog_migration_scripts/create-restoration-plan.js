#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Input file
const analysisFile = path.join(__dirname, 'embed-content-analysis.json');
const outputFile = path.join(__dirname, 'embed-restoration-plan.json');

// Function to extract video URLs from embed content
function extractVideoUrls(embeds) {
    const videoUrls = [];
    const urlPatterns = [
        /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g,
        /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/g,
        /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/g,
        /https?:\/\/player\.vimeo\.com\/video\/(\d+)/g
    ];
    
    // Check all embed HTML content
    const allHtml = [
        ...embeds.rawEmbedHtml,
        ...embeds.iframes.map(iframe => iframe.outerHTML || ''),
        ...embeds.ljEmbedContent.map(content => content.wrapperHtml || '')
    ].join(' ');
    
    // Extract YouTube URLs
    let match;
    const youtubePattern = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;
    while ((match = youtubePattern.exec(allHtml)) !== null) {
        videoUrls.push({
            type: 'YouTube',
            videoId: match[1],
            originalUrl: match[0],
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allowfullscreen></iframe>`
        });
    }
    
    const youtubeShortPattern = /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/g;
    while ((match = youtubeShortPattern.exec(allHtml)) !== null) {
        videoUrls.push({
            type: 'YouTube',
            videoId: match[1],
            originalUrl: match[0],
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allowfullscreen></iframe>`
        });
    }
    
    // Extract Vimeo URLs
    const vimeoPattern = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/g;
    while ((match = vimeoPattern.exec(allHtml)) !== null) {
        videoUrls.push({
            type: 'Vimeo',
            videoId: match[1],
            originalUrl: match[0],
            embedCode: `<iframe src="https://player.vimeo.com/video/${match[1]}" width="640" height="360" frameborder="0" allowfullscreen></iframe>`
        });
    }
    
    const vimeoPlayerPattern = /https?:\/\/player\.vimeo\.com\/video\/(\d+)/g;
    while ((match = vimeoPlayerPattern.exec(allHtml)) !== null) {
        videoUrls.push({
            type: 'Vimeo',
            videoId: match[1],
            originalUrl: match[0],
            embedCode: `<iframe src="https://player.vimeo.com/video/${match[1]}" width="640" height="360" frameborder="0" allowfullscreen></iframe>`
        });
    }
    
    // Remove duplicates
    const uniqueUrls = videoUrls.filter((url, index, self) => 
        index === self.findIndex(u => u.type === url.type && u.videoId === url.videoId)
    );
    
    return uniqueUrls;
}

// Function to analyze Dreamwidth embed URLs
function analyzeDreamwidthEmbeds(embeds) {
    const dreamwidthEmbeds = [];
    
    embeds.iframes.forEach(iframe => {
        if (iframe.src && iframe.src.includes('embedded.dreamwidth.net')) {
            const urlParams = new URLSearchParams(iframe.src.split('?')[1]);
            dreamwidthEmbeds.push({
                journalId: urlParams.get('journalid'),
                moduleId: urlParams.get('moduleid'),
                originalSrc: iframe.src,
                width: iframe.width,
                height: iframe.height,
                allowfullscreen: iframe.allowfullscreen
            });
        }
    });
    
    return dreamwidthEmbeds;
}

// Main processing function
function main() {
    console.log('Creating embed restoration plan...');
    
    if (!fs.existsSync(analysisFile)) {
        console.error(`Analysis file not found: ${analysisFile}`);
        console.error('Please run fetch-embed-content-batch.js first.');
        process.exit(1);
    }
    
    const analysisData = JSON.parse(fs.readFileSync(analysisFile, 'utf8'));
    
    const restorationPlan = {
        timestamp: new Date().toISOString(),
        summary: {
            totalPosts: analysisData.results.length,
            postsWithSuccessfulFetch: 0,
            postsWithVideoUrls: 0,
            postsWithDreamwidthOnly: 0,
            totalVideoUrlsFound: 0,
            byVideoType: {}
        },
        posts: []
    };
    
    analysisData.results.forEach(result => {
        const postData = {
            title: result.title,
            mdFile: result.correspondingMdFile,
            originalUrl: result.frontmatterOriginalUrl,
            siteEmbedTags: result.siteEmbedTags,
            fetchSuccessful: result.fetchResult?.success || false,
            videoUrls: [],
            dreamwidthEmbeds: [],
            restorationStatus: 'unknown'
        };
        
        if (result.fetchResult?.success) {
            restorationPlan.summary.postsWithSuccessfulFetch++;
            
            // Extract video URLs
            postData.videoUrls = extractVideoUrls(result.fetchResult.embeds);
            
            // Extract Dreamwidth embed info
            postData.dreamwidthEmbeds = analyzeDreamwidthEmbeds(result.fetchResult.embeds);
            
            // Determine restoration status
            if (postData.videoUrls.length > 0) {
                postData.restorationStatus = 'can_restore';
                restorationPlan.summary.postsWithVideoUrls++;
                restorationPlan.summary.totalVideoUrlsFound += postData.videoUrls.length;
                
                // Count by video type
                postData.videoUrls.forEach(video => {
                    restorationPlan.summary.byVideoType[video.type] = 
                        (restorationPlan.summary.byVideoType[video.type] || 0) + 1;
                });
            } else if (postData.dreamwidthEmbeds.length > 0) {
                postData.restorationStatus = 'dreamwidth_only';
                restorationPlan.summary.postsWithDreamwidthOnly++;
            } else {
                postData.restorationStatus = 'no_embeds_found';
            }
        } else {
            postData.restorationStatus = 'fetch_failed';
        }
        
        restorationPlan.posts.push(postData);
    });
    
    // Write the restoration plan
    fs.writeFileSync(outputFile, JSON.stringify(restorationPlan, null, 2));
    
    console.log('Restoration plan created!');
    console.log(`Results written to: ${outputFile}`);
    console.log('\nSummary:');
    console.log(`- Total posts: ${restorationPlan.summary.totalPosts}`);
    console.log(`- Posts with successful fetch: ${restorationPlan.summary.postsWithSuccessfulFetch}`);
    console.log(`- Posts with video URLs found: ${restorationPlan.summary.postsWithVideoUrls}`);
    console.log(`- Posts with Dreamwidth embeds only: ${restorationPlan.summary.postsWithDreamwidthOnly}`);
    console.log(`- Total video URLs found: ${restorationPlan.summary.totalVideoUrlsFound}`);
    
    if (Object.keys(restorationPlan.summary.byVideoType).length > 0) {
        console.log('\nVideo types found:');
        Object.entries(restorationPlan.summary.byVideoType).forEach(([type, count]) => {
            console.log(`- ${type}: ${count}`);
        });
    }
    
    console.log('\nPosts that can be restored:');
    restorationPlan.posts
        .filter(post => post.restorationStatus === 'can_restore')
        .forEach(post => {
            console.log(`\n"${post.title}"`);
            console.log(`  MD file: ${path.basename(post.mdFile)}`);
            post.videoUrls.forEach(video => {
                console.log(`  - ${video.type}: ${video.originalUrl}`);
            });
        });
    
    console.log('\nPosts that need manual investigation (Dreamwidth embeds only):');
    restorationPlan.posts
        .filter(post => post.restorationStatus === 'dreamwidth_only')
        .forEach(post => {
            console.log(`\n"${post.title}"`);
            console.log(`  MD file: ${path.basename(post.mdFile)}`);
            console.log(`  Original URL: ${post.originalUrl}`);
            post.dreamwidthEmbeds.forEach((embed, i) => {
                console.log(`  - Embed ${i + 1}: module ${embed.moduleId}, ${embed.width}x${embed.height}`);
            });
        });
}

main();
