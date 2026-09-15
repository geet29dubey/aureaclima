export type IconName = "arrow" | "external" | "home" | "repair" | "air" | "heat" | "pump" | "shield" | "check" | "calendar" | "message" | "globe" | "menu" | "close" | "chevron" | "leaf";
export function Icon({ name, size = 24, className = "" }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>, external: <><path d="M7 17 17 7M7 7h10v10" /></>,
    home: <><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" /></>,
    repair: <><path d="M14.5 6.5 18 3a6 6 0 0 1-7.7 7.7L3.8 17.2a2.1 2.1 0 0 0 3 3l6.5-6.5A6 6 0 0 0 21 6l-3.5 3.5-3-3Z" /></>,
    air: <><rect x="3" y="4" width="18" height="9" rx="2"/><path d="M6 9h12M8 16v4m4-4v5m4-5v3" /></>,
    heat: <><rect x="5" y="3" width="14" height="16" rx="2"/><path d="M9 19v3m6-3v3M8 14h8M12 6v4m-2-2h4" /></>,
    pump: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="6"/><path d="m12 6 2 6-5 4m3-4 6 1" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6" /></>,
    check: <path d="m5 12 4 4L19 6"/>, calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-14 5 3 3 6-5" /></>,
    message: <><path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z"/><path d="M8 10h8m-8 4h5" /></>,
    globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>, close: <path d="m6 6 12 12M6 18 18 6"/>, chevron: <path d="m7 10 5 5 5-5"/>,
    leaf: <><path d="M20 3c-9-1-16 3-16 10a6 6 0 0 0 6 6c7 0 11-7 10-16Z"/><path d="M3 21 15 9" /></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>;
}
export function Brand({ light = false }: { light?: boolean }) {
  return <span className={`brand${light ? " brand-light" : ""}`}><svg viewBox="0 0 40 40" width="39" height="39" fill="none" aria-hidden="true"><path d="M6 29 20 6l14 23H6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M7 33c7-10 18 6 27-7M11 24c7-7 14 5 19-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><span>áurea<span className="brand-clima">clima</span></span></span>;
}
