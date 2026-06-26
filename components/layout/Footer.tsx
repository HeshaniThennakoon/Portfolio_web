"use client";

import { Github, Linkedin, Mail, Phone, ChevronUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-card text-foreground border-t border-border py-12 mt-auto relative overflow-hidden z-10">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Column: Brand */}
        <div className="text-center md:text-left">
          <span className="text-xl font-black tracking-wider text-primary uppercase block cyber-glow font-sans leading-none">
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
            className="p-3 border border-border bg-[#f4f4f5] dark:bg-[#0d0d0d] text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 rounded-2xl cursor-pointer hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.12)]"
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
            className="p-3 border border-border bg-[#f4f4f5] dark:bg-[#0d0d0d] text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 rounded-2xl hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.12)]"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/heshani-thennakoon-46538a2b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border bg-[#f4f4f5] dark:bg-[#0d0d0d] text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 rounded-2xl hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.12)]"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:thennakoonghm@gmail.com"
            className="p-3 border border-border bg-[#f4f4f5] dark:bg-[#0d0d0d] text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 rounded-2xl hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.12)]"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="tel:+94758167490"
            className="p-3 border border-border bg-[#f4f4f5] dark:bg-[#0d0d0d] text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 rounded-2xl hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.12)]"
            aria-label="Phone"
          >
            <Phone size={16} />
          </a>
        </div>

      </div>

      {/* Sub tagline at the absolute bottom */}
      <div className="w-full text-center border-t border-border/40 mt-8 pt-6">
        <p className="text-[9px] font-bold font-mono tracking-[0.25em] text-primary uppercase">
          DESIGNED & ENGINEERED BY HESHANI THENNAKOON
        </p>
      </div>
    </footer>
  );
}
