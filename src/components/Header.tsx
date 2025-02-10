import Link from "next/link"
import { Home, Search, Upload, Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b border-border/40">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">MemeHub</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-6">
          <Link href="/" className="text-foreground/60 hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <Link href="/search" className="text-foreground/60 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/upload" className="text-foreground/60 hover:text-primary transition-colors">
            <Upload className="w-5 h-5" />
          </Link>
          <Link href="/notifications" className="text-foreground/60 hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
          </Link>
          <Link href="/profile" className="text-foreground/60 hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

