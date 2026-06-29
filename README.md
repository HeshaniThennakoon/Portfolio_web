# ✨ Dynamic Software Engineering Portfolio & Admin Workspace

A premium, fully dynamic, production-ready developer portfolio and case study showcase built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and Prisma ORM with MySQL. 

This repository features a public-facing developer landing page alongside a private, secure administrative dashboard to customize every single item of content—including images, stats, availability states, projects, and recommendation letters—in real-time.

---

## 🚀 Core Features

### 💻 Public Showcase
* **Dynamic Landing Page**: Absolutely zero hardcoded content. Every single name, role, background text, school entry, and social icon is loaded dynamically from the database.
* **Interactive Project Filters & Toggles**: Sort projects by categories (AI/CV, Web Apps, Mobile Apps) with a toggle to control grid collapse/expand states.
* **In-Depth Case Studies (`/projects/[slug]`)**: Dedicated sub-pages presenting project challenges, engineering solutions, outcomes, and screenshots.
* **Testimonials & Recommendations**: Adapts dynamically as a responsive 3-column grid on desktop screens and a snap-scroll card slider on mobile/tablets. Includes visual ratings and quick referrer email/call action highlights.
* **"Available for Hire" Badge**: Glowing, pulsing live badge in the Hero section and Navbar indicator showing current hiring states (e.g., *Open to Work*, *Freelance Only*).
* **Adaptable Dark/Light Modes**: Styled dark and light themes with glowing neon borders and premium cyberpunk glow accents.
* **SMTP Contact Form**: Submissions are instantly stored in the inbox database and dispatched to your email address via SMTP.

### 🛡️ Admin Workspace (`/admin`)
* **Secure Session Authentication**: Protected routes using bcrypt session credentials.
* **Interactive CMS**: Tabbed and modular controls to manage Hero information, About highlights, Skills inventory, Timeline events (experience/education/achievements), and Services.
* **Direct Media Uploads**: Built-in image uploader that saves avatars, screenshots, and PDFs directly to server storage and returns clean URL routes.
* **Contact Center**: An inbox workspace to track contact form submissions, mark messages as read/replied, and manage site-wide social/contact links.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16.2 (App Router & Server Actions)
* **Frontend**: React 19, TypeScript, Tailwind CSS 4 (PostCSS variant), Framer Motion, Lucide Icons, Sonner
* **Database & ORM**: MySQL Database, Prisma ORM
* **Authentication**: Session cookies and bcryptjs credential encryption
* **Mail Dispatcher**: Nodemailer

---

## 📁 Repository Structure

```text
├── app/
│   ├── actions.ts           # Next.js Server Actions for CMS data & uploads
│   ├── layout.tsx           # Main application root layout & dynamic SEO metadata
│   ├── page.tsx             # Public landing page entry
│   ├── providers.tsx        # Theme and alert notifications context providers
│   ├── admin/               # Administrative panel dashboards (login and protected CMS)
│   └── projects/[slug]/     # Project Detail & Case Study SSR subpages
├── components/
│   ├── layout/              # Shared headers (Navbar), footers, and sidebars
│   ├── sections/            # Visual home page sections (Hero, About, Projects, Testimonials, etc.)
│   └── shared/              # Reusable UI primitives (GlassCard, SectionHeader)
├── lib/
│   ├── auth.ts              # Session creation & authentication verification
│   ├── db.ts                # PrismaClient instance
│   └── data.ts              # Database queries and data access APIs
├── prisma/
│   └── schema.prisma        # Database models & relationships
└── public/
    └── uploads/             # Server file uploads directory (git-ignored)
```

---

## ⚙️ Local Setup Guide

### 1. Prerequisites
* **Node.js** (v18 or higher)
* **MySQL Server** instance running locally or hosted online (e.g. on port `3306` or `3307`).

### 2. Install Dependencies
Clone the repository and install the project dependencies:
```bash
git clone https://github.com/HeshaniThennakoon/Portfolio_web.git
cd Portfolio_web
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory of the project and define the connection configurations:
```env
# Database Connection URL (example configuration)
DATABASE_URL="mysql://username:password@127.0.0.1:3307/portfolio_db"

# Session Encryption Key (choose a secure random text)
JWT_SECRET="your-super-secret-jwt-key"
```

### 4. Database Setup & Synchronization
Execute Prisma to configure database tables, relationships, and generate the typescript client helper:
```bash
# Push schema structure to MySQL
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 5. Running the Application
Launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the homepage and [http://localhost:3000/admin](http://localhost:3000/admin) to log into the dashboard (default username is `admin`).

---

## 🚀 Production Build & Deployment

To build the project for production, run:
```bash
npm run build
```

### Deployment Configuration Checklist
1. Ensure your hosting provider (Vercel, AWS, or VPS) has access to the `DATABASE_URL` and `JWT_SECRET` environment variables.
2. In serverless environments (like Vercel), configure a hosted database (such as PlanetScale, Aiven, or AWS RDS).
3. If running in containers, make sure the `/public/uploads/` directory is mapped to a persistent volume or configured to use cloud storage (S3/Cloudinary) for media persistence.
