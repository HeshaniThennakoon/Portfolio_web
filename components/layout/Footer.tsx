"use client";

import { Github, Linkedin, Mail, Phone, ChevronUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-card text-foreground border-t border-border py-12 mt-auto relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Column: Brand */}
        <div className="text-center md:text-left">
          <p className="text-xl font-black font-mono uppercase tracking-wider text-primary">
            HT MONOGRAM
          </p>
          <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground mt-2">
            © {currentYear} | ALL RIGHTS RESERVED
          </p>
        </div>

        {/* Center: Scroll to Top */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleBackToTop}
            className="p-3 border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 rounded-none cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp size={16} />
          </button>
        </div>

        {/* Right Column: Social Icons */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/HeshaniThennakoon"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 rounded-none"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/heshani-thennakoon-46538a2b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 rounded-none"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:thennakoonghm@gmail.com"
            className="p-3 border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 rounded-none"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
          <a
            href="tel:+94758167490"
            className="p-3 border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 rounded-none"
            aria-label="Phone"
          >
            <Phone size={15} />
          </a>
        </div>

      </div>

      {/* Sub tagline at the absolute bottom */}
      <div className="w-full text-center border-t border-border/30 mt-8 pt-6">
        <p className="text-[9px] font-bold font-mono tracking-[0.25em] text-primary uppercase">
          // DESIGN BY HESHANI THENNAKOON // NEXT.JS + TAILWIND V4
        </p>
      </div>
    </footer>
  );
}
