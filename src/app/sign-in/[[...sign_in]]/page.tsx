"use client";

import { SignIn } from "@clerk/nextjs";
import { Header } from "~/components/Header";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">Sign In</h1>
          </div>
          <SignIn routing="path" path="/sign-in" />
        </div>
      </main>
    </div>
  );
}
