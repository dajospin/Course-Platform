import { auth } from "@/app/lib/auth/server";

export default auth.middleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: [
    /* Protect authenticated routes — add more paths here as needed */
    "/account/:path*",
  ],
};
