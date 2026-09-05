"use client";

import { useEffect } from "react";

export default function AnalyticsInjector({ code }: { code?: string }) {
  useEffect(() => {
    if (!code) return;

    const container = document.createElement("div");
    container.innerHTML = code;
    const scripts = Array.from(container.querySelectorAll("script"));

    const injected: HTMLScriptElement[] = [];

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.text = oldScript.innerHTML;
      document.head.appendChild(newScript);
      injected.push(newScript);
    });

    return () => {
      injected.forEach((s) => s.remove());
    };
  }, [code]);

  return null;
}