"use client";
import React from "react";
import useSpotifyPlayer from "./useSpotifyPlayer";

type Props = {
  token: string | undefined;
};

export default function SpotifyPlayer({ token }: Props) {
  const {
    deviceId,
    player,
    online,
    errorMessage,
    defaultVolume,
    playbackState,
  } = useSpotifyPlayer(token);
  console.log(errorMessage, playbackState, deviceId, online);
  return (
    <div className="bg-blue-100 p-4">
      <div className="main-wrapper">
        <img
          src={playbackState?.track_window.current_track.album.images[0].url}
          className="now-playing__cover"
          alt=""
        />

        <div className="now-playing__side">
          <div className="now-playing__name">
            {playbackState?.track_window.current_track?.name}
          </div>

          <div className="now-playing__artist">
            {playbackState?.track_window.current_track?.artists[0]?.name}
          </div>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        defaultValue={defaultVolume}
        onChange={(e) => player?.setVolume(Number(e.target.value))}
      />

      <button
        className="border p-2 rounded-full"
        onClick={() => {
          player?.previousTrack();
        }}
      >
        Previous
      </button>

      <button
        className="border p-2 rounded-full"
        onClick={() => {
          player?.togglePlay();
        }}
      >
        {playbackState?.paused ? "PLAY" : "PAUSE"}
      </button>

      <button
        className="border p-2 rounded-full"
        onClick={() => {
          player?.nextTrack();
        }}
      >
        Next
      </button>
    </div>
  );
}
