import type { ApiResponse } from "@/types";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers || {}) },
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${path}`);
  }

  const json = (await response.json()) as ApiResponse<T> | T;
  if (json && typeof json === "object" && "success" in json) {
    const wrapped = json as ApiResponse<T>;
    if (wrapped.success === false) throw new Error(wrapped.message || "API request failed");
    return wrapped.data as T;
  }
  return json as T;
}

export function assetUrl(value?: string | null): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/frontend/assets/images/")) return value.replace("/frontend/assets/images/", "/images/");
  if (value.startsWith("/frontend/assets/fonts/")) return value.replace("/frontend/assets/fonts/", "/fonts/");
  if (value.startsWith("/assets/images/")) return value.replace("/assets/images/", "/images/");
  if (value.startsWith("assets/images/")) return `/${value.replace("assets/images/", "images/")}`;
  return value;
}
