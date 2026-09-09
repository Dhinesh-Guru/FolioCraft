import React, { useEffect, useState } from 'react';
import { X, Globe, Copy, Check, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { DarkTechTemplate } from './preview/templates/DarkTechTemplate';
import { CreativeCanvasTemplate } from './preview/templates/CreativeCanvasTemplate';
import { MinimalExecutiveTemplate } from './preview/templates/MinimalExecutiveTemplate';
import { NeoBrutalistTemplate } from './preview/templates/NeoBrutalistTemplate';
import { GlassBentoTemplate } from './preview/templates/GlassBentoTemplate';
import { CyberMatrixTemplate } from './preview/templates/CyberMatrixTemplate';

export function PublicViewerModal({ isOpen, onClose }) {
  const { activePortfolio, incrementViews } = usePortfolio();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && activePortfolio?.id) {
      incrementViews(activePortfolio.id);
    }
  }, [isOpen, activePortfolio?.id, incrementViews]);

  if (!isOpen) return null;

  const templateId = activePortfolio?.theme?.templateId || 'dark-tech';
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
  const publicUrl = `${origin}/?portfolio=${activePortfolio?.slug || activePortfolio?.id || 'my-portfolio'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTemplateComponent = () => {
    switch (templateId) {
      case 'creative-canvas':
        return <CreativeCanvasTemplate portfolio={activePortfolio} />;
      case 'minimal-executive':
        return <MinimalExecutiveTemplate portfolio={activePortfolio} />;
      case 'neo-brutalist':
        return <NeoBrutalistTemplate portfolio={activePortfolio} />;
      case 'glass-bento':
        return <GlassBentoTemplate portfolio={activePortfolio} />;
      case 'cyber-matrix':
        return <CyberMatrixTemplate portfolio={activePortfolio} />;
      case 'dark-tech':
      default:
        return <DarkTechTemplate portfolio={activePortfolio} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[94vh]">
        
        {/* Simulated Browser Address Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* URL bar */}
          <div className="flex-1 max-w-xl mx-4 flex items-center justify-between px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-fira text-slate-300">
            <div className="flex items-center space-x-2 truncate">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{publicUrl}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <button
                onClick={handleCopyLink}
                className="text-cyan-400 hover:text-cyan-300 text-[11px] font-bold flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto bg-slate-950">
          {renderTemplateComponent()}
        </div>

      </div>
    </div>
  );
}
