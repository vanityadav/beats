import { NextResponse } from "next/server";
import { AccessToken } from "@spotify/web-api-ts-sdk";
import { CookieKeys, getCookies } from "@/server/getCookies";

export const revalidate = 0;

export async function GET() {
  const { cookieToken } = getCookies();

  if (cookieToken) return NextResponse.json("loggedIn");
  else {
    const getToken = async () => {
      const res = await fetch(process.env.SPOTIFY_AUTH_API + "api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
      });

      if (!res.ok) throw new Error("Spotify Server Error");

      return (await res.json()) as AccessToken;
    };

    const token = await getToken();

    const response = NextResponse.json("success", { status: 200 });

    response.cookies.set({
      name: "spotify_token" as CookieKeys,
      value: JSON.stringify(token),
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      maxAge: token.expires_in,
    });

    return response;
  }
}
