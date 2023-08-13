import { Token } from "../types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const cookieStore = cookies();
  const cookieToken = cookieStore.get("access_token");

  if (cookieToken) return NextResponse.json("loggedIn");

  if (!cookieToken) {
    const getToken = async () => {
      const res = await fetch(process.env.SPOTIFY_AUTH_API + "api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
      });

      if (!res.ok) throw new Error("Spotify Server Error");

      return (await res.json()) as Token;
    };

    const token = await getToken();

    const response = NextResponse.json("success", { status: 200 });

    response.cookies.set({
      name: "access_token",
      value: token.access_token,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      maxAge: token.expires_in,
    });

    return response;
  }
}
