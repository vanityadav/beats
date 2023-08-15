import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SpotifyPlayer = {
  deviceId: string | null;
  player: Spotify.Player | null;
  online: boolean;
  errorMessage: string | null;
  defaultVolume: number;
  playbackState: Spotify.PlaybackState | null;
};

const initialState = {
  deviceId: null,
  player: null,
  online: false,
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

    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },

    setDeviceError: (state, action: PayloadAction<string>) => {
      state.online = false;
      state.player = null;
    },

    setConnected: (state) => {
      state.online = true;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },

    setVolume: (state, action: PayloadAction<number>) => {
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
  setDeviceId,
  setDeviceError,
  setConnected,
  setError,
  setVolume,
  setPlaybackState,
} = spotifyPlayer.actions;
export default spotifyPlayer.reducer;
