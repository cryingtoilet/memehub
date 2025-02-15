import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { comments } from "~/server/db/schema";
import { sql, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memeId = searchParams.get("memeId");

  if (!memeId) {
    return NextResponse.json(
      { error: "Missing memeId parameter" },
      { status: 400 },
    );
  }

  try {
    const commentList = await db
      .select({
        id: comments.id,
        memeId: comments.memeId,
        userId: comments.userId,
        text: comments.text,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .where(eq(comments.memeId, parseInt(memeId)))
      .orderBy(comments.createdAt)
      .execute();

    console.log("commentList:", commentList);

    return NextResponse.json(commentList, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = session.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { memeId, text } = await request.json();

    if (!memeId || !text) {
      return NextResponse.json(
        { error: "Missing memeId or text parameter" },
        { status: 400 },
      );
    }

    const newComment = await db
      .insert(comments)
      .values({
        id: sql`nextval('comments_id_seq')`,
        memeId: parseInt(memeId),
        userId: userId,
        text: text,
      })
      .returning({
        id: comments.id,
        memeId: comments.memeId,
        userId: comments.userId,
        text: comments.text,
        createdAt: comments.createdAt,
      });

    console.log("newComment", newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
