"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import { apiGet, assetUrl, storageAssetUrl } from "@/lib/api";
import type { Agent, AgentCategory, CatalogueSettings } from "@/types";

type CatalogueSettingsExtended = CatalogueSettings & {
  build_heading?: string;
  build_lead?: string;
  build_description?: string;
  feature_1_icon?: string;
  feature_1_title?: string;
  feature_2_icon?: string;
  feature_2_title?: string;
  feature_3_icon?: string;
  feature_3_title?: string;
  hero_image?: string;
  hero_image_alt?: string;
};

type CrewAcademySection = { badge_text?: string; heading?: string; subheading?: string; description?: string; image?: string; image_alt?: string };
type AiOpportunitySection = {
  eyebrow?: string; heading?: string; description?: string; button_text?: string; button_url?: string;
  who_title?: string; who_item_1?: string | null; who_item_2?: string | null; who_item_3?: string | null; who_item_4?: string | null;
  what_title?: string; what_item_1?: string | null; what_item_2?: string | null; what_item_3?: string | null; what_item_4?: string | null;
};
type CatalogueIntroSection = { heading?: string; description?: string; search_placeholder?: string };

function extractArray<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (response?.success === false) return [];
  return Array.isArray(response?.data) ? response.data : [];
}
function extractObject<T>(response: any): T | null {
  if (!response || response.success === false) return null;
  if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) return response.data as T;
  return !Object.prototype.hasOwnProperty.call(response, "success") ? response as T : null;
}
async function fetchAllPages<T>(path: string, maxPages = 20): Promise<T[]> {
  const all: T[] = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const response = await apiGet<any>(`${path}${path.includes("?") ? "&" : "?"}page=${page}&per_page=100`);
    const batch = extractArray<T>(response);
    if (!batch.length) break;
    all.push(...batch);
    const meta = response?.meta || response?.pagination;
    const last = meta?.last_page ?? meta?.total_pages;
    const total = meta?.total;
    if ((last && page >= last) || (total && all.length >= total) || (!last && !total && !response?.links?.next && !response?.next_page_url)) break;
  }
  return all;
}

const ArrowIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
const SearchIcon = () => <svg className="catalogue-intro-search-icon" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const CpuIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M19 9h4M19 14h4M1 9h4M1 14h4"/></svg>;
const SparkIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v18M3 12h18"/><path d="m5.6 5.6 12.8 12.8M18.4 5.6 5.6 18.4"/></svg>;
const ChartIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="M5 17V9h4v8M10 17V5h4v12M15 17v-6h4v6"/><path d="m5 6 4-3 3 2 6-3"/></svg>;
const WorkflowIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h3a3 3 0 0 1 3 3v6"/></svg>;

/* Hero feature icons — original design uses 30x30, distinct sizing from catalogue card icons above */
const HeroCpuIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M19 9h4M19 14h4M1 9h4M1 14h4"/></svg>;
const HeroWorkflowIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h3a3 3 0 0 1 3 3v6"/></svg>;
const HeroChartIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="M5 17V9h4v8M10 17V5h4v12M15 17v-6h4v6"/><path d="m5 6 4-3 3 2 6-3"/></svg>;
const PlayIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/></svg>;

const FEATURE_ICONS: Record<string, () => JSX.Element> = {
  cpu: HeroCpuIcon,
  workflow: HeroWorkflowIcon,
  chart: HeroChartIcon,
  spark: SparkIcon,
};
function FeatureIcon({ icon }: { icon?: string }) {
  const Comp = FEATURE_ICONS[String(icon || "").toLowerCase().trim()] || HeroCpuIcon;
  return <Comp />;
}

/* Splits the hero description at "automate" and "deliver" to match the original 3-line layout,
   regardless of whether the text comes from the CMS or the fallback default. */
function renderHeroDescription(text: string) {
  const m = text.match(/^(.*?automate)\s+(.*?deliver)\s+(.*)$/i);
  if (!m) return text;
  return (
    <>
      {m[1]}
      <span className="agent-library-hero-desc-break" />
      {m[2]}
      <span className="agent-library-hero-desc-break" />
      {m[3]}
    </>
  );
}

export default function AgentLibraryPage() {
  const [settings, setSettings] = useState<CatalogueSettingsExtended>({});
  const [categories, setCategories] = useState<AgentCategory[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ agent: Agent; category: string } | null>(null);
  const [error, setError] = useState(false);
  const [crewAcademy, setCrewAcademy] = useState<CrewAcademySection>({});
  const [aiOpp, setAiOpp] = useState<AiOpportunitySection>({});
  const [intro, setIntro] = useState<CatalogueIntroSection>({});

  useEffect(() => {
    Promise.allSettled([apiGet<any>("/api/catalogue-settings"), apiGet<any>("/api/agent-categories"), fetchAllPages<Agent>("/api/agents")]).then(([s, c, a]) => {
      if (s.status === "fulfilled") setSettings(extractObject<CatalogueSettingsExtended>(s.value) || {});
      if (c.status === "fulfilled") setCategories(extractArray<AgentCategory>(c.value));
      if (a.status === "fulfilled") setAgents(a.value.map((agent) => ({ ...agent, category: agent.category || undefined })));
      else setError(true);
    });
    apiGet<any>("/api/crew-academy-section").then((r) => setCrewAcademy(extractObject<CrewAcademySection>(r) || {})).catch(() => undefined);
    apiGet<any>("/api/ai-opportunity-section").then((r) => setAiOpp(extractObject<AiOpportunitySection>(r) || {})).catch(() => undefined);
    apiGet<any>("/api/agent-library-list-section").then((r) => setIntro(extractObject<CatalogueIntroSection>(r) || {})).catch(() => undefined);
  }, []);

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
      <main>
        <section id="agent-library-hero" className="agent-library-hero-section">
          <div className="agent-library-hero-bg"><img className="agent-library-hero-image" src={settings.hero_image ? storageAssetUrl(settings.hero_image) : assetUrl("/images/agent-library-hero-banner.png")} alt={settings.hero_image_alt || ""} width={1024} height={410} fetchPriority="high" /></div>
          <div className="agent-library-hero-overlay" />
          <div className="agent-library-hero-content">
            <div className="agent-library-hero-copy">
              <div className="agent-library-hero-badge"><SparkIcon /> {settings.badge_text || "AI Agent Catalogue"}</div>
              <h1>{settings.heading || "Your AI Workforce for Every Business Function"}</h1>
              <p>{renderHeroDescription(settings.description || "Discover intelligent AI agents designed to automate business processes, boost productivity, and deliver enterprise-grade AI automation across industries.")}</p>
              <ul className="agent-library-hero-features" aria-label="AI workforce benefits">
                <li className="agent-library-hero-feature"><span className="agent-library-hero-feature-icon"><FeatureIcon icon={settings.feature_1_icon || "cpu"} /></span><span className="agent-library-hero-feature-label">{settings.feature_1_title || "AI-Powered Automation"}</span></li>
                <li className="agent-library-hero-feature"><span className="agent-library-hero-feature-icon"><FeatureIcon icon={settings.feature_2_icon || "workflow"} /></span><span className="agent-library-hero-feature-label">{settings.feature_2_title || "Smarter Workflows"}</span></li>
                <li className="agent-library-hero-feature"><span className="agent-library-hero-feature-icon"><FeatureIcon icon={settings.feature_3_icon || "chart"} /></span><span className="agent-library-hero-feature-label">{settings.feature_3_title || "Real-Time Insights"}</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="catalogue" className="catalogue-section">
          <div className="catalogue-container">
            <div className="catalogue-intro">
              <h2 className="catalogue-intro-title">{intro.heading || "The KDS ERP Crew Agent Library"}</h2>
              <p className="catalogue-intro-copy">{intro.description || "Explore the complete KDS ERP Crew AI Agent Library, featuring intelligent AI agents for Microsoft Dynamics 365 across Finance, Sales, Procurement, Supply Chain, Manufacturing, Retail, Healthcare, BFSI, Insurance, and more. Each agent is designed to automate business processes, enhance productivity, and deliver enterprise-grade AI automation."}</p>
              <div className="catalogue-intro-search"><div className="catalogue-intro-search-inner"><SearchIcon /><input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder={intro.search_placeholder || "Search"} aria-label="Search AI agents" /></div></div>
            </div>

            <div className="catalogue-layout">
              <aside id="catalogue-filter-sticky" className="catalogue-category-sidebar" aria-label="Browse agents by category">
                <h3 className="catalogue-category-title">Browse by Category</h3>
                <div id="filter-bar">
                  <button type="button" className={`catalogue-filter-btn ${filter === "All" ? "catalogue-filter-active" : ""}`} onClick={() => setFilter("All")}><span>All Agents</span><span className="catalogue-filter-arrow">→</span></button>
                  {categoriesWithCounts.map(({ cat, label, count }) => <button type="button" key={cat.id} className={`catalogue-filter-btn ${filter === label ? "catalogue-filter-active" : ""}`} onClick={() => setFilter(label)}><span>{cat.name || label}</span><span className="catalogue-filter-arrow">→</span><span className="filter-count">{count}</span></button>)}
                </div>
              </aside>

              <div className="catalogue-results">
                <div className="catalogue-results-header"><p id="catalogue-count"><strong>{filtered.length}</strong> AI agents {filter !== "All" ? `in ${filter}` : "available"}{query ? ` matching “${query}”` : ""}</p></div>
                {error && !agents.length ? <div className="catalogue-empty-state">Could not load agents. Please refresh and try again.</div> : filtered.length ? (
                  <div id="catalogue-grid" className="catalogue-agent-grid">
                    {filtered.map((agent, index) => {
                      const cat = agent.category?.slug || agent.category?.name || "Agent";
                      return <article className="catalogue-agent-card" key={agent.id}>
                        <div className="catalogue-agent-icon-stack"><span className="catalogue-agent-icon catalogue-agent-icon-navy"><CpuIcon /></span><span className="catalogue-agent-icon catalogue-agent-icon-teal"><SparkIcon /></span><span className="catalogue-agent-icon catalogue-agent-icon-orange"><ChartIcon /></span></div>
                        <h2 className="catalogue-agent-card-title">{agent.name || `AI Agent ${index + 1}`}</h2>
                        <p className="catalogue-agent-card-description">{agent.description || "Intelligent automation for your business workflow."}</p>
                        {agent.has_demo ? <button type="button" className="catalogue-agent-action" onClick={() => setSelected({ agent, category: cat })}>View Demo <PlayIcon /></button> : <Link className="catalogue-agent-action" href={`/agent-library#catalogue`}>Explore Agent <ArrowIcon /></Link>}
                      </article>;
                    })}
                  </div>
                ) : <div id="catalogue-empty" className="catalogue-empty-state">No agents match your filter.</div>}
              </div>
            </div>
          </div>
        </section>

        <section id="build-your-first-agent" className="agent-library-build-cta">
          <div className="agent-library-build-cta-inner">
            <div className="agent-library-build-cta-copy">
              <div className="agent-library-build-cta-eyebrow"><SparkIcon /> {crewAcademy.badge_text || "KDS ERP Crew Academy"}</div>
              <h2 className="agent-library-build-cta-title">{crewAcademy.heading || "Build Your First AI Agent with KDS ERP Crew"}</h2>
              <p className="agent-library-build-cta-lead">{crewAcademy.subheading || "Start building intelligent automation for your business."}</p>
              <p className="agent-library-build-cta-description">{crewAcademy.description || "Learn how to create, customize, and deploy AI agents that can automate tasks, streamline workflows, and support smarter business decisions."}</p>
            </div>
            <div className="agent-library-build-cta-image-wrap"><img className="agent-library-build-cta-image" src={crewAcademy.image ? storageAssetUrl(crewAcademy.image) : "/images/build-first-ai-agent-dashboard.png"} alt={crewAcademy.image_alt || "KDS ERP Crew AI agent dashboard showing automation performance and agent cards"} loading="lazy" /></div>
          </div>
        </section>

        <section id="ai-opportunity-guide" className="agent-library-ai-start">
          <div className="agent-library-ai-start-panel"><div className="agent-library-ai-start-inner">
            <div className="agent-library-ai-start-copy">
              <div className="agent-library-ai-start-eyebrow"><span /> {aiOpp.eyebrow || "AI Opportunity Guide"}</div>
              <h2 className="agent-library-ai-start-title">{aiOpp.heading || "Not Sure Where to Start with AI?"}</h2>
              <p className="agent-library-ai-start-description">{aiOpp.description || "Explore KDS ERP Crew to identify the right AI opportunities for your business and turn them into practical, scalable solutions."}</p>
              <Link className="agent-library-ai-start-button" href={aiOpp.button_url && aiOpp.button_url !== "#" ? aiOpp.button_url : "/about-us#consultation-form"}>{aiOpp.button_text || "Book a Demo"} <ArrowIcon /></Link>
            </div>
            <div className="agent-library-ai-start-guide">
              <div className="agent-library-ai-start-card">
                <h3>{aiOpp.who_title || "Who It’s For:"}</h3>
                <ul>
                  {[aiOpp.who_item_1, aiOpp.who_item_2, aiOpp.who_item_3, aiOpp.who_item_4].filter(Boolean).length
                    ? [aiOpp.who_item_1, aiOpp.who_item_2, aiOpp.who_item_3, aiOpp.who_item_4].filter(Boolean).map((item, i) => <li key={i}>{item}</li>)
                    : [<li key="1">Teams exploring AI adoption</li>, <li key="2">Businesses scaling automation</li>, <li key="3">Enterprises with complex workflows</li>]}
                </ul>
              </div>
              <div className="agent-library-ai-start-card">
                <h3>{aiOpp.what_title || "What You Can Do:"}</h3>
                <ul>
                  {[aiOpp.what_item_1, aiOpp.what_item_2, aiOpp.what_item_3, aiOpp.what_item_4].filter(Boolean).length
                    ? [aiOpp.what_item_1, aiOpp.what_item_2, aiOpp.what_item_3, aiOpp.what_item_4].filter(Boolean).map((item, i) => <li key={i}>{item}</li>)
                    : [<li key="1">Build custom AI agents</li>, <li key="2">Automate business processes</li>, <li key="3">Connect with your existing ERP</li>, <li key="4">Improve productivity and decision-making</li>]}
                </ul>
              </div>
            </div>
          </div></div>
        </section>

      </main>

      <DemoModal agent={selected?.agent || null} category={selected?.category} onClose={() => setSelected(null)} />
      <Footer />
    </>
  );
}