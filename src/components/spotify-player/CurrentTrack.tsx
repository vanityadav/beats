type Props = { track: Spotify.Track | undefined };

export default function CurrentTrack({ track }: Props) {
  return (
    <div className="main-wrapper">
      <img
        src={track?.album.images[0].url}
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
