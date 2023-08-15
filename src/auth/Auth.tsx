import { ReactNode } from "react";
import AuthClient from "./AuthClient";
import { getCookies } from "@/server/getCookies";

type Props = {
  children: ReactNode;
};

export default async function Auth({ children }: Props) {
  const { cookieToken } = getCookies();
  if (cookieToken) return <>{children}</>;
  return (
    <AuthClient>
      <>{children}</>
    </AuthClient>
  );
}
