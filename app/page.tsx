import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyHireMe } from "@/components/sections/WhyHireMe";
import { Skills } from "@/components/sections/Skills";
import { ExperienceSection } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { EducationSection } from "@/components/sections/Education";
import { AchievementsSection } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Stats } from "@/components/sections/Stats";
import { Footer } from "@/components/layout/Footer";
import {
  getHero,
  getAbout,
  getSkills,
  getExperience,
  getProjects,
  getEducation,
  getAchievements,
  getServices,
  getSocialLinks,
} from "@/lib/data";

export const revalidate = 0; // Ensure page is always dynamic and loads latest admin inputs

export default async function Home() {
  // Fetch data server-side
  const heroData = await getHero();
  const aboutData = await getAbout();
  const skillsData = await getSkills();
  const experienceData = await getExperience();
  const projectsData = await getProjects();
  const educationData = await getEducation();
  const achievementsData = await getAchievements();
  const servicesData = await getServices();
  const socialLinksData = await getSocialLinks();

  const primaryRole = heroData.roles[0] || "Software Engineer";

  const universityEntry = educationData.find(edu => 
    edu.degree.toLowerCase().includes("bsc") || 
    edu.degree.toLowerCase().includes("bachelor") || 
    edu.degree.toLowerCase().includes("hons") ||
    edu.institution.toLowerCase().includes("university")
  ) || educationData[0];

  return (
    <>
      <Navbar brandName={heroData.name} subtitle={primaryRole} />
      <main className="flex-1">
        <Hero data={heroData} education={universityEntry} />
        <Stats stats={heroData.stats} />
        <WhyHireMe data={servicesData} />
        <About data={aboutData} profileImg={heroData.profileImg} name={heroData.name} />
        <Skills data={skillsData} />
        <ExperienceSection data={experienceData} />
        <Projects data={projectsData} />
        <EducationSection data={educationData} />
        <AchievementsSection data={achievementsData} />
        <Contact socialLinks={socialLinksData} />
      </main>
      <Footer socialLinks={socialLinksData} brandName={heroData.name} />
    </>
  );
}
