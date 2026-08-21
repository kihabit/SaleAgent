"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import type { CoworkerFeature, CoworkerSlider } from "@/types";

export default function AICoWorker() {
  const [item, setItem] = useState<CoworkerSlider | null>(null);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  // Data fetch
  useEffect(() => {
    let cancelled = false;

    apiGet<any>("/api/bottom-sliders")
      .then((res) => {
        if (cancelled) return;
        // Support both response shapes: a raw array, or { success, data }
        const list: CoworkerSlider[] = Array.isArray(res) ? res : res?.data ?? [];
        setItem(list?.[0] ?? null);
      })
      .catch((err) => {
        console.error("Bottom slider fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Rotation timer — resets active index whenever item changes
  useEffect(() => {
    setActive(0);
    if (!item?.features?.length) return;

    const timer = window.setInterval(() => {
      setActive((v) => (v + 1) % item.features!.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [item]);

  const features = item?.features || [];
  const featureText = (f: CoworkerFeature) =>
    typeof f === "string" ? f : f.title || f.text || f.label || "";

  // Avoid rendering broken/empty UI before data arrives or if it's missing
  if (loading) {
    return (
      <section className="relative w-full overflow-hidden py-24">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 h-10 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>
      </section>
    );
  }

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
      <div className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:px-10 lg:gap-28">
        <div className="flex-1">
          {item.badge_text && (
            <span
              className="inline-block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              style={{ background: "#2ababe" }}
            >
              {item.badge_text}
            </span>
          )}

          <h2
            className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl"
            style={{ color: "#051895" }}
          >
            {item.heading_normal}{" "}
            <span style={{ color: "#fba226" }}>{item.heading_highlighted}</span>
          </h2>

          {item.description && (
            <p
              className="mt-5 text-base leading-relaxed text-slate-600"
              style={{ paddingRight: "5%" }}
            >
              {item.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            {item.primary_btn_link && (
              <a
              
                href={item.primary_btn_link}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "#051895" }}
              >
                {item.primary_btn_text} →
              </a>
            )}
            {item.secondary_btn_link && (
              <a
              
                href={item.secondary_btn_link}
                className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition hover:bg-slate-50"
                style={{ borderColor: "#051895", color: "#051895" }}
              >
                {item.secondary_btn_text} →
              </a>
            )}
          </div>
        </div>

        {features.length > 0 && (
          <div
            className="w-full flex-shrink-0 md:w-[440px] lg:w-[520px]"
            style={{ position: "relative", height: 360, overflow: "hidden" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                height: "100%",
                justifyContent: "center",
              }}
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    transition: "all 0.4s ease",
                  }}
                >
                  <span
                    style={{
                      color: "#2ababe",
                      fontSize: 14,
                      opacity: i === active ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      flexShrink: 0,
                    }}
                  >
                    ▶
                  </span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      transition: "all 0.3s ease",
                      fontWeight: i === active ? 700 : 500,
                      color: i === active ? "#051895" : "#94a3b8",
                    }}
                  >
                    {featureText(feature)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}