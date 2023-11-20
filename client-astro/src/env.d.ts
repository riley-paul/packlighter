/// <reference path="../.astro/types.d.ts" />
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "./lib/database";

/// <reference types="vite/client" />
/// <reference types="astro/client" />

declare global {
  namespace App {
    interface Locals {
      sb: SupabaseClient<Database>;
      user: User | null;
    }
  }
  interface ImportMetaEnv {
    readonly PB_URL: string;
    readonly SUPABASE_URL: string;
    readonly SUPABASE_ANON_KEY: string;
    readonly PB_AUTH_EMAIL: string;
    readonly PB_AUTH_PASS: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
