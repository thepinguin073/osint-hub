class OffsecHub {
  constructor() {
    this.data = null;
    this.filteredData = null;
    this.elements = {};
    this.currentFilters = {
      category: 'all',
      interface: '',
      platform: '',
      search: ''
    };
    
    this.init();
  }

  async init() {
    try {
      if (this.isMobileDevice()) {
        this.showMobileMessage();
        return;
      }

      this.showLoader();
      await this.loadData();
      this.initDOMElements();
      this.generateContent();
      this.initFilters();
      
      setTimeout(() => this.hideLoader(), 800);
      
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  async loadData() {
    try {
      const response = await fetch(`/api/offsec-tools`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.data = await response.json();
      this.filteredData = JSON.parse(JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to load from API, using fallback:', error);
      this.data = this.extractDataFromHTML();
      this.filteredData = JSON.parse(JSON.stringify(this.data));
    }
  }

  extractDataFromHTML() {
    const data = { offensive_tools: {} };
    const sections = document.querySelectorAll('section[data-category]:not([data-category="all"])');

    sections.forEach(section => {
      const category = section.getAttribute('data-category');
      const title = section.querySelector('h2')?.textContent || '';
      const description = section.querySelector('i')?.textContent || '';
      const tools = [];
      
      const links = section.querySelectorAll('a[data-interface]');
      links.forEach(link => {
        tools.push({
          name: link.textContent.trim(),
          url: link.href,
          interface: link.getAttribute('data-interface'),
          platform: link.getAttribute('data-platform'),
          category: category
        });
      });
      
      if (tools.length > 0) {
        data.offensive_tools[category] = { title, description, tools };
      }
    });
    
    return data;
  }

  initDOMElements() {
    this.elements = {
      categoryFilter: document.getElementById('categoryFilter'),
      interfaceFilter: document.getElementById('interfaceFilter'),
      platformFilter: document.getElementById('platformFilter'),
      searchInput: document.getElementById('searchInput'),
      resultsCounter: document.querySelector('.results-counter'),
      main: document.querySelector('main')
    };
  }

  generateContent() {
    if (!this.elements.main || !this.data?.offensive_tools) return;

    this.elements.main.innerHTML = '';
    this.generateAllToolsSection();

    Object.entries(this.data.offensive_tools).forEach(([categoryKey, categoryData]) => {
      this.generateCategorySection(categoryKey, categoryData);
    });

    this.applyFilters();
  }

  generateAllToolsSection() {
    const section = document.createElement('section');
    section.setAttribute('data-category', 'all');
    section.className = 'hidden';
    
    const allTools = this.getAllToolsSorted();
    
    section.innerHTML = `
      <h2>🎯 All Offensive Security Tools</h2>
      <i>Complete overview of all available tools, organized alphabetically</i>
      <ul>
        ${allTools.map(tool => this.generateToolHTML(tool, true)).join('')}
      </ul>
    `;
    
    this.elements.main.appendChild(section);
  }

  generateCategorySection(categoryKey, categoryData) {
    const section = document.createElement('section');
    section.setAttribute('data-category', categoryKey);
    
    section.innerHTML = `
      <h2>${categoryData.title}</h2>
      <i class="category-description">${categoryData.description}</i>
      <ul>
        ${categoryData.tools.map(tool => this.generateToolHTML(tool, false, categoryKey)).join('')}
      </ul>
    `;
    
    this.elements.main.appendChild(section);
  }

  generateToolHTML(tool, showCategory = false, categoryKey = '') {
    const category = showCategory ? tool._category : categoryKey;
    const interfaceIcon = this.getInterfaceIcon(tool.interface);
    const platformIcon = this.getPlatformIcon(tool.platform);
    
    return `
      <li>
        <a href="${tool.url}" 
           target="_blank" 
           data-interface="${tool.interface}" 
           data-platform="${tool.platform}"
           data-category="${category}">
          <div class="tool-header">
            <span class="tool-name">${tool.name}</span>
          </div>
          <div class="tool-meta">
            <span class="meta-badge interface-badge">${interfaceIcon} ${tool.interface}</span>
            <span class="meta-badge platform-badge">${platformIcon} ${tool.platform}</span>
            ${showCategory ? `<span class="meta-badge category-badge">#${category}</span>` : ''}
          </div>
        </a>
      </li>
    `;
  }

  getInterfaceIcon(interface_type) {
    const icons = {
      'cli': '⌨️',
      'gui': '🖥️',
      'web': '🌐',
      'api': '🔌',
      'framework': '🗂️'
    };
    return icons[interface_type] || '📦';
  }

  getPlatformIcon(platform) {
    const icons = {
      'cross-platform': '🌍',
      'linux': '🐧',
      'windows': '🪟',
      'web': '🌐',
      'macos': '🍎'
    };
    return icons[platform] || '💻';
  }

  getAllToolsSorted() {
    const allTools = [];

    for (const categoryKey in this.data.offensive_tools) {
      const category = this.data.offensive_tools[categoryKey];
      
      category.tools.forEach(tool => {
        allTools.push({
          ...tool, 
          _category: categoryKey 
        });
      });
    }

    return allTools.sort((a, b) => a.name.localeCompare(b.name));
  }

  initFilters() {
    this.elements.categoryFilter?.addEventListener('change', (e) => {
      this.currentFilters.category = e.target.value;
      this.applyFilters();
    });

    this.elements.interfaceFilter?.addEventListener('change', (e) => {
      this.currentFilters.interface = e.target.value;
      this.applyFilters();
    });

    this.elements.platformFilter?.addEventListener('change', (e) => {
      this.currentFilters.platform = e.target.value;
      this.applyFilters();
    });

    let searchTimeout;
    this.elements.searchInput?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.currentFilters.search = e.target.value.toLowerCase().trim();
        this.applyFilters();
      }, 300);
    });

    document.querySelector('.reset-btn')?.addEventListener('click', () => {
      this.resetFilters();
    });
  }

  applyFilters() {
    const sections = document.querySelectorAll('section[data-category]');
    let totalVisibleCount = 0;

    if (this.currentFilters.category === 'all') {
      sections.forEach(section => {
        const category = section.getAttribute('data-category');
        if (category === 'all') {
          section.classList.remove('hidden');
          totalVisibleCount += this.filterSectionLinks(section);
        } else {
          section.classList.add('hidden');
        }
      });
    } else {
      const allSection = document.querySelector('[data-category="all"]');
      if (allSection) allSection.classList.add('hidden');

      sections.forEach(section => {
        const category = section.getAttribute('data-category');
        
        if (category === 'all') return;

        const matchesCategory = !this.currentFilters.category || 
                               category === this.currentFilters.category;

        if (matchesCategory) {
          const visibleLinks = this.filterSectionLinks(section);
          if (visibleLinks > 0) {
            section.classList.remove('hidden');
            totalVisibleCount += visibleLinks;
          } else {
            section.classList.add('hidden');
          }
        } else {
          section.classList.add('hidden');
        }
      });
    }

    this.updateResultsCounter(totalVisibleCount);
  }

  filterSectionLinks(section) {
    const links = section.querySelectorAll('a[data-interface]');
    let visibleCount = 0;

    links.forEach(link => {
      const linkData = {
        interface: link.getAttribute('data-interface') || '',
        platform: link.getAttribute('data-platform') || '',
        text: link.textContent.toLowerCase()
      };

      const isVisible = this.matchesFilters(linkData);
      const listItem = link.closest('li');
      
      if (isVisible) {
        listItem?.classList.remove('hidden');
        visibleCount++;
      } else {
        listItem?.classList.add('hidden');
      }
    });

    return visibleCount;
  }

  matchesFilters(linkData) {
    const filters = this.currentFilters;
    
    const matchesInterface = !filters.interface || linkData.interface === filters.interface;
    const matchesPlatform = !filters.platform || linkData.platform === filters.platform;
    const matchesSearch = !filters.search || linkData.text.includes(filters.search);

    return matchesInterface && matchesPlatform && matchesSearch;
  }

  resetFilters() {
    this.currentFilters = {
      category: 'all',
      interface: '',
      platform: '',
      search: ''
    };

    document.querySelectorAll('.modern-select').forEach(select => {
      select.selectedIndex = 0;
    });
    
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }

    this.applyFilters();
  }

  updateResultsCounter(count) {
    if (this.elements.resultsCounter) {
      this.elements.resultsCounter.textContent = `📊 ${count} tool${count !== 1 ? 's' : ''} found`;
    }
  }

  isMobileDevice() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return width <= 720 && height <= 600;
  }

  showMobileMessage() {
    document.documentElement.innerHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/static/offsec-hub.css">
        </head>
        <body>
          <h1 class="righteous-regular">Offsec-hub</h1>
          <h1 style="font-size: 2.5rem;">Please use this tool on a laptop...</h1>
        </body>
      </html>
    `;
  }

  showLoader() {
    const loader = document.querySelector('.loading');
    if (loader) {
      loader.style.display = 'flex';
    }
  }

  hideLoader() {
    const loader = document.querySelector('.loading');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new OffsecHub();
});