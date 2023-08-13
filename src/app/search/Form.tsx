"use client";

import { useState } from "react";
import { addToQueue, search } from "@/server/action";
import WebPlayer from "@/components/WebPlayer";

export default function Form({ token }) {
  const [data, setData] = useState<any>();
  const [track, setTrack] = useState<any>();

  async function handleSearch(formData: FormData) {
    const query = formData.get("query") as string;
    const res = await search(query);
    if (res) setData(res);
  }

  return (
    <div>
      <form action={handleSearch}>
        <input type="search" className="outline" name="query" />
      </form>

      <WebPlayer token={token} />

      {data && (
        <div>
          {data.tracks.items.map((ele: any) => (
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
