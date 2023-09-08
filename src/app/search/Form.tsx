"use client";

import { useState } from "react";
import { addToQueue, search } from "@/server/actions";
import { SearchResults, Track } from "@spotify/web-api-ts-sdk";

import { useRouter, useSearchParams } from "next/navigation";

export default function Form() {
  const [data, setData] = useState<SearchResults>();
  const [track, setTrack] = useState<Track>();
  const router = useRouter();

  async function handleSearch(formData: FormData) {
    const query = formData.get("query") as string;
    router.push(`search/?q=${query}`);
    const res = await search(query);
    if (res) setData(res);
  }

  return (
    <div>
      <form action={handleSearch}>
        <input type="search" className="outline" name="query" />
      </form>

      {data && (
        <div>
          {data.tracks.items.map((ele) => (
            <div
              key={ele.id}
              onClick={() => {
                setTrack(ele);
                addToQueue(ele.uri);
              }}
            >
              <p>{ele.name}</p>
              <p>{ele.artists[0].name}</p>
              <img src={ele.album.images[2].url} alt="cover" />
              {/* <audio controls src={ele.preview_url} />s */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
