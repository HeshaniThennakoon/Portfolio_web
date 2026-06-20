import { checkAuth } from "@/lib/auth";
import { logoutAdmin } from "@/app/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  LayoutDashboard,
  Sparkles,
  UserCheck,
  Code2,
  Briefcase,
  GraduationCap,
  Trophy,
  MailOpen,
  Settings,
  LogOut,
  FolderKanban,
  ExternalLink
} from "lucide-react";

export const revalidate = 0;

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Hero Info", href: "/admin/hero", icon: <Sparkles size={18} /> },
  { label: "About Info", href: "/admin/about", icon: <UserCheck size={18} /> },
  { label: "Skills", href: "/admin/skills", icon: <Code2 size={18} /> },
  { label: "Experience", href: "/admin/experience", icon: <Briefcase size={18} /> },
  { label: "Projects", href: "/admin/projects", icon: <FolderKanban size={18} /> },
  { label: "Education", href: "/admin/education", icon: <GraduationCap size={18} /> },
  { label: "Achievements", href: "/admin/achievements", icon: <Trophy size={18} /> },
  { label: "Contact Inbox", href: "/admin/contact", icon: <MailOpen size={18} /> },
  { label: "System Settings", href: "/admin/settings", icon: <Settings size={18} /> },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await checkAuth();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const handleLogout = async () => {
    "use server";
    await logoutAdmin();
    revalidatePath("/admin");
    redirect("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-black text-2xl">
                HT
              </span>
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Admin Panel
              </span>
            </Link>
            <Link href="/" target="_blank" className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white" title="View Portfolio Website">
              <ExternalLink size={16} />
            </Link>
          </div>

          <nav className="mt-8 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800">
          <form action={handleLogout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Workspace container */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-6 sm:px-8">
          <h2 className="text-base font-bold text-slate-300">Management Workspace</h2>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Online
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
