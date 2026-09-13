import Footer from "@/components/Footer";
import CmsContent from "./CmsContent";

const API_BASE = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

interface PageData {
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string;
}

export const revalidate = 900; // 

async function getPageData(): Promise<PageData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/pages/about-us`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    // apiGet jaisa hi unwrap logic (agar { success, data } format hai)
    if (json && typeof json === "object" && "success" in json) {
      return json.success ? json.data : null;
    }
    return json;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const page = await getPageData();

  return (
    <>
      <main>
        {!page && (
          <p style={{ padding: "3rem", textAlign: "center", color: "#b91c1c" }}>
            Unable to load page content.
          </p>
        )}
        {page && <CmsContent html={page.content} />}
      </main>
      <Footer />
    </>
  );
}
