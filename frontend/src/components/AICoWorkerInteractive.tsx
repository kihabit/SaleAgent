"use client";

import { useEffect, useMemo, useState } from "react";
import type { CoworkerFeature, CoworkerSlider } from "@/types";

const ITEM_H = 72;
const VISIBLE = 5;
const CENTER = Math.floor(VISIBLE / 2); // 2
const INTERVAL_MS = 2200;

export default function AICoWorkerInteractive({ item }: { item: CoworkerSlider | null }) {
  const featureText = (f: CoworkerFeature) =>
    typeof f === "string" ? f : f.title || f.text || f.label || "";

  const features = useMemo(
    () => (item?.features || []).map(featureText).filter(Boolean),
    [item]
  );

  /* ── Wheel animation state (matches original vanilla-JS wheel exactly) ── */
  const N = features.length;
  const looped = useMemo(() => (N ? [...features, ...features, ...features] : []), [features, N]);
  const [step, setStep] = useState(N);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setStep(N);
  }, [N]);

  useEffect(() => {
    if (!N) return;
    const id = window.setInterval(() => {
      setStep((prev) => {
        let next = prev + 1;
        if (next >= 2 * N) {
          setAnimate(false);
          next -= N;
          requestAnimationFrame(() => setAnimate(true));
        } else {
          setAnimate(true);
        }
        return next;
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [N]);

  if (!item) return null;

  const bgImage = item.background_image || "/images/erpcrew-section-bg.png";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="img"
      aria-label={item.background_image_alt || ""}
    >
      <div className="relative z-10 mx-auto flex max-w-screen-2xl min-w-0 flex-col items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:gap-16 md:px-10 md:py-24 lg:gap-28">
        <div className="min-w-0 w-full flex-1">
          {item.badge_text && (
            <span
              className="inline-block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              style={{ background: "#2ababe" }}
            >
              {item.badge_text}
            </span>
          )}

          <h2
            className="mt-5 break-words text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.35rem] md:text-5xl"
            style={{ color: "#051895" }}
          >
            {item.heading_normal}{" "}
            <span style={{ color: "#fba226" }}>
              {item.heading_highlighted}
            </span>
          </h2>

          {item.description && (
            <p
              className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:pr-[5%]"
            >
              {item.description}
            </p>
          )}

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-fit sm:flex-row sm:flex-wrap sm:gap-4">
            {item.primary_btn_link && (
              <a
                href={item.primary_btn_link}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
                style={{ background: "#051895" }}
              >
                {item.primary_btn_text} →
              </a>
            )}

            {item.secondary_btn_link && (
              <a
                href={item.secondary_btn_link}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition hover:bg-slate-50 sm:w-auto"
                style={{
                  borderColor: "#051895",
                  color: "#051895",
                }}
              >
                {item.secondary_btn_text} →
              </a>
            )}
          </div>
        </div>

        {features.length > 0 && (
          <div
            className="relative w-full min-w-0 flex-shrink-0 overflow-hidden md:w-[440px] lg:w-[520px]"
            style={{ height: VISIBLE * ITEM_H }}
          >
            <ul
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                margin: 0,
                padding: 0,
                listStyle: "none",
                transform: `translateY(${(CENTER - step) * ITEM_H}px)`,
                transition: animate
                  ? `transform ${Math.round(INTERVAL_MS * 0.4)}ms cubic-bezier(0.4,0,0.2,1)`
                  : "none",
              }}
            >
              {looped.map((label, i) => {
                const dist = i - step;
                const absDist = Math.abs(dist);
                const isActive = dist === 0;
                const opacity = absDist === 0 ? 1 : absDist === 1 ? 0.4 : absDist === 2 ? 0.15 : 0;
                return (
                  <li
                    key={i}
                    style={{
                      height: ITEM_H,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "2.25rem",
                      opacity,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <span
                      style={{
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                        fontSize: isActive ? "1.625rem" : "1.375rem",
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "#051895" : "#475569",
                        letterSpacing: isActive ? "-0.025em" : "-0.01em",
                        transition: "font-size 0.4s ease, color 0.4s ease, font-weight 0.4s ease",
                      }}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Fixed arrow pointer marking the active (centered) row */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: CENTER * ITEM_H,
                left: 0,
                height: ITEM_H,
                display: "flex",
                alignItems: "center",
                zIndex: 20,
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 0,
                  height: 0,
                  borderTop: "9px solid transparent",
                  borderBottom: "9px solid transparent",
                  borderLeft: "14px solid #2ababe",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}