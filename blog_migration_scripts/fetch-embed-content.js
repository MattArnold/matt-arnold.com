#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Input and output files
const auditFile = path.join(__dirname, 'audit-embeds.json');
const outputFile = path.join(__dirname, 'embed-content-analysis.json');

// Function to fetch and parse a Dreamwidth URL
async function fetchOriginalEmbed(url) {
    try {
        console.log(`Fetching: ${url}`);
        
        // Use dynamic import for node-fetch
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000 // 10 second timeout
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        // Look for various types of embeds
        const embeds = {
            iframes: [],
            videos: [],
            embeddedContent: [],
            ljEmbedContent: [],
            scripts: []
        };
        
        // Find iframes (likely YouTube, Vimeo, etc.)
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            embeds.iframes.push({
                src: iframe.src,
                width: iframe.width,
                height: iframe.height,
                title: iframe.title,
                allowfullscreen: iframe.hasAttribute('allowfullscreen'),
                frameborder: iframe.frameborder,
                class: iframe.className,
                id: iframe.id
            });
        });
        
        // Find video elements
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            embeds.videos.push({
                src: video.src,
                poster: video.poster,
                controls: video.hasAttribute('controls'),
                autoplay: video.hasAttribute('autoplay'),
                loop: video.hasAttribute('loop'),
                width: video.width,
                height: video.height
            });
        });
        
        // Find LiveJournal/Dreamwidth embed content wrappers
        const ljEmbedWrappers = document.querySelectorAll('.lj_embedcontent-wrapper, .dw_embedcontent-wrapper');
        ljEmbedWrappers.forEach(wrapper => {
            const iframe = wrapper.querySelector('iframe');
            if (iframe) {
                embeds.ljEmbedContent.push({
                    wrapperClass: wrapper.className,
                    wrapperStyle: wrapper.getAttribute('style'),
                    iframe: {
                        src: iframe.src,
                        width: iframe.width,
                        height: iframe.height,
                        id: iframe.id,
                        name: iframe.name,
                        class: iframe.className
                    }
                });
            }
        });
        
        // Find any embed-related scripts
        const scripts = document.querySelectorAll('script[src*="embed"], script[src*="youtube"], script[src*="vimeo"], script[src*="player"]');
        scripts.forEach(script => {
            embeds.scripts.push({
                src: script.src,
                type: script.type
            });
        });
        
        // Look for any other embedded content indicators
        const embedSelectors = [
            '[class*="embed"]',
            '[id*="embed"]',
            '[src*="youtube"]',
            '[src*="vimeo"]',
            '[src*="player"]',
            'object[data]',
            'embed[src]'
        ];
        
        embedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!embeds.embeddedContent.some(existing => 
                    existing.tagName === el.tagName && 
                    existing.src === (el.src || el.getAttribute('data'))
                )) {
                    embeds.embeddedContent.push({
                        tagName: el.tagName,
                        src: el.src || el.getAttribute('data'),
                        className: el.className,
                        id: el.id,
                        outerHTML: el.outerHTML.substring(0, 500) // Truncate for readability
                    });
                }
            });
        });
        
        return {
            success: true,
            url: url,
            embeds: embeds,
            totalEmbedsFound: embeds.iframes.length + embeds.videos.length + embeds.ljEmbedContent.length + embeds.embeddedContent.length
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

// Function to analyze embed content and suggest restoration strategies
function analyzeEmbeds(results) {
    const analysis = {
        totalUrlsAnalyzed: results.length,
        successfulFetches: results.filter(r => r.success).length,
        failedFetches: results.filter(r => !r.success).length,
        totalEmbedsFound: results.reduce((sum, r) => sum + (r.totalEmbedsFound || 0), 0),
        embedTypes: {
            iframes: 0,
            videos: 0,
            ljEmbedContent: 0,
            scripts: 0,
            other: 0
        },
        videoSources: {},
        restorationStrategies: []
    };
    
    results.forEach(result => {
        if (result.success && result.embeds) {
            analysis.embedTypes.iframes += result.embeds.iframes.length;
            analysis.embedTypes.videos += result.embeds.videos.length;
            analysis.embedTypes.ljEmbedContent += result.embeds.ljEmbedContent.length;
            analysis.embedTypes.scripts += result.embeds.scripts.length;
            analysis.embedTypes.other += result.embeds.embeddedContent.length;
            
            // Analyze video sources
            result.embeds.iframes.forEach(iframe => {
                if (iframe.src) {
                    const url = new URL(iframe.src, 'https://dreamwidth.org');
                    const domain = url.hostname;
                    analysis.videoSources[domain] = (analysis.videoSources[domain] || 0) + 1;
                }
            });
            
            result.embeds.ljEmbedContent.forEach(embed => {
                if (embed.iframe && embed.iframe.src) {
                    const url = new URL(embed.iframe.src, 'https://dreamwidth.org');
                    const domain = url.hostname;
                    analysis.videoSources[domain] = (analysis.videoSources[domain] || 0) + 1;
                }
            });
        }
    });
    
    // Generate restoration strategies
    if (analysis.videoSources['www.youtube.com'] || analysis.videoSources['youtube.com']) {
        analysis.restorationStrategies.push({
            type: 'YouTube',
            count: (analysis.videoSources['www.youtube.com'] || 0) + (analysis.videoSources['youtube.com'] || 0),
            strategy: 'Extract video IDs from iframe src and create new YouTube embed codes'
        });
    }
    
    if (analysis.videoSources['vimeo.com'] || analysis.videoSources['player.vimeo.com']) {
        analysis.restorationStrategies.push({
            type: 'Vimeo',
            count: (analysis.videoSources['vimeo.com'] || 0) + (analysis.videoSources['player.vimeo.com'] || 0),
            strategy: 'Extract video IDs from iframe src and create new Vimeo embed codes'
        });
    }
    
    if (analysis.videoSources['embedded.dreamwidth.net']) {
        analysis.restorationStrategies.push({
            type: 'Dreamwidth Embedded Content',
            count: analysis.videoSources['embedded.dreamwidth.net'],
            strategy: 'These are Dreamwidth-specific embeds that proxy other services. May need to trace back to original source.'
        });
    }
    
    return analysis;
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
    console.log(`Fetching ${urlsToFetch.length} unique URLs...`);
    
    // Fetch embed content from each URL (with delay to be respectful)
    const fetchResults = [];
    for (let i = 0; i < urlsToFetch.length; i++) {
        const url = urlsToFetch[i];
        console.log(`Progress: ${i + 1}/${urlsToFetch.length}`);
        
        const result = await fetchOriginalEmbed(url);
        fetchResults.push(result);
        
        // Add delay between requests to be respectful to the server
        if (i < urlsToFetch.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        }
    }
    
    // Analyze the results
    const analysis = analyzeEmbeds(fetchResults);
    
    // Combine audit data with fetch results
    const combinedResults = auditData.results.map(auditResult => {
        const fetchResult = fetchResults.find(fr => fr.url === auditResult.frontmatterOriginalUrl);
        return {
            ...auditResult,
            fetchResult: fetchResult
        };
    });
    
    // Create final output
    const output = {
        timestamp: new Date().toISOString(),
        analysis: analysis,
        originalAuditSummary: auditData.summary,
        results: combinedResults
    };
    
    // Write results
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    
    console.log('\nAnalysis completed!');
    console.log(`Results written to: ${outputFile}`);
    console.log('\nSummary:');
    console.log(`- URLs analyzed: ${analysis.totalUrlsAnalyzed}`);
    console.log(`- Successful fetches: ${analysis.successfulFetches}`);
    console.log(`- Failed fetches: ${analysis.failedFetches}`);
    console.log(`- Total embeds found: ${analysis.totalEmbedsFound}`);
    console.log('\nEmbed types found:');
    Object.entries(analysis.embedTypes).forEach(([type, count]) => {
        if (count > 0) {
            console.log(`- ${type}: ${count}`);
        }
    });
    console.log('\nVideo sources:');
    Object.entries(analysis.videoSources).forEach(([domain, count]) => {
        console.log(`- ${domain}: ${count}`);
    });
    
    if (analysis.restorationStrategies.length > 0) {
        console.log('\nRecommended restoration strategies:');
        analysis.restorationStrategies.forEach(strategy => {
            console.log(`\n${strategy.type} (${strategy.count} embeds):`);
            console.log(`  ${strategy.strategy}`);
        });
    }
}

// Run the script
main().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
});
