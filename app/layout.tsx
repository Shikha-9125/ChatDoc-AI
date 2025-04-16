import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { NextUiProvider } from "@/components/providers/nextui-provider";
import { Toaster } from "react-hot-toast";
import "simplebar-react/dist/simplebar.min.css";
import { EdgeStoreProvider } from "@/components/providers/edgestore-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Chat with PDF and Images",
  description:
    "Welcome to our revolutionary website, where instant solutions await for your PDF and image queries! Say goodbye to delays and hello to efficiency with our user-friendly platform. Get quick answers to your questions, whether you're decoding complex diagrams or clarifying textual content. Our AI-driven system ensures prompt and accurate responses, making it perfect for students, professionals, and everyone in between. Experience hassle-free assistance today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-PYSSXX6FQB" />
      </head>
      <body className={`${inter.className}`}>
        <EdgeStoreProvider>
          <NextUiProvider>
            <NextTopLoader />
            <ThemeProvider>{children}</ThemeProvider>
            <Toaster position="top-center" />
            <Analytics />
            <SpeedInsights />
          </NextUiProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
