const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const DATA_DIR = path.join(__dirname, '../data');

function readJSON(filename, defaultValue) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return defaultValue;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

async function main() {
  console.log('Starting migration to MySQL...');

  // Clear existing records first to avoid duplication on re-run
  await prisma.contactSubmission.deleteMany({});
  await prisma.education.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.skillCategory.deleteMany({});
  
  // 1. Settings
  const settings = readJSON('settings.json', null);
  if (settings) {
    await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        primaryColor: settings.theme.primary,
        secondaryColor: settings.theme.secondary,
        accentColor: settings.theme.accent,
        darkBg: settings.theme.darkBg,
        lightBg: settings.theme.lightBg,
        username: settings.admin.username,
        passwordHash: settings.admin.passwordHash,
        smtpHost: settings.emailConfig.smtpHost,
        smtpPort: settings.emailConfig.smtpPort,
        smtpUser: settings.emailConfig.smtpUser,
        smtpPass: settings.emailConfig.smtpPass,
        toEmail: settings.emailConfig.toEmail,
      },
      create: {
        id: 1,
        primaryColor: settings.theme.primary,
        secondaryColor: settings.theme.secondary,
        accentColor: settings.theme.accent,
        darkBg: settings.theme.darkBg,
        lightBg: settings.theme.lightBg,
        username: settings.admin.username,
        passwordHash: settings.admin.passwordHash,
        smtpHost: settings.emailConfig.smtpHost,
        smtpPort: settings.emailConfig.smtpPort,
        smtpUser: settings.emailConfig.smtpUser,
        smtpPass: settings.emailConfig.smtpPass,
        toEmail: settings.emailConfig.toEmail,
      }
    });
    console.log('✓ Migrated settings');
  }

  // 2. HeroInfo
  const hero = readJSON('hero.json', null);
  if (hero) {
    await prisma.heroInfo.upsert({
      where: { id: 1 },
      update: {
        name: hero.name,
        headline: hero.headline,
        subheadline: hero.subheadline,
        roles: JSON.stringify(hero.roles),
        stats: JSON.stringify(hero.stats),
        resumeUrl: hero.resumeUrl,
        profileImg: hero.profileImg,
      },
      create: {
        id: 1,
        name: hero.name,
        headline: hero.headline,
        subheadline: hero.subheadline,
        roles: JSON.stringify(hero.roles),
        stats: JSON.stringify(hero.stats),
        resumeUrl: hero.resumeUrl,
        profileImg: hero.profileImg,
      }
    });
    console.log('✓ Migrated hero');
  }

  // 3. AboutInfo
  const about = readJSON('about.json', null);
  if (about) {
    await prisma.aboutInfo.upsert({
      where: { id: 1 },
      update: {
        story: about.story,
        highlights: JSON.stringify(about.highlights),
      },
      create: {
        id: 1,
        story: about.story,
        highlights: JSON.stringify(about.highlights),
      }
    });
    console.log('✓ Migrated about');
  }

  // 4. Skills
  const skills = readJSON('skills.json', []);
  for (let i = 0; i < skills.length; i++) {
    const s = skills[i];
    await prisma.skillCategory.create({
      data: {
        category: s.category,
        skills: JSON.stringify(s.skills),
        order: i,
      }
    });
  }
  console.log(`✓ Migrated ${skills.length} skill categories`);

  // 5. Experience
  const experiences = readJSON('experience.json', []);
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    await prisma.experience.create({
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
  console.log(`✓ Migrated ${experiences.length} experiences`);

  // 6. Projects
  const projects = readJSON('projects.json', []);
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    await prisma.project.create({
      data: {
        id: proj.id || undefined,
        title: proj.title,
        description: proj.description,
        technologies: JSON.stringify(proj.technologies),
        features: JSON.stringify(proj.features),
        githubUrl: proj.githubUrl || "",
        demoUrl: proj.demoUrl || "",
        imageUrl: proj.imageUrl || "",
        featured: proj.featured || false,
        order: i,
      }
    });
  }
  console.log(`✓ Migrated ${projects.length} projects`);

  // 7. Education
  const educationList = readJSON('education.json', []);
  for (let i = 0; i < educationList.length; i++) {
    const edu = educationList[i];
    await prisma.education.create({
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
  console.log(`✓ Migrated ${educationList.length} education items`);

  // 8. Achievements
  const achievements = readJSON('achievements.json', null);
  if (achievements) {
    await prisma.achievements.upsert({
      where: { id: 1 },
      update: {
        leadership: JSON.stringify(achievements.leadership || []),
        sports: JSON.stringify(achievements.sports || []),
        professional: JSON.stringify(achievements.professional || []),
      },
      create: {
        id: 1,
        leadership: JSON.stringify(achievements.leadership || []),
        sports: JSON.stringify(achievements.sports || []),
        professional: JSON.stringify(achievements.professional || []),
      }
    });
    console.log('✓ Migrated achievements');
  }

  // 9. Contacts
  const contacts = readJSON('contacts.json', []);
  for (const c of contacts) {
    await prisma.contactSubmission.create({
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
  console.log(`✓ Migrated ${contacts.length} contact submissions`);

  console.log('Migration completed successfully! 🎉');
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
