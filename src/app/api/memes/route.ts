import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "~/server/db"; // Import your Drizzle database instance
import { memes, votes } from "~/server/db/schema"; // Import your Drizzle schema for memes and votes
import { sql, eq } from "drizzle-orm";

// Adjust this to match your database connection and query logic
async function getMemesFromDatabase(userId?: string) {
  try {
    // Use Drizzle to query the database
    const memeList = await db
      .select({
        id: memes.id,
        imageUrl: memes.imageUrl,
        title: memes.title,
        authorId: memes.authorId,
        likes: memes.likes,
        dislikes: memes.dislikes,
        comments: memes.comments,
      })
      .from(memes)
      .execute();

    // If there's a userId, fetch the user's votes
    let userVotes: { memeId: number; isLike: boolean }[] = [];
    if (userId) {
      userVotes = await db
        .select({
          memeId: votes.memeId,
          isLike: votes.isLike,
        })
        .from(votes)
        .where(eq(votes.userId, userId))
        .execute();
    }

    // Create Maps for O(1) lookup of user's votes
    const userLikes = new Set(
      userVotes.filter((vote) => vote.isLike).map((vote) => vote.memeId),
    );
    const userDislikes = new Set(
      userVotes.filter((vote) => !vote.isLike).map((vote) => vote.memeId),
    );

    // Map the Drizzle meme objects to the expected format
    const formattedMemes = memeList.map((meme) => ({
      id: Number(meme.id),
      imageUrl: meme.imageUrl,
      title: meme.title,
      author: meme.authorId, // Assuming you store authorId in the meme table
      likes: meme.likes || 0, // Provide a default value if likes is nullable
      dislikes: meme.dislikes || 0, // Provide a default value if dislikes is nullable
      comments: meme.comments || 0, // Provide a default value if comments is nullable
      hasLiked: userLikes.has(Number(meme.id)),
      hasDisliked: userDislikes.has(Number(meme.id)),
    }));

    console.log("Formatted memes being returned:", formattedMemes);
    return formattedMemes;
  } catch (error) {
    console.error("Error fetching memes from database:", error);
    return []; // Return an empty array in case of an error
  }
}

async function createMemeInDatabase(
  imageUrl: string,
  title: string,
  description: string,
  authorId: string,
) {
  try {
    // Use Drizzle to insert the new meme into the database
    const newMeme = await db
      .insert(memes)
      .values({
        id: sql`nextval('memehub_post_id_seq')`,
        imageUrl,
        title,
        description,
        authorId,
      })
      .returning();

    if (newMeme.length === 0) {
      throw new Error("Failed to create meme in database.");
    }

    // Map the Drizzle meme object to the expected format
    const formattedMeme = {
      id: newMeme[0]!.id,
      imageUrl: newMeme[0]!.imageUrl,
      title: newMeme[0]!.title,
      author: newMeme[0]!.authorId,
      likes: newMeme[0]!.likes || 0,
      dislikes: newMeme[0]!.dislikes || 0,
      comments: newMeme[0]!.comments || 0,
      hasLiked: false,
      hasDisliked: false,
    };

    return formattedMeme;
  } catch (error) {
    console.error("Error creating meme in database:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const memes = await getMemesFromDatabase(userId || undefined);
  return NextResponse.json(memes);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    console.log("User ID from getAuth:", userId);

    if (!userId) {
      console.log("Unauthorized: User ID is null or undefined");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageUrl, title, description } = await request.json();
    const newMeme = await createMemeInDatabase(
      imageUrl,
      title,
      description,
      userId,
    );
    return NextResponse.json(newMeme, { status: 201 });
  } catch (error: any) {
    console.error("Error creating meme:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
