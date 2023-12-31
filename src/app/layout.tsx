import "./globals.css";
import Auth from "@/auth";
import type { Metadata } from "next";
import { StoreProvider } from "@/redux";
import { Inter } from "next/font/google";
import { getCookies } from "@/server/getCookies";
import { QueryClientProvider } from "@/react-query";
import { SpotifyMusicPlayer } from "@/components/spotify-player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beats",
  description: "Beats Music App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cookieToken } = getCookies();
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryClientProvider>
            <Auth>
              {children}
              <SpotifyMusicPlayer token={cookieToken} />
            </Auth>
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
