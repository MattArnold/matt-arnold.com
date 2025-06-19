#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Input and output files
const auditFile = path.join(__dirname, 'audit-embeds.json');
const outputFile = path.join(__dirname, 'embed-content-analysis.json');
const progressFile = path.join(__dirname, 'fetch-progress.json');

// Function to fetch and parse a Dreamwidth URL
async function fetchOriginalEmbed(url) {
    try {
        console.log(`Fetching: ${url}`);
        
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            timeout: 15000
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        // Look for embed content
        const embeds = {
            iframes: [],
            ljEmbedContent: [],
            rawEmbedHtml: []
        };
        
        // Find LiveJournal/Dreamwidth embed content wrappers
        const ljEmbedWrappers = document.querySelectorAll('.lj_embedcontent-wrapper, .dw_embedcontent-wrapper');
        ljEmbedWrappers.forEach(wrapper => {
            const iframe = wrapper.querySelector('iframe');
            if (iframe) {
                embeds.ljEmbedContent.push({
                    wrapperHtml: wrapper.outerHTML,
                    iframe: {
                        src: iframe.src,
                        width: iframe.width,
                        height: iframe.height,
                        id: iframe.id,
                        name: iframe.name,
                        allowfullscreen: iframe.hasAttribute('allowfullscreen')
                    }
                });
            }
        });
        
        // Find all iframes
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            embeds.iframes.push({
                src: iframe.src,
                width: iframe.width,
                height: iframe.height,
                allowfullscreen: iframe.hasAttribute('allowfullscreen'),
                outerHTML: iframe.outerHTML
            });
        });
        
        // Get raw HTML segments containing embed-related content
        const embedKeywords = ['embed', 'iframe', 'video', 'youtube', 'vimeo'];
        embedKeywords.forEach(keyword => {
            const regex = new RegExp(`<[^>]*${keyword}[^>]*>.*?</[^>]*>`, 'gi');
            const matches = html.match(regex) || [];
            matches.forEach(match => {
                if (!embeds.rawEmbedHtml.includes(match)) {
                    embeds.rawEmbedHtml.push(match);
                }
            });
        });
        
        return {
            success: true,
            url: url,
            embeds: embeds,
            totalEmbedsFound: embeds.iframes.length + embeds.ljEmbedContent.length
        };
        
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return {
            success: false,
            url: url,
            error: error.message
        };
    }
}

// Function to load progress
function loadProgress() {
    if (fs.existsSync(progressFile)) {
        return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    }
    return { completed: [], results: [] };
}

// Function to save progress
function saveProgress(progress) {
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
}

// Main execution
async function main() {
    console.log('Starting embed content analysis...');
    
    // Read the audit file
    if (!fs.existsSync(auditFile)) {
        console.error(`Audit file not found: ${auditFile}`);
        console.error('Please run audit-embeds.js first.');
        process.exit(1);
    }
    
    const auditData = JSON.parse(fs.readFileSync(auditFile, 'utf8'));
    console.log(`Found ${auditData.results.length} entries to analyze`);
    
    // Extract unique URLs to fetch
    const urlsToFetch = [...new Set(auditData.results.map(result => result.frontmatterOriginalUrl))];
    console.log(`Need to fetch ${urlsToFetch.length} unique URLs...`);
    
    // Load previous progress
    const progress = loadProgress();
    const remainingUrls = urlsToFetch.filter(url => !progress.completed.includes(url));
    
    console.log(`Already completed: ${progress.completed.length}`);
    console.log(`Remaining: ${remainingUrls.length}`);
    
    // Process remaining URLs in batches
    const batchSize = 3;
    for (let i = 0; i < remainingUrls.length; i += batchSize) {
        const batch = remainingUrls.slice(i, i + batchSize);
        console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(remainingUrls.length / batchSize)}`);
        
        for (const url of batch) {
            const result = await fetchOriginalEmbed(url);
            progress.results.push(result);
            progress.completed.push(url);
            
            // Save progress after each URL
            saveProgress(progress);
            
            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log(`Completed ${progress.completed.length}/${urlsToFetch.length} URLs`);
        
        // Longer delay between batches
        if (i + batchSize < remainingUrls.length) {
            console.log('Waiting 3 seconds before next batch...');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    // Combine audit data with fetch results
    const combinedResults = auditData.results.map(auditResult => {
        const fetchResult = progress.results.find(fr => fr.url === auditResult.frontmatterOriginalUrl);
        return {
            ...auditResult,
            fetchResult: fetchResult
        };
    });
    
    // Analyze results
    const analysis = {
        totalUrlsAnalyzed: progress.results.length,
        successfulFetches: progress.results.filter(r => r.success).length,
        failedFetches: progress.results.filter(r => !r.success).length,
        totalEmbedsFound: progress.results.reduce((sum, r) => sum + (r.totalEmbedsFound || 0), 0)
    };
    
    // Create final output
    const output = {
        timestamp: new Date().toISOString(),
        analysis: analysis,
        originalAuditSummary: auditData.summary,
        results: combinedResults
    };
    
    // Write final results
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    
    console.log('\nAnalysis completed!');
    console.log(`Results written to: ${outputFile}`);
    console.log(`Progress file: ${progressFile}`);
    console.log('\nSummary:');
    console.log(`- URLs analyzed: ${analysis.totalUrlsAnalyzed}`);
    console.log(`- Successful fetches: ${analysis.successfulFetches}`);
    console.log(`- Failed fetches: ${analysis.failedFetches}`);
    console.log(`- Total embeds found: ${analysis.totalEmbedsFound}`);
    
    // Clean up progress file if all completed
    if (progress.completed.length === urlsToFetch.length) {
        fs.unlinkSync(progressFile);
        console.log('Progress file cleaned up (all URLs processed)');
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nGracefully shutting down... Progress has been saved.');
    process.exit(0);
});

// Run the script
main().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
});
