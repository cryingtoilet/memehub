import { NextResponse } from "next/server";

// Adjust this to match your database connection and query logic
async function getNotificationsFromDatabase(userId: string) {
  try {
    // Replace with your actual database connection and query
    // Example using Prisma:
    // const notifications = await prisma.notification.findMany({
    //   where: {
    //     userId: userId,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    // Placeholder for database query result
    const notifications = [
      // Example notification object (adjust to match your database schema)
      // {
      //   id: "1",
      //   type: "like",
      //   senderName: "MemeLord42",
      //   senderImageUrl: "https://avatar.example.com/memelord42.png",
      //   memeText: "Just saw your meme, hilarious!",
      //   createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      //   read: false,
      // },
    ];

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications from database:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 },
    );
  }

  const notifications = await getNotificationsFromDatabase(userId);
  return NextResponse.json(notifications);
}
