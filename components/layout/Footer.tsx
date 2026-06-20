"use client";

import { Github, Linkedin, Mail, Phone, ChevronUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-950 text-white border-t border-white/5 py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left text */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Heshani Thennakoon
          </p>
          <p className="text-xs text-slate-400 mt-1">
            © {currentYear} | All Rights Reserved. Built with Next.js, Tailwind & Framer Motion.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/HeshaniThennakoon"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-400 hover:text-white transition-all hover:scale-105"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/heshani-thennakoon-46538a2b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-400 hover:text-white transition-all hover:scale-105"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:thennakoonghm@gmail.com"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-400 hover:text-white transition-all hover:scale-105"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="tel:+94758167490"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-400 hover:text-white transition-all hover:scale-105"
            aria-label="Phone"
          >
            <Phone size={18} />
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={handleBackToTop}
          className="p-3 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </footer>
  );
}
