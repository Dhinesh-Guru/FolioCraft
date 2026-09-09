import React from 'react';
import { Palette, Type, Eye, EyeOff, ArrowUp, ArrowDown, Check } from 'lucide-react';
import { TEMPLATES, FONT_OPTIONS } from '../../constants/initialData';
import { usePortfolio } from '../../context/PortfolioContext';

export function ThemeTab({ onOpenTemplates }) {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const theme = activePortfolio.theme || {};

  const currentTemplateObj = TEMPLATES.find(t => t.id === theme.templateId) || TEMPLATES[0];

  const handleUpdateTheme = (field, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value
      }
    }));
  };

  const handleToggleSectionVisibility = (secKey) => {
    updateActivePortfolio(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        sectionVisibility: {
          ...prev.theme?.sectionVisibility,
          [secKey]: !prev.theme?.sectionVisibility?.[secKey]
        }
      }
    }));
  };

  const handleMoveSection = (index, direction) => {
    const sections = [...(theme.sectionOrder || ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'])];
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= sections.length) return;

    const temp = sections[index];
    sections[index] = sections[newIdx];
    sections[newIdx] = temp;

    handleUpdateTheme('sectionOrder', sections);
  };

  const sectionNames = {
    hero: 'Hero Header & Avatar',
    about: 'About Me Bio',
    skills: 'Skills & Tech Stack',
    experience: 'Work Experience',
    projects: 'Featured Projects',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact & Social Links'
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Theme, Styling & Section Layout</h3>
          <p className="text-xs text-slate-400">Customize templates, primary colors, typography, and section arrangement</p>
        </div>
        <button
          onClick={onOpenTemplates}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-pink-500/20 transition-all"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Visual Template Cards</span>
        </button>
      </div>

      {/* Selected Template Summary Card */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={currentTemplateObj.previewImage}
            alt={currentTemplateObj.name}
            className="w-16 h-12 rounded-lg object-cover border border-slate-700"
          />
          <div>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Active Template</span>
            <h4 className="text-sm font-bold text-white font-outfit">{currentTemplateObj.name}</h4>
            <p className="text-[11px] text-slate-400">{currentTemplateObj.category}</p>
          </div>
        </div>
        <button
          onClick={onOpenTemplates}
          className="text-xs text-cyan-400 hover:underline font-semibold"
        >
          Switch Theme &rarr;
        </button>
      </div>

      {/* Primary Color Palette Picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Accent Color</label>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {currentTemplateObj.accentColors.map((color) => (
              <button
                key={color}
                onClick={() => handleUpdateTheme('primaryColor', color)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  theme.primaryColor === color ? 'border-white scale-110 shadow-lg' : 'border-slate-800 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
            <input
              type="color"
              value={theme.primaryColor || '#06b6d4'}
              onChange={(e) => handleUpdateTheme('primaryColor', e.target.value)}
              className="w-5 h-5 bg-transparent border-0 cursor-pointer"
            />
            <span className="text-xs text-slate-300 uppercase font-fira">{theme.primaryColor || '#06b6d4'}</span>
          </div>
        </div>
      </div>

      {/* Custom Typography Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-cyan-400" />
          <span>Typography Font Family</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              onClick={() => handleUpdateTheme('fontId', font.id)}
              className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                theme.fontId === font.id
                  ? 'border-cyan-500 bg-cyan-500/10 text-white font-semibold'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span style={{ fontFamily: font.family }}>{font.name}</span>
              {theme.fontId === font.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Section Order & Visibility Toggles */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">Section Layout & Ordering</label>
        <div className="space-y-2">
          {(theme.sectionOrder || ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact']).map((secKey, idx, arr) => {
            const isVisible = theme.sectionVisibility?.[secKey] !== false;
            return (
              <div
                key={secKey}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleSectionVisibility(secKey)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isVisible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                    title={isVisible ? 'Hide Section' : 'Show Section'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <span className={isVisible ? 'text-white font-semibold' : 'text-slate-500 line-through'}>
                    {sectionNames[secKey] || secKey}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveSection(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === arr.length - 1}
                    onClick={() => handleMoveSection(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
