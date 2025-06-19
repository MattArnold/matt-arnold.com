#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Posts that need "video unavailable" treatment
const postsToUpdate = [
    {
        file: '2009-01-08-take-your-photo-in-an-art-installation.md',
        title: 'Take Your Photo In An Art Installation',
        description: 'This post originally contained an embedded video about an interactive art installation that encouraged viewers to take their photos as part of the artistic experience.'
    },
    {
        file: '2006-08-25-embryo-snuff-film.md', 
        title: 'Embryo Snuff Film',
        description: 'This post originally contained an embedded video with provocative content related to embryonic development, likely used to illustrate a point about ethics or science communication.'
    },
    {
        file: '2006-09-19-hodgman-and-coulton.md',
        title: 'Hodgman and Coulton', 
        description: 'This post originally contained an embedded video featuring John Hodgman and Jonathan Coulton, likely a comedic or musical performance.'
    },
    {
        file: '2006-10-05-epcot-in-1982.md',
        title: 'EPCOT in 1982',
        description: 'This post originally contained an embedded video showcasing EPCOT Center as it appeared in 1982, during its early years as Disney\'s experimental prototype community.'
    },
    {
        file: '2006-11-08-ln2-ice-cream-video.md',
        title: 'LN2 Ice Cream Video',
        description: 'This post originally contained an embedded video demonstrating the process of making ice cream using liquid nitrogen (LN2), showcasing the intersection of science and culinary arts.'
    },
    {
        file: '2006-11-13-morality-is-as-real-and-unreal-as-any-other-software.md',
        title: 'Morality is as real and unreal as any other software.',
        description: 'This post originally contained an embedded video that explored philosophical concepts about the nature of morality, likely used to illustrate the author\'s perspective on ethics as a constructed system.'
    }
    // Note: Roy Zimmerman post already handled manually
];

const blogPostsDir = path.join(__dirname, '../src/blog/posts');

function updatePostWithUnavailableVideo(postInfo) {
    const filePath = path.join(blogPostsDir, postInfo.file);
    
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${postInfo.file}`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has content (not just frontmatter and comments)
    const lines = content.split('\n');
    const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line === '---');
    const commentsStart = lines.findIndex(line => line === '## Comments');
    
    // Count non-empty lines between frontmatter and comments
    let contentLines = 0;
    for (let i = frontmatterEnd + 1; i < (commentsStart === -1 ? lines.length : commentsStart); i++) {
        if (lines[i].trim() !== '') {
            contentLines++;
        }
    }
    
    if (contentLines > 0) {
        console.log(`Skipping ${postInfo.file} - already has content`);
        return false;
    }
    
    // Find where to insert the content
    const insertionPoint = commentsStart === -1 ? lines.length : commentsStart;
    
    // Create the content to insert
    const videoUnavailableContent = [
        '',
        `*[This post originally contained an embedded video, but the video is no longer available on the original platform.]*`,
        '',
        postInfo.description,
        ''
    ];
    
    // Insert the content
    lines.splice(insertionPoint, 0, ...videoUnavailableContent);
    
    // Write back to file
    const newContent = lines.join('\n');
    
    // Create backup
    const backupPath = filePath + '.backup-unavailable-' + Date.now();
    fs.writeFileSync(backupPath, content);
    
    // Write new content
    fs.writeFileSync(filePath, newContent);
    
    console.log(`✓ Updated ${postInfo.file}`);
    console.log(`  Backup: ${path.basename(backupPath)}`);
    return true;
}

function main() {
    console.log('Updating posts with unavailable video indicators...\n');
    
    let updated = 0;
    let skipped = 0;
    
    postsToUpdate.forEach(postInfo => {
        if (updatePostWithUnavailableVideo(postInfo)) {
            updated++;
        } else {
            skipped++;
        }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('UPDATE COMPLETE');
    console.log('='.repeat(50));
    console.log(`Posts updated: ${updated}`);
    console.log(`Posts skipped: ${skipped}`);
    
    if (updated > 0) {
        console.log('\nUpdated posts now include:');
        console.log('- Clear indication that a video was originally embedded');
        console.log('- Brief description of what the video contained');
        console.log('- Explanation that the video is no longer available');
        console.log('\nThis provides context for readers while acknowledging the missing content.');
    }
}

main();
