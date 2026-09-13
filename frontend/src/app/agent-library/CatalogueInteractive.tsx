
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DemoModal from "@/components/DemoModal";
import type { Agent, AgentCategory } from "@/types";

const ArrowIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
const SearchIcon = () => <svg className="catalogue-intro-search-icon" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const CpuIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M19 9h4M19 14h4M1 9h4M1 14h4"/></svg>;
const SparkIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v18M3 12h18"/><path d="m5.6 5.6 12.8 12.8M18.4 5.6 5.6 18.4"/></svg>;
const ChartIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="M5 17V9h4v8M10 17V5h4v12M15 17v-6h4v6"/><path d="m5 6 4-3 3 2 6-3"/></svg>;

type Props = {
  categories: AgentCategory[];
  agents: Agent[];
  introHeading?: string;
  introDescription?: string;
  introSearchPlaceholder?: string;
};

export default function CatalogueInteractive({ categories, agents, introHeading, introDescription, introSearchPlaceholder }: Props) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ agent: Agent; category: string } | null>(null);

  const categoriesWithCounts = useMemo(() => categories.map((cat) => {
    const label = cat.slug || cat.name;
    return { cat, label, count: agents.filter((a) => (a.category?.slug || a.category?.name) === label).length };
  }).filter((entry) => entry.label && entry.count > 0), [categories, agents]);

  const filtered = useMemo(() => agents.filter((agent) => {
    const category = agent.category?.slug || agent.category?.name || "";
    const q = query.trim().toLowerCase();
    return (filter === "All" || category === filter) && (!q || String(agent.name || "").toLowerCase().includes(q) || String(agent.description || "").toLowerCase().includes(q));
  }), [agents, filter, query]);

  return (
    <>
      <section id="catalogue" className="catalogue-section">
        <div className="catalogue-container">
          <div className="catalogue-intro">
            <h2 className="catalogue-intro-title">{introHeading || "The KDS ERP Crew Agent Library"}</h2>
            <p className="catalogue-intro-copy">{introDescription || "Explore the complete KDS ERP Crew AI Agent Library, featuring intelligent AI agents for Microsoft Dynamics 365 across Finance, Sales, Procurement, Supply Chain, Manufacturing, Retail, Healthcare, BFSI, Insurance, and more. Each agent is designed to automate business processes, enhance productivity, and deliver enterprise-grade AI automation."}</p>
            <div className="catalogue-intro-search">
              <div className="catalogue-intro-search-inner">
                <SearchIcon />
                <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder={introSearchPlaceholder || "Search"} aria-label="Search AI agents" />
              </div>
            </div>
          </div>

          <div className="catalogue-layout">
            <aside id="catalogue-filter-sticky" className="catalogue-category-sidebar" aria-label="Browse agents by category">
              <h3 className="catalogue-category-title">Browse by Category</h3>
              <div id="filter-bar">
                <button type="button" className={`catalogue-filter-btn ${filter === "All" ? "catalogue-filter-active" : ""}`} onClick={() => setFilter("All")}>
                  <span>All Agents</span><span className="catalogue-filter-arrow">→</span>
                </button>
                {categoriesWithCounts.map(({ cat, label, count }) => (
                  <button type="button" key={cat.id} className={`catalogue-filter-btn ${filter === label ? "catalogue-filter-active" : ""}`} onClick={() => setFilter(label)}>
                    <span>{cat.name || label}</span><span className="catalogue-filter-arrow">→</span><span className="filter-count">{count}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="catalogue-results">
              <div className="catalogue-results-header">
                <p id="catalogue-count"><strong>{filtered.length}</strong> AI agents {filter !== "All" ? `in ${filter}` : "available"}{query ? ` matching "${query}"` : ""}</p>
              </div>
              {filtered.length ? (
                <div id="catalogue-grid" className="catalogue-agent-grid">
                  {filtered.map((agent, index) => {
                    const cat = agent.category?.slug || agent.category?.name || "Agent";
                    return (
                      <article className="catalogue-agent-card" key={agent.id}>
                        <div className="catalogue-agent-icon-stack">
                          <span className="catalogue-agent-icon catalogue-agent-icon-navy"><CpuIcon /></span>
                          <span className="catalogue-agent-icon catalogue-agent-icon-teal"><SparkIcon /></span>
                          <span className="catalogue-agent-icon catalogue-agent-icon-orange"><ChartIcon /></span>
                        </div>
                        <h2 className="catalogue-agent-card-title">{agent.name || `AI Agent ${index + 1}`}</h2>
                        <p className="catalogue-agent-card-description">{agent.description || "Intelligent automation for your business workflow."}</p>
                        {agent.has_demo ? (
                          <button type="button" className="catalogue-agent-action" onClick={() => setSelected({ agent, category: cat })}>Try this agent <ArrowIcon /></button>
                        ) : (
                          <Link className="catalogue-agent-action" href={`/agent-library#catalogue`}>Explore agent <ArrowIcon /></Link>
                        )}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div id="catalogue-empty" className="catalogue-empty-state">No agents match your filter.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <DemoModal agent={selected?.agent || null} category={selected?.category} onClose={() => setSelected(null)} />
    </>
  );
}