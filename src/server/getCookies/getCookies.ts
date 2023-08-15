"use server";

import { cookies } from "next/headers";
import { AccessToken } from "@spotify/web-api-ts-sdk";

export type CookieKeys = "deviceId" | "spotify_token";

function getCookies() {
  const newCookies = (key: CookieKeys) =>
    cookies().get(key as CookieKeys)?.value;

  const tokenData = newCookies("spotify_token");

  const cookieAccessToken = tokenData
    ? (JSON.parse(tokenData) as AccessToken)
    : null;

  const cookieToken = cookieAccessToken?.access_token;

  const cookieDeviceId = newCookies("deviceId");

  return { cookieAccessToken, cookieToken, cookieDeviceId, newCookies };
}

export default getCookies;
