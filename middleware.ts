import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = req.nextUrl.pathname;
  const publicRoutes = ["/", "/signup"];
  const protectedRoutes = ["/user", "/user/posts", "/user/posts/create"];
  const isPublic = publicRoutes.includes(pathname);
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
  if (isPublic && user) {
    return NextResponse.redirect(new URL("/user", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/", "/signup", "/user/:path*"],
};
