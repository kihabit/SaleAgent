<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Agent Library — KDS ERP Crew</title>
  <meta name="description" content="Explore the complete KDS ERP Crew AI Agent Library featuring intelligent AI agents for Microsoft Dynamics 365." />
  <link rel="icon" href="/frontend/favicon.ico" type="image/x-icon" />
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/frontend/assets/fonts/inter.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
  </style>
  <link rel="stylesheet" href="/frontend/css/styles.css" />
  <style>
    html { scroll-behavior: smooth; }
    /* Catalogue sticky filter sits just below the sticky header */
    #catalogue-filter-sticky {
      position: sticky;
      top: 86px; /* updated by JS after measuring header */
      z-index: 10;
    }
    /* ── Footer ──────────────────────────────────────────────────── */
    .footer-inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 3rem;
    }
    @media (min-width: 768px) {
      .footer-inner { flex-direction: row; align-items: flex-start; }
    }
    .footer-right {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .footer-right { align-items: flex-end; text-align: right; align-self: flex-start; }
    }
    .footer-divider {
      width: 100%;
      border-top: 1px solid rgba(255,255,255,0.10);
    }
    .footer-social-btn {
      display: flex;
      height: 2.25rem;
      width: 2.25rem;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      background-color: rgba(255,255,255,0.10);
      color: #fff;
      transition: background-color 0.15s;
    }
    .footer-social-btn:hover { background-color: rgba(255,255,255,0.25); }
    .footer-kds-link { transition: opacity 0.15s; }
    .footer-kds-link:hover { opacity: 0.80; }
    .footer-copyright {
      margin-top: 2.5rem;
      border-top: 1px solid rgba(255,255,255,0.10);
      padding-top: 1.5rem;
    }
  </style>
</head>
<body class="bg-background text-foreground">

  <!-- ═══════════════════════════════ HEADER ═══════════════════════════════ -->
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 md:px-10">
      <a href="/">
        <img src="/frontend/assets/images/kds-logo-header.png" alt="KDS ERP Crew" class="h-[3.75rem] object-contain" />
      </a>
      <div class="hidden items-center gap-8 md:flex">
        <nav class="flex items-center gap-8">
          <a href="/" class="text-[15.4px] font-medium text-gray-700 transition hover:text-[#051895]">Home</a>
          <a href="/agent-library" class="text-[15.4px] font-medium transition hover:text-[#051895]" style="color:#051895">Agent Library</a>
        <a href="/about-us" class="text-[15.4px] font-medium text-gray-700 transition hover:text-[#051895]">About Us</a>
        </nav>
        <a href="https://keydynamicssolutions.com/" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
           style="background-color:#051895">Schedule Your AI Audit</a>
      </div>
    </div>
  </header>

  <!-- ═══════════════════════════ CATALOGUE SECTION ═══════════════════════════ -->
  <section id="catalogue" class="bg-white px-6 py-16 md:px-10 md:py-20">
    <div class="mx-auto max-w-screen-2xl">

    <!-- Section header -->
      <div class="flex items-center gap-2">
        <div class="rounded-lg bg-foreground p-1.5 text-background">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
       <span id="catalogue-badge" class="text-xs font-bold uppercase tracking-widest text-muted-foreground">{{ $catalogue->badge_text }}</span>
      </div>
     <h2 id="catalogue-heading" class="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">{{ $catalogue->heading }}</h2>
<p id="catalogue-description" class="mt-3 max-w-full text-base leading-relaxed text-muted-foreground">{{ $catalogue->description }}</p>
      <!-- Notice banner -->
      <div class="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
        <span id="catalogue-notice-text">{{ $catalogue->notice_text }}</span>
<a id="catalogue-notice-link" href="{{ $catalogue->notice_link_url }}" target="_blank" rel="noopener noreferrer" class="underline hover:text-amber-900">{{ $catalogue->notice_link_text }}</a>
      </div>

      <!-- Sticky filter bar -->
      <div id="catalogue-filter-sticky" class="-mx-6 mt-8 border-b border-border bg-white/90 px-6 py-3 backdrop-blur md:-mx-10 md:px-10">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <!-- Category filter buttons (populated by JS) -->
          <div id="filter-bar" class="flex flex-wrap gap-1.5"></div>

          <!-- Search input -->
          <div class="relative w-full md:w-72">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style="color:var(--muted-foreground)"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input id="search-input" type="text" placeholder="Search agents..."
              class="w-full rounded-md border border-input bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
        </div>

        <!-- Count label -->
        <p id="catalogue-count" class="mt-2 text-xs text-muted-foreground"></p>
      </div>

      <!-- Agent grid (populated by JS) -->
      <div id="catalogue-grid" class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></div>

      <!-- Empty state -->
      <div id="catalogue-empty" class="hidden mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
        No agents match your filter.
      </div>
    </div>
  </section>

  <!-- ═════════════════════ SOLUTIONS SECTION ═════════════════════ -->
  <section id="solutions" class="border-b border-border bg-surface px-6 py-16 md:px-10 md:py-20">
    <div class="mx-auto max-w-screen-2xl">
     <div class="mb-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-widest text-white" style="background:#2ababe">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
        <span id="sol-header-badge">How AI Agents Work Together</span>
      </div>
      <h2 id="sol-header-heading" class="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl" style="color:#051895">End-to-End Business Process Automation</h2>
      <div class="mt-3 flex flex-wrap items-end justify-between gap-3">
        <p id="sol-header-description" class="max-w-full text-base leading-relaxed text-muted-foreground">
          KDS ERP Crew brings together intelligent AI agents that work seamlessly across Microsoft Dynamics 365 to automate business processes from start to finish. Each agent performs specialized tasks, shares contextual data, and orchestrates workflows to deliver faster decisions, higher productivity, and intelligent business outcomes.
        </p>
        <button id="solutions-view-all" class="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
          <span id="sol-header-cta-text">View All AI Solutions</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
      <!-- Solutions grid (populated by JS) -->
      <div id="solutions-grid" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  </section>

  <!-- ═══════════════════════════════ FOOTER ═══════════════════════════════ -->
  <footer class="text-hero-foreground" style="background-color:#051895;padding:3.5rem 1.5rem;">
    <style>@media(min-width:768px){footer{padding-left:2.5rem!important;padding-right:2.5rem!important}}</style>
    <div class="mx-auto max-w-screen-2xl">
      <div class="footer-inner">

        <!-- Left: About -->
        <div style="max-width:32rem">
          <div class="flex items-center">
            <img id="footer-logo-img" src="/frontend/assets/images/kds-logo-full.png" alt="KDS ERP Crew" style="height:3.75rem;object-fit:contain;" />
          </div>
         <h3 id="footer-about-heading" class="text-hero-foreground" style="margin-top:1.5rem;font-size:1rem;font-weight:700;">About Key Dynamics Solutions (KDS)</h3>
<p id="footer-about-text" class="text-hero-muted" style="margin-top:0.5rem;font-size:0.875rem;line-height:1.625;">
  KDS ERP Crew is an AI-powered enterprise automation platform developed and owned by Key Dynamics Solutions. KDS empowers organizations with AI, ERP, CRM, Data Analytics, and Microsoft Power Platform solutions to simplify operations, automate business processes, and accelerate digital transformation.
</p>
        </div>

        <!-- Right: Want to know + Connect -->
        <div class="footer-right">

          <!-- Want to know more -->
         <!-- NEW -->
<p id="footer-info-heading" class="text-hero-foreground" style="font-size:0.875rem;font-weight:600;">Want to know more about KDS?</p>
<p id="footer-info-text" class="text-hero-muted" style="max-width:20rem;font-size:0.875rem;line-height:1.625;">Discover our solutions, services, and success stories by visiting the KDS website.</p>
<a id="footer-info-link" href="https://keydynamicssolutions.com/" target="_blank" rel="noopener noreferrer"
   class="footer-kds-link"
   style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.875rem;font-weight:600;color:#fff;text-decoration:underline;text-underline-offset:2px;">
  Visit KDS Website →
</a>
          <!-- Divider -->
          <div class="footer-divider"></div>

         <h3 id="footer-connect-heading" class="text-hero-foreground" style="font-size:1rem;font-weight:700;">Connect With KDS</h3>
<p id="footer-connect-text" class="text-hero-muted" style="max-width:20rem;font-size:0.875rem;line-height:1.625;">
  Stay connected for the latest updates, AI innovations, ERP insights, and digital transformation stories.
</p>
         <div id="footer-social-container" style="display:flex;align-items:center;gap:1rem;"></div>
        </div>

      </div>

      <!-- Copyright -->
      <div class="footer-copyright">
     <p id="footer-copyright" class="text-hero-muted" style="font-size:0.75rem;">© 2026 Key Dynamics Solutions Pvt. Ltd. All Rights Reserved. KDS ERP Crew™ is a product of Key Dynamics Solutions.</p>
      </div>

    </div>
  </footer>

  <!-- ═══════════════════════════ DEMO MODAL ═══════════════════════════ -->
  <div id="demo-modal" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true">
    <div id="demo-modal-backdrop" class="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <div class="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6">
        <button id="demo-modal-close" class="absolute right-4 top-4 rounded-sm p-1 opacity-70 hover:opacity-100 transition" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div>
          <div class="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
            <span id="demo-modal-cat"></span>
          </div>
          <h2 id="demo-modal-title" class="text-xl font-bold text-foreground mt-1"></h2>
          <p id="demo-modal-desc" class="mt-2 text-sm leading-relaxed text-muted-foreground"></p>
        </div>
        <div class="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#2ababe"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          <p class="mt-3 text-sm font-medium">Demo video unavailable in this export</p>
          <p class="mt-1 text-xs text-muted-foreground">On the live site this opens a full agent demo video.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ════════════════════════ SOLUTIONS MODAL ════════════════════════ -->
  <div id="solution-modal" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true">
    <div id="sol-modal-backdrop" class="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <div class="relative w-full max-w-xl rounded-xl bg-white shadow-2xl p-6">
        <button id="sol-modal-close" class="absolute right-4 top-4 rounded-sm p-1 opacity-70 hover:opacity-100 transition" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div>
          <div class="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
            <span id="sol-modal-steps"></span>
          </div>
          <h2 id="sol-modal-title" class="text-xl font-bold text-foreground mt-1"></h2>
          <p id="sol-modal-desc" class="mt-2 text-sm leading-relaxed text-muted-foreground"></p>
        </div>
        <div class="flex flex-wrap gap-4 border-t border-border pt-4 mt-4 text-sm">
          <span class="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#2ababe"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span id="sol-modal-automation"></span>
          </span>
          <span class="inline-flex items-center gap-1.5 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span id="sol-modal-outcome"></span>
          </span>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          Contact Key Dynamics Solutions to explore the detailed step-by-step flow and configure this solution for your organization.
        </p>
      </div>
    </div>
  </div>

  <!-- ═════════════════════════ SCRIPTS ═════════════════════════ -->
 <script src="/frontend/js/header.js"></script>

<script src="/frontend/js/agent-library.js"></script>
<script src="/frontend/js/footer.js"></script>

</body>
</html>