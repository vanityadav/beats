import Link from "next/link";
import { routes } from "@/routes";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between gap-2 p-24">
      <h1>
        <Link href={routes.spotify_login_api}>
          <Button>
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with spotify
          </Button>
        </Link>
      </h1>
    </main>
  );
}
