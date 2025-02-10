import { useState } from "react"
import { MemeCard } from "./MemeCard"
import { MemeModal } from "./MemeModal"

const memes = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Funny Cat Meme",
    author: "CatLover",
    likes: 1234,
    comments: 56,
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Programming Joke",
    author: "CodeNinja",
    likes: 987,
    comments: 43,
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Movie Reference",
    author: "FilmBuff",
    likes: 2345,
    comments: 78,
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Relatable Moment",
    author: "EverydayHero",
    likes: 5678,
    comments: 123,
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Unexpected Plot Twist",
    author: "StoryTeller",
    likes: 3456,
    comments: 89,
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=400&width=400",
    title: "Office Humor",
    author: "CorporateComic",
    likes: 7890,
    comments: 234,
  },
]

export function MemeGrid() {
  const [selectedMeme, setSelectedMeme] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <MemeCard key={meme.id} {...meme} onClick={() => setSelectedMeme(meme)} />
        ))}
      </div>
      <MemeModal meme={selectedMeme} isOpen={!!selectedMeme} onClose={() => setSelectedMeme(null)} />
    </>
  )
}

