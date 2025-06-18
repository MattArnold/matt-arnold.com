/**
 * Blog filtering functionality
 * Handles tag and year filtering with URL parameter management
 */

import { utils } from './utils.js';

export class BlogFilters {
  constructor() {
    this.activeTag = null;
    this.activeYear = null;
    this.tagButtons = [];
    this.yearButtons = [];
    this.postItems = [];
  }

  /**
   * Initialize the blog filtering system
   */
  init() {
    // Cache DOM elements with error handling
    this.tagButtons = utils.safeQuerySelectorAll('.tag-filter-btn[data-tag]');
    this.yearButtons = utils.safeQuerySelectorAll('.year-filter-btn[data-year]');
    this.postItems = utils.safeQuerySelectorAll('section ul > li[data-tags]');
    
    // Early return if essential elements are missing
    if (!this.tagButtons.length && !this.yearButtons.length && !this.postItems.length) {
      console.info('Blog filtering elements not found - skipping filter initialization');
      return;
    }

    this.initializeFromURL();
    this.bindEvents();
    this.updateClearButtons();
  }

  /**
   * Get parameter from URL query string
   */
  getParamFromQuery(param) {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
    } catch (error) {
      console.warn('Failed to parse URL parameters:', error);
      return null;
    }
  }

  /**
   * Filter posts by active tag and/or year
   */
  filterPosts() {
    this.postItems.forEach(li => {
      const tags = li.getAttribute('data-tags') || '';
      const year = li.getAttribute('data-year');
      const tagMatch = !this.activeTag || tags.split(',').map(t => t.trim()).includes(this.activeTag);
      const yearMatch = !this.activeYear || year === this.activeYear;
      li.style.display = (tagMatch && yearMatch) ? '' : 'none';
    });

    // Update button states
    this.updateButtonStates();
  }

  /**
   * Update visual state of filter buttons
   */
  updateButtonStates() {
    // Reset all buttons
    this.tagButtons.forEach(b => b.classList.remove('bg-blue-400', 'text-white'));
    this.yearButtons.forEach(b => b.classList.remove('bg-blue-400', 'text-white'));
    
    // Highlight active buttons
    if (this.activeTag) {
      this.tagButtons.forEach(b => {
        if (b.getAttribute('data-tag') === this.activeTag) {
          b.classList.add('bg-blue-400', 'text-white');
        }
      });
    }
    
    if (this.activeYear) {
      this.yearButtons.forEach(b => {
        if (b.getAttribute('data-year') === this.activeYear) {
          b.classList.add('bg-blue-400', 'text-white');
        }
      });
    }
  }

  /**
   * Update URL query string to reflect current filters
   */
  updateQuery() {
    try {
      const url = new URL(window.location);
      
      if (this.activeTag) {
        url.searchParams.set('tag', this.activeTag);
      } else {
        url.searchParams.delete('tag');
      }
      
      if (this.activeYear) {
        url.searchParams.set('year', this.activeYear);
      } else {
        url.searchParams.delete('year');
      }
      
      window.history.replaceState({}, '', url);
    } catch (error) {
      console.warn('Failed to update URL:', error);
    }
  }

  /**
   * Initialize filters from URL parameters
   */
  initializeFromURL() {
    const initialTag = this.getParamFromQuery('tag');
    const initialYear = this.getParamFromQuery('year');
    
    if (initialTag) this.activeTag = initialTag;
    if (initialYear) this.activeYear = initialYear;
    
    if (this.activeTag || this.activeYear) {
      this.filterPosts();
    }
  }

  /**
   * Update clear filter buttons visibility and text
   */
  updateClearButtons() {
    const clearYearBtn = utils.safeQuerySelector('#clear-year-btn');
    const clearTagBtn = utils.safeQuerySelector('#clear-tag-btn');
    const clearFiltersDiv = utils.safeQuerySelector('#clear-filters');
    
    if (!clearYearBtn || !clearTagBtn || !clearFiltersDiv) {
      // Elements don't exist on this page, skip filter UI
      return;
    }

    // Update year clear button
    if (this.activeYear) {
      clearYearBtn.textContent = `Clear ${this.activeYear}`;
      clearYearBtn.classList.remove('hidden');
    } else {
      clearYearBtn.classList.add('hidden');
    }

    // Update tag clear button
    if (this.activeTag) {
      clearTagBtn.textContent = `Clear ${this.activeTag}`;
      clearTagBtn.classList.remove('hidden');
    } else {
      clearTagBtn.classList.add('hidden');
    }

    // Show/hide clear filters container
    if (this.activeTag || this.activeYear) {
      clearFiltersDiv.classList.remove('hidden');
    } else {
      clearFiltersDiv.classList.add('hidden');
    }
  }

  /**
   * Apply filters and update UI state
   */
  filterPostsAndUpdateButtons() {
    this.filterPosts();
    this.updateClearButtons();
  }

  /**
   * Handle tag button click
   */
  handleTagClick(tag) {
    if (this.activeTag === tag) {
      this.activeTag = null;
    } else {
      this.activeTag = tag;
    }
    this.filterPostsAndUpdateButtons();
    this.updateQuery();
  }

  /**
   * Handle year button click
   */
  handleYearClick(year) {
    if (this.activeYear === year) {
      this.activeYear = null;
    } else {
      this.activeYear = year;
    }
    this.filterPostsAndUpdateButtons();
    this.updateQuery();
  }

  /**
   * Clear tag filter
   */
  clearTag() {
    this.activeTag = null;
    this.filterPostsAndUpdateButtons();
    this.updateQuery();
  }

  /**
   * Clear year filter
   */
  clearYear() {
    this.activeYear = null;
    this.filterPostsAndUpdateButtons();
    this.updateQuery();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Tag filter buttons
    this.tagButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        this.handleTagClick(tag);
      });
    });

    // Year filter buttons
    this.yearButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const year = btn.getAttribute('data-year');
        this.handleYearClick(year);
      });
    });

    // Clear buttons (using event delegation for dynamic elements)
    document.addEventListener('click', (e) => {
      if (e.target.id === 'clear-year-btn') {
        this.clearYear();
      } else if (e.target.id === 'clear-tag-btn') {
        this.clearTag();
      }
    });
  }
}
