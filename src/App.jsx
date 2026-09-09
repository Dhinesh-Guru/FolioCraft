import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { EditorView } from './components/EditorView';
import { LivePreviewFrame } from './components/preview/LivePreviewFrame';
import { AuthModal } from './components/AuthModal';
import { PublishGuideModal } from './components/PublishGuideModal';
import { TemplateSelectorModal } from './components/TemplateSelectorModal';
import { PublicViewerModal } from './components/PublicViewerModal';
import { exportToWebBundle } from './utils/exportUtils';

import { useAuth } from './context/AuthContext';

function MainApp() {
  const { user } = useAuth();
  const { activePortfolio } = usePortfolio();
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard', 'editor', 'preview'
  const [isAuthOpen, setIsAuthOpen] = useState(() => !user);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [resetEmail, setResetEmail] = useState('');
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isPublicViewOpen, setIsPublicViewOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('resetToken');
    const emailParam = params.get('email');

    if (token) {
      setAuthInitialMode('reset_new_password');
      if (emailParam) setResetEmail(emailParam);
      setIsAuthOpen(true);
    }
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleExportZip = () => {
    exportToWebBundle(activePortfolio);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-inter flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Brand Navbar Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuth={handleOpenAuth}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenPublicView={() => setIsPublicViewOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'dashboard' && (
          <Dashboard
            onNavigateToEditor={() => setCurrentTab('editor')}
            onNavigateToPreview={() => setCurrentTab('preview')}
            onOpenTemplates={() => setIsTemplatesOpen(true)}
            onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
          />
        )}

        {currentTab === 'editor' && (
          <EditorView
            onOpenTemplates={() => setIsTemplatesOpen(true)}
            onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
          />
        )}

        {currentTab === 'preview' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)]">
            <LivePreviewFrame
              onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
              onOpenTemplates={() => setIsTemplatesOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Interactive Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authInitialMode}
        initialEmail={resetEmail}
      />

      <PublishGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
        onExportZip={handleExportZip}
      />

      <TemplateSelectorModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
      />

      <PublicViewerModal
        isOpen={isPublicViewOpen}
        onClose={() => setIsPublicViewOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <MainApp />
      </PortfolioProvider>
    </AuthProvider>
  );
}
