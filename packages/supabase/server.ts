import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Server-only Supabase client for Server Components, Route Handlers, and
 * Server Actions. Wires up cookies via `next/headers` so auth sessions work
 * correctly (needed by the admin app), and disables fetch caching so reads
 * always hit Supabase instead of a stale response cached at build time
 * (this was the cause of the reviewers list showing up empty after rows
 * were added post-deploy).
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll is called from a Server Component; ignore if there's
            // no request/response to attach cookies to (middleware handles
            // session refresh in that case).
          }
        },
      },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    },
  );
}

export type { Database };
