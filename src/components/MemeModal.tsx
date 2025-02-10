import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import Image from "next/image"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface MemeModalProps {
  meme: {
    imageUrl: string
    title: string
    author: string
    likes: number
    comments: number
  } | null
  isOpen: boolean
  onClose: () => void
}

export function MemeModal({ meme, isOpen, onClose }: MemeModalProps) {
  if (!meme) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{meme.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Image
            src={meme.imageUrl || "/placeholder.svg"}
            alt={meme.title}
            width={400}
            height={400}
            className="w-full h-auto rounded-md"
          />
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Posted by {meme.author}</p>
            <div className="flex justify-between items-center mt-2">
              <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-5 h-5 mr-1" />
                {meme.likes}
              </button>
              <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5 mr-1" />
                {meme.comments}
              </button>
              <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

