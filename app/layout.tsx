import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import RootProviders from "./root-providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "./fonts/NeueMachina/NeueMachina-Regular.otf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crypto 2 Earn",
  description: "You can earn crypto by Telegram Tap-to-earn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased`}>
        <RootProviders>{children}</RootProviders>
        <GoogleAnalytics gaId="G-R89T0Y46Z4" />
      </body>
    </html>
  );
}

 

 