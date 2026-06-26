import { db } from "./db";

// Interfaces
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  darkBg: string;
  lightBg: string;
}

export interface AdminConfig {
  username: string;
  passwordHash: string;
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  toEmail: string;
}

export interface Settings {
  theme: ThemeConfig;
  admin: AdminConfig;
  emailConfig: EmailConfig;
}

export interface HeroInfo {
  name: string;
  headline: string;
  subheadline: string;
  roles: string[];
  stats: { label: string; value: string }[];
  resumeUrl: string;
  profileImg: string;
}

export interface AboutInfo {
  story: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  featured: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  focusAreas: string[];
}

export interface Achievements {
  leadership: string[];
  sports: string[];
  professional: string[];
}

export interface Service {
  id?: string;
  iconName: string;
  title: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  replied?: boolean;
}

// Data Access API using Prisma & MySQL
export async function getSettings(): Promise<Settings> {
  const record = await db.settings.findFirst({
    where: { id: 1 }
  });

  if (!record) {
    return {
      theme: { primary: "#2563EB", secondary: "#06B6D4", accent: "#8B5CF6", darkBg: "#0F172A", lightBg: "#F8FAFC" },
      admin: { username: "admin", passwordHash: "" },
      emailConfig: { smtpHost: "smtp.gmail.com", smtpPort: 465, smtpUser: "", smtpPass: "", toEmail: "thennakoonghm@gmail.com" }
    };
  }

  return {
    theme: {
      primary: record.primaryColor,
      secondary: record.secondaryColor,
      accent: record.accentColor,
      darkBg: record.darkBg,
      lightBg: record.lightBg,
    },
    admin: {
      username: record.username,
      passwordHash: record.passwordHash
    },
    emailConfig: {
      smtpHost: record.smtpHost,
      smtpPort: record.smtpPort,
      smtpUser: record.smtpUser,
      smtpPass: record.smtpPass,
      toEmail: record.toEmail,
    }
  };
}

export async function saveSettings(data: Settings): Promise<boolean> {
  try {
    await db.settings.upsert({
      where: { id: 1 },
      update: {
        primaryColor: data.theme.primary,
        secondaryColor: data.theme.secondary,
        accentColor: data.theme.accent,
        darkBg: data.theme.darkBg,
        lightBg: data.theme.lightBg,
        username: data.admin.username,
        passwordHash: data.admin.passwordHash,
        smtpHost: data.emailConfig.smtpHost,
        smtpPort: data.emailConfig.smtpPort,
        smtpUser: data.emailConfig.smtpUser,
        smtpPass: data.emailConfig.smtpPass,
        toEmail: data.emailConfig.toEmail,
      },
      create: {
        id: 1,
        primaryColor: data.theme.primary,
        secondaryColor: data.theme.secondary,
        accentColor: data.theme.accent,
        darkBg: data.theme.darkBg,
        lightBg: data.theme.lightBg,
        username: data.admin.username,
        passwordHash: data.admin.passwordHash,
        smtpHost: data.emailConfig.smtpHost,
        smtpPort: data.emailConfig.smtpPort,
        smtpUser: data.emailConfig.smtpUser,
        smtpPass: data.emailConfig.smtpPass,
        toEmail: data.emailConfig.toEmail,
      }
    });
    return true;
  } catch (error) {
    console.error("Error saving settings to MySQL:", error);
    return false;
  }
}

export async function getHero(): Promise<HeroInfo> {
  const record = await db.heroInfo.findFirst({
    where: { id: 1 }
  });

  if (!record) {
    return {
      name: "Heshani Thennakoon",
      headline: "Building Scalable Software Solutions with Modern Technologies",
      subheadline: "Passionate Software Engineer specializing in full-stack development, cloud technologies, AI-powered applications, and modern web solutions.",
      roles: ["Software Engineer", "Full-Stack Developer", "AI Engineer"],
      stats: [],
      resumeUrl: "/resume.pdf",
      profileImg: "/profile.jpg"
    };
  }

  return {
    name: record.name,
    headline: record.headline,
    subheadline: record.subheadline,
    roles: JSON.parse(record.roles),
    stats: JSON.parse(record.stats),
    resumeUrl: record.resumeUrl,
    profileImg: record.profileImg,
  };
}

export async function saveHero(data: HeroInfo): Promise<boolean> {
  try {
    await db.heroInfo.upsert({
      where: { id: 1 },
      update: {
        name: data.name,
        headline: data.headline,
        subheadline: data.subheadline,
        roles: JSON.stringify(data.roles),
        stats: JSON.stringify(data.stats),
        resumeUrl: data.resumeUrl,
        profileImg: data.profileImg,
      },
      create: {
        id: 1,
        name: data.name,
        headline: data.headline,
        subheadline: data.subheadline,
        roles: JSON.stringify(data.roles),
        stats: JSON.stringify(data.stats),
        resumeUrl: data.resumeUrl,
        profileImg: data.profileImg,
      }
    });
    return true;
  } catch (error) {
    console.error("Error saving hero to MySQL:", error);
    return false;
  }
}

export async function getAbout(): Promise<AboutInfo> {
  const record = await db.aboutInfo.findFirst({
    where: { id: 1 }
  });

  if (!record) {
    return { story: "", highlights: [] };
  }

  return {
    story: record.story,
    highlights: JSON.parse(record.highlights)
  };
}

export async function saveAbout(data: AboutInfo): Promise<boolean> {
  try {
    await db.aboutInfo.upsert({
      where: { id: 1 },
      update: {
        story: data.story,
        highlights: JSON.stringify(data.highlights),
      },
      create: {
        id: 1,
        story: data.story,
        highlights: JSON.stringify(data.highlights),
      }
    });
    return true;
  } catch (error) {
    console.error("Error saving about info to MySQL:", error);
    return false;
  }
}

export async function getSkills(): Promise<SkillCategory[]> {
  try {
    const records = await db.skillCategory.findMany({
      orderBy: { order: "asc" }
    });
    return records.map((r) => ({
      category: r.category,
      skills: JSON.parse(r.skills),
    }));
  } catch (error) {
    console.error("Error fetching skills from MySQL:", error);
    return [];
  }
}

export async function saveSkills(data: SkillCategory[]): Promise<boolean> {
  try {
    await db.skillCategory.deleteMany({});
    for (let i = 0; i < data.length; i++) {
      const s = data[i];
      await db.skillCategory.create({
        data: {
          category: s.category,
          skills: JSON.stringify(s.skills),
          order: i,
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error saving skills to MySQL:", error);
    return false;
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const records = await db.experience.findMany({
      orderBy: { order: "asc" }
    });
    return records.map((r) => ({
      id: r.id,
      role: r.role,
      company: r.company,
      location: r.location,
      period: r.period,
      responsibilities: JSON.parse(r.responsibilities),
      techStack: JSON.parse(r.techStack),
    }));
  } catch (error) {
    console.error("Error fetching experience from MySQL:", error);
    return [];
  }
}

export async function saveExperience(data: Experience[]): Promise<boolean> {
  try {
    await db.experience.deleteMany({});
    for (let i = 0; i < data.length; i++) {
      const exp = data[i];
      await db.experience.create({
        data: {
          id: exp.id || undefined,
          role: exp.role,
          company: exp.company,
          location: exp.location,
          period: exp.period,
          responsibilities: JSON.stringify(exp.responsibilities),
          techStack: JSON.stringify(exp.techStack),
          order: i,
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error saving experience to MySQL:", error);
    return false;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const records = await db.project.findMany({
      orderBy: { order: "asc" }
    });
    return records.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      technologies: JSON.parse(r.technologies),
      features: JSON.parse(r.features),
      githubUrl: r.githubUrl,
      demoUrl: r.demoUrl,
      imageUrl: r.imageUrl,
      featured: r.featured,
    }));
  } catch (error) {
    console.error("Error fetching projects from MySQL:", error);
    return [];
  }
}

export async function saveProjects(data: Project[]): Promise<boolean> {
  try {
    await db.project.deleteMany({});
    for (let i = 0; i < data.length; i++) {
      const proj = data[i];
      await db.project.create({
        data: {
          id: proj.id || undefined,
          title: proj.title,
          description: proj.description,
          technologies: JSON.stringify(proj.technologies),
          features: JSON.stringify(proj.features),
          githubUrl: proj.githubUrl,
          demoUrl: proj.demoUrl,
          imageUrl: proj.imageUrl,
          featured: proj.featured,
          order: i,
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error saving projects to MySQL:", error);
    return false;
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const records = await db.education.findMany({
      orderBy: { order: "asc" }
    });
    return records.map((r) => ({
      id: r.id,
      degree: r.degree,
      institution: r.institution,
      period: r.period,
      focusAreas: JSON.parse(r.focusAreas),
    }));
  } catch (error) {
    console.error("Error fetching education from MySQL:", error);
    return [];
  }
}

export async function saveEducation(data: Education[]): Promise<boolean> {
  try {
    await db.education.deleteMany({});
    for (let i = 0; i < data.length; i++) {
      const edu = data[i];
      await db.education.create({
        data: {
          id: edu.id || undefined,
          degree: edu.degree,
          institution: edu.institution,
          period: edu.period,
          focusAreas: JSON.stringify(edu.focusAreas),
          order: i,
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error saving education to MySQL:", error);
    return false;
  }
}

export async function getAchievements(): Promise<Achievements> {
  const record = await db.achievements.findFirst({
    where: { id: 1 }
  });

  if (!record) {
    return { leadership: [], sports: [], professional: [] };
  }

  return {
    leadership: JSON.parse(record.leadership),
    sports: JSON.parse(record.sports),
    professional: JSON.parse(record.professional),
  };
}

export async function saveAchievements(data: Achievements): Promise<boolean> {
  try {
    await db.achievements.upsert({
      where: { id: 1 },
      update: {
        leadership: JSON.stringify(data.leadership),
        sports: JSON.stringify(data.sports),
        professional: JSON.stringify(data.professional),
      },
      create: {
        id: 1,
        leadership: JSON.stringify(data.leadership),
        sports: JSON.stringify(data.sports),
        professional: JSON.stringify(data.professional),
      }
    });
    return true;
  } catch (error) {
    console.error("Error saving achievements to MySQL:", error);
    return false;
  }
}

export async function getContacts(): Promise<ContactSubmission[]> {
  try {
    const records = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" }
    });
    return records.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone || undefined,
      subject: r.subject,
      message: r.message,
      createdAt: r.createdAt.toISOString(),
      replied: r.replied,
    }));
  } catch (error) {
    console.error("Error fetching contacts from MySQL:", error);
    return [];
  }
}

export async function saveContacts(data: ContactSubmission[]): Promise<boolean> {
  try {
    await db.contactSubmission.deleteMany({});
    for (const c of data) {
      await db.contactSubmission.create({
        data: {
          id: c.id || undefined,
          name: c.name,
          email: c.email,
          phone: c.phone || null,
          subject: c.subject,
          message: c.message,
          createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
          replied: c.replied || false,
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error saving contacts to MySQL:", error);
    return false;
  }
}

export async function addContact(
  contact: Omit<ContactSubmission, "id" | "createdAt" | "replied">
): Promise<ContactSubmission> {
  const newRecord = await db.contactSubmission.create({
    data: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone || null,
      subject: contact.subject,
      message: contact.message,
    }
  });

  return {
    id: newRecord.id,
    name: newRecord.name,
    email: newRecord.email,
    phone: newRecord.phone || undefined,
    subject: newRecord.subject,
    message: newRecord.message,
    createdAt: newRecord.createdAt.toISOString(),
    replied: newRecord.replied,
  };
}

export async function deleteContact(id: string): Promise<boolean> {
  try {
    await db.contactSubmission.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("Error deleting contact:", error);
    return false;
  }
}

export async function markContactReplied(id: string): Promise<boolean> {
  try {
    await db.contactSubmission.update({ where: { id }, data: { replied: true } });
    return true;
  } catch (error) {
    console.error("Error marking contact replied:", error);
    return false;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    let records = await db.service.findMany({
      orderBy: { order: "asc" }
    });

    if (records.length === 0) {
      // Seed default services
      const defaultServices = [
        {
          iconName: "Globe",
          title: "Web Development",
          description: "Engineering premium full-stack web applications with React, Next.js, and ASP.NET Core, optimized for performance and design.",
          order: 0,
        },
        {
          iconName: "Smartphone",
          title: "Mobile Applications",
          description: "Creating high-fidelity, fluid cross-platform mobile apps with responsive layouts, secure client auth, and real-time features.",
          order: 1,
        },
        {
          iconName: "BrainCircuit",
          title: "AI & Machine Learning",
          description: "Building custom computer vision models, emotion/drowsiness detection trackers using OpenCV, and smart LLM integrations.",
          order: 2,
        },
        {
          iconName: "Cloud",
          title: "Cloud & DevOps",
          description: "Deploying secure applications to AWS S3, configuring Docker containers, and managing automated CI/CD pipelines.",
          order: 3,
        },
      ];

      for (const s of defaultServices) {
        await db.service.create({ data: s });
      }

      records = await db.service.findMany({
        orderBy: { order: "asc" }
      });
    }

    return records.map((r) => ({
      id: r.id,
      iconName: r.iconName,
      title: r.title,
      description: r.description,
    }));
  } catch (error) {
    console.error("Error fetching services from MySQL:", error);
    return [];
  }
}

export async function saveServices(data: Service[]): Promise<boolean> {
  try {
    await db.service.deleteMany({});
    for (let i = 0; i < data.length; i++) {
      const s = data[i];
      await db.service.create({
        data: {
          id: s.id && s.id.length > 10 ? s.id : undefined, // only use valid uuid
          iconName: s.iconName,
          title: s.title,
          description: s.description,
          order: i,
        }
      });
    }
    return true;
  } catch (error) {
    console.error("Error saving services to MySQL:", error);
    return false;
  }
}


