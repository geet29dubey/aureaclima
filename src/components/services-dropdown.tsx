"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/dictionaries";
import { serviceDictionaries } from "@/i18n/service-dictionaries";
import { Icon } from "./icon";
import { JourneyLink } from "./journey-link";

export function ServicesDropdown({ locale, label, onSelect }: { locale: Locale; label: string; onSelect?: () => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  const copy = serviceDictionaries[locale];
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return <div ref={root} className="services-dropdown" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => {
    if (event.key === "Escape") { event.stopPropagation(); setOpen(false); button.current?.focus(); }
  }}>
    <button ref={button} type="button" className="services-dropdown-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{label}<Icon name="chevron" size={14}/></button>
    {open && <div id={id} className="services-dropdown-list" onClick={event => { if ((event.target as Element).closest("a")) { setOpen(false); onSelect?.(); } }}>
      <JourneyLink destination="repair" locale={locale} placement="navigation"><span className="dropdown-icon"><Icon name="repair" size={20}/></span>{copy.repair}<Icon name="arrow" size={15}/></JourneyLink>
      <JourneyLink destination="installation" locale={locale} placement="navigation"><span className="dropdown-icon"><Icon name="home" size={20}/></span>{copy.installation}<Icon name="arrow" size={15}/></JourneyLink>
    </div>}
  </div>;
}
