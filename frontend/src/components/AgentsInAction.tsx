"use client";

import { useEffect, useState } from "react";
import { apiGet, storageAssetUrl } from "@/lib/api";
import type { AgentActionCard, AgentsActionSection } from "@/types/home-sections";

const FALLBACK_SECTION: AgentsActionSection = { eyebrow: "AI-powered workflows", heading: "AI Agents in Action", description: "Discover how KDS ERP Crew applies intelligent AI agents across business functions to automate workflows, improve productivity, and enable faster, smarter decisions." };
const FALLBACK_CARDS: AgentActionCard[] = [
 {label:"Workflow intelligence",title:"Intelligent Approvals",slug:"intelligent-approvals",description:"Automate approval workflows, route requests intelligently, and reduce processing delays.",image:"intelligent-approvals.png",image_alt:"Business professional working with approval and analytics workflows"},
 {label:"Finance operations",title:"Finance Automation",slug:"finance-automation",description:"Streamline invoices, reconciliation, reporting, and repetitive finance operations.",image:"finance-automation.png",image_alt:"Finance professional reviewing financial reports and charts"},
 {label:"Connected operations",title:"Procurement & Supply Chain",slug:"procurement-supply-chain",description:"Automate purchasing, monitor operations, and improve supply chain visibility.",image:"procurement-supply-chain.png",image_alt:"Warehouse team coordinating procurement and supply chain operations"}
];
function cardsFromSection(section: Record<string, unknown>): AgentActionCard[] { return [1,2,3].map((i)=>({label:String(section[`card_${i}_label`]??""),title:String(section[`card_${i}_title`]??""),slug:String(section[`card_${i}_slug`]??""),description:String(section[`card_${i}_description`]??""),image:String(section[`card_${i}_image`]??""),image_alt:String(section[`card_${i}_image_alt`]??"")})).filter((c)=>c.title||c.description||c.image); }
export default function AgentsInAction(){
 const [section,setSection]=useState<AgentsActionSection>(FALLBACK_SECTION); const [cards,setCards]=useState<AgentActionCard[]>(FALLBACK_CARDS);
 useEffect(()=>{apiGet<Record<string,unknown>>("/api/agents-action-section").then((value)=>{setSection({...FALLBACK_SECTION,...value});const next=cardsFromSection(value);if(next.length)setCards(next);}).catch(()=>undefined)},[]);
 return <section id="agents-in-action-section" className="agents-action-section" aria-labelledby="agents-action-heading"><div className="agents-action-inner"><div className="agents-action-intro"><p className="agents-action-eyebrow">{section.eyebrow}</p><h2 id="agents-action-heading">{section.heading}</h2><p>{section.description}</p></div><div className="agents-action-grid">{cards.map((card,index)=><article className="agents-action-card" key={card.slug||card.title||index}><div className="agents-action-image-wrap">{card.image?<img src={storageAssetUrl(card.image)} alt={card.image_alt||card.title||"AI agent"} loading="lazy"/>:null}<span className="agents-action-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span></div><div className="agents-action-card-body"><p className="agents-action-card-label">{card.label}</p><h3>{card.title}</h3><p>{card.description}</p></div></article>)}</div></div></section>;
}
