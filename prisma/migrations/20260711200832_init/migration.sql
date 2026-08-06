-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "primaryColor" TEXT NOT NULL DEFAULT '#2563EB',
    "secondaryColor" TEXT NOT NULL DEFAULT '#06B6D4',
    "accentColor" TEXT NOT NULL DEFAULT '#8B5CF6',
    "darkBg" TEXT NOT NULL DEFAULT '#0F172A',
    "lightBg" TEXT NOT NULL DEFAULT '#F8FAFC',
    "username" TEXT NOT NULL DEFAULT 'admin',
    "passwordHash" TEXT NOT NULL,
    "smtpHost" TEXT NOT NULL DEFAULT 'smtp.gmail.com',
    "smtpPort" INTEGER NOT NULL DEFAULT 465,
    "smtpUser" TEXT NOT NULL DEFAULT 'thennakoonghm@gmail.com',
    "smtpPass" TEXT NOT NULL DEFAULT '',
    "toEmail" TEXT NOT NULL DEFAULT 'thennakoonghm@gmail.com',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL DEFAULT 'Heshani Thennakoon',
    "headline" TEXT NOT NULL,
    "subheadline" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "stats" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL DEFAULT '/resume.pdf',
    "profileImg" TEXT NOT NULL DEFAULT '/profile.jpg',
    "availabilityStatus" TEXT NOT NULL DEFAULT 'open',
    "availabilityMessage" TEXT NOT NULL DEFAULT 'Open to full-time opportunities',

    CONSTRAINT "HeroInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "story" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "sectionTitle" TEXT NOT NULL DEFAULT 'Who Am I?',
    "sectionBadge" TEXT NOT NULL DEFAULT 'ABOUT ME',
    "ctaLabel" TEXT NOT NULL DEFAULT '',
    "profileImg" TEXT NOT NULL DEFAULT '/profile.jpg',

    CONSTRAINT "AboutInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL DEFAULT '',
    "demoUrl" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',
    "teamSize" TEXT NOT NULL DEFAULT '',
    "challenge" TEXT NOT NULL DEFAULT '',
    "solution" TEXT NOT NULL DEFAULT '',
    "outcome" TEXT NOT NULL DEFAULT '',
    "screenshots" TEXT NOT NULL DEFAULT '[]',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "faculty" TEXT NOT NULL DEFAULT '',
    "period" TEXT NOT NULL,
    "focusAreas" TEXT NOT NULL,
    "gpa" TEXT NOT NULL DEFAULT '',
    "achievement" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "leadership" TEXT NOT NULL,
    "sports" TEXT NOT NULL,
    "professional" TEXT NOT NULL,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replied" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "iconName" TEXT NOT NULL DEFAULT 'Globe',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "facebook" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "image" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OgSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "tagline" TEXT NOT NULL DEFAULT 'Building the Future, One Line at a Time',
    "showAvailability" BOOLEAN NOT NULL DEFAULT true,
    "showProfilePhoto" BOOLEAN NOT NULL DEFAULT true,
    "siteName" TEXT NOT NULL DEFAULT 'Heshani Thennakoon | Portfolio',
    "siteUrl" TEXT NOT NULL DEFAULT 'https://heshani.dev',
    "twitterHandle" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "OgSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
