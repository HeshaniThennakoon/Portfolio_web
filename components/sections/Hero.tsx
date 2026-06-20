"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Award, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { TypewriterText } from "../shared/TypewriterText";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { HeroInfo } from "@/lib/data";

interface HeroProps {
  data: HeroInfo;
}

export function Hero({ data }: HeroProps) {
  // Mapping icons to labels roughly
  const getIcon = (label: string) => {
    const lowercase = label.toLowerCase();
    if (lowercase.includes("project")) return <Code2 className="text-primary" size={24} />;
    if (lowercase.includes("learning") || lowercase.includes("development") || lowercase.includes("year"))
      return <GraduationCap className="text-secondary" size={24} />;
    if (lowercase.includes("internship") || lowercase.includes("experience"))
      return <Briefcase className="text-accent" size={24} />;
    return <Award className="text-primary" size={24} />;
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen lg:min-h-screen flex flex-col justify-center pt-28 pb-16 lg:py-0 overflow-hidden bg-background"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-pulse duration-[6000ms] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-pulse duration-[8000ms] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Active Solutions Junior Software Engineer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-foreground"
          >
            Hi, I&apos;m <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">{data.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-12 flex items-center justify-center lg:justify-start mt-2"
          >
            <span className="text-lg sm:text-2xl font-bold text-muted-foreground mr-2">I am a</span>
            <TypewriterText
              words={data.roles}
              className="text-lg sm:text-2xl font-bold text-foreground"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-2xl font-bold text-foreground/90 mt-4 lg:mt-6 max-w-2xl"
          >
            {data.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground font-medium text-xs sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            {data.subheadline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:translate-y-[-2px]"
            >
              View Projects
              <ArrowRight size={18} />
            </button>
            <a
              href={data.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-foreground border border-border font-bold px-6 py-3 rounded-xl hover:translate-y-[-2px] transition-all"
            >
              Download Resume
              <Download size={18} />
            </a>
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer bg-transparent hover:bg-card/50 text-foreground font-bold px-6 py-3 rounded-xl border border-border hover:translate-y-[-2px] transition-all"
            >
              Contact Me
              <Mail size={18} />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Visual Image Holder */}
        <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl group border-2 border-primary/20 p-2 bg-gradient-to-br from-primary/10 to-secondary/10"
          >
            <div className="absolute inset-0 rounded-[1.4rem] overflow-hidden bg-gradient-to-tr from-slate-950 to-slate-900 flex items-center justify-center">
              {data.profileImg && data.profileImg !== "/profile.jpg" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.profileImg}
                  alt={data.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                /* Premium Avatar fallback */
                <div className="text-center p-6 sm:p-8 flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-3xl sm:text-4xl font-black mb-3 sm:mb-4 shadow-lg shadow-primary/30">
                    HT
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">{data.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 tracking-wider uppercase">
                    Software Engineer
                  </p>
                  <p className="text-[10px] sm:text-xs text-primary mt-3 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 font-semibold">
                    Junior SE at Active Solutions
                  </p>
                </div>
              )}
            </div>

            {/* Glowing borders */}
            <div className="absolute inset-0 border border-white/10 dark:border-white/5 rounded-3xl pointer-events-none group-hover:border-primary/50 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>

      {/* Floating Stats Counters Container */}
      <div className="container mx-auto px-4 md:px-8 mt-12 sm:mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl"
        >
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 border-slate-200/10 dark:border-slate-800/50 md:border-r md:last:border-r-0 md:pr-4"
            >
              <div className="p-2 sm:p-3 rounded-xl bg-card/80 border border-border shadow-sm shrink-0">
                {getIcon(stat.label)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground mt-0.5 line-clamp-2">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
