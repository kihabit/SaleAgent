"use client";

import { useEffect, useRef, useState } from "react";
import { apiGet, assetUrl } from "@/lib/api";
import type { HeroSlide } from "@/types";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function parseStatValue(value: string) {
  const match = String(value || "").match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: Number(match[1]), suffix: match[2] };
}

function mapHeroSlide(slide: any): HeroSlide {
  const stats = (slide.stats || []).map((stat: any) => {
    const number = String(stat.number || "").trim();
    const isNumeric = /^\d/.test(number);

    return isNumeric
      ? { value: number, number, label: stat.label || "", icon: false }
      : { value: "", number: "", label: stat.label || "", icon: true };
  });

  const buttons = [
    { text: slide.btn1_text, url: slide.btn1_url },
    { text: slide.btn2_text, url: slide.btn2_url },
    { text: slide.btn3_text, url: slide.btn3_url },
  ]
    .filter((button) => button.text)
    .map((button) => ({ text: button.text, url: button.url || "#" }));

  return {
    ...slide,
    image: slide.image,
    image_alt_text: slide.image_alt_text || "",
    heading: [slide.heading || ""],
    description: slide.description || "",
    stats,
    buttons,
  };
}

/** Handles both { success, data: [...] } and plain-array API shapes. */
function extractSlidesArray(response: any): any[] {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.data)) {
    if (response.success === false) return [];
    return response.data;
  }
  return [];
}

/* ------------------------------------------------------------------ */
/* Icons — match hero-slider.js SVG.* exactly                          */
/* ------------------------------------------------------------------ */

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/** Matches HERO_BTN_STYLES exactly: icon, bg color, text color per position. */
const BTN_STYLES = [
  { bg: "#2ababe", text: "#fff", Icon: SparklesIcon },
  { bg: "#051895", text: "#fff", Icon: BookOpenIcon },
  { bg: "#fba226", text: "#fff", Icon: ArrowLeftIcon },
];

const AUTOPLAY_MS = 5500;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [loadFailed, setLoadFailed] = useState(false);

  // Text/content visible for the currently-displayed slide (delayed to match
  // the 300ms crossfade in the original: fade out -> swap content -> fade in)
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [statsVisible, setStatsVisible] = useState(true);

  const [animated, setAnimated] = useState<Record<string, string>>({});
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(86); // 5.375rem fallback

  /* ---------------- Load slides ---------------- */
  useEffect(() => {
    apiGet<any>("/api/hero-slides")
      .then((response) => {
        const raw = extractSlidesArray(response);

        if (!raw.length) {
          console.warn("HeroSlider: no slides returned from /api/hero-slides", response);
          setLoadFailed(true);
          return;
        }

        const mapped = raw.map(mapHeroSlide);
        setSlides(mapped);
        setCurrent(0);
        setDisplayedIndex(0);
        setLoadFailed(false);
      })
      .catch((error) => {
        console.error("Hero slider API error:", error);
        setLoadFailed(true);
      });
  }, []);

  /* ---------------- Track real header height (like ResizeObserver in original) ---------------- */
  useEffect(() => {
    const header = document.querySelector("header");
    headerRef.current = header;
    if (!header) return;

    const apply = () => setHeaderHeight(header.getBoundingClientRect().height);
    apply();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => apply());
      ro.observe(header);
      return () => ro.disconnect();
    }
  }, []);

  /* ---------------- Autoplay ---------------- */
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  /* ---------------- Crossfade sequence when `current` changes ----------------
   * Matches heroGoTo(): fade text+stats out (300ms) -> swap content -> fade
   * text in immediately, fade stats in ~120ms later.
   */
  useEffect(() => {
    if (current === displayedIndex) return;

    setTextVisible(false);
    setStatsVisible(false);

    const swapTimer = window.setTimeout(() => {
      setDisplayedIndex(current);
      setTextVisible(true);

      const statsTimer = window.setTimeout(() => setStatsVisible(true), 120);
      return () => window.clearTimeout(statsTimer);
    }, 300);

    return () => window.clearTimeout(swapTimer);
  }, [current, displayedIndex]);

  const slide = slides[displayedIndex];

  /* ---------------- Reset count-up when the displayed slide changes ---------------- */
  useEffect(() => {
    setAnimated({});
  }, [displayedIndex]);

  /* ---------------- Count-up animation ---------------- */
  useEffect(() => {
    if (!slide?.stats || !statsVisible) return;

    const animationFrames: number[] = [];

    slide.stats.forEach((stat: any, index: number) => {
      if (stat.icon) return;

      const raw = stat.number || stat.value || "";
      const parsed = parseStatValue(raw);
      if (!parsed) return;

      const start = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(parsed.number * eased);

        setAnimated((previous) => ({
          ...previous,
          [String(index)]: `${value}${parsed.suffix}`,
        }));

        if (progress < 1) {
          animationFrames.push(requestAnimationFrame(animate));
        }
      };

      animationFrames.push(requestAnimationFrame(animate));
    });

    return () => {
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [slide, statsVisible]);

  /* ---------------- Loading / empty state ---------------- */
  if (!slide) {
    return (
      <section className="relative flex min-h-[60vh] items-center justify-center bg-[#051895] text-white">
        {loadFailed ? "Unable to load hero content." : "Loading…"}
      </section>
    );
  }

  const heading = Array.isArray(slide.heading) ? slide.heading : [slide.heading || ""];
  const buttons = slide.buttons || [];

  const nextSlide = () => setCurrent((value) => (value + 1) % slides.length);
  const previousSlide = () => setCurrent((value) => (value - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative flex flex-col overflow-clip"
      style={{ minHeight: `calc(100svh - ${headerHeight}px - 45px)` }}
    >
      {/* Background layers — full-bleed, crossfaded via opacity, with a slow
          zoom on the active layer (matches original .hero-bg-layer img CSS).
          NOTE: this must stay `inset-0` / full width — do NOT constrain it to
          a right-hand column (e.g. `right-0 md:w-[58%]`), or it will collide
          with the text column below and the text will render over the image
          edge instead of sitting on a clean solid-color backdrop. */}
      <div className="absolute inset-0 bg-[#051895]">
        {slides.map((s: any, i: number) => {
          const bgImage = assetUrl(s.image || s.background_image || s.image_url);
          const isActive = i === displayedIndex;
          return (
            <div
              key={i}
              className="hero-bg-layer pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{ zIndex: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
            >
              {bgImage && (
                <img
                  src={bgImage}
                  alt={s.image_alt_text || ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="hero-background-image h-full w-full object-cover object-top"
                  style={{
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                    transition: "transform 6s ease-out, opacity 0.7s ease",
                  }}
                />
              )}
            </div>
          );
        })}
        {/* Readability overlay — a soft dark wash over the full image so white
            text stays legible everywhere, instead of only over a partial
            gradient column. Tune the opacity if it looks too light/dark. */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-6 pt-10 md:px-10 md:pt-14">
        <div className="hero-content-stack mt-14 flex max-w-5xl flex-1 flex-col justify-end gap-10 pb-[85px] md:mt-20">
          {/* Text */}
          <div
            className="hero-copy flex flex-col gap-10 transition-all duration-300"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div>
              <h1 className="max-h-[2.6em] max-w-[24ch] overflow-hidden text-[2.55rem] font-bold leading-[1.05] tracking-tight text-white md:text-[3.1875rem]">
                {heading.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="mt-4 max-h-[4.5em] max-w-[52ch] overflow-hidden text-base leading-relaxed text-white/90 md:text-lg">
                {slide.description}
              </p>
            </div>

            {/* Controls (buttons + stats) fade together with the text */}
            <div className="hero-controls flex w-fit max-w-full flex-col gap-10">
              {/* Buttons */}
              <div className="hero-cta-row flex min-h-[44px] w-fit max-w-full flex-wrap items-center gap-3">
                {buttons.map((button: any, index: number) => {
                  const text = button.text || button.label || "Learn More";
                  const href = button.url || button.href || "#";
                  const isExternal = /^https?:\/\//i.test(href);
                  const style = BTN_STYLES[index] || BTN_STYLES[BTN_STYLES.length - 1];
                  const { Icon } = style;

                  return (
                    <a
                      key={`${text}-${index}`}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:brightness-110"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      <Icon />
                      {text}
                    </a>
                  );
                })}
              </div>

              {/* Stats */}
              <div
                className="hero-stats-grid grid w-full min-w-0 grid-cols-2 gap-3 transition-all duration-500 md:grid-cols-4 md:gap-4"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {(slide.stats || []).map((stat: any, index: number) => {
                  const raw = stat.number || stat.value || "";

                  return (
                    <div
                      key={index}
                      className="min-w-0 rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur"
                      style={{ height: "132px", overflow: "hidden", boxSizing: "border-box" }}
                    >
                      <div className="flex h-8 items-center text-2xl font-bold md:text-3xl">
                        {stat.icon ? <CheckCircleIcon /> : animated[String(index)] || raw}
                      </div>
                      <div className="mt-2 text-xs text-white/80 md:text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previous / Next — chevron icons, matching original exactly */}
      <button
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur transition hover:bg-white md:left-6"
      >
        <ChevronLeftIcon />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur transition hover:bg-white md:right-6"
      >
        <ChevronRightIcon />
      </button>

      {/* Dots — blue theme (#051895 / rgba(5,24,149,0.3)), matching original */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: index === displayedIndex ? "2rem" : "0.625rem",
              backgroundColor: index === displayedIndex ? "#051895" : "rgba(5,24,149,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}