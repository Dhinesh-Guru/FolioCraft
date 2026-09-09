import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PORTFOLIO } from '../constants/initialData';

const PortfolioContext = createContext(null);
const STORAGE_KEY_PORTFOLIOS = 'foliocraft_portfolios';

export function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTFOLIOS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error('Failed to load portfolios from storage:', err);
    }
    return [];
  });

  const [activePortfolioId, setActivePortfolioId] = useState(() => {
    return portfolios[0]?.id || null;
  });

  // Save to LocalStorage whenever portfolios change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PORTFOLIOS, JSON.stringify(portfolios));
    } catch (err) {
      console.error('Failed to save portfolios to storage:', err);
    }
  }, [portfolios]);

  // Active Portfolio Object
  const activePortfolio = portfolios.find(p => p.id === activePortfolioId) || portfolios[0] || {
    id: 'empty-temp',
    title: 'My New Portfolio',
    theme: DEFAULT_PORTFOLIO.theme,
    personal: { fullName: '', professionalTitle: '', shortBio: '', aboutMe: '' },
    socials: {},
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: []
  };

  // Create new portfolio from scratch with empty details
  const createPortfolio = (title = 'My New Portfolio', templateId = 'dark-tech') => {
    const newPort = {
      id: 'port_' + Date.now(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'my-portfolio',
      isPublished: false,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      theme: {
        ...DEFAULT_PORTFOLIO.theme,
        templateId
      },
      personal: {
        fullName: '',
        professionalTitle: '',
        profilePicture: '',
        location: '',
        email: '',
        phone: '',
        shortBio: '',
        aboutMe: '',
        availability: ''
      },
      socials: {
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        dribbble: '',
        youtube: ''
      },
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: []
    };

    setPortfolios(prev => [newPort, ...prev]);
    setActivePortfolioId(newPort.id);
    return newPort;
  };

  // Update current active portfolio
  const updateActivePortfolio = (updater) => {
    setPortfolios(prev => prev.map(p => {
      if (p.id === activePortfolioId) {
        const updated = typeof updater === 'function' ? updater(p) : { ...p, ...updater };
        return {
          ...updated,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  // Duplicate portfolio
  const duplicatePortfolio = (id) => {
    const target = portfolios.find(p => p.id === id);
    if (!target) return;

    const copy = {
      ...JSON.parse(JSON.stringify(target)),
      id: 'port_' + Date.now(),
      title: `${target.title} (Copy)`,
      slug: `${target.slug}-copy`,
      isPublished: false,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPortfolios(prev => [copy, ...prev]);
    setActivePortfolioId(copy.id);
  };

  // Delete portfolio
  const deletePortfolio = (id) => {
    setPortfolios(prev => {
      const filtered = prev.filter(p => p.id !== id);
      if (filtered.length === 0) {
        const fallback = { ...DEFAULT_PORTFOLIO, id: 'port_' + Date.now() };
        setActivePortfolioId(fallback.id);
        return [fallback];
      }
      if (activePortfolioId === id) {
        setActivePortfolioId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Toggle publish status
  const togglePublishStatus = (id) => {
    setPortfolios(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isPublished: !p.isPublished, updatedAt: new Date().toISOString() };
      }
      return p;
    }));
  };

  // Increment view counter
  const incrementViews = (id) => {
    setPortfolios(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, viewsCount: (p.viewsCount || 0) + 1 };
      }
      return p;
    }));
  };

  // Calculate completeness percentage (0 - 100%)
  const getCompleteness = (p = activePortfolio) => {
    let score = 0;
    if (p.personal?.fullName) score += 15;
    if (p.personal?.professionalTitle) score += 15;
    if (p.personal?.shortBio) score += 10;
    if (p.personal?.email) score += 10;
    if (p.projects?.length > 0) score += 20;
    if (p.skills?.length > 0) score += 15;
    if (p.experience?.length > 0) score += 10;
    if (p.education?.length > 0) score += 5;
    return Math.min(score, 100);
  };

  return (
    <PortfolioContext.Provider value={{
      portfolios,
      activePortfolio,
      activePortfolioId,
      setActivePortfolioId,
      createPortfolio,
      updateActivePortfolio,
      duplicatePortfolio,
      deletePortfolio,
      togglePublishStatus,
      incrementViews,
      getCompleteness
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
