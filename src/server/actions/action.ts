"use server";

import { cookies } from "next/headers";
import { spotifyAPI } from "@/server/spotify";
import { CookieKeys, getDeviceId } from "../getCookies";

export async function search(query: string) {
  return await spotifyAPI?.search(query, ["track"]);
}

export async function addToQueue(uri: string) {
  const deviceId = getDeviceId();
  if (deviceId) {
    spotifyAPI?.player.startResumePlayback(deviceId, undefined, [uri]);
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
    sameSite: true,
    secure: true,
    path: "/",
  });
}
