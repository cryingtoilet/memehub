import Image from "next/image"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface MemeCardProps {
  imageUrl: string
  title: string
  author: string
  likes: number
  comments: number
  onClick: () => void
}

export function MemeCard({ imageUrl, title, author, likes, comments, onClick }: MemeCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="cursor-pointer" onClick={onClick}>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={400}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3
          className="text-card-foreground font-semibold text-lg mb-2 hover:text-primary cursor-pointer"
          onClick={onClick}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">Posted by {author}</p>
        <div className="flex justify-between items-center">
          <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5 mr-1" />
            {likes}
          </button>
          <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-5 h-5 mr-1" />
            {comments}
          </button>
          <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

