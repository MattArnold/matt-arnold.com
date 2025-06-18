/**
 * Excerpt toggle functionality
 * Handles showing/hiding excerpts and expanding individual posts
 */

import { utils } from './utils.js';

export class ExcerptToggle {
  constructor() {
    this.excerptsVisible = false;
  }

  /**
   * Initialize excerpt toggle functionality
   */
  init() {
    this.initGlobalToggle();
    this.initPerPostToggle();
  }

  /**
   * Initialize the global "Show/Hide excerpts" toggle
   */
  initGlobalToggle() {
    const toggleExcerptsBtn = utils.safeQuerySelector('#toggle-excerpts-btn');
    
    if (!toggleExcerptsBtn) {
      console.info('Global excerpt toggle button not found');
      return;
    }

    const excerptDivs = utils.safeQuerySelectorAll('.excerpt');
    const longExcerptDivs = utils.safeQuerySelectorAll('.long-excerpt');

    toggleExcerptsBtn.addEventListener('click', () => {
      this.excerptsVisible = !this.excerptsVisible;
      
      // Toggle excerpt visibility
      excerptDivs.forEach(div => {
        div.classList.toggle('hidden', !this.excerptsVisible);
      });
      
      // Hide all long excerpts when toggling
      longExcerptDivs.forEach(div => {
        div.classList.add('hidden');
      });
      
      // Update button text
      toggleExcerptsBtn.textContent = this.excerptsVisible ? 'Hide excerpts' : 'Show excerpts';
    });
  }

  /**
   * Initialize per-post excerpt expansion/collapse
   */
  initPerPostToggle() {
    // Handle "more" buttons (show long excerpt)
    const moreButtons = utils.safeQuerySelectorAll('.excerpt .more-btn');
    moreButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleMoreClick(e.target);
      });
    });

    // Handle "less" buttons (show short excerpt)
    const lessButtons = utils.safeQuerySelectorAll('.long-excerpt .less-btn');
    lessButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleLessClick(e.target);
      });
    });
  }

  /**
   * Handle "more" button click - expand to long excerpt
   */
  handleMoreClick(btn) {
    try {
      const excerptDiv = btn.closest('.excerpt');
      const longExcerptDiv = excerptDiv?.parentElement?.querySelector('.long-excerpt');
      
      if (excerptDiv && longExcerptDiv) {
        excerptDiv.classList.add('hidden');
        longExcerptDiv.classList.remove('hidden');
      }
    } catch (error) {
      console.warn('Failed to expand excerpt:', error);
    }
  }

  /**
   * Handle "less" button click - collapse to short excerpt
   */
  handleLessClick(btn) {
    try {
      const longExcerptDiv = btn.closest('.long-excerpt');
      const excerptDiv = longExcerptDiv?.parentElement?.querySelector('.excerpt');
      
      if (longExcerptDiv && excerptDiv) {
        longExcerptDiv.classList.add('hidden');
        excerptDiv.classList.remove('hidden');
      }
    } catch (error) {
      console.warn('Failed to collapse excerpt:', error);
    }
  }
}
