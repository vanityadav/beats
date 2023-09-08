import { ReactNode } from "react";
import AuthClient from "./AuthClient";
import { getSpotifyAccessToken } from "@/server/getCookies";

type Props = {
  children: ReactNode;
};

export default async function Auth({ children }: Props) {
  const token = getSpotifyAccessToken();
  if (token) return <>{children}</>;
  return (
    <AuthClient>
      <>{children}</>
    </AuthClient>
  );
}
