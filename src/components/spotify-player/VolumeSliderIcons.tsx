"use client";
import React from "react";
import {
  SpeakerLoudIcon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from "@radix-ui/react-icons";

type Props = { volume: number };

export default function VolumeSliderIcons({ volume }: Props) {
  if (volume === 0) return <SpeakerOffIcon />;
  if (volume < 0.3 && volume > 0) return <SpeakerQuietIcon />;
  if (volume >= 0.3 && volume < 0.8) return <SpeakerModerateIcon />;
  if (volume >= 0.8) return <SpeakerLoudIcon />;
}
