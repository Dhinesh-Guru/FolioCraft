import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Code2, ExternalLink, Star, Briefcase, GraduationCap, Award, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../common/BrandIcons';
import { ScrollReveal, AnimatedSkillBar } from '../../common/ScrollReveal';
import { PdfViewerModal } from '../../common/PdfViewerModal';
import { formatAcademicScore } from '../../../utils/formatUtils';

export function CyberMatrixTemplate({ portfolio }) {
  const p = portfolio || {};
  const personal = p.personal || {};
  const socials = p.socials || {};
  const theme = p.theme || {};
  const primaryColor = theme.primaryColor || '#22c55e';
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
        <div className="relative h-48 overflow-hidden rounded-t-xl border-b border-emerald-500/30">
          <img
            src={proj.imageUrl}
            alt={proj.title || 'Project preview'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 bg-slate-950/90 border border-emerald-500/40 p-2 rounded-lg backdrop-blur-md">
            <h4 className="text-sm font-bold line-clamp-1 font-fira tracking-wide flex items-center gap-1.5" style={{ color: primaryColor }}>
              <span className="text-xs text-slate-500">$</span>
              <span>{proj.title || 'SYSTEM_MODULE'}</span>
            </h4>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-40 bg-slate-950 p-4 rounded-t-xl flex flex-col justify-end border-b border-emerald-500/30 relative overflow-hidden group-hover:border-emerald-400/60 transition-colors">
        <div className="absolute top-2 right-3 text-[10px] text-slate-600 font-fira">
          // SYS_TARGET_{idx + 1}
        </div>
        <h4 className="text-sm font-bold line-clamp-1 font-fira tracking-wide flex items-center gap-1.5" style={{ color: primaryColor }}>
          <span className="text-xs text-slate-500">$</span>
          <span>{proj.title || 'SYSTEM_MODULE'}</span>
        </h4>
      </div>
    );
  };

  const sectionMap = {
    hero: (
      <ScrollReveal>
        <section className="relative rounded-2xl bg-slate-900/90 border border-emerald-500/40 p-5 sm:p-8 shadow-2xl shadow-emerald-950/50 space-y-6">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 text-xs text-emerald-400/70">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-400">bash - 80x24</span>
            </div>
            <div className="font-mono text-[10px] text-emerald-500/60">
              STATUS: ENCRYPTED // ACTIVE
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-xs font-mono" style={{ color: primaryColor }}>root@matrix:~# ./initialize_profile.sh</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-fira">
                {personal.fullName || 'CYBER ARCHITECT'}
              </h1>

              <p 
                className="text-xs sm:text-sm font-semibold bg-emerald-950/60 border px-3 py-1 rounded-md inline-block"
                style={{ borderColor: `${primaryColor}60`, color: primaryColor }}
              >
                &gt; {personal.professionalTitle || 'Systems Engineer & AI Researcher'}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono max-w-2xl pt-1">
                {personal.shortBio || 'Developing high-concurrency backend services, neural pipelines, and secure cloud infrastructures.'}
              </p>
            </div>

            {/* Clean Static Profile Avatar */}
            {personal.profilePicture && (
              <div className="relative shrink-0">
                <img
                  src={personal.profilePicture}
                  alt={personal.fullName || 'User Profile'}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 shadow-lg hover:scale-105 transition-transform"
                  style={{ borderColor: `${primaryColor}80` }}
                />
              </div>
            )}
          </div>

          {/* Social Links & Contact */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-emerald-500/20 text-xs">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-4 py-2 text-slate-950 font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Execute Contact &rarr;</span>
              </a>
            )}
            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all hover:scale-105">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all hover:scale-105">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all hover:scale-105">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </section>
      </ScrollReveal>
    ),

    about: (
      <ScrollReveal>
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: primaryColor }}>
            <Shield className="w-4 h-4" />
            <span>[SECTION // OPERATOR_MANIFEST]</span>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-xs sm:text-sm leading-relaxed text-slate-300 font-mono shadow-lg">
            {personal.aboutMe}
          </div>
        </section>
      </ScrollReveal>
    ),

    skills: (
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: primaryColor }}>
          <Cpu className="w-4 h-4" />
          <span>[SECTION // SKILL_METRICS]</span>
        </div>
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
                <div className="p-3.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl space-y-2 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-center text-xs font-mono gap-2">
                    <span className="text-white font-bold truncate min-w-0 flex-1">{skillName}</span>
                    <span className="font-bold shrink-0" style={{ color: primaryColor }}>{pct}% ({level})</span>
                  </div>
                  <AnimatedSkillBar percentage={pct} colorGradient="from-emerald-500 to-teal-400" heightClass="h-1.5" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    ),

    projects: (
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: primaryColor }}>
          <Code2 className="w-4 h-4" />
          <span>[SECTION // MATRIX_PROJECTS]</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(p.projects || []).map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 80}>
              <div
                className={`group rounded-2xl bg-slate-900/90 border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-emerald-400 ${
                  proj.featured ? 'border-emerald-500/70 shadow-lg shadow-emerald-500/10' : 'border-emerald-500/30'
                }`}
              >
                {proj.featured && (
                  <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-4 py-1.5 flex items-center justify-between text-[11px] font-bold text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>FEATURED SYSTEM DEPLOYMENT</span>
                    </span>
                  </div>
                )}

                {renderProjectCover(proj, idx)}

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">{proj.description}</p>
                  </div>

                  {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] font-fira bg-slate-950 border border-emerald-500/30 text-emerald-400 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-3 border-t border-emerald-500/20 text-xs">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 transition-all hover:scale-105"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <span>Live Console</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center gap-1.5 transition-all hover:scale-105"
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

    experience: (
      <section className="space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: primaryColor }}>
          <Briefcase className="w-4 h-4" />
          <span>[SECTION // LOG_JOURNEY]</span>
        </div>
        <div className="space-y-3">
          {(p.experience || []).map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 80}>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-1 hover:border-emerald-400 transition-all hover:-translate-y-0.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono" style={{ color: primaryColor }}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300">{exp.company}</p>
                <p className="text-xs text-slate-300 pt-1 font-mono">{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    education: (
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: primaryColor }}>
          <GraduationCap className="w-4 h-4" />
          <span>[SECTION // ACADEMIC_LOG]</span>
        </div>
        <div className="space-y-3">
          {(p.education || []).map((edu, idx) => (
            <ScrollReveal key={edu.id} delay={idx * 80}>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-1.5 hover:border-emerald-400 transition-all">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  {edu.gpa && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-mono">
                      {formatAcademicScore(edu.gpa)}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono" style={{ color: primaryColor }}>{edu.institution}</p>
                <p className="text-[11px] text-slate-400 font-mono">{edu.startDate} - {edu.endDate}</p>
                {edu.highlights && <p className="text-xs text-slate-300 pt-1 font-mono">{edu.highlights}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    ),

    certifications: (
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: primaryColor }}>
          <Award className="w-4 h-4" />
          <span>[SECTION // CREDENTIALS]</span>
        </div>
        <div className="space-y-3">
          {(p.certifications || []).map((cert, idx) => {
            const targetUrl = cert.credentialUrl || cert.fileUrl;
            const isInternalPdf = targetUrl && (targetUrl.startsWith('data:') || targetUrl.endsWith('.pdf'));

            return (
              <ScrollReveal key={cert.id} delay={idx * 80}>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-1.5 hover:border-emerald-400 transition-all">
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs font-mono" style={{ color: primaryColor }}>{cert.issuer} {cert.issueDate ? `[${cert.issueDate}]` : ''}</p>
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      onClick={(e) => handleCertClick(e, cert)}
                      target={isInternalPdf ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs hover:underline pt-1 font-mono cursor-pointer"
                      style={{ color: primaryColor }}
                    >
                      <FileText className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      <span>Verify / Download PDF</span>
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
    <div className={`relative w-full min-h-full bg-slate-950 text-emerald-100 p-4 sm:p-8 space-y-8 overflow-hidden ${theme.fontId || 'font-fira'}`}>
      {/* Matrix Ambient Scanline Overlay */}
      <div className="animate-scanline" />

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
