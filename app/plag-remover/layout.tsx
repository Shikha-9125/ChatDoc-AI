import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Plagrism Remover",
  description:
    "Welcome to our revolutionary website, where instant solutions await for your PDF and image queries! Say goodbye to delays and hello to efficiency with our user-friendly platform. Get quick answers to your questions, whether you're decoding complex diagrams or clarifying textual content. Our AI-driven system ensures prompt and accurate responses, making it perfect for students, professionals, and everyone in between. Experience hassle-free assistance today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div>{children}</div>
  );
}
