export const TEMPLATES = [
  {
    id: 'dark-tech',
    name: 'Modern Tech Dark',
    category: 'Software Engineers, Web Devs & Tech Lead',
    description: 'Sleek dark glassmorphism theme featuring glowing cyan accents, terminal aesthetic, live project links, and code badge cards.',
    previewImage: '/templates/dark_tech.jpg',
    defaultFont: 'font-inter',
    defaultPrimaryColor: '#06b6d4', // Cyan
    accentColors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899']
  },
  {
    id: 'creative-canvas',
    name: 'Creative Canvas',
    category: 'UI/UX Designers, Animators & Content Creators',
    description: 'Vibrant fluid layout with soft gradient glass cards, bold headings, masonry visual project gallery, and colorful skill tags.',
    previewImage: '/templates/creative_canvas.jpg',
    defaultFont: 'font-outfit',
    defaultPrimaryColor: '#ec4899', // Pink
    accentColors: ['#ec4899', '#a855f7', '#6366f1', '#14b8a6', '#f97316', '#eab308']
  },
  {
    id: 'minimal-executive',
    name: 'Minimalist Executive',
    category: 'Students, Business Managers, Finance & Marketers',
    description: 'Clean light mode design with elegant serif headings, structured career timelines, refined spacing, and corporate polish.',
    previewImage: '/templates/minimal_executive.jpg',
    defaultFont: 'font-playfair',
    defaultPrimaryColor: '#334155', // Slate
    accentColors: ['#334155', '#1e40af', '#047857', '#b45309', '#6b21a8', '#991b1b']
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist Cyberpunk',
    category: 'Front-End Hackers, Indie Hackers & Edgy Creators',
    description: 'High contrast retro design featuring thick black outlines, offset hard drop-shadows, vivid yellow-pink accents, and arcade badges.',
    previewImage: '/templates/neo_brutalist.jpg',
    defaultFont: 'font-fira',
    defaultPrimaryColor: '#facc15', // Yellow
    accentColors: ['#facc15', '#f43f5e', '#38bdf8', '#a3e635', '#c084fc', '#fb923c']
  },
  {
    id: 'glass-bento',
    name: 'Glassmorphic Bento Grid',
    category: 'Full-Stack Engineers, Product Managers & Innovators',
    description: 'Modern Apple & Linear inspired Bento Grid layout with frosted glass containers, animated metrics, micro-widgets, and floating glow badges.',
    previewImage: '/templates/glass_bento.jpg',
    defaultFont: 'font-jakarta',
    defaultPrimaryColor: '#6366f1', // Indigo
    accentColors: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
  },
  {
    id: 'cyber-matrix',
    name: 'Cyber Matrix Terminal',
    category: 'Security Researchers, AI/ML Engineers & Systems Devs',
    description: 'Neon green hacker matrix aesthetic with command line prompt header, scanlines backdrop, code card showcases, and glowing terminal badges.',
    previewImage: '/templates/cyber_matrix.jpg',
    defaultFont: 'font-fira',
    defaultPrimaryColor: '#22c55e', // Emerald
    accentColors: ['#22c55e', '#10b981', '#06b6d4', '#a855f7', '#eab308', '#f43f5e']
  }
];

export const FONT_OPTIONS = [
  { id: 'font-inter', name: 'Inter (Modern Sans)', family: "'Inter', sans-serif" },
  { id: 'font-outfit', name: 'Outfit (Geometric & Clean)', family: "'Outfit', sans-serif" },
  { id: 'font-playfair', name: 'Playfair Display (Serif Elegance)', family: "'Playfair Display', serif" },
  { id: 'font-fira', name: 'Fira Code (Developer Mono)', family: "'Fira Code', monospace" },
  { id: 'font-jakarta', name: 'Plus Jakarta (Tech Modern)', family: "'Plus Jakarta Sans', sans-serif" }
];

export const DEFAULT_PORTFOLIO = {
  id: 'demo-portfolio-1',
  title: 'Alex Rivera - Developer Portfolio',
  slug: 'alex-rivera-dev',
  isPublished: true,
  viewsCount: 142,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  
  // Theme & Styling Settings
  theme: {
    templateId: 'dark-tech',
    primaryColor: '#06b6d4',
    fontId: 'font-inter',
    darkMode: true,
    sectionOrder: ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'],
    sectionVisibility: {
      hero: true,
      about: true,
      skills: true,
      experience: true,
      projects: true,
      education: true,
      certifications: true,
      contact: true
    }
  },

  // Personal Information
  personal: {
    fullName: 'Alex Rivera',
    professionalTitle: 'Senior Full-Stack Architect & UI Engineer',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA (Open to Remote)',
    email: 'alex.rivera.dev@gmail.com',
    phone: '+91 98765 43210',
    shortBio: 'Building scalable web applications, real-time cloud interfaces, and intuitive user experiences.',
    aboutMe: 'Passionate software engineer with 6+ years of experience designing robust frontend architectures and cloud backend microservices. Focused on React ecosystem, Node.js performance tuning, and crafting pixel-perfect web products.',
    availability: 'Available for Full-time Roles & High-Impact Consulting'
  },

  // Social Links
  socials: {
    github: 'https://github.com/alexrivera-dev',
    linkedin: 'https://linkedin.com/in/alexrivera-architect',
    twitter: 'https://twitter.com/alexrivera_tech',
    website: 'https://alexrivera.io',
    dribbble: 'https://dribbble.com/alexrivera',
    youtube: ''
  },

  // Skills
  skills: [
    { name: 'React / Next.js', category: 'Frontend', level: 'Expert', percentage: 95 },
    { name: 'TypeScript / JavaScript', category: 'Languages', level: 'Expert', percentage: 90 },
    { name: 'Tailwind CSS / Glassmorphism', category: 'Frontend', level: 'Expert', percentage: 95 },
    { name: 'Node.js / Express / GraphQL', category: 'Backend', level: 'Advanced', percentage: 85 },
    { name: 'PostgreSQL / MongoDB / Redis', category: 'Database', level: 'Advanced', percentage: 82 },
    { name: 'Docker / AWS / Cloudflare', category: 'DevOps', level: 'Intermediate', percentage: 78 },
    { name: 'UI/UX Design & Wireframing', category: 'Design', level: 'Advanced', percentage: 88 }
  ],

  // Work Experience
  experience: [
    {
      id: 'exp-1',
      role: 'Lead Frontend Engineer',
      company: 'Apex Cloud Systems',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      isCurrent: true,
      description: 'Architected next-generation analytics dashboard serving 250,000+ daily active users. Reduced bundle load time by 42% through code-splitting and dynamic import optimizations.'
    },
    {
      id: 'exp-2',
      role: 'Senior Full Stack Developer',
      company: 'Nexus Tech Labs',
      location: 'Austin, TX',
      startDate: '2021-03',
      endDate: '2022-12',
      isCurrent: false,
      description: 'Built real-time collaborative workspace tools using React, WebSockets, and Express. Led a team of 5 frontend developers and established automated CI/CD deployment workflows.'
    }
  ],

  // Education
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2017-08',
      endDate: '2021-05',
      gpa: '3.88 / 4.0',
      highlights: 'Dean’s Honor List (4 semesters), Lead Developer at ACM Computer Club.'
    }
  ],

  // Projects
  projects: [
    {
      id: 'proj-1',
      title: 'DevMetrics — Cloud Developer Insights Platform',
      description: 'An AI-powered dashboard tracking Git pull request velocity, code coverage metrics, and deployment health for remote engineering teams.',
      technologies: ['React', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL'],
      liveUrl: 'https://devmetrics-demo.example.com',
      githubUrl: 'https://github.com/alexrivera-dev/devmetrics',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      featured: true,
      category: 'Full-Stack'
    },
    {
      id: 'proj-2',
      title: 'Aura UI — Modern Component Design System',
      description: 'An open-source React & Tailwind CSS component library featuring glassmorphic cards, accessible modals, and micro-interactions.',
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://auraui.example.com',
      githubUrl: 'https://github.com/alexrivera-dev/aura-ui',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      featured: true,
      category: 'UI/UX'
    },
    {
      id: 'proj-3',
      title: 'PulseFlow — Real-Time Task Management App',
      description: 'A slick kanban project tracker with offline local storage persistence, drag-and-drop workflow cards, and instant search filtering.',
      technologies: ['React', 'Zustand', 'IndexedDB', 'Tailwind CSS'],
      liveUrl: 'https://pulseflow.example.com',
      githubUrl: 'https://github.com/alexrivera-dev/pulseflow',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      featured: false,
      category: 'Frontend'
    }
  ],

  // Certifications
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: '2023-06',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      title: 'Meta Senior Frontend Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      issueDate: '2022-09',
      credentialUrl: 'https://coursera.org/verification'
    }
  ]
};
