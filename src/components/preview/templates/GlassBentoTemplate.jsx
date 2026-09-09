import React, { useState } from 'react';
import { MapPin, ExternalLink, Star, Sparkles, Briefcase, GraduationCap, Award, Mail, Code, Layers, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../common/BrandIcons';
import { ScrollReveal, AnimatedSkillBar } from '../../common/ScrollReveal';
import { PdfViewerModal } from '../../common/PdfViewerModal';
import { formatAcademicScore } from '../../../utils/formatUtils';

export function GlassBentoTemplate({ portfolio }) {
  const p = portfolio || {};
  const personal = p.personal || {};
  const socials = p.socials || {};
  const theme = p.theme || {};
  const primaryColor = theme.primaryColor || '#6366f1';
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
        <div className="relative h-52 overflow-hidden rounded-t-2xl border-b border-white/10">
          <img
            src={proj.imageUrl}
            alt={proj.title || 'Project preview'}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
            <h4 className="text-lg font-extrabold text-white line-clamp-1 font-jakarta drop-shadow-md group-hover:text-indigo-300 transition-colors">
              {proj.title || 'Bento Project'}
            </h4>
          </div>
        </div>
      );
    }
    return (
      <div 
        className="w-full h-44 p-5 flex flex-col justify-end border-b border-white/10 relative overflow-hidden rounded-t-2xl"
        style={{ background: `linear-gradient(135deg, ${primaryColor}22 0%, #0f172a 100%)` }}
      >
        <h4 className="text-lg font-extrabold text-white line-clamp-1 font-jakarta transition-colors">
          {proj.title || 'Bento Project'}
        </h4>
      </div>
    );
  };

  // Section Renderers
  const sectionMap = {
    hero: (
      <ScrollReveal>
        <section className="relative rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden group">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Profile Image - Clean Static Profile */}
              <div className="relative shrink-0">
                <img
                  src={personal.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
                  alt={personal.fullName || 'User Profile'}
                  className="relative w-32 h-32 sm:w-36 sm:h-36 aspect-square rounded-2xl object-cover border-2 shadow-2xl transition-all duration-300 hover:scale-105"
                  style={{ borderColor: primaryColor }}
                />
              </div>

              <div className="space-y-3 max-w-xl">
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs font-bold shadow-sm"
                  style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}40`, color: primaryColor }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{personal.availability || 'Available for Hiring'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight font-jakarta">
                  {personal.fullName || 'Alex Rivera'}
                </h1>
                <p className="text-sm sm:text-base font-medium" style={{ color: primaryColor }}>
                  {personal.professionalTitle || 'Full-Stack Architect & UI Specialist'}
                </p>
                {personal.location && (
                  <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    <span>{personal.location}</span>
                  </p>
                )}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {personal.shortBio || 'Crafting resilient full-stack web applications, scalable APIs, and intuitive user interfaces.'}
                </p>
              </div>
            </div>

            {/* Action Buttons & Social Links */}
            <div className="flex flex-col items-center sm:items-end space-y-4 w-full md:w-auto">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="w-full sm:w-auto px-6 py-3 text-white font-bold text-xs rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group/btn"
                  style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #4f46e5 100%)` }}
                >
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                </a>
              )}
              <div className="flex items-center gap-2">
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-all hover:scale-110">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-all hover:scale-110">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-all hover:scale-110">
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
        <section>
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: primaryColor }}>
              <Sparkles className="w-4 h-4" />
              <span>About Me & Executive Overview</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {personal.aboutMe}
            </p>
          </div>
        </section>
      </ScrollReveal>
    ),

    skills: (
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2 font-jakarta">
          <Layers className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Technical Skills & Proficiency</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-white/20 hover:bg-slate-900/80 hover:-translate-y-1 transition-all duration-300 space-y-2 group shadow-lg">
                  <div className="flex justify-between items-center text-xs gap-2">
                    <span className="font-bold text-white group-hover:text-slate-200 transition-colors truncate min-w-0 flex-1">{skillName}</span>
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0"
                      style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}40`, color: primaryColor }}
                    >
                      {pct}% ({level})
                    </span>
                  </div>
                  <AnimatedSkillBar percentage={pct} colorGradient="from-indigo-500 via-purple-500 to-pink-500" heightClass="h-1.5" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ),

    projects: (
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-jakarta">
          <Code className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Featured Bento Deployments</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(p.projects || []).map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div
                className={`group relative rounded-3xl bg-slate-900/80 border overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between hover:-translate-y-2 ${
                  proj.featured
                    ? 'border-indigo-500/60 ring-1 ring-indigo-500/40 shadow-indigo-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {proj.featured && (
                  <div className="bg-indigo-500/20 border-b border-indigo-500/30 px-4 py-1.5 flex items-center justify-between text-[11px] font-bold text-indigo-300">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-indigo-400" />
                      <span>FEATURED BENTO PROJECT</span>
                    </span>
                  </div>
                )}

                {renderProjectCover(proj, idx)}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{proj.description}</p>
                  </div>

                  {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 text-[10px] bg-white/5 border border-white/10 text-slate-200 rounded-lg font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-3 border-t border-white/10">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all group/link hover:scale-105"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all hover:scale-105"
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
      <section className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-jakarta">
          <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Career Experience</span>
        </h2>
        <div className="space-y-4">
          {(p.experience || []).map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 80}>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-white/20 hover:-translate-y-1 transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-white font-jakarta">{exp.role}</h3>
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
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2 font-jakarta">
          <GraduationCap className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Education</span>
        </h2>
        <div className="space-y-3">
          {(p.education || []).map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 80}>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-white/20 hover:-translate-y-0.5 transition-all space-y-1.5">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  {edu.gpa && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-bold">
                      {formatAcademicScore(edu.gpa)}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold" style={{ color: primaryColor }}>{edu.institution}</p>
                <p className="text-[11px] text-slate-400">{edu.startDate} - {edu.endDate}</p>
                {edu.highlights && <p className="text-xs text-slate-300 pt-1 leading-relaxed">{edu.highlights}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    certifications: (
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2 font-jakarta">
          <Award className="w-5 h-5" style={{ color: primaryColor }} />
          <span>Certifications</span>
        </h2>
        <div className="space-y-3">
          {(p.certifications || []).map((cert, idx) => {
            const targetUrl = cert.credentialUrl || cert.fileUrl;
            const isInternalPdf = targetUrl && (targetUrl.startsWith('data:') || targetUrl.endsWith('.pdf'));

            return (
              <ScrollReveal key={cert.id} delay={idx * 80}>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-white/20 hover:-translate-y-0.5 transition-all space-y-1.5">
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs font-semibold" style={{ color: primaryColor }}>{cert.issuer}</p>
                  <p className="text-[11px] text-slate-400">Issued: {cert.issueDate || 'Verified'}</p>
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
                      <span>View Certificate PDF / Link</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
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
    <div className={`w-full min-h-full bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8 ${theme.fontId || 'font-jakarta'}`}>
      
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
