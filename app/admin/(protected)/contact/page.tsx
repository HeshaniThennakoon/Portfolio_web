"use client";

import { useEffect, useState } from "react";
import { replyToContact, deleteContactSubmission, getContactsAction } from "@/app/actions";
import type { ContactSubmission } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Trash2, MailQuestion, CheckCircle2, CornerUpLeft, X, Send } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function ContactInboxPage() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [activeMessage, setActiveMessage] = useState<ContactSubmission | null>(null);
  
  // Reply modal state
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  async function loadData() {
    try {
      const data = await getContactsAction();
      setContacts(data);
    } catch (err) {
      toast.error("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await deleteContactSubmission(id);
      if (res.success) {
        toast.success(res.message);
        loadData();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Deletion failed.");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage || !replyContent) return;

    setSendingReply(true);
    try {
      const res = await replyToContact(activeMessage.id, replyContent);
      if (res.success) {
        toast.success(res.message);
        setReplyContent("");
        setReplyOpen(false);
        setActiveMessage(null);
        loadData();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("An error occurred while sending email reply.");
    } finally {
      setSendingReply(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Contact Inbox</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Review visitor submissions and send direct email responses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List Table */}
        <GlassCard hoverEffect={false} className="lg:col-span-7 rounded-3xl border border-border/80 bg-card/30 backdrop-blur-md overflow-hidden shadow-xl p-0">
          <div className="p-6 border-b border-border/80 bg-card/20">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Inbox Submissions ({contacts.length})</h3>
          </div>

          <div className="p-0">
            {contacts.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-12 uppercase tracking-widest">
                No submissions received yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-foreground">
                  <thead className="bg-muted/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="px-6 py-4">Sender</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {contacts.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => {
                          setActiveMessage(c);
                          setReplyOpen(false);
                        }}
                        className={`hover:bg-muted/20 cursor-pointer transition-colors ${
                          activeMessage?.id === c.id ? "bg-muted/30" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-foreground">
                          <div>{c.name}</div>
                          <div className="text-[10px] font-semibold text-muted-foreground mt-0.5">{c.email}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate text-muted-foreground">{c.subject}</td>
                        <td className="px-6 py-4">
                          {c.replied ? (
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
                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm"
                            title="Delete submission"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Message Reading / Replying View */}
        <div className="lg:col-span-5">
          {activeMessage ? (
            <GlassCard hoverEffect={false} className="rounded-3xl border border-border/80 bg-card/30 backdrop-blur-md p-6 space-y-6 shadow-xl relative animate-in fade-in duration-300">
              <div className="border-b border-border/80 pb-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Message Details
                </h4>
                <h3 className="text-base font-bold text-foreground">{activeMessage.subject}</h3>
                <p className="text-[10px] font-semibold text-muted-foreground mt-1">
                  Received on {new Date(activeMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">From:</span>
                  <span className="text-xs text-foreground font-semibold">{activeMessage.name} ({activeMessage.email})</span>
                </div>
                {activeMessage.phone && (
                  <div>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Phone:</span>
                    <span className="text-xs text-foreground font-semibold">{activeMessage.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Message Body:</span>
                  <p className="text-xs font-medium text-foreground leading-relaxed bg-background border border-border/80 rounded-xl p-4 mt-1.5 whitespace-pre-wrap shadow-inner">
                    {activeMessage.message}
                  </p>
                </div>
              </div>

              {!replyOpen ? (
                <div className="flex gap-3 pt-4 border-t border-border/80">
                  <button
                    onClick={() => setReplyOpen(true)}
                    className="flex-1 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <CornerUpLeft size={14} />
                    Draft Reply
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-border/80">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                      Compose Reply Email
                    </h4>
                    <button
                      type="button"
                      onClick={() => setReplyOpen(false)}
                      className="p-1 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    placeholder="Type your response email..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl p-4 text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none leading-relaxed"
                  />

                  <button
                    type="submit"
                    disabled={sendingReply || !replyContent}
                    className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-555 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {sendingReply ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        Sending Reply...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Reply Email
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          ) : (
            <GlassCard hoverEffect={false} className="rounded-3xl border border-border/70 bg-card/10 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center min-h-[300px] shadow-sm select-none">
              <MailQuestion className="text-muted-foreground/45 mb-4 animate-bounce" size={48} />
              <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider">No Message Selected</h3>
              <p className="text-[10px] text-muted-foreground/60 mt-1.5 max-w-[240px] uppercase tracking-wider leading-relaxed">
                Click on a message row in the list to read and reply.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
