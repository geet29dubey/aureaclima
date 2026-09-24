import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() { return [
    { source: "/:locale(es|en|it)/journey/:service(repair|installation)", destination: "/:locale?demo_journey=:service#services", permanent: false },
    { source: "/", has: [{ type: "cookie", key: "aureaclima_language", value: "(?<language>es|it)" }], destination: "/:language", permanent: false },
    { source: "/", destination: "/en", permanent: false }
  ]; },
  async headers() { return [{ source: "/:path*", headers: [
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }])
  ] }]; }
};
export default config;
