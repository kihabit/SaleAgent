(function () {
  const API_URL = "/api/bottom-sliders";
  let rotateTimer = null;
  let currentIndex = 0;

  async function fetchBottomSlider() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      if (!json.success || !json.data || json.data.length === 0) return;

      // Sirf pehla active record use karenge
      const item = json.data[0];
      renderCoworkerSection(item);
    } catch (err) {
      console.error("Bottom slider fetch failed:", err);
    }
  }

  function renderCoworkerSection(item) {
    const badge = document.getElementById("coworker-badge");
    const headingNormal = document.getElementById("coworker-heading-normal");
    const headingHighlighted = document.getElementById("coworker-heading-highlighted");
    const desc = document.getElementById("coworker-desc");
    const primaryBtn = document.getElementById("coworker-primary-btn");
    const primaryText = document.getElementById("coworker-primary-text");
    const secondaryBtn = document.getElementById("coworker-secondary-btn");
    const secondaryText = document.getElementById("coworker-secondary-text");
    const featuresContainer = document.getElementById("coworker-features-container");

    if (badge) badge.textContent = item.badge_text || "";
    if (headingNormal) headingNormal.textContent = item.heading_normal || "";
    if (headingHighlighted) headingHighlighted.textContent = item.heading_highlighted || "";
    if (desc) desc.textContent = item.description || "";

    if (primaryBtn && item.primary_btn_link) primaryBtn.href = item.primary_btn_link;
    if (primaryText) primaryText.textContent = item.primary_btn_text || "";

    if (secondaryBtn && item.secondary_btn_link) secondaryBtn.href = item.secondary_btn_link;
    if (secondaryText) secondaryText.textContent = item.secondary_btn_text || "";

    if (featuresContainer && Array.isArray(item.features) && item.features.length > 0) {
      renderFeaturesList(featuresContainer, item.features);
    }
  }

  function renderFeaturesList(container, features) {
    container.innerHTML = "";

    const list = document.createElement("div");
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.gap = "28px";
    list.style.height = "100%";
    list.style.justifyContent = "center";

    features.forEach((feature, index) => {
      const row = document.createElement("div");
      row.className = "coworker-feature-row";
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "12px";
      row.style.transition = "all 0.4s ease";

      const arrow = document.createElement("span");
      arrow.className = "coworker-feature-arrow";
      arrow.textContent = "▶";
      arrow.style.color = "#2ababe";
      arrow.style.opacity = "0";
      arrow.style.fontSize = "14px";
      arrow.style.transition = "opacity 0.3s ease";

      const text = document.createElement("span");
      text.className = "coworker-feature-text";
      const title = typeof feature === "string" ? feature : feature.title;
      text.textContent = title || "";
      text.style.fontSize = "1.5rem";
      text.style.fontWeight = "500";
      text.style.color = "#94a3b8";
      text.style.transition = "all 0.3s ease";

      row.appendChild(arrow);
      row.appendChild(text);
      list.appendChild(row);
    });

    container.appendChild(list);

    startRotation(container, features.length);
  }

  function startRotation(container, total) {
    if (rotateTimer) clearInterval(rotateTimer);
    currentIndex = 0;

    function highlight(index) {
      const rows = container.querySelectorAll(".coworker-feature-row");
      rows.forEach((row, i) => {
        const arrow = row.querySelector(".coworker-feature-arrow");
        const text = row.querySelector(".coworker-feature-text");
        if (i === index) {
          arrow.style.opacity = "1";
          text.style.color = "#051895";
          text.style.fontWeight = "700";
        } else {
          arrow.style.opacity = "0";
          text.style.color = "#94a3b8";
          text.style.fontWeight = "500";
        }
      });
    }

    highlight(currentIndex);

    rotateTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % total;
      highlight(currentIndex);
    }, 2500);
  }

  document.addEventListener("DOMContentLoaded", fetchBottomSlider);
})();