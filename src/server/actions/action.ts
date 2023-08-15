"use server";

import { cookies } from "next/headers";
import { spotifyAPI } from "@/server/spotify";
import { CookieKeys, getCookies } from "../getCookies";

const { cookieDeviceId } = getCookies();

export async function search(query: string) {
  return await spotifyAPI?.search(query, ["track"]);
}

export async function addToQueue(uri: string) {
  if (cookieDeviceId) {
    spotifyAPI?.player.startResumePlayback(cookieDeviceId, undefined, [uri]);
  }
}

export async function getGenre() {
  const res = await spotifyAPI?.playlists.getUsersPlaylists("	vanityadav08");
  const res2 = await spotifyAPI?.recommendations.genreSeeds();
  console.log(res);
  return res;
}

export async function setDeviceIdServer(deviceId: string) {
  cookies().set({
    name: "deviceId" as CookieKeys,
    value: deviceId,
    httpOnly: true,
    path: "/",
    sameSite: true,
    secure: true,
  });
}
