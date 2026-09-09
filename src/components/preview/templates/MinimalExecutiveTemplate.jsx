import React, { useState } from 'react';
import { ExternalLink, Star, FileText } from 'lucide-react';
import { GithubIcon } from '../../common/BrandIcons';
import { ScrollReveal, AnimatedSkillBar } from '../../common/ScrollReveal';
import { PdfViewerModal } from '../../common/PdfViewerModal';
import { formatAcademicScore } from '../../../utils/formatUtils';

export function MinimalExecutiveTemplate({ portfolio }) {
  const p = portfolio || {};
  const personal = p.personal || {};
  const socials = p.socials || {};
  const theme = p.theme || {};
  const primaryColor = theme.primaryColor || '#334155';
  const visibility = theme.sectionVisibility || {};
  const sectionOrder = theme.sectionOrder || ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications'];

  const [activePdfCert, setActivePdfCert] = useState(null);

  const handleCertClick = (e, cert) => {
    const targetUrl = cert.fileUrl || cert.credentialUrl || '';
    if (targetUrl.startsWith('data:') || targetUrl.includes('.pdf')) {
      e.preventDefault();
      setActivePdfCert(cert);
    }
  };

  const renderProjectCover = (proj, _idx) => {
    if (proj.imageUrl) {
      return (
        <div className="relative h-44 overflow-hidden rounded-t-xl border-b border-slate-200">
          <img
            src={proj.imageUrl}
            alt={proj.title || 'Project preview'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-90" />
          <div className="absolute bottom-3 left-4 right-4">
            <h4 className="text-base font-extrabold text-white line-clamp-1 font-playfair drop-shadow-md">{proj.title || 'Executive Project'}</h4>
          </div>
        </div>
      );
    }
    return (
      <div 
        className="w-full h-36 p-5 rounded-t-xl flex flex-col justify-end border-b border-slate-800 relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <div>
          <h4 className="text-base font-extrabold font-playfair line-clamp-1 text-white">{proj.title || 'Executive Project'}</h4>
        </div>
      </div>
    );
  };

  const sectionMap = {
    hero: (
      <ScrollReveal>
        <header className="relative bg-slate-50/95 backdrop-blur-md border-b-2 border-slate-900 pb-6 pt-2 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 transition-all duration-500">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-playfair">
              {personal.fullName || 'Executive Portfolio'}
            </h1>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest font-inter" style={{ color: primaryColor }}>
              {personal.professionalTitle || 'Executive Leadership & Strategy'}
            </p>
            {personal.location && (
              <p className="text-xs text-slate-500 font-inter">📍 {personal.location}</p>
            )}
          </div>

          {/* Clean Static Profile Avatar */}
          {personal.profilePicture && (
            <img
              src={personal.profilePicture}
              alt={personal.fullName || 'User Profile'}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-900 shadow-md hover:scale-105 transition-transform"
            />
          )}
        </header>
      </ScrollReveal>
    ),

    about: (
      <ScrollReveal>
        <section className="space-y-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest font-inter" style={{ color: primaryColor }}>Executive Summary</h2>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            {personal.aboutMe || personal.shortBio}
          </p>
        </section>
      </ScrollReveal>
    ),

    skills: (
      <section className="space-y-3 font-inter">
        <h2 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-300 pb-1" style={{ color: primaryColor }}>
          Core Competencies & Proficiency Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
          {(p.skills || []).map((skill, idx) => {
            let skillName = `Skill #${idx + 1}`;
            if (typeof skill === 'string') {
              skillName = skill.trim() || `Skill #${idx + 1}`;
            } else if (skill && typeof skill === 'object') {
              const nameCandidate = skill.name || skill.skillName || skill.title || skill.skill || skill.label || skill.value;
              if (nameCandidate && typeof nameCandidate === 'string' && nameCandidate.trim().length > 0) {
                skillName = nameCandidate.trim();
              } else if (skill.category && typeof skill.category === 'string' && !['advanced', 'intermediate', 'expert', 'beginner'].includes(skill.category.trim().toLowerCase())) {
                skillName = skill.category.trim();
              }
            }

            const pct = typeof skill === 'object' && skill.percentage ? skill.percentage : 85;
            const level = typeof skill === 'object' && skill.level ? skill.level : 'Advanced';

            return (
              <ScrollReveal key={idx} delay={idx * 50}>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm hover:border-slate-400 hover:-translate-y-0.5 transition-all">
                  <div className="flex justify-between items-center text-xs gap-2">
                    <span className="font-bold text-slate-900 truncate min-w-0 flex-1">{skillName}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold shrink-0">{pct}% ({level})</span>
                  </div>
                  <AnimatedSkillBar percentage={pct} colorGradient="from-slate-700 to-slate-900" heightClass="h-1.5" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ),

    experience: (
      <section className="space-y-6">
        <h2 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-300 pb-1 font-inter" style={{ color: primaryColor }}>
          Professional Experience
        </h2>
        <div className="space-y-6">
          {(p.experience || []).map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 80}>
              <div className="space-y-1 font-inter p-4 rounded-xl hover:bg-slate-100/70 transition-all border border-transparent hover:border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{exp.role} — <span style={{ color: primaryColor }}>{exp.company}</span></h3>
                  <span className="text-xs text-slate-500 font-semibold">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-xs text-slate-400">{exp.location}</p>}
                <p className="text-xs text-slate-700 leading-relaxed pt-1">{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    projects: (
      <section className="space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-300 pb-1 font-inter" style={{ color: primaryColor }}>
          Key Initiatives & Portfolio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
          {(p.projects || []).map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div 
                className={`rounded-xl border bg-white flex flex-col justify-between shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all ${
                  proj.featured ? 'border-amber-400 ring-1 ring-amber-300' : 'border-slate-200'
                }`}
              >
                {proj.featured && (
                  <div className="bg-amber-100 text-amber-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border-b border-amber-200">
                    <Star className="w-3 h-3 fill-current text-amber-700" />
                    <span>FEATURED INITIATIVE</span>
                  </div>
                )}

                {renderProjectCover(proj, idx)}

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  </div>

                  {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 rounded font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-3 text-xs border-t border-slate-100">
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1.5 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 hover:scale-105 transition-transform"
                      >
                        <span>Source Code</span>
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    education: (
      <section className="space-y-3 font-inter">
        <h2 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-300 pb-1" style={{ color: primaryColor }}>
          Education & Academic Credentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(p.education || []).map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 80}>
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                  {edu.gpa && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-300 rounded text-[10px] font-bold">
                      {formatAcademicScore(edu.gpa)}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium" style={{ color: primaryColor }}>{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                {edu.highlights && <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{edu.highlights}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    certifications: (
      <section className="space-y-3 font-inter">
        <h2 className="text-xs font-extrabold uppercase tracking-widest border-b border-slate-300 pb-1" style={{ color: primaryColor }}>
          Certifications & Verified Honors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(p.certifications || []).map((cert, idx) => {
            const targetUrl = cert.credentialUrl || cert.fileUrl;
            const isInternalPdf = targetUrl && (targetUrl.startsWith('data:') || targetUrl.endsWith('.pdf'));

            return (
              <ScrollReveal key={cert.id} delay={idx * 80}>
                <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-900">{cert.title}</h3>
                  <p className="text-xs text-slate-600">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ''}</p>
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      onClick={(e) => handleCertClick(e, cert)}
                      target={isInternalPdf ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-[11px] hover:underline font-semibold mt-1 inline-flex items-center gap-1 cursor-pointer"
                      style={{ color: primaryColor }}
                    >
                      <FileText className="w-3 h-3" style={{ color: primaryColor }} />
                      <span>Verify Certificate PDF / Link &rarr;</span>
                    </a>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    )
  };

  return (
    <div className={`w-full min-h-full bg-slate-50 text-slate-900 p-6 sm:p-12 space-y-10 ${theme.fontId || 'font-playfair'}`}>
      
      {/* Dynamic Section Ordering */}
      {sectionOrder.map((secKey) => (
        visibility[secKey] !== false && sectionMap[secKey] ? (
          <React.Fragment key={secKey}>
            {sectionMap[secKey]}
          </React.Fragment>
        ) : null
      ))}

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={Boolean(activePdfCert)}
        onClose={() => setActivePdfCert(null)}
        certData={activePdfCert}
      />

    </div>
  );
}
