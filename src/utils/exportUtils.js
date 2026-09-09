import JSZip from 'jszip';
import html2pdf from 'html2pdf.js';
import { formatAcademicScore } from './formatUtils';

/**
 * Export portfolio as a PDF document
 */
export async function exportToPDF(elementId, filename = 'portfolio.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element for PDF export not found:', elementId);
    return false;
  }

  try {
    const opt = {
      margin: [8, 8, 8, 8],
      filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        allowTaint: true,
        logging: false
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    window.print();
    return false;
  }
}

/**
 * Export portfolio as a standalone HTML+CSS static web ZIP package
 */
export async function exportToWebBundle(portfolio) {
  const zip = new JSZip();

  const theme = portfolio.theme || {};
  const templateId = theme.templateId || 'dark-tech';
  const primaryColor = theme.primaryColor || '#06b6d4';
  const fontId = theme.fontId || 'font-inter';
  const visibility = theme.sectionVisibility || {};
  const sectionOrder = theme.sectionOrder || ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications'];

  const fontMap = {
    'font-inter': "'Inter', system-ui, sans-serif",
    'font-outfit': "'Outfit', 'Inter', system-ui, sans-serif",
    'font-playfair': "'Playfair Display', 'Georgia', serif",
    'font-fira': "'Fira Code', monospace",
    'font-jakarta': "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
  };
  const fontFamily = fontMap[fontId] || "'Inter', system-ui, sans-serif";

  const name = portfolio.personal?.fullName || 'Portfolio';
  const title = portfolio.personal?.professionalTitle || 'Personal Website';
  const bio = portfolio.personal?.shortBio || '';
  const aboutMe = portfolio.personal?.aboutMe || '';
  const email = portfolio.personal?.email || '';
  const location = portfolio.personal?.location || '';
  const avatar = portfolio.personal?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';

  // SVGs for inline brand icons
  const githubSvg = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
  const linkedinSvg = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
  const twitterSvg = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`;
  const websiteSvg = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
  const externalSvg = `<svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

  const titleMap = {
    'creative-canvas': {
      about: 'About Me',
      skills: 'Design & Tech Toolkit',
      projects: 'Selected Works & Projects',
      experience: 'Career Journey',
      education: 'Education & Academic Background',
      certifications: 'Certifications & Honors',
      btnPrimary: 'View Project',
      btnSecondary: 'Source Code',
      featuredBadge: 'FEATURED CREATIVE WORK'
    },
    'glass-bento': {
      about: 'About Me & Executive Overview',
      skills: 'Technical Skills & Proficiency',
      projects: 'Featured Bento Deployments',
      experience: 'Career Experience',
      education: 'Education',
      certifications: 'Certifications',
      btnPrimary: 'View Project',
      btnSecondary: 'Source Code',
      featuredBadge: 'FEATURED BENTO PROJECT'
    },
    'minimal-executive': {
      about: 'Executive Summary',
      skills: 'Core Competencies & Proficiency Metrics',
      projects: 'Key Initiatives & Portfolio',
      experience: 'Professional Experience',
      education: 'Education & Academic Credentials',
      certifications: 'Certifications & Verified Honors',
      btnPrimary: 'View Project',
      btnSecondary: 'Source Code',
      featuredBadge: 'FEATURED INITIATIVE'
    },
    'cyber-matrix': {
      about: '[SECTION // OPERATOR_MANIFEST]',
      skills: '[SECTION // SKILL_METRICS]',
      projects: '[SECTION // MATRIX_PROJECTS]',
      experience: '[SECTION // LOG_JOURNEY]',
      education: '[SECTION // ACADEMIC_LOG]',
      certifications: '[SECTION // CREDENTIALS]',
      btnPrimary: 'Live Console',
      btnSecondary: 'Source Code',
      featuredBadge: 'FEATURED SYSTEM DEPLOYMENT'
    },
    'neo-brutalist': {
      about: '// ABOUT_OPERATOR',
      skills: '// TECH_STACK & METRICS',
      projects: '// FEATURED_DEPLOYMENTS',
      experience: '// CAREER_LOGS',
      education: '// ACADEMIC_RECORD',
      certifications: '// CREDENTIALS_VERIFIED',
      btnPrimary: 'LAUNCH DEMO',
      btnSecondary: 'SOURCE CODE',
      featuredBadge: 'FEATURED CYBER DEPLOYMENT'
    },
    'dark-tech': {
      about: 'About Me',
      skills: 'Skills & Proficiency Metrics',
      projects: 'Projects & Portfolio Work',
      experience: 'Experience Timeline',
      education: 'Education',
      certifications: 'Certifications & Credentials',
      btnPrimary: 'View Project',
      btnSecondary: 'Source Code',
      featuredBadge: 'FEATURED PROJECT'
    }
  };

  const tInfo = titleMap[templateId] || titleMap['dark-tech'];

  // Format projects HTML
  const projectsHtml = (portfolio.projects || []).map((p, idx) => `
    <div class="card scroll-reveal ${p.featured ? 'featured' : ''}">
      ${p.featured ? `<div class="featured-badge">⭐ ${tInfo.featuredBadge}</div>` : ''}
      ${p.imageUrl ? `
        <div class="card-cover-wrapper">
          <img src="${p.imageUrl}" alt="${p.title || 'Project'}" class="card-img" />
          <div class="card-cover-overlay">
            <h4>${p.title || 'Project'}</h4>
          </div>
        </div>
      ` : `
        <div class="card-fallback-cover bg-grad-${(idx % 4) + 1}">
          <h4>${p.title || 'Project'}</h4>
        </div>
      `}
      <div class="card-body">
        <p class="card-desc">${p.description || ''}</p>
        <div class="tags">
          ${(p.technologies || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="links">
          ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn-proj primary">${tInfo.btnPrimary} ${externalSvg}</a>` : ''}
          ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn-proj secondary">${tInfo.btnSecondary} ${githubSvg}</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Format skills HTML
  const skillsHtml = (portfolio.skills || []).map((s, idx) => {
    let skillName = `Skill #${idx + 1}`;
    if (typeof s === 'string') {
      skillName = s.trim() || `Skill #${idx + 1}`;
    } else if (s && typeof s === 'object') {
      const nameCandidate = s.name || s.skillName || s.title || s.skill || s.label || s.value;
      if (nameCandidate && typeof nameCandidate === 'string' && nameCandidate.trim().length > 0) {
        skillName = nameCandidate.trim();
      } else if (s.category && typeof s.category === 'string' && !['advanced', 'intermediate', 'expert', 'beginner'].includes(s.category.trim().toLowerCase())) {
        skillName = s.category.trim();
      }
    }
    const level = typeof s === 'object' && s.level ? s.level : 'Advanced';
    const pct = typeof s === 'object' && s.percentage ? s.percentage : 85;
    return `
    <div class="skill-card scroll-reveal">
      <div class="skill-header">
        <span class="skill-name">${skillName}</span>
        <span class="skill-level">${pct}% (${level})</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="--target-width: ${pct}%;"></div>
      </div>
    </div>
    `;
  }).join('');

  // Format experience HTML
  const experienceHtml = (portfolio.experience || []).map(e => `
    <div class="timeline-item scroll-reveal">
      <div class="timeline-header">
        <h4>${e.role} — <strong>${e.company}</strong></h4>
        <span class="date">${e.startDate || ''} - ${e.isCurrent ? 'Present' : e.endDate || ''}</span>
      </div>
      ${e.location ? `<p class="location">📍 ${e.location}</p>` : ''}
      <p>${e.description || ''}</p>
    </div>
  `).join('');

  // Format education HTML
  const educationHtml = (portfolio.education || []).map(edu => `
    <div class="timeline-item scroll-reveal">
      <div class="timeline-header">
        <h4>${edu.degree} — <strong>${edu.institution}</strong></h4>
        <span class="date">${edu.startDate || ''} - ${edu.endDate || ''}</span>
      </div>
      ${edu.gpa ? `<p class="location">${formatAcademicScore(edu.gpa)}</p>` : ''}
      ${edu.highlights ? `<p>${edu.highlights}</p>` : ''}
    </div>
  `).join('');

  // Format certifications HTML with Data-Attributes for In-Page Modal Triggering
  const certificationsHtml = (portfolio.certifications || []).map(c => {
    const certUrl = c.fileUrl || c.credentialUrl || '';
    return `
    <div class="cert-card scroll-reveal">
      <h4>${c.title}</h4>
      <p class="cert-issuer">${c.issuer} ${c.issueDate ? `(${c.issueDate})` : ''}</p>
      ${certUrl ? `<a href="${certUrl}" data-cert-title="${c.title}" data-cert-issuer="${c.issuer || 'Verified Credential'}" target="_blank" rel="noopener" class="cert-link">Verify Credential ${externalSvg}</a>` : ''}
    </div>
    `;
  }).join('');

  // Section Map for Dynamic Ordering
  const sectionMap = {
    about: aboutMe ? `
    <section class="section scroll-reveal">
      <h2>${tInfo.about}</h2>
      <p class="about-text">${aboutMe}</p>
    </section>` : '',

    skills: portfolio.skills?.length ? `
    <section class="section scroll-reveal">
      <h2>${tInfo.skills}</h2>
      <div class="skills-grid">${skillsHtml}</div>
    </section>` : '',

    projects: portfolio.projects?.length ? `
    <section class="section scroll-reveal">
      <h2>${tInfo.projects}</h2>
      <div class="projects-grid">${projectsHtml}</div>
    </section>` : '',

    experience: portfolio.experience?.length ? `
    <section class="section scroll-reveal">
      <h2>${tInfo.experience}</h2>
      <div class="timeline">${experienceHtml}</div>
    </section>` : '',

    education: portfolio.education?.length ? `
    <section class="section scroll-reveal">
      <h2>${tInfo.education}</h2>
      <div class="timeline">${educationHtml}</div>
    </section>` : '',

    certifications: portfolio.certifications?.length ? `
    <section class="section scroll-reveal">
      <h2>${tInfo.certifications}</h2>
      <div class="certs-grid">${certificationsHtml}</div>
    </section>` : ''
  };

  const orderedSections = sectionOrder
    .filter(secKey => secKey !== 'hero' && visibility[secKey] !== false && sectionMap[secKey])
    .map(secKey => sectionMap[secKey])
    .join('\n');

  // Shared Animation & Component CSS Rules
  const animationCss = `
/* Universal Font & Button Hover Effects */
html, body, h1, h2, h3, h4, h5, h6, input, button, select, textarea, p, a, span, div, .subtitle, .btn, .btn-proj, .tag, .about-text, .skill-name, .timeline-header, .cert-card, .card {
  font-family: ${fontFamily} !important;
}

.skill-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  margin-bottom: 8px !important;
}

.skill-name {
  color: #ffffff !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  flex: 1 !important;
  min-width: 0 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  display: inline-block !important;
}

.skill-level {
  color: ${primaryColor} !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

.scroll-reveal {
  opacity: 0.15;
  transform: translateY(24px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.skill-bar-fill {
  width: 0% !important;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.skill-bar-fill.animated, .scroll-reveal.revealed .skill-bar-fill {
  width: var(--target-width, 85%) !important;
}

.social-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.social-icon:hover {
  transform: translateY(-3px) scale(1.1);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.btn-proj {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-proj.primary {
  background: ${primaryColor};
  color: #ffffff;
  box-shadow: 0 4px 12px ${primaryColor}40;
}

.btn-proj.primary:hover {
  transform: translateY(-2px) scale(1.05);
  opacity: 0.95;
  box-shadow: 0 8px 20px ${primaryColor}60;
}

.btn-proj.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-proj.secondary:hover {
  transform: translateY(-2px) scale(1.05);
  background: rgba(255, 255, 255, 0.18);
}

/* Standalone Certificate Modal CSS */
.fc-cert-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(12px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.fc-cert-modal-card {
  width: 100%;
  max-width: 800px;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
}

.fc-cert-modal-header {
  padding: 16px 24px;
  background: #020617;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fc-cert-modal-header h3 {
  color: #ffffff;
  font-size: 1.1rem;
  margin: 0;
}

.fc-cert-modal-header p {
  color: ${primaryColor};
  font-size: 0.8rem;
  margin: 2px 0 0;
}

.fc-cert-modal-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.8rem;
  cursor: pointer;
}

.fc-cert-modal-close:hover { color: #ffffff; }

.fc-cert-modal-body {
  padding: 20px;
  height: 50vh;
  background: #020617;
}

.fc-cert-modal-body iframe {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 12px;
}

.fc-cert-modal-actions {
  padding: 16px 24px;
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 12px;
  justify-content: center;
}

.fc-btn {
  padding: 10px 20px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  transition: transform 0.2s;
}

.fc-btn.primary { background: ${primaryColor}; color: #ffffff; }
.fc-btn.secondary { background: rgba(255,255,255,0.1); color: #ffffff; }
.fc-btn:hover { transform: scale(1.05); }
`;

  // Generate Theme Specific CSS
  let styleCss = '';
  if (templateId === 'creative-canvas') {
    styleCss = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ${fontFamily}; background: #080c14; background-image: radial-gradient(at 0% 0%, rgba(236, 72, 153, 0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, ${primaryColor}25 0px, transparent 50%); color: #f8fafc; line-height: 1.6; min-height: 100vh; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
.hero { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(16px); padding: 80px 20px 60px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 40px; border-radius: 0 0 32px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
.avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid ${primaryColor}; margin-bottom: 20px; box-shadow: 0 0 25px ${primaryColor}60; transition: transform 0.3s; }
.avatar:hover { transform: scale(1.05); }
h1 { font-size: 3rem; margin-bottom: 8px; color: #ffffff; font-weight: 800; }
.subtitle { font-size: 1.25rem; color: ${primaryColor}; margin-bottom: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.location { color: #94a3b8; font-size: 0.95rem; margin-bottom: 16px; }
.bio { max-width: 650px; margin: 0 auto 24px; color: #cbd5e1; font-size: 1.05rem; }
.hero-actions { display: flex; gap: 12px; justify-content: center; align-items: center; flex-wrap: wrap; }
.btn { padding: 12px 26px; border-radius: 999px; text-decoration: none; font-weight: 700; transition: all 0.2s; font-size: 0.9rem; }
.btn.primary { background: linear-gradient(135deg, ${primaryColor} 0%, #9333ea 100%); color: #ffffff; box-shadow: 0 4px 14px ${primaryColor}50; }
.btn.primary:hover { opacity: 0.95; transform: translateY(-2px) scale(1.05); }
.section { margin: 50px 0; background: rgba(15, 23, 42, 0.55); border: 1px solid rgba(255, 255, 255, 0.08); padding: 32px; border-radius: 24px; backdrop-filter: blur(12px); }
.section h2 { font-size: 1.8rem; margin-bottom: 24px; border-bottom: 2px solid ${primaryColor}40; padding-bottom: 10px; color: ${primaryColor}; font-weight: 800; text-align: center; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.card { background: rgba(30, 41, 59, 0.7); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); transition: transform 0.3s, box-shadow 0.3s; display: flex; flex-direction: column; justify-content: space-between; }
.card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.5); border-color: ${primaryColor}60; }
.card.featured { border-color: ${primaryColor}; }
.featured-badge { background: ${primaryColor}20; color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}40; padding: 8px 16px; font-size: 0.75rem; font-weight: 800; }
.card-cover-wrapper { position: relative; height: 190px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; }
.card-cover-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.95) 100%); display: flex; align-items: flex-end; padding: 16px; }
.card-cover-overlay h4 { font-size: 1.2rem; color: #ffffff; font-weight: 800; }
.card-fallback-cover { height: 170px; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; color: #ffffff; background: linear-gradient(135deg, ${primaryColor}40 0%, #0f172a 100%); }
.card-fallback-cover h4 { font-size: 1.25rem; font-weight: 800; }
.card-body { padding: 22px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.card-body p { font-size: 0.95rem; color: #cbd5e1; margin-bottom: 16px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.tag { background: rgba(255, 255, 255, 0.08); color: ${primaryColor}; padding: 4px 12px; border-radius: 8px; font-size: 0.75rem; border: 1px solid ${primaryColor}30; font-weight: 600; }
.links { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; margin-top: 12px; display: flex; gap: 12px; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.skill-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 16px; }
.skill-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; font-weight: 700; margin-bottom: 8px; }
.skill-level { color: ${primaryColor}; font-size: 0.8rem; }
.skill-bar-bg { width: 100%; height: 6px; background: rgba(15, 23, 42, 0.8); border-radius: 999px; overflow: hidden; }
.skill-bar-fill { height: 100%; background: linear-gradient(90deg, ${primaryColor}, #a855f7); border-radius: 999px; }
.about-text { font-size: 1.05rem; color: #cbd5e1; line-height: 1.8; }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.cert-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 16px; }
.cert-card h4 { font-size: 1.1rem; color: #f8fafc; margin-bottom: 6px; font-weight: 700; }
.cert-issuer { font-size: 0.9rem; color: ${primaryColor}; margin-bottom: 12px; font-weight: 600; }
.cert-link { color: ${primaryColor}; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; padding: 6px 14px; background: ${primaryColor}15; border: 1px solid ${primaryColor}30; border-radius: 8px; }
.timeline { border-left: 2px solid ${primaryColor}40; padding-left: 20px; margin-left: 10px; }
.timeline-item { position: relative; margin-bottom: 30px; }
.timeline-item::before { content: ''; position: absolute; left: -26px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${primaryColor}; }
.timeline-header h4 { font-size: 1.1rem; color: #f8fafc; font-weight: 700; }
.timeline-header .date { font-size: 0.85rem; color: ${primaryColor}; font-weight: 600; }
.footer { text-align: center; padding: 40px 0; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #64748b; font-size: 0.9rem; }
${animationCss}
`;
  } else if (templateId === 'neo-brutalist') {
    styleCss = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ${fontFamily}; background: #faedd9; color: #000000; line-height: 1.6; min-height: 100vh; padding: 20px; }
.container { max-width: 950px; margin: 0 auto; }
.hero { background: ${primaryColor}; border: 4px solid #000000; box-shadow: 8px 8px 0px 0px #000000; padding: 40px 24px; text-align: left; margin-bottom: 40px; }
.avatar { width: 110px; height: 110px; border: 4px solid #000000; box-shadow: 6px 6px 0px 0px #000000; object-fit: cover; margin-bottom: 20px; background: #ffffff; }
h1 { font-size: 2.8rem; margin-bottom: 8px; color: #000000; font-weight: 900; text-transform: uppercase; }
.subtitle { font-size: 1.1rem; color: #000000; background: #ffffff; display: inline-block; padding: 4px 12px; border: 2px solid #000000; margin-bottom: 12px; font-weight: 800; text-transform: uppercase; }
.location { color: #000000; font-size: 0.9rem; font-weight: 700; margin-bottom: 16px; }
.bio { background: #ffffff; border: 3px solid #000000; box-shadow: 4px 4px 0px 0px #000000; padding: 16px; color: #000000; font-size: 0.95rem; font-weight: 700; margin-bottom: 20px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn { padding: 10px 20px; text-decoration: none; font-weight: 900; text-transform: uppercase; font-size: 0.85rem; border: 3px solid #000000; box-shadow: 4px 4px 0px 0px #000000; transition: all 0.1s; }
.btn.primary { background: #000000; color: #ffffff; }
.btn.primary:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
.section { margin: 40px 0; }
.section h2 { font-size: 1.4rem; margin-bottom: 20px; background: #000000; color: #ffffff; display: inline-block; padding: 6px 16px; border: 3px solid #000000; box-shadow: 4px 4px 0px 0px ${primaryColor}; text-transform: uppercase; font-weight: 900; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.card { background: #ffffff; border: 4px solid #000000; box-shadow: 6px 6px 0px 0px #000000; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; }
.card.featured { ring: 3px solid #000000; }
.featured-badge { background: ${primaryColor}; border: 2px solid #000000; padding: 4px 10px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; margin-bottom: 12px; width: fit-content; }
.card-cover-wrapper { position: relative; height: 170px; overflow: hidden; border: 3px solid #000000; margin-bottom: 16px; }
.card-img { width: 100%; height: 100%; object-fit: cover; }
.card-cover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: flex-end; padding: 12px; }
.card-cover-overlay h4 { font-size: 1.1rem; color: #ffffff; font-weight: 900; text-transform: uppercase; }
.card-fallback-cover { height: 140px; padding: 16px; display: flex; flex-direction: column; justify-content: flex-end; background: ${primaryColor}; border: 3px solid #000000; margin-bottom: 16px; color: #000000; }
.card-fallback-cover h4 { font-size: 1.2rem; font-weight: 900; text-transform: uppercase; }
.card-body p { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.tag { background: #e2e8f0; color: #000000; padding: 3px 8px; border: 1.5px solid #000000; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
.links { border-top: 2px solid #000000; padding-top: 12px; display: flex; gap: 10px; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.skill-card { background: ${primaryColor}; border: 3px solid #000000; box-shadow: 4px 4px 0px 0px #000000; padding: 14px; font-weight: 900; text-transform: uppercase; }
.skill-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; margin-bottom: 6px; }
.skill-level { background: #000000; color: #ffffff; padding: 2px 6px; font-size: 0.7rem; }
.skill-bar-bg { width: 100%; height: 6px; background: #ffffff; border: 2px solid #000000; }
.skill-bar-fill { height: 100%; background: #000000; }
.about-text { background: #ffffff; border: 4px solid #000000; box-shadow: 6px 6px 0px 0px #000000; padding: 20px; font-weight: 700; font-size: 0.95rem; }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.cert-card { background: #ffffff; border: 4px solid #000000; box-shadow: 5px 5px 0px 0px #000000; padding: 16px; }
.cert-card h4 { font-size: 1rem; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; }
.cert-issuer { font-size: 0.85rem; font-weight: 800; color: #000000; margin-bottom: 10px; }
.cert-link { background: ${primaryColor}; border: 2px solid #000000; padding: 4px 10px; text-decoration: none; color: #000000; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; display: inline-block; }
.timeline { border-left: 4px solid #000000; padding-left: 20px; margin-left: 10px; }
.timeline-item { background: #ffffff; border: 4px solid #000000; box-shadow: 5px 5px 0px 0px #000000; padding: 16px; margin-bottom: 24px; }
.timeline-header h4 { font-size: 1rem; font-weight: 900; text-transform: uppercase; }
.timeline-header .date { background: #e2e8f0; border: 1px solid #000000; padding: 2px 6px; font-size: 0.75rem; font-weight: 800; display: inline-block; margin-top: 4px; }
.footer { text-align: center; padding: 30px 0; border-top: 4px solid #000000; font-weight: 900; text-transform: uppercase; font-size: 0.85rem; }
${animationCss}
`;
  } else if (templateId === 'minimal-executive') {
    styleCss = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ${fontFamily}; background: #f8fafc; color: #0f172a; line-height: 1.6; min-height: 100vh; }
.container { max-width: 900px; margin: 0 auto; padding: 0 20px; }
.hero { background: #ffffff; padding: 60px 20px 40px; text-align: center; border-bottom: 1px solid #e2e8f0; margin-bottom: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
h1 { font-size: 2.6rem; margin-bottom: 6px; color: #0f172a; font-weight: 800; }
.subtitle { font-size: 1.15rem; color: ${primaryColor}; margin-bottom: 8px; font-weight: 600; }
.location { color: #64748b; font-size: 0.95rem; margin-bottom: 16px; }
.bio { max-width: 600px; margin: 0 auto 24px; color: #475569; font-size: 1rem; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn { padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s; font-size: 0.85rem; }
.btn.primary { background: ${primaryColor}; color: #ffffff; }
.btn.primary:hover { opacity: 0.9; }
.section { margin: 40px 0; }
.section h2 { font-size: 1.5rem; margin-bottom: 20px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 6px; color: #0f172a; font-weight: 800; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.card { background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; }
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 16px rgba(0,0,0,0.08); }
.card.featured { border-color: ${primaryColor}; }
.featured-badge { background: ${primaryColor}15; color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}30; padding: 6px 14px; font-size: 0.75rem; font-weight: 700; }
.card-cover-wrapper { position: relative; height: 160px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; }
.card-cover-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%); display: flex; align-items: flex-end; padding: 14px; }
.card-cover-overlay h4 { font-size: 1.1rem; color: #ffffff; font-weight: 700; }
.card-fallback-cover { height: 150px; padding: 16px; display: flex; flex-direction: column; justify-content: flex-end; background: #f1f5f9; color: #0f172a; border-bottom: 1px solid #e2e8f0; }
.card-fallback-cover h4 { font-size: 1.15rem; font-weight: 700; }
.card-body { padding: 18px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.card-body p { font-size: 0.9rem; color: #475569; margin-bottom: 14px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.tag { background: #f1f5f9; color: #334155; padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; border: 1px solid #e2e8f0; }
.links { border-top: 1px solid #f1f5f9; padding-top: 12px; display: flex; gap: 10px; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.skill-card { background: #ffffff; border: 1px solid #e2e8f0; padding: 14px; border-radius: 10px; }
.skill-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
.skill-level { color: ${primaryColor}; font-size: 0.8rem; }
.skill-bar-bg { width: 100%; height: 6px; background: #f1f5f9; border-radius: 999px; overflow: hidden; }
.skill-bar-fill { height: 100%; background: ${primaryColor}; border-radius: 999px; }
.about-text { font-size: 1rem; color: #334155; line-height: 1.7; background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.cert-card { background: #ffffff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 10px; }
.cert-card h4 { font-size: 1rem; color: #0f172a; margin-bottom: 4px; font-weight: 700; }
.cert-issuer { font-size: 0.85rem; color: ${primaryColor}; margin-bottom: 8px; font-weight: 600; }
.cert-link { color: ${primaryColor}; text-decoration: none; font-size: 0.8rem; font-weight: 600; }
.timeline { border-left: 2px solid #e2e8f0; padding-left: 18px; margin-left: 8px; }
.timeline-item { margin-bottom: 24px; position: relative; }
.timeline-item::before { content: ''; position: absolute; left: -24px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${primaryColor}; }
.timeline-header h4 { font-size: 1rem; color: #0f172a; font-weight: 700; }
.timeline-header .date { font-size: 0.8rem; color: #64748b; }
.footer { text-align: center; padding: 30px 0; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.85rem; }
${animationCss}
`;
  } else if (templateId === 'cyber-matrix') {
    styleCss = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ${fontFamily}; background: #020617; color: #34d399; line-height: 1.6; min-height: 100vh; }
.container { max-width: 950px; margin: 0 auto; padding: 0 20px; }
.hero { background: #0f172a; border: 1px solid ${primaryColor}60; box-shadow: 0 0 20px ${primaryColor}20; padding: 50px 20px 40px; text-align: center; margin-bottom: 40px; border-radius: 12px; }
.avatar { width: 120px; height: 120px; border-radius: 12px; object-fit: cover; border: 2px solid ${primaryColor}; margin-bottom: 20px; box-shadow: 0 0 15px ${primaryColor}50; }
h1 { font-size: 2.8rem; margin-bottom: 6px; color: #ffffff; font-weight: 800; }
.subtitle { font-size: 1.1rem; color: ${primaryColor}; margin-bottom: 8px; font-weight: 700; text-transform: uppercase; }
.location { color: #94a3b8; font-size: 0.9rem; margin-bottom: 16px; }
.bio { max-width: 600px; margin: 0 auto 24px; color: #cbd5e1; font-size: 1rem; background: #020617; padding: 12px; border: 1px solid ${primaryColor}30; border-radius: 6px; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn { padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 700; transition: all 0.2s; font-size: 0.85rem; }
.btn.primary { background: ${primaryColor}; color: #020617; }
.btn.primary:hover { opacity: 0.9; box-shadow: 0 0 12px ${primaryColor}; }
.section { margin: 40px 0; background: #0f172a; border: 1px solid ${primaryColor}40; padding: 24px; border-radius: 12px; }
.section h2 { font-size: 1.4rem; margin-bottom: 20px; border-bottom: 1px solid ${primaryColor}60; padding-bottom: 6px; color: ${primaryColor}; font-weight: 800; text-transform: uppercase; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.card { background: #020617; border-radius: 8px; overflow: hidden; border: 1px solid ${primaryColor}40; display: flex; flex-direction: column; justify-content: space-between; }
.card:hover { border-color: ${primaryColor}; box-shadow: 0 0 15px ${primaryColor}30; }
.card.featured { border-color: ${primaryColor}; }
.featured-badge { background: ${primaryColor}20; color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}40; padding: 6px 14px; font-size: 0.75rem; font-weight: 700; }
.card-cover-wrapper { position: relative; height: 160px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; }
.card-cover-overlay { position: absolute; inset: 0; background: rgba(2,6,23,0.7); display: flex; align-items: flex-end; padding: 14px; }
.card-cover-overlay h4 { font-size: 1.1rem; color: #ffffff; font-weight: 700; }
.card-fallback-cover { height: 140px; padding: 16px; display: flex; flex-direction: column; justify-content: flex-end; background: #0f172a; color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}30; }
.card-fallback-cover h4 { font-size: 1.15rem; font-weight: 700; }
.card-body { padding: 16px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.card-body p { font-size: 0.85rem; color: #94a3b8; margin-bottom: 12px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.tag { background: #0f172a; color: ${primaryColor}; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; border: 1px solid ${primaryColor}30; }
.links { border-top: 1px solid ${primaryColor}30; padding-top: 10px; display: flex; gap: 10px; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.skill-card { background: #020617; border: 1px solid ${primaryColor}30; padding: 12px; border-radius: 6px; }
.skill-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: #ffffff; }
.skill-level { color: ${primaryColor}; font-size: 0.75rem; }
.skill-bar-bg { width: 100%; height: 6px; background: #0f172a; border-radius: 4px; overflow: hidden; }
.skill-bar-fill { height: 100%; background: ${primaryColor}; border-radius: 4px; }
.about-text { font-size: 0.95rem; color: #cbd5e1; line-height: 1.7; }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.cert-card { background: #020617; border: 1px solid ${primaryColor}30; padding: 14px; border-radius: 6px; }
.cert-card h4 { font-size: 1rem; color: #ffffff; margin-bottom: 4px; font-weight: 700; }
.cert-issuer { font-size: 0.85rem; color: ${primaryColor}; margin-bottom: 8px; }
.cert-link { color: ${primaryColor}; text-decoration: none; font-size: 0.8rem; font-weight: 700; }
.timeline { border-left: 2px solid ${primaryColor}40; padding-left: 18px; margin-left: 8px; }
.timeline-item { margin-bottom: 24px; position: relative; }
.timeline-item::before { content: ''; position: absolute; left: -24px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${primaryColor}; }
.timeline-header h4 { font-size: 1rem; color: #ffffff; font-weight: 700; }
.timeline-header .date { font-size: 0.8rem; color: ${primaryColor}; }
.footer { text-align: center; padding: 30px 0; border-top: 1px solid ${primaryColor}30; color: #64748b; font-size: 0.85rem; }
${animationCss}
`;
  } else if (templateId === 'glass-bento') {
    styleCss = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ${fontFamily}; background: #090d16; background-image: radial-gradient(at 20% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%), radial-gradient(at 80% 100%, ${primaryColor}25 0px, transparent 50%); color: #f8fafc; line-height: 1.6; min-height: 100vh; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
.hero { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.12); padding: 70px 20px 50px; text-align: center; border-radius: 28px; margin-top: 30px; margin-bottom: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.avatar { width: 120px; height: 120px; border-radius: 24px; object-fit: cover; border: 2px solid ${primaryColor}; margin-bottom: 20px; box-shadow: 0 0 25px ${primaryColor}50; transition: transform 0.3s; }
.avatar:hover { transform: scale(1.05); }
h1 { font-size: 2.8rem; margin-bottom: 8px; color: #ffffff; font-weight: 800; }
.subtitle { font-size: 1.2rem; color: ${primaryColor}; margin-bottom: 8px; font-weight: 700; }
.location { color: #94a3b8; font-size: 0.95rem; margin-bottom: 16px; }
.bio { max-width: 650px; margin: 0 auto 24px; color: #cbd5e1; font-size: 1.05rem; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn { padding: 10px 24px; border-radius: 12px; text-decoration: none; font-weight: 700; transition: all 0.2s; font-size: 0.85rem; }
.btn.primary { background: ${primaryColor}; color: #ffffff; box-shadow: 0 4px 14px ${primaryColor}50; }
.btn.primary:hover { opacity: 0.9; transform: translateY(-2px); }
.section { margin: 40px 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 28px; border-radius: 24px; }
.section h2 { font-size: 1.6rem; margin-bottom: 24px; border-bottom: 2px solid ${primaryColor}40; padding-bottom: 8px; color: ${primaryColor}; font-weight: 800; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.card { background: rgba(30, 41, 59, 0.7); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.12); transition: transform 0.3s, box-shadow 0.3s; display: flex; flex-direction: column; justify-content: space-between; }
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px ${primaryColor}20; border-color: ${primaryColor}60; }
.card.featured { border-color: ${primaryColor}; }
.featured-badge { background: ${primaryColor}20; color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}40; padding: 6px 16px; font-size: 0.75rem; font-weight: 700; }
.card-cover-wrapper { position: relative; height: 170px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; }
.card-cover-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.9) 100%); display: flex; align-items: flex-end; padding: 16px; }
.card-cover-overlay h4 { font-size: 1.15rem; color: #ffffff; font-weight: 700; }
.card-fallback-cover { height: 150px; padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; color: #ffffff; background: linear-gradient(135deg, ${primaryColor}40 0%, #0f172a 100%); }
.card-fallback-cover h4 { font-size: 1.2rem; font-weight: 800; }
.card-body { padding: 18px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.card-body p { font-size: 0.9rem; color: #cbd5e1; margin-bottom: 14px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.tag { background: rgba(255, 255, 255, 0.08); color: ${primaryColor}; padding: 3px 10px; border-radius: 8px; font-size: 0.75rem; border: 1px solid ${primaryColor}30; }
.links { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 12px; display: flex; gap: 10px; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.skill-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); padding: 14px; border-radius: 14px; }
.skill-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; }
.skill-level { color: ${primaryColor}; font-size: 0.78rem; }
.skill-bar-bg { width: 100%; height: 6px; background: rgba(15, 23, 42, 0.8); border-radius: 999px; overflow: hidden; }
.skill-bar-fill { height: 100%; background: linear-gradient(90deg, ${primaryColor}, #8b5cf6); border-radius: 999px; }
.about-text { font-size: 1rem; color: #cbd5e1; line-height: 1.8; }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.cert-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 14px; }
.cert-card h4 { font-size: 1.05rem; color: #f8fafc; margin-bottom: 4px; font-weight: 700; }
.cert-issuer { font-size: 0.85rem; color: ${primaryColor}; margin-bottom: 10px; font-weight: 600; }
.cert-link { color: ${primaryColor}; text-decoration: none; font-size: 0.8rem; font-weight: 700; }
.timeline { border-left: 2px solid ${primaryColor}40; padding-left: 18px; margin-left: 8px; }
.timeline-item { margin-bottom: 24px; position: relative; }
.timeline-item::before { content: ''; position: absolute; left: -24px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${primaryColor}; }
.timeline-header h4 { font-size: 1rem; color: #f8fafc; font-weight: 700; }
.timeline-header .date { font-size: 0.8rem; color: ${primaryColor}; }
.footer { text-align: center; padding: 30px 0; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #64748b; font-size: 0.85rem; }
${animationCss}
`;
  } else {
    // Default / Dark Tech
    styleCss = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ${fontFamily}; background: #0f172a; color: #f8fafc; line-height: 1.6; min-height: 100vh; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
.hero { background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); padding: 80px 0 60px; text-align: center; border-bottom: 1px solid #334155; }
.avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid ${primaryColor}; margin-bottom: 20px; box-shadow: 0 0 20px ${primaryColor}40; }
h1 { font-size: 2.8rem; margin-bottom: 8px; color: #ffffff; }
.subtitle { font-size: 1.25rem; color: ${primaryColor}; margin-bottom: 8px; font-weight: 600; }
.location { color: #94a3b8; font-size: 0.95rem; margin-bottom: 16px; }
.bio { max-width: 650px; margin: 0 auto 24px; color: #cbd5e1; font-size: 1.05rem; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn { padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.2s; }
.btn.primary { background: ${primaryColor}; color: #0f172a; }
.btn.primary:hover { opacity: 0.9; }
.section { margin: 60px 0; }
.section h2 { font-size: 1.8rem; margin-bottom: 28px; border-bottom: 2px solid #334155; padding-bottom: 8px; color: ${primaryColor}; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.card { background: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; justify-content: space-between; }
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.4); }
.card.featured { border-color: ${primaryColor}; }
.featured-badge { background: ${primaryColor}20; color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}40; padding: 6px 16px; font-size: 0.75rem; font-weight: 700; }
.card-cover-wrapper { position: relative; height: 180px; overflow: hidden; }
.card-img { width: 100%; height: 100%; object-fit: cover; }
.card-cover-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.9) 100%); display: flex; align-items: flex-end; padding: 16px; }
.card-cover-overlay h4 { font-size: 1.15rem; color: #ffffff; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
.card-fallback-cover { height: 160px; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; color: #ffffff; background: linear-gradient(135deg, ${primaryColor}40 0%, #0f172a 100%); }
.card-fallback-cover h4 { font-size: 1.25rem; font-weight: 800; }
.card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.card-body h3 { font-size: 1.2rem; margin-bottom: 8px; color: #ffffff; }
.card-body p { font-size: 0.95rem; color: #94a3b8; margin-bottom: 16px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.tag { background: #0f172a; color: ${primaryColor}; padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; border: 1px solid ${primaryColor}40; }
.links { border-top: 1px solid #334155; padding-top: 12px; margin-top: 12px; display: flex; gap: 12px; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.skill-card { background: #1e293b; border: 1px solid #334155; padding: 14px; border-radius: 12px; }
.skill-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; }
.skill-level { color: ${primaryColor}; font-size: 0.8rem; }
.skill-bar-bg { width: 100%; height: 6px; background: #0f172a; border-radius: 999px; overflow: hidden; }
.skill-bar-fill { height: 100%; background: linear-gradient(90deg, ${primaryColor}, #6366f1); border-radius: 999px; }
.about-text { font-size: 1.05rem; color: #cbd5e1; line-height: 1.8; background: #1e293b; padding: 24px; border-radius: 12px; border: 1px solid #334155; }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.cert-card { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 12px; }
.cert-card h4 { font-size: 1.1rem; color: #f8fafc; margin-bottom: 6px; }
.cert-issuer { font-size: 0.9rem; color: ${primaryColor}; margin-bottom: 12px; font-weight: 600; }
.cert-link { color: ${primaryColor}; text-decoration: none; font-size: 0.85rem; font-weight: 600; }
.timeline { border-left: 2px solid #334155; padding-left: 20px; margin-left: 10px; }
.timeline-item { position: relative; margin-bottom: 30px; }
.timeline-item::before { content: ''; position: absolute; left: -26px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${primaryColor}; }
.timeline-header h4 { font-size: 1.1rem; color: #f8fafc; }
.timeline-header .date { font-size: 0.85rem; color: #94a3b8; }
.footer { text-align: center; padding: 40px 0; border-top: 1px solid #334155; color: #64748b; font-size: 0.9rem; }
${animationCss}
`;
  }

  // Standalone JavaScript file for Scroll Reveals & In-Page Certificate Viewer Modal
  const scriptJs = `// FolioCraft Exported Portfolio - Animations & In-Page Certificate Modal
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10px 0px',
    threshold: 0.02
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const skillFills = entry.target.querySelectorAll('.skill-bar-fill');
        skillFills.forEach(fill => fill.classList.add('animated'));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('revealed');
      const skillFills = el.querySelectorAll('.skill-bar-fill');
      skillFills.forEach(fill => fill.classList.add('animated'));
    } else {
      revealObserver.observe(el);
    }
  });

  // Certificate Modal Handler (Intercepts clicks to avoid Chrome about:blank errors)
  const certLinks = document.querySelectorAll('.cert-link');
  certLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const url = this.getAttribute('href');
      if (url && url !== '#') {
        e.preventDefault();
        const title = this.getAttribute('data-cert-title') || 'Verified Certificate';
        const issuer = this.getAttribute('data-cert-issuer') || 'Verified Credential';
        openCertModal(url, title, issuer);
      }
    });
  });

  document.addEventListener('click', function(e) {
    const modal = document.getElementById('fc-cert-modal');
    if (modal && e.target === modal) closeCertModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCertModal();
  });
});

function openCertModal(url, title, issuer) {
  let modal = document.getElementById('fc-cert-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fc-cert-modal';
    modal.className = 'fc-cert-modal-backdrop';
    document.body.appendChild(modal);
  }

  let blobUrl = url;
  if (url.startsWith('data:')) {
    try {
      const parts = url.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      blobUrl = URL.createObjectURL(blob);
    } catch(err) {
      console.error('Error creating certificate blob:', err);
    }
  }

  modal.innerHTML = \`
    <div class="fc-cert-modal-card">
      <div class="fc-cert-modal-header">
        <div>
          <h3>\${title}</h3>
          <p>Issued by \${issuer}</p>
        </div>
        <button class="fc-cert-modal-close" onclick="closeCertModal()">&times;</button>
      </div>
      <div class="fc-cert-modal-body">
        <iframe src="\${blobUrl}" title="\${title}"></iframe>
      </div>
      <div class="fc-cert-modal-actions">
        <a href="\${blobUrl}" target="_blank" rel="noopener noreferrer" class="fc-btn primary">Open Full Tab ↗</a>
        <button onclick="downloadCertFile('\${blobUrl.replace(/'/g, "\\\\'")}', '\${title.replace(/'/g, "\\\\'")}')" class="fc-btn secondary">Download PDF ⬇</button>
      </div>
    </div>
  \`;
  modal.style.display = 'flex';
}

function downloadCertFile(url, title) {
  try {
    let downloadUrl = url;
    if (url.startsWith('data:')) {
      const parts = url.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      downloadUrl = URL.createObjectURL(blob);
    }
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = downloadUrl;
    const safeTitle = (title || 'Certificate').replace(/[^a-zA-Z0-9_\\-]/g, '_');
    a.download = safeTitle.endsWith('.pdf') ? safeTitle : safeTitle + '.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      if (a.parentNode) document.body.removeChild(a);
    }, 2000);
  } catch(err) {
    console.error('Download error:', err);
    window.open(url, '_blank');
  }
}

function closeCertModal() {
  const modal = document.getElementById('fc-cert-modal');
  if (modal) modal.style.display = 'none';
}
`;

  // Standalone HTML template
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${title}</title>
  <meta name="description" content="${bio}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700;900&family=Inter:wght@300;400;600;700;800&family=Outfit:wght@400;600;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body class="theme-${templateId}">
  ${visibility.hero !== false ? `
  <header class="hero">
    <div class="container hero-content">
      <img src="${avatar}" alt="${name}" class="avatar" />
      <h1>${name}</h1>
      <p class="subtitle">${title}</p>
      ${location ? `<p class="location">📍 ${location}</p>` : ''}
      <p class="bio">${bio}</p>
      <div class="hero-actions">
        ${email ? `<a href="mailto:${email}" class="btn primary">${templateId === 'creative-canvas' ? "Let's Work Together &rarr;" : 'Get in Touch'}</a>` : ''}
        ${portfolio.socials?.github ? `<a href="${portfolio.socials.github}" target="_blank" rel="noopener" class="social-icon" title="GitHub">${githubSvg}</a>` : ''}
        ${portfolio.socials?.linkedin ? `<a href="${portfolio.socials.linkedin}" target="_blank" rel="noopener" class="social-icon" title="LinkedIn">${linkedinSvg}</a>` : ''}
        ${portfolio.socials?.twitter ? `<a href="${portfolio.socials.twitter}" target="_blank" rel="noopener" class="social-icon" title="Twitter">${twitterSvg}</a>` : ''}
        ${portfolio.socials?.website ? `<a href="${portfolio.socials.website}" target="_blank" rel="noopener" class="social-icon" title="Website">${websiteSvg}</a>` : ''}
      </div>
    </div>
  </header>` : ''}

  <main class="container">
    ${orderedSections}
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${name}. Built with FolioCraft.</p>
    </div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`;

  zip.file('index.html', indexHtml);
  zip.file('style.css', styleCss);
  zip.file('script.js', scriptJs);
  zip.file('README.txt', `FolioCraft Exported Portfolio Website
===========================================
To host this portfolio for free:
1. GitHub Pages: Push these files to a GitHub repo and turn on GitHub Pages in repository Settings > Pages.
2. Vercel / Netlify: Drag and drop this unzipped folder into Vercel or Netlify.
3. Traditional Hosting: Upload index.html, style.css, and script.js to your public_html web directory.
`);

  const content = await zip.generateAsync({ type: 'blob' });
  const blobUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-portfolio-web-bundle.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download portfolio data as JSON backup file
 */
export function exportToJSON(portfolio) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolio, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${portfolio.title.toLowerCase().replace(/\s+/g, '-')}-backup.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
