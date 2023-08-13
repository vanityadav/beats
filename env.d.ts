namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    CLIENT_SECRET: string;

    APP_BASE_URL: "http://localhost:3000/";
    SPOTIFY_LOGIN_CALLBACK_URL: "http://localhost:3000/api/login/callback";

    SPOTIFY_BASE_API: "https://api.spotify.com/v1/";
    SPOTIFY_AUTH_API: "https://accounts.spotify.com/";
  }
}
