"use client";

import { useEffect, useRef, useState } from "react";
import { apiGet } from "@/lib/api";
import type { HeroSlide } from "@/types";

/* ------------------------------------------------------------------
 * Local Hero Slider Images
 *
 * IMPORTANT:
 * These images are loaded ONLY from:
 *
 * frontend/public/images/
 *
 * They are NOT loaded from the Laravel API.
 *
 * Mapping is based on API "order".
 * ------------------------------------------------------------------ */

const DEFAULT_HERO_IMAGE =
  "/images/erp-crew-management.webp";

const HERO_SLIDER_IMAGES: Record<number, string> = {
  1: "/images/ERP_software_website.png",
  2: "/images/ERP_Solution_Experts.png",
  3: "/images/ERP_Dashboard_Software.png",
  4: "/images/ERP_Crew_management.png",
  5: "/images/Best_Crew_Management_Software.png",
};

/* ------------------------------------------------------------------
 * Hero Slider Alt Text
 *
 * Mapping is based on API "order".
 * ------------------------------------------------------------------ */

const HERO_SLIDER_ALT_TEXTS: Record<number, string> = {
  1: "Digital Transaction Management Assistant",
  2: "From ERP Data to Decision Intelligence",
  3: "AI-Driven Transaction Processing",
  4: "AI-Powered Data Insights",
  5: "Smart AI Approval Assistant",
};

/* ------------------------------------------------------------------
 * Default Hero Slide
 * ------------------------------------------------------------------ */

const DEFAULT_SLIDE: HeroSlide = {
  image: DEFAULT_HERO_IMAGE,

  image_alt_text: "ERP Crew Management",

  heading: [
    "AI-Powered Data",
    "Insights",
  ],

  description:
    "Unlock meaningful business intelligence with AI-driven analytics, interactive dashboards, and real-time performance monitoring.",

  stats: [
    {
      value: "100+",
      number: "100+",
      label: "Data Connectors",
      icon: false,
    },
    {
      value: "21+",
      number: "21+",
      label: "Business Functions",
      icon: false,
    },
    {
      value: "10+",
      number: "10+",
      label: "Analytics Modules",
      icon: false,
    },
    {
      value: "",
      number: "",
      label:
        "Always-On Decision Intelligence Assistant",
      icon: true,
    },
  ],

  buttons: [
    {
      text: "Agent Highlights",
      url: "#highlights",
    },
    {
      text: "Complete AI Agent Catalogue",
      url: "#catalogue",
    },
    {
      text: "Back to Key Dynamic Solutions",
      url: "https://keydynamicssolutions.com/",
    },
  ],
};

/* ------------------------------------------------------------------
 * Static CTA Buttons
 * ------------------------------------------------------------------ */

const STATIC_BUTTONS = [
  {
    text: "Agent Highlights",
    url: "#highlights",
  },
  {
    text: "Complete AI Agent Catalogue",
    url: "#catalogue",
  },
  {
    text: "Back to Key Dynamic Solutions",
    url: "https://keydynamicssolutions.com/",
  },
];

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

function parseStatValue(value: string) {
  const match = String(value || "").match(
    /^(\d+)(.*)$/
  );

  if (!match) {
    return null;
  }

  return {
    number: Number(match[1]),
    suffix: match[2],
  };
}

/* ------------------------------------------------------------------
 * Map API Hero Slide
 *
 * IMPORTANT:
 *
 * Image is intentionally NOT taken from API.
 *
 * API provides:
 * - heading
 * - description
 * - stats
 * - order
 *
 * Local frontend provides:
 * - image
 * - alt text
 * ------------------------------------------------------------------ */

function mapHeroSlide(slide: any): HeroSlide {
  const stats = (slide.stats || []).map(
    (stat: any) => {
      const number = String(
        stat.number || ""
      ).trim();

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
    }
  );

  return {
    ...slide,

    /*
     * API image is ignored intentionally.
     * Local image is selected during render
     * using slide.order.
     */
    image: DEFAULT_HERO_IMAGE,

    /*
     * API alt text is also not used for the
     * actual local image.
     */
    image_alt_text:
      slide.image_alt_text || "",

    /*
     * Heading is split using "|".
     *
     * Example:
     *
     * Smart AI Approval|Assistant
     *
     * becomes:
     *
     * Smart AI Approval
     * Assistant
     */
    heading: String(
      slide.heading || ""
    )
      .split("|")
      .map((line: string) =>
        line.trim()
      )
      .filter(Boolean),

    description:
      slide.description || "",

    stats,

    /*
     * Buttons are static across all slides.
     */
    buttons: STATIC_BUTTONS,
  };
}

/* ------------------------------------------------------------------
 * Extract API Slides
 *
 * Supports:
 *
 * { success: true, data: [...] }
 *
 * and:
 *
 * [...]
 * ------------------------------------------------------------------ */

function extractSlidesArray(
  response: any
): any[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (
    response &&
    Array.isArray(response.data)
  ) {
    if (response.success === false) {
      return [];
    }

    return response.data;
  }

  return [];
}

/* ------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------ */

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
    aria-hidden="true"
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
    aria-hidden="true"
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
    aria-hidden="true"
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
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
    />
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
    aria-hidden="true"
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
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ------------------------------------------------------------------
 * Button Styles
 * ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------
 * Hero Slider
 * ------------------------------------------------------------------ */

export default function HeroSlider() {
  /*
   * Start with default local slide.
   *
   * This means an image is visible immediately.
   */
  const [slides, setSlides] =
    useState<HeroSlide[]>([
      DEFAULT_SLIDE,
    ]);

  const [current, setCurrent] =
    useState(0);

  const [displayedIndex, setDisplayedIndex] =
    useState(0);

  const [textVisible, setTextVisible] =
    useState(true);

  const [statsVisible, setStatsVisible] =
    useState(true);

  const [animated, setAnimated] =
    useState<Record<string, string>>({});

  const headerRef =
    useRef<HTMLElement | null>(null);

  /* ----------------------------------------------------------------
   * Load Hero Content From API
   *
   * IMPORTANT:
   *
   * API is used for content only.
   *
   * Images are NOT taken from API.
   * ---------------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    apiGet<any>("/api/hero-slides")
      .then((response) => {
        if (cancelled) {
          return;
        }

        const raw =
          extractSlidesArray(response);

        if (!raw.length) {
          console.warn(
            "HeroSlider: no slides returned from /api/hero-slides"
          );

          return;
        }

        /*
         * IMPORTANT:
         *
         * Sort by API order before mapping.
         *
         * This guarantees:
         *
         * order 1 -> local image 1
         * order 2 -> local image 2
         * order 3 -> local image 3
         * order 4 -> local image 4
         * order 5 -> local image 5
         */
        const mapped = raw
          .slice()
          .sort(
            (a: any, b: any) =>
              Number(a.order || 0) -
              Number(b.order || 0)
          )
          .map(mapHeroSlide);

        /*
         * Replace default slide with API content.
         *
         * Images remain controlled by
         * HERO_SLIDER_IMAGES.
         */
        setSlides(mapped);

        setCurrent(0);
        setDisplayedIndex(0);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        console.error(
          "Hero slider API error:",
          error
        );

        /*
         * Keep DEFAULT_SLIDE.
         */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ----------------------------------------------------------------
   * Track Real Header Height
   * ---------------------------------------------------------------- */

  useEffect(() => {
    const header =
      document.querySelector("header");

    headerRef.current = header;

    if (!header) {
      return;
    }

    const apply = () => {
      const height =
        header.getBoundingClientRect()
          .height;

      document.documentElement.style.setProperty(
        "--header-h",
        `${height}px`
      );
    };

    apply();

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      const ro =
        new ResizeObserver(() => {
          apply();
        });

      ro.observe(header);

      return () => {
        ro.disconnect();
      };
    }
  }, []);

  /* ----------------------------------------------------------------
   * Autoplay
   * ---------------------------------------------------------------- */

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setCurrent(
          (value) =>
            (value + 1) %
            slides.length
        );
      }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length]);

  /* ----------------------------------------------------------------
   * Crossfade
   * ---------------------------------------------------------------- */

  useEffect(() => {
    if (
      current === displayedIndex
    ) {
      return;
    }

    const fadeTimer =
      window.setTimeout(() => {
        setTextVisible(false);
        setStatsVisible(false);
      }, 0);

    const swapTimer =
      window.setTimeout(() => {
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

  /* ----------------------------------------------------------------
   * Current Slide
   * ---------------------------------------------------------------- */

  const slide =
    slides[displayedIndex];

  /* ----------------------------------------------------------------
   * Reset Count-Up
   * ---------------------------------------------------------------- */

  useEffect(() => {
    const resetTimer =
      window.setTimeout(() => {
        setAnimated({});
      }, 0);

    return () => {
      window.clearTimeout(resetTimer);
    };
  }, [displayedIndex]);

  /* ----------------------------------------------------------------
   * Count-Up Animation
   * ---------------------------------------------------------------- */

  useEffect(() => {
    if (
      !slide?.stats ||
      !statsVisible
    ) {
      return;
    }

    const animationFrames: number[] =
      [];

    slide.stats.forEach(
      (stat: any, index: number) => {
        if (stat.icon) {
          return;
        }

        const raw =
          stat.number ||
          stat.value ||
          "";

        const parsed =
          parseStatValue(raw);

        if (!parsed) {
          return;
        }

        const start =
          performance.now();

        const animate = (
          now: number
        ) => {
          const progress =
            Math.min(
              (now - start) / 1200,
              1
            );

          const eased =
            1 -
            Math.pow(
              1 - progress,
              3
            );

          const value =
            Math.round(
              parsed.number *
                eased
            );

          setAnimated(
            (previous) => ({
              ...previous,
              [String(index)]:
                `${value}${parsed.suffix}`,
            })
          );

          if (progress < 1) {
            animationFrames.push(
              requestAnimationFrame(
                animate
              )
            );
          }
        };

        animationFrames.push(
          requestAnimationFrame(
            animate
          )
        );
      }
    );

    return () => {
      animationFrames.forEach(
        (frame) => {
          cancelAnimationFrame(frame);
        }
      );
    };
  }, [slide, statsVisible]);

  /* ----------------------------------------------------------------
   * Safety Fallback
   * ---------------------------------------------------------------- */

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

  /* ----------------------------------------------------------------
   * Heading
   * ---------------------------------------------------------------- */

  const heading =
    Array.isArray(slide.heading)
      ? slide.heading
      : [slide.heading || ""];

  /* ----------------------------------------------------------------
   * Buttons
   * ---------------------------------------------------------------- */

  const buttons =
    STATIC_BUTTONS;

  /* ----------------------------------------------------------------
   * Navigation
   * ---------------------------------------------------------------- */

  const nextSlide = () => {
    if (slides.length < 2) {
      return;
    }

    setCurrent(
      (value) =>
        (value + 1) %
        slides.length
    );
  };

  const previousSlide = () => {
    if (slides.length < 2) {
      return;
    }

    setCurrent(
      (value) =>
        (value - 1 + slides.length) %
        slides.length
    );
  };

  /* ----------------------------------------------------------------
   * Render
   * ---------------------------------------------------------------- */

  return (
    <section
      id="hero-section"
      className="relative flex flex-col overflow-clip"
      style={{
        height:
          "max(44rem, calc(100svh - var(--header-h, 5.375rem) - 45px))",

        minHeight:
          "max(44rem, calc(100svh - var(--header-h, 5.375rem) - 45px))",
      }}
    >
      {/* ==========================================================
          BACKGROUND SLIDER
      =========================================================== */}

      <div className="absolute inset-0 bg-[#051895]">
        {slides.map(
          (s: any, i: number) => {
            /*
             * IMPORTANT:
             *
             * Use API order for local image mapping.
             *
             * API example:
             *
             * order: 1
             * order: 2
             * order: 3
             * ...
             */

            const slideOrder =
              Number(s.order) ||
              i + 1;

            const bgImage =
              HERO_SLIDER_IMAGES[
                slideOrder
              ] ||
              DEFAULT_HERO_IMAGE;

            /*
             * Local alt text is also mapped
             * using API order.
             */

            const altText =
              HERO_SLIDER_ALT_TEXTS[
                slideOrder
              ] ||
              "KDS ERP Crew";

            const isActive =
              i === displayedIndex;

            return (
              <div
                key={
                  s.id ??
                  `${slideOrder}-${i}`
                }
                className="hero-bg-layer pointer-events-none absolute inset-0 opacity transition-opacity duration-700"
                style={{
                  zIndex:
                    isActive
                      ? 1
                      : 0,

                  opacity:
                    isActive
                      ? 1
                      : 0,
                }}
              >
                <img
                  src={bgImage}
                  alt={altText}
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
                    transform:
                      isActive
                        ? "scale(1.03)"
                        : "scale(1)",
                  }}
                />
              </div>
            );
          }
        )}

        {/* Readability Overlay */}

        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ==========================================================
          CONTENT
      =========================================================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col px-4 pt-7 sm:px-6 sm:pt-10 md:px-10 md:pt-14">
        <div className="hero-content-stack mt-8 flex max-w-5xl flex-1 flex-col justify-end gap-7 pb-16 sm:mt-12 sm:gap-8 sm:pb-20 md:mt-20 md:gap-10 md:pb-[85px]">

          {/* ======================================================
              TEXT
          ======================================================= */}

          <div
            id="hero-text"
            className="hero-copy transition-all duration-300"
            style={{
              opacity:
                textVisible
                  ? 1
                  : 0,

              transform:
                textVisible
                  ? "translateY(0)"
                  : "translateY(16px)",
            }}
          >
            <h1 className="max-h-[none] max-w-[20ch] overflow-hidden break-words text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.35rem] md:max-h-[2.6em] md:max-w-[24ch] md:text-[3.1875rem]">
              {heading.map(
                (
                  line,
                  index
                ) => (
                  <span
                    key={index}
                    className="block"
                  >
                    {line}
                  </span>
                )
              )}
            </h1>

            <p className="max-h-[none] max-w-[40ch] overflow-hidden break-words text-sm leading-relaxed text-white/90 sm:text-base md:max-h-[4.5em] md:max-w-[52ch] md:text-lg">
              {slide.description}
            </p>
          </div>

          {/* ======================================================
              CONTROLS
          ======================================================= */}

          <div className="hero-controls mt-7 flex w-full min-w-0 max-w-full flex-col gap-7 sm:mt-8 sm:w-fit sm:gap-8 md:mt-10 md:gap-10">

            {/* ====================================================
                CTA BUTTONS
            ===================================================== */}

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
                      BTN_STYLES.length -
                        1
                    ];

                  const {
                    Icon,
                  } = style;

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

                        color:
                          style.text,
                      }}
                    >
                      <Icon />

                      {text}
                    </a>
                  );
                }
              )}
            </div>

            {/* ====================================================
                STATS
            ===================================================== */}

            <div
              className="hero-stats-grid grid w-full min-w-0 grid-cols-2 gap-3 transition-all duration-500 md:grid-cols-4 md:gap-4"
              style={{
                opacity:
                  statsVisible
                    ? 1
                    : 0,

                transform:
                  statsVisible
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
                      className="min-h-[92px] min-w-0 overflow-hidden rounded-xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur sm:min-h-[110px] sm:p-4 md:min-h-[132px]"
                    >
                      <div className="flex h-8 items-center text-xl font-bold sm:text-2xl md:text-3xl">
                        {stat.icon ? (
                          <CheckCircleIcon />
                        ) : (
                          animated[
                            String(
                              index
                            )
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

      {/* ==========================================================
          PREVIOUS BUTTON
      =========================================================== */}

      {slides.length > 1 && (
        <button
          type="button"
          onClick={
            previousSlide
          }
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur transition hover:bg-white sm:left-3 sm:p-2 md:left-6"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* ==========================================================
          NEXT BUTTON
      =========================================================== */}

      {slides.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur transition hover:bg-white sm:right-3 sm:p-2 md:right-6"
        >
          <ChevronRightIcon />
        </button>
      )}

      {/* ==========================================================
          DOTS
      =========================================================== */}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map(
            (_, index) => (
              <button
                type="button"
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
            )
          )}
        </div>
      )}
    </section>
  );
}