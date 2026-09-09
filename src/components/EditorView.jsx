import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code2, Cpu, Award, Share2, Palette } from 'lucide-react';
import { PersonalTab } from './editor/PersonalTab';
import { ExperienceTab } from './editor/ExperienceTab';
import { EducationTab } from './editor/EducationTab';
import { ProjectsTab } from './editor/ProjectsTab';
import { SkillsTab } from './editor/SkillsTab';
import { CertificationsTab } from './editor/CertificationsTab';
import { SocialsTab } from './editor/SocialsTab';
import { ThemeTab } from './editor/ThemeTab';
import { LivePreviewFrame } from './preview/LivePreviewFrame';

export function EditorView({ onOpenTemplates, onOpenPublishGuide }) {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'projects', 'experience', 'skills', 'education', 'certifications', 'socials', 'theme'

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Tech', icon: Cpu },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'socials', label: 'Social Links', icon: Share2 },
    { id: 'theme', label: 'Theme & Layout', icon: Palette }
  ];

  const renderActiveTabComponent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsTab />;
      case 'experience':
        return <ExperienceTab />;
      case 'skills':
        return <SkillsTab />;
      case 'education':
        return <EducationTab />;
      case 'certifications':
        return <CertificationsTab />;
      case 'socials':
        return <SocialsTab />;
      case 'theme':
        return <ThemeTab onOpenTemplates={onOpenTemplates} />;
      case 'personal':
      default:
        return <PersonalTab />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-6 animate-fadeIn">
      
      {/* Left Column Form Navigation & Controls */}
      <div className="w-full lg:w-5/12 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col h-full shadow-2xl overflow-hidden">
        
        {/* Editor Tab Strip */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-3 mb-4 border-b border-slate-800/80 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Form Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {renderActiveTabComponent()}
        </div>

      </div>

      {/* Right Column Real-Time Split Preview */}
      <div className="hidden lg:block lg:w-7/12 h-full">
        <LivePreviewFrame onOpenPublishGuide={onOpenPublishGuide} onOpenTemplates={onOpenTemplates} />
      </div>

    </div>
  );
}
