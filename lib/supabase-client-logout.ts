"use client";
import { supabaseBrowser } from "@/lib/supabase-client";
export async function signOutClient() {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Client sign out error:", error.message);
    return;
  }
  window.location.href = "/";
}
