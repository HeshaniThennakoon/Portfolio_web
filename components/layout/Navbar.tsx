"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  brandName?: string;
  subtitle?: string;
  availabilityStatus?: string;
}

export function Navbar({ brandName = "Heshani", subtitle = "Software Engineer", availabilityStatus = "open" }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to scrolls
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy logic
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 80; // offset for the sticky navbar
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md",
        isScrolled
          ? "bg-[#e0eff5]/90 dark:bg-[#061724]/95 border-cyan-200/50 dark:border-[#0d2d46] shadow-[0_8px_30px_rgba(0,137,168,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] py-3"
          : "bg-[#f0f7fa]/75 dark:bg-[#061724]/75 border-cyan-200/20 dark:border-[#0d2d46]/50 py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#home");
          }}
          className="flex flex-col select-none cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span 
              className={cn(
                "text-xl md:text-2xl font-black tracking-wider font-sans uppercase leading-none transition-all duration-300",
                mounted && resolvedTheme === "dark" 
                  ? "text-primary cyber-glow" 
                  : "bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent"
              )}
            >
              {brandName.split(" ")[0]}
            </span>
            {mounted && (
              <span className={`w-2 h-2 rounded-full ${
                availabilityStatus === "open"
                  ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  : availabilityStatus === "freelance"
                  ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "bg-rose-400"
              }`} />
            )}
          </div>
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase mt-1 leading-none">
            {subtitle}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 py-1 hover:text-cyan-600 dark:hover:text-primary relative block",
                    activeSection === link.href.substring(1)
                      ? "text-cyan-600 dark:text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {activeSection === link.href.substring(1) && (
                    <span 
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-emerald-400"
                      style={{ 
                        boxShadow: mounted && resolvedTheme === "dark" ? '0 0 10px var(--primary)' : 'none' 
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-[1px] bg-border mx-2" />

          {/* Search Icon (visual parity) */}
          {/* <button 
            className="p-2 text-slate-500 dark:text-cyan-400/70 hover:text-cyan-600 dark:hover:text-primary transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={16} />
          </button> */}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200/80 dark:border-[#0d2d46] bg-white dark:bg-[#0b2133]/80 text-slate-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-primary hover:border-cyan-500/30 dark:hover:border-cyan-400/40 hover:shadow-sm dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.12)] transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />)}
            {!mounted && <div className="w-[15px] h-[15px]" />}
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200/80 dark:border-[#0d2d46] bg-white dark:bg-[#0b2133]/80 text-slate-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-primary hover:border-cyan-500/30 dark:hover:border-cyan-400/40 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />)}
            {!mounted && <div className="w-[15px] h-[15px]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200/80 dark:border-[#0d2d46] text-slate-700 dark:text-cyan-400 hover:bg-slate-50 dark:hover:bg-[#0b2133] transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[65px] z-40 bg-[#f0f7fa]/95 dark:bg-[#061724]/95 backdrop-blur-md flex flex-col p-6 border-t border-cyan-200/50 dark:border-[#0d2d46]/50 lg:hidden transition-all duration-300 ease-in-out shadow-lg",
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <ul className="flex flex-col gap-6 my-auto text-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={cn(
                  "text-lg font-bold uppercase tracking-[0.25em] transition-colors block py-2 relative w-max mx-auto",
                  activeSection === link.href.substring(1)
                    ? "text-cyan-600 dark:text-primary"
                    : "text-muted-foreground hover:text-cyan-600 dark:hover:text-primary"
                )}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-emerald-400 rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
