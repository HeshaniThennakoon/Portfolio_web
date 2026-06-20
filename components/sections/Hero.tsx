"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { TypewriterText } from "../shared/TypewriterText";
import { HeroInfo } from "@/lib/data";

interface HeroProps {
  data: HeroInfo;
}

export function Hero({ data }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameParts = data.name.toUpperCase().split(" ");
  const firstName = nameParts[0] || "HESHANI";
  const lastName = nameParts.slice(1).join(" ") || "THENNAKOON";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 lg:py-0 overflow-hidden bg-background grid-bg animate-fade-in"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4 block font-mono"
          >
            // JUNIOR SOFTWARE ENGINEER
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-foreground uppercase"
          >
            <span className="text-foreground/95 block text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-1">
              WE ARE
            </span>
            <span className="text-foreground/95 block sm:inline">{firstName} </span>
            <span className="text-primary block sm:inline">{lastName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 flex items-center justify-center lg:justify-start mt-4 font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground"
          >
            <span className="mr-2">// SPECIALIZED IN</span>
            <TypewriterText
              words={data.roles}
              className="font-bold text-foreground text-xs md:text-sm uppercase tracking-widest"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-xl font-medium text-muted-foreground mt-6 max-w-2xl leading-relaxed"
          >
            {data.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground/80 font-normal text-xs sm:text-sm max-w-2xl mt-4 leading-relaxed"
          >
            {data.subheadline}
          </motion.p>

          {/* Action CTAs: Ghost outline style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 transition-all duration-300 rounded-none bg-transparent"
            >
              View Projects
              <ArrowRight size={14} />
            </button>
            <a
              href={data.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer border border-border text-foreground hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 transition-all duration-300 rounded-none bg-transparent"
            >
              Download Resume
              <Download size={14} />
            </a>
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer border border-border text-foreground hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 transition-all duration-300 rounded-none bg-transparent"
            >
              Contact Me
              <Mail size={14} />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Visual Image Holder */}
        <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-[350px] md:h-[420px] overflow-hidden group border border-primary/30 p-2 bg-card shadow-[0_0_50px_rgba(0,212,180,0.05)] rounded-none"
          >
            <div className="relative w-full h-full overflow-hidden bg-muted flex items-center justify-center rounded-none">
              {data.profileImg && data.profileImg !== "/profile.jpg" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.profileImg}
                  alt={data.name}
                  className="w-full h-full object-cover teal-duotone"
                />
              ) : (
                /* Premium Monogram fallback with duotone styling */
                <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-card select-none">
                  <div className="w-24 h-24 rounded-none border border-primary/40 flex items-center justify-center text-primary text-4xl font-black mb-4 bg-primary/5">
                    HT
                  </div>
                  <h3 className="text-xl font-bold tracking-widest text-foreground font-mono uppercase">{data.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-2 tracking-[0.2em] uppercase font-mono">
                    // SOFTWARE ENGINEER
                  </p>
                  <p className="text-[10px] text-primary mt-4 border border-primary/30 rounded-none px-3 py-1 font-mono uppercase tracking-wider bg-primary/5">
                    ACTIVE SOLUTIONS SE
                  </p>
                </div>
              )}
            </div>
            {/* Overlay border details for high tech look */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
