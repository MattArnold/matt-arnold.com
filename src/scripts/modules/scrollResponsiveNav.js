/**
 * Scroll-responsive navigation module
 * Hides navigation when scrolling down, shows when scrolling up
 */

export class ScrollResponsiveNav {
  constructor() {
    this.nav = null;
    this.lastScrollY = 0;
    this.scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
    this.isScrollingUp = false;
    this.isScrollingDown = false;
    this.scrollTimer = null;
  }

  init() {
    this.nav = document.querySelector('nav');
    if (!this.nav) {
      console.warn('Navigation element not found');
      return;
    }

    // Add CSS classes for smooth transitions
    this.nav.classList.add('nav-scroll-responsive');
    
    // Bind scroll event
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    console.info('Scroll-responsive navigation initialized');
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - this.lastScrollY;

    // Clear any existing timer
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }

    // Always show nav when at the top of the page
    if (currentScrollY <= 50) {
      this.showNavigation();
      this.lastScrollY = currentScrollY;
      return;
    }

    // Only act if scroll difference is above threshold
    if (Math.abs(scrollDifference) < this.scrollThreshold) {
      return;
    }

    // Determine scroll direction
    if (scrollDifference > 0 && currentScrollY > 100) {
      // Scrolling down and past initial threshold
      if (!this.isScrollingDown) {
        this.isScrollingDown = true;
        this.isScrollingUp = false;
        this.hideNavigation();
      }
    } else if (scrollDifference < 0) {
      // Scrolling up
      if (!this.isScrollingUp) {
        this.isScrollingUp = true;
        this.isScrollingDown = false;
        this.showNavigation();
      }
    }

    // Reset scroll direction after a brief delay
    this.scrollTimer = setTimeout(() => {
      this.isScrollingUp = false;
      this.isScrollingDown = false;
    }, 150);

    this.lastScrollY = currentScrollY;
  }

  hideNavigation() {
    this.nav.classList.add('nav-hidden');
    this.nav.classList.remove('nav-visible');
  }

  showNavigation() {
    this.nav.classList.add('nav-visible');
    this.nav.classList.remove('nav-hidden');
  }

  destroy() {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    window.removeEventListener('scroll', this.handleScroll);
    
    if (this.nav) {
      this.nav.classList.remove('nav-scroll-responsive', 'nav-hidden', 'nav-visible');
    }
  }
}
