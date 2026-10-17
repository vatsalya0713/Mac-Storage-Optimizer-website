"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function PageViewTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render because gtag('config') in layout already sends the initial pageview
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!pathname || typeof window.gtag !== "function") return;

    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");

    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      send_to: measurementId,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}

export function AnalyticsTracker({ measurementId }: { measurementId: string }) {
  return (
    <Suspense fallback={null}>
      <PageViewTracker measurementId={measurementId} />
    </Suspense>
  );
}
