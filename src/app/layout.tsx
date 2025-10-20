import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/hooks/alert-provider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Aura",
  description: "Plan smarter, travel brighter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <SessionProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
