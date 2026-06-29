"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { TypewriterText } from "../shared/TypewriterText";
import { HeroInfo, Education } from "@/lib/data";

interface HeroProps {
  data: HeroInfo;
  education?: Education;
}

export function Hero({ data, education }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const nameParts = data.name.toUpperCase().split(" ");
  const firstName = nameParts[0] || "HESHANI";
  const lastName = nameParts.slice(1).join(" ") || "THENNAKOON";

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 lg:py-0 overflow-hidden bg-background grid-bg"
    >
      {/* Huge background watermark name */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none text-[20vw] md:text-[24vw] pointer-events-none whitespace-nowrap font-black tracking-tight leading-none text-primary opacity-[0.1] dark:opacity-[0.05] uppercase font-sans text-center"
        style={{ textShadow: isDark ? '0 0 40px rgba(0, 245, 255, 0.1)' : 'none' }}
      >
        {firstName}
      </div>

      {/* Cyberpunk ambient glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px] pointer-events-none animate-pulse-glow z-0 opacity-40 dark:opacity-100" />
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/5 blur-[120px] pointer-events-none animate-pulse-glow z-0 opacity-30 dark:opacity-100" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {(() => {
            const status = data.availabilityStatus || "open";
            const message = data.availabilityMessage || "Open to full-time opportunities";

            let dotColor = "bg-emerald-400";
            let pulseClass = "animate-pulse";
            let badgeBorder = "border-emerald-500/20 dark:border-emerald-400/20";
            let badgeBg = "bg-emerald-500/5 dark:bg-emerald-400/5";
            let badgeText = "text-emerald-700 dark:text-emerald-300";

            if (status === "freelance") {
              dotColor = "bg-amber-400";
              pulseClass = "";
              badgeBorder = "border-amber-500/20 dark:border-amber-400/20";
              badgeBg = "bg-amber-500/5 dark:bg-amber-400/5";
              badgeText = "text-amber-700 dark:text-amber-300";
            } else if (status === "unavailable") {
              dotColor = "bg-rose-400";
              pulseClass = "";
              badgeBorder = "border-rose-500/20 dark:border-rose-400/20";
              badgeBg = "bg-rose-500/5 dark:bg-rose-400/5";
              badgeText = "text-rose-700 dark:text-rose-300";
            }

            return (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-5 ${badgeBorder} ${badgeBg} ${badgeText}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor} ${pulseClass}`} />
                {message}
              </motion.div>
            );
          })()}

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary mb-3 block"
          >
            SOFTWARE ENGINEER
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground uppercase font-sans"
          >
            <span className="text-foreground/95 block text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 text-muted-foreground/80">
              HI, I'M
            </span>
            <span className="text-primary block cyber-glow mb-1">{firstName}</span>
            <span className="text-foreground block">{lastName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-10 flex items-center justify-center lg:justify-start mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="mr-2">SPECIALIZED IN</span>
            <TypewriterText
              words={data.roles}
              className="font-bold text-foreground text-xs uppercase tracking-widest"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground/90 font-normal text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans"
          >
            {data.subheadline}
          </motion.p>

          {/* Academic secondary detail */}
          {education && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 border-l-2 border-primary/40 pl-4 py-1 text-left w-full max-w-2xl"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-foreground">{education.degree}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                {education.faculty ? `${education.faculty}, ` : ""}{education.institution}
              </p>
            </motion.div>
          )}

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer bg-primary text-primary-foreground hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] font-bold text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 border border-primary rounded-2xl"
            >
              View Projects
              <ArrowRight size={14} />
            </button>
            <a
              href={data.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xs uppercase tracking-wider px-8 py-3.5 transition-all duration-300 rounded-2xl shadow-[0_0_10px_rgba(0,245,255,0.05)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] bg-transparent"
            >
              Download CV
              <Download size={14} />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="lg:col-span-5 flex justify-center mt-8 lg:mt-0 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-[350px] md:h-[420px] p-2 bg-card border border-primary/20 dark:border-primary/20 rounded-[2.5rem] transition-all duration-500 animate-float"
            style={{ 
              boxShadow: isDark
                ? "0 0 60px rgba(0, 245, 255, 0.2), inset 0 0 20px rgba(0, 245, 255, 0.05)"
                : "0 10px 30px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-[#f4f4f5] dark:bg-[#151515] flex items-center justify-center rounded-[2.2rem]">
              {data.profileImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.profileImg}
                  alt={data.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                /* Premium Monogram fallback */
                <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-card dark:bg-[#0a0a0a] w-full select-none">
                  <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center text-primary text-4xl font-black mb-4 bg-primary/5 cyber-glow">
                    HT
                  </div>
                  <h3 className="text-xl font-bold tracking-widest text-foreground font-sans uppercase">{data.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-2 tracking-[0.2em] uppercase font-mono">
                    SOFTWARE ENGINEER
                  </p>
                  <p className="text-[10px] text-primary mt-4 border border-primary/30 rounded-none px-3 py-1 font-mono uppercase tracking-wider bg-primary/5">
                    UNIVERSITY OF RUHUNA
                  </p>
                </div>
              )}
            </div>
            
            {/* Tech Corner Details */}
            <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-primary opacity-65" />
            <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-primary opacity-65" />
            <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-primary opacity-65" />
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-primary opacity-65" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

