import { getSpotifyToken } from "../getCookies";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const spotifyToken = getSpotifyToken();

const api = spotifyToken
  ? SpotifyApi.withAccessToken(process.env.CLIENT_ID, spotifyToken)
  : null;

export default api;
