"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { Agent, AgentCategory, AgentSection as AgentSectionBase } from "@/types";
import DemoModal from "./DemoModal";

type AgentSection = AgentSectionBase & {
  bottom_cta_heading?: string;
  bottom_cta_description?: string;
  cta_button_text?: string;
  cta_button_url?: string;
};

const IconOne = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="7" /></svg>;
const IconTwo = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /><path d="M10 7h3a3 3 0 0 1 3 3v4" /></svg>;
const IconThree = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5M4 19h16" /><path d="m7 15 3-4 3 2 5-7" /></svg>;
const ArrowSmall = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;

export default function AgentHighlights() {
  const [data, setData] = useState<AgentSection | null>(null);
  const [active, setActive] = useState<number | string | null>(null);
  const [selected, setSelected] = useState<{ agent: Agent; category: string } | null>(null);

  useEffect(() => {
    apiGet<AgentSection>("/api/agent-section")
      .then((v) => {
        setData(v);
        if (v.categories?.[0]) setActive(v.categories[0].id);
      })
      .catch(console.error);
  }, []);

  const categories = (data?.categories || []).filter((c) => c.agents?.length).slice(0, 5);
  const category = categories.find((c) => c.id === active) || categories[0];

  const demoAgents = category ? category.agents.filter((a) => a.has_demo) : [];
  const agentsToShow = category ? (demoAgents.length ? demoAgents : category.agents) : [];
  const agents = agentsToShow.slice(0, 6);

  if (!categories.length) return null;

  return (
    <section id="highlights" className="border-b border-border bg-white px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-md bg-brand px-2 py-1 text-xs font-semibold uppercase tracking-widest text-brand-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          {data?.badge_text || "Agent Highlights"}
        </div>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: "#051895" }}>
          {data?.heading || "Experience AI Agents in Action"}
        </h2>

        <p className="mt-3 max-w-full text-base leading-relaxed text-muted-foreground">
          {data?.description || "Discover featured KDS ERP Crew AI agents built for Microsoft Dynamics 365. Explore intelligent solutions across Order to Cash, Procure to Pay, Supply Chain, Finance, Manufacturing, Retail, Healthcare, BFSI, and more. Select any agent to learn how it transforms business operations."}
        </p>

        {/* Sidebar + results layout (matches original design) */}
        <div className="highlights-browser-layout">
          <aside className="highlights-category-sidebar" aria-label="Agent categories">
            <h3 className="highlights-category-heading">Browse by Category</h3>
            <div className="highlights-category-list">
              {categories.map((cat: AgentCategory) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={`highlights-category-button${cat.id === category?.id ? " is-active" : ""}`}
                >
                  <span>{cat.name}</span>
                  <span className="highlights-category-count">{cat.count ?? cat.agents.length}</span>
                  <span className="highlights-category-arrow">→</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="highlights-results">
            <div className="highlights-results-header">
              <p className="highlights-results-count">
                <span>{demoAgents.length} agent highlight{demoAgents.length !== 1 ? "s" : ""}</span>{" "}
                <span className="highlights-results-suffix">with live video demos</span>
              </p>
              <Link href="/agent-library" className="highlights-browse-link">
                <span>See all {category?.name || ""} agents in the catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  aria-label={(agent.has_demo ? "Try " : "Explore ") + agent.name}
                  onClick={() => setSelected({ agent, category: category?.name || "Agent" })}
                  className="catalogue-agent-card group home-highlight-card"
                >
                  <div className="catalogue-agent-icon-stack" aria-hidden="true">
                    <span className="catalogue-agent-icon catalogue-agent-icon-navy"><IconOne /></span>
                    <span className="catalogue-agent-icon catalogue-agent-icon-teal"><IconTwo /></span>
                    <span className="catalogue-agent-icon catalogue-agent-icon-orange"><IconThree /></span>
                  </div>
                  <h3 className="catalogue-agent-card-title">{agent.name}</h3>
                  <p className="catalogue-agent-card-description">{agent.description}</p>
                  <span className="catalogue-agent-action">{agent.has_demo ? "Try this agent" : "Explore agent"} <ArrowSmall /></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="text-sm font-semibold text-foreground">{data?.bottom_cta_heading || "Need something more specialised?"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {data?.bottom_cta_description || "Explore the complete KDS ERP Crew AI Agent Library with 90+ agents across all industries and process categories."}
          </p>
          <Link
            href={data?.cta_button_url && data.cta_button_url !== "#" ? data.cta_button_url : "/agent-library"}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            {data?.cta_button_text || "Browse Full Catalogue"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <DemoModal agent={selected?.agent || null} category={selected?.category} onClose={() => setSelected(null)} />
    </section>
  );
}