const lunr = require('lunr');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { JSDOM } = require('jsdom');

module.exports = function() {
  // Collect all searchable content
  const documents = [];
  
  // Read blog posts
  const blogDir = path.join(__dirname, '../blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    blogFiles.forEach(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Generate URL from filename
      const slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const url = `/blog/${slug}/`;
      
      // Clean up content
      const textContent = content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      
      documents.push({
        id: url,
        title: data.title || '',
        content: textContent,
        date: data.date,
        tags: data.tags || [],
        url: url,
        excerpt: textContent.substring(0, 200).trim() + '...',
        type: 'blog'
      });
    });
  }
  
  // Read page files
  const pagesDir = path.join(__dirname, '../pages');
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.njk'));
    
    pageFiles.forEach(file => {
      const filePath = path.join(pagesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Skip if no permalink or content
      if (!data.permalink || !content) return;
      
      // Clean up content (remove Nunjucks tags for indexing)
      const textContent = content
        .replace(/\{%[^%]*%\}/g, '') // Remove Nunjucks tags
        .replace(/\{\{[^}]*\}\}/g, '') // Remove Nunjucks variables
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      documents.push({
        id: data.permalink,
        title: data.title || '',
        content: textContent,
        date: data.date,
        tags: data.tags || [],
        url: data.permalink,
        excerpt: textContent.substring(0, 200).trim() + '...',
        type: 'page'
      });
    });
  }
  
  console.log(`Search index: Found ${documents.length} documents to index`);
  
  // Create Lunr index
  const idx = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('content');
    this.field('tags', { boost: 5 });
    
    documents.forEach(doc => {
      try {
        this.add(doc);
      } catch (error) {
        console.warn(`Failed to index document ${doc.id}:`, error.message);
      }
    });
  });
  
  return {
    index: JSON.stringify(idx),
    documents: documents
  };
};
