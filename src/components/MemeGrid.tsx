"use client";

import { useState, useEffect } from "react";
import { MemeCard } from "./MemeCard";
import { MemeModal } from "./MemeModal";

// Define the Meme type (adjust to match your database schema)
interface Meme {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  likes: number;
  dislikes: number;
  comments: number;
  hasLiked: boolean;
  hasDisliked: boolean;
}

export function MemeGrid() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMemes() {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/memes");
        const data = await response.json();
        console.log("Memes data from API:", data);
        setMemes(data);
      } catch (error) {
        console.error("Error fetching memes:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    }

    fetchMemes();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
        {memes.map((meme) => (
          <MemeCard
            key={meme.id}
            {...meme}
            hasLiked={meme.hasLiked}
            hasDisliked={meme.hasDisliked}
            onClick={() => setSelectedMeme(meme.id)}
          />
        ))}
      </div>
      <MemeModal
        meme={
          selectedMeme
            ? memes.find((meme) => meme.id === selectedMeme) || null
            : null
        }
        isOpen={!!selectedMeme}
        onClose={() => setSelectedMeme(null)}
      />
    </>
  );
}
