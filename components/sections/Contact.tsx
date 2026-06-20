"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { GlassCard } from "../shared/GlassCard";
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
      icon: <Mail className="text-primary" size={20} />,
      label: "Email Me",
      value: "thennakoonghm@gmail.com",
      href: "mailto:thennakoonghm@gmail.com",
    },
    {
      icon: <Phone className="text-secondary" size={20} />,
      label: "Call Me",
      value: "+94 75 816 7490",
      href: "tel:+94758167490",
    },
    {
      icon: <Github className="text-accent" size={20} />,
      label: "GitHub Profile",
      value: "github.com/HeshaniThennakoon",
      href: "https://github.com/HeshaniThennakoon",
    },
    {
      icon: <Linkedin className="text-primary" size={20} />,
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
    <section id="contact" className="py-20 bg-slate-50 dark:bg-[#0D0D0D] relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="Interested in collaborating or discussing opportunities? Let's build something amazing together."
          badge="Contact"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          {/* Left Column: Direct details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {contactInfo.map((info, idx) => (
              <GlassCard
                key={idx}
                delay={idx * 0.1}
                hoverEffect
                className="flex items-center gap-4 p-5 hover:translate-x-[4px] transition-all border border-border"
              >
                <div className="p-3 rounded-2xl bg-card border border-border text-foreground shrink-0 shadow-sm">
                  {info.icon}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {info.label}
                  </span>
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors mt-0.5 truncate"
                  >
                    {info.value}
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Right Column: Contact Form Panel */}
          <div className="lg:col-span-7 h-full">
            <GlassCard hoverEffect={false} className="h-full border border-border p-6 sm:p-8 flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs font-bold text-foreground">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-xs font-bold text-foreground">
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-subject" className="text-xs font-bold text-foreground">
                    Subject
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="Project inquiry / collaboration"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-xs font-bold text-foreground">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none text-foreground"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all text-sm uppercase tracking-wider"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
