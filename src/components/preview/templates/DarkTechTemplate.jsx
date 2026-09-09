import React, { useState } from 'react';
import { Mail, MapPin, ExternalLink, Code2, Terminal, Award, Briefcase, GraduationCap, Star, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../common/BrandIcons';
import { ScrollReveal, AnimatedSkillBar } from '../../common/ScrollReveal';
import { PdfViewerModal } from '../../common/PdfViewerModal';
import { formatAcademicScore } from '../../../utils/formatUtils';

export function DarkTechTemplate({ portfolio }) {
  const p = portfolio || {};
  const personal = p.personal || {};
  const socials = p.socials || {};
  const theme = p.theme || {};
  const primaryColor = theme.primaryColor || '#06b6d4';
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
        <div className="relative h-48 overflow-hidden border-b border-slate-800">
          <img
            src={proj.imageUrl}
            alt={proj.title || 'Project preview'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
          <div className="absolute bottom-3 left-4 right-4">
            <h4 className="text-base sm:text-lg font-extrabold text-white line-clamp-1 drop-shadow-md">{proj.title || 'Innovation Project'}</h4>
          </div>
        </div>
      );
    }
    return (
      <div 
        className="w-full h-40 p-5 flex flex-col justify-end border-b border-slate-800 relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
        style={{ background: `linear-gradient(135deg, ${primaryColor}22 0%, #090d16 100%)` }}
      >
        <div>
          <h4 className="text-base sm:text-lg font-extrabold text-white line-clamp-1">{proj.title || 'Innovation Project'}</h4>
        </div>
      </div>
    );
  };

  const sectionMap = {
    hero: (
      <ScrollReveal>
        <section className="relative rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800/90 p-6 sm:p-10 overflow-hidden shadow-2xl transition-all duration-500">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={personal.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
              alt={personal.fullName || 'User Profile'}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 shadow-2xl transition-transform duration-300 hover:scale-105"
              style={{ borderColor: primaryColor }}
            />
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold">
                <Terminal className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personal.professionalTitle || 'Software Engineer'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {personal.fullName || 'Portfolio Creator'}
              </h1>
              {personal.location && (
                <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{personal.location}</span>
                </p>
              )}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {personal.shortBio || 'Building scalable web applications and intuitive user experiences.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                {personal.email && (
                  <a href={`mailto:${personal.email}`} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all hover:scale-105">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Contact Me</span>
                  </a>
                )}
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all hover:scale-105">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all hover:scale-105">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all hover:scale-105">
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    ),

    about: (
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Code2 className="w-5 h-5" style={{ color: primaryColor }} />
            <span>About Me</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
            {personal.aboutMe}
          </p>
        </section>
      </ScrollReveal>
    ),

    skills: (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Terminal className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Skills & Proficiency Metrics</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-2.5 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-md">
                  <div className="flex justify-between items-center text-xs gap-2">
                    <span className="font-bold text-white truncate min-w-0 flex-1">{skillName}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 font-semibold shrink-0" style={{ color: primaryColor }}>{pct}% ({level})</span>
                  </div>
                  <AnimatedSkillBar percentage={pct} colorGradient="from-cyan-500 to-indigo-500" heightClass="h-1.5" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ),

    projects: (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Code2 className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Projects & Portfolio Work</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(p.projects || []).map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div 
                className={`group rounded-3xl bg-slate-900/80 border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl ${
                  proj.featured 
                    ? 'border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {proj.featured && (
                  <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-[11px] font-bold text-amber-300">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>FEATURED PROJECT</span>
                    </span>
                  </div>
                )}

                {renderProjectCover(proj, idx)}

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{proj.description}</p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] font-fira bg-slate-950 text-slate-200 border border-slate-800 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center space-x-3 text-xs pt-3 border-t border-slate-800">
                      {proj.liveUrl && (
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-3 py-1.5 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 transition-all hover:scale-105"
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
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center gap-1.5 font-semibold transition-all hover:scale-105"
                        >
                          <span>Source Code</span>
                          <GithubIcon className="w-3.5 h-3.5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    experience: (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Experience Timeline</span>
        </h2>
        <div className="space-y-4">
          {(p.experience || []).map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 80}>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-all hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-white">{exp.role} — <span style={{ color: primaryColor }}>{exp.company}</span></h3>
                  <span className="text-xs text-slate-400 font-fira bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-xs text-slate-500">📍 {exp.location}</p>}
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    education: (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <GraduationCap className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Education</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(p.education || []).map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 80}>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-all hover:-translate-y-0.5">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  {edu.gpa && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold font-fira">
                      {formatAcademicScore(edu.gpa)}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold" style={{ color: primaryColor }}>{edu.institution}</p>
                <p className="text-[11px] text-slate-500 font-fira">{edu.startDate} - {edu.endDate}</p>
                {edu.highlights && <p className="text-xs text-slate-400 mt-2 leading-relaxed">{edu.highlights}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    certifications: (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Award className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Certifications & Credentials</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(p.certifications || []).map((cert, idx) => {
            const targetUrl = cert.credentialUrl || cert.fileUrl;
            const isInternalPdf = targetUrl && (targetUrl.startsWith('data:') || targetUrl.endsWith('.pdf'));

            return (
              <ScrollReveal key={cert.id} delay={idx * 80}>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-all hover:-translate-y-0.5">
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
                      <span>Verify Certificate PDF / Link</span>
                      <ExternalLink className="w-3 h-3" />
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
    <div className={`w-full min-h-full bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-12 ${theme.fontId || 'font-inter'}`}>
      
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
