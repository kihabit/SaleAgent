/* ============================================================
   KDS ERP Crew — Home Page JavaScript
   Covers: Hero Carousel, Highlights Tabs, AI Co-Worker wheel,
           Demo Steps scroll animation, Solutions modal, Demo modal
   All vanilla JS — no React, no npm, no server required.
   ============================================================ */

(function () {
  'use strict';

  /* ── SVG icon helpers ─────────────────────────────────────── */
  var SVG = {
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    playCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
    network: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>',
    zap: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    xClose: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
  };

  /* ── Scroll helper ────────────────────────────────────────── */
  function scrollTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.scrollToSection = scrollTo;

  /* ══════════════════════════════════════════════════════════
     HERO CAROUSEL
  ══════════════════════════════════════════════════════════ */
  var SLIDES = [
    {
      bg: 'assets/images/hero-slide-1.png',
      overlay: true,
      heading: ['Digital Transaction', 'Management Assistant'],
      description: 'Transform ERP transactions into intelligent, AI-driven workflows that improve visibility, accelerate approvals, and streamline business operations.',
      stats: [
        { value: '68+', label: 'Transaction Use Cases' },
        { value: '16+', label: 'Business Functions' },
        { value: '8+', label: 'Enterprise Workflows' },
        { icon: true, label: 'End-to-End Transaction Management' }
      ]
    },
    {
      bg: 'assets/images/hero-slide-2.png',
      overlay: true,
      heading: ['From ERP Data to', 'Decision Intelligence'],
      description: 'Turn real-time ERP data into actionable insights with AI-powered analytics, predictive intelligence, and smarter business decisions.',
      stats: [
        { value: '100+', label: 'Data Connectors' },
        { value: '21+', label: 'Business Functions' },
        { value: '10+', label: 'Analytics Modules' },
        { icon: true, label: 'Always-On Decision Intelligence' }
      ]
    },
    {
      bg: 'assets/images/hero-slide-4.png',
      overlay: false,
      heading: ['AI-Driven Transaction', 'Processing'],
      description: 'Accelerate transaction processing with AI-powered validation, automation, and exception handling for faster, more accurate operations.',
      stats: [
        { value: '90+', label: 'Transaction Use Cases' },
        { value: '21+', label: 'Business Functions' },
        { value: '10+', label: 'Enterprise Workflows' },
        { icon: true, label: 'End-to-End Transaction Management' }
      ]
    },
    {
      bg: 'assets/images/hero-slide-5.png',
      overlay: false,
      heading: ['AI-Powered Data', 'Insights'],
      description: 'Unlock meaningful business intelligence with AI-driven analytics, interactive dashboards, and real-time performance monitoring.',
      stats: [
        { value: '100+', label: 'Data Connectors' },
        { value: '21+', label: 'Business Functions' },
        { value: '10+', label: 'Analytics Modules' },
        { icon: true, label: 'Always-On Decision Intelligence Assistant' }
      ]
    },
    {
      bg: 'assets/images/hero-slide-6.png',
      overlay: false,
      heading: ['Smart AI Approval', 'Assistant'],
      description: 'Empower teams with an intelligent approval assistant that delivers contextual recommendations, instant notifications, and seamless ERP approvals.',
      stats: [
        { value: '100+', label: 'Approval Scenarios' },
        { value: '21+', label: 'Business Functions' },
        { icon: true, label: 'Real-Time Workflow Visibility' },
        { icon: true, label: 'Always-On AI Approval Assistant' }
      ]
    }
  ];

  var heroCurrent = 0;
  var heroAutoplay = null;
  var heroCountUpRAFs = [];
  var AUTOPLAY_MS = 5500;

  function parseStatValue(v) {
    var m = v.match(/^(\d+)(.*)$/);
    if (!m) return null;
    return { num: parseInt(m[1], 10), suffix: m[2] };
  }

  function countUp(el, target, suffix, duration) {
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (t < 1) {
        var raf = requestAnimationFrame(tick);
        heroCountUpRAFs.push(raf);
      }
    }
    var raf = requestAnimationFrame(tick);
    heroCountUpRAFs.push(raf);
  }

  function cancelCountUps() {
    heroCountUpRAFs.forEach(function (id) { cancelAnimationFrame(id); });
    heroCountUpRAFs = [];
  }

  function renderHeroStats(slideIdx, visible) {
    var statsEl = document.getElementById('hero-stats');
    if (!statsEl) return;
    var slide = SLIDES[slideIdx];
    cancelCountUps();
    statsEl.innerHTML = '';
    slide.stats.forEach(function (stat) {
      var tile = document.createElement('div');
      tile.className = 'min-w-0 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur transition-all duration-500';
      tile.style.opacity = visible ? '1' : '0';
      tile.style.transform = visible ? 'translateY(0)' : 'translateY(12px)';

      var valueEl = document.createElement('div');
      valueEl.className = 'flex h-8 items-center text-2xl font-bold text-white md:text-3xl';
      tile.appendChild(valueEl);

      var labelEl = document.createElement('div');
      labelEl.className = 'mt-2 text-xs text-white/80 md:text-sm';
      labelEl.textContent = stat.label;
      tile.appendChild(labelEl);
      statsEl.appendChild(tile);

      if (stat.icon) {
        valueEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
      } else {
        var parsed = parseStatValue(stat.value);
        if (parsed && visible) {
          valueEl.textContent = '0' + parsed.suffix;
          countUp(valueEl, parsed.num, parsed.suffix, 1200);
        } else {
          valueEl.textContent = stat.value;
        }
      }
    });
  }

  function heroGoTo(idx) {
    if (idx === heroCurrent) return;
    var textEl = document.getElementById('hero-text');
    var bgLayers = document.querySelectorAll('.hero-bg-layer');
    var dots = document.querySelectorAll('.hero-dot');

    // Fade out text
    if (textEl) { textEl.style.opacity = '0'; textEl.style.transform = 'translateY(16px)'; }
    renderHeroStats(heroCurrent, false);

    setTimeout(function () {
      heroCurrent = idx;

      // Update heading/desc
      var heading = document.getElementById('hero-heading');
      var desc = document.getElementById('hero-desc');
      if (heading) heading.innerHTML = SLIDES[idx].heading.map(function (line) {
        return '<span class="block">' + line + '</span>';
      }).join('');
      if (desc) desc.textContent = SLIDES[idx].description;

      // Crossfade backgrounds
      bgLayers.forEach(function (layer, i) {
        layer.style.opacity = i === idx ? '1' : '0';
        layer.style.zIndex = i === idx ? '1' : '0';
        var img = layer.querySelector('img');
        if (img) {
          img.style.transform = i === idx ? 'scale(1.03)' : 'scale(1)';
        }
      });

      // Toggle overlay: hide it for slides with their own dark background
      var overlay = document.getElementById('hero-overlay');
      if (overlay) {
        overlay.style.opacity = SLIDES[idx].overlay ? '1' : '0';
      }

      // Update dots
      dots.forEach(function (dot, i) {
        dot.style.width = i === idx ? '2rem' : '0.625rem';
        dot.style.backgroundColor = i === idx ? '#051895' : 'rgba(5,24,149,0.3)';
      });

      // Fade in text
      if (textEl) {
        textEl.style.opacity = '1';
        textEl.style.transform = 'translateY(0)';
      }
      setTimeout(function () { renderHeroStats(idx, true); }, 120);
    }, 300);
  }

  function heroNext() { heroGoTo((heroCurrent + 1) % SLIDES.length); }
  function heroPrev() { heroGoTo((heroCurrent - 1 + SLIDES.length) % SLIDES.length); }

  function startHeroAutoplay() {
    heroAutoplay = setInterval(heroNext, AUTOPLAY_MS);
  }
  function resetHeroAutoplay() {
    clearInterval(heroAutoplay);
    startHeroAutoplay();
  }

  function initHero() {
    var header = document.querySelector('header');
    if (header) {
      var applyHeaderH = function (h) {
        document.documentElement.style.setProperty('--header-h', h + 'px');
      };
      applyHeaderH(header.getBoundingClientRect().height);
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(function (entries) {
          var entry = entries[0];
          var h = entry.borderBoxSize ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
          applyHeaderH(h);
        });
        ro.observe(header);
      }
    }

    // Wire prev/next buttons
    var btnPrev = document.getElementById('hero-prev');
    var btnNext = document.getElementById('hero-next');
    if (btnPrev) btnPrev.addEventListener('click', function () { heroPrev(); resetHeroAutoplay(); });
    if (btnNext) btnNext.addEventListener('click', function () { heroNext(); resetHeroAutoplay(); });

    // Wire dots
    document.querySelectorAll('.hero-dot').forEach(function (dot, i) {
      dot.addEventListener('click', function () { heroGoTo(i); resetHeroAutoplay(); });
    });

    // Wire CTA scroll buttons
    var btnHighlights = document.getElementById('hero-btn-highlights');
    var btnCatalogue = document.getElementById('hero-btn-catalogue');
    if (btnHighlights) btnHighlights.addEventListener('click', function () { scrollTo('highlights'); });
    if (btnCatalogue) btnCatalogue.addEventListener('click', function () { scrollTo('catalogue'); });

    // Init backgrounds
    var bgLayers = document.querySelectorAll('.hero-bg-layer');
    bgLayers.forEach(function (layer, i) {
      layer.style.opacity = i === 0 ? '1' : '0';
    });

    // Init overlay for the first slide
    var overlay = document.getElementById('hero-overlay');
    if (overlay) {
      overlay.style.opacity = SLIDES[0].overlay ? '1' : '0';
    }

    // Init text
    renderHeroStats(0, true);
    startHeroAutoplay();
  }

  /* ══════════════════════════════════════════════════════════
     DEMO MODAL (shared between Highlights and index page)
  ══════════════════════════════════════════════════════════ */
  function openDemoModal(agent) {
    var modal = document.getElementById('demo-modal');
    if (!modal) return;
    document.getElementById('demo-modal-cat').textContent = agent.cat;
    document.getElementById('demo-modal-title').textContent = agent.name;
    document.getElementById('demo-modal-desc').textContent = agent.desc;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeDemoModal() {
    var modal = document.getElementById('demo-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  window.openDemoModal = openDemoModal;
  window.closeDemoModal = closeDemoModal;

  /* ══════════════════════════════════════════════════════════
     HIGHLIGHTS SECTION
  ══════════════════════════════════════════════════════════ */
  var TABS = [
    { id: 'o2c',    label: 'Order to Cash',                cats: ['O2C'],          hint: 'See all O2C agents in the catalogue' },
    { id: 'p2p',    label: 'Procure to Pay',               cats: ['P2P'],          hint: 'See all P2P agents in the catalogue' },
    { id: 'sc',     label: 'Supply Chain',                  cats: ['Supply Chain'], hint: 'See all Supply Chain agents' },
    { id: 'cf',     label: 'Cross Functional',              cats: ['Platform'],     hint: 'See all Platform agents in the catalogue' },
    { id: 'd365ba', label: 'Dynamics 365 Business Agents', cats: ['D365 BA'],      hint: 'See all Dynamics 365 Business Agents' }
  ];

  var featuredAgents = AGENTS.filter(function (a) { return a.demo; });
  var activeTab = 'o2c';

  function getTabAgents(tabId) {
    var tab = TABS.find(function (t) { return t.id === tabId; });
    return featuredAgents.filter(function (a) { return tab.cats.indexOf(a.cat) !== -1; });
  }

  function renderHighlightCards() {
    var grid = document.getElementById('highlights-grid');
    var countEl = document.getElementById('highlights-count');
    var hintEl = document.getElementById('highlights-hint');
    if (!grid) return;

    var tab = TABS.find(function (t) { return t.id === activeTab; });
    var items = getTabAgents(activeTab);

    if (countEl) countEl.textContent = items.length + ' agent highlights';
    if (hintEl) hintEl.textContent = tab.hint + ' ';

    grid.innerHTML = '';
    items.forEach(function (agent) {
      var btn = document.createElement('button');
      btn.className = 'group flex h-full flex-col rounded-xl border border-border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md w-full';
      btn.innerHTML =
        '<div class="flex items-start justify-between gap-2">' +
          '<div class="flex items-center gap-2">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>' +
            '<h3 class="text-sm font-semibold leading-tight text-foreground">' + escHtml(agent.name) + '</h3>' +
          '</div>' +
          '<span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-medium text-brand-foreground">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>' +
            ' Demo' +
          '</span>' +
        '</div>' +
        '<p class="mt-3 text-sm leading-relaxed text-muted-foreground">' + escHtml(agent.desc) + '</p>' +
        '<span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition group-hover:opacity-100">Watch Demo ' + SVG.arrowRight + '</span>';
      btn.addEventListener('click', function () { openDemoModal(agent); });
      grid.appendChild(btn);
    });
  }

  function initHighlights() {
    var tabBar = document.getElementById('highlights-tab-bar');
    if (!tabBar) return;

    // Build tab buttons
    TABS.forEach(function (tab) {
      var count = featuredAgents.filter(function (a) { return tab.cats.indexOf(a.cat) !== -1; }).length;
      var btn = document.createElement('button');
      btn.dataset.tabId = tab.id;
      btn.className = 'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition text-muted-foreground hover:text-foreground';
      btn.innerHTML =
        escHtml(tab.label) +
        '<span class="rounded-full px-2 py-0.5 text-xs font-semibold bg-muted text-muted-foreground tab-count">' + count + '</span>';
      btn.addEventListener('click', function () {
        activeTab = tab.id;
        updateTabStyles();
        renderHighlightCards();
      });
      tabBar.appendChild(btn);
    });

    // Browse full catalogue button — navigates to the Agent Library page
    var browseBtn = document.getElementById('highlights-browse-btn');
    if (browseBtn) browseBtn.addEventListener('click', function () { window.location.href = 'agent-library.html'; });

    updateTabStyles();
    renderHighlightCards();
  }

  function updateTabStyles() {
    var buttons = document.querySelectorAll('[data-tab-id]');
    buttons.forEach(function (btn) {
      var isActive = btn.dataset.tabId === activeTab;
      var countSpan = btn.querySelector('.tab-count');
      // Remove existing indicator
      var existing = btn.querySelector('.tab-indicator');
      if (existing) existing.remove();

      if (isActive) {
        btn.className = 'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition text-brand';
        if (countSpan) { countSpan.className = 'rounded-full px-2 py-0.5 text-xs font-semibold bg-brand text-brand-foreground tab-count'; }
        var indicator = document.createElement('span');
        indicator.className = 'tab-indicator absolute inset-x-2 -bottom-px h-0.5 rounded-t bg-brand';
        btn.appendChild(indicator);
      } else {
        btn.className = 'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition text-muted-foreground hover:text-foreground';
        if (countSpan) { countSpan.className = 'rounded-full px-2 py-0.5 text-xs font-semibold bg-muted text-muted-foreground tab-count'; }
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     AI CO-WORKER WHEEL PICKER
  ══════════════════════════════════════════════════════════ */
  var FEATURES = [
    'Natural Language Process Automation',
    'Real-Time ERP Data Insights',
    'Intelligent Document Processing',
    'Autonomous Workflow Orchestration',
    'Predictive Analytics & Forecasting',
    'Multi-Agent Collaboration',
    'Compliance & Audit Automation',
    'Seamless Dynamics 365 Integration'
  ];

  var VISIBLE = 5;
  var CENTER = Math.floor(VISIBLE / 2); // 2
  var ITEM_H = 72;
  var INTERVAL_MS = 2200;
  var N = FEATURES.length;
  var LOOPED = FEATURES.concat(FEATURES).concat(FEATURES);

  var wheelStep = N;
  var wheelAnimate = true;
  var wheelIntervalId = null;

  function renderWheel() {
    var ul = document.getElementById('wheel-list');
    if (!ul) return;

    var translateY = (CENTER - wheelStep) * ITEM_H;
    ul.style.transform = 'translateY(' + translateY + 'px)';
    ul.style.transition = wheelAnimate
      ? ('transform ' + Math.round(INTERVAL_MS * 0.4) + 'ms cubic-bezier(0.4,0,0.2,1)')
      : 'none';

    // Update item styles
    var items = ul.querySelectorAll('li');
    items.forEach(function (item, i) {
      var dist = i - wheelStep;
      var absDist = Math.abs(dist);
      var isActive = dist === 0;
      var opacity = absDist === 0 ? 1 : absDist === 1 ? 0.4 : absDist === 2 ? 0.15 : 0;
      item.style.opacity = opacity;
      var span = item.querySelector('span');
      if (span) {
        span.style.fontSize = isActive ? '1.625rem' : '1.375rem';
        span.style.fontWeight = isActive ? '800' : '500';
        span.style.color = isActive ? '#051895' : '#475569';
        span.style.letterSpacing = isActive ? '-0.025em' : '-0.01em';
      }
    });
  }

  function initWheel() {
    var container = document.getElementById('wheel-container');
    if (!container) return;

    // Build the UL
    var ul = document.createElement('ul');
    ul.id = 'wheel-list';
    ul.style.cssText = 'position:absolute;top:0;left:0;width:100%;margin:0;padding:0;list-style:none;';

    LOOPED.forEach(function (label) {
      var li = document.createElement('li');
      li.style.cssText = 'height:' + ITEM_H + 'px;display:flex;align-items:center;padding-left:2.25rem;transition:opacity 0.4s ease;';
      var span = document.createElement('span');
      span.textContent = label;
      span.style.cssText = 'line-height:1.15;transition:font-size 0.4s ease,color 0.4s ease,font-weight 0.4s ease;white-space:nowrap;';
      li.appendChild(span);
      ul.appendChild(li);
    });

    container.appendChild(ul);

    // Fixed arrow
    var arrow = document.createElement('div');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.style.cssText = 'position:absolute;top:' + (CENTER * ITEM_H) + 'px;left:0;height:' + ITEM_H + 'px;display:flex;align-items:center;z-index:20;pointer-events:none;';
    arrow.innerHTML = '<span style="display:inline-block;width:0;height:0;border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid #2ababe;flex-shrink:0;"></span>';
    container.appendChild(arrow);

    renderWheel();

    // Auto-advance
    wheelIntervalId = setInterval(function () {
      wheelStep += 1;

      if (wheelStep >= 2 * N) {
        wheelAnimate = false;
        wheelStep -= N;
        renderWheel();
        requestAnimationFrame(function () {
          wheelAnimate = true;
          renderWheel();
        });
      } else {
        wheelAnimate = true;
        renderWheel();
      }
    }, INTERVAL_MS);
  }

  /* ══════════════════════════════════════════════════════════
     DEMO STEPS — scroll-driven sticky stacked cards
  ══════════════════════════════════════════════════════════ */
  var STEPS = [
    { number: 1, title: 'Share Your Requirements',    description: 'Tell us about your business, ERP environment, and the processes you want to automate.',                                                                             image: 'assets/images/demo-step-1-new.png', alt: 'A form on screen for entering personal information — step 1 of the KDS ERP Crew demo booking' },
    { number: 2, title: 'Schedule Your Demo',         description: 'Choose a convenient date and time for a personalized live demonstration with our ERP experts.',                                                                          image: 'assets/images/demo-step-2-new.png', alt: 'KDS ERP Crew operations dashboard showing AI-powered analytics and metrics' },
    { number: 3, title: 'Experience KDS ERP Crew',   description: 'See AI-powered agents automate transactions, approvals, reporting, and business workflows in real time.',                                                               image: 'assets/images/demo-step-3-new.png', alt: 'KDS ERP Crew live dashboard demonstrating real-time workflow automation' },
    { number: 4, title: 'Launch Your AI Journey',    description: 'Receive a tailored implementation roadmap and discover how KDS ERP Crew can accelerate your enterprise transformation.', image: 'assets/images/demo-step-4-new.png', alt: 'KDS ERP Crew logo on screen — ready to launch your enterprise AI journey' }
  ];

  var HOLD = 0.25;
  var TRANSITIONS = STEPS.length - 1; // 3
  var stepsProgress = 0;

  function getCardStyle(i, progress) {
    var DEPTH_SCALE = 0.027;
    var DEPTH_SHIFT = -9;

    if (i === 0) {
      var depth = Math.min(TRANSITIONS, progress);
      return { transform: 'translateY(' + (DEPTH_SHIFT * depth) + 'px) scale(' + (1 - DEPTH_SCALE * depth) + ')', zIndex: 1 };
    }

    var t = progress - (i - 1);
    if (t < 0) return { transform: 'translateY(110%)', zIndex: i + 1 };
    if (t < 1) {
      var eased = 1 - Math.pow(1 - t, 3);
      return { transform: 'translateY(' + ((1 - eased) * 110) + '%)', zIndex: i + 1 };
    }
    var depth2 = Math.min(TRANSITIONS - i, t - 1);
    return { transform: 'translateY(' + (DEPTH_SHIFT * depth2) + 'px) scale(' + (1 - DEPTH_SCALE * depth2) + ')', zIndex: i + 1 };
  }

  function updateDemoSteps(progress) {
    var cards = document.querySelectorAll('.demo-step-card-wrapper');
    var dots = document.querySelectorAll('.demo-step-dot');
    var activeCard = Math.min(STEPS.length - 1, Math.floor(progress));

    cards.forEach(function (card, i) {
      var style = getCardStyle(i, progress);
      card.style.transform = style.transform;
      card.style.zIndex = style.zIndex;
    });

    dots.forEach(function (dot, i) {
      dot.style.width = i === activeCard ? '32px' : '8px';
      dot.style.backgroundColor = i < activeCard ? '#2ababe' : i === activeCard ? '#051895' : 'rgba(5,24,149,0.18)';
    });
  }

  function initDemoSteps() {
    var section = document.getElementById('demo-steps-section');
    if (!section) return;

    function update() {
      var rect = section.getBoundingClientRect();
      var scrolled = -rect.top;
      var stickyRange = section.offsetHeight - window.innerHeight;
      if (stickyRange <= 0) return;
      var raw = Math.max(0, Math.min(1, scrolled / stickyRange));
      var p = raw < HOLD ? 0 : ((raw - HOLD) / (1 - HOLD)) * TRANSITIONS;
      updateDemoSteps(p);
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════════════════════
     SOLUTIONS MODAL
  ══════════════════════════════════════════════════════════ */
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
  window.closeSolutionModal = closeSolutionModal;

  function initSolutions() {
    var grid = document.getElementById('solutions-grid');
    if (!grid) return;

    SOLUTIONS.forEach(function (sol) {
      var btn = document.createElement('button');
      btn.className = 'group flex h-full flex-col rounded-xl border border-border bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg w-full';
      btn.innerHTML =
        '<div class="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">' + sol.steps + ' steps</div>' +
        '<h3 class="text-base font-bold leading-snug text-foreground">' + escHtml(sol.title) + '</h3>' +
        '<p class="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">' + escHtml(sol.desc) + '</p>' +
        '<div class="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs">' +
          '<span class="inline-flex items-center gap-1 font-semibold text-foreground">' + SVG.zap + ' ' + escHtml(sol.automation) + '</span>' +
          '<span class="text-muted-foreground">·</span>' +
          '<span class="inline-flex items-center gap-1 text-muted-foreground">' + SVG.clock + ' ' + escHtml(sol.outcome) + '</span>' +
        '</div>';
      btn.addEventListener('click', function () { openSolutionModal(sol); });
      grid.appendChild(btn);
    });

    // View all solutions button (no external link in static version)
    var viewAllBtn = document.getElementById('solutions-view-all');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function () {
        alert('Contact Key Dynamics Solutions to view all AI solutions:\nhttps://keydynamicssolutions.com/');
      });
    }

    // Close solution modal
    var closeBtn = document.getElementById('sol-modal-close');
    var backdrop = document.getElementById('sol-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeSolutionModal);
    if (backdrop) backdrop.addEventListener('click', closeSolutionModal);
  }

  /* ── shared demo modal close ─────────────────────────────── */
  function initDemoModal() {
    var closeBtn = document.getElementById('demo-modal-close');
    var backdrop = document.getElementById('demo-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeDemoModal);
    if (backdrop) backdrop.addEventListener('click', closeDemoModal);
    // ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDemoModal(); closeSolutionModal(); }
    });
  }

  /* ── Utility ─────────────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Boot ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initDemoModal();
    initHighlights();
    initWheel();
    initDemoSteps();
  });

})();
