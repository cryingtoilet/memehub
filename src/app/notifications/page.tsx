"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Header } from "~/components/Header";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { BellDot } from "lucide-react";
import { cn } from "~/lib/utils";

// Notification type (adjust to match your database schema)
interface Notification {
  id: string;
  type: "like" | "comment" | "follow";
  senderName: string;
  senderImageUrl: string;
  memeText?: string; // For like/comment notifications
  createdAt: Date;
  read: boolean;
}

export default function NotificationsPage() {
  const { userId } = useAuth();
  const { user, isLoaded } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) {
      redirect("/sign-in");
    }

    // Fetch notifications from the database
    async function fetchNotifications() {
      try {
        // Replace with your actual database query
        const response = await fetch(`/api/notifications?userId=${userId}`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    }

    fetchNotifications();
  }, [userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="group relative overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/90" />
          <div className="relative space-y-6 p-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-medium text-white/90">
                Notifications
              </h1>
              <p className="text-sm text-white/50">
                Stay updated with your meme activity
              </p>
            </div>

            {/* Notifications List */}
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
                >
                  <div className="flex justify-between">
                    <p className="text-white/90">{notification.message}</p>
                    <span className="text-sm text-white/50">
                      {notification.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {notifications.length === 0 && (
              <div className="rounded-lg bg-white/5 p-6 text-center text-white/75">
                No new notifications
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
