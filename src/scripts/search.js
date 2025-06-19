// Site-wide search functionality using Lunr.js
class SiteSearch {
  constructor() {
    this.searchIndex = null;
    this.documents = null;
    this.lunr = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Dynamically import Lunr.js from CDN
      if (!window.lunr) {
        await this.loadScript('https://unpkg.com/lunr@2.3.9/lunr.min.js');
      }
      this.lunr = window.lunr;

      // Load search index
      const response = await fetch('/search.json');
      const data = await response.json();
      
      // Support index as object or JSON string from template
      const idxData = typeof data.index === 'string'
        ? JSON.parse(data.index)
        : data.index;
      console.log('Search index data loaded:', idxData);
      this.searchIndex = this.lunr.Index.load(idxData);
      console.log('Lunr search index loaded successfully with', this.searchIndex);
      this.documents = data.documents;
      this.isInitialized = true;
      console.log(`Search initialized with ${this.documents.length} documents`);
    } catch (error) {
      console.error('Failed to initialize search:', error);
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  search(query) {
    if (!this.isInitialized || !query.trim()) {
      return [];
    }

    try {
      console.log('Performing search for query:', query);
      // Perform search with fuzzy matching
      const results = this.searchIndex.search(query + '~1'); // ~1 adds fuzzy matching
      console.log('Fuzzy results:', results);
      
      // Also search for exact phrases and boost them
      const exactResults = this.searchIndex.search(`"${query}"`);
      console.log('Exact results:', exactResults);
      
      // Combine and deduplicate results
      const combinedResults = new Map();
      console.log('Combining results...');
      // Add fuzzy results
      results.forEach(result => {
        combinedResults.set(result.ref, { ...result, boost: 1 });
      });
      
      // Add exact results with higher boost
      exactResults.forEach(result => {
        if (combinedResults.has(result.ref)) {
          combinedResults.get(result.ref).score += result.score * 2; // Boost exact matches
        } else {
          combinedResults.set(result.ref, { ...result, boost: 2 });
        }
      });
      console.log('Combined results map:', combinedResults);
      
      // Convert to array and sort by score
      const finalResults = Array.from(combinedResults.values())
        .sort((a, b) => b.score - a.score);
      console.log('Final sorted results:', finalResults);

      // Map to document objects
      return finalResults.map(result => {
        const doc = this.documents.find(d => d.id === result.ref);
        return { ...doc, score: result.score };
      }).filter(Boolean);
      
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  highlightText(text, query) {
    if (!query.trim()) return text;
    
    const words = query.trim().split(/\s+/);
    let highlightedText = text;
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600">$1</mark>');
    });
    
    return highlightedText;
  }

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  renderResults(results, query) {
    const container = document.getElementById('search-results');
    const noResults = document.getElementById('no-results');
    const searchStats = document.getElementById('search-stats');
    const searchCount = document.getElementById('search-count');
    const searchHelp = document.getElementById('search-help');

    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = '';
      container.classList.add('hidden');
      noResults.classList.remove('hidden');
      searchStats.classList.add('hidden');
      searchHelp.classList.remove('hidden');
      return;
    }

    noResults.classList.add('hidden');
    searchStats.classList.remove('hidden');
    searchHelp.classList.add('hidden');
    searchCount.textContent = results.length;
    container.classList.remove('hidden');

    const resultsHTML = results.map(result => {
      const type = result.type === 'page' ? 'Page' : 'Blog Post';
      const date = result.date ? this.formatDate(result.date) : '';
      const highlightedTitle = this.highlightText(result.title, query);
      const highlightedExcerpt = this.highlightText(result.excerpt, query);
      const tags = result.tags && result.tags.length > 0 
        ? result.tags.map(tag => `<span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs text-gray-700 dark:text-gray-300">${tag}</span>`).join(' ')
        : '';

      return `
        <article class="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">${type}</span>
              ${date ? `<span>${date}</span>` : ''}
            </div>
            <div class="text-xs text-gray-400">Score: ${result.score.toFixed(2)}</div>
          </div>
          
          <h2 class="text-xl font-semibold mb-2">
            <a href="${result.url}" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
              ${highlightedTitle}
            </a>
          </h2>
          
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
            ${highlightedExcerpt}
          </p>
          
          ${tags ? `<div class="space-x-1">${tags}</div>` : ''}
        </article>
      `;
    }).join('');

    container.innerHTML = resultsHTML;
  }
}

// Function to initialize search on the search page
window.initializeSearch = async function() {
  console.log('initializeSearch wrapper invoked');
  const searchInput = document.getElementById('search-input');
  console.log('searchInput element in wrapper:', searchInput);
  if (!searchInput) return;

  await window.siteSearch.initialize();

  let searchTimeout;
  
  console.log('Attaching search input event listener');
  searchInput.addEventListener('input', function(e) {
    console.log('Search input event:', e.target.value);
    clearTimeout(searchTimeout);
    const query = e.target.value;
    
    if (query.length < 2) {
      const container = document.getElementById('search-results');
      const noResults = document.getElementById('no-results');
      const searchStats = document.getElementById('search-stats');
      const searchHelp = document.getElementById('search-help');
      
      if (container) container.classList.add('hidden');
      if (noResults) noResults.classList.add('hidden');
      if (searchStats) searchStats.classList.add('hidden');
      if (searchHelp) searchHelp.classList.remove('hidden');
      return;
    }

    // Debounce search
    searchTimeout = setTimeout(() => {
      const results = window.siteSearch.search(query);
      window.siteSearch.renderResults(results, query);
    }, 300);
  });

  // Handle URL params for direct search links
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q');
  if (initialQuery) {
    searchInput.value = initialQuery;
    const results = window.siteSearch.search(initialQuery);
    window.siteSearch.renderResults(results, initialQuery);
  }

  // Focus search input
  searchInput.focus();
};

// Add global search shortcut (Ctrl/Cmd + K)
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    window.location.href = '/search/';
  }
});

export { SiteSearch };
