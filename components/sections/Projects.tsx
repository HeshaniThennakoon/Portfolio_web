"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Project } from "@/lib/data";
import { Github, ExternalLink, Sparkles, ChevronDown } from "lucide-react";

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  const [filter, setFilter] = useState<"all" | "ai" | "web" | "mobile">("all");
  const [showAll, setShowAll] = useState(false);

  const filterProject = (project: Project) => {
    if (filter === "all") return true;
    const techs = project.technologies.map(t => t.toLowerCase());
    
    if (filter === "ai") {
      return techs.includes("python") || techs.includes("opencv") || techs.includes("cnn") || techs.includes("tensorflow");
    }
    if (filter === "web") {
      return techs.includes("react") || techs.includes("node.js") || techs.includes("node") || techs.includes("express") || techs.includes("php") || techs.includes("blazor") || techs.includes("angular") || techs.includes("html") || techs.includes("next.js") || techs.includes("javascript") || techs.includes("typescript");
    }
    if (filter === "mobile") {
      return techs.includes("flutter") || techs.includes("dart");
    }
    return true;
  };

  const INITIAL_VISIBLE = 5;
  const filteredProjects = data.filter(filterProject);
  const hasMore = filteredProjects.length > INITIAL_VISIBLE;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="A showcase of software systems I have designed, engineered, and deployed."
          badge="PORTFOLIO"
        />

        {/* Filters - Neon Outline Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 z-10 relative">
          {(["all", "ai", "web", "mobile"] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category);
                setShowAll(false);
              }}
              className={`px-5 py-2.5 text-xs font-bold font-sans uppercase tracking-wider rounded-2xl border transition-all cursor-pointer ${
                filter === category
                  ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {category === "all" ? "All Projects" : category === "ai" ? "AI & CV" : category === "web" ? "Web Apps" : "Mobile Apps"}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => {
              const isFeatured = project.featured;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`flex flex-col group border border-border overflow-hidden bg-card hover:border-primary/45 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_35px_rgba(0,245,255,0.12)] ${
                    isFeatured ? "md:col-span-2 lg:col-span-2 md:flex-row" : ""
                  } rounded-3xl`}
                >
                  {/* Thumbnail / Image placeholder with gradient overlay */}
                  <div className={`relative overflow-hidden bg-muted flex items-center justify-center min-h-[240px] ${
                    isFeatured ? "md:w-1/2" : "w-full"
                  }`}>
                    {project.imageUrl && project.imageUrl.startsWith("/uploads/") && !project.imageUrl.includes("placeholder") ? (
                      <div className="relative w-full h-full min-h-[240px] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60" />
                      </div>
                    ) : (
                      /* Dynamic Gradient Placeholder */
                      <div className="p-8 text-center flex flex-col items-center justify-center h-full w-full min-h-[240px] bg-gradient-to-br from-muted via-muted/50 to-primary/10 select-none">
                        <div className="w-14 h-14 rounded-2xl border border-primary/20 text-primary bg-primary/5 flex items-center justify-center font-sans font-extrabold text-lg mb-3 shadow-[0_0_15px_rgba(0,245,255,0.05)] group-hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] group-hover:border-primary/40 transition-all">
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-foreground text-xs uppercase tracking-wider">
                          {project.title}
                        </span>
                        <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1.5 font-mono">
                          // REPOSITORY SOURCE
                        </span>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {isFeatured && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground bg-primary px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                        <Sparkles size={11} />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className={`p-8 flex flex-col justify-between ${
                    isFeatured ? "md:w-1/2" : "w-full"
                  }`}>
                    <div>
                      <h3 className="text-xl font-bold text-foreground tracking-wide mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2.5">// KEY FEATURES:</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, fIdx) => (
                            <li key={fIdx} className="text-xs sm:text-sm text-foreground flex items-start gap-2">
                              <span className="text-primary font-bold shrink-0 mt-0.5">&gt;</span>
                              <span className="text-muted-foreground/90">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-bold text-primary border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border/80">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-all group/btn"
                          >
                            <Github size={14} className="text-primary group-hover/btn:scale-110 transition-transform" />
                            Repository
                          </a>
                        )}
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        ) : (
                          <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider bg-[#f4f4f5] dark:bg-[#0d0d0d] border border-border px-2.5 py-1.5 rounded-full">
                            Local Deploy
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show More / Less Toggle Button */}
        {hasMore && (
          <div className="flex justify-center mt-12 z-10 relative">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-xs font-bold font-sans uppercase tracking-wider rounded-2xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,245,255,0.1)] active:scale-95"
            >
              {showAll 
                ? "Show Less" 
                : `Show More Projects (+${filteredProjects.length - INITIAL_VISIBLE} more)`}
              <ChevronDown 
                size={15} 
                className={`text-primary transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`} 
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
