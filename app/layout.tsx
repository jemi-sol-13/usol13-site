import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  variable: "--font-typewriter",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "U Sol e a Lua",
  description: "U-Sol-13 Campaign Hub",
  icons: {
    icon: "/sunsoul-clean.png",
    apple: "/sunsoul-clean.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${specialElite.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}