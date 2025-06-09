import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import "../globals.css";
import Providers from "@/components/providers";

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const merriweatherSerif = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "Keeg",
  description:
    "A modern dashboard with utilities and tools for supercharging and simplifying interactions with the BuiltByBit API and marketplace",
};

export default async function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${jetbrainsMono.variable} ${merriweatherSerif.variable} antialiased`}
      >
        <Providers>
          <main className="flex-1 w-full p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
