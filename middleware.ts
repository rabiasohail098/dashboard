import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { sessionClaims } = await auth();
  const user = sessionClaims?.user as { publicMetadata?: { role?: string } };

  if (isDashboardRoute(request)) {
    const authObject = await auth();

    // 🔥 Check if user is admin
    const userRole = user?.publicMetadata?.role || "user"; // Default 'user'
    if (userRole !== "admin") {
      return Response.redirect(new URL("/unauthorized", request.url));
    }
  }
});

export const config = {
  matcher: ["/dashboard(.*)"], // Only apply middleware to dashboard-related routes
};