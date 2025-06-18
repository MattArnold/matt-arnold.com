import '../styles/main.css';

// Configuration constants
const CONFIG = {
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
const utils = {
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

// Tag and year filtering for blog directory
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // Cache DOM elements with error handling
      const tagButtons = utils.safeQuerySelectorAll('.tag-filter-btn[data-tag]');
      const yearButtons = utils.safeQuerySelectorAll('.year-filter-btn[data-year]');
      const postItems = utils.safeQuerySelectorAll('section ul > li[data-tags]');
      
      // Early return if essential elements are missing
      if (!tagButtons.length && !yearButtons.length && !postItems.length) {
        console.info('Blog filtering elements not found - skipping filter initialization');
        return;
      }

      let activeTag = null;
      let activeYear = null;

      // Helper: get tag/year from query string
      function getParamFromQuery(param) {
        try {
          const params = new URLSearchParams(window.location.search);
          return params.get(param);
        } catch (error) {
          console.warn('Failed to parse URL parameters:', error);
          return null;
        }
      }

      // Helper: filter posts by tag and/or year
      function filterPosts() {
        postItems.forEach(li => {
          const tags = li.getAttribute('data-tags') || '';
          const year = li.getAttribute('data-year');
          const tagMatch = !activeTag || tags.split(',').map(t => t.trim()).includes(activeTag);
          const yearMatch = !activeYear || year === activeYear;
          li.style.display = (tagMatch && yearMatch) ? '' : 'none';
        });
        tagButtons.forEach(b => b.classList.remove('bg-blue-400', 'text-white'));
        yearButtons.forEach(b => b.classList.remove('bg-blue-400', 'text-white'));
        if (activeTag) {
          tagButtons.forEach(b => {
            if (b.getAttribute('data-tag') === activeTag) {
              b.classList.add('bg-blue-400', 'text-white');
            }
          });
        }
        if (activeYear) {
          yearButtons.forEach(b => {
            if (b.getAttribute('data-year') === activeYear) {
              b.classList.add('bg-blue-400', 'text-white');
            }
          });
        }
      }

      // Helper: update query string
      function updateQuery() {
        const url = new URL(window.location);
        if (activeTag) {
          url.searchParams.set('tag', activeTag);
        } else {
          url.searchParams.delete('tag');
        }
        if (activeYear) {
          url.searchParams.set('year', activeYear);
        } else {
          url.searchParams.delete('year');
        }
        window.history.replaceState({}, '', url);
      }

      // On page load, check for ?tag= and ?year= in URL
      const initialTag = getParamFromQuery('tag');
      const initialYear = getParamFromQuery('year');
      if (initialTag) activeTag = initialTag;
      if (initialYear) activeYear = initialYear;
      if (activeTag || activeYear) filterPosts();

      // --- Clear filters button logic ---
      function updateClearButtons() {
        // Re-query elements each time in case they weren't available initially
        const clearYearBtn = document.getElementById('clear-year-btn');
        const clearTagBtn = document.getElementById('clear-tag-btn');
        const clearFiltersDiv = document.getElementById('clear-filters');
        
        if (!clearYearBtn || !clearTagBtn || !clearFiltersDiv) {
          // Elements don't exist on this page, skip filter UI
          return;
        }
        // Show clear buttons if a filter is active, regardless of post visibility
        if (activeYear) {
          clearYearBtn.textContent = `Clear ${activeYear}`;
          clearYearBtn.classList.remove('hidden');
        } else {
          clearYearBtn.classList.add('hidden');
        }
        if (activeTag) {
          clearTagBtn.textContent = `Clear ${activeTag}`;
          clearTagBtn.classList.remove('hidden');
        } else {
          clearTagBtn.classList.add('hidden');
        }
        // Always show the clear-filters div if any filter is active, even if no posts are visible
        if (activeTag || activeYear) {
          clearFiltersDiv.classList.remove('hidden');
        } else {
          clearFiltersDiv.classList.add('hidden');
        }
      }

      // Update clear buttons on filter change
      function filterPostsAndUpdateButtons() {
        filterPosts();
        updateClearButtons();
      }

      // Initial state
      updateClearButtons();

      // Patch filter event handlers to update clear buttons
      tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const tag = btn.getAttribute('data-tag');
          if (activeTag === tag) {
            activeTag = null;
          } else {
            activeTag = tag;
          }
          filterPostsAndUpdateButtons();
          updateQuery();
        });
      });
      yearButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const year = btn.getAttribute('data-year');
          if (activeYear === year) {
            activeYear = null;
          } else {
            activeYear = year;
          }
          filterPostsAndUpdateButtons();
          updateQuery();
        });
      });

      // Clear year
      document.addEventListener('click', (e) => {
        if (e.target.id === 'clear-year-btn') {
          activeYear = null;
          filterPostsAndUpdateButtons();
          updateQuery();
        }
      });
      
      // Clear tag
      document.addEventListener('click', (e) => {
        if (e.target.id === 'clear-tag-btn') {
          activeTag = null;
          filterPostsAndUpdateButtons();
          updateQuery();
        }
      });

      // Excerpt toggle logic
      const toggleExcerptsBtn = document.getElementById('toggle-excerpts-btn');
      if (toggleExcerptsBtn) {
        const excerptDivs = document.querySelectorAll('.excerpt');
        const longExcerptDivs = document.querySelectorAll('.long-excerpt');
        let excerptsVisible = false;
        toggleExcerptsBtn.addEventListener('click', () => {
          excerptsVisible = !excerptsVisible;
          excerptDivs.forEach(div => {
            div.classList.toggle('hidden', !excerptsVisible);
          });
          longExcerptDivs.forEach(div => {
            div.classList.add('hidden');
          });
          toggleExcerptsBtn.textContent = excerptsVisible ? 'Hide excerpts' : 'Show excerpts';
        });
      }

      // Per-post excerpt/long-excerpt toggle
      document.querySelectorAll('.excerpt .more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          const excerptDiv = btn.closest('.excerpt');
          const longExcerptDiv = excerptDiv.parentElement.querySelector('.long-excerpt');
          excerptDiv.classList.add('hidden');
          if (longExcerptDiv) longExcerptDiv.classList.remove('hidden');
        });
      });
      document.querySelectorAll('.long-excerpt .less-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          const longExcerptDiv = btn.closest('.long-excerpt');
          const excerptDiv = longExcerptDiv.parentElement.querySelector('.excerpt');
          longExcerptDiv.classList.add('hidden');
          if (excerptDiv) excerptDiv.classList.remove('hidden');
        });
      });

      // Mobile filter toggle logic
      const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
      const collapseFiltersBtn = document.getElementById('collapse-filters-btn');
      const showFiltersBtn = document.getElementById('show-filters-btn');
      const filtersAside = document.getElementById('filters-aside');
      
      if (collapseFiltersBtn && showFiltersBtn && filtersAside) {
        collapseFiltersBtn.addEventListener('click', () => {
          // Hide the aside and the collapse button
          filtersAside.classList.add('hidden');
          collapseFiltersBtn.classList.add('hidden');
          // Show the show filters button
          showFiltersBtn.classList.remove('hidden');
        });
        
        showFiltersBtn.addEventListener('click', () => {
          // Show the aside and the collapse button
          filtersAside.classList.remove('hidden');
          collapseFiltersBtn.classList.remove('hidden');
          // Hide the show filters button
          showFiltersBtn.classList.add('hidden');
        });
      }    // H1 background height adjustment with performance optimization
    const adjustTriangulationBackground = utils.debounce(() => {
      const h1 = utils.safeQuerySelector('h1');
      const backgroundDecoration = utils.safeQuerySelector('.h1-background-decoration');
      
      if (!h1 || !backgroundDecoration) {
        return;
      }

      try {
        // Detect if we're on a blog post page vs other pages
        const isBlogPost = utils.safeQuerySelector('.blog-entry') !== null;
                
        if (isBlogPost) {
          // Only adjust height on blog post pages
          const h1Rect = h1.getBoundingClientRect();
          const totalHeight = h1Rect.height + CONFIG.triangulation.buffer;
                    
          // Update the background decoration height
          backgroundDecoration.style.height = `${totalHeight}px`;
        }
      } catch (error) {
        console.warn('Failed to adjust triangulation background:', error);
      }
    }, 100); // Debounce by 100ms

      // Store the current triangulation pattern
      let currentTriangles = null;    // Generate randomized triangulation coordinates (separate from SVG generation)
    function generateTriangulationPattern() {
      const { width, height, minDistance, maxAttempts, targetInteriorPoints } = CONFIG.triangulation;
      
      try {
        // Generate well-distributed points
        const points = [];
        
        // Add corner points
        points.push([0, 0], [width, 0], [0, height], [width, height]);
        
        // Add edge points
        points.push([width/3, 0], [2*width/3, 0]); // Top
        points.push([width/3, height], [2*width/3, height]); // Bottom
        points.push([0, height/3], [0, 2*height/3]); // Left
        points.push([width, height/3], [width, 2*height/3]); // Right
        
        // Add random interior points with minimum distance
        for (let i = 0; i < targetInteriorPoints; i++) {
          let attempts = 0;
          let validPoint = null;
          
          while (attempts < maxAttempts && !validPoint) {
            const candidate = [
              20 + Math.random() * (width - 40),
              15 + Math.random() * (height - 30)
            ];
            
            const tooClose = points.some(existing => {
              const dist = Math.sqrt((candidate[0] - existing[0])**2 + (candidate[1] - existing[1])**2);
              return dist < minDistance;
            });
            
            if (!tooClose) {
              validPoint = candidate;
            }
            attempts++;
          }
          
          if (validPoint) {
            points.push(validPoint);
          }
        }
        
        // Generate the triangulation
        const triangles = delaunayTriangulation(points);
        
        // Filter triangles to remove very small or very large ones
        const validTriangles = triangles.filter(triangle => {
          const area = Math.abs(
            (triangle[0][0] * (triangle[1][1] - triangle[2][1]) + 
             triangle[1][0] * (triangle[2][1] - triangle[0][1]) + 
             triangle[2][0] * (triangle[0][1] - triangle[1][1])) / 2
          );
          return area > CONFIG.triangulation.minArea && area < CONFIG.triangulation.maxArea;
        });
        
        return validTriangles;
      } catch (error) {
        console.warn('Failed to generate triangulation pattern:', error);
        return [];
      }

      // Proper Delaunay triangulation using Bowyer-Watson algorithm
      function delaunayTriangulation(points) {
        const { width } = CONFIG.triangulation;
        
        try {
          // Create super triangle that contains all points
          const superTriangle = [
            [-width, -CONFIG.triangulation.height],
            [2 * width, -CONFIG.triangulation.height],
            [width/2, 2 * CONFIG.triangulation.height]
          ];
          
          const triangles = [superTriangle];
          
          // Add points one by one
          for (const point of points) {
            const badTriangles = [];
            
            // Find triangles whose circumcircle contains the point
            for (const triangle of triangles) {
              if (pointInCircumcircle(point, triangle)) {
                badTriangles.push(triangle);
              }
            }
            
            // Find the boundary of the polygonal hole
            const polygon = [];
            for (const triangle of badTriangles) {
              for (let i = 0; i < 3; i++) {
                const edge = [triangle[i], triangle[(i + 1) % 3]];
                
                // Check if this edge is shared with another bad triangle
                const isShared = badTriangles.some(otherTriangle => {
                  if (otherTriangle === triangle) return false;
                  return edgeInTriangle(edge, otherTriangle);
                });
                
                if (!isShared) {
                  polygon.push(edge);
                }
              }
            }
            
            // Remove bad triangles
            for (const badTriangle of badTriangles) {
              const index = triangles.indexOf(badTriangle);
              if (index > -1) triangles.splice(index, 1);
            }
            
            // Add new triangles formed by connecting the point to the polygon boundary
            for (const edge of polygon) {
              triangles.push([point, edge[0], edge[1]]);
            }
          }
          
          // Remove triangles that contain vertices of the super triangle
          return triangles.filter(triangle => {
            return !triangle.some(vertex => 
              superTriangle.some(superVertex => 
                vertex[0] === superVertex[0] && vertex[1] === superVertex[1]
              )
            );
          });
        } catch (error) {
          console.warn('Delaunay triangulation failed:', error);
          return [];
        }
      }
      
      // Helper function to check if point is in circumcircle of triangle
      function pointInCircumcircle(point, triangle) {
        try {
          const [ax, ay] = triangle[0];
          const [bx, by] = triangle[1];
          const [cx, cy] = triangle[2];
          const [dx, dy] = point;
          
          const ax_ = ax - dx;
          const ay_ = ay - dy;
          const bx_ = bx - dx;
          const by_ = by - dy;
          const cx_ = cx - dx;
          const cy_ = cy - dy;
          
          const det = (ax_ * ax_ + ay_ * ay_) * (bx_ * cy_ - by_ * cx_) -
                     (bx_ * bx_ + by_ * by_) * (ax_ * cy_ - ay_ * cx_) +
                     (cx_ * cx_ + cy_ * cy_) * (ax_ * by_ - ay_ * bx_);
          
          return det > 0;
        } catch (error) {
          console.warn('Point in circumcircle calculation failed:', error);
          return false;
        }
      }
      
      // Helper function to check if edge is in triangle
      function edgeInTriangle(edge, triangle) {
        try {
          const [p1, p2] = edge;
          let count = 0;
          
          for (const vertex of triangle) {
            if ((vertex[0] === p1[0] && vertex[1] === p1[1]) || 
                (vertex[0] === p2[0] && vertex[1] === p2[1])) {
              count++;
            }
          }
          
          return count === 2;
        } catch (error) {
          console.warn('Edge in triangle check failed:', error);
          return false;
        }
      }
    }    // Generate SVG from existing triangulation pattern with specified colors
    function generateSVGFromTriangles(triangles, isDark = false) {
      if (!triangles || !triangles.length) {
        console.warn('No triangles provided for SVG generation');
        return null;
      }

      try {
        const { width, height, strokeWidth, opacityRange } = CONFIG.triangulation;
        
        // Color scheme
        const colors = isDark ? CONFIG.colors.dark : CONFIG.colors.light;
        
        // Generate SVG
        const svgContent = `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'>
            <defs>
              <linearGradient id='${colors.gradientId}' x1='0%' y1='0%' x2='100%' y2='100%'>
                ${colors.gradientColors.map(c => 
                  `<stop offset='${c.offset}' style='stop-color:${c.color};stop-opacity:${c.opacity}'/>`
                ).join('')}
              </linearGradient>
            </defs>
            ${triangles.map((triangle, index) => {
              const opacity = opacityRange.min + Math.random() * (opacityRange.max - opacityRange.min);
              const points = triangle.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
              return `<polygon points='${points}' fill='url(#${colors.gradientId})' stroke='${colors.stroke}' stroke-width='${strokeWidth}' opacity='${opacity}'/>`;
            }).join('')}
          </svg>
        `;
        
        return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
      } catch (error) {
        console.warn('Failed to generate SVG from triangles:', error);
        return null;
      }
    }

      // Generate randomized triangulation SVG (wrapper that uses stored pattern or creates new one)
      function generateRandomTriangulation(isDark = false) {
        // Use existing pattern if available, otherwise generate new one
        if (!currentTriangles) {
          currentTriangles = generateTriangulationPattern();
        }
        
        return generateSVGFromTriangles(currentTriangles, isDark);
      }    // Apply randomized triangulation to background
    const randomizeTriangulationBackground = utils.debounce(() => {
      const backgroundDecoration = utils.safeQuerySelector('.h1-background-decoration');
      if (!backgroundDecoration) {
        return;
      }

      try {
        const isDark = document.documentElement.classList.contains('dark');
        const randomSvg = generateRandomTriangulation(isDark);
        if (randomSvg) {
          backgroundDecoration.style.backgroundImage = `url("${randomSvg}")`;
        }
      } catch (error) {
        console.warn('Failed to randomize triangulation background:', error);
      }
    }, CONFIG.debounce.backgroundAdjustment);

      // Watch for dark mode changes
      function setupDarkModeWatcher() {
        // Create a MutationObserver to watch for changes to the 'dark' class on <html>
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              randomizeTriangulationBackground();
            }
          });
        });

        // Start observing changes to the class attribute of the document element
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        });
      }

      // Run on initial load
      randomizeTriangulationBackground();
      adjustTriangulationBackground();
      setupDarkModeWatcher();

      // Use ResizeObserver to watch for h1 size changes (font loading, viewport changes, etc.)
      if (window.ResizeObserver) {
        const h1 = utils.safeQuerySelector('h1');
        if (h1) {
          const resizeObserver = new ResizeObserver(utils.debounce(() => {
            adjustTriangulationBackground();
          }, CONFIG.debounce.resize));
          resizeObserver.observe(h1);
        }
      }

      // Also run when fonts are loaded (in case web fonts change the h1 size)
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          adjustTriangulationBackground();
        });
      }

      // Fallback: run after a short delay to catch any late layout changes
      setTimeout(() => {
        adjustTriangulationBackground();
      }, 100);
    } catch (error) {
      console.error('Error initializing blog directory script:', error);
    }
  });
}
