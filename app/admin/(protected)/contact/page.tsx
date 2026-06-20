"use client";

import { useEffect, useState } from "react";
import { replyToContact, deleteContactSubmission, getContactsAction } from "@/app/actions";
import type { ContactSubmission } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Trash2, MailQuestion, CheckCircle2, CornerUpLeft, X, Send } from "lucide-react";

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
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-3xl font-black text-white">Contact Inbox</h1>
        <p className="text-sm text-slate-400 mt-1">
          Review visitor submissions and send direct email responses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List Table */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800">
            <h3 className="font-bold text-white text-lg">Inbox Submissions ({contacts.length})</h3>
          </div>

          <div className="p-0">
            {contacts.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-12">
                No submissions received yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/50 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Sender</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {contacts.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => {
                          setActiveMessage(c);
                          setReplyOpen(false);
                        }}
                        className={`hover:bg-slate-800/10 cursor-pointer transition-colors ${
                          activeMessage?.id === c.id ? "bg-slate-800/20" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-white">
                          <div>{c.name}</div>
                          <div className="text-xs font-semibold text-slate-500 mt-0.5">{c.email}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">{c.subject}</td>
                        <td className="px-6 py-4">
                          {c.replied ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5">
                              <CheckCircle2 size={10} />
                              Replied
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-0.5">
                              Unread
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                            title="Delete submission"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Message Reading / Replying View */}
        <div className="lg:col-span-5">
          {activeMessage ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6 shadow-xl relative">
              <div className="border-b border-slate-800 pb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                  Message Details
                </h4>
                <h3 className="text-lg font-bold text-white">{activeMessage.subject}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Received on {new Date(activeMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-500 font-bold block">From:</span>
                  <span className="text-sm text-slate-200 font-semibold">{activeMessage.name} ({activeMessage.email})</span>
                </div>
                {activeMessage.phone && (
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Phone:</span>
                    <span className="text-sm text-slate-200 font-semibold">{activeMessage.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-xs text-slate-500 font-bold block">Message Body:</span>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed bg-slate-950 border border-slate-850 rounded-xl p-4 mt-1.5 whitespace-pre-wrap">
                    {activeMessage.message}
                  </p>
                </div>
              </div>

              {!replyOpen ? (
                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setReplyOpen(true)}
                    className="flex-1 cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <CornerUpLeft size={14} />
                    Draft Reply
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">
                      Compose Reply Email
                    </h4>
                    <button
                      type="button"
                      onClick={() => setReplyOpen(false)}
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    placeholder="Type your response email..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-primary resize-none"
                  />

                  <button
                    type="submit"
                    disabled={sendingReply || !replyContent}
                    className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-850 bg-slate-900/30 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
              <MailQuestion className="text-slate-600 mb-4 animate-bounce" size={48} />
              <h3 className="font-bold text-slate-400 text-base">No Message Selected</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                Click on a message row in the list to read it and compose replies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
