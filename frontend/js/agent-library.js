/* ============================================================
   KDS ERP Crew — Agent Library Page JavaScript (API-driven)
   ============================================================ */

(function () {
  'use strict';

 var categories = [];   // from /api/agent-categories
var AGENTS = [];       // from /api/agents (normalized)
var SOLUTIONS = [];    // from /api/solutions (normalized)
var currentFilter = 'All';
var currentQuery = '';
var modalAgent = null;

  /* ── Escape HTML ─────────────────────────────────────────── */
  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Load data from API, then boot everything ───────────── */
  function loadData() {
    var grid = document.getElementById('catalogue-grid');
    var countEl = document.getElementById('catalogue-count');
    if (countEl) countEl.textContent = 'Loading agents…';

    Promise.all([
      fetch('/api/agent-categories').then(function (r) {
        if (!r.ok) throw new Error('agent-categories HTTP ' + r.status);
        return r.json();
      }),
      fetch('/api/agents').then(function (r) {
        if (!r.ok) throw new Error('agents HTTP ' + r.status);
        return r.json();
      })
    ]).then(function (results) {
      var catRes = results[0];
      var agentRes = results[1];

      if (!catRes || catRes.success !== true || !Array.isArray(catRes.data)) {
        throw new Error('agent-categories: unexpected response shape');
      }
      if (!agentRes || agentRes.success !== true || !Array.isArray(agentRes.data)) {
        throw new Error('agents: unexpected response shape');
      }

      categories = catRes.data;

      // Normalize agent objects: cat = category name (slug often null, so prefer name)
      AGENTS = agentRes.data.map(function (a) {
        var catLabel = '';
        if (a.category) {
          catLabel = a.category.slug || a.category.name || '';
        }
        return {
          id: a.id,
          name: a.name || '',
          desc: a.description || '',
          cat: catLabel,
          demo: !!a.has_demo,
          demoUrl: a.demo_url || ''
        };
      });

      console.log('[agent-library] categories loaded:', categories.length, 'agents loaded:', AGENTS.length);

      renderFilterButtons();
      updateFilterStyles();
      renderGrid();
    }).catch(function (err) {
      console.error('[agent-library] data load error:', err);
      if (grid) {
        grid.innerHTML = '';
      }
      if (countEl) {
        countEl.textContent = 'Could not load agents. Please refresh, or check console for details.';
      }
      var emptyEl = document.getElementById('catalogue-empty');
      if (emptyEl) {
        emptyEl.textContent = 'Could not load agents right now.';
        emptyEl.classList.remove('hidden');
      }
    });
  }

  /* ── Filtering ───────────────────────────────────────────── */
  function getFiltered() {
    var q = currentQuery.trim().toLowerCase();
    return AGENTS.filter(function (a) {
      if (currentFilter !== 'All' && a.cat !== currentFilter) return false;
      if (!q) return true;
      return a.name.toLowerCase().indexOf(q) !== -1 || a.desc.toLowerCase().indexOf(q) !== -1;
    });
  }

  /* ── Render grid ─────────────────────────────────────────── */
  function renderGrid() {
    var grid = document.getElementById('catalogue-grid');
    var countEl = document.getElementById('catalogue-count');
    var emptyEl = document.getElementById('catalogue-empty');
    if (!grid) return;

    var filtered = getFiltered();

    if (countEl) {
      var label = currentFilter !== 'All' ? currentFilter : '';
      countEl.innerHTML = '<span class="font-semibold text-foreground">' + filtered.length + '</span> shown' +
        (label ? ' in ' + escHtml(label) : '') +
        (currentQuery ? ' matching &ldquo;' + escHtml(currentQuery) + '&rdquo;' : '');
    }

    grid.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyEl) {
        emptyEl.textContent = 'No agents match your filter.';
        emptyEl.classList.remove('hidden');
      }
      return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');

    var frag = document.createDocumentFragment();

    filtered.forEach(function (agent) {
      var div = document.createElement('div');
      div.className = 'group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition hover:border-brand hover:shadow-sm';

      var demoBtn = agent.demo
        ? '<button type="button" class="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium text-brand-foreground hover:brightness-110 demo-open-btn">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>' +
          ' Demo</button>'
        : '';

      div.innerHTML =
        '<div class="flex items-start justify-between gap-2">' +
          '<span class="inline-flex shrink-0 items-center rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">' + escHtml(agent.cat) + '</span>' +
          demoBtn +
        '</div>' +
        '<h3 class="mt-3 text-sm font-semibold leading-snug text-foreground">' + escHtml(agent.name) + '</h3>' +
        '<p class="mt-2 text-xs leading-relaxed text-muted-foreground">' + escHtml(agent.desc) + '</p>';

      if (agent.demo) {
        var btn = div.querySelector('.demo-open-btn');
        if (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            openDemoModal(agent);
          });
        }
      }

      frag.appendChild(div);
    });

    grid.appendChild(frag);
  }

  /* ── Filter buttons ──────────────────────────────────────── */
  function renderFilterButtons() {
    var bar = document.getElementById('filter-bar');
    if (!bar) return;
    bar.innerHTML = '';

    // "All" button
    var allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.dataset.filter = 'All';
    allBtn.className = 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition filter-btn border-border bg-white text-foreground hover:border-brand hover:text-brand';
    allBtn.innerHTML = 'All<span class="rounded-full px-1.5 text-[10px] font-semibold bg-muted filter-count">' + AGENTS.length + '</span>';
    allBtn.addEventListener('click', function () {
      currentFilter = 'All';
      updateFilterStyles();
      renderGrid();
    });
    bar.appendChild(allBtn);

    // Category buttons — only show categories that actually have agents
    categories.forEach(function (cat) {
      var label = cat.slug || cat.name;
      if (!label) return;
      var count = AGENTS.filter(function (a) { return a.cat === label; }).length;
      if (count === 0) return; // skip empty categories so filter bar stays clean

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.filter = label;
      btn.className = 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition filter-btn border-border bg-white text-foreground hover:border-brand hover:text-brand';
      btn.innerHTML = escHtml(label) + '<span class="rounded-full px-1.5 text-[10px] font-semibold bg-muted filter-count">' + count + '</span>';
      btn.addEventListener('click', function () {
        currentFilter = label;
        updateFilterStyles();
        renderGrid();
      });
      bar.appendChild(btn);
    });
  }

  function updateFilterStyles() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      var isActive = btn.dataset.filter === currentFilter;
      var countSpan = btn.querySelector('.filter-count');
      if (isActive) {
        btn.className = 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition filter-btn border-brand bg-brand text-brand-foreground';
        if (countSpan) countSpan.className = 'rounded-full px-1.5 text-[10px] font-semibold bg-white/25 filter-count';
      } else {
        btn.className = 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition filter-btn border-border bg-white text-foreground hover:border-brand hover:text-brand';
        if (countSpan) countSpan.className = 'rounded-full px-1.5 text-[10px] font-semibold bg-muted filter-count';
      }
    });
  }

  /* ── Demo modal ──────────────────────────────────────────── */
  function openDemoModal(agent) {
    var modal = document.getElementById('demo-modal');
    if (!modal) return;
    document.getElementById('demo-modal-cat').textContent = agent.cat;
    document.getElementById('demo-modal-title').textContent = agent.name;
    document.getElementById('demo-modal-desc').textContent = agent.desc;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalAgent = agent;
  }
  function closeDemoModal() {
    var modal = document.getElementById('demo-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    modalAgent = null;
  }

  /* ── Search ──────────────────────────────────────────────── */
  function initSearch() {
    var input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', function () {
      currentQuery = input.value;
      renderGrid();
    });
  }

  /* ── Sticky filter bar: account for header height ─────────── */
  function initStickyFilter() {
    var filterBar = document.getElementById('catalogue-filter-sticky');
    if (!filterBar) return;

    function setStickyTop() {
      var header = document.querySelector('header');
      if (header) {
        var h = header.getBoundingClientRect().height;
        filterBar.style.top = h + 'px';
      }
    }
    setStickyTop();
    window.addEventListener('resize', setStickyTop, { passive: true });
  }
/* ── Load Catalogue Section text (badge, heading, notice) ── */
  function loadCatalogueSettings() {
    fetch('/api/catalogue-settings')
      .then(function (r) {
        if (!r.ok) throw new Error('catalogue-settings HTTP ' + r.status);
        return r.json();
      })
      .then(function (response) {
        if (!response || response.success !== true) return;
        var data = response.data;

        var badge = document.getElementById('catalogue-badge');
        if (badge) badge.textContent = data.badge_text || '';

        var heading = document.getElementById('catalogue-heading');
        if (heading) heading.textContent = data.heading || '';

        var desc = document.getElementById('catalogue-description');
        if (desc) desc.textContent = data.description || '';

        var noticeText = document.getElementById('catalogue-notice-text');
        if (noticeText) noticeText.textContent = data.notice_text || '';

        var noticeLink = document.getElementById('catalogue-notice-link');
        if (noticeLink) {
          noticeLink.textContent = data.notice_link_text || '';
          noticeLink.href = data.notice_link_url || '#';
        }
      })
      .catch(function (err) {
        console.error('[agent-library] catalogue settings load error:', err);
      });
  }

 /* ── Solutions section (now API-driven from /api/solutions) ── */
  var SVG_ZAP = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
  var SVG_CLOCK = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';

  function openSolutionModal(solution) {
    var modal = document.getElementById('solution-modal');
    if (!modal) return;
    document.getElementById('sol-modal-steps').textContent = solution.steps + ' steps';
    document.getElementById('sol-modal-title').textContent = solution.title;
    document.getElementById('sol-modal-desc').textContent = solution.desc;
    document.getElementById('sol-modal-automation').textContent = solution.automation;
    document.getElementById('sol-modal-outcome').textContent = solution.outcome;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeSolutionModal() {
    var modal = document.getElementById('solution-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function renderSolutionsGrid() {
    var grid = document.getElementById('solutions-grid');
    if (!grid) return;
    grid.innerHTML = '';

    SOLUTIONS.forEach(function (sol) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'group flex h-full flex-col rounded-xl border border-border bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg w-full';
      btn.innerHTML =
        '<div class="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">' + sol.steps + ' steps</div>' +
        '<h3 class="text-base font-bold leading-snug text-foreground">' + escHtml(sol.title) + '</h3>' +
        '<p class="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">' + escHtml(sol.desc) + '</p>' +
        '<div class="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs">' +
          '<span class="inline-flex items-center gap-1 font-semibold text-foreground">' + SVG_ZAP + ' ' + escHtml(sol.automation) + '</span>' +
          '<span class="text-muted-foreground">·</span>' +
          '<span class="inline-flex items-center gap-1 text-muted-foreground">' + SVG_CLOCK + ' ' + escHtml(sol.outcome) + '</span>' +
        '</div>';
      btn.addEventListener('click', function () { openSolutionModal(sol); });
      grid.appendChild(btn);
    });
  }

function loadSolutionsHeader() {
    fetch('/api/agent-section/slug/agent-library-solutions')
      .then(function (r) {
        if (!r.ok) throw new Error('agent-section HTTP ' + r.status);
        return r.json();
      })
      .then(function (res) {
        if (!res || res.success !== true || !res.data) return;
        var d = res.data;
        var badgeEl = document.getElementById('sol-header-badge');
        var headingEl = document.getElementById('sol-header-heading');
        var descEl = document.getElementById('sol-header-description');
        var ctaTextEl = document.getElementById('sol-header-cta-text');

        if (badgeEl && d.badge_text) badgeEl.textContent = d.badge_text;
        if (headingEl && d.heading) headingEl.textContent = d.heading;
        if (descEl && d.description) descEl.textContent = d.description;
        if (ctaTextEl && d.cta_button_text) ctaTextEl.textContent = d.cta_button_text;
      })
      .catch(function (err) {
        console.error('[agent-library] solutions header load error:', err);
      });
  }

  function initSolutions() {
    var grid = document.getElementById('solutions-grid');
    if (!grid) return;

    loadSolutionsHeader();

    fetch('/api/solutions')
      .then(function (r) {
        if (!r.ok) throw new Error('solutions HTTP ' + r.status);
        return r.json();
      })
      .then(function (res) {
        if (!res || res.success !== true || !Array.isArray(res.data)) {
          throw new Error('solutions: unexpected response shape');
        }

        // Normalize DB fields -> fields used by the render/modal code
        SOLUTIONS = res.data.map(function (s) {
          return {
            id: s.id,
            title: s.title || '',
            desc: s.description || '',
            steps: s.steps_count,
            automation: (s.automation_percentage != null ? s.automation_percentage + '% Automation' : ''),
            outcome: s.outcome_label || ''
          };
        });

        renderSolutionsGrid();
      })
      .catch(function (err) {
        console.error('[agent-library] solutions load error:', err);
        grid.innerHTML = '<p class="text-sm text-muted-foreground">Could not load solutions right now.</p>';
      });

    var viewAllBtn = document.getElementById('solutions-view-all');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function () {
        alert('Contact Key Dynamics Solutions to view all AI solutions:\nhttps://keydynamicssolutions.com/');
      });
    }

    var solCloseBtn = document.getElementById('sol-modal-close');
    var solBackdrop = document.getElementById('sol-modal-backdrop');
    if (solCloseBtn) solCloseBtn.addEventListener('click', closeSolutionModal);
    if (solBackdrop) solBackdrop.addEventListener('click', closeSolutionModal);
  }

  /* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    loadData();          // fetches categories + agents, then renders grid/filters
    loadCatalogueSettings();
    initSearch();
    initStickyFilter();
    initSolutions();      // now fetches from /api/solutions

    var closeBtn = document.getElementById('demo-modal-close');
    var backdrop = document.getElementById('demo-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeDemoModal);
    if (backdrop) backdrop.addEventListener('click', closeDemoModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDemoModal(); closeSolutionModal(); }
    });
  });

})();