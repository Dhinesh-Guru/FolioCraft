import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function EducationTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const education = activePortfolio.education || [];

  const handleAddEducation = () => {
    const newEdu = {
      id: 'edu_' + Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      highlights: ''
    };
    updateActivePortfolio(prev => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }));
  };

  const handleUpdateEdu = (id, field, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      education: (prev.education || []).map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleRemoveEdu = (id) => {
    updateActivePortfolio(prev => ({
      ...prev,
      education: (prev.education || []).filter(e => e.id !== id)
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Education & Academic Background</h3>
          <p className="text-xs text-slate-400">Degrees, universities, honors, and coursework</p>
        </div>
        <button
          onClick={handleAddEducation}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Education #{idx + 1}
              </span>
              <button
                onClick={() => handleRemoveEdu(edu.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Certification</label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)}
                  placeholder="B.S. in Computer Science"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / University</label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)}
                  placeholder="UC Berkeley"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={edu.startDate || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'startDate', e.target.value)}
                  placeholder="2018-08"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={edu.endDate || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'endDate', e.target.value)}
                  placeholder="2022-05"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Percentage / GPA / Score (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'gpa', e.target.value)}
                  placeholder="e.g. 72.67% or 8.08/10"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Highlights / Activities</label>
              <textarea
                rows={2}
                value={edu.highlights || ''}
                onChange={(e) => handleUpdateEdu(edu.id, 'highlights', e.target.value)}
                placeholder="Dean's list, relevant coursework, leadership roles..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
