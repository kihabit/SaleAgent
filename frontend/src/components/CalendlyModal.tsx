"use client";

import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/keydynamicssolutions89/30min";

export default function CalendlyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="calendly-modal" role="dialog" aria-modal="true" aria-labelledby="calendly-modal-title">
      <button className="calendly-modal-backdrop" aria-label="Close scheduling window" onClick={onClose} />
      <div className="calendly-modal-panel">
        <div className="calendly-modal-header">
          <div>
            <p className="calendly-modal-eyebrow">KDS ERP Crew</p>
            <h2 id="calendly-modal-title">Schedule Your AI Audit</h2>
          </div>
          <button type="button" className="calendly-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <iframe
          title="Schedule Your AI Audit with Key Dynamics Solutions"
          src={CALENDLY_URL}
          className="calendly-modal-iframe"
          loading="eager"
        />
      </div>
    </div>
  );
}
