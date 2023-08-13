"use client";

import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/react-query/functions";

type Props = {
  children: React.ReactNode;
};

export default function AuthClient({ children }: Props) {
  const { error, isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: getToken,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 60 * 60 * 59,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error Logging in</h1>;

  return <>{children}</>;
}
