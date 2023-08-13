import "./globals.css";
import Auth from "@/auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { StoreProvider } from "@/redux";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beats",
  description: "Music App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("access_token")?.value as string;

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryClientProvider>
            <Auth>{children}</Auth>
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
