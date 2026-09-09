import React, { useState } from 'react';
import { 
  Plus, Edit3, Eye, Copy, Trash2, Globe, Download, Sparkles, 
  BarChart3, Palette, Search
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { exportToWebBundle } from '../utils/exportUtils';
import confetti from 'canvas-confetti';

export function Dashboard({ onNavigateToEditor, onNavigateToPreview, onOpenTemplates, onOpenPublishGuide }) {
  const { 
    portfolios, 
    activePortfolioId, 
    setActivePortfolioId, 
    createPortfolio, 
    duplicatePortfolio, 
    deletePortfolio, 
    togglePublishStatus,
    getCompleteness
  } = usePortfolio();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'

  const filteredPortfolios = portfolios.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.personal?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true :
                          filterStatus === 'published' ? p.isPublished : !p.isPublished;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    createPortfolio('My New Portfolio', 'dark-tech');
    onNavigateToEditor();
  };

  const handlePublishToggle = (id, isPublished) => {
    togglePublishStatus(id);
    if (!isPublished) {
      // Trigger celebrate confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner / Welcome Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Portfolio Hub
              </span>
              <span className="text-xs text-slate-400">Manage all your portfolio sites in one place</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
              Build & Showcase Your Best Work
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Select a template, customize your sections with AI assistance, and publish your personal portfolio online or download as PDF & HTML.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={handleCreateNew}
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create Portfolio</span>
            </button>
            <button
              onClick={onOpenTemplates}
              className="flex items-center space-x-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-2xl transition-all"
            >
              <Palette className="w-4 h-4 text-pink-400" />
              <span>Browse Themes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search portfolios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                filterStatus === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({portfolios.length})
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                filterStatus === 'published' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                filterStatus === 'draft' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (window.confirm('Reset all portfolios and start with a clean slate?')) {
                localStorage.removeItem('foliocraft_portfolios');
                window.location.reload();
              }
            }}
            className="px-3 py-1.5 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl hover:bg-rose-500/20 transition-all"
            title="Wipe cached demo data and start clean"
          >
            <span>Reset to Clean Slate</span>
          </button>

          <button
            onClick={onOpenPublishGuide}
            className="flex items-center space-x-2 px-3 py-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl hover:bg-amber-500/20 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Publishing & Domain Help Guide &rarr;</span>
          </button>
        </div>
      </div>

      {/* Portfolios Cards Grid / Empty State */}
      {portfolios.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-outfit">No Portfolios Created Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Get started by creating your first portfolio from scratch. Customize your sections, add projects, and publish live!
          </p>
          <div className="pt-2">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Portfolio</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((p) => {
            const completeness = getCompleteness(p);
            const isSelected = activePortfolioId === p.id;

            return (
              <div
                key={p.id}
                className={`group relative bg-slate-900/90 border rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl ${
                  isSelected
                    ? 'border-cyan-500/60 shadow-lg shadow-cyan-500/5 bg-slate-900'
                    : 'border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.personal?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
                        alt={p.personal?.fullName}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-700 shadow-md"
                      />
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors font-outfit truncate max-w-[180px]">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-400 truncate max-w-[180px]">
                          {p.personal?.fullName || 'Untitled User'}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <button
                      onClick={() => handlePublishToggle(p.id, p.isPublished)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-full border transition-all flex items-center space-x-1 ${
                        p.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${p.isPublished ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                      <span>{p.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </div>

                  {/* Profile Completeness Progress Bar */}
                  <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Completeness</span>
                      <span className="font-semibold text-cyan-400 text-[11px]">{completeness}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats & Theme Info */}
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{p.viewsCount || 0} views</span>
                    </span>
                    <span className="text-[11px] bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50 uppercase font-fira text-slate-300">
                      {p.theme?.templateId || 'dark-tech'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setActivePortfolioId(p.id);
                      onNavigateToEditor();
                    }}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      setActivePortfolioId(p.id);
                      onNavigateToPreview();
                    }}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                    title="Live Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => duplicatePortfolio(p.id)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                    title="Duplicate Portfolio"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => exportToWebBundle(p)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                    title="Export Standalone Web Package (.ZIP)"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deletePortfolio(p.id)}
                    className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
                    title="Delete Portfolio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
