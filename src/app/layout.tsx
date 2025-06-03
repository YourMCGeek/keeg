import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

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
  title: "BuiltByChef",
  description: "BuiltByChef - A Utility Dashboard for BuiltByBit Staff Members",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${jetbrainsMono.variable} ${merriweatherSerif.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
