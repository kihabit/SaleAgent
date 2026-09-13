
"use client";

import { useEffect } from "react";

export default function CmsContent({ html }: { html: string }) {
  // Re-run any <script> tags inside the CMS HTML content
  useEffect(() => {
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
  }, [html]);

  return <div id="cms-page-content" dangerouslySetInnerHTML={{ __html: html }} />;
}


