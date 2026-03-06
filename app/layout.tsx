import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import { Orbitron } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  variable: "--font-typewriter",
  weight: "400",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-cyber",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
      <body className={`${specialElite.variable} ${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}