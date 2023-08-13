const routes = {
  login_api: "api/login/",
  spotify_login_api: "api/login/spotify/",
  spotify_callback_api: "api/login/callback/",
} as const;

export default routes;

export type Routes = (typeof routes)[keyof typeof routes];

export type TypeOfRoutes = typeof routes;
