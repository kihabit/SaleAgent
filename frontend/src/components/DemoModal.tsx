"use client";

import { useEffect } from "react";
import type { Agent } from "@/types";

export default function DemoModal({ agent, category, onClose }: { agent: Agent | null; category?: string; onClose: () => void }) {
  useEffect(() => {
    if (!agent) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [agent, onClose]);

  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
      <button className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-label="Close demo" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
          <button onClick={onClose} className="absolute right-4 top-4 rounded-sm p-1 opacity-70 hover:opacity-100" aria-label="Close">✕</button>
          <div className="mb-2 inline-flex w-fit items-center rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">{category || "Demo"}</div>
          <h2 id="demo-modal-title" className="mt-1 text-xl font-bold text-foreground">{agent.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.description}</p>
          <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-8 text-center">
            <div className="text-3xl" style={{ color: "#2ababe" }}>▶</div>
            <p className="mt-3 text-sm font-medium">Demo video unavailable in this export</p>
            <p className="mt-1 text-xs text-muted-foreground">On the live site this opens the full agent demo video.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
