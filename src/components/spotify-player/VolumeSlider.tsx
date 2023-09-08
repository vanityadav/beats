"use client";

import { Button } from "../ui/button";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import VolumeSliderIcons from "./VolumeSliderIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = { player: Spotify.Player | null; defaultVolume: number };

export default function VolumeSlider({ player, defaultVolume }: Props) {
  const [volume, setVolume] = useState(defaultVolume);
  const [prevVolume, setPrevVolume] = useState(defaultVolume);

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-full")}
            onClick={() => {
              setVolume((prev) => {
                console.log(prev);
                if (prev === 0) {
                  player?.setVolume(prevVolume);
                  return prevVolume;
                } else {
                  setPrevVolume(prev);
                  player?.setVolume(0);
                  return 0;
                }
              });
            }}
          >
            <VolumeSliderIcons volume={volume} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-accent-foreground">
          <p>{volume === 0 ? "Unmute" : "Mute"}</p>
        </TooltipContent>
      </Tooltip>

      <Slider
        defaultValue={[defaultVolume]}
        max={1}
        value={[volume]}
        step={1 / 10000}
        className="w-[100px]"
        onValueChange={(value) => {
          setVolume(value.at(0) as number);
          player?.setVolume(value.at(0) as number);
        }}
      />
    </div>
  );
}
