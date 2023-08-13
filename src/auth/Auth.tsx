import { ReactNode } from "react";
import AuthClient from "./AuthClient";
import { cookies } from "next/headers";

type Props = {
  children: ReactNode;
};

export default async function Auth({ children }: Props) {
  const cookieStore = cookies();
  const savedToken = cookieStore.get("access_token");

  if (!savedToken)
    return (
      <AuthClient>
        <>{children}</>
      </AuthClient>
    );

  if (savedToken) return <>{children}</>;
}
