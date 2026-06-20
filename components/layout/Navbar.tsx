"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
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
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
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
          // If the section top is close to the top of the viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg border-white/10 dark:border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Monogram logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#home");
          }}
          className="text-2xl font-bold tracking-wider text-foreground hover:opacity-80 flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-extrabold">
            HT
          </span>
          <span className="hidden sm:inline text-sm font-medium tracking-normal text-muted-foreground">
            | Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
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
                    "text-sm font-semibold transition-colors duration-200 py-2 hover:text-primary",
                    activeSection === link.href.substring(1)
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-border" />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border bg-card/50 hover:bg-border text-foreground hover:text-primary transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            {!mounted && <div className="w-[18px] h-[18px]" />}
          </button>

          {/* CV Download Button */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 hover:border-primary/80 bg-primary/5 hover:bg-primary/10 rounded-full px-4 py-2 transition-all"
          >
            <Download size={14} />
            Resume
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border bg-card/50 hover:bg-border text-foreground transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
            {!mounted && <div className="w-[16px] h-[16px]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-card transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 top-[73px] z-40 bg-background/95 backdrop-blur-lg flex flex-col p-6 border-t border-border lg:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col gap-5 my-auto text-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={cn(
                  "text-xl font-bold tracking-wide transition-colors block py-2",
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4">
          <a
            href="/resume.pdf"
            download
            className="w-full text-center inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-primary border border-primary bg-primary/10 rounded-xl py-3.5 hover:bg-primary/20 transition-all"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
