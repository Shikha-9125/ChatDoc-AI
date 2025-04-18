"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import PDFButton from "./pdf";
import ImageButton from "./image";
import ResumeButton from "./resume";
import pdfImage from "@/public/pdf.webp";
import imageImage from "@/public/image.webp";
import imgImage from "@/public/img.webp";
import resumeImage from "@/public/resume.webp";
import Image from "next/image";
import { motion } from "framer-motion";

function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Gradient Background Blur */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-0"
      >
        <div className="blur-[120px] h-64 bg-gradient-to-br from-purple-400 to-primary dark:from-blue-800"></div>
        <div className="blur-[120px] h-40 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-tight ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Chat with PDFs, images & resumes — like never before.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className={`mt-6 text-lg md:text-xl ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          {"Your files aren't silent anymore. Upload any PDF, image or resume and get smart responses instantly. Powered by ChatGPT and Gemini."}
        </motion.p>

        {/* Glassmorphism Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <PDFButton />
          <ImageButton />
          <ResumeButton />
        </motion.div>

        {/* Preview Sections */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-16"
        >

          {/* PDF Preview */}
          <div className="text-center w-full md:w-[80%] lg:w-[70%]">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-500 mb-4">📚 Interact with PDFs</h2>
            <Image
              className="rounded-2xl shadow-2xl"
              alt="PDF preview"
              src={pdfImage}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base italic">
              Upload research papers, manuals or any PDF to summarize or ask questions.
            </p>
          </div>

          {/* Resume Preview */}
          <div className="text-center w-full md:w-[80%] lg:w-[70%]">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-4">📄 Talk to Your Resume</h2>
            <Image
              className="rounded-2xl shadow-2xl"
              alt="Resume chat preview"
              src={resumeImage}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base italic">
              Ask anything about your resume and get job-specific responses powered by AI.
            </p>
          </div>

          {/* Extra Upload Preview */}
          <div className="text-center w-full md:w-[80%] lg:w-[70%]">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-500 mb-4">🖼 Understand Images</h2>
            <Image
              className="rounded-2xl shadow-2xl"
              alt="Custom file preview"
              src={imgImage}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base italic">
              Drop in any image or document — our model will break it down intelligently.
            </p>
          </div>

          {/* Image Preview */}
          <div className="text-center w-full md:w-[80%] lg:w-[70%]">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-500 mb-4">🛠 Custom File Analysis</h2>
            <Image
              className="rounded-2xl shadow-2xl"
              alt="Image preview"
              src={imageImage}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base italic">
              Extract context, diagrams or descriptions from any image using AI.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
