"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Header } from "~/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MemeGrid } from "~/components/MemeGrid";
import { useEffect, useState } from "react";
import { UserResource } from "@clerk/types";
import Image from "next/image";

export default function ProfilePage() {
  const { userId } = useAuth();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!userId) {
      redirect("/sign-in");
    }
  }, [userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Example user data (replace with your actual data fetching)
  const userProfile = {
    username: user?.fullName,
    bio: "Avid meme lover above.",
    profileImageUrl: user?.imageUrl, // Replace with actual URL
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="group relative overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/90" />
          <div className="relative space-y-6 p-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-6">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-orange-500">
                <Image
                  src={userProfile.profileImageUrl || "/default-profile.jpg"}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium text-white/90">
                  {userProfile.username}
                </h1>
                <p className="text-sm text-white/50">{userProfile.bio}</p>
              </div>
            </div>

            {/* My Memes Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-white/90">My Memes</h2>
              <MemeGrid userId={userId} /> {/* Pass userId to MemeGrid */}
              {/* Add "Load More" button or pagination here if needed */}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
