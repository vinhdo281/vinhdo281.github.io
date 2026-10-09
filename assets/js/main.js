/* ==========================================================================
   MAIN JAVASCRIPT - TECH PORTFOLIO ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. LANGUAGE SWITCHER (VI / EN) ---
  const DEFAULT_LANG = 'vi';
  const LANG_STORAGE_KEY = 'site_lang';

  function initLanguage() {
    let savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (!savedLang || (savedLang !== 'vi' && savedLang !== 'en')) {
      savedLang = DEFAULT_LANG;
    }
    setLanguage(savedLang);

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const currentLang = document.body.getAttribute('data-lang') || DEFAULT_LANG;
        const nextLang = currentLang === 'vi' ? 'en' : 'vi';
        setLanguage(nextLang);
      });
    }
  }

  function setLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.textContent = lang === 'vi' ? 'VI' : 'EN';
      langBtn.setAttribute('title', lang === 'vi' ? 'Chuyển sang English' : 'Switch to Vietnamese');
    }
  }

  // --- 2. THEME SWITCHER (Dark / Light) ---
  const THEME_STORAGE_KEY = 'site_theme';

  function initTheme() {
    let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (!savedTheme) {
      savedTheme = 'dark'; // Tech theme default
    }
    setTheme(savedTheme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      } else {
        themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
    }
  }

  // --- 3. SEARCH MODAL (Ctrl + K) ---
  function initSearch() {
    const searchModal = document.getElementById('search-modal-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchBtn = document.getElementById('site-search-btn');

    if (!searchModal || !searchInput) return;

    function openSearch() {
      searchModal.classList.add('open');
      searchInput.value = '';
      renderSearchResults('');
      setTimeout(() => searchInput.focus(), 50);
    }

    function closeSearch() {
      searchModal.classList.remove('open');
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    }

    // Keyboard shortcut: Ctrl+K / Cmd+K or ESC
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchModal.classList.contains('open')) {
          closeSearch();
        } else {
          openSearch();
        }
      }
      if (e.key === 'Escape' && searchModal.classList.contains('open')) {
        closeSearch();
      }
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        closeSearch();
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });

    function renderSearchResults(query) {
      if (typeof SEARCH_DATA === 'undefined') return;

      const lang = document.body.getAttribute('data-lang') || 'vi';

      const filtered = query === '' 
        ? SEARCH_DATA.slice(0, 5) 
        : SEARCH_DATA.filter(item => {
            return item.title_vi.toLowerCase().includes(query) ||
                   item.title_en.toLowerCase().includes(query) ||
                   item.keywords.toLowerCase().includes(query);
          });

      if (filtered.length === 0) {
        searchResults.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            ${lang === 'vi' ? 'Không tìm thấy kết quả phù hợp.' : 'No results found.'}
          </div>
        `;
        return;
      }

      searchResults.innerHTML = filtered.map(item => {
        const title = lang === 'vi' ? item.title_vi : item.title_en;
        return `
          <a class="search-result-item" href="${item.url}">
            <div class="search-result-title">${title}</div>
            <div class="search-result-meta">${item.category}</div>
          </a>
        `;
      }).join('');
    }
  }

  // --- 4. COPY BIBTEX FUNCTIONALITY ---
  function initBibtexCopy() {
    const copyBtns = document.querySelectorAll('.btn-copy-bibtex');
    const toast = document.getElementById('toast-notice');

    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const bibtex = btn.getAttribute('data-bibtex');
        if (bibtex) {
          navigator.clipboard.writeText(bibtex).then(() => {
            showToast();
          });
        }
      });
    });

    function showToast() {
      if (!toast) return;
      const lang = document.body.getAttribute('data-lang') || 'vi';
      toast.textContent = lang === 'vi' ? '✓ Đã sao chép BibTeX vào Clipboard!' : '✓ BibTeX copied to clipboard!';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  }

  // --- 5. CATEGORY FILTER TABS ---
  function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.tech-card[data-category]');

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 6. MOBILE MENU TOGGLE ---
  function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });
    }
  }

  // --- 7. INTERACTIVE OS TABS (WINDOWS vs LINUX) ---
  const OS_STORAGE_KEY = 'preferred_os';

  function initOSTabs() {
    let savedOS = localStorage.getItem(OS_STORAGE_KEY);
    if (!savedOS || (savedOS !== 'windows' && savedOS !== 'linux')) {
      // Default to windows, or detect from navigator.userAgent if Linux/Mac
      savedOS = (navigator.userAgent && /linux/i.test(navigator.userAgent) && !/android/i.test(navigator.userAgent)) ? 'linux' : 'windows';
    }

    applyOS(savedOS);

    // Global switcher buttons
    document.querySelectorAll('.os-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const os = btn.getAttribute('data-os');
        if (os) {
          applyOS(os);
          localStorage.setItem(OS_STORAGE_KEY, os);
        }
      });
    });

    // Local code box tab buttons
    document.querySelectorAll('.os-code-box').forEach(box => {
      const tabBtns = box.querySelectorAll('.os-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const os = btn.getAttribute('data-os');
          if (os) {
            switchBoxOS(box, os);
          }
        });
      });
    });
  }

  function applyOS(os) {
    // 1. Update global toggle buttons
    document.querySelectorAll('.os-toggle-btn').forEach(btn => {
      if (btn.getAttribute('data-os') === os) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Update all local os code boxes
    document.querySelectorAll('.os-code-box').forEach(box => {
      switchBoxOS(box, os);
    });
  }

  function switchBoxOS(box, os) {
    const tabBtns = box.querySelectorAll('.os-tab-btn');
    const panes = box.querySelectorAll('.os-tab-pane');

    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-os') === os) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    panes.forEach(pane => {
      if (pane.getAttribute('data-os') === os) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  // --- INITIALIZE ALL MODULES ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initSearch();
    initBibtexCopy();
    initFilterTabs();
    initMobileMenu();
    initOSTabs();
  });
})();

