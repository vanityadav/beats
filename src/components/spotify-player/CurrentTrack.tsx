"use client";

import Image from "next/image";

type Props = { track: Spotify.Track | undefined };

export default function CurrentTrack({ track }: Props) {
  // console.log(track);
  function smAlbumImage(track: Spotify.Track) {
    let smImage = track.album.images[0];
    for (let image of track.album.images) {
      if (smImage.height && image.height)
        if (smImage.height > image.height) smImage = image;
    }
    return smImage;
  }

  if (track)
    return (
      <div className="main-wrapper">
        <Image
          src={smAlbumImage(track).url}
          width={smAlbumImage(track).width as number}
          height={smAlbumImage(track).height as number}
          className="now-playing__cover"
          alt=""
        />

        <div className="now-playing__side">
          <div className="now-playing__name">{track?.name}</div>

          <div className="now-playing__artist">{track?.artists[0]?.name}</div>
        </div>
      </div>
    );
}
