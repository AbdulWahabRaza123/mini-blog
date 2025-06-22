import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function supabaseServer() {
  return createServerActionClient({
    cookies,
  });
}
