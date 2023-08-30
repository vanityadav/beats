import Image from "next/image";

type Props = { track: Spotify.Track | undefined };

export default function CurrentTrack({ track }: Props) {
  if (track)
    return (
      <div className="main-wrapper">
        <Image
          src={track?.album.images[2].url}
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
