import { NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import type { NextRequest } from "next/server";

// Will redirect to /dashboard if user is logged in
const publicRoutes = ["/", "/login", "/sign-up"];

// Add all public routes here
const publicPages = [
  "/terms-of-service",
  "/privacy-policy",
  "/data-deletion",
  ...publicRoutes,
];

// Add all private routes here
const validRoutes = [...publicPages, "/dashboard", "/complete-profile", "/404"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const nextUrl = req.nextUrl.searchParams.get("next");

  // Handle 404 before authentication check
  if (
    !validRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Handle authenticated users on public routes
  if (session && publicRoutes.includes(pathname)) {
    const redirectUrl =
      nextUrl && validRoutes.includes(nextUrl) ? nextUrl : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Handle unauthenticated users on private routes
  if (!session && !publicPages.includes(pathname) && pathname !== "/404") {
    const loginUrl = new URL("/login", req.url);
    if (pathname !== "/login") {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - .svg files
     */
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.svg$).*)",
  ],
};
