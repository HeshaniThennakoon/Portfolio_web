"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Project } from "@/lib/data";
import { Github, ExternalLink, Award, Sparkles } from "lucide-react";

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
    <section id="projects" className="py-20 bg-background relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="A showcase of software systems I have designed, engineered, and deployed."
          badge="Portfolio"
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(["all", "ai", "web", "mobile"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-full border transition-all cursor-pointer capitalize ${
                filter === category
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-border"
              }`}
            >
              {category === "all" ? "All Projects" : category === "ai" ? "AI & Computer Vision" : category === "web" ? "Web Apps" : "Mobile Apps"}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isFeatured = project.featured;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col group rounded-3xl border border-border overflow-hidden bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-2xl ${
                    isFeatured ? "md:col-span-2 lg:col-span-2 flex-row md:flex-row" : ""
                  }`}
                >
                  {/* Thumbnail / Image placeholder */}
                  <div className={`relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center min-h-[220px] ${
                    isFeatured ? "md:w-1/2" : "w-full"
                  }`}>
                    {project.imageUrl && project.imageUrl.startsWith("/uploads/") && !project.imageUrl.includes("placeholder") ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      /* Stunning Dynamic Gradient Placeholder with text tags */
                      <div className="p-8 text-center flex flex-col items-center justify-center h-full w-full">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 text-primary flex items-center justify-center font-bold text-lg mb-3">
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-foreground text-sm line-clamp-1">
                          {project.title}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1 bg-card border border-border rounded-full px-2.5 py-0.5 font-medium">
                          Placeholder image
                        </span>
                      </div>
                    )}

                    {/* Featured Ribbon */}
                    {isFeatured && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white bg-primary px-3 py-1 rounded-full shadow-lg">
                        <Sparkles size={12} />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className={`p-6 flex flex-col justify-between ${
                    isFeatured ? "md:w-1/2" : "w-full"
                  }`}>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5">
                          {project.features.map((feature, fIdx) => (
                            <li key={fIdx} className="text-xs font-medium text-foreground flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {feature}
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
                            className="text-[10px] font-bold text-muted-foreground bg-card border border-border px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors"
                          >
                            <Github size={14} />
                            Source Code
                          </a>
                        )}
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider bg-card border border-border px-2 py-1 rounded">
                            Local Deployment
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
