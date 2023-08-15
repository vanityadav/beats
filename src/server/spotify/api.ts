import { getCookies } from "../getCookies";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const { cookieAccessToken } = getCookies();

const api = cookieAccessToken
  ? SpotifyApi.withAccessToken(process.env.CLIENT_ID, cookieAccessToken)
  : null;

export default api;
