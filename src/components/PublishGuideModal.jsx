import React, { useState } from 'react';
import { X, Globe, Download, Zap, ExternalLink } from 'lucide-react';
import { GithubIcon } from './common/BrandIcons';

export function PublishGuideModal({ isOpen, onClose, onExportZip }) {
  const [activeStepTab, setActiveStepTab] = useState('github'); // 'github', 'vercel', 'netlify'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Globe className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-outfit">How to Publish Your Portfolio</h2>
              <p className="text-xs text-slate-400">Step-by-step guide to hosting your site on a public domain for free</p>
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm">
          
          {/* Hosting Guide Tabs */}
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Publish to Custom Domain / Free Hosting Platforms</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Want your own custom URL like <code className="text-cyan-400 font-fira">yourname.com</code> or <code className="text-cyan-400 font-fira">username.github.io</code>? Download your standalone Web Bundle (.zip) and follow these simple steps:
            </p>

            {/* Platform Selector Buttons */}
            <div className="flex space-x-2 border-b border-slate-800 pb-3 mb-4">
              <button
                onClick={() => setActiveStepTab('github')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeStepTab === 'github'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <GithubIcon className="w-4 h-4 text-indigo-400" />
                <span>GitHub Pages (Free Domain)</span>
              </button>
              <button
                onClick={() => setActiveStepTab('vercel')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeStepTab === 'vercel'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Vercel (1-Click Drag & Drop)</span>
              </button>
              <button
                onClick={() => setActiveStepTab('netlify')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeStepTab === 'netlify'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Netlify (Instant Deploy)</span>
              </button>
            </div>

            {/* Platform Step Instructions */}
            {activeStepTab === 'github' && (
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-white">Download Web Bundle</h4>
                    <p className="text-xs text-slate-400">Click the <strong>Download Web Bundle (.zip)</strong> button below to get your complete <code className="text-cyan-400">index.html</code> and <code className="text-cyan-400">style.css</code> files.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-white">Create a GitHub Repository</h4>
                    <p className="text-xs text-slate-400">Log in to <a href="https://github.com/new" target="_blank" rel="noopener" className="text-cyan-400 hover:underline inline-flex items-center gap-0.5">GitHub.com <ExternalLink className="w-3 h-3" /></a>, create a new public repository named <code className="text-cyan-400">portfolio</code> or <code className="text-cyan-400">username.github.io</code>.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-white">Upload Files & Enable Pages</h4>
                    <p className="text-xs text-slate-400">Upload the unzipped <code className="text-cyan-400">index.html</code> & <code className="text-cyan-400">style.css</code>. Go to <strong>Settings &rarr; Pages &rarr; Source: Deploy from main branch</strong>.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">&check;</div>
                  <div>
                    <h4 className="font-semibold text-emerald-400">Your Live URL!</h4>
                    <p className="text-xs text-slate-400">Your website will automatically be live at <code className="text-emerald-400">https://username.github.io/portfolio</code>!</p>
                  </div>
                </div>
              </div>
            )}

            {activeStepTab === 'vercel' && (
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-white">Download Web Bundle (.zip)</h4>
                    <p className="text-xs text-slate-400">Click download below and unzip the downloaded folder on your desktop.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-white">Drag & Drop on Vercel</h4>
                    <p className="text-xs text-slate-400">Go to <a href="https://vercel.com/new" target="_blank" rel="noopener" className="text-cyan-400 hover:underline inline-flex items-center gap-0.5">Vercel.com <ExternalLink className="w-3 h-3" /></a> and simply drag your unzipped portfolio folder onto the Vercel dashboard.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">&check;</div>
                  <div>
                    <h4 className="font-semibold text-emerald-400">Instant HTTPS URL!</h4>
                    <p className="text-xs text-slate-400">Vercel instantly gives you a free live URL like <code className="text-emerald-400">https://my-portfolio.vercel.app</code> with free SSL!</p>
                  </div>
                </div>
              </div>
            )}

            {activeStepTab === 'netlify' && (
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-white">Unzip Web Package</h4>
                    <p className="text-xs text-slate-400">Download the zip file below and extract it.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-white">Drop on Netlify Drop Zone</h4>
                    <p className="text-xs text-slate-400">Visit <a href="https://app.netlify.com/drop" target="_blank" rel="noopener" className="text-teal-400 hover:underline inline-flex items-center gap-0.5">Netlify Drop <ExternalLink className="w-3 h-3" /></a> and drag the extracted folder onto the upload area.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">&check;</div>
                  <div>
                    <h4 className="font-semibold text-emerald-400">Custom Domain Ready</h4>
                    <p className="text-xs text-slate-400">Netlify provides a live URL and lets you attach any custom domain (e.g. <code className="text-emerald-400">alexrivera.dev</code>) for free!</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <p className="text-xs text-slate-400 hidden sm:block">
            Need help? Download your zip bundle and deploy in under 2 minutes.
          </p>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onExportZip}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Web Bundle (.ZIP)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
