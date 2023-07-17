import "./globals.css";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

const inter = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TMDB",
  description: "Movie data base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
