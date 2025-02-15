"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

interface MemeCardProps {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  likes: number;
  dislikes: number;
  comments: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
  onClick?: () => void;
}

export function MemeCard({
  id,
  imageUrl,
  title,
  author,
  likes,
  dislikes,
  comments,
  hasLiked: initialHasLiked = false,
  hasDisliked: initialHasDisliked = false,
  onClick,
}: MemeCardProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const { userId } = useAuth();
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [hasDisliked, setHasDisliked] = useState(initialHasDisliked);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    async function fetchUserVotes() {
      if (userId) {
        try {
          const response = await fetch(`/api/likes?memeId=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setHasLiked(data.hasLiked);
            setHasDisliked(data.hasDisliked);
          } else {
            console.error("Error fetching user votes:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user votes:", error);
        }
      }
    }

    fetchUserVotes();
  }, [userId, id]);

  const handleVote = async (isLike: boolean) => {
    if (!userId) {
      alert("You must be signed in to vote.");
      return;
    }

    setIsVoting(true);
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memeId: parseInt(id),
          isLike,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        switch (data.action) {
          case "liked":
            setLikeCount((prev) => prev + 1);
            setHasLiked(true);
            if (hasDisliked) {
              setDislikeCount((prev) => prev - 1);
              setHasDisliked(false);
            }
            break;
          case "unliked":
            setLikeCount((prev) => prev - 1);
            setHasLiked(false);
            break;
          case "disliked":
            setDislikeCount((prev) => prev + 1);
            setHasDisliked(true);
            if (hasLiked) {
              setLikeCount((prev) => prev - 1);
              setHasLiked(false);
            }
            break;
          case "undisliked":
            setDislikeCount((prev) => prev - 1);
            setHasDisliked(false);
            break;
        }
      } else {
        const errorData = await response.json();
        alert(`Error voting: ${errorData.error || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error voting:", error);
      alert(`Error voting: ${error.message}`);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-neutral-900/70">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/90" />
      <div className="relative aspect-[4/3] w-full">
        {onClick ? (
          <div className="absolute inset-0 cursor-pointer" onClick={onClick}>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all group-hover:brightness-110"
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
      <div className="relative space-y-3 p-4">
        <button
          className="block text-lg font-medium text-white/90 transition-colors hover:text-orange-500"
          onClick={onClick}
        >
          {title}
        </button>
        <p className="text-sm font-medium text-white/50">Posted by {author}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-4">
            <button
              className={`group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm transition-all hover:bg-white/10 ${
                hasLiked ? "text-orange-500" : "text-white/75"
              } ${isVoting ? "opacity-50" : ""}`}
              onClick={() => handleVote(true)}
              disabled={isVoting}
            >
              <ThumbsUp
                className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                  hasLiked ? "fill-orange-500" : ""
                }`}
              />
              <span className="font-medium">{likeCount}</span>
            </button>
            <button
              className={`group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm transition-all hover:bg-white/10 ${
                hasDisliked ? "text-orange-500" : "text-white/75"
              } ${isVoting ? "opacity-50" : ""}`}
              onClick={() => handleVote(false)}
              disabled={isVoting}
            >
              <ThumbsDown
                className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                  hasDisliked ? "fill-orange-500" : ""
                }`}
              />
              <span className="font-medium">{dislikeCount}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/75 transition-all hover:bg-white/10">
              <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="font-medium">{comments}</span>
            </button>
            <button className="flex items-center rounded-lg bg-white/5 px-3 py-1.5 text-white/75 transition-all hover:bg-white/10">
              <Share2 className="h-4 w-4 transition-transform hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
