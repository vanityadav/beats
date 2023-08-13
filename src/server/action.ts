"use server";

import { cookies } from "next/headers";

export async function search(query: string) {
  const token = cookies().get("access_token")?.value;

  const res = await fetch(
    process.env.SPOTIFY_BASE_API +
      "search?" +
      new URLSearchParams({
        q: query,
        type: "track",
      }),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return await res.json();
}
export async function addToQueue(uri: string) {
  const token = cookies().get("access_token")?.value;

  const res = await fetch(
    process.env.SPOTIFY_BASE_API +
      "me/player/queue?" +
      new URLSearchParams({
        uri: uri,
      }),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return await res.json();
}
