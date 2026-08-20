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

  return (
    <>
      <Header />
      <main>
        {error && (
          <p style={{ padding: "3rem", textAlign: "center", color: "#b91c1c" }}>
            Unable to load page content.
          </p>
        )}
        {page && <div dangerouslySetInnerHTML={{ __html: page.content }} />}
      </main>
      <Footer />
    </>
  );
}