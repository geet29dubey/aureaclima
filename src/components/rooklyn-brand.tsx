import Image from "next/image";

/** Rooklyn-only branding. Áurea Clima retains its separate wordmark and icon. */
export function RooklynBrand({ compact = false }: { compact?: boolean }) {
  return <span className={`rooklyn-brand${compact ? " rooklyn-brand-compact" : ""}`}><span className="rooklyn-mark"><Image src="/branding/rooklyn-mark.png" alt="" width={258} height={230}/></span><span className="rooklyn-wordmark">Rooklyn</span></span>;
}
