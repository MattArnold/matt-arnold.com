/**
 * Mobile filter UI functionality
 * Handles responsive filter panel show/hide behavior
 */

import { utils } from './utils.js';

export class MobileFilters {
  /**
   * Initialize mobile filter toggle functionality
   */
  init() {
    const collapseFiltersBtn = utils.safeQuerySelector('#collapse-filters-btn');
    const showFiltersBtn = utils.safeQuerySelector('#show-filters-btn');
    const filtersAside = utils.safeQuerySelector('#filters-aside');
    
    // Check if all required elements exist
    if (!collapseFiltersBtn || !showFiltersBtn || !filtersAside) {
      console.info('Mobile filter elements not found - skipping mobile filter initialization');
      return;
    }

    this.bindEvents(collapseFiltersBtn, showFiltersBtn, filtersAside);
  }

  /**
   * Bind mobile filter toggle events
   */
  bindEvents(collapseBtn, showBtn, filtersAside) {
    // Handle collapse button click
    collapseBtn.addEventListener('click', () => {
      this.hideFilters(filtersAside, collapseBtn, showBtn);
    });
    
    // Handle show button click
    showBtn.addEventListener('click', () => {
      this.showFilters(filtersAside, collapseBtn, showBtn);
    });
  }

  /**
   * Hide the filters panel
   */
  hideFilters(filtersAside, collapseBtn, showBtn) {
    try {
      // Hide the aside and the collapse button
      filtersAside.classList.add('hidden');
      collapseBtn.classList.add('hidden');
      
      // Show the show filters button
      showBtn.classList.remove('hidden');
    } catch (error) {
      console.warn('Failed to hide filters:', error);
    }
  }

  /**
   * Show the filters panel
   */
  showFilters(filtersAside, collapseBtn, showBtn) {
    try {
      // Show the aside and the collapse button
      filtersAside.classList.remove('hidden');
      collapseBtn.classList.remove('hidden');
      
      // Hide the show filters button
      showBtn.classList.add('hidden');
    } catch (error) {
      console.warn('Failed to show filters:', error);
    }
  }
}
