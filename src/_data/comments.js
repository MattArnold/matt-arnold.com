const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function() {
    const commentsDir = path.join(__dirname, 'comments');
    const comments = {};

    if (!fs.existsSync(commentsDir)) {
        return comments;
    }

    // Read all post directories
    const postDirs = fs.readdirSync(commentsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    postDirs.forEach(postSlug => {
        const postCommentsDir = path.join(commentsDir, postSlug);
        const commentFiles = fs.readdirSync(postCommentsDir)
            .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));

        comments[postSlug] = [];

        commentFiles.forEach(file => {
            try {
                const filePath = path.join(postCommentsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const comment = yaml.load(fileContent);
                
                // Only include approved comments
                if (comment && comment.approved) {
                    comments[postSlug].push(comment);
                }
            } catch (error) {
                console.error(`Error reading comment file ${file}:`, error);
            }
        });

        // Sort comments by date
        comments[postSlug].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return comments;
};
