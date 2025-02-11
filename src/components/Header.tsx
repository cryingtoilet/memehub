import Link from "next/link";
import { Home, Search, Upload, Bell, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2"></Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-foreground/60 transition-colors hover:text-primary"
          >
            <Home className="h-5 w-5" />
          </Link>
          <Link
            href="/search"
            className="flex items-center text-foreground/60 transition-colors hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/upload"
            className="flex items-center text-foreground/60 transition-colors hover:text-primary"
          >
            <Upload className="h-5 w-5" />
          </Link>
          <Link
            href="/notifications"
            className="flex items-center text-foreground/60 transition-colors hover:text-primary"
          >
            <Bell className="h-5 w-5" />
          </Link>
          <Link
            href="/profile"
            className="flex items-center text-foreground/60 transition-colors hover:text-primary"
          >
            <User className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
