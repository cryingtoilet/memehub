"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // This page should only be accessed as a callback from the SSO flow.
    // After the SSO flow is complete, redirect the user to a more appropriate page.
    router.push("/"); // Or any other page you want to redirect to.
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-lg text-primary">Completing SSO Sign In...</p>
    </div>
  );
}
