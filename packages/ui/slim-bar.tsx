"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "./lib/utils";
import { useProgress } from "./context/progress-context";

/**
 * Watches the Next.js App Router for navigation and drives the progress
 * context accordingly:
 *  - `start()` fires as soon as an internal link is clicked, or a
 *    programmatic navigation (router.push/replace) kicks off.
 *  - `done()` fires once the pathname/search params actually settle.
 * Must be rendered inside a <Suspense> boundary because it reads
 * `useSearchParams`.
 */
function RouteChangeListener() {
  const { start, done } = useProgress();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = React.useRef(true);

  // Complete the bar once the route has actually finished changing.
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    done();
  }, [pathname, searchParams, done]);

  // Kick the bar off on internal link clicks and on any History API
  // navigation (covers router.push/replace, back/forward, etc.).
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank" || anchor.hasAttribute("download"))
        return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      start();
    };

    document.addEventListener("click", handleClick);

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(
      window.history,
    );

    window.history.pushState = ((...args: Parameters<History["pushState"]>) => {
      start();
      return originalPushState(...args);
    }) as History["pushState"];

    window.history.replaceState = ((
      ...args: Parameters<History["replaceState"]>
    ) => {
      start();
      return originalReplaceState(...args);
    }) as History["replaceState"];

    return () => {
      document.removeEventListener("click", handleClick);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [start]);

  return null;
}

export interface SlimBarProps {
  className?: string;
  /** Bar thickness in pixels. Defaults to 3. */
  height?: number;
}

/**
 * A slim, brand-gradient progress bar fixed to the top of the viewport,
 * used to indicate page transitions across the app. Renders `null`
 * visually (opacity 0) when idle. Requires `<ProgressProvider>` from
 * `@gad/ui/context/progress-context` higher up the tree.
 */
export function SlimBar({ className, height = 3 }: SlimBarProps) {
  const { isLoading, progress } = useProgress();

  return (
    <>
      <React.Suspense fallback={null}>
        <RouteChangeListener />
      </React.Suspense>
      <div
        role="progressbar"
        aria-hidden={!isLoading}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] pointer-events-none transition-opacity duration-300 ease-out",
          isLoading ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ height }}
      >
        <div
          className="gad-gradient h-full transition-[width] duration-300 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow:
              "0 0 8px hsl(var(--secondary)), 0 0 4px hsl(var(--primary))",
          }}
        />
      </div>
    </>
  );
}
