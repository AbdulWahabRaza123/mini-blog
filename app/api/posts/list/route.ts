import { db } from "@/lib/db";
import { posts } from "@/schemas/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const data = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
