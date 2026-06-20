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
import { Footer } from "@/components/layout/Footer";
import {
  getHero,
  getAbout,
  getSkills,
  getExperience,
  getProjects,
  getEducation,
  getAchievements,
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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero data={heroData} />
        <About data={aboutData} />
        <WhyHireMe />
        <Skills data={skillsData} />
        <ExperienceSection data={experienceData} />
        <Projects data={projectsData} />
        <EducationSection data={educationData} />
        <AchievementsSection data={achievementsData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
