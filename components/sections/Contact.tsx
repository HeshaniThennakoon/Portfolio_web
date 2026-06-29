"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Mail, Phone, Github, Linkedin, Send, Loader2, Facebook } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions";
import type { SocialLinks } from "@/lib/data";

interface ContactProps {
  socialLinks?: SocialLinks;
}

export function Contact({ socialLinks }: ContactProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const fallbackSocials: SocialLinks = {
    email: "thennakoonghm@gmail.com",
    phone: "+94 75 816 7490",
    github: "https://github.com/HeshaniThennakoon",
    linkedin: "https://www.linkedin.com/in/heshani-thennakoon-46538a2b7/",
    facebook: "https://web.facebook.com/heshani.maduwanthi.7568",
  };

  const socials = socialLinks || fallbackSocials;

  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={18} />,
      label: "Email Me",
      value: socials.email,
      href: `mailto:${socials.email}`,
      show: !!socials.email,
    },
    {
      icon: <Phone className="text-primary" size={18} />,
      label: "Call Me",
      value: socials.phone,
      href: `tel:${socials.phone.replace(/\s+/g, "")}`,
      show: !!socials.phone,
    },
    {
      icon: <Github className="text-primary" size={18} />,
      label: "GitHub Profile",
      value: socials.github.replace("https://", "").replace("www.", ""),
      href: socials.github,
      show: !!socials.github,
    },
    {
      icon: <Linkedin className="text-primary" size={18} />,
      label: "LinkedIn Profile",
      value: socials.linkedin.replace("https://", "").replace("www.", ""),
      href: socials.linkedin,
      show: !!socials.linkedin,
    },
    {
      icon: <Facebook className="text-primary" size={18} />,
      label: "Facebook Profile",
      value: socials.facebook.replace("https://", "").replace("www.", ""),
      href: socials.facebook,
      show: !!socials.facebook,
    },
  ].filter(info => info.show);

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
    <section id="contact" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="Interested in collaborating or discussing opportunities? Let's build something amazing together."
          badge="CONTACT"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch z-10 relative">
          
          {/* Left Column: Direct details */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-3xl hover:border-primary/45 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,245,255,0.08)] transition-all group"
              >
                <div className="p-3 border border-primary/15 bg-primary/5 text-foreground shrink-0 rounded-2xl group-hover:border-primary/40 group-hover:shadow-[0_0_10px_rgba(0,245,255,0.15)] transition-all">
                  {info.icon}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {info.label}
                  </span>
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-xs sm:text-sm font-bold tracking-wide text-foreground hover:text-primary transition-colors mt-1.5 truncate"
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
              className="h-full border border-border bg-card p-6 sm:p-8 flex flex-col justify-between rounded-3xl hover:border-primary/35 transition-all duration-300 relative"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3.5 text-xs focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] text-foreground tracking-wide rounded-2xl transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3.5 text-xs focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] text-foreground tracking-wide rounded-2xl transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-subject" className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Subject
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="Collaboration Inquiry"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3.5 text-xs focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] text-foreground tracking-wide rounded-2xl transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-input border border-border px-4 py-3.5 text-xs focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] resize-none text-foreground tracking-wide rounded-2xl transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer inline-flex items-center justify-center gap-2 bg-primary border border-primary text-primary-foreground hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] font-bold text-xs uppercase tracking-wider py-4 transition-all duration-300 rounded-2xl mt-2"
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
