/**
 * Cyber-Tech Project Matrix & Modal Controller
 * Handles live filtering, search query matching, and full-screen cyber modal rendering.
 */

(function () {
  'use strict';

  let currentProjectId = null;
  let currentActiveTab = 'overview';

  function getLang() {
    return document.body.getAttribute('data-lang') || 'vi';
  }

  function getProjectsData() {
    if (typeof PROJECTS_DATA !== 'undefined' && Array.isArray(PROJECTS_DATA)) {
      return PROJECTS_DATA;
    }
    if (typeof window !== 'undefined' && Array.isArray(window.PROJECTS_DATA)) {
      return window.PROJECTS_DATA;
    }
    if (typeof globalThis !== 'undefined' && Array.isArray(globalThis.PROJECTS_DATA)) {
      return globalThis.PROJECTS_DATA;
    }
    return [];
  }

  // --- 1. FILTERING & SEARCH ---
  function initProjectToolbar() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const searchInput = document.getElementById('project-search-input');
    const cards = document.querySelectorAll('.project-card');
    const hudCounter = document.getElementById('project-count-hud');

    let currentFilter = 'all';
    let searchQuery = '';

    function updateCards() {
      let visibleCount = 0;
      const totalCount = cards.length;

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const text = card.textContent.toLowerCase();
        const matchesCategory = (currentFilter === 'all') || cat.includes(currentFilter);
        const matchesSearch = !searchQuery || text.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (hudCounter) {
        const lang = getLang();
        if (lang === 'vi') {
          hudCounter.innerHTML = `<span class="status-dot"></span> ĐANG HIỂN THỊ: <strong>${visibleCount}/${totalCount}</strong> DỰ ÁN`;
        } else if (lang === 'de') {
          hudCounter.innerHTML = `<span class="status-dot"></span> ANGEZEIGT: <strong>${visibleCount}/${totalCount}</strong> PROJEKTE`;
        } else {
          hudCounter.innerHTML = `<span class="status-dot"></span> DISPLAYING: <strong>${visibleCount}/${totalCount}</strong> PROJECTS`;
        }
      }

      if (searchInput) {
        const lang = getLang();
        if (lang === 'vi') {
          searchInput.placeholder = 'Lọc theo tên, thuật toán, công nghệ...';
        } else if (lang === 'de') {
          searchInput.placeholder = 'Nach Name, Algorithmus, Technologie filtern...';
        } else {
          searchInput.placeholder = 'Filter by name, algorithm, technology...';
        }
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        updateCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        updateCards();
      });
    }

    // Update counter on language change
    window.addEventListener('siteLanguageChange', () => {
      updateCards();
      if (currentProjectId) {
        renderModalContent(currentProjectId, currentActiveTab);
      }
    });

    updateCards();
  }

  // --- 2. MODAL RENDERING ---
  function openProjectModal(projectId, defaultTab) {
    defaultTab = defaultTab || 'overview';
    const data = getProjectsData();
    if (!data || data.length === 0) {
      console.warn('Projects data not available yet');
      return;
    }
    const project = data.find(p => p.id === projectId);
    if (!project) {
      console.warn('Project not found for id:', projectId);
      return;
    }

    currentProjectId = projectId;
    currentActiveTab = defaultTab;

    const modalBackdrop = document.getElementById('project-modal-backdrop');
    if (!modalBackdrop) {
      console.warn('Modal backdrop element not found');
      return;
    }

    renderModalContent(projectId, defaultTab);
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderModalContent(projectId, activeTab) {
    const data = getProjectsData();
    const project = data.find(p => p.id === projectId);
    if (!project) return;

    const lang = getLang();
    const isVi = lang === 'vi';
    const isDe = lang === 'de';

    const badgeEl = document.getElementById('project-modal-badge');
    const titleEl = document.getElementById('project-modal-title');
    const githubLinkEl = document.getElementById('project-modal-github-link');
    const blogLinkEl = document.getElementById('project-modal-blog-link');
    const bodyEl = document.getElementById('project-modal-body');
    const tabBtns = document.querySelectorAll('.project-modal-tab-btn');

    if (badgeEl) badgeEl.textContent = project.badge;
    if (titleEl) {
      if (isVi) {
        titleEl.textContent = project.title_vi;
      } else if (isDe && project.title_de) {
        titleEl.textContent = project.title_de;
      } else {
        titleEl.textContent = project.title_en;
      }
    }

    if (githubLinkEl) {
      githubLinkEl.href = project.github_url || '#';
      githubLinkEl.style.display = project.github_url ? 'inline-flex' : 'none';
    }

    if (blogLinkEl) {
      if (project.blog_url) {
        blogLinkEl.href = project.blog_url;
        blogLinkEl.style.display = 'inline-flex';
      } else {
        blogLinkEl.style.display = 'none';
      }
    }

    // Set active tab buttons
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === activeTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Render body content
    let contentHtml = '';
    switch (activeTab) {
      case 'overview':
        contentHtml = isVi ? project.overview_vi : (isDe && project.overview_de ? project.overview_de : project.overview_en);
        // Prepend metrics grid if available
        if (project.metrics && project.metrics.length > 0) {
          const metricsGridHtml = `
            <div class="metrics-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
              ${project.metrics.map(m => {
                const label = isVi ? m.label_vi : (isDe && m.label_de ? m.label_de : m.label_en);
                return `
                  <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.25); border-radius: 8px; padding: 0.75rem; text-align: center;">
                    <div style="font-family: var(--font-mono); font-size: 1.25rem; color: var(--accent-cyan); font-weight: bold;">${m.value}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${label}</div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
          contentHtml = metricsGridHtml + contentHtml;
        }
        break;
      case 'architecture':
        contentHtml = isVi ? project.architecture_vi : (isDe && project.architecture_de ? project.architecture_de : project.architecture_en);
        break;
      case 'guide':
        contentHtml = isVi ? project.guide_vi : (isDe && project.guide_de ? project.guide_de : project.guide_en);
        break;
      case 'results':
        contentHtml = isVi ? project.results_vi : (isDe && project.results_de ? project.results_de : project.results_en);
        break;
      case 'demo':
        contentHtml = isVi ? project.demo_vi : (isDe && project.demo_de ? project.demo_de : project.demo_en);
        break;
      default:
        contentHtml = isVi ? project.overview_vi : project.overview_en;
    }

    if (bodyEl) {
      bodyEl.innerHTML = contentHtml || '<p>Đang cập nhật nội dung...</p>';
      bodyEl.scrollTop = 0;

      // Enhance code blocks with copy buttons
      bodyEl.querySelectorAll('.code-terminal, pre').forEach(block => {
        if (block.querySelector('.code-copy-btn')) return;
        const preEl = block.tagName === 'PRE' ? block : block.querySelector('pre');
        if (!preEl) return;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.setAttribute('title', isVi ? 'Sao chép đoạn mã' : (isDe ? 'Code kopieren' : 'Copy code'));
        copyBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>${isVi ? 'Sao chép' : (isDe ? 'Kopieren' : 'Copy')}</span>
        `;
        copyBtn.style.cssText = 'position: absolute; top: 8px; right: 8px; padding: 0.2rem 0.55rem; font-size: 0.72rem; font-family: var(--font-mono); background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; transition: var(--transition); z-index: 5;';

        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const codeText = preEl.textContent.trim();
          navigator.clipboard.writeText(codeText).then(() => {
            copyBtn.innerHTML = `<span style="color:var(--accent-cyan); font-weight: 500;">${isVi ? 'Đã sao chép' : (isDe ? 'Kopiert' : 'Copied')}</span>`;
            setTimeout(() => {
              copyBtn.innerHTML = `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>${isVi ? 'Sao chép' : (isDe ? 'Kopieren' : 'Copy')}</span>
              `;
            }, 2000);
          });
        });

        // Set position relative on block container if not already
        if (getComputedStyle(block).position === 'static') {
          block.style.position = 'relative';
        }
        block.appendChild(copyBtn);
      });
    }
  }

  function closeProjectModal() {
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      currentProjectId = null;
    }
  }

  function initModalEvents() {
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    const closeBtn = document.getElementById('project-modal-close-btn');
    const tabBtns = document.querySelectorAll('.project-modal-tab-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeProjectModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeProjectModal();
        }
      });
    }

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab && currentProjectId) {
          currentActiveTab = tab;
          renderModalContent(currentProjectId, tab);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProjectModal();
      }
    });

    // Wire up all buttons inside project cards directly
    document.querySelectorAll('.project-card').forEach(card => {
      const projectId = card.id;
      const btns = card.querySelectorAll('.project-card-footer button, button[data-project-id]');
      btns.forEach(btn => {
        if (projectId) {
          btn.setAttribute('data-project-id', projectId);
        }
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('data-project-id') || projectId;
          if (targetId) {
            openProjectModal(targetId);
          }
        });
      });
    });
  }

  // Expose immediately so onclick handlers can access them
  window.openProjectModal = openProjectModal;
  window.closeProjectModal = closeProjectModal;
  if (typeof globalThis !== 'undefined') {
    globalThis.openProjectModal = openProjectModal;
    globalThis.closeProjectModal = closeProjectModal;
  }

  function init() {
    initProjectToolbar();
    initModalEvents();

    // Auto-open modal if URL hash matches a project ID
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const data = getProjectsData();
      if (data && data.some(p => p.id === hashId)) {
        setTimeout(() => openProjectModal(hashId), 200);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
