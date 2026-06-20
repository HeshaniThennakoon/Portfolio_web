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
  { label: "Services", href: "#why-hire-me" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b py-4 bg-card border-border shadow-sm"
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
          className="text-xl md:text-2xl font-black tracking-wider text-foreground hover:opacity-80 flex items-center gap-2 font-mono uppercase"
        >
          <span className="text-primary font-black">HT</span>
          <span className="hidden sm:inline text-xs font-semibold tracking-widest text-foreground/80 font-sans">
            // HESHANI
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
                    "text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 py-1 hover:text-primary",
                    activeSection === link.href.substring(1)
                      ? "text-primary border-b border-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-[1px] bg-border mx-2" />

          {/* Search Icon (visual parity) */}
          <button 
            className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded border border-border bg-background hover:bg-muted text-foreground hover:text-primary transition-all cursor-pointer"
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
            className="p-2 rounded border border-border bg-background text-foreground transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />)}
            {!mounted && <div className="w-[15px] h-[15px]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-border text-foreground hover:bg-muted transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 bg-card/98 flex flex-col p-6 border-t border-border lg:hidden transition-transform duration-300 ease-in-out shadow-lg",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
                  "text-base font-bold uppercase tracking-widest transition-colors block py-2",
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
      </div>
    </header>
  );
}
