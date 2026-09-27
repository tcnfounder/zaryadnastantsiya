"use client";

import { SiteHeader } from "@/components/SiteHeader";

/** Always mount the sticky header at document level so hero isolation cannot trap z-index. */
export function AppHeader() {
  return <SiteHeader />;
}
