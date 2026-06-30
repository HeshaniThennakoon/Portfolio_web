import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getHero, getOgSettings } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Briefcase, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, hero, ogSettings] = await Promise.all([
    getProjectBySlug(slug),
    getHero(),
    getOgSettings(),
  ]);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = ogSettings.siteUrl || "https://heshani.dev";
  const tagline = project.description || `Case study for ${project.title}.`;
  const ogImageUrl = `/api/og?type=project&slug=${slug}`;

  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = new URL(siteUrl);
  } catch (e) {
    metadataBase = new URL("http://localhost:3000");
  }

  return {
    title: `${project.title} | ${hero.name} Project`,
    description: tagline,
    metadataBase,
    openGraph: {
      type: "article",
      url: `${siteUrl}/projects/${slug}`,
      siteName: ogSettings.siteName || `${hero.name} Portfolio`,
      title: `${project.title} | ${hero.name}`,
      description: tagline,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${hero.name}`,
      description: tagline,
      images: [ogImageUrl],
      creator: ogSettings.twitterHandle || undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const heroData = await getHero();

  if (!project) {
    notFound();
  }

  const primaryRole = heroData.roles[0] || "Software Engineer";

  return (
    <>
      <Navbar brandName={heroData.name} subtitle={primaryRole} />
      
      <main className="flex-1 pt-32 pb-24 bg-background relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Project Title & Meta Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2 block">
                Project Case Study
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-foreground uppercase tracking-wide leading-none">
                {project.title}
              </h1>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-card border border-border hover:border-primary/45 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,245,255,0.08)]"
                >
                  <Github size={15} />
                  GitHub Repository
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:shadow-primary/15"
                >
                  <ExternalLink size={15} />
                  Live Preview
                </a>
              )}
            </div>
          </div>

          {/* Project Banner Image */}
          {project.imageUrl && (
            <div className="w-full h-[280px] sm:h-[450px] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl relative group mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Meta Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 bg-card/30 border border-border/60 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/5 text-primary">
                <Briefcase size={16} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">My Role</span>
                <span className="text-xs font-bold text-foreground">{project.role || "Lead Developer"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/5 text-primary">
                <Calendar size={16} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Timeline</span>
                <span className="text-xs font-bold text-foreground">{project.duration || "Ongoing"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/5 text-primary">
                <Users size={16} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Team Size</span>
                <span className="text-xs font-bold text-foreground">{project.teamSize || "Solo Project"}</span>
              </div>
            </div>
          </div>

          {/* Technical Stack Breakdown */}
          <div className="mb-12">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Core Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-border bg-card text-foreground select-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Narrative sections */}
          <div className="space-y-12">
            {/* Challenge */}
            {project.challenge && (
              <div className="space-y-4">
                <h2 className="text-lg font-black text-foreground uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-border/80">
                  <span className="text-primary font-mono font-bold text-sm">01.</span>
                  The Problem & Challenge
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div className="space-y-4">
                <h2 className="text-lg font-black text-foreground uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-border/80">
                  <span className="text-primary font-mono font-bold text-sm">02.</span>
                  The Solution & Engineering Approach
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <div className="space-y-4">
                <h2 className="text-lg font-black text-foreground uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-border/80">
                  <span className="text-primary font-mono font-bold text-sm">03.</span>
                  Project Outcomes & Impact
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Screenshots grid */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-6 pt-6">
                <h2 className="text-lg font-black text-foreground uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-border/80">
                  <span className="text-primary font-mono font-bold text-sm">04.</span>
                  System Interface & Screenshots
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((url, idx) => (
                    <div key={idx} className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:border-primary/45 transition-colors relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features list */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-6 pt-6">
                <h2 className="text-lg font-black text-foreground uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-border/80">
                  <span className="text-primary font-mono font-bold text-sm">05.</span>
                  Key Features & Features Overview
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat) => (
                    <li key={feat} className="flex gap-3 items-start bg-card/25 border border-border/60 rounded-2xl p-4">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-xs font-bold text-foreground leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer brandName={heroData.name} />
    </>
  );
}
