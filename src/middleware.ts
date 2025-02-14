import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((req) => {
  // Handle requests before authentication
  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
