"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Browser-only Supabase client. Use this from Client Components only
 * (interactive forms, realtime subscriptions, etc). Server Components,
 * Route Handlers, and Server Actions should use `@gad/supabase/server`
 * instead, which handles cookies correctly and isn't subject to the
 * fetch-caching pitfalls of calling a browser client during SSR.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export type { Database };
