<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{ $page->title }} — KDS ERP Crew</title>
  <meta name="description" content="{{ $page->excerpt }}" />
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

  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 md:px-10">
      <a href="/" id="header-logo-link">
        <img id="header-logo-img" src="/frontend/assets/images/kds-logo-header.png" alt="KDS ERP Crew" class="h-[3.75rem] object-contain" />
      </a>
      <div class="hidden items-center gap-8 md:flex">
        <nav id="header-nav-links" class="flex items-center gap-8"></nav>
        <a id="header-cta-btn" href="https://keydynamicssolutions.com/" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
           style="background-color:#051895">Schedule Your AI Audit</a>
      </div>
    </div>
  </header>

  <main>
  {!! html_entity_decode($page->content) !!}
  </main>

<footer class="text-hero-foreground" style="background-color:#051895;padding:3.5rem 1.5rem;">
  <div class="mx-auto max-w-screen-2xl">
    <div class="footer-inner">

      <div style="max-width:32rem">
        <div class="flex items-center">
          <img id="footer-logo-img" src="/frontend/assets/images/kds-logo-full.png" alt="KDS ERP Crew" style="height:3.75rem;object-fit:contain;" />
        </div>
        <h3 id="footer-about-heading" class="text-hero-foreground" style="margin-top:1.5rem;font-size:1rem;font-weight:700;">About Key Dynamics Solutions (KDS)</h3>
        <p id="footer-about-text" class="text-hero-muted" style="margin-top:0.5rem;font-size:0.875rem;line-height:1.625;">
          KDS ERP Crew is an AI-powered enterprise automation platform developed and owned by Key Dynamics Solutions. KDS empowers organizations with AI, ERP, CRM, Data Analytics, and Microsoft Power Platform solutions to simplify operations, automate business processes, and accelerate digital transformation.
        </p>
      </div>

      <div class="footer-right">
        <p id="footer-info-heading" class="text-hero-foreground" style="font-size:0.875rem;font-weight:600;">Want to know more about KDS?</p>
        <p id="footer-info-text" class="text-hero-muted" style="max-width:20rem;font-size:0.875rem;line-height:1.625;">Discover our solutions, services, and success stories by visiting the KDS website.</p>
        <a id="footer-info-link" href="https://keydynamicssolutions.com/" target="_blank" rel="noopener noreferrer"
           class="footer-kds-link"
           style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.875rem;font-weight:600;color:#fff;text-decoration:underline;text-underline-offset:2px;">
          Visit KDS Website →
        </a>

        <div class="footer-divider"></div>

        <h3 id="footer-connect-heading" class="text-hero-foreground" style="font-size:1rem;font-weight:700;">Connect With KDS</h3>
        <p id="footer-connect-text" class="text-hero-muted" style="max-width:20rem;font-size:0.875rem;line-height:1.625;">
          Stay connected for the latest updates, AI innovations, ERP insights, and digital transformation stories.
        </p>

     <div id="footer-social-container" style="display:flex;align-items:center;gap:1rem;"></div>
      </div>

    </div>

    <div class="footer-copyright">
      <p id="footer-copyright" class="text-hero-muted" style="font-size:0.75rem;">© 2026 Key Dynamics Solutions Pvt. Ltd. All Rights Reserved. KDS ERP Crew™ is a product of Key Dynamics Solutions.</p>
    </div>
  </div>
</footer>

  <script src="/frontend/js/header.js"></script>
  <script src="/frontend/js/footer.js"></script>
</body>
</html>