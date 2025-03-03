import { NextResponse } from "next/server";

import { updateSession } from "@/lib/utils/supabase/middleware";
import { createClientServer } from "@/lib/utils/supabase/server";

import type { NextRequest } from "next/server";
// Will redirect to /dashboard if user is logged in
const publicRoutes = ["/", "/login", "/sign-up"];

// Add all private routes here
const privateRoutes = ["/dashboard", "/complete-profile"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const nextUrl = req.nextUrl.searchParams.get("next");

  const response = await updateSession(req);

  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const isUserProfileCompleted = !!user.user_metadata.is_profile_completed;

    // If no profile and not on complete-profile page, redirect to complete profile
    if (!isUserProfileCompleted && pathname !== "/complete-profile") {
      return NextResponse.redirect(new URL("/complete-profile", req.url));
    }

    // If has profile and trying to access complete-profile, redirect to dashboard
    if (isUserProfileCompleted && pathname === "/complete-profile") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    // Handle authenticated users on public routes
    if (publicRoutes.includes(pathname)) {
      const redirectUrl = nextUrl || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }

  // Handle unauthenticated users on private routes
  if (!user && privateRoutes.includes(pathname)) {
    const loginUrl = new URL("/login", req.url);
    if (pathname !== "/login") {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
