import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Sparkles, Tag, Star, Upload, Crop } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { usePortfolio } from '../../context/PortfolioContext';
import { polishText } from '../../utils/aiEngine';
import { ImageCropperModal } from '../common/ImageCropperModal';

export function ProjectsTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const projects = activePortfolio.projects || [];

  const [activeCropProjId, setActiveCropProjId] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState('');

  const handleAddProject = () => {
    const newProj = {
      id: 'proj_' + Date.now(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      featured: false,
      category: ''
    };

    updateActivePortfolio(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
  };

  const handleUpdateProject = (id, field, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handleRemoveProject = (id) => {
    updateActivePortfolio(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== id)
    }));
  };

  const handlePolishProjectDescription = (id, currentText) => {
    const polished = polishText(currentText || 'Built high performance web application');
    handleUpdateProject(id, 'description', polished);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Projects & Portfolio Work</h3>
          <p className="text-xs text-slate-400">Showcase your top applications, UI work, and open-source repos</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Project #{idx + 1}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateProject(proj.id, 'featured', !proj.featured)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all flex items-center space-x-1 ${
                    proj.featured 
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                      : 'bg-slate-800/50 text-slate-400 border-slate-700'
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>{proj.featured ? 'Featured' : 'Standard'}</span>
                </button>

                <button
                  onClick={() => handleRemoveProject(proj.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
              <input
                type="text"
                value={proj.title || ''}
                onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                placeholder="DevMetrics Insights Platform"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Project Summary</label>
                <button
                  onClick={() => handlePolishProjectDescription(proj.id, proj.description)}
                  className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3 h-3" /> AI Polish
                </button>
              </div>
              <textarea
                rows={2}
                value={proj.description || ''}
                onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                placeholder="Describe key features, architected solutions, or user metrics..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={proj.liveUrl || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'liveUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub / Source Code URL</label>
                <div className="relative">
                  <GithubIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={proj.githubUrl || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Cover Image (Optional)</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {proj.imageUrl && (
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                    <img src={proj.imageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{proj.imageUrl ? 'Change Image' : 'Upload Cover Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCropImageSrc(reader.result);
                              setActiveCropProjId(proj.id);
                            };
                            reader.readAsDataURL(file);
                            e.target.value = '';
                          }
                        }}
                      />
                    </label>

                    {proj.imageUrl && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setCropImageSrc(proj.imageUrl);
                            setActiveCropProjId(proj.id);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Crop className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Crop / Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateProject(proj.id, 'imageUrl', '')}
                          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400">Upload a screenshot/cover photo, or leave blank to display a dynamic theme gradient cover.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack Tags (Comma Separated)</label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                  onChange={(e) => handleUpdateProject(proj.id, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="React, Node.js, Tailwind CSS, GraphQL"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Project Image Cropper Modal */}
      <ImageCropperModal
        isOpen={Boolean(activeCropProjId && cropImageSrc)}
        onClose={() => {
          setActiveCropProjId(null);
          setCropImageSrc('');
        }}
        imageSrc={cropImageSrc}
        aspectRatio={1.6}
        title="Crop & Position Project Cover"
        onCropSave={(croppedImg) => {
          if (activeCropProjId) {
            handleUpdateProject(activeCropProjId, 'imageUrl', croppedImg);
          }
        }}
      />

    </div>
  );
}
