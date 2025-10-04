class OSINTHub {
  constructor() {
    this.data = null;
    this.filteredData = null;
    this.elements = {};
    this.currentFilters = {
      category: 'all',
      source: '',
      country: '',
      search: '',
      flagged: false,
      github: true,
      free: true
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
      console.error(error);
    }
  }

  async loadData() {
    try {
      const response = await fetch(`/api/tools`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.data = await response.json();
      
      this.filteredData = JSON.parse(JSON.stringify(this.data));
    } catch (error) {
      console.error(error);
      this.data = this.extractDataFromHTML();
      this.filteredData = JSON.parse(JSON.stringify(this.data));
    }
  }

  extractDataFromHTML() {
    const data = { osint_tools: {} };
    const sections = document.querySelectorAll('section[data-category]:not([data-category="all"])');

    sections.forEach(section => {
      const category = section.getAttribute('data-category');
      const title = section.querySelector('h2')?.textContent || '';
      const description = section.querySelector('i')?.textContent || '';
      const tools = [];
      
      const links = section.querySelectorAll('a[data-source]');
      links.forEach(link => {
        tools.push({
          name: link.textContent.trim(),
          url: link.href,
          source: link.getAttribute('data-source'),
          country: link.getAttribute('data-country'),
          flagged: link.getAttribute('data-flagged') === 'true',
          free: link.getAttribute('data-free') === 'true'
        });
      });
      
      if (tools.length > 0) {
        data.osint_tools[category] = { title, description, tools };
      }
    });
    
    return data;
  }

  initDOMElements() {
    this.elements = {
      categoryFilter: document.getElementById('categoryFilter'),
      sourceFilter: document.getElementById('sourceFilter'),
      countryFilter: document.getElementById('countryFilter'),
      searchInput: document.getElementById('searchInput'),
      flaggedToggle: document.querySelector('.toggle-switch[data-filter="flagged"]'),
      githubToggle: document.querySelector('.toggle-switch[data-filter="github"]'),
      freeToggle: document.querySelector('.toggle-switch[data-filter="free"]'),
      resultsCounter: document.querySelector('.results-counter'),
      main: document.querySelector('main'),
      linkChecker: document.getElementById('linkChecker')
    };
  }

  generateContent() {
    if (!this.elements.main || !this.data?.osint_tools) return;

    this.elements.main.innerHTML = '';

    this.generateAllToolsSection();

    Object.entries(this.data.osint_tools).forEach(([categoryKey, categoryData]) => {
      this.generateCategorySection(categoryKey, categoryData);
    });

    this.applyFilters();
  }

  generateAllToolsSection() {
    const section = document.createElement('section');
    section.setAttribute('data-category', 'all');
    section.className = 'section-card hidden';
    
    const allTools = this.getAllToolsSorted();
    
    section.innerHTML = `
      <h2>🌟 All OSINT tools</h2>
      <i>Overview of all available tools, organized alphabetically</i>
      <ul>
        ${allTools.map(tool => `
          <li>
            <a ${tool.flagged ? 'class="warning-tile"' : ''} href="${tool.url}" target="_blank" 
               data-source="${tool.source}" 
               data-country="${tool.country}" 
               data-flagged="${tool.flagged}" 
               data-free="${tool.free}">
              ${tool.name}
              ${(tool.source === 'government' || (tool.source === 'github' && tool.country !== 'international')) ? '<br><i class="official-source">Official Source</i>' : ''}
              <div class="pills">
                <div class="pill country">#${tool.country}</div>
                <div class="pill category">#${tool._category}</div>
                <div class="pill ${tool.free ? 'free' : 'paid'}">#${tool.free ? 'free' : 'paid'}</div>
              </div>
              ${tool.source === 'github' ? '<svg class="github-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>' : ''}
            </a>
          </li>
        `).join('')}
      </ul>
    `;
    
    this.elements.main.appendChild(section);
  }

  generateCategorySection(categoryKey, categoryData) {
    const section = document.createElement('section');
    section.setAttribute('data-category', categoryKey);
    section.className = 'section-card';
    section.innerHTML = `
      <h2>${categoryData.title}</h2>
      <i>${categoryData.description}</i>
      <ul>
        ${categoryData.tools.map(tool => `
          <li>
            <a href="${tool.url}" target="_blank" 
               data-source="${tool.source}" 
               data-country="${tool.country}" 
               data-flagged="${tool.flagged}" 
               data-free="${tool.free}">
              ${tool.name}
              ${(tool.source === 'government' || (tool.source === 'github' && tool.country !== 'international')) ? '<br><i class="official-source">Official Source</i>' : ''}
              <div class="pills">
                <div class="pill country">#${tool.country}</div>
                <div class="pill category">#${categoryKey}</div>
                <div class="pill free">#${tool.free ? 'free' : 'paid'}</div>
              </div>
              ${tool.source === 'github' ? '<svg class="github-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>' : ''}
            </a>
          </li>
        `).join('')}
      </ul>
    `;
    
    this.elements.main.appendChild(section);
  }


    getAllToolsSorted() {
      const allTools = [];

      // Parcours de toutes les catégories
      for (const categoryKey in this.data.osint_tools) {
        const category = this.data.osint_tools[categoryKey];
        
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

    this.elements.sourceFilter?.addEventListener('change', (e) => {
      this.currentFilters.source = e.target.value;
      this.applyFilters();
    });

    this.elements.countryFilter?.addEventListener('change', (e) => {
      this.currentFilters.country = e.target.value;
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

    document.querySelectorAll('.toggle-switch').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        const filterType = toggle.getAttribute('data-filter');
        
        switch(filterType) {
          case 'flagged':
            this.currentFilters.flagged = toggle.classList.contains('active');
            break;
          case 'github':
            this.currentFilters.github = toggle.classList.contains('active');
            break;
          case 'free':
            this.currentFilters.free = toggle.classList.contains('active');
            break;
        }
        
        this.applyFilters();
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('reset-btn')) {
        this.resetFilters();
      }
    });

    this.elements.githubToggle?.classList.add('active');
    this.elements.freeToggle?.classList.add('active');
    this.currentFilters.github = true;
    this.currentFilters.free = true;
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
    const links = section.querySelectorAll('a[data-source]');
    let visibleCount = 0;

    links.forEach(link => {
      const linkData = {
        source: link.getAttribute('data-source') || '',
        country: link.getAttribute('data-country') || '',
        flagged: link.getAttribute('data-flagged') === 'true',
        free: link.getAttribute('data-free') === 'true',
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
    
    const matchesSource = !filters.source || linkData.source === filters.source;
    const matchesCountry = !filters.country || linkData.country === filters.country;
    const matchesSearch = !filters.search || linkData.text.includes(filters.search);
    const matchesFlagged = !filters.flagged || linkData.flagged;
    const matchesFree = !filters.free || linkData.free;
    const matchesGithub = !filters.github || linkData.source === 'github';

    return matchesSource && matchesCountry && matchesSearch && 
           matchesFlagged && matchesFree && matchesGithub;
  }

  resetFilters() {
    this.currentFilters = {
      category: 'all',
      source: '',
      country: '',
      search: '',
      flagged: false,
      github: true,
      free: true
    };

    document.querySelectorAll('.modern-select').forEach(select => {
      select.selectedIndex = 0;
    });
    
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }

    document.querySelectorAll('.toggle-switch').forEach(toggle => {
      const filterType = toggle.getAttribute('data-filter');
      if (filterType === 'github' || filterType === 'free') {
        toggle.classList.add('active');
      } else {
        toggle.classList.remove('active');
      }
    });

    document.querySelectorAll('section[data-category]').forEach(section => {
      section.classList.remove('hidden');
    });

    document.querySelectorAll('section li').forEach(li => {
      li.style.display = 'list-item';
    });

    this.applyFilters();
  }

  updateResultsCounter(count) {
    if (this.elements.resultsCounter) {
      this.elements.resultsCounter.textContent = `📊 ${count} tools found`;
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
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <h1 class="righteous-regular">OSINT hub</h1>
          <h1 style="font-size: 2.5rem;">Please use this tool on a laptop...</h1>
          <div id="img"><div>
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

  displayLinkResults(results, container) {
    container.innerHTML = "";
    if (results.length === 0) {
      container.innerHTML = "<p>✅ All links seem accessible.</p>";
    } else {
      results.forEach(({ url, code, msg }) => {
        const p = document.createElement("p");
        p.textContent = `❌ ${url} → [${code}] ${msg}`;
        container.appendChild(p);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new OSINTHub();
});
