"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, PlayCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { Agent, AgentCategory, AgentSection } from "@/types";
import DemoModal from "./DemoModal";

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
  const agents = agentsToShow.slice(0, 8);

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
          {data?.description || "Discover featured KDS ERP Crew AI agents built for Microsoft Dynamics 365."}
        </p>

        {/* Tabs */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max gap-1 border-b border-border">
            {categories.map((cat: AgentCategory) => (
        <button
  key={cat.id}
  onClick={() => setActive(cat.id)}
  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 ${
    cat.id === category?.id
      ? "border-brand text-brand"
      : "border-transparent text-muted-foreground hover:text-foreground"
  }`}
>
  {cat.name}
  <span
    className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
      cat.id === category?.id
        ? "bg-brand text-brand-foreground"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {cat.count ?? cat.agents.length}
  </span>
</button>
            ))}
          </div>
        </div>

        {/* Count + browse hint */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {demoAgents.length} agent highlight{demoAgents.length !== 1 ? "s" : ""}
            </span>{" "}
            with live video demos
          </p>
          <Link
            href="/agent-library"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            See all {category?.name || ""} agents in the catalogue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelected({ agent, category: category?.name || "Agent" })}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                  <h3 className="text-sm font-semibold leading-tight text-foreground">{agent.name}</h3>
                </div>
                {agent.has_demo && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-medium text-brand-foreground">
                    <PlayCircle className="h-3 w-3" />
                    Demo
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{agent.description}</p>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="text-sm font-semibold text-foreground">Need something more specialised?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore the complete KDS ERP Crew AI Agent Library with 90+ agents across all industries and process
            categories.
          </p>
          <Link
            href="/agent-library"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Browse Full Catalogue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <DemoModal agent={selected?.agent || null} category={selected?.category} onClose={() => setSelected(null)} />
    </section>
  );
}                        