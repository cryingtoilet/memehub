"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import React from "react";

interface Comment {
  id: number;
  memeId: number;
  userId: string | null;
  text: string;
  createdAt: Date;
}

interface CommentSectionProps {
  memeId: number;
}

export function CommentSection({ memeId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const { userId } = useAuth();
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?memeId=${memeId}`);
      if (response.ok) {
        const commentList = await response.json();
        // Parse createdAt string to Date object
        const parsedComments = commentList.map((comment: any) => ({
          ...comment,
          createdAt: comment.createdAt ? new Date(comment.createdAt) : null,
        }));
        setComments(parsedComments);
      } else {
        console.error("Error fetching comments:", response.status);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    setKey((prevKey) => prevKey + 1);

    const intervalId = setInterval(fetchComments, 5000); // Refresh every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [memeId]);

  const handleAddComment = async () => {
    if (!userId) {
      alert("You must be signed in to comment.");
      return;
    }

    if (!newCommentText.trim()) {
      return; // Prevent adding empty comments
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memeId: memeId,
          text: newCommentText,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        // Parse createdAt string to Date object
        const parsedComment = {
          ...newComment,
          createdAt: newComment.createdAt
            ? new Date(newComment.createdAt)
            : null,
        };
        await setComments((prevComments) => [...prevComments, parsedComment]);
        setNewCommentText(""); // Clear the input field

        // Refresh comments after a short delay
        setTimeout(fetchComments, 1000); // Refresh after 1 second
      } else {
        console.error("Error adding comment:", response.status);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-white/90">Comments</h3>
      {loading ? (
        <p className="text-sm text-white/75">Loading comments...</p>
      ) : (
        comments.map((comment, index) => {
          console.log("Individual comment object:", comment);
          return (
            <React.Fragment key={index}>
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://avatars.dicebear.com/api/pixel-art/${comment.userId}.svg`}
                  />
                  <AvatarFallback>
                    {comment.userId
                      ? comment.userId.substring(0, 2).toUpperCase()
                      : "N/A"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/90">
                    {comment.userId}
                  </p>
                  <p className="overflow-wrap break-words text-sm text-white/75">
                    {comment.text}
                  </p>
                  <p className="text-xs text-white/50">
                    {comment.createdAt
                      ? comment.createdAt.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })
      )}
      <div className="flex space-x-3">
        <Input
          type="text"
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddComment}>Post</Button>
      </div>
    </div>
  );
}
