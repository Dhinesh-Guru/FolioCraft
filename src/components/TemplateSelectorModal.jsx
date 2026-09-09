import React from 'react';
import { X, Palette, Check } from 'lucide-react';
import { TEMPLATES } from '../constants/initialData';
import { usePortfolio } from '../context/PortfolioContext';

export function TemplateSelectorModal({ isOpen, onClose }) {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();

  if (!isOpen) return null;

  const currentTemplateId = activePortfolio?.theme?.templateId || 'dark-tech';

  const handleSelectTemplate = (templateId) => {
    const selectedObj = TEMPLATES.find(t => t.id === templateId);
    updateActivePortfolio(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        templateId,
        primaryColor: selectedObj?.defaultPrimaryColor || prev.theme.primaryColor,
        fontId: selectedObj?.defaultFont || prev.theme.fontId
      }
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-outfit">Choose Portfolio Template Theme</h2>
              <p className="text-xs text-slate-400">Select a layout & visual theme tailored to your profession before publishing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body — 4 Template Demo Cards */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATES.map((tmpl) => {
            const isSelected = currentTemplateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col ${
                  isSelected
                    ? 'border-cyan-500 bg-slate-800/90 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {/* Visual Demo Image Preview */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={tmpl.previewImage}
                    alt={tmpl.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                  {/* Active Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded-full shadow-lg flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active Theme</span>
                    </div>
                  )}

                  {/* Template Category Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-800">
                    {tmpl.category}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors font-outfit">
                        {tmpl.name}
                      </h3>
                      <div className="flex items-center space-x-1.5">
                        {tmpl.accentColors.slice(0, 4).map((color, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-500 font-fira">
                      Default Font: {tmpl.defaultFont.replace('font-', '').toUpperCase()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTemplate(tmpl.id);
                      }}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-200 group-hover:bg-cyan-500 group-hover:text-slate-950'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Use Template'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <p className="text-xs text-slate-400">
            Tip: You can customize primary accent colors and fonts anytime in the Editor tab.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-xs transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
