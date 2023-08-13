import { routes } from "@/routes";

const setToken = async () => {
  const res = await fetch(routes.login_api);
  return await res.json();
};

export default setToken;
