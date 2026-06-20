"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Project } from "@/lib/data";
import { Github, ExternalLink, Sparkles } from "lucide-react";

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  const [filter, setFilter] = useState<"all" | "ai" | "web" | "mobile">("all");

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

  const filteredProjects = data.filter(filterProject);

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="A showcase of software systems I have designed, engineered, and deployed."
          badge="Portfolio"
        />

        {/* Filters - Sharp flat chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(["all", "ai", "web", "mobile"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 text-xs font-bold font-mono uppercase tracking-wider rounded-none border transition-all cursor-pointer ${
                filter === category
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {category === "all" ? "All Projects" : category === "ai" ? "AI & Computer Vision" : category === "web" ? "Web Apps" : "Mobile Apps"}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFeatured = project.featured;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`flex flex-col group border border-border overflow-hidden bg-card hover:border-primary/50 transition-all duration-300 shadow-sm ${
                    isFeatured ? "md:col-span-2 lg:col-span-2 flex-row md:flex-row" : ""
                  } rounded-none`}
                >
                  {/* Thumbnail / Image placeholder with duotone overlay */}
                  <div className={`relative overflow-hidden bg-muted flex items-center justify-center min-h-[220px] ${
                    isFeatured ? "md:w-1/2" : "w-full"
                  } rounded-none`}>
                    {project.imageUrl && project.imageUrl.startsWith("/uploads/") && !project.imageUrl.includes("placeholder") ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover teal-duotone"
                      />
                    ) : (
                      /* Stunning Dynamic Grid Placeholder with initials */
                      <div className="p-8 text-center flex flex-col items-center justify-center h-full w-full select-none">
                        <div className="w-14 h-14 rounded-none border border-primary/30 text-primary bg-primary/5 flex items-center justify-center font-mono font-bold text-lg mb-3">
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-foreground text-xs uppercase tracking-wider font-mono">
                          {project.title}
                        </span>
                        <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1.5 font-mono">
                          // STATIC SOURCE
                        </span>
                      </div>
                    )}

                    {/* Featured Ribbon - Sharp corner */}
                    {isFeatured && (
                      <span className="absolute top-0 left-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground bg-primary px-3 py-1.5 font-mono shadow-sm rounded-none">
                        <Sparkles size={11} />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className={`p-6 flex flex-col justify-between ${
                    isFeatured ? "md:w-1/2" : "w-full"
                  }`}>
                    <div>
                      <h3 className="text-lg font-bold text-foreground font-mono uppercase tracking-wider mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs font-normal text-muted-foreground leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-[10px] font-bold font-mono uppercase tracking-wider text-muted-foreground mb-2">// KEY FEATURES:</h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, fIdx) => (
                            <li key={fIdx} className="text-xs text-foreground flex items-start gap-2">
                              <span className="text-primary font-bold font-mono">&gt;</span>
                              <span className="text-muted-foreground/90">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      {/* Tech Pills - Sharp custom borders */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-bold text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded-none font-mono uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                          >
                            <Github size={13} className="text-primary" />
                            Repository
                          </a>
                        )}
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink size={13} />
                            Live Demo
                          </a>
                        ) : (
                          <span className="text-[9px] text-muted-foreground font-bold font-mono uppercase tracking-wider bg-background border border-border px-2 py-1">
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
      </div>
    </section>
  );
}
