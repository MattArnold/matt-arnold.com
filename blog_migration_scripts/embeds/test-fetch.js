#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple test to fetch one URL
async function testFetch() {
    try {
        const fetch = (await import('node-fetch')).default;
        const testUrl = 'https://nemorathwald.dreamwidth.org/398359.html'; // "Approaching Effortful Tasks As Play"
        
        console.log(`Testing fetch of: ${testUrl}`);
        
        const response = await fetch(testUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            timeout: 15000
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        console.log(`Success! Fetched ${html.length} characters`);
        
        // Look for embed content in the HTML
        const embedMatches = html.match(/lj_embedcontent-wrapper.*?<\/div>/gs) || [];
        const iframeMatches = html.match(/<iframe[^>]*>/g) || [];
        
        console.log(`Found ${embedMatches.length} embed wrappers`);
        console.log(`Found ${iframeMatches.length} iframes`);
        
        if (embedMatches.length > 0) {
            console.log('\nEmbed content found:');
            embedMatches.forEach((match, i) => {
                console.log(`${i + 1}. ${match.substring(0, 200)}...`);
            });
        }
        
        if (iframeMatches.length > 0) {
            console.log('\nIframes found:');
            iframeMatches.forEach((match, i) => {
                console.log(`${i + 1}. ${match}`);
            });
        }
        
        return true;
        
    } catch (error) {
        console.error('Test failed:', error.message);
        return false;
    }
}

testFetch();
