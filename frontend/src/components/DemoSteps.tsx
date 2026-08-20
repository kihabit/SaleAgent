"use client";

import { useEffect, useState } from "react";
import { apiGet, assetUrl } from "@/lib/api";
import type { DemoStep, DemoStepsData } from "@/types";

export default function DemoSteps() {
  const [data, setData] = useState<DemoStepsData | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => { apiGet<DemoStepsData>("/api/bottom-step-sliders").then(setData).catch(console.error); }, []);
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
  return <section id="demo-steps-section" className="relative" style={{ height: steps.length ? `${(steps.length + 1) * 100}vh` : undefined }}><div className="sticky top-0 flex h-[100dvh] flex-col overflow-clip" style={{ background: "#f7f8ff" }}>
    <div className="flex-shrink-0 px-6 pb-4 pt-10 text-center md:pt-12"><p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#2ababe" }}>{data?.badge_text}</p><h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]" style={{ color: "#051895" }}>{data?.heading}</h2><p className="mx-auto mt-3 max-w-2xl text-base text-gray-500 md:text-[1.0625rem]">{data?.description}</p></div>
    <div className="flex flex-shrink-0 items-center justify-center gap-2 pb-3">{steps.map((_, i) => <span key={i} className="h-2 rounded-full transition-all" style={{ width: i === active ? 32 : 8, background: i === active ? "#051895" : "rgba(5,24,149,.18)" }} />)}</div>
    <div className="dsc-stack-container"><div className="relative w-full max-w-4xl rounded-3xl shadow-2xl" style={{ height: "min(400px,calc(100dvh - 250px))" }}><div className="absolute inset-0 overflow-hidden rounded-3xl">{steps.map((step: DemoStep, i) => <div key={i} className="demo-step-card-wrapper" style={{ transform: i < active ? "translateY(-110%)" : i === active ? "translateY(0)" : "translateY(110%)", zIndex: i + 1 }}><div className="dsc-inner"><div className="dsc-img-panel">{step.image && <img src={assetUrl(step.image)} alt={step.image_alt || ""} draggable={false} />}</div><div className="dsc-text-panel"><span className="inline-flex w-fit items-center rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgba(251,162,38,.12)", color: "#fba226" }}>{step.label}</span><p aria-hidden className="mt-3 select-none font-black leading-none" style={{ fontSize: "clamp(3rem,6vw,5rem)", color: "rgba(5,24,149,.07)" }}>{step.number}</p><h3 className="dsc-heading">{step.heading}</h3><p className="mt-3 max-w-md text-[.9375rem] leading-relaxed text-gray-500">{step.description}</p><div className="mt-6 h-1 w-10 rounded-full" style={{ background: "#2ababe" }} /></div></div></div>)}</div></div></div>
  </div></section>;
}
