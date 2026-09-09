/**
 * FolioAI Engine - Free, Zero-Cost Client-Side AI Generator & Polisher
 * Generates tailored bios, project summaries, and skill recommendations.
 */

const ROLE_TEMPLATES = {
  developer: [
    "Passionate Software Engineer dedicated to crafting high-performance web applications, scalable backend systems, and clean reusable code architecture.",
    "Driven Full-Stack Developer specializing in modern JavaScript ecosystems, responsive frontend UI design, and cloud API development.",
    "Innovative Systems Developer focused on building intuitive digital products, optimizing database queries, and leading cross-functional tech initiatives."
  ],
  designer: [
    "Creative UI/UX Designer driven by human-centered design principles, interactive prototyping, and minimalist aesthetic systems.",
    "Product Designer with a passion for transforming complex workflows into effortless, visually captivating web and mobile experiences.",
    "Visual & Brand Experience Designer crafting pixel-perfect interfaces, scalable design tokens, and engaging digital design stories."
  ],
  student: [
    "Ambitious Computer Science scholar eager to apply theoretical engineering concepts, modern web frameworks, and collaborative problem-solving to real-world software products.",
    "Motivated tech enthusiast and recent graduate actively seeking software engineering opportunities to build impactful digital solutions.",
    "Dedicated student combining solid computer science fundamentals with hands-on full-stack development experience across modern tech stacks."
  ],
  executive: [
    "Results-oriented digital leader with proven expertise in driving technological innovation, scaling multi-platform web applications, and aligning software engineering with strategic business goals.",
    "Strategic Tech Specialist combining deep technical domain knowledge with cross-functional team leadership to deliver modern, resilient enterprise software."
  ]
};

const ACTION_VERBS = [
  "Architected", "Engineered", "Optimized", "Designed", "Spearheaded", 
  "Built", "Deployed", "Refactored", "Streamlined", "Orchestrated", "Implemented"
];

const SKILL_DATABASE = {
  frontend: [
    { name: 'React.js', category: 'Frontend', level: 'Expert', percentage: 95 },
    { name: 'TypeScript', category: 'Languages', level: 'Advanced', percentage: 90 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert', percentage: 95 },
    { name: 'Next.js', category: 'Frontend', level: 'Advanced', percentage: 88 },
    { name: 'Vue.js', category: 'Frontend', level: 'Intermediate', percentage: 75 },
    { name: 'HTML5 / CSS3 / SCSS', category: 'Frontend', level: 'Expert', percentage: 98 }
  ],
  backend: [
    { name: 'Node.js / Express', category: 'Backend', level: 'Advanced', percentage: 88 },
    { name: 'Python / Django', category: 'Backend', level: 'Advanced', percentage: 82 },
    { name: 'PostgreSQL', category: 'Database', level: 'Advanced', percentage: 85 },
    { name: 'REST APIs & GraphQL', category: 'Backend', level: 'Expert', percentage: 92 },
    { name: 'MongoDB / Redis', category: 'Database', level: 'Intermediate', percentage: 80 },
    { name: 'Docker / Kubernetes', category: 'DevOps', level: 'Intermediate', percentage: 75 }
  ],
  design: [
    { name: 'Figma & Wireframing', category: 'Design', level: 'Expert', percentage: 95 },
    { name: 'UI / UX Design', category: 'Design', level: 'Expert', percentage: 92 },
    { name: 'Design Systems', category: 'Design', level: 'Advanced', percentage: 88 },
    { name: 'User Research & Testing', category: 'UX', level: 'Advanced', percentage: 82 },
    { name: 'Prototyping & Motion', category: 'Design', level: 'Intermediate', percentage: 80 }
  ]
};

/**
 * Generate a smart professional bio based on role title
 */
export function generateSmartBio(title = '', _style = 'developer') {
  const normalizedTitle = title.toLowerCase();
  let category = 'developer';
  
  if (normalizedTitle.includes('design') || normalizedTitle.includes('ui') || normalizedTitle.includes('ux') || normalizedTitle.includes('artist')) {
    category = 'designer';
  } else if (normalizedTitle.includes('student') || normalizedTitle.includes('intern') || normalizedTitle.includes('graduate') || normalizedTitle.includes('fresher')) {
    category = 'student';
  } else if (normalizedTitle.includes('lead') || normalizedTitle.includes('manager') || normalizedTitle.includes('head') || normalizedTitle.includes('director') || normalizedTitle.includes('executive')) {
    category = 'executive';
  }

  const choices = ROLE_TEMPLATES[category] || ROLE_TEMPLATES.developer;
  const baseBio = choices[Math.floor(Math.random() * choices.length)];
  
  if (title.trim()) {
    return `${title} — ${baseBio}`;
  }
  return baseBio;
}

/**
 * Enhance informal text into polished bullet points using action verbs
 */
export function polishText(text, tone = 'Professional') {
  if (!text || text.trim().length === 0) return '';
  
  let cleaned = text.trim();
  const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  
  // Ensure starts with high-impact action verb if informal
  if (!cleaned.toLowerCase().startsWith('i ') && !ACTION_VERBS.some(v => cleaned.startsWith(v))) {
    cleaned = `${verb} ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`;
  } else if (cleaned.toLowerCase().startsWith('i worked on ') || cleaned.toLowerCase().startsWith('i built ')) {
    cleaned = cleaned.replace(/^(i worked on|i built|i created|i made)\s+/i, `${verb} `);
  }
  
  if (!cleaned.endsWith('.')) {
    cleaned += '.';
  }

  if (tone === 'Technical') {
    return `${cleaned} Engineered with performance monitoring, scalability, and modular software architecture.`;
  } else if (tone === 'Creative') {
    return `${cleaned} Crafted with a focus on immersive user engagement and seamless interactive polish.`;
  }
  
  return cleaned;
}

/**
 * Generate suggested skills based on user's job title
 */
export function suggestSkillsForTitle(title = '') {
  const lower = title.toLowerCase();
  if (lower.includes('design') || lower.includes('ux') || lower.includes('ui')) {
    return [...SKILL_DATABASE.design, ...SKILL_DATABASE.frontend.slice(0, 2)];
  } else if (lower.includes('back') || lower.includes('python') || lower.includes('data') || lower.includes('devops')) {
    return [...SKILL_DATABASE.backend, ...SKILL_DATABASE.frontend.slice(0, 2)];
  }
  // Default software engineer / full-stack
  return [
    ...SKILL_DATABASE.frontend.slice(0, 4),
    ...SKILL_DATABASE.backend.slice(0, 3)
  ];
}
