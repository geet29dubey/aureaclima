"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { BookingDictionary } from "@/i18n/booking-dictionaries";
import { isBookingCompletion } from "@/lib/booking-completion";
import { GHLEmbedScript } from "./ghl-embed-script";
import { Icon } from "./icon";

export function GHLBookingWidget({ src, id, title, copy, thankYouPath }: {
  src: string; id: string; title: string;
  thankYouPath: string;
  copy: Pick<BookingDictionary, "loading" | "fallback" | "external">;
}) {
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const embeddedUrl = new URL(src);
  // GHL emits completion before processing its own redirect. Let this page
  // handle navigation; the direct-link fallback keeps GHL's confirmation.
  embeddedUrl.searchParams.set("redirect", "false");
  useEffect(() => {
    let completed = false;
    const onMessage = (event: MessageEvent) => {
      if (completed || !isBookingCompletion(event, frame.current?.contentWindow, src)) return;
      completed = true;
      router.replace(thankYouPath);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [src, thankYouPath, router]);
  return <>
    <div className="booking-widget-host">
      {!loaded && <p className="booking-loading" role="status"><span className="loading-dot" />{copy.loading}</p>}
      <iframe
        ref={frame} src={embeddedUrl.toString()} id={id} title={title} allow="payment" scrolling="no" loading="eager"
        className="booking-iframe"
        style={{ width: "100%", height: 720, border: "none", overflow: "hidden" }}
        onLoad={() => setLoaded(true)}
      />
    </div>
    <div className="booking-fallback"><p>{copy.fallback}</p><a href={src} target="_blank" rel="noopener noreferrer">{copy.external}<Icon name="external" size={16} /></a></div>
    {loaded && <GHLEmbedScript />}
  </>;
}
