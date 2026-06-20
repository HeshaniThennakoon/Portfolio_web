import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function getFilePath(filename: string) {
  return path.join(DATA_DIR, filename);
}

function readJSON<T>(filename: string, defaultValue: T): T {
  const filePath = getFilePath(filename);
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return defaultValue;
  }
}

function writeJSON<T>(filename: string, data: T): boolean {
  const filePath = getFilePath(filename);
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error);
    return false;
  }
}

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

// Data Access API
export async function getSettings(): Promise<Settings> {
  return readJSON<Settings>('settings.json', {
    theme: { primary: "#2563EB", secondary: "#06B6D4", accent: "#8B5CF6", darkBg: "#0F172A", lightBg: "#F8FAFC" },
    admin: { username: "admin", passwordHash: "" },
    emailConfig: { smtpHost: "smtp.gmail.com", smtpPort: 465, smtpUser: "", smtpPass: "", toEmail: "thennakoonghm@gmail.com" }
  });
}

export async function saveSettings(data: Settings): Promise<boolean> {
  return writeJSON('settings.json', data);
}

export async function getHero(): Promise<HeroInfo> {
  return readJSON<HeroInfo>('hero.json', {
    name: "Heshani Thennakoon",
    headline: "Building Scalable Software Solutions with Modern Technologies",
    subheadline: "Passionate Software Engineer specializing in full-stack development, cloud technologies, AI-powered applications, and modern web solutions.",
    roles: ["Software Engineer", "Full-Stack Developer", "Backend Engineer", "Frontend Engineer", "Computer Engineering Graduate"],
    stats: [],
    resumeUrl: "/resume.pdf",
    profileImg: "/profile.jpg"
  });
}

export async function saveHero(data: HeroInfo): Promise<boolean> {
  return writeJSON('hero.json', data);
}

export async function getAbout(): Promise<AboutInfo> {
  return readJSON<AboutInfo>('about.json', { story: "", highlights: [] });
}

export async function saveAbout(data: AboutInfo): Promise<boolean> {
  return writeJSON('about.json', data);
}

export async function getSkills(): Promise<SkillCategory[]> {
  return readJSON<SkillCategory[]>('skills.json', []);
}

export async function saveSkills(data: SkillCategory[]): Promise<boolean> {
  return writeJSON('skills.json', data);
}

export async function getExperience(): Promise<Experience[]> {
  return readJSON<Experience[]>('experience.json', []);
}

export async function saveExperience(data: Experience[]): Promise<boolean> {
  return writeJSON('experience.json', data);
}

export async function getProjects(): Promise<Project[]> {
  return readJSON<Project[]>('projects.json', []);
}

export async function saveProjects(data: Project[]): Promise<boolean> {
  return writeJSON('projects.json', data);
}

export async function getEducation(): Promise<Education[]> {
  return readJSON<Education[]>('education.json', []);
}

export async function saveEducation(data: Education[]): Promise<boolean> {
  return writeJSON('education.json', data);
}

export async function getAchievements(): Promise<Achievements> {
  return readJSON<Achievements>('achievements.json', { leadership: [], sports: [], professional: [] });
}

export async function saveAchievements(data: Achievements): Promise<boolean> {
  return writeJSON('achievements.json', data);
}

export async function getContacts(): Promise<ContactSubmission[]> {
  return readJSON<ContactSubmission[]>('contacts.json', []);
}

export async function saveContacts(data: ContactSubmission[]): Promise<boolean> {
  return writeJSON('contacts.json', data);
}

export async function addContact(contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'replied'>): Promise<ContactSubmission> {
  const contacts = await getContacts();
  const newContact: ContactSubmission = {
    ...contact,
    id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    replied: false
  };
  contacts.unshift(newContact);
  await saveContacts(contacts);
  return newContact;
}
