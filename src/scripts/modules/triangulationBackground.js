/**
 * Triangulation background system
 * Handles complex geometric background generation and management
 */

import { utils, CONFIG } from './utils.js';

export class TriangulationBackground {
  constructor() {
    this.currentTriangles = null;
  }

  /**
   * Initialize triangulation background system
   */
  init() {
    // Initial setup
    this.randomizeTriangulationBackground();
    this.adjustTriangulationBackground();
    this.setupDarkModeWatcher();
    this.setupResizeObserver();
    this.setupFontLoadHandler();
    
    // Fallback adjustment after short delay
    setTimeout(() => {
      this.adjustTriangulationBackground();
    }, 100);
  }

  /**
   * Generate randomized triangulation coordinates using Delaunay triangulation
   */
  generateTriangulationPattern() {
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
      
      // Add random interior points with minimum distance constraint
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
      const triangles = this.delaunayTriangulation(points);
      
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
  }

  /**
   * Proper Delaunay triangulation using Bowyer-Watson algorithm
   */
  delaunayTriangulation(points) {
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
          if (this.pointInCircumcircle(point, triangle)) {
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
              return this.edgeInTriangle(edge, otherTriangle);
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

  /**
   * Check if point is in circumcircle of triangle
   */
  pointInCircumcircle(point, triangle) {
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

  /**
   * Check if edge is in triangle
   */
  edgeInTriangle(edge, triangle) {
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

  /**
   * Generate SVG from triangulation pattern with theme-appropriate colors
   */
  generateSVGFromTriangles(triangles, isDark = false) {
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

  /**
   * Generate randomized triangulation SVG (uses cached pattern or creates new one)
   */
  generateRandomTriangulation(isDark = false) {
    // Use existing pattern if available, otherwise generate new one
    if (!this.currentTriangles) {
      this.currentTriangles = this.generateTriangulationPattern();
    }
    
    return this.generateSVGFromTriangles(this.currentTriangles, isDark);
  }

  /**
   * Adjust background height based on H1 element size
   */
  adjustTriangulationBackground = utils.debounce(() => {
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
  }, CONFIG.debounce.backgroundAdjustment);

  /**
   * Apply randomized triangulation background
   */
  randomizeTriangulationBackground = utils.debounce(() => {
    const backgroundDecoration = utils.safeQuerySelector('.h1-background-decoration');
    if (!backgroundDecoration) {
      return;
    }

    try {
      const isDark = document.documentElement.classList.contains('dark');
      const randomSvg = this.generateRandomTriangulation(isDark);
      if (randomSvg) {
        backgroundDecoration.style.backgroundImage = `url("${randomSvg}")`;
      }
    } catch (error) {
      console.warn('Failed to randomize triangulation background:', error);
    }
  }, CONFIG.debounce.backgroundAdjustment);

  /**
   * Watch for dark mode changes and update background accordingly
   */
  setupDarkModeWatcher() {
    try {
      // Create a MutationObserver to watch for changes to the 'dark' class on <html>
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            this.randomizeTriangulationBackground();
          }
        });
      });

      // Start observing changes to the class attribute of the document element
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    } catch (error) {
      console.warn('Failed to setup dark mode watcher:', error);
    }
  }

  /**
   * Setup ResizeObserver to watch for H1 size changes
   */
  setupResizeObserver() {
    if (!window.ResizeObserver) {
      console.info('ResizeObserver not available');
      return;
    }

    try {
      const h1 = utils.safeQuerySelector('h1');
      if (h1) {
        const resizeObserver = new ResizeObserver(
          utils.debounce(() => {
            this.adjustTriangulationBackground();
          }, CONFIG.debounce.resize)
        );
        resizeObserver.observe(h1);
      }
    } catch (error) {
      console.warn('Failed to setup resize observer:', error);
    }
  }

  /**
   * Setup font load handler to adjust background after fonts load
   */
  setupFontLoadHandler() {
    if (!document.fonts || !document.fonts.ready) {
      console.info('Font loading API not available');
      return;
    }

    try {
      document.fonts.ready.then(() => {
        this.adjustTriangulationBackground();
      });
    } catch (error) {
      console.warn('Failed to setup font load handler:', error);
    }
  }
}
