/* ==========================================================================
   MAIN JAVASCRIPT - TECH PORTFOLIO ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. LANGUAGE SWITCHER (EN / DE) ---
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'de'];
  const LANG_STORAGE_KEY = 'site_lang';

  // Immediate legacy migration & state cleanup
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY);
    if (raw !== 'de') {
      localStorage.setItem(LANG_STORAGE_KEY, 'en');
    }
    const current = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
    document.documentElement.setAttribute('lang', current);
    if (document.body) {
      document.body.setAttribute('data-lang', current);
    }
  } catch(e) {}

  const LANG_META = {
    en: {
      code: 'EN',
      name: 'English',
      title: 'Language: English (Click to select language)',
      searchPlaceholder: 'Type to search (Ctrl+K)...',
      searchEmpty: 'No results found.',
      bibtexToast: '✓ BibTeX copied to clipboard!'
    },
    de: {
      code: 'DE',
      name: 'Deutsch',
      title: 'Sprache: Deutsch (Klicken, um Sprache zu wählen)',
      searchPlaceholder: 'Suchbegriff eingeben (Strg+K)...',
      searchEmpty: 'Keine passenden Ergebnisse gefunden.',
      bibtexToast: '✓ BibTeX in die Zwischenablage kopiert!'
    }
  };

  function initLanguage() {
    let savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (!savedLang || !SUPPORTED_LANGS.includes(savedLang)) {
      savedLang = DEFAULT_LANG;
    }
    setLanguage(savedLang);

    // Dropdown and buttons
    const dropdownWrappers = document.querySelectorAll('.lang-dropdown-wrapper');
    const langBtns = document.querySelectorAll('#lang-toggle-btn');

    langBtns.forEach(langBtn => {
      langBtn.addEventListener('click', (e) => {
        const wrap = langBtn.closest('.lang-dropdown-wrapper');
        const menu = wrap ? wrap.querySelector('.lang-dropdown-menu') : null;
        if (wrap && menu) {
          e.stopPropagation();
          const isOpen = wrap.classList.toggle('open');
          langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        } else {
          // Direct cycle fallback (EN -> DE -> EN)
          const currentLang = document.body.getAttribute('data-lang') || DEFAULT_LANG;
          const nextIndex = (SUPPORTED_LANGS.indexOf(currentLang) + 1) % SUPPORTED_LANGS.length;
          setLanguage(SUPPORTED_LANGS[nextIndex]);
        }
      });
    });

    document.querySelectorAll('.lang-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetLang = item.getAttribute('data-lang-val');
        if (targetLang && SUPPORTED_LANGS.includes(targetLang)) {
          setLanguage(targetLang);
        }
        dropdownWrappers.forEach(wrap => {
          wrap.classList.remove('open');
          const btn = wrap.querySelector('#lang-toggle-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      dropdownWrappers.forEach(wrap => {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove('open');
          const btn = wrap.querySelector('#lang-toggle-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownWrappers.forEach(wrap => {
          wrap.classList.remove('open');
          const btn = wrap.querySelector('#lang-toggle-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      lang = DEFAULT_LANG;
    }
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);

    const meta = LANG_META[lang] || LANG_META[DEFAULT_LANG];

    // Update button text
    document.querySelectorAll('#lang-current-label').forEach(el => {
      el.textContent = meta.code;
    });

    document.querySelectorAll('#lang-toggle-btn').forEach(btn => {
      btn.setAttribute('title', meta.title);
      // If button doesn't have child #lang-current-label, update textContent directly
      if (!btn.querySelector('#lang-current-label')) {
        btn.textContent = meta.code;
      }
    });

    // Update active dropdown items
    document.querySelectorAll('.lang-dropdown-item').forEach(item => {
      if (item.getAttribute('data-lang-val') === lang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-selected');
      }
    });

    // Update search placeholder dynamically
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.setAttribute('placeholder', meta.searchPlaceholder);
    }

    // Broadcast language change to other components
    window.dispatchEvent(new CustomEvent('siteLanguageChange', { detail: { lang } }));
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

      const lang = document.body.getAttribute('data-lang') || 'en';

      const filtered = query === '' 
        ? SEARCH_DATA.slice(0, 5) 
        : SEARCH_DATA.filter(item => {
            const matchEn = item.title_en && item.title_en.toLowerCase().includes(query);
            const matchDe = item.title_de && item.title_de.toLowerCase().includes(query);
            const matchKeywords = item.keywords && item.keywords.toLowerCase().includes(query);
            return matchEn || matchDe || matchKeywords;
          });

      if (filtered.length === 0) {
        const meta = LANG_META[lang] || LANG_META['en'];
        searchResults.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            ${meta.searchEmpty}
          </div>
        `;
        return;
      }

      const isInPosts = window.location.pathname.includes('/posts/') || !!document.querySelector('link[href*="../../assets"]');
      const urlPrefix = isInPosts ? '../../' : '';

      searchResults.innerHTML = filtered.map(item => {
        let title = item.title_en;
        if (lang === 'de') {
          title = item.title_de || item.title_en;
        }

        let category = item.category;
        if (lang === 'de') {
          if (category.includes('CV')) category = 'Lebenslauf / Profil';
          else if (category.includes('Blog')) category = 'Blog / Technische Artikel';
          else if (category.includes('Projects')) category = 'Projekte / Systeme';
        } else {
          if (category.includes('CV')) category = 'CV / Resume';
          else if (category.includes('Blog')) category = 'Blog / Articles';
          else if (category.includes('Projects')) category = 'Projects / Systems';
        }

        const targetUrl = (item.url.startsWith('http') || item.url.startsWith('/')) ? item.url : (urlPrefix + item.url);
        return `
          <a class="search-result-item" href="${targetUrl}">
            <div class="search-result-title">${title}</div>
            <div class="search-result-meta">${category}</div>
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
      const lang = document.body.getAttribute('data-lang') || 'en';
      const meta = LANG_META[lang] || LANG_META['en'];
      toast.textContent = meta.bibtexToast;
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
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-open');
      });

      // Close when clicking any link inside mobile drawer
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-open');
        });
      });

      // Close when tapping anywhere outside the mobile menu
      document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('mobile-open')) {
          if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
          }
        }
      });

      // Close on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
        }
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

