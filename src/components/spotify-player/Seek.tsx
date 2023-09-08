import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Slider } from "../ui/slider";
import { SketchLogoIcon } from "@radix-ui/react-icons";

type Props = {
  player: Spotify.Player | null;
  playbackState: Spotify.PlaybackState | null;
};

export default function Seek({ player, playbackState }: Props) {
  const getTime = useCallback((duration: number | undefined) => {
    if (duration) {
      return new Date(duration).toISOString().substring(14, 19);
    }
    return "0:0";
  }, []);

  const [seekPosition, setSeekPosition] = useState(
    playbackState?.position || 0
  );
  const [seekTime, setSeekTime] = useState(getTime(playbackState?.position));

  const totalDuration = useMemo(
    () => getTime(playbackState?.track_window.current_track.duration_ms),
    [playbackState?.track_window.current_track.duration_ms, getTime]
  );

  useEffect(() => {
    let seek: NodeJS.Timeout | undefined;
    console.log("playback state called");
    if (!playbackState?.paused)
      seek = setInterval(() => {
        setSeekPosition((prev) => prev + 1000);
      }, 1000);

    if (playbackState?.paused) {
      clearInterval(seek);
    }

    return () => clearInterval(seek);
  }, [playbackState]);

  useEffect(() => {
    console.log("timer changed");
    setSeekTime(getTime(seekPosition));
  }, [seekPosition, getTime]);

  return (
    <div>
      <p>{seekTime}</p>
      <Slider
        defaultValue={[playbackState?.duration || 0]}
        max={playbackState?.track_window.current_track.duration_ms}
        min={0}
        value={[seekPosition]}
        className="w-[400px]"
        onValueCommit={(value) => {
          setSeekPosition(value.at(0) as number);
          player?.seek(value.at(0) as number);
        }}
      />
      <p>{totalDuration}</p>
    </div>
  );
}
