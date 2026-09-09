import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Download, ZoomIn, ZoomOut, Globe, Palette, Loader2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { exportToPDF, exportToWebBundle } from '../../utils/exportUtils';
import { DarkTechTemplate } from './templates/DarkTechTemplate';
import { CreativeCanvasTemplate } from './templates/CreativeCanvasTemplate';
import { MinimalExecutiveTemplate } from './templates/MinimalExecutiveTemplate';
import { NeoBrutalistTemplate } from './templates/NeoBrutalistTemplate';
import { GlassBentoTemplate } from './templates/GlassBentoTemplate';
import { CyberMatrixTemplate } from './templates/CyberMatrixTemplate';

export function LivePreviewFrame({ onOpenPublishGuide, onOpenTemplates }) {
  const { activePortfolio } = usePortfolio();
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [zoomScale, setZoomScale] = useState(1);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      await exportToPDF('live-portfolio-preview', `${activePortfolio.title || 'portfolio'}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const templateId = activePortfolio?.theme?.templateId || 'dark-tech';

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

  const getViewportWidthClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'w-[375px] min-h-[667px] rounded-[36px] border-[8px] border-slate-800 shadow-2xl';
      case 'tablet':
        return 'w-[768px] min-h-[900px] rounded-[24px] border-[6px] border-slate-800 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full max-w-5xl rounded-3xl border border-slate-800/80 shadow-2xl';
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl">
        
        {/* Device Viewport Selector */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
              viewportMode === 'desktop' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
              viewportMode === 'tablet' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
              viewportMode === 'mobile' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 text-xs text-slate-400">
          <button
            onClick={() => setZoomScale(prev => Math.max(0.7, prev - 0.1))}
            className="p-1 hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span>{Math.round(zoomScale * 100)}%</span>
          <button
            onClick={() => setZoomScale(prev => Math.min(1.3, prev + 0.1))}
            className="p-1 hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Export & Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenTemplates}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span>Theme Cards</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>PDF</span>
              </>
            )}
          </button>

          <button
            onClick={() => exportToWebBundle(activePortfolio)}
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Web ZIP</span>
          </button>

          <button
            onClick={onOpenPublishGuide}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Publish</span>
          </button>
        </div>

      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center p-4 sm:p-6 bg-slate-950/60 rounded-3xl border border-slate-800/80">
        <div
          id="live-portfolio-preview"
          className={`transition-all duration-300 bg-slate-950 my-auto ${getViewportWidthClass()}`}
          style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
        >
          {renderTemplateComponent()}
        </div>
      </div>

    </div>
  );
}
