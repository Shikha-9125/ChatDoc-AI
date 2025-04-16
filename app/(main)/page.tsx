'use client'
import { useTheme } from "next-themes";
import Hero from "./_components/hero";
import { useEffect, useState } from "react";
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [])
  if (!mounted) return null;
  return (
    <>
      <Hero />
    </>
  );
}
