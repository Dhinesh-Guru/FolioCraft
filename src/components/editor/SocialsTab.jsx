import React from 'react';
import { Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon, YoutubeIcon } from '../common/BrandIcons';
import { usePortfolio } from '../../context/PortfolioContext';

export function SocialsTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const socials = activePortfolio.socials || {};

  const handleUpdateSocial = (platform, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const socialPlatforms = [
    { key: 'github', label: 'GitHub Profile', icon: GithubIcon, placeholder: 'https://github.com/alexrivera' },
    { key: 'linkedin', label: 'LinkedIn Profile', icon: LinkedinIcon, placeholder: 'https://linkedin.com/in/alexrivera' },
    { key: 'twitter', label: 'Twitter / X Profile', icon: TwitterIcon, placeholder: 'https://twitter.com/alexrivera' },
    { key: 'website', label: 'Personal Website / Blog', icon: Globe, placeholder: 'https://alexrivera.io' },
    { key: 'dribbble', label: 'Dribbble / Behance Portfolio', icon: DribbbleIcon, placeholder: 'https://dribbble.com/alexrivera' },
    { key: 'youtube', label: 'YouTube Channel / Demo', icon: YoutubeIcon, placeholder: 'https://youtube.com/@alexrivera' }
  ];


  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white font-outfit">Social Media & Contact Links</h3>
        <p className="text-xs text-slate-400">Connect viewers with your online profiles and work</p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{label}</span>
            </label>
            <input
              type="text"
              value={socials[key] || ''}
              onChange={(e) => handleUpdateSocial(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
