import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { memes, votes } from "~/server/db/schema";
import { sql, eq, and } from "drizzle-orm";

async function handleVote(memeId: number, userId: string, isLike: boolean) {
  try {
    // Check if user has already voted
    const existingVote = await db.query.votes.findFirst({
      where: (votes, { eq }) => {
        return and(eq(votes.memeId, memeId), eq(votes.userId, userId));
      },
    });

    if (existingVote) {
      if (existingVote.isLike === isLike) {
        // Remove vote if clicking the same button
        await db
          .delete(votes)
          .where(and(eq(votes.memeId, memeId), eq(votes.userId, userId)));

        // Update meme counts
        if (isLike) {
          await db
            .update(memes)
            .set({ likes: sql`GREATEST(${memes.likes} - 1, 0)` })
            .where(eq(memes.id, memeId));
        } else {
          await db
            .update(memes)
            .set({ dislikes: sql`GREATEST(${memes.dislikes} - 1, 0)` })
            .where(eq(memes.id, memeId));
        }

        return { success: true, action: isLike ? "unliked" : "undisliked" };
      } else {
        // Change vote from like to dislike or vice versa
        await db
          .update(votes)
          .set({ isLike })
          .where(and(eq(votes.memeId, memeId), eq(votes.userId, userId)));

        // Update meme counts (both like and dislike counts)
        await db
          .update(memes)
          .set({
            likes: isLike
              ? sql`${memes.likes} + 1`
              : sql`GREATEST(${memes.likes} - 1, 0)`,
            dislikes: isLike
              ? sql`GREATEST(${memes.dislikes} - 1, 0)`
              : sql`${memes.dislikes} + 1`,
          })
          .where(eq(memes.id, memeId));

        return { success: true, action: isLike ? "liked" : "disliked" };
      }
    } else {
      // Create new vote
      await db.insert(votes).values({
        memeId,
        userId,
        isLike,
      });

      // Update meme count
      if (isLike) {
        await db
          .update(memes)
          .set({ likes: sql`${memes.likes} + 1` })
          .where(eq(memes.id, memeId));
      } else {
        await db
          .update(memes)
          .set({ dislikes: sql`${memes.dislikes} + 1` })
          .where(eq(memes.id, memeId));
      }

      return { success: true, action: isLike ? "liked" : "disliked" };
    }
  } catch (error) {
    console.error("Error handling vote:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  const session = await auth();
  const userId = session.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const memeId = searchParams.get("memeId");

  if (!memeId) {
    return NextResponse.json(
      { error: "Missing memeId parameter" },
      { status: 400 },
    );
  }

  try {
    const existingVote = await db.query.votes.findFirst({
      where: (votes, { eq }) => {
        return and(
          eq(votes.memeId, parseInt(memeId)),
          eq(votes.userId, userId),
        );
      },
    });

    const hasLiked = existingVote ? existingVote.isLike : false;
    const hasDisliked = existingVote ? !existingVote.isLike : false;

    return NextResponse.json({ hasLiked, hasDisliked }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user votes:", error);
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
    const { memeId, isLike } = await request.json();
    const result = await handleVote(memeId, userId, isLike);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error processing vote:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
