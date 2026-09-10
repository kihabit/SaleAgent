"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import type { BusinessTransformation } from "@/types/home-sections";

const FALLBACK: BusinessTransformation = {
  heading_black: "KDS ERP Crew", heading_colored: "AI-Powered Business Transformation",
  description: "KDS ERP Crew helps organizations move from AI experimentation to real business impact by embedding intelligent agents into everyday workflows.",
  feature_1_title: "Automate", feature_1_description: "Transform repetitive processes with AI-powered agents and intelligent workflows.", feature_1_color: "#fba226",
  feature_2_title: "Scale", feature_2_description: "Expand AI across business functions with customizable agents and multiple AI/LLM models.", feature_2_color: "#2ababe",
  feature_3_title: "Govern", feature_3_description: "Enable secure, controlled AI adoption with enterprise-focused security and human oversight.", feature_3_color: "#051895",
};

export default function BusinessTransformation() {
  const [data, setData] = useState<BusinessTransformation>(FALLBACK);
  useEffect(() => { apiGet<BusinessTransformation>("/api/ai-powered-business-section").then((value) => setData({ ...FALLBACK, ...value })).catch(() => undefined); }, []);
  const features = [1,2,3].map((index) => ({ title: data[`feature_${index}_title`] as string, description: data[`feature_${index}_description`] as string, color: data[`feature_${index}_color`] as string }));
  return <section id="transformation-section" className="transformation-section" aria-labelledby="transformation-heading"><div className="transformation-inner"><div className="transformation-intro"><h2 id="transformation-heading">{data.heading_black} <span>— {data.heading_colored}</span></h2><p>{data.description}</p></div><div className="transformation-pillars">{features.map((feature) => <article className="transformation-pillar" key={feature.title}><div className="transformation-rule" aria-hidden="true" style={{ background: feature.color || "#051895" }} /><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></div></section>;
}
