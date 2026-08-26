import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        // Next.js patches the global `fetch` and, by default, caches
        // requests made from Server Components at build time. Without this
        // override, rows added to Supabase *after* the last build/deploy
        // (e.g. new reviewers) never show up because Next keeps serving the
        // cached (often empty) response instead of hitting Supabase again.
        fetch: (input, init) =>
          fetch(input, { ...init, cache: "no-store" }),
      },
    },
  );
}

export { createServerClient };
export type { Database };
