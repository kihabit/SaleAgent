/**
 * agent-section.js
 * Fetches /api/agent-section and dynamically renders the "Agent Highlights"
 * section (#highlights-tab-bar, #highlights-grid) in index.html.
 *
 * Include this AFTER data.js/home.js and BEFORE the closing </body>,
 * e.g.:
 *   <script src="/frontend/js/agent-section.js"></script>
 *
 * If home.js already has old/static logic for #highlights-tab-bar or
 * #highlights-grid, remove that part from home.js to avoid it being
 * overwritten by this script (or vice versa).
 */

(function () {
  const API_URL = '/api/agent-section';

  document.addEventListener('DOMContentLoaded', loadHighlights);

  async function loadHighlights() {
    const grid = document.getElementById('highlights-grid');
    if (!grid) return; // section not on this page

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (!json.success || !json.data) throw new Error('Invalid API response');

      renderHighlights(json.data);
    } catch (err) {
      console.error('[agent-section.js] Failed to load highlights:', err);
      grid.innerHTML = `<p class="text-sm text-muted-foreground">Unable to load agents right now.</p>`;
    }
  }

  function renderHighlights(data) {
    const tabBar = document.getElementById('highlights-tab-bar');
    const grid = document.getElementById('highlights-grid');
    const countEl = document.getElementById('highlights-count');
    const hintEl = document.getElementById('highlights-hint');
    const browseBtn = document.getElementById('highlights-browse-btn');

    const categories = (data.categories || []).filter(c => c.agents && c.agents.length);
    if (!categories.length) {
      grid.innerHTML = `<p class="text-sm text-muted-foreground">No agents available yet.</p>`;
      return;
    }

    // Optional: fill dynamic heading/description if these elements exist in your HTML
    setTextIfExists('highlights-heading', data.heading);
    setTextIfExists('highlights-description', data.description);
    setTextIfExists('highlights-badge', data.badge_text);

    let activeCategoryId = categories[0].id;

    function renderTabs() {
      tabBar.innerHTML = categories
        .map(
          (cat) => `
        <button type="button" data-cat-id="${cat.id}"
          class="highlight-tab-btn px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
            cat.id === activeCategoryId
              ? 'text-brand border-brand'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }">
          ${escapeHtml(cat.name)}
          <span class="text-xs opacity-70">(${cat.count})</span>
        </button>`
        )
        .join('');

      tabBar.querySelectorAll('.highlight-tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeCategoryId = Number(btn.dataset.catId);
          renderTabs();
          renderGrid();
        });
      });
    }

    function renderGrid() {
      const activeCategory = categories.find((c) => c.id === activeCategoryId);
      if (!activeCategory) return;

      const demoAgents = activeCategory.agents.filter((a) => a.has_demo);
      const agentsToShow = demoAgents.length ? demoAgents : activeCategory.agents;

      if (countEl) {
        countEl.textContent = `${demoAgents.length} agent${demoAgents.length !== 1 ? 's' : ''}`;
      }
      if (hintEl) {
        hintEl.textContent = `View all ${activeCategory.count} in ${activeCategory.name}`;
      }

      grid.innerHTML = agentsToShow
        .slice(0, 8)
        .map(
          (agent) => `
        <div class="agent-highlight-card cursor-pointer rounded-2xl border border-border bg-white p-5 transition hover:shadow-lg"
             data-agent-id="${agent.id}">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
            ${
              agent.icon
                ? `<img src="${agent.icon}" alt="" class="h-6 w-6 object-contain" />`
                : defaultIconSvg()
            }
          </div>
          <h3 class="mt-4 text-base font-bold text-foreground">${escapeHtml(agent.name)}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">
            ${escapeHtml(agent.description || '')}
          </p>
          ${
            agent.has_demo
              ? `<span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">▶ Watch Demo</span>`
              : ''
          }
        </div>`
        )
        .join('');

      grid.querySelectorAll('.agent-highlight-card').forEach((card) => {
        card.addEventListener('click', () => {
          const agentId = Number(card.dataset.agentId);
          const agent = activeCategory.agents.find((a) => a.id === agentId);
          if (agent) openDemoModal(agent, activeCategory);
        });
      });
    }

    if (browseBtn) {
      browseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/agent-library';
      });
    }

    renderTabs();
    renderGrid();
  }

  function openDemoModal(agent, category) {
    const modal = document.getElementById('demo-modal');
    if (!modal) return;

    setTextIfExists('demo-modal-cat', category.name);
    setTextIfExists('demo-modal-title', agent.name);
    setTextIfExists('demo-modal-desc', agent.description || '');

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeDemoModal() {
    const modal = document.getElementById('demo-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  document.getElementById('demo-modal-close')?.addEventListener('click', closeDemoModal);
  document.getElementById('demo-modal-backdrop')?.addEventListener('click', closeDemoModal);

  function setTextIfExists(id, text) {
    const el = document.getElementById(id);
    if (el && text != null) el.textContent = text;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str ?? '';
    return div.innerHTML;
  }

  function defaultIconSvg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`;
  }
})();