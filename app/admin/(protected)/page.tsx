import { getProjects, getSkills, getContacts } from "@/lib/data";
import Link from "next/link";
import { FolderKanban, Code2, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Welcome back, Heshani Thennakoon. Here is the overview of your portfolio.
        </p>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <div key={card.label} className="p-6 rounded-2xl border border-slate-800 bg-slate-900 flex items-center justify-between shadow-lg">
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-400 block">{card.label}</span>
              <span className="text-3xl font-black text-white block">{card.value}</span>
              <Link href={card.link} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors pt-2">
                Manage Details
                <ArrowRight size={12} />
              </Link>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contact Form submissions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-lg">Recent Inbox Submissions</h3>
          <Link href="/admin/contact" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            View All Inbox
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="p-6">
          {contacts.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">
              No messages received yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {contacts.slice(0, 5).map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-800/20">
                      <td className="px-4 py-4 font-bold text-white">{contact.name}</td>
                      <td className="px-4 py-4 max-w-xs truncate">{contact.subject}</td>
                      <td className="px-4 py-4 text-xs font-medium text-slate-400">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        {contact.replied ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5">
                            <CheckCircle2 size={10} />
                            Replied
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-0.5 animate-pulse">
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
      </div>
    </div>
  );
}
