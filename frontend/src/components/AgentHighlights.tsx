import AgentHighlightsInteractive from "./AgentHighlightsInteractive";
import type { AgentCategory } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_LARAVEL_API_URL || "http://127.0.0.1:8000";

type AgentSectionData = {
  badge_text?: string;
  heading?: string;
  description?: string;
  categories?: AgentCategory[];
  bottom_cta_heading?: string;
  bottom_cta_description?: string;
  cta_button_text?: string;
  cta_button_url?: string;
};

async function fetchJson(path: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 }, // 1 hour cache — fast like static HTML
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function extractObject<T>(response: any): T | null {
  if (!response || response.success === false) return null;
  if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) return response.data as T;
  return !Object.prototype.hasOwnProperty.call(response, "success") ? response as T : null;
}

export default async function AgentHighlights() {
  const res = await fetchJson("/api/agent-section");
  const data = extractObject<AgentSectionData>(res) || {};

  return <AgentHighlightsInteractive data={data} />;
}