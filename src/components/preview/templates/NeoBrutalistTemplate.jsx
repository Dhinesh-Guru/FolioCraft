import React, { useState } from 'react';
import { ExternalLink, Star, FileText } from 'lucide-react';
import { GithubIcon } from '../../common/BrandIcons';
import { ScrollReveal, AnimatedSkillBar } from '../../common/ScrollReveal';
import { PdfViewerModal } from '../../common/PdfViewerModal';
import { formatAcademicScore } from '../../../utils/formatUtils';

export function NeoBrutalistTemplate({ portfolio }) {
  const p = portfolio || {};
  const personal = p.personal || {};
  const theme = p.theme || {};
  const primaryColor = theme.primaryColor || '#facc15';
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

  const renderProjectCover = (proj, idx) => {
    if (proj.imageUrl) {
      return (
        <div className="relative h-44 overflow-hidden border-3 border-black">
          <img src={proj.imageUrl} alt={proj.title || 'Project preview'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-2 left-3 right-3 border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black" style={{ backgroundColor: primaryColor }}>
            <h4 className="text-sm font-black uppercase text-black line-clamp-1">{proj.title || 'CYBER PROJECT'}</h4>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-36 border-3 border-black p-4 flex flex-col justify-end text-black font-black relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
        <div>
          <h4 className="text-base uppercase font-black line-clamp-1 text-black">{proj.title || 'CYBER PROJECT'}</h4>
        </div>
      </div>
    );
  };

  const sectionMap = {
    hero: (
      <ScrollReveal>
        <section className="relative border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 transition-all duration-500" style={{ backgroundColor: primaryColor }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-black text-white font-mono text-xs uppercase font-bold inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                [SYS_USER // DEV]
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black font-fira">
                {personal.fullName || 'CYBER CREATOR'}
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase text-slate-900 bg-white px-3 py-1 border-2 border-black inline-block">
                {personal.professionalTitle || 'Cyber Architect & Indie Hacker'}
              </p>
            </div>

            {/* Clean Static Profile Avatar */}
            {personal.profilePicture && (
              <img
                src={personal.profilePicture}
                alt={personal.fullName || 'User Profile'}
                className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] object-cover hover:scale-105 transition-transform"
              />
            )}
          </div>

          <p className="text-xs sm:text-sm font-bold bg-white p-3.5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] leading-relaxed">
            {personal.shortBio || 'Building radical, edgy, high-performance web products and modern interactive interfaces.'}
          </p>
        </section>
      </ScrollReveal>
    ),

    about: personal.aboutMe ? (
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-lg font-black uppercase tracking-wider bg-black text-white px-4 py-1.5 border-4 border-black inline-block shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            // ABOUT_OPERATOR
          </h2>
          <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-xs font-bold leading-relaxed">
            {personal.aboutMe}
          </div>
        </section>
      </ScrollReveal>
    ) : null,

    skills: (p.skills || []).length > 0 ? (
      <section className="space-y-4">
        <h2 className="text-lg font-black uppercase tracking-wider bg-black text-white px-4 py-1.5 border-4 border-black inline-block" style={{ boxShadow: `4px 4px 0px 0px ${primaryColor}` }}>
          // TECH_STACK & METRICS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                <div 
                  className="p-3 text-black border-3 border-black font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all space-y-1"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="uppercase truncate min-w-0 flex-1">{skillName}</span>
                    <span className="bg-black text-white px-1.5 py-0.5 text-[10px] shrink-0">{pct}% ({level})</span>
                  </div>
                  <AnimatedSkillBar percentage={pct} colorGradient="from-black to-slate-900" heightClass="h-1.5" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ) : null,

    projects: (p.projects || []).length > 0 ? (
      <section className="space-y-6">
        <h2 className="text-lg font-black uppercase tracking-wider bg-black text-white px-4 py-1.5 border-4 border-black inline-block" style={{ boxShadow: `4px 4px 0px 0px ${primaryColor}` }}>
          // FEATURED_DEPLOYMENTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {p.projects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div 
                className={`bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4 flex flex-col justify-between ${
                  proj.featured ? 'ring-2 ring-black' : ''
                }`}
              >
                {proj.featured && (
                  <div className="border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black" style={{ backgroundColor: primaryColor }}>
                    <Star className="w-3 h-3 fill-current text-black" />
                    <span>FEATURED CYBER DEPLOYMENT</span>
                  </div>
                )}

                {renderProjectCover(proj, idx)}

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed font-mono">{proj.description}</p>

                  {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-slate-200 border border-black font-bold uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t-2 border-black">
                  {proj.liveUrl && (
                    <a 
                      href={proj.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 text-center py-2 text-black font-black text-xs border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span>LAUNCH DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a 
                      href={proj.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 text-center py-2 bg-slate-100 hover:bg-slate-200 text-black font-black text-xs border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
                    >
                      <span>SOURCE CODE</span>
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ) : null,

    experience: (p.experience || []).length > 0 ? (
      <section className="space-y-6">
        <h2 className="text-lg font-black uppercase tracking-wider bg-black text-white px-4 py-1.5 border-4 border-black inline-block shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
          // CAREER_LOGS
        </h2>
        <div className="space-y-4">
          {p.experience.map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 80}>
              <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-sm font-black uppercase">{exp.role} @ <span className="px-2 py-0.5 border-2 border-black text-black" style={{ backgroundColor: primaryColor }}>{exp.company}</span></h3>
                  <span className="text-xs font-bold bg-slate-200 px-2 py-0.5 border border-black">{exp.startDate} - {exp.isCurrent ? 'PRESENT' : exp.endDate}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed pt-1">{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ) : null,

    education: (p.education || []).length > 0 ? (
      <section className="space-y-6">
        <h2 className="text-lg font-black uppercase tracking-wider bg-black text-white px-4 py-1.5 border-4 border-black inline-block shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]">
          // ACADEMIC_RECORD
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {p.education.map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 80}>
              <div className="bg-white border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-black uppercase">{edu.degree}</h3>
                  {edu.gpa && (
                    <span className="text-black px-2 py-0.5 border-2 border-black text-[10px] font-black" style={{ backgroundColor: primaryColor }}>
                      {formatAcademicScore(edu.gpa)}
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-indigo-600">{edu.institution}</p>
                <p className="text-[11px] font-semibold text-slate-600">{edu.startDate} - {edu.endDate}</p>
                {edu.highlights && <p className="text-xs font-semibold text-slate-800 pt-1">{edu.highlights}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ) : null,

    certifications: (p.certifications || []).length > 0 ? (
      <section className="space-y-6">
        <h2 className="text-lg font-black uppercase tracking-wider bg-black text-white px-4 py-1.5 border-4 border-black inline-block shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]">
          // CREDENTIALS_VERIFIED
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {p.certifications.map((cert, idx) => {
            const targetUrl = cert.credentialUrl || cert.fileUrl;
            const isInternalPdf = targetUrl && (targetUrl.startsWith('data:') || targetUrl.endsWith('.pdf'));

            return (
              <ScrollReveal key={cert.id} delay={idx * 80}>
                <div className="bg-white border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-2">
                  <h3 className="text-xs font-black uppercase">{cert.title}</h3>
                  <p className="text-xs font-bold text-slate-700">{cert.issuer} {cert.issueDate ? `[${cert.issueDate}]` : ''}</p>
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      onClick={(e) => handleCertClick(e, cert)}
                      target={isInternalPdf ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 text-black border-2 border-black font-black text-[11px] cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FileText className="w-3.5 h-3.5 text-black" />
                      <span>VERIFY_PDF &rarr;</span>
                    </a>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ) : null
  };

  return (
    <div className={`w-full min-h-full bg-[#faedd9] text-slate-950 p-4 sm:p-8 space-y-10 ${theme.fontId || 'font-fira'}`}>
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
