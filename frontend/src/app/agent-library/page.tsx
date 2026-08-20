"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import { apiGet } from "@/lib/api";
import type { Agent, AgentCategory, CatalogueSettings } from "@/types";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Normalizes an API response into a plain array, whether the backend
 * returns { success, data: [...] } (as the old vanilla-JS code expects)
 * or a plain array.
 */
function extractArray<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (response && response.success === false) return [];
  if (response && Array.isArray(response.data)) return response.data;
  return [];
}

/**
 * Fetches every page of a paginated list endpoint and returns the combined
 * array. Handles common pagination shapes:
 *   { success, data: [...], meta: { current_page, last_page, total } }
 *   { success, data: [...], pagination: { current_page, total_pages } }
 *   { success, data: [...], links: { next: "..." } }
 * Falls back to a single request if the response isn't paginated at all.
 */
async function fetchAllPages<T>(path: string, maxPages = 20): Promise<T[]> {
  const all: T[] = [];
  let page = 1;

  while (page <= maxPages) {
    const separator = path.includes("?") ? "&" : "?";
    const response: any = await apiGet<any>(`${path}${separator}page=${page}&per_page=100`);
    const batch = extractArray<T>(response);

    if (!batch.length) break;
    all.push(...batch);

    const meta = response?.meta || response?.pagination;
    const lastPage = meta?.last_page ?? meta?.total_pages;
    const total = meta?.total;

    const hasNextLink = Boolean(response?.links?.next || response?.next_page_url);

    const morePagesByMeta = lastPage ? page < lastPage : undefined;
    const morePagesByTotal = total ? all.length < total : undefined;

    if (morePagesByMeta === false || morePagesByTotal === false) break;
    if (morePagesByMeta === undefined && morePagesByTotal === undefined && !hasNextLink) {
      // No pagination metadata at all — assume this single request had everything.
      break;
    }

    page += 1;
  }

  return all;
}

/** Normalizes a single-object API response, e.g. { success, data: {...} } */
function extractObject<T>(response: any): T | null {
  if (!response) return null;
  if (response.success === false) return null;
  if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) {
    return response.data as T;
  }
  if (typeof response === "object" && !("success" in response)) {
    return response as T;
  }
  return null;
}

interface Solution {
  id: string | number;
  title: string;
  desc: string;
  steps: number | string;
  automation: string;
  outcome: string;
}

interface SolutionsHeader {
  badge_text?: string;
  heading?: string;
  description?: string;
  cta_button_text?: string;
}

/* ------------------------------------------------------------------ */
/* Icons                                                                */
/* ------------------------------------------------------------------ */

const ZapIcon = () => (
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
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ClockIcon = () => (
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
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function AgentLibraryPage() {
  /* Catalogue (agents) state */
  const [settings, setSettings] = useState<CatalogueSettings & { notice_text?: string; notice_link_text?: string; notice_link_url?: string }>({});
  const [categories, setCategories] = useState<AgentCategory[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ agent: Agent; category: string } | null>(null);
  const [catalogueError, setCatalogueError] = useState(false);

  /* Solutions state */
  const [solutionsHeader, setSolutionsHeader] = useState<SolutionsHeader>({});
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [solutionsError, setSolutionsError] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  /* ---------------- Load catalogue settings, categories, agents ---------------- */
  useEffect(() => {
    Promise.allSettled([
      apiGet<any>("/api/catalogue-settings"),
      apiGet<any>("/api/agent-categories"),
      fetchAllPages<any>("/api/agents"),
    ]).then(([s, c, a]) => {
      if (s.status === "fulfilled") {
        const data = extractObject<CatalogueSettings>(s.value);
        if (data) setSettings(data);
      }

      if (c.status === "fulfilled") {
        const data = extractArray<AgentCategory>(c.value);
        setCategories(data);
      }

      if (a.status === "fulfilled") {
        const data = a.value; // already a flat array from fetchAllPages
        if (!data.length) {
          console.warn("AgentLibrary: no agents returned from /api/agents");
        }
        setAgents(
          data.map((x) => ({
            ...x,
            category: x.category || undefined,
          }))
        );
      } else {
        console.error("AgentLibrary: /api/agents failed", a.reason);
        setCatalogueError(true);
      }
    });
  }, []);

  /* ---------------- Load solutions header + solutions list ---------------- */
  useEffect(() => {
    apiGet<any>("/api/agent-section/slug/agent-library-solutions")
      .then((response) => {
        const data = extractObject<SolutionsHeader>(response);
        if (data) setSolutionsHeader(data);
      })
      .catch((error) => {
        console.error("AgentLibrary: solutions header load error", error);
      });

    apiGet<any>("/api/solutions")
      .then((response) => {
        const raw = extractArray<any>(response);

        if (!raw.length) {
          console.warn("AgentLibrary: no solutions returned from /api/solutions", response);
        }

        const mapped: Solution[] = raw.map((s) => ({
          id: s.id,
          title: s.title || "",
          desc: s.description || "",
          steps: s.steps_count,
          automation: s.automation_percentage != null ? `${s.automation_percentage}% Automation` : "",
          outcome: s.outcome_label || "",
        }));

        setSolutions(mapped);
      })
      .catch((error) => {
        console.error("AgentLibrary: solutions load error", error);
        setSolutionsError(true);
      });
  }, []);

  /* ---------------- Derived data ---------------- */

  // Match old JS exactly: don't pre-filter on category.count/category.agents
  // (many APIs don't return those fields at all, which was silently hiding
  // every category button). Instead, compute the count live from the
  // agents list and only skip categories that end up with zero matches.
  const categoriesWithAgentCounts = useMemo(
    () =>
      categories
        .map((cat) => {
          const label = cat.slug || cat.name;
          const count = agents.filter((a) => (a.category?.slug || a.category?.name) === label).length;
          return { cat, label, count };
        })
        .filter((entry) => entry.label && entry.count > 0),
    [categories, agents]
  );

  const filtered = useMemo(
    () =>
      agents.filter((agent) => {
        const cat = agent.category?.slug || agent.category?.name || "";
        const matchesFilter = filter === "All" || cat === filter;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          String(agent.name || "").toLowerCase().includes(q) ||
          String(agent.description || "").toLowerCase().includes(q);
        return matchesFilter && matchesQuery;
      }),
    [agents, filter, query]
  );

  return (
    <>
      <Header />
      <main className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-foreground p-1.5 text-background">
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
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {settings.badge_text || "Agent Library"}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {settings.heading || "Complete AI Agent Catalogue"}
          </h1>
          <p className="mt-3 max-w-full text-base leading-relaxed text-muted-foreground">
            {settings.description ||
              "Explore the complete KDS ERP Crew AI Agent Library featuring intelligent AI agents for Microsoft Dynamics 365."}
          </p>

          {/* Notice banner — matches original: amber, inline-fit, not full width */}
          {settings.notice_text && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
              <span>{settings.notice_text}</span>
              {settings.notice_link_text && (
                <a
                  href={settings.notice_link_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-900"
                >
                  {settings.notice_link_text}
                </a>
              )}
            </div>
          )}

          {/* Filter bar */}
          <div
            className="sticky z-10 -mx-6 mt-8 border-b border-border bg-white/90 px-6 py-3 backdrop-blur md:-mx-10 md:px-10"
            style={{ top: "5.375rem" }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilter("All")}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    filter === "All" ? "border-brand bg-brand text-white" : "border-border bg-white text-foreground"
                  }`}
                >
                  All <span className="rounded-full px-1.5 text-[10px]">{agents.length}</span>
                </button>
                {categoriesWithAgentCounts.map(({ cat, label, count }) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(label)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      filter === label ? "border-brand bg-brand text-white" : "border-border bg-white text-foreground"
                    }`}
                  >
                    {label} <span className="rounded-full px-1.5 text-[10px]">{count}</span>
                  </button>
                ))}
              </div>

              {/* Search input — matches original: icon + fixed width on desktop */}
              <div className="relative w-full md:w-72">
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
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search agents..."
                  className="w-full rounded-md border border-input bg-white py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground outline-none focus:border-brand focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            {filtered.length} shown
            {filter !== "All" ? ` in ${filter}` : ""}
            {query ? ` matching "${query}"` : ""}
          </p>

          {catalogueError && !agents.length ? (
            <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
              Could not load agents. Please refresh, or check console for details.
            </div>
          ) : filtered.length ? (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((agent) => {
                const cat = agent.category?.slug || agent.category?.name || "Agent";
                return (
                  <div
                    key={agent.id}
                    className="group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition hover:border-brand hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex shrink-0 items-center rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                        {cat}
                      </span>
                      {Boolean(agent.has_demo) && (
                        <button
                          onClick={() => setSelected({ agent, category: cat })}
                          className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium text-white hover:brightness-110"
                        >
                          <PlayIcon /> Demo
                        </button>
                      )}
                    </div>
                    <h2 className="mt-3 text-sm font-semibold leading-snug text-foreground">{agent.name}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{agent.description}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
              No agents match your filter.
            </div>
          )}

          {/* -------------------- Solutions section -------------------- */}
          <div className="mt-24 border-t border-border pt-16">
            <div
              className="mb-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              style={{ background: "#2ababe" }}
            >
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
              >
                <rect x="16" y="16" width="6" height="6" rx="1" />
                <rect x="2" y="16" width="6" height="6" rx="1" />
                <rect x="9" y="2" width="6" height="6" rx="1" />
                <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
                <path d="M12 12V8" />
              </svg>
              <span>{solutionsHeader.badge_text || "How AI Agents Work Together"}</span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: "#051895" }}>
              {solutionsHeader.heading || "End-to-End Business Process Automation"}
            </h2>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <p className="max-w-full text-base leading-relaxed text-muted-foreground">
                {solutionsHeader.description ||
                  "KDS ERP Crew brings together intelligent AI agents that work seamlessly across Microsoft Dynamics 365 to automate business processes from start to finish. Each agent performs specialized tasks, shares contextual data, and orchestrates workflows to deliver faster decisions, higher productivity, and intelligent business outcomes."}
              </p>
              <button
                onClick={() =>
                  alert(
                    "Contact Key Dynamics Solutions to view all AI solutions:\nhttps://keydynamicssolutions.com/"
                  )
                }
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                <span>{solutionsHeader.cta_button_text || "View All AI Solutions"}</span>
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
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            {solutionsError && !solutions.length ? (
              <p className="mt-6 text-sm text-muted-foreground">Could not load solutions right now.</p>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {solutions.map((sol) => (
                  <button
                    key={sol.id}
                    type="button"
                    onClick={() => setSelectedSolution(sol)}
                    className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                  >
                    <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                      {sol.steps} steps
                    </div>
                    <h3 className="text-base font-bold leading-snug text-foreground">{sol.title}</h3>
                    <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {sol.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                        <ZapIcon /> {sol.automation}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <ClockIcon /> {sol.outcome}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <DemoModal agent={selected?.agent || null} category={selected?.category} onClose={() => setSelected(null)} />

      {/* Solution modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedSolution(null)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setSelectedSolution(null)}
              aria-label="Close"
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
              {selectedSolution.steps} steps
            </div>
            <h3 className="text-lg font-bold text-foreground">{selectedSolution.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selectedSolution.desc}</p>
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                <ZapIcon /> {selectedSolution.automation}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <ClockIcon /> {selectedSolution.outcome}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}