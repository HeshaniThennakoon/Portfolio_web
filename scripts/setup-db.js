const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Settings JSON
const settingsPath = path.join(DATA_DIR, 'settings.json');
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync('admin123', salt);

const defaultSettings = {
  theme: {
    primary: "#2563EB",
    secondary: "#06B6D4",
    accent: "#8B5CF6",
    darkBg: "#0F172A",
    lightBg: "#F8FAFC"
  },
  admin: {
    username: "admin",
    passwordHash: passwordHash
  },
  emailConfig: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    smtpUser: "",
    smtpPass: "",
    toEmail: "thennakoonghm@gmail.com"
  }
};

// 2. Hero JSON
const heroPath = path.join(DATA_DIR, 'hero.json');
const defaultHero = {
  name: "Heshani Thennakoon",
  headline: "Building Scalable Software Solutions with Modern Technologies",
  subheadline: "Passionate Software Engineer specializing in full-stack development, cloud technologies, AI-powered applications, and modern web solutions.",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Engineer",
    "Frontend Engineer",
    "Computer Engineering Graduate"
  ],
  stats: [
    { label: "Projects Completed", value: "10+" },
    { label: "Learning & Development", value: "4+ Years" },
    { label: "Internship Experience", value: "1" },
    { label: "Leadership Roles", value: "Multiple" }
  ],
  resumeUrl: "/resume.pdf",
  profileImg: "/profile.jpg"
};

// 3. About JSON
const aboutPath = path.join(DATA_DIR, 'about.json');
const defaultAbout = {
  story: "Hi! I'm Heshani Thennakoon, a passionate Software Engineer from Sri Lanka. I enjoy designing and developing efficient, scalable, and user-friendly software solutions using modern technologies. I recently completed my BSc (Hons) in Computer Engineering at the University of Ruhuna and have hands-on experience in full-stack development, cloud services, AI-based applications, and DevOps practices.",
  highlights: [
    "Problem Solver",
    "Team Collaborator",
    "Clean Code Advocate",
    "Lifelong Learner",
    "Technology Enthusiast"
  ]
};

// 4. Skills JSON
const skillsPath = path.join(DATA_DIR, 'skills.json');
const defaultSkills = [
  { category: "Programming Languages", skills: ["C++", "C#", "Java", "JavaScript", "TypeScript", "Python", "PHP", "HTML"] },
  { category: "Frontend Development", skills: ["Angular", "React", "Next.js", "Blazor", "Tailwind CSS", "JavaScript"] },
  { category: "Backend Development", skills: ["ASP.NET Core", "Node.js", "Express.js", "Entity Framework"] },
  { category: "Databases", skills: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Firebase Realtime Database"] },
  { category: "Cloud & DevOps", skills: ["AWS S3", "Docker", "Jenkins", "GitHub", "GitLab", "CI/CD"] },
  { category: "AI & Machine Learning", skills: ["OpenCV", "TensorFlow", "NumPy", "Pandas", "NLP"] },
  { category: "Software Engineering", skills: ["OOP", "MVC", "Clean Architecture", "REST APIs", "Microservices", "Agile/Scrum"] }
];

// 5. Experience JSON
const experiencePath = path.join(DATA_DIR, 'experience.json');
const defaultExperience = [
  {
    id: "exp-1",
    role: "Junior Software Engineer",
    company: "Active Solutions",
    location: "Sri Lanka",
    period: "February 2025 - Present",
    responsibilities: [
      "Developed web applications using Next.js framework.",
      "Managed and implemented database migrations using Prisma.",
      "Designed and optimized full-stack application logic for responsiveness and speed.",
      "Integrated secure authentication flows and backend services."
    ],
    techStack: ["Next.js", "Prisma", "React", "TypeScript", "PostgreSQL"]
  },
  {
    id: "exp-2",
    role: "Software Engineer Intern",
    company: "LightWay IT (Pvt) Ltd",
    location: "Sri Lanka",
    period: "June 2024 – February 2025",
    responsibilities: [
      "Developed enterprise web applications.",
      "Worked on INSIEM and ALUMO Web/API projects.",
      "Built RESTful APIs using ASP.NET Core.",
      "Integrated Angular frontend with backend services.",
      "Managed database operations with Entity Framework.",
      "Implemented authentication and authorization.",
      "Collaborated in Agile development teams.",
      "Participated in debugging, testing, and deployment."
    ],
    techStack: ["ASP.NET Core", "Angular", "Entity Framework", "SQL Server", "GitLab"]
  }
];

// 6. Projects JSON
const projectsPath = path.join(DATA_DIR, 'projects.json');
const defaultProjects = [
  {
    id: "proj-1",
    title: "AI Classroom Engagement Monitoring System",
    description: "AI-powered classroom monitoring platform that analyzes student engagement, emotions, and drowsiness in real-time.",
    technologies: ["Python", "OpenCV", "CNN", "Firebase", "MongoDB", "JavaScript"],
    features: [
      "Face Recognition Login",
      "Emotion Detection",
      "Drowsiness Monitoring",
      "Real-Time Alerts",
      "Analytics Dashboard"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/classroom_monitoring.jpg",
    featured: true
  },
  {
    id: "proj-2",
    title: "Book Stall Reservation System",
    description: "Full-stack reservation platform with QR code generation and email notifications.",
    technologies: ["React", "Node.js", "Express", "TypeScript", "MongoDB", "JWT"],
    features: [
      "Reservation Management",
      "Authentication",
      "QR Generation",
      "Email Notifications"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/book_stall.jpg",
    featured: false
  },
  {
    id: "proj-3",
    title: "Tourism Website (Fantasy Personal Tours)",
    description: "SEO-optimized tourism website for a travel business with maps and contact portals.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS"],
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Sitemap Integration",
      "Hosting Deployment"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/tourism.jpg",
    featured: false
  },
  {
    id: "proj-4",
    title: "Travel CRM with AI Chatbot (GH Travelers)",
    description: "CRM-enabled travel platform with AI chatbot assistance.",
    technologies: ["PHP", "JavaScript", "CRM Concepts", "ERP Student Portal"],
    features: [
      "Lead Tracking",
      "Booking Management",
      "User Roles",
      "Ticket Management",
      "AI Chatbot"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/travel_crm.jpg",
    featured: false
  },
  {
    id: "proj-5",
    title: "ERP Student Portal",
    description: "Student portal for module registration, results, requests, and feedback.",
    technologies: ["Blazor", "PostgreSQL", "C#"],
    features: [
      "Module Registration",
      "Results & Requests",
      "Feedback System"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/student_portal.jpg",
    featured: false
  },
  {
    id: "proj-6",
    title: "Healthcare Mobile Application",
    description: "Flutter-based healthcare mobile application for appointment bookings and diagnostics.",
    technologies: ["Flutter", "Dart", "Firebase"],
    features: [
      "Appointment Booking",
      "Diagnostics Integration",
      "Real-time Messaging"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/healthcare.jpg",
    featured: false
  },
  {
    id: "proj-7",
    title: "Face Detection & Recognition System",
    description: "Real-time face recognition system integrated with Firebase.",
    technologies: ["Python", "OpenCV", "Firebase"],
    features: [
      "Real-time Face Detection",
      "Face Recognition",
      "Firebase DB Integration"
    ],
    githubUrl: "https://github.com/HeshaniThennakoon",
    demoUrl: "",
    imageUrl: "/uploads/face_rec.jpg",
    featured: false
  }
];

// 7. Education JSON
const educationPath = path.join(DATA_DIR, 'education.json');
const defaultEducation = [
  {
    id: "edu-1",
    degree: "BSc (Hons) in Computer Engineering",
    institution: "University of Ruhuna",
    period: "2021 – 2026",
    focusAreas: [
      "Software Engineering",
      "Artificial Intelligence",
      "Database Systems",
      "Computer Vision",
      "Cloud Computing",
      "System Design"
    ]
  }
];

// 8. Achievements JSON
const achievementsPath = path.join(DATA_DIR, 'achievements.json');
const defaultAchievements = {
  leadership: [
    "Captain – University Carrom Team (2025)",
    "Vice Captain – University Carrom Team (2024)",
    "Editor – IET on Campus (2025)",
    "Annual Technical Conference Coordinator – IET (2024)"
  ],
  sports: [
    "Quarter Finalist – Sri Lanka University Games XV 2025",
    "University Carrom Team Member (2021–2025)"
  ],
  professional: [
    "Participant – EMINENCE 4.0",
    "Active Technology Community Member"
  ]
};

// 9. Contacts JSON
const contactsPath = path.join(DATA_DIR, 'contacts.json');
const defaultContacts = [];

// Helper to write
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Initialized file: ${filePath}`);
}

writeJSON(settingsPath, defaultSettings);
writeJSON(heroPath, defaultHero);
writeJSON(aboutPath, defaultAbout);
writeJSON(skillsPath, defaultSkills);
writeJSON(experiencePath, defaultExperience);
writeJSON(projectsPath, defaultProjects);
writeJSON(educationPath, defaultEducation);
writeJSON(achievementsPath, defaultAchievements);
writeJSON(contactsPath, defaultContacts);

console.log("Database initialized successfully!");
