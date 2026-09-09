import React, { useState } from 'react';
import { MapPin, ExternalLink, Star, FileText, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../common/BrandIcons';
import { ScrollReveal, AnimatedSkillBar } from '../../common/ScrollReveal';
import { PdfViewerModal } from '../../common/PdfViewerModal';
import { formatAcademicScore } from '../../../utils/formatUtils';

export function CreativeCanvasTemplate({ portfolio }) {
  const p = portfolio || {};
  const personal = p.personal || {};
  const socials = p.socials || {};
  const theme = p.theme || {};
  const primaryColor = theme.primaryColor || '#ec4899';
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
        <div className="relative h-52 overflow-hidden border-b border-white/10">
          <img src={proj.imageUrl} alt={proj.title || 'Project preview'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
          <div className="absolute bottom-4 left-6 right-6">
            <h4 className="text-xl font-extrabold text-white line-clamp-1 drop-shadow-md">{proj.title || 'Creative Project'}</h4>
          </div>
        </div>
      );
    }
    return (
      <div 
        className="w-full h-44 p-6 flex flex-col justify-end border-b border-white/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
        style={{ background: `linear-gradient(135deg, ${primaryColor}33 0%, #0f172a 100%)` }}
      >
        <div>
          <h4 className="text-xl font-extrabold text-white line-clamp-1">{proj.title || 'Creative Project'}</h4>
        </div>
      </div>
    );
  };

  const sectionMap = {
    hero: (
      <ScrollReveal>
        <section className="relative rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 sm:p-10 text-center space-y-6 shadow-2xl overflow-hidden">
          {/* Clean Static Profile Image */}
          <div 
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full p-1 shadow-xl hover:scale-105 transition-transform"
            style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #a855f7 100%)` }}
          >
            <img
              src={personal.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
              alt={personal.fullName || 'User Profile'}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <span 
              className="px-3 py-1 text-xs font-bold uppercase tracking-widest border rounded-full"
              style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, color: primaryColor }}
            >
              {personal.professionalTitle || 'UI/UX & Product Designer'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              {personal.fullName || 'Creative Portfolio'}
            </h1>
            {personal.location && (
              <p className="text-xs text-slate-300 flex items-center justify-center gap-1 pt-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personal.location}</span>
              </p>
            )}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {personal.shortBio || 'Crafting human-centered digital experiences, motion design, and brand identity systems.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            {personal.email && (
              <a 
                href={`mailto:${personal.email}`} 
                className="px-5 py-2 rounded-full text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #9333ea 100%)` }}
              >
                Let's Work Together &rarr;
              </a>
            )}
            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-all hover:scale-105">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-all hover:scale-105">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-all hover:scale-105">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </section>
      </ScrollReveal>
    ),

    about: (
      <ScrollReveal>
        <section className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-extrabold tracking-wide text-center flex items-center justify-center gap-1.5" style={{ color: primaryColor }}>
            <Sparkles className="w-4 h-4" />
            <span>About Me</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-sm text-slate-300 leading-relaxed backdrop-blur-md hover:border-white/20 transition-all">
            {personal.aboutMe}
          </div>
        </section>
      </ScrollReveal>
    ),

    skills: (
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-wide text-center" style={{ color: primaryColor }}>Design & Tech Toolkit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
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
              <ScrollReveal key={idx} delay={idx * 60}>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-center text-xs gap-2">
                    <span className="font-bold text-white truncate min-w-0 flex-1">{skillName}</span>
                    <span className="text-[10px] font-semibold shrink-0" style={{ color: primaryColor }}>{pct}% ({level})</span>
                  </div>
                  <AnimatedSkillBar percentage={pct} colorGradient="from-pink-500 to-purple-500" heightClass="h-1.5" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ),

    projects: (
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white text-center">Selected Works & Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(p.projects || []).map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div 
                className={`group relative rounded-3xl bg-slate-900/80 border overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between hover:-translate-y-2 ${
                  proj.featured 
                    ? 'border-pink-500/60 shadow-pink-500/10 ring-1 ring-pink-500/40' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {proj.featured && (
                  <div className="bg-pink-500/20 border-b border-pink-500/30 px-4 py-1.5 flex items-center justify-between text-[11px] font-bold text-pink-300">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>FEATURED CREATIVE WORK</span>
                    </span>
                  </div>
                )}

                {renderProjectCover(proj, idx)}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  </div>

                  {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 text-slate-200 rounded-md font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-3 text-xs font-semibold border-t border-white/10">
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3.5 py-1.5 text-white rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
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
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl flex items-center gap-1.5 transition-all hover:scale-105"
                      >
                        <span>Source Code</span>
                        <GithubIcon className="w-3.5 h-3.5 text-white" />
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

    experience: (
      <section className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-extrabold text-white text-center">Career Journey</h2>
        <div className="space-y-6 border-l-2 border-white/20 pl-6 ml-4">
          {(p.experience || []).map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 80}>
              <div className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-4 border-slate-950" style={{ backgroundColor: primaryColor }} />
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <span className="text-xs font-semibold" style={{ color: primaryColor }}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs font-semibold text-slate-300">{exp.company}</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    education: (
      <section className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-extrabold text-white text-center">Education & Academic Background</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(p.education || []).map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 80}>
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-white/20 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  {edu.gpa && (
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-bold">
                      {formatAcademicScore(edu.gpa)}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold" style={{ color: primaryColor }}>{edu.institution}</p>
                <p className="text-[11px] text-slate-400">{edu.startDate} - {edu.endDate}</p>
                {edu.highlights && <p className="text-xs text-slate-300 mt-2 leading-relaxed">{edu.highlights}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    certifications: (
      <section className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-extrabold text-white text-center">Certifications & Honors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(p.certifications || []).map((cert, idx) => {
            const targetUrl = cert.credentialUrl || cert.fileUrl;
            const isInternalPdf = targetUrl && (targetUrl.startsWith('data:') || targetUrl.endsWith('.pdf'));

            return (
              <ScrollReveal key={cert.id} delay={idx * 80}>
                <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-white/20 transition-all hover:-translate-y-1">
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs font-semibold" style={{ color: primaryColor }}>{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ''}</p>
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      onClick={(e) => handleCertClick(e, cert)}
                      target={isInternalPdf ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs hover:underline pt-1 font-semibold cursor-pointer"
                      style={{ color: primaryColor }}
                    >
                      <FileText className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      <span>Verify / Download Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
    <div className={`w-full min-h-full bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 text-slate-100 p-4 sm:p-8 space-y-12 ${theme.fontId || 'font-outfit'}`}>
      
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
