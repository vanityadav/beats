"use client";

import React from "react";
import useSpotifyPlayer from "./useSpotifyPlayer";
import {
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import VolumeSlider from "./VolumeSlider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import CurrentTrack from "./CurrentTrack";

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
    <div className="p-2 fixed left-0 right-0 bottom-0 bg-blue-700 flex items-center gap-12">
      <CurrentTrack track={playbackState?.track_window.current_track} />
      <div className="flex gap-6 justify-between items-center ">
        <div className="flex gap-2 items-center">
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full")}
                onClick={() => player?.previousTrack()}
              >
                <TrackPreviousIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-accent-foreground">
              <p>Previous</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full")}
                onClick={() => player?.togglePlay()}
              >
                {playbackState?.paused ? <PlayIcon /> : <PauseIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-accent-foreground">
              <p>{playbackState?.paused ? "Play" : "Pause"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full")}
                onClick={() => player?.nextTrack()}
              >
                <TrackNextIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-accent-foreground">
              <p>Next</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <VolumeSlider player={player} defaultVolume={defaultVolume} />
      </div>
    </div>
  );
}
