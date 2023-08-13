import React, { useEffect, useState } from "react";

export default function WebPlayer({ token }) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState();
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Music App SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
      player.on("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });
      player.addListener("autoplay_failed", () => {
        console.log("Autoplay is not allowed by the browser autoplay rules");
      });

      player.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });
      player.on("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
      });
      player.on("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });

      player.getCurrentState().then((state) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }

        var current_track = state.track_window.current_track;
        var next_track = state.track_window.next_tracks[0];

        console.log("Currently Playing", current_track);
        console.log("Playing Next", next_track);
      });
      player.getVolume().then((volume) => {
        let volume_percentage = volume * 100;
        console.log(`The volume of the player is ${volume_percentage}%`);
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };
  }, []);
  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <img
            src={current_track?.album.images[2].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track?.name}</div>

            <div className="now-playing__artist">
              {current_track?.artists[0]?.name}
            </div>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="any"
          defaultValue={player?.getVolume().then((volume) => volume)}
          onChange={(e) =>
            player.setVolume(e.target.value).then(() => {
              console.log("Volume updated!", e.target.value);
            })
          }
        />

        <button
          className="btn-spotify"
          onClick={() => {
            player.previousTrack();
          }}
        >
          &lt;&lt;
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.togglePlay();
          }}
        >
          {is_paused ? "PLAY" : "PAUSE"}
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.nextTrack().then(() => {
              console.log("Skipped to next track!");
            });
          }}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
}
