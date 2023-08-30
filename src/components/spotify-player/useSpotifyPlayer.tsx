import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  setDeviceId,
  setDeviceError,
  setError,
  setPlayer,
  setConnected,
  setVolume,
  setPlaybackState,
} from "@/redux/features/spotifyPlayer";
import { setDeviceIdServer } from "@/server/actions/action";

export default function useSpotifyPlayer(token: string | undefined) {
  const dispatch = useAppDispatch();
  const spotifyPlayerState = useAppSelector(
    (state) => state.spotifyPlayerReducer
  );

  useEffect(() => {
    // connect to the spotify playback src
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    // create the player
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Beats App",
        getOAuthToken: (cb) => {
          if (token) cb(token);
        },
        volume: 0.5,
      });

      dispatch(setPlayer(player));

      player.addListener("ready", ({ device_id }) => {
        dispatch(setDeviceId(device_id));
        console.log("Device is", device_id);
        setDeviceIdServer(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        dispatch(setDeviceError(device_id));
        console.log("not ready");
      });

      player.addListener("player_state_changed", (state) => {
        dispatch(setPlaybackState(state));
      });

      player.getCurrentState().then((state) => {
        dispatch(setPlaybackState(state));
      });

      player.getVolume().then((volume) => {
        dispatch(setVolume(volume));
      });

      player.addListener("autoplay_failed", () => {
        dispatch(
          setError("Autoplay is not allowed by the browser autoplay rules")
        );
      });

      // events
      player.on("initialization_error", ({ message }) => {
        dispatch(setError(message));
      });
      player.on("authentication_error", ({ message }) => {
        dispatch(setError(message));
      });
      player.on("account_error", ({ message }) => {
        dispatch(setError(message));
      });
      player.on("playback_error", ({ message }) => {
        dispatch(setError(message));
      });

      player.connect().then((success) => {
        if (success) {
          dispatch(setConnected());
          console.log("Connected Success");
        }
      });
      player.activateElement();
    };

    return () => {
      spotifyPlayerState.player?.removeListener("ready");
      spotifyPlayerState.player?.removeListener("not_ready");
      spotifyPlayerState.player?.removeListener("autoplay_failed" as any);
      spotifyPlayerState.player?.removeListener("player_state_changed");
      spotifyPlayerState.player?.removeListener("initialization_error");
      spotifyPlayerState.player?.removeListener("authentication_error");
      spotifyPlayerState.player?.removeListener("account_error");
      spotifyPlayerState.player?.removeListener("account_error");
      spotifyPlayerState.player?.removeListener("playback_error");
      spotifyPlayerState.player?.disconnect();
    };
  }, []);

  return spotifyPlayerState;
}
