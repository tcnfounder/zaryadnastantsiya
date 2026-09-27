"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";

/** Home embeds the header inside the hero; skip the global one there. */
export function AppHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteHeader />;
}
