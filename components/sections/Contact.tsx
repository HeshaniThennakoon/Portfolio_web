"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Mail, Phone, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={18} />,
      label: "Email Me",
      value: "thennakoonghm@gmail.com",
      href: "mailto:thennakoonghm@gmail.com",
    },
    {
      icon: <Phone className="text-primary" size={18} />,
      label: "Call Me",
      value: "+94 75 816 7490",
      href: "tel:+94758167490",
    },
    {
      icon: <Github className="text-primary" size={18} />,
      label: "GitHub Profile",
      value: "github.com/HeshaniThennakoon",
      href: "https://github.com/HeshaniThennakoon",
    },
    {
      icon: <Linkedin className="text-primary" size={18} />,
      label: "LinkedIn Profile",
      value: "linkedin.com/in/heshani-thennakoon",
      href: "https://www.linkedin.com/in/heshani-thennakoon-46538a2b7/",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all form fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await submitContactForm(form);
      if (result.success) {
        toast.success(result.message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred while sending your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="Interested in collaborating or discussing opportunities? Let's build something amazing together."
          badge="Contact"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Left Column: Direct details */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-none hover:border-primary/50 transition-colors group"
              >
                <div className="p-3 border border-primary/20 bg-primary/5 text-foreground shrink-0 rounded-none group-hover:border-primary/50 transition-colors">
                  {info.icon}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-muted-foreground">
                    {info.label}
                  </span>
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wide text-foreground hover:text-primary transition-colors mt-1.5 truncate"
                  >
                    {info.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Contact Form Panel */}
          <div className="lg:col-span-7 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full border border-border bg-card p-6 sm:p-8 flex flex-col justify-between rounded-none hover:border-primary/40 transition-colors duration-300 relative"
            >
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-border/40" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-[10px] font-bold font-mono uppercase tracking-wider text-foreground">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="YOUR NAME"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-xs focus:outline-none focus:border-primary text-foreground font-mono uppercase tracking-wide rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-[10px] font-bold font-mono uppercase tracking-wider text-foreground">
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="NAME@EXAMPLE.COM"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-xs focus:outline-none focus:border-primary text-foreground font-mono uppercase tracking-wide rounded-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-subject" className="text-[10px] font-bold font-mono uppercase tracking-wider text-foreground">
                    Subject
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="COLLABORATION INQUIRY"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 text-xs focus:outline-none focus:border-primary text-foreground font-mono uppercase tracking-wide rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-[10px] font-bold font-mono uppercase tracking-wider text-foreground">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="TELL ME ABOUT YOUR PROJECT..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-3 text-xs focus:outline-none focus:border-primary resize-none text-foreground font-mono uppercase tracking-wide rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono text-xs uppercase tracking-widest font-bold py-3.5 transition-all duration-300 rounded-none bg-transparent"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
