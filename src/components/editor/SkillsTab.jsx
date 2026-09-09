import React from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { suggestSkillsForTitle } from '../../utils/aiEngine';

export function SkillsTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const skills = activePortfolio.skills || [];

  const handleAddSkill = () => {
    const newSkill = {
      name: '',
      category: '',
      level: 'Advanced',
      percentage: 80
    };
    updateActivePortfolio(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill]
    }));
  };

  const handleUpdateSkill = (idx, field, value) => {
    updateActivePortfolio(prev => {
      const updated = [...(prev.skills || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, skills: updated };
    });
  };

  const handleRemoveSkill = (idx) => {
    updateActivePortfolio(prev => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAutoSuggestSkills = () => {
    const title = activePortfolio.personal?.professionalTitle || 'Software Engineer';
    const suggested = suggestSkillsForTitle(title);
    updateActivePortfolio(prev => {
      const existingNames = new Set((prev.skills || []).map(s => (s.name || '').toLowerCase().trim()));
      const newToAppend = suggested.filter(s => s.name && !existingNames.has(s.name.toLowerCase().trim()));
      return {
        ...prev,
        skills: [...(prev.skills || []), ...newToAppend]
      };
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Skills & Tech Stack</h3>
          <p className="text-xs text-slate-400">Technical proficiencies, frameworks, tools, and design capabilities</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAutoSuggestSkills}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all"
            title="Auto recommend skills based on job title"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggest Skills</span>
          </button>
          <button
            onClick={handleAddSkill}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={skill.name || ''}
                onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                placeholder="Skill Name (e.g. React)"
                className="bg-transparent text-xs font-bold text-white outline-none border-b border-transparent focus:border-cyan-500 w-2/3"
              />
              <button
                onClick={() => handleRemoveSkill(idx)}
                className="text-slate-500 hover:text-rose-400 p-1 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-semibold">Category</label>
                <input
                  type="text"
                  value={skill.category || ''}
                  onChange={(e) => handleUpdateSkill(idx, 'category', e.target.value)}
                  placeholder="Frontend / Backend"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-semibold">Proficiency Level</label>
                <select
                  value={skill.level || 'Advanced'}
                  onChange={(e) => handleUpdateSkill(idx, 'level', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Proficiency Metric</span>
                <span className="text-cyan-400 font-bold">{skill.percentage || 85}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={skill.percentage || 85}
                onChange={(e) => handleUpdateSkill(idx, 'percentage', parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
