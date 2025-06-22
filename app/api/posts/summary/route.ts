// app/api/posts/summary/route.ts

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { cohere } from "@/lib/cohere-service";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const supabase = supabaseServer();
    const {
      data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await cohere.summarize({
      text,
      length: "medium",
      format: "paragraph",
      model: "command",
      temperature: 0.3,
    });

    return NextResponse.json({ summary: response.summary });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.mesage }, { status: 500 });
  }
}
