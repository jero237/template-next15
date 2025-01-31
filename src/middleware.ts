import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { pages } from "./lib/pages";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isAuthPage =
    request.nextUrl.pathname.includes(pages.auth.signIn) ||
    request.nextUrl.pathname.includes(pages.auth.signUp);

  if (!session && !isAuthPage) {
    const signInUrl = new URL(pages.auth.signIn, request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(
      new URL(pages.dashboard.apps.href, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/signup", "/signin", "/create-app"],
};
