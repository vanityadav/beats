import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SpotifyPlayer = {
  player: Spotify.Player | null;
  errorMessage: string | null;
  defaultVolume: number;
  playbackState: Spotify.PlaybackState | null;
};

const initialState = {
  player: null,
  errorMessage: null,
  defaultVolume: 0.5,
  playbackState: null,
} as SpotifyPlayer;

export const spotifyPlayer = createSlice({
  name: "spotifyPlayer",
  initialState,
  reducers: {
    reset: () => initialState,

    setPlayer: (state, action: PayloadAction<Spotify.Player | null>) => {
      state.player = action.payload;
    },

    setDeviceError: (state, action: PayloadAction<string>) => {
      state.player = null;
      state.errorMessage = "Device is not ready for Playback";
    },

    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },

    setDefaultVolume: (state, action: PayloadAction<number>) => {
      state.defaultVolume = action.payload;
    },

    setPlaybackState: (
      state,
      action: PayloadAction<Spotify.PlaybackState | null>
    ) => {
      state.playbackState = action.payload;
    },
  },
});

export const {
  reset,
  setPlayer,
  setDeviceError,
  setError,
  setDefaultVolume,
  setPlaybackState,
} = spotifyPlayer.actions;
export default spotifyPlayer.reducer;
