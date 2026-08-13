/* ============================================================
   KDS ERP Crew — Dynamic Header
   Fetches /api/header-settings and /api/menu-items and
   fills the existing static header markup.
   ============================================================ */
(function () {
  'use strict';

  function applyHeaderSettings(header) {
    if (!header) return;

    var logoLink = document.getElementById('header-logo-link');
    var logoImg  = document.getElementById('header-logo-img');
    var ctaBtn   = document.getElementById('header-cta-btn');
    var headerEl = document.querySelector('header');

    if (logoLink && header.logo_link) logoLink.setAttribute('href', header.logo_link);

    if (logoImg) {
      if (header.logo_image)    logoImg.setAttribute('src', header.logo_image);
      if (header.logo_alt_text) logoImg.setAttribute('alt', header.logo_alt_text);
    }

    if (ctaBtn) {
      if (header.cta_text) ctaBtn.textContent = header.cta_text;
      if (header.cta_url)  ctaBtn.setAttribute('href', header.cta_url);
    }

    if (headerEl) {
      if (header.is_sticky) {
        headerEl.classList.add('sticky', 'top-0');
      } else {
        headerEl.classList.remove('sticky', 'top-0');
      }
    }
  }

  function renderNavLinks(items) {
    var nav = document.getElementById('header-nav-links');
    if (!nav || !items) return;

    var currentPath = window.location.pathname;
    nav.innerHTML = '';

    items.forEach(function (item) {
      var isActive = item.url === currentPath;

      var a = document.createElement('a');
      a.href = item.url || '#';
      a.textContent = item.label;
      a.className = 'text-[15.4px] font-medium transition hover:text-[#051895]' +
        (isActive ? '' : ' text-gray-700');
      if (isActive) a.style.color = '#051895';

      if (item.target === '_blank') {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      nav.appendChild(a);
    });
  }

  function initHeader() {
    Promise.all([
      fetch('/api/header-settings').then(function (r) { return r.json(); }).catch(function () { return null; }),
      fetch('/api/menu-items').then(function (r) { return r.json(); }).catch(function () { return null; })
    ]).then(function (results) {
      var headerRes = results[0];
      var menuRes   = results[1];

      if (headerRes && headerRes.success) applyHeaderSettings(headerRes.data);
      if (menuRes && menuRes.success) renderNavLinks(menuRes.data);

      document.dispatchEvent(new CustomEvent('kds:header-ready'));
    });
  }

  document.addEventListener('DOMContentLoaded', initHeader);
})();