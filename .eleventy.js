const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');


module.exports = function(eleventyConfig) {

  // Content change detection and tracking
  const contentPaths = [
    'src/blog/',
    'src/img/'
  ];

  const isContentFile = (filePath) => {
    // Specific content paths (blog posts and images)
    if (contentPaths.some(contentPath => filePath.includes(contentPath))) {
      return true;
    }
    
    // Main index page content
    if (filePath === 'src/index.njk') {
      return true;
    }
    
    // Page content files (not templates)
    if (filePath.includes('src/pages/') && filePath.match(/\.(md|html)$/)) {
      return true;
    }
    
    // Image files anywhere in src (but not in excluded directories)
    if (filePath.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) && 
        !filePath.includes('_includes/') && 
        !filePath.includes('_data/') &&
        !filePath.includes('scripts/') &&
        !filePath.includes('styles/')) {
      return true;
    }
    
    // Markdown content files
    if (filePath.match(/\.md$/) && 
        !filePath.includes('_includes/') && 
        !filePath.includes('_data/')) {
      return true;
    }
    
    return false;
  };

  const updateContentTracking = () => {
    try {
      const contentUpdatesPath = path.join(__dirname, 'src/_data/content-updates.yml');
      let contentData = {};
      
      // Read existing content-updates.yml
      if (fs.existsSync(contentUpdatesPath)) {
        const yamlContent = fs.readFileSync(contentUpdatesPath, 'utf8');
        contentData = yaml.load(yamlContent) || {};
      }

      // Get git status to find changed files
      let changedFiles = [];
      try {
        const gitStatus = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8', cwd: __dirname });
        changedFiles = gitStatus.split('\n').filter(file => file.trim());
      } catch (error) {
        // Fallback: check if we're in a git repo and get unstaged changes
        try {
          const gitUnstaged = execSync('git diff --name-only', { encoding: 'utf8', cwd: __dirname });
          changedFiles = gitUnstaged.split('\n').filter(file => file.trim());
        } catch (e) {
          console.log('No git repository found, skipping automatic content tracking');
          return;
        }
      }

      // Filter for content files and generate page links
      const contentChanges = changedFiles.filter(isContentFile);
      
      if (contentChanges.length > 0) {
        const now = new Date();
        const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Initialize structure if needed
        if (!contentData.updates) {
          contentData.updates = [];
        }

        // Generate page links from changed files
        const links = contentChanges.map(file => {
          if (file.includes('src/blog/')) {
            const slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
            return { url: `/blog/${slug}`, title: `Blog: ${slug.replace(/-/g, ' ')}` };
          } else if (file.includes('src/pages/')) {
            const pageName = path.basename(file, '.njk');
            return { url: `/${pageName}`, title: pageName.charAt(0).toUpperCase() + pageName.slice(1) };
          } else if (file.includes('src/index.njk')) {
            return { url: '/', title: 'Home' };
          } else if (file.includes('src/img/')) {
            return { url: '/gallery', title: 'Gallery (new image)' };
          } else {
            return { url: '/', title: `Updated: ${path.basename(file)}` };
          }
        }).filter((link, index, self) => 
          self.findIndex(l => l.url === link.url) === index // Remove duplicates
        );

        // Update last content update date
        contentData.lastContentUpdate = dateString;

        // Add new update entry
        const updateEntry = {
          date: dateString,
          description: `Auto-detected content changes: ${contentChanges.map(f => path.basename(f)).join(', ')}`,
          type: 'auto',
          files: contentChanges,
          links: links
        };

        // Avoid duplicate entries for the same day
        const existingIndex = contentData.updates.findIndex(update => update.date === dateString && update.type === 'auto');
        if (existingIndex >= 0) {
          contentData.updates[existingIndex] = updateEntry;
        } else {
          contentData.updates.unshift(updateEntry);
        }

        // Keep only last 50 updates
        contentData.updates = contentData.updates.slice(0, 50);

        // Write back to file
        const yamlOutput = yaml.dump(contentData, {
          indent: 2,
          lineWidth: 120,
          noRefs: true
        });

        fs.writeFileSync(contentUpdatesPath, yamlOutput);
        console.log(`✓ Updated content tracking: ${contentChanges.length} content files changed`);
      }
    } catch (error) {
      console.warn('Warning: Could not update content tracking:', error.message);
    }
  };

  // Only run content tracking in production builds to avoid infinite loops in watch mode
  eleventyConfig.on('eleventy.before', () => {
    // Skip auto-tracking during development/watch mode to prevent infinite rebuild loops
    if (process.env.ELEVENTY_ENV === 'production' || process.env.NODE_ENV === 'production') {
      updateContentTracking();
    } else {
      console.log('Skipping content tracking in development mode');
    }
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('favicon.png');
  eleventyConfig.addPassthroughCopy('favicon-16.png');
  eleventyConfig.addPassthroughCopy('favicon-32.png');
  eleventyConfig.addPassthroughCopy('favicon.svg');

  // Add build timestamp as global data
  eleventyConfig.addGlobalData("buildTime", () => {
    return new Date();
  });


  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
      const { DateTime } = require("luxon");
      if (typeof dateObj === "string") {
        return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat("LLLL d, yyyy");
      }
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("LLLL d, yyyy");
    });

  // Add a collection for blog posts
  eleventyConfig.addCollection('blog', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blog/*.md').sort((a, b) => b.date - a.date);
  });

  // Add a collection for pages
  eleventyConfig.addCollection('pages', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/pages/*.njk');
  });

  // Add a collection for galleries
  eleventyConfig.addCollection("galleries", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/gallery/*.md");
  });

  // Add a collection for all unique tags
  eleventyConfig.addCollection('allTags', function(collectionApi) {
    const tagSet = new Set();
    collectionApi.getFilteredByGlob('src/blog/*.md').forEach(item => {
      if (Array.isArray(item.data.tags)) {
        item.data.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
  });

  // Add Nunjucks filter for split
  eleventyConfig.addNunjucksFilter("split", function(str, separator) {
    if (typeof str === "string") {
      return str.split(separator);
    }
    return [];
  });

  // Shortcode for dynamic gallery grid (images + optional video)
  eleventyConfig.addShortcode("galleryGrid", function(images, video) {
    // Combine assets
    let assets = Array.isArray(images) ? [...images] : [];
    if (video && video.src) {
      assets.push({ video: true, src: video.src, caption: video.caption });
    }
    const count = assets.length;
    const cols = Math.ceil(Math.sqrt(count));
    // Start grid container
    let html = `<div class=\"grid gap-6\" style=\"grid-template-columns: repeat(${cols}, minmax(0,1fr));\">`;
    // Render each asset
    assets.forEach(asset => {
      if (asset.video) {
        html += `
          <figure class=\"space-y-2\">` +
                  `<video controls class=\"w-full h-auto rounded-lg shadow-md object-contain\">` +
                    `<source src=\"${asset.src}\" type=\"video/mp4\" />` +
                  `</video>` +
                  (asset.caption ? `<figcaption class=\"text-sm text-gray-600 dark:text-parchment-400\">${asset.caption}</figcaption>` : '') +
                `</figure>`;
      } else {
        html += `
          <figure class=\"space-y-2\">` +
                  `<img src=\"${asset.src}\" alt=\"${asset.caption || this.title}\" class=\"w-full h-auto rounded-lg shadow-md object-contain\" />` +
                  (asset.caption ? `<figcaption class=\"text-sm text-gray-600 dark:text-parchment-400\">${asset.caption}</figcaption>` : '') +
                `</figure>`;
      }
    });
    html += `</div>`;
    return html;
  });

  // Register as Nunjucks shortcode too
  eleventyConfig.addNunjucksShortcode("galleryGrid", function(images, video) {
    let assets = Array.isArray(images) ? [...images] : [];
    if (video && video.src) assets.push({ video: true, src: video.src, caption: video.caption });
    const count = assets.length;
    const cols = Math.ceil(Math.sqrt(count));
    let html = `<div class=\"grid gap-6\" style=\"grid-template-columns: repeat(${cols}, minmax(0,1fr));\">`;
    assets.forEach(asset => {
      if (asset.video) {
        html += `
          <figure class=\"space-y-2\">` +
                `<video controls class=\"w-full h-auto rounded-lg shadow-md object-contain\">` +
                  `<source src=\"${asset.src}\" type=\"video/mp4\" />` +
                `</video>` +
                (asset.caption ? `<figcaption class=\"text-sm text-gray-600 dark:text-parchment-400\">${asset.caption}</figcaption>` : '') +
              `</figure>`;
      } else {
        html += `
          <figure class=\"space-y-2\">` +
                `<img src=\"${asset.src}\" alt=\"${asset.caption || this.title}\" class=\"w-full h-auto rounded-lg shadow-md object-contain\" />` +
                (asset.caption ? `<figcaption class=\"text-sm text-gray-600 dark:text-parchment-400\">${asset.caption}</figcaption>` : '') +
              `</figure>`;
      }
    });
    html += `</div>`;
    return html;
  });

  // Global helper to compute number of gallery grid columns
  eleventyConfig.addNunjucksGlobal("gridCols", function(images = [], video) {
    let count = Array.isArray(images) ? images.length : 0;
    if (video && video.src) count++;
    return Math.ceil(Math.sqrt(count || 1));
  });

  return {
    dir: { input: 'src', output: '_site' }
  };
};
