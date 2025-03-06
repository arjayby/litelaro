import { NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

// Will redirect to /classrooms if user is logged in
const publicRoutes = ["/", "/login", "/sign-up"];

// Add all private routes here
const privateRoutes = [
  "/classrooms",
  "/quizzes",
  "/complete-profile",
  "/profile",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (user) {
    const nextUrl = request.nextUrl.searchParams.get("next");

    const isUserProfileCompleted = !!user.user_metadata.is_profile_completed;

    // If no profile and not on complete-profile page, redirect to complete profile
    if (!isUserProfileCompleted && pathname !== "/complete-profile") {
      return NextResponse.redirect(new URL("/complete-profile", request.url));
    }

    // If has profile and trying to access complete-profile, redirect to dashboard
    if (isUserProfileCompleted && pathname === "/complete-profile") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Handle authenticated users on public routes
    if (publicRoutes.includes(pathname)) {
      const redirectUrl = nextUrl || privateRoutes[0];
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  // Handle unauthenticated users on private routes
  if (!user && privateRoutes.includes(pathname)) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/login") {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
