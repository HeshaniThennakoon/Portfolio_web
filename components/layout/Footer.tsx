"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Phone, ChevronUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = !mounted || resolvedTheme === "dark";

  const buttonClass = cn(
    "p-3 border transition-all duration-300 rounded-2xl cursor-pointer hover:scale-105",
    isDark
      ? "border-[#0d2d46] bg-[#0b2133] text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-[#0f2c44]/80 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
      : "border-[#d1dce5] bg-white text-slate-600 hover:text-cyan-600 hover:border-cyan-500/30 hover:bg-slate-50/50 hover:shadow-sm"
  );

  return (
    <footer className={cn(
      "w-full py-12 mt-auto relative overflow-hidden z-10 transition-all duration-300 border-t",
      isDark
        ? "bg-[#061724] border-[#0d2d46] text-foreground"
        : "bg-[#f0f4f8] border-[#d1dce5] text-slate-800"
    )}>
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Column: Brand */}
        <div className="text-center md:text-left">
          <span className={cn(
            "text-xl font-black tracking-wider uppercase block font-sans leading-none transition-all duration-300",
            isDark 
              ? "text-primary cyber-glow" 
              : "bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent"
          )}>
            HESHANI
          </span>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2 block">
            © {currentYear} | ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Scroll to Top */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleBackToTop}
            className={buttonClass}
            aria-label="Back to top"
          >
            <ChevronUp size={18} />
          </button>
        </div>

        {/* Right Column: Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/HeshaniThennakoon"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/heshani-thennakoon-46538a2b7/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:thennakoonghm@gmail.com"
            className={buttonClass}
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="tel:+94758167490"
            className={buttonClass}
            aria-label="Phone"
          >
            <Phone size={16} />
          </a>
        </div>

      </div>

      {/* Sub tagline at the absolute bottom */}
      <div className="w-full text-center border-t border-slate-200/50 dark:border-[#0d2d46]/40 mt-8 pt-6">
        <p className={cn(
          "text-[9px] font-bold font-mono tracking-[0.25em] uppercase",
          isDark ? "text-primary" : "text-cyan-600"
        )}>
          DESIGNED & ENGINEERED BY HESHANI THENNAKOON
        </p>
      </div>
    </footer>
  );
}
