import { getProjects, getSkills, getContacts } from "@/lib/data";
import Link from "next/link";
import { FolderKanban, Code2, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export const revalidate = 0;

export default async function AdminDashboard() {
  const projects = await getProjects();
  const skills = await getSkills();
  const contacts = await getContacts();

  const totalSkills = skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  const unreadContacts = contacts.filter((c) => !c.replied).length;

  const dashboardCards = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: <FolderKanban className="text-primary" size={24} />,
      link: "/admin/projects",
    },
    {
      label: "Configured Skills",
      value: totalSkills,
      icon: <Code2 className="text-secondary" size={24} />,
      link: "/admin/skills",
    },
    {
      label: "Unread Messages",
      value: unreadContacts,
      icon: unreadContacts > 0 ? <AlertCircle className="text-rose-500 animate-pulse" size={24} /> : <Mail className="text-accent" size={24} />,
      link: "/admin/contact",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Dashboard</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Portfolio Overview & Analytics
        </p>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardCards.map((card, idx) => (
          <GlassCard
            key={card.label}
            hoverEffect={true}
            animate={true}
            delay={idx * 0.1}
            className="p-6 border border-border/80 bg-card/40 backdrop-blur-md flex items-center justify-between shadow-lg"
          >
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">{card.label}</span>
              <span className="text-3xl font-black text-foreground block tracking-tight">{card.value}</span>
              <Link href={card.link} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors pt-2 select-none">
                Manage Details
                <ArrowRight size={10} />
              </Link>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border/80 shadow-inner shrink-0 ml-4">
              {card.icon}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Recent Contact Form submissions */}
      <GlassCard hoverEffect={false} animate={true} delay={0.3} className="border border-border/80 bg-card/30 backdrop-blur-md overflow-hidden p-0 rounded-3xl">
        <div className="p-6 border-b border-border/80 flex items-center justify-between bg-card/20">
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Recent Inbox Submissions</h3>
          <Link href="/admin/contact" className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1 select-none">
            View All Inbox
            <ArrowRight size={10} />
          </Link>
        </div>

        <div className="p-6">
          {contacts.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8 uppercase tracking-widest">
              No messages received yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-foreground">
                <thead className="bg-muted/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/80">
                  <tr>
                    <th className="px-4 py-3.5">Name</th>
                    <th className="px-4 py-3.5">Subject</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {contacts.slice(0, 5).map((contact) => (
                    <tr key={contact.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4 font-bold text-foreground">{contact.name}</td>
                      <td className="px-4 py-4 max-w-xs truncate text-muted-foreground">{contact.subject}</td>
                      <td className="px-4 py-4 font-semibold text-muted-foreground/80">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        {contact.replied ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5 select-none">
                            <CheckCircle2 size={10} />
                            Replied
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-0.5 animate-pulse select-none">
                            Unread
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
