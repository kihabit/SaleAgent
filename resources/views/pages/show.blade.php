<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{ $page->title }} — KDS ERP Crew</title>
  <meta name="description" content="{{ $page->excerpt }}" />
  <link rel="icon" href="/frontend/favicon.ico" type="image/x-icon" />
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

        <div style="display:flex;align-items:center;gap:1rem;">
          <a href="https://www.linkedin.com/company/key-dynamics-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer-social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.facebook.com/KeyDynamicsSolutions/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://x.com/keydynamics_365" target="_blank" rel="noopener noreferrer" aria-label="X" class="footer-social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
          </a>
          <a href="https://www.youtube.com/@keydynamicssolutions" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.instagram.com/keydynamicssolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
        </div>
      </div>

    </div>

    <!-- Copyright -->
    <div class="footer-copyright">
      <p id="footer-copyright" class="text-hero-muted" style="font-size:0.75rem;">© 2026 Key Dynamics Solutions Pvt. Ltd. All Rights Reserved. KDS ERP Crew™ is a product of Key Dynamics Solutions.</p>
    </div>
  </div>
</footer>

  <script src="/frontend/js/header.js"></script>
  <script src="/frontend/js/footer.js"></script>
</body>
</html>