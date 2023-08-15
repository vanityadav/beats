import { NextResponse } from "next/server";
import { CookieKeys } from "@/server/getCookies";
import { AccessToken } from "@spotify/web-api-ts-sdk";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const auth: string = Buffer.from(
      process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
    ).toString("base64");

    const getToken = async () => {
      const res = await fetch(process.env.SPOTIFY_AUTH_API + "api/token", {
        method: "POST",
        headers: {
          Authorization: "Basic " + auth,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.SPOTIFY_LOGIN_CALLBACK_URL}`,
      });

      if (!res.ok) throw new Error("Spotify Server Error");

      return (await res.json()) as AccessToken;
    };

    const token = await getToken();

    const url = new URL("/search", process.env.APP_BASE_URL);

    const response = NextResponse.redirect(url);

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
  } else return NextResponse.json("Bad Request");
}
