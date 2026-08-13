(function () {
  const API_URL = '/api/bottom-step-sliders';

  const els = {
    badge: document.getElementById('demo-steps-badge'),
    heading: document.getElementById('demo-steps-heading'),
    desc: document.getElementById('demo-steps-desc'),
    dots: document.getElementById('demo-steps-dots'),
    stackInner: document.getElementById('demo-steps-stack-inner'),
    section: document.getElementById('demo-steps-section'),
  };

  function buildDots(count) {
    els.dots.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'demo-step-dot rounded-full transition-all duration-300';
      dot.style.height = '8px';
      dot.style.width = i === 0 ? '32px' : '8px';
      dot.style.backgroundColor = i === 0 ? '#051895' : 'rgba(5,24,149,0.18)';
      els.dots.appendChild(dot);
    }
  }

  function buildCards(steps) {
    els.stackInner.innerHTML = '';
    steps.forEach((step, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'demo-step-card-wrapper absolute inset-0';
      wrapper.style.transform = i === 0 ? 'translateY(0)' : 'translateY(110%)';
      wrapper.style.zIndex = String(i + 1);
      wrapper.style.willChange = 'transform';

      wrapper.innerHTML = `
        <div class="dsc-inner">
          <div class="dsc-img-panel">
            <img src="${step.image || ''}" alt="${step.image_alt || ''}" draggable="false" />
          </div>
          <div class="dsc-text-panel">
            <span class="inline-flex w-fit items-center rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest" style="background-color:rgba(251,162,38,0.12);color:#fba226">${step.label || ''}</span>
            <p aria-hidden="true" class="mt-3 select-none font-black leading-none" style="font-size:clamp(3rem,6vw,5rem);color:rgba(5,24,149,0.07)">${step.number || ''}</p>
            <h3 class="dsc-heading">${step.heading || ''}</h3>
            <p class="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-gray-500">${step.description || ''}</p>
            <div class="mt-6 h-1 w-10 rounded-full" style="background-color:#2ababe"></div>
          </div>
        </div>`;
      els.stackInner.appendChild(wrapper);
    });
  }

  function initScrollAnimation(count) {
    const cards = els.stackInner.querySelectorAll('.demo-step-card-wrapper');
    const dots = els.dots.querySelectorAll('.demo-step-dot');

    els.section.style.height = `${(count + 1) * 100}vh`;

    function onScroll() {
      const rect = els.section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      let progress = (-rect.top) / total;
      progress = Math.max(0, Math.min(1, progress));

      const activeIndex = Math.min(count - 1, Math.floor(progress * count));

      cards.forEach((card, i) => {
        if (i < activeIndex) {
          card.style.transform = 'translateY(-110%)';
        } else if (i === activeIndex) {
          card.style.transform = 'translateY(0)';
        } else {
          card.style.transform = 'translateY(110%)';
        }
      });

      dots.forEach((dot, i) => {
        if (i === activeIndex) {
          dot.style.width = '32px';
          dot.style.backgroundColor = '#051895';
        } else {
          dot.style.width = '8px';
          dot.style.backgroundColor = 'rgba(5,24,149,0.18)';
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  async function loadBottomStepSlider() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (!json.success || !json.data) return;

      const data = json.data;

      if (els.badge) els.badge.textContent = data.badge_text || '';
      if (els.heading) els.heading.textContent = data.heading || '';
      if (els.desc) els.desc.textContent = data.description || '';

      const steps = Array.isArray(data.steps) ? data.steps : [];
      if (!steps.length) return;

      buildDots(steps.length);
      buildCards(steps);
      initScrollAnimation(steps.length);
    } catch (err) {
      console.error('Failed to load bottom step slider:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', loadBottomStepSlider);
})();