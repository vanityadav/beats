"use server";

import { cookies } from "next/headers";
import { AccessToken } from "@spotify/web-api-ts-sdk";

export type CookieKeys = "deviceId" | "spotify_token";

function browserCookies(key: CookieKeys) {
  return cookies().get(key as CookieKeys)?.value;
}

function getSpotifyToken() {
  return JSON.parse(
    browserCookies("spotify_token") || "null"
  ) as AccessToken | null;
}

function getSpotifyAccessToken() {
  return getSpotifyToken()?.access_token;
}

function getDeviceId() {
  return browserCookies("deviceId");
}

export { browserCookies, getSpotifyToken, getSpotifyAccessToken, getDeviceId };
