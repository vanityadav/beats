import Link from "next/link";
import { routes } from "@/routes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        <Link className="border p-2" href={routes.spotify_login_api}>
          Login with spotify
        </Link>
      </h1>
    </main>
  );
}
