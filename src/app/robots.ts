import type { MetadataRoute } from "next";
import { integrations } from "@/config/integrations";
export default function robots():MetadataRoute.Robots { return {rules:{userAgent:"*",...(integrations.allowIndexing?{allow:"/"}:{disallow:"/"})}}; }
