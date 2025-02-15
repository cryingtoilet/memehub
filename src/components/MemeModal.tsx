import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { CommentSection } from "./CommentSection";
import { useId } from "react";

interface MemeModalProps {
  meme: {
    id: number;
    imageUrl: string;
    title: string;
    author: string;
    likes: number;
    comments: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemeModal({ meme, isOpen, onClose }: MemeModalProps) {
  if (!meme) return null;

  const commentSectionKey = useId();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{meme.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex">
          <div className="w-1/2 pr-4">
            <Image
              src={meme.imageUrl || "/placeholder.svg"}
              alt={meme.title}
              width={400}
              height={400}
              className="h-auto w-full rounded-md"
            />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Posted by {meme.author}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <button className="flex items-center text-muted-foreground transition-colors hover:text-primary">
                  <Heart className="mr-1 h-5 w-5" />
                  {meme.likes}
                </button>
                <button className="flex items-center text-muted-foreground transition-colors hover:text-primary">
                  <MessageCircle className="mr-1 h-5 w-5" />
                  {meme.comments}
                </button>
                <button className="flex items-center text-muted-foreground transition-colors hover:text-primary">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div className="h-[400px] overflow-y-auto">
              <CommentSection memeId={meme.id} key={commentSectionKey} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
