"use client";

import { useState } from "react";
import { Header } from "~/components/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import type { OurFileRouter } from "../api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import type React from "react"; // Added import for React
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "~/components/UploadDropzone";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be signed in to upload a meme.");
      return;
    }

    try {
      const response = await fetch("/api/memes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          title,
          description,
          authorId: user?.firstName + " " + user?.lastName, // Use Clerk's userId
        }),
      });

      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log("Meme uploaded successfully!", responseData);
          alert("Meme uploaded successfully!");
          router.push("/"); // Redirect to homepage
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          alert(
            "Meme uploaded successfully, but there was an issue processing the server response.",
          );
          router.push("/");
        }
      } else {
        try {
          const errorData = await response.json();
          alert(`Error uploading meme: ${errorData.error || "Unknown error"}`);
        } catch (parseError) {
          console.error("Error parsing JSON error response:", parseError);
          alert(
            "Error uploading meme, and there was an issue processing the server error response.",
          );
        }
      }
    } catch (error: any) {
      console.error("Error uploading meme:", error);
      alert(`Error uploading meme: ${error.message}`);
    }
  };

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
                Upload your meme
              </h1>
              <p className="text-sm text-white/50">
                Share your favorite memes with the community
              </p>
            </div>

            {/* Upload Section */}
            <div className="rounded-lg bg-white/5 p-6">
              <UploadDropzone />
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white/75"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Give your meme a catchy title"
                  className="w-full rounded-lg bg-white/5 px-4 py-3 text-base text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white/75"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Add some context to your meme"
                  className="w-full rounded-lg bg-white/5 px-4 py-3 text-base text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/75">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Funny",
                    "Cats",
                    "Dogs",
                    "Programming",
                    "Gaming",
                    "Memes",
                    "Trending",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/75 transition-all hover:bg-white/10 hover:text-orange-500"
                    >
                      {tag}
                    </button>
                  ))}
                  <button className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/75 transition-all hover:bg-white/10 hover:text-orange-500">
                    + Add Tag
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <button className="rounded-lg bg-white/5 px-6 py-3 font-medium text-white/75 transition-all hover:bg-white/10">
                Cancel
              </button>
              <button className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-400">
                Upload Meme
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
