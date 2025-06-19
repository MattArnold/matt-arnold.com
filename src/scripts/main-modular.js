/**
 * Main entry point for website functionality
 * Orchestrates initialization of all feature modules
 */

import '../styles/main.css';
import { initModule } from './modules/utils.js';
import { BlogFilters } from './modules/blogFilters.js';
import { ExcerptToggle } from './modules/excerptToggle.js';
import { MobileFilters } from './modules/mobileFilters.js';
import { TriangulationBackground } from './modules/triangulationBackground.js';
import { SiteSearch } from './search.js';

// Initialize all modules when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    console.info('Initializing website modules...');

    // Initialize blog filtering system
    initModule('Blog Filters', () => {
      const blogFilters = new BlogFilters();
      blogFilters.init();
    });

    // Initialize excerpt toggle functionality
    initModule('Excerpt Toggle', () => {
      const excerptToggle = new ExcerptToggle();
      excerptToggle.init();
    });

    // Initialize mobile filter UI
    initModule('Mobile Filters', () => {
      const mobileFilters = new MobileFilters();
      mobileFilters.init();
    });

    // Initialize triangulation background system
    initModule('Triangulation Background', () => {
      const triangulationBg = new TriangulationBackground();
      triangulationBg.init();
    });

    // Initialize search functionality
    initModule('Site Search', () => {
      window.siteSearch = new SiteSearch();
      window.initializeSearch();
    });

    console.info('All modules initialized successfully');
  });
}
