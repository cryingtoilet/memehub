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
      <DialogContent className="overflow-hidden rounded-xl sm:max-w-[95%] md:max-w-[800px]">
        <DialogHeader className="px-6 pb-2 pt-4">
          <DialogTitle className="text-lg font-semibold">
            {meme.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col rounded-b-xl bg-neutral-900 md:flex-row">
          <div className="w-full p-4 md:w-1/2">
            <div
              className="relative overflow-hidden rounded-md"
              style={{ height: "300px" }}
            >
              {meme.imageUrl && (
                <Image
                  src={meme.imageUrl}
                  alt={meme.title}
                  fill
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Posted by {meme.author}
              </p>
              <div className="mt-2 flex items-center justify-between text-muted-foreground">
                <button className="flex items-center transition-colors hover:text-primary">
                  <Heart className="mr-1 h-5 w-5" />
                  {meme.likes}
                </button>
                <button className="flex items-center transition-colors hover:text-primary">
                  <MessageCircle className="mr-1 h-5 w-5" />
                  {meme.comments}
                </button>
                <button className="flex items-center transition-colors hover:text-primary">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-neutral-800 p-4 md:w-1/2 md:border-l md:border-t-0">
            <div className="h-[300px] overflow-y-auto md:h-[400px]">
              <CommentSection memeId={meme.id} key={commentSectionKey} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
