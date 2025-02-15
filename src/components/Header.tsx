"use client";

import Link from "next/link";
import { Home, Search, Upload, Bell, User } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="pl-1 text-xl font-bold text-primary">MemeHub</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
          >
            <Home className="h-5 w-5" />
          </Link>
          <Link
            href="/search"
            className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/upload"
            className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
          >
            <Upload className="h-5 w-5" />
          </Link>
          <Link
            href="/notifications"
            className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
          >
            <Bell className="h-5 w-5" />
          </Link>
          <Link
            href="/profile"
            className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
          >
            <User className="h-5 w-5" />
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute right-0 top-16 w-full rounded-md bg-background/95 shadow-md backdrop-blur md:hidden">
            <nav className="flex flex-col items-center space-y-4 p-4">
              <Link
                href="/"
                className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/search"
                className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
              <Link
                href="/upload"
                className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
              >
                <Upload className="h-5 w-5" />
                <span>Upload</span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center text-foreground/60 transition-colors hover:scale-110 hover:text-primary"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
