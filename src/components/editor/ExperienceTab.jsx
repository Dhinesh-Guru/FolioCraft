import React from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { polishText } from '../../utils/aiEngine';

export function ExperienceTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const experience = activePortfolio.experience || [];

  const handleAddExperience = () => {
    const newExp = {
      id: 'exp_' + Date.now(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    };
    updateActivePortfolio(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExp]
    }));
  };

  const handleUpdateExp = (id, field, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      experience: (prev.experience || []).map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleRemoveExp = (id) => {
    updateActivePortfolio(prev => ({
      ...prev,
      experience: (prev.experience || []).filter(e => e.id !== id)
    }));
  };

  const handlePolishExp = (id, text) => {
    const polished = polishText(text || 'Built web application and features');
    handleUpdateExp(id, 'description', polished);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Work Experience</h3>
          <p className="text-xs text-slate-400">Career timeline, roles, and major achievements</p>
        </div>
        <button
          onClick={handleAddExperience}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Position #{idx + 1}
              </span>
              <button
                onClick={() => handleRemoveExp(exp.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title / Role</label>
                <input
                  type="text"
                  value={exp.role || ''}
                  onChange={(e) => handleUpdateExp(exp.id, 'role', e.target.value)}
                  placeholder="Lead Frontend Engineer"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => handleUpdateExp(exp.id, 'company', e.target.value)}
                  placeholder="Apex Cloud Systems"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate || ''}
                  onChange={(e) => handleUpdateExp(exp.id, 'startDate', e.target.value)}
                  placeholder="2022-01"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">End Date / Present</label>
                <input
                  type="text"
                  disabled={exp.isCurrent}
                  value={exp.isCurrent ? 'Present' : exp.endDate || ''}
                  onChange={(e) => handleUpdateExp(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.isCurrent || false}
                onChange={(e) => handleUpdateExp(exp.id, 'isCurrent', e.target.checked)}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-300 cursor-pointer">
                I currently work in this role
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Key Achievements & Responsibilities</label>
                <button
                  onClick={() => handlePolishExp(exp.id, exp.description)}
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3 h-3" /> AI Polish Action Verbs
                </button>
              </div>
              <textarea
                rows={3}
                value={exp.description || ''}
                onChange={(e) => handleUpdateExp(exp.id, 'description', e.target.value)}
                placeholder="Architected next-generation analytics dashboard serving 250,000+ daily active users..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
