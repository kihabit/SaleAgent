"use client";

import { useEffect, useState } from "react";
import { apiGet, assetUrl } from "@/lib/api";
import type { DemoStep, DemoStepsData } from "@/types";

export default function DemoSteps() {
  const [data, setData] = useState<DemoStepsData | null>(null);
  const [active, setActive] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    apiGet<DemoStepsData>("/api/bottom-step-sliders").then(setData).catch(console.error);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("demo-steps-section");
      if (!section || !data?.steps?.length) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.max(0, Math.min(1, (-rect.top) / total));
      setActive(Math.min(data.steps.length - 1, Math.floor(progress * data.steps.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [data]);

  const steps = data?.steps || [];
  const stepCount = steps.length || 1;

  return (
    <section id="demo-steps-section" className="relative" style={{ height: `${stepCount * 100}vh` }}>
      <div className="sticky top-0 flex h-[100dvh] min-h-0 flex-col overflow-clip" style={{ background: "#f7f8ff" }}>
        <div className="flex-shrink-0 px-4 pb-3 pt-7 text-center sm:px-6 sm:pt-9 md:pt-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#2ababe" }}>{data?.badge_text}</p>
          <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.5rem]" style={{ color: "#051895" }}>{data?.heading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-[1.0625rem]">{data?.description}</p>
        </div>

        <div className="flex flex-shrink-0 items-center justify-center gap-2 pb-3">
          {steps.map((_, i) => (
            <span
              key={i}
              className="h-2 rounded-full transition-all"
              style={{ width: i === active ? 32 : 8, background: i === active ? "#051895" : "rgba(5,24,149,.18)" }}
            />
          ))}
        </div>

        <div className="dsc-stack-container min-h-0 px-3 pb-3 sm:px-4 md:px-10">
          <div className="relative h-[min(600px,calc(100dvh-215px))] w-full max-w-4xl rounded-3xl shadow-2xl sm:h-[min(600px,calc(100dvh-230px))] md:h-[min(400px,calc(100dvh-250px))]">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {steps.map((step: DemoStep, i) => (
                <div
                  key={i}
                  className="demo-step-card-wrapper"
                  style={{
                    transform: i < active ? "translateY(-110%)" : i === active ? "translateY(0)" : "translateY(110%)",
                    zIndex: i + 1,
                  }}
                >
                  <div className="dsc-inner">
                    <div className="dsc-img-panel">
                      {step.image && (
                        <img
                          src={assetUrl(step.image)}
                          alt=""
                          draggable={false}
                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [i]: true }))}
                          style={{
                            opacity: loadedImages[i] ? 1 : 0,
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      )}
                    </div>
                    <div className="dsc-text-panel">
                      <span className="inline-flex w-fit items-center rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgba(251,162,38,.12)", color: "#fba226" }}>
                        {step.label}
                      </span>
                      <p aria-hidden className="mt-3 select-none font-black leading-none text-[clamp(2.75rem,12vw,5rem)]" style={{ color: "rgba(5,24,149,.07)" }}>
                        {step.number}
                      </p>
                      <h3 className="dsc-heading">{step.heading}</h3>
                      <p className="mt-3 max-w-md break-words text-sm leading-relaxed text-gray-500 sm:text-[.9375rem]">
                        {step.description}
                      </p>
                      <div className="mt-6 h-1 w-10 rounded-full" style={{ background: "#2ababe" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}