import AICoWorkerInteractive from "./AICoWorkerInteractive";
import type { CoworkerSlider } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

async function fetchJson(path: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // 1 hour cache — fast like static HTML
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function AICoWorker() {
  const res = await fetchJson("/api/bottom-sliders");
  const list: CoworkerSlider[] = Array.isArray(res) ? res : res?.data ?? [];
  const item = list?.[0] ?? null;

  return <AICoWorkerInteractive item={item} />;
}