/* ============================================================
   KDS ERP Crew — Hero Slider (standalone)
   Fetches slides from /api/hero-slides and renders:
     - Background image crossfade
     - Heading / description
     - CTA buttons (up to 3)
     - Stats grid (numbers count up, or checkmark icon)
     - Prev/Next arrows + pagination dots
     - Autoplay

   This file is INDEPENDENT from home.js — it only touches the
   hero section elements: #hero-bg-container, #hero-text,
   #hero-heading, #hero-desc, #hero-cta-row, #hero-stats,
   #hero-prev, #hero-next, #hero-dots-container.
   ============================================================ */

(function () {
  'use strict';

  var SVG = {
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
  };

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var SLIDES = [];
  var HERO_BTN_STYLES = [
    { class: 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-brand-foreground shadow-lg transition hover:brightness-110', style: 'background-color:#2ababe', icon: SVG.sparkles },
    { class: 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110', style: 'background-color:#051895', icon: SVG.bookOpen },
    { class: 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110', style: 'background-color:#fba226', icon: SVG.arrowLeft }
  ];

  var heroCurrent = 0;
  var heroAutoplay = null;
  var heroCountUpRAFs = [];
  var AUTOPLAY_MS = 5500;

  function mapApiSlide(slide) {
    var stats = (slide.stats || []).map(function (s) {
      var num = String(s.number || '').trim();
      var isNumeric = /^\d/.test(num);
      return isNumeric
        ? { value: num, label: s.label }
        : { icon: true, label: s.label };
    });

    var buttons = [];
    [
      [slide.btn1_text, slide.btn1_url],
      [slide.btn2_text, slide.btn2_url],
      [slide.btn3_text, slide.btn3_url]
    ].forEach(function (pair) {
      if (pair[0]) buttons.push({ text: pair[0], url: pair[1] || '#' });
    });

    return {
      image: slide.image,
      alt: slide.image_alt_text || '',
      heading: [slide.heading || ''],
      description: slide.description || '',
      stats: stats,
      buttons: buttons
    };
  }

  function parseStatValue(v) {
    var m = String(v).match(/^(\d+)(.*)$/);
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
    if (!statsEl || !SLIDES[slideIdx]) return;
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
        valueEl.innerHTML = SVG.checkCircle.replace('<svg ', '<svg class="text-white" ');
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

  function renderHeroButtons(slideIdx) {
    var row = document.getElementById('hero-cta-row');
    if (!row || !SLIDES[slideIdx]) return;
    row.innerHTML = '';

    SLIDES[slideIdx].buttons.forEach(function (btn, i) {
      var styleInfo = HERO_BTN_STYLES[i] || HERO_BTN_STYLES[HERO_BTN_STYLES.length - 1];
      var isExternal = /^https?:\/\//i.test(btn.url);
      var a = document.createElement('a');
      a.href = btn.url;
      a.className = styleInfo.class;
      a.setAttribute('style', styleInfo.style);
      if (isExternal) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = styleInfo.icon + ' ' + escHtml(btn.text);
      row.appendChild(a);
    });
  }

  function buildHeroBackgrounds() {
    var container = document.getElementById('hero-bg-container');
    if (!container) return;
    container.innerHTML = '';

    SLIDES.forEach(function (slide, i) {
      var layer = document.createElement('div');
      layer.className = 'hero-bg-layer pointer-events-none absolute inset-0 duration-700 transition-opacity';
      layer.style.zIndex = i === 0 ? '1' : '0';
      layer.style.opacity = i === 0 ? '1' : '0';

      var img = document.createElement('img');
      img.src = slide.image;
      img.alt = slide.alt;
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.className = 'hero-background-image h-full w-full object-cover object-top';
      if (i === 0) img.style.transform = 'scale(1.03)';

      layer.appendChild(img);
      container.appendChild(layer);
    });
  }

  function buildHeroDots() {
    var container = document.getElementById('hero-dots-container');
    if (!container) return;
    container.innerHTML = '';

    SLIDES.forEach(function (slide, i) {
      var dot = document.createElement('button');
      dot.className = 'hero-dot h-2.5 rounded-full transition-all duration-300';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.style.width = i === 0 ? '2rem' : '0.625rem';
      dot.style.backgroundColor = i === 0 ? '#051895' : 'rgba(5,24,149,0.3)';
      dot.addEventListener('click', function () { heroGoTo(i); resetHeroAutoplay(); });
      container.appendChild(dot);
    });
  }

  function heroGoTo(idx) {
    if (idx === heroCurrent || !SLIDES[idx]) return;
    var textEl = document.getElementById('hero-text');
    var bgLayers = document.querySelectorAll('.hero-bg-layer');
    var dots = document.querySelectorAll('.hero-dot');

    if (textEl) { textEl.style.opacity = '0'; textEl.style.transform = 'translateY(16px)'; }
    renderHeroStats(heroCurrent, false);

    setTimeout(function () {
      heroCurrent = idx;

      var heading = document.getElementById('hero-heading');
      var desc = document.getElementById('hero-desc');
      if (heading) heading.innerHTML = SLIDES[idx].heading.map(function (line) {
        return '<span class="block">' + escHtml(line) + '</span>';
      }).join('');
      if (desc) desc.textContent = SLIDES[idx].description;

      bgLayers.forEach(function (layer, i) {
        layer.style.opacity = i === idx ? '1' : '0';
        layer.style.zIndex = i === idx ? '1' : '0';
        var img = layer.querySelector('img');
        if (img) img.style.transform = i === idx ? 'scale(1.03)' : 'scale(1)';
      });

      dots.forEach(function (dot, i) {
        dot.style.width = i === idx ? '2rem' : '0.625rem';
        dot.style.backgroundColor = i === idx ? '#051895' : 'rgba(5,24,149,0.3)';
      });

      renderHeroButtons(idx);

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
    if (SLIDES.length <= 1) return;
    heroAutoplay = setInterval(heroNext, AUTOPLAY_MS);
  }
  function resetHeroAutoplay() {
    clearInterval(heroAutoplay);
    startHeroAutoplay();
  }

  function initHeroSlider() {
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

    var btnPrev = document.getElementById('hero-prev');
    var btnNext = document.getElementById('hero-next');
    if (btnPrev) btnPrev.addEventListener('click', function () { heroPrev(); resetHeroAutoplay(); });
    if (btnNext) btnNext.addEventListener('click', function () { heroNext(); resetHeroAutoplay(); });

    fetch('/api/hero-slides')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.success || !res.data || !res.data.length) {
          console.warn('hero-slider.js: no slides returned from /api/hero-slides');
          return;
        }
        SLIDES = res.data.map(mapApiSlide);

        buildHeroBackgrounds();
        buildHeroDots();

        var heading = document.getElementById('hero-heading');
        var desc = document.getElementById('hero-desc');
        if (heading) heading.innerHTML = SLIDES[0].heading.map(function (line) {
          return '<span class="block">' + escHtml(line) + '</span>';
        }).join('');
        if (desc) desc.textContent = SLIDES[0].description;

        renderHeroButtons(0);
        renderHeroStats(0, true);
        startHeroAutoplay();
      })
      .catch(function (err) { console.error('Hero slides fetch failed:', err); });
  }

  document.addEventListener('DOMContentLoaded', initHeroSlider);

})();