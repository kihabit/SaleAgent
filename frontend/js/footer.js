/* ============================================================
   KDS ERP Crew — Footer (standalone, dynamic via API)
   Fetches /api/footer-settings and populates:
     #footer-logo-img, #footer-about-heading, #footer-about-text,
     #footer-info-heading, #footer-info-text, #footer-info-link,
     #footer-connect-heading, #footer-connect-text,
     #footer-copyright

   Independent from home.js / hero-slider.js — only touches
   footer elements.
   ============================================================ */

(function () {
  'use strict';

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== null && value !== undefined) el.textContent = value;
  }

  function initFooter() {
    fetch('/api/footer-settings')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.success || !res.data) {
          console.warn('footer.js: no data returned from /api/footer-settings');
          return;
        }
        var d = res.data;

        var logoImg = document.getElementById('footer-logo-img');
        if (logoImg && d.logo_image) {
          logoImg.src = d.logo_image;
          logoImg.alt = d.logo_alt_text || 'KDS ERP Crew';
        }

        setText('footer-about-heading', d.about_heading);
        setText('footer-about-text', d.about_text);

        setText('footer-info-heading', d.info_heading);
        setText('footer-info-text', d.info_text);

        var infoLink = document.getElementById('footer-info-link');
        if (infoLink) {
          if (d.info_link_url) infoLink.href = d.info_link_url;
          if (d.info_link_text) infoLink.textContent = d.info_link_text;
        }

        setText('footer-connect-heading', d.connect_heading);
        setText('footer-connect-text', d.connect_text);

        setText('footer-copyright', d.copyright_text);
      })
      .catch(function (err) { console.error('Footer settings fetch failed:', err); });
  }

  document.addEventListener('DOMContentLoaded', initFooter);

})();