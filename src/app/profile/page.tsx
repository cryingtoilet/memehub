import { Header } from "../../components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { MemeGrid } from "../../components/MemeGrid"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold text-primary">@username</h1>
            <p className="text-muted-foreground">Meme enthusiast | Joined 2023</p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">My Memes</h2>
        <MemeGrid />
      </main>
    </div>
  )
}

