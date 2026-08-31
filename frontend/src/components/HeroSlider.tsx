"use client";

import { useEffect, useRef, useState } from "react";
import { apiGet, assetUrl } from "@/lib/api";
import type { HeroSlide } from "@/types";

/* ------------------------------------------------------------------ */
/* Default hero image                                                  */
/* ------------------------------------------------------------------ */

const DEFAULT_HERO_IMAGE = "/images/erp-crew-management.webp";

const DEFAULT_SLIDE: HeroSlide = {
  image: DEFAULT_HERO_IMAGE,
  image_alt_text: "AI-Powered Data Insights — KDS ERP Crew",
  heading: ["AI-Powered Data", "Insights"],
  description:
    "Unlock meaningful business intelligence with AI-driven analytics, interactive dashboards, and real-time performance monitoring.",
  stats: [
    { value: "100+", number: "100+", label: "Data Connectors", icon: false },
    { value: "21+", number: "21+", label: "Business Functions", icon: false },
    { value: "10+", number: "10+", label: "Analytics Modules", icon: false },
    { value: "", number: "", label: "Always-On Decision Intelligence Assistant", icon: true },
  ],
  buttons: [
    { text: "Agent Highlights", url: "#highlights" },
    { text: "Complete AI Agent Catalogue", url: "#catalogue" },
    { text: "Back to Key Dynamic Solutions", url: "https://keydynamicssolutions.com/" },
  ],
};

/* ------------------------------------------------------------------ */
/* Static CTA buttons                                                  */
/* These are the same on every slide (matches the approved design),   */
/* so they are NOT part of per-slide data and never fade/refresh when */
/* the slide changes.                                                  */
/* ------------------------------------------------------------------ */

const STATIC_BUTTONS = [
  { text: "Agent Highlights", url: "#highlights" },
  { text: "Complete AI Agent Catalogue", url: "#catalogue" },
  { text: "Back to Key Dynamic Solutions", url: "https://keydynamicssolutions.com/" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function parseStatValue(value: string) {
  const match = String(value || "").match(/^(\d+)(.*)$/);

  if (!match) return null;

  return {
    number: Number(match[1]),
    suffix: match[2],
  };
}

function mapHeroSlide(slide: any): HeroSlide {
  const stats = (slide.stats || []).map((stat: any) => {
    const number = String(stat.number || "").trim();
    const isNumeric = /^\d/.test(number);

    return isNumeric
      ? {
          value: number,
          number,
          label: stat.label || "",
          icon: false,
        }
      : {
          value: "",
          number: "",
          label: stat.label || "",
          icon: true,
        };
  });

  return {
    ...slide,

    image:
      slide.image ||
      slide.background_image ||
      slide.image_url ||
      DEFAULT_HERO_IMAGE,

    image_alt_text: slide.image_alt_text || "",

    // Heading is split on "|" so admins control exactly where the
    // line break falls (e.g. "Smart AI Approval|Assistant").
    heading: (slide.heading || "")
      .split("|")
      .map((line: string) => line.trim())
      .filter(Boolean),

    description: slide.description || "",

    stats,

    // Buttons are intentionally NOT taken from per-slide data anymore.
    // They are static across all slides (see STATIC_BUTTONS above).
    buttons: STATIC_BUTTONS,
  };
}

/**
 * Handles:
 * { success, data: [...] }
 * and
 * plain-array API responses.
 */
function extractSlidesArray(response: any): any[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (response && Array.isArray(response.data)) {
    if (response.success === false) {
      return [];
    }

    return response.data;
  }

  return [];
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-700"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-700"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Button styles                                                       */
/* ------------------------------------------------------------------ */

const BTN_STYLES = [
  {
    bg: "#2ababe",
    text: "#fff",
    Icon: SparklesIcon,
  },
  {
    bg: "#051895",
    text: "#fff",
    Icon: BookOpenIcon,
  },
  {
    bg: "#fba226",
    text: "#fff",
    Icon: ArrowLeftIcon,
  },
];

const AUTOPLAY_MS = 5500;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function HeroSlider() {
  /*
   * IMPORTANT:
   * Start with the local image instead of an empty array.
   *
   * This means the hero can render immediately without
   * waiting for the API.
   */
  const [slides, setSlides] = useState<HeroSlide[]>([
    DEFAULT_SLIDE,
  ]);

  const [current, setCurrent] = useState(0);

  const [loadFailed, setLoadFailed] = useState(false);

  const [displayedIndex, setDisplayedIndex] = useState(0);

  const [textVisible, setTextVisible] = useState(true);

  const [statsVisible, setStatsVisible] = useState(true);

  const [animated, setAnimated] = useState<Record<string, string>>({});

  const headerRef = useRef<HTMLElement | null>(null);

  const [headerHeight, setHeaderHeight] = useState(86);

  /* ---------------------------------------------------------------- */
  /* Preload default hero image                                       */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    /*
     * layout.tsx already preloads this image.
     * This is an additional browser-level preload protection.
     */

    const existingPreload = document.querySelector(
      `link[rel="preload"][as="image"][href="${DEFAULT_HERO_IMAGE}"]`
    );

    if (existingPreload) {
      return;
    }

    const preload = document.createElement("link");

    preload.rel = "preload";
    preload.as = "image";
    preload.href = DEFAULT_HERO_IMAGE;

    document.head.appendChild(preload);

    return () => {
      /*
       * Don't remove preload if another component/layout
       * has already created it.
       */
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Load slides from API                                             */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    /*
     * API loads in background.
     *
     * The DEFAULT_SLIDE is already visible while this request runs.
     */

    apiGet<any>("/api/hero-slides")
      .then((response) => {
        if (cancelled) return;

        const raw = extractSlidesArray(response);

        if (!raw.length) {
          console.warn(
            "HeroSlider: no slides returned from /api/hero-slides",
            response
          );

          /*
           * Don't remove the default slide.
           * It should remain visible if API returns nothing.
           */
          setLoadFailed(true);

          return;
        }

        const mapped = raw.map(mapHeroSlide);

        /*
         * ------------------------------------------------------------
         * Preload first API image
         * ------------------------------------------------------------
         */

        const firstImage = assetUrl(
          mapped[0]?.image ||
            mapped[0]?.background_image ||
            mapped[0]?.image_url
        );

        if (firstImage) {
          const existingPreload = document.querySelector(
            `link[rel="preload"][as="image"][href="${firstImage}"]`
          );

          if (!existingPreload) {
            const preload = document.createElement("link");

            preload.rel = "preload";
            preload.as = "image";
            preload.href = firstImage;

            document.head.appendChild(preload);
          }
        }

        /*
         * ------------------------------------------------------------
         * Preload second API image
         * ------------------------------------------------------------
         */

        const secondImage = assetUrl(
          mapped[1]?.image ||
            mapped[1]?.background_image ||
            mapped[1]?.image_url
        );

        if (secondImage) {
          const existingPreload = document.querySelector(
            `link[rel="preload"][as="image"][href="${secondImage}"]`
          );

          if (!existingPreload) {
            const preload = document.createElement("link");

            preload.rel = "preload";
            preload.as = "image";
            preload.href = secondImage;

            document.head.appendChild(preload);
          }
        }

        /*
         * Replace default local slide with real API slides.
         */

        setSlides(mapped);

        setCurrent(0);

        setDisplayedIndex(0);

        setLoadFailed(false);
      })
      .catch((error) => {
        if (cancelled) return;

        console.error("Hero slider API error:", error);

        /*
         * Keep local default image visible.
         */
        setLoadFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Track real header height                                         */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const header = document.querySelector("header");

    headerRef.current = header;

    if (!header) return;

    const apply = () => {
      setHeaderHeight(
        header.getBoundingClientRect().height
      );
    };

    apply();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => apply());

      ro.observe(header);

      return () => ro.disconnect();
    }
  }, []);

  /* ---------------------------------------------------------------- */
  /* Autoplay                                                          */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (slides.length < 2) return;

    const timer = window.setInterval(() => {
      setCurrent(
        (value) => (value + 1) % slides.length
      );
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length]);

  /* ---------------------------------------------------------------- */
  /* Crossfade                                                         */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (current === displayedIndex) return;

    const fadeTimer = window.setTimeout(() => {
      setTextVisible(false);
      setStatsVisible(false);
    }, 0);

    const swapTimer = window.setTimeout(() => {
      setDisplayedIndex(current);

      setTextVisible(true);

      window.setTimeout(() => {
        setStatsVisible(true);
      }, 120);
    }, 300);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(swapTimer);
    };
  }, [current, displayedIndex]);

  /* ---------------------------------------------------------------- */
  /* Current slide                                                     */
  /* ---------------------------------------------------------------- */

  const slide = slides[displayedIndex];

  /* ---------------------------------------------------------------- */
  /* Reset count-up                                                    */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setAnimated({});
    }, 0);

    return () => {
      window.clearTimeout(resetTimer);
    };
  }, [displayedIndex]);

  /* ---------------------------------------------------------------- */
  /* Count-up animation                                                */
  /* ---------------------------------------------------------------- */

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
        const progress = Math.min(
          (now - start) / 1200,
          1
        );

        const eased =
          1 - Math.pow(1 - progress, 3);

        const value = Math.round(
          parsed.number * eased
        );

        setAnimated((previous) => ({
          ...previous,
          [String(index)]: `${value}${parsed.suffix}`,
        }));

        if (progress < 1) {
          animationFrames.push(
            requestAnimationFrame(animate)
          );
        }
      };

      animationFrames.push(
        requestAnimationFrame(animate)
      );
    });

    return () => {
      animationFrames.forEach((frame) =>
        cancelAnimationFrame(frame)
      );
    };
  }, [slide, statsVisible]);

  /* ---------------------------------------------------------------- */
  /* Safety fallback                                                   */
  /* ---------------------------------------------------------------- */

  if (!slide) {
    return (
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#051895] text-white">
        <img
          src={DEFAULT_HERO_IMAGE}
          alt="ERP Crew Management"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-black/35" />
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Heading / buttons                                                 */
  /* ---------------------------------------------------------------- */

  const heading = Array.isArray(slide.heading)
    ? slide.heading
    : [slide.heading || ""];

  // Buttons are static across every slide, not per-slide data.
  const buttons = STATIC_BUTTONS;

  /* ---------------------------------------------------------------- */
  /* Navigation                                                        */
  /* ---------------------------------------------------------------- */

  const nextSlide = () => {
    if (slides.length < 2) return;

    setCurrent(
      (value) => (value + 1) % slides.length
    );
  };

  const previousSlide = () => {
    if (slides.length < 2) return;

    setCurrent(
      (value) =>
        (value - 1 + slides.length) %
        slides.length
    );
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  return (
    <section
      className="relative flex min-h-[calc(100svh-72px)] flex-col overflow-clip md:min-h-[calc(100svh-86px-45px)]"
      style={{
        minHeight: `calc(100svh - ${headerHeight}px - 45px)`,
      }}
    >
      {/* ------------------------------------------------------------ */}
      {/* Background                                                    */}
      {/* ------------------------------------------------------------ */}

      <div className="absolute inset-0 bg-[#051895]">
        {slides.map((s: any, i: number) => {
          /*
           * API image OR local fallback.
           */

          const rawImage =
            s.image ||
            s.background_image ||
            s.image_url;

          const bgImage = rawImage
            ? assetUrl(rawImage)
            : DEFAULT_HERO_IMAGE;

          const isActive =
            i === displayedIndex;

          return (
            <div
              key={i}
              className="hero-bg-layer pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{
                zIndex: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
            >
              {bgImage && (
                <img
                  src={bgImage}
                  alt={
                    s.image_alt_text ||
                    "ERP Crew Management"
                  }
                  loading={
                    i === 0
                      ? "eager"
                      : "lazy"
                  }
                  fetchPriority={
                    i === 0
                      ? "high"
                      : "auto"
                  }
                  decoding="async"
                  className="hero-background-image h-full w-full object-cover object-top"
                  style={{
                    objectPosition:
                      "50% 0%",
                    transform: "scale(1)",
                    transition:
                      "opacity 0.7s ease",
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Readability overlay */}

        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Content                                                       */}
      {/* ------------------------------------------------------------ */}

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-4 pt-7 sm:px-6 sm:pt-10 md:px-10 md:pt-14">
        <div className="hero-content-stack mt-8 flex max-w-5xl flex-1 flex-col justify-end gap-7 pb-16 sm:mt-12 sm:gap-8 sm:pb-20 md:mt-20 md:gap-10 md:pb-[85px]">

          {/* ---------------------------------------------------------- */}
          {/* Text (heading + description) — this is the ONLY part that */}
          {/* fades/refreshes when the slide changes.                    */}
          {/* ---------------------------------------------------------- */}

          <div
            className="hero-copy flex min-w-0 flex-col transition-all duration-300"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible
                ? "translateY(0)"
                : "translateY(16px)",
            }}
          >
            <h1 className="max-h-[none] max-w-[20ch] overflow-hidden break-words text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.35rem] md:max-h-[2.6em] md:max-w-[24ch] md:text-[3.1875rem]">
              {heading.map(
                (line, index) => (
                  <span
                    key={index}
                    className="block"
                  >
                    {line}
                  </span>
                )
              )}
            </h1>

            <p className="mt-4 max-h-[none] max-w-[40ch] overflow-hidden break-words text-sm leading-relaxed text-white/90 sm:text-base md:max-h-[4.5em] md:max-w-[52ch] md:text-lg">
              {slide.description}
            </p>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Controls (buttons + stats) — moved OUTSIDE hero-copy so    */}
          {/* the buttons never fade/refresh on slide change.            */}
          {/* Only the stats grid still fades (per-slide data).          */}
          {/* ---------------------------------------------------------- */}

          <div className="hero-controls mt-7 flex w-full min-w-0 max-w-full flex-col gap-7 sm:mt-8 sm:w-fit sm:gap-8 md:mt-10 md:gap-10">

            {/* Buttons — static, no fade */}

            <div className="hero-cta-row flex min-h-[44px] w-full max-w-full flex-col items-stretch gap-2.5 sm:w-fit sm:flex-row sm:items-center sm:gap-3">
              {buttons.map(
                (
                  button: any,
                  index: number
                ) => {
                  const text =
                    button.text ||
                    button.label ||
                    "Learn More";

                  const href =
                    button.url ||
                    button.href ||
                    "#";

                  const isExternal =
                    /^https?:\/\//i.test(
                      href
                    );

                  const style =
                    BTN_STYLES[index] ||
                    BTN_STYLES[
                      BTN_STYLES.length - 1
                    ];

                  const { Icon } = style;

                  return (
                    <a
                      key={`${text}-${index}`}
                      href={href}
                      target={
                        isExternal
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        isExternal
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:brightness-110 sm:w-auto"
                      style={{
                        backgroundColor:
                          style.bg,
                        color: style.text,
                      }}
                    >
                      <Icon />

                      {text}
                    </a>
                  );
                }
              )}
            </div>

            {/* Stats — still fades per-slide (data differs per slide) */}

            <div
              className="hero-stats-grid grid w-full min-w-0 grid-cols-2 gap-3 transition-all duration-500 md:grid-cols-4 md:gap-4"
              style={{
                opacity: statsVisible
                  ? 1
                  : 0,

                transform: statsVisible
                  ? "translateY(0)"
                  : "translateY(12px)",
              }}
            >
              {(slide.stats || []).map(
                (
                  stat: any,
                  index: number
                ) => {
                  const raw =
                    stat.number ||
                    stat.value ||
                    "";

                  return (
                    <div
                      key={index}
                      className="min-w-0 min-h-[92px] overflow-hidden rounded-xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur sm:min-h-[110px] sm:p-4 md:min-h-[132px]"
                    >
                      <div className="flex h-8 items-center text-xl font-bold sm:text-2xl md:text-3xl">
                        {stat.icon ? (
                          <CheckCircleIcon />
                        ) : (
                          animated[
                            String(index)
                          ] || raw
                        )}
                      </div>

                      <div className="mt-2 break-words text-[11px] leading-snug text-white/80 sm:text-xs md:text-sm">
                        {stat.label}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Previous Button                                                */}
      {/* ------------------------------------------------------------ */}

      {slides.length > 1 && (
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur transition hover:bg-white sm:left-3 sm:p-2 md:left-6"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* ------------------------------------------------------------ */}
      {/* Next Button                                                    */}
      {/* ------------------------------------------------------------ */}

      {slides.length > 1 && (
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur transition hover:bg-white sm:right-3 sm:p-2 md:right-6"
        >
          <ChevronRightIcon />
        </button>
      )}

      {/* ------------------------------------------------------------ */}
      {/* Dots                                                           */}
      {/* ------------------------------------------------------------ */}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrent(index)
              }
              aria-label={`Go to slide ${
                index + 1
              }`}
              className="h-2.5 rounded-full transition-all duration-300"
              style={{
                width:
                  index ===
                  displayedIndex
                    ? "2rem"
                    : "0.625rem",

                backgroundColor:
                  index ===
                  displayedIndex
                    ? "#051895"
                    : "rgba(5,24,149,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}