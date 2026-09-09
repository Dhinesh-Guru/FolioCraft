import React, { useState } from 'react';
import { 
  Sparkles, LayoutDashboard, Edit3, Eye, Share2, 
  User, LogOut, Palette, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar({ 
  currentTab, 
  setCurrentTab, 
  onOpenAuth, 
  onOpenPublishGuide, 
  onOpenTemplates,
  onOpenPublicView
}) {
  const { user, isGuest, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 font-outfit">
                FolioCraft
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
                AI BUILDER
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Interactive Portfolio & Resume Maker</p>
          </div>
        </div>

        {/* Navigation Mode Tabs */}
        <nav className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentTab('editor')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'editor'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>

          <button
            onClick={() => setCurrentTab('preview')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'preview'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </nav>

        {/* Action Buttons & User Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Templates Selector Button */}
          <button
            onClick={onOpenTemplates}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all"
            title="Browse & Choose Templates"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">Templates</span>
          </button>

          {/* How to Publish / Hosting Help Center */}
          <button
            onClick={onOpenPublishGuide}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
            title="How to publish your portfolio online"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Publish Help</span>
          </button>

          {/* Quick Share Link */}
          <button
            onClick={onOpenPublicView}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all"
            title="View Hosted Public Portfolio"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>

          {/* Auth State / Profile Menu */}
          {isGuest ? (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 pr-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all group"
              >
                {user.avatar && !user.avatar.includes('dicebear') ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                    {(user.name || user.email || 'User').trim()[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-200 hidden lg:inline max-w-[100px] truncate">
                  {user.name || user.email?.split('@')[0] || 'User'}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenPublishGuide();
                    }}
                    className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>Publish Guide</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      setCurrentTab('dashboard');
                      onOpenAuth('login');
                    }}
                    className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
