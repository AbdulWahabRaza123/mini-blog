import { db } from "@/lib/db";
import { posts } from "@/schemas/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, summary, authorId } = body;

    if (!title || !authorId) {
      return NextResponse.json(
        { error: "Title and authorId are required" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(posts)
      .values({
        title,
        content,
        summary,
        authorId,
      })
      .returning();

    return NextResponse.json({ data: result[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
