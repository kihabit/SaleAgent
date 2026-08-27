"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiGet } from "@/lib/api";

interface PageData {
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string;
}

export default function AboutPage() {
  const [page, setPage] = useState<PageData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiGet<PageData>("http://127.0.0.1:8000/api/pages/about-us")
      .then(setPage)
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  // Re-run any <script> tags inside the CMS HTML content
  // (scripts inside dangerouslySetInnerHTML don't execute automatically)
  useEffect(() => {
    if (!page) return;

    const container = document.getElementById("cms-page-content");
    if (!container) return;

    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [page]);

  return (
    <>
      <Header />
      <main>
        {error && (
          <p style={{ padding: "3rem", textAlign: "center", color: "#b91c1c" }}>
            Unable to load page content.
          </p>
        )}
        {page && (
          <div id="cms-page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
      </main>
      <Footer />
    </>
  );
}