"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./icon";

/** Keep the gallery usable until the supplied product PNGs are available. */
export function ProductImage({ src, alt, pending }: { src: string; alt: string; pending: string }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return <div className="product-media">
    <div className="product-image">
      {!loaded && <div className="product-image-placeholder" role={failed ? "img" : undefined} aria-label={failed ? `${alt}. ${pending}` : undefined} aria-hidden={!failed}>
        <Icon name="air" size={48}/><span>{pending}</span>
      </div>}
      {!failed && <Image src={src} alt={alt} fill unoptimized loading="lazy" className={loaded ? "is-loaded" : ""} onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>}
    </div>
  </div>;
}
