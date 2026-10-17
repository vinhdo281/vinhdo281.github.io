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
        const isVi = getLang() === 'vi';
        hudCounter.innerHTML = isVi
          ? `<span class="status-dot"></span> ĐANG HIỂN THỊ: <strong>${visibleCount}/${totalCount}</strong> DỰ ÁN`
          : `<span class="status-dot"></span> DISPLAYING: <strong>${visibleCount}/${totalCount}</strong> PROJECTS`;
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
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        setTimeout(updateCards, 50);
        if (currentProjectId) {
          renderModalContent(currentProjectId, currentActiveTab);
        }
      });
    }

    updateCards();
  }

  // --- 2. MODAL RENDERING ---
  function openProjectModal(projectId, defaultTab = 'overview') {
    if (!window.PROJECTS_DATA) return;
    const project = window.PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    currentProjectId = projectId;
    currentActiveTab = defaultTab;

    const modalBackdrop = document.getElementById('project-modal-backdrop');
    if (!modalBackdrop) return;

    renderModalContent(projectId, defaultTab);
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderModalContent(projectId, activeTab) {
    const project = window.PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    const isVi = getLang() === 'vi';
    const badgeEl = document.getElementById('project-modal-badge');
    const titleEl = document.getElementById('project-modal-title');
    const githubLinkEl = document.getElementById('project-modal-github-link');
    const blogLinkEl = document.getElementById('project-modal-blog-link');
    const bodyEl = document.getElementById('project-modal-body');
    const tabBtns = document.querySelectorAll('.project-modal-tab-btn');

    if (badgeEl) badgeEl.textContent = project.badge;
    if (titleEl) titleEl.textContent = isVi ? project.title_vi : project.title_en;

    if (githubLinkEl) {
      githubLinkEl.href = project.github_url;
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
        contentHtml = isVi ? project.overview_vi : project.overview_en;
        // Prepend metrics grid if available
        if (project.metrics && project.metrics.length > 0) {
          const metricsGridHtml = `
            <div class="metrics-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
              ${project.metrics.map(m => `
                <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.25); border-radius: 8px; padding: 0.75rem; text-align: center;">
                  <div style="font-family: var(--font-mono); font-size: 1.25rem; color: var(--accent-cyan); font-weight: bold;">${m.value}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${isVi ? m.label_vi : m.label_en}</div>
                </div>
              `).join('')}
            </div>
          `;
          contentHtml = metricsGridHtml + contentHtml;
        }
        break;
      case 'architecture':
        contentHtml = isVi ? project.architecture_vi : project.architecture_en;
        break;
      case 'guide':
        contentHtml = isVi ? project.guide_vi : project.guide_en;
        break;
      case 'results':
        contentHtml = isVi ? project.results_vi : project.results_en;
        break;
      case 'demo':
        contentHtml = isVi ? project.demo_vi : project.demo_en;
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
        copyBtn.setAttribute('title', isVi ? 'Sao chép đoạn mã' : 'Copy code');
        copyBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>${isVi ? 'Sao chép' : 'Copy'}</span>
        `;
        copyBtn.style.cssText = 'position: absolute; top: 8px; right: 8px; padding: 0.2rem 0.55rem; font-size: 0.72rem; font-family: var(--font-mono); background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: var(--text-secondary); border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; transition: var(--transition); z-index: 5;';

        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const codeText = preEl.textContent.trim();
          navigator.clipboard.writeText(codeText).then(() => {
            copyBtn.innerHTML = `<span style="color:var(--accent-cyan); font-weight: 500;">${isVi ? 'Đã sao chép' : 'Copied'}</span>`;
            setTimeout(() => {
              copyBtn.innerHTML = `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>${isVi ? 'Sao chép' : 'Copy'}</span>
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

    // Expose globally
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProjectToolbar();
    initModalEvents();

    // Auto-open modal if URL hash matches a project ID
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      if (window.PROJECTS_DATA && window.PROJECTS_DATA.some(p => p.id === hashId)) {
        setTimeout(() => openProjectModal(hashId), 200);
      }
    }
  });
})();
