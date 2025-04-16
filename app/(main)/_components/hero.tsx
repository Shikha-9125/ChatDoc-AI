/* eslint-disable @next/next/no-img-element */
"use client";
import { auth } from "@/firebase/config";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PDFButton from "./pdf";
import pdfImage from "@/public/pdf.webp";
import imageImage from "@/public/image.webp";
import Image from "next/image";
import ImageButton from "./image";
import { useTheme } from "next-themes";
import ResumeButton from "./resume";
function Hero() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <div className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative pt-36 ml-auto">
            <div className="lg:w-3/3 text-center mx-auto">
              <h1
                className={`${
                  theme === "light" ? "text-black" : "text-white"
                }   font-bold text-5xl md:text-6xl xl:text-7xl`}
              >
                Let&apos;s chat with pdf, images using{" "}
                <span className="text-primary ">Chat GPT and Gemini</span>
              </h1>
              <p
                className={` ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                } mt-8  `}
              >
                Effortlessly engage in dynamic conversations, share PDFs, images
                with ChatGPT, Gemini integration—transforming your online
                interaction experience. Elevate communication effortlessly.
              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                <PDFButton />
                <ImageButton />
                <ResumeButton/>
              </div>
              <div className=" py-8 mt-16    w-[100%]  flex justify-between ">
                <Image
                  className="shadow-2xl"
                  alt="pdf.webp"
                  src={pdfImage}
                  sizes="100vw"
                  // Make the image display full width
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className=" py-8 mt-16    w-[100%]  flex justify-between ">
                <Image
                  className="shadow-2xl"
                  alt="pdf.webp"
                  src={imageImage}
                  sizes="100vw"
                  // Make the image display full width
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
