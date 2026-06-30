"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { logoutAdmin } from "@/app/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  UserCheck,
  Code2,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Trophy,
  MailOpen,
  Settings,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
  Menu,
  X,
  Layers,
  MessageSquare,
  Globe
} from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  groupName: string;
  links: SidebarLink[];
}

const navigationGroups: NavGroup[] = [
  {
    groupName: "Overview",
    links: [
      { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={16} /> },
    ],
  },
  {
    groupName: "Content Management",
    links: [
      { label: "Hero & Landing", href: "/admin/hero", icon: <Sparkles size={16} /> },
      { label: "About Details", href: "/admin/about", icon: <UserCheck size={16} /> },
      { label: "Skills Inventory", href: "/admin/skills", icon: <Code2 size={16} /> },
      { label: "Services Showcase", href: "/admin/services", icon: <Layers size={16} /> },
      { label: "Projects Showcase", href: "/admin/projects", icon: <FolderKanban size={16} /> },
      { label: "Testimonials", href: "/admin/testimonials", icon: <MessageSquare size={16} /> },
    ],
  },
  {
    groupName: "Timeline & Inbox",
    links: [
      { label: "Work Experience", href: "/admin/experience", icon: <Briefcase size={16} /> },
      { label: "Education History", href: "/admin/education", icon: <GraduationCap size={16} /> },
      { label: "Achievements", href: "/admin/achievements", icon: <Trophy size={16} /> },
      { label: "Contact Messages", href: "/admin/contact", icon: <MailOpen size={16} /> },
    ],
  },
  {
    groupName: "System Config",
    links: [
      { label: "System Settings", href: "/admin/settings", icon: <Settings size={16} /> },
      { label: "OG & Social Share", href: "/admin/og-settings", icon: <Globe size={16} /> },
    ],
  },
];

export default function AdminClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await logoutAdmin();
      toast.success("Signed out successfully!");
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      toast.error("Failed to sign out.");
    } finally {
      setSigningOut(false);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background grid-bg text-foreground flex flex-col antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 select-none">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-black text-2xl tracking-wider cyber-glow">
                HT
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-l border-border/80 pl-2 leading-none mt-1">
                Admin Panel
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500">
                Workspace Online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View live site button */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-primary/5"
              title="View Live Portfolio Website"
            >
              <span className="hidden md:inline">View Site</span>
              <ExternalLink size={14} />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border bg-card/60 hover:bg-muted text-foreground hover:text-primary transition-all cursor-pointer shadow-sm hover:border-primary/20"
              aria-label="Toggle theme"
            >
              {mounted && (resolvedTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />)}
              {!mounted && <div className="w-[14px] h-[14px]" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-border bg-card/60 text-foreground transition-all cursor-pointer hover:border-primary/20"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Grid */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-8 py-8 gap-8">
        {/* Left Sidebar Navigation (Desktop) */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col gap-6">
          <div className="bg-card/40 backdrop-blur-md border border-border/80 rounded-3xl p-5 shadow-lg flex flex-col gap-6 select-none relative overflow-hidden">
            {/* Background glowing flare inside card */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
            
            <div className="flex flex-col gap-6">
              {navigationGroups.map((group) => (
                <div key={group.groupName} className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em] block px-3">
                    {group.groupName}
                  </span>
                  <nav className="space-y-1">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 relative group",
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,245,255,0.08)]"
                              : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border/60 hover:bg-card/40"
                          )}
                        >
                          {link.icon}
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            <div className="border-t border-border/80 pt-4 mt-2">
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <LogOut size={14} />
                {signingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-md flex flex-col p-6 pt-24 border-b border-border">
            <div className="flex-1 overflow-y-auto space-y-6">
              {navigationGroups.map((group) => (
                <div key={group.groupName} className="space-y-2">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] block px-2">
                    {group.groupName}
                  </span>
                  <nav className="flex flex-col gap-1.5">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3.5 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all",
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/25 shadow-sm"
                              : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-card/40"
                          )}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 mt-6">
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 rounded-xl transition-all cursor-pointer"
              >
                <LogOut size={15} />
                {signingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        )}

        {/* Content Workspace Container */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
