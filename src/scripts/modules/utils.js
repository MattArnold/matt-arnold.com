/**
 * Shared utility functions and configuration
 * Used across multiple modules for consistent behavior
 */

// Configuration constants
export const CONFIG = {
  triangulation: {
    width: 400,
    height: 100,
    minDistance: 40,
    maxAttempts: 50,
    targetInteriorPoints: 6,
    buffer: 24, // 1.5rem buffer for blog posts
    minArea: 100,
    maxArea: 5000,
    strokeWidth: 0.5,
    opacityRange: { min: 0.5, max: 0.8 }
  },
  debounce: {
    backgroundAdjustment: 100,
    resize: 250
  },
  colors: {
    dark: {
      gradientId: 'randomGrad',
      gradientColors: [
        { offset: '0%', color: '#161d54', opacity: 0.8 },
        { offset: '50%', color: '#1e2b8a', opacity: 0.6 },
        { offset: '100%', color: '#2a4ca8', opacity: 0.4 }
      ],
      stroke: '#4a5d7a'
    },
    light: {
      gradientId: 'randomGrad',
      gradientColors: [
        { offset: '0%', color: '#f3f7f3', opacity: 0.8 },
        { offset: '50%', color: '#e4ece2', opacity: 0.6 },
        { offset: '100%', color: '#cadac7', opacity: 0.4 }
      ],
      stroke: '#c4d1c0'
    }
  }
};

// Utility functions
export const utils = {
  // Safe element selection with error handling
  safeQuerySelector: (selector, context = document) => {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.warn(`Failed to query selector "${selector}":`, error);
      return null;
    }
  },

  safeQuerySelectorAll: (selector, context = document) => {
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Failed to query selector "${selector}":`, error);
      return [];
    }
  },

  // Debounce function for performance optimization
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Safe DOM manipulation
  safeSetAttribute: (element, attribute, value) => {
    if (element && typeof element.setAttribute === 'function') {
      element.setAttribute(attribute, value);
    }
  },

  safeAddClass: (element, className) => {
    if (element && element.classList) {
      element.classList.add(className);
    }
  },

  safeRemoveClass: (element, className) => {
    if (element && element.classList) {
      element.classList.remove(className);
    }
  }
};

/**
 * Initialize a module with error handling
 * @param {string} moduleName - Name of the module for error reporting
 * @param {Function} initFunction - Function to initialize the module
 */
export const initModule = (moduleName, initFunction) => {
  try {
    initFunction();
  } catch (error) {
    console.error(`Failed to initialize ${moduleName}:`, error);
  }
};
