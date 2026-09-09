import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Sparkles, Image, Upload, Trash2, Crop } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { generateSmartBio } from '../../utils/aiEngine';
import { ImageCropperModal } from '../common/ImageCropperModal';

export function PersonalTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const personal = activePortfolio.personal || {};

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [tempCropImg, setTempCropImg] = useState('');

  const handleChange = (field, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleGenerateAiBio = () => {
    const aiBio = generateSmartBio(personal.professionalTitle || 'Software Engineer');
    handleChange('shortBio', aiBio);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      {/* Title & Description */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Personal Information</h3>
          <p className="text-xs text-slate-400">Essential contact details and professional summary</p>
        </div>
        <button
          onClick={handleGenerateAiBio}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
          title="Auto-generate bio using FolioAI"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Bio Enhancer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              required
              value={personal.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Alex Rivera"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Professional Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={personal.professionalTitle || ''}
            onChange={(e) => handleChange('professionalTitle', e.target.value)}
            placeholder="Senior Full-Stack Engineer"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={personal.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex.rivera@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Indian Standard)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={personal.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={personal.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Profile Photo File Upload */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Photo</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 flex items-center justify-center">
              {personal.profilePicture ? (
                <img src={personal.profilePicture} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl bg-gradient-to-tr from-cyan-950 to-indigo-950">
                  {(personal.fullName || 'P')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{personal.profilePicture ? 'Change Photo' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTempCropImg(reader.result);
                          setIsCropperOpen(true);
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                      }
                    }}
                  />
                </label>

                {personal.profilePicture && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setTempCropImg(personal.profilePicture);
                        setIsCropperOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Crop className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Crop / Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChange('profilePicture', '')}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </>
                )}
              </div>

              <p className="text-[11px] text-slate-400">Upload any photo and use the Crop / Edit tool to scale, rotate, or reposition your avatar.</p>
            </div>
          </div>
        </div>

        {/* Image Cropper Modal */}
        <ImageCropperModal
          isOpen={isCropperOpen}
          onClose={() => setIsCropperOpen(false)}
          imageSrc={tempCropImg}
          aspectRatio={1}
          title="Crop & Position Profile Photo"
          onCropSave={(croppedImg) => handleChange('profilePicture', croppedImg)}
        />

      </div>

      {/* Short Bio */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-slate-300">Short Bio / Tagline</label>
          <button
            onClick={handleGenerateAiBio}
            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3 h-3" /> Auto-Generate
          </button>
        </div>
        <textarea
          rows={2}
          value={personal.shortBio || ''}
          onChange={(e) => handleChange('shortBio', e.target.value)}
          placeholder="Building scalable web applications, real-time cloud interfaces..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
        />
      </div>

      {/* About Me Section */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed About Me</label>
        <textarea
          rows={4}
          value={personal.aboutMe || ''}
          onChange={(e) => handleChange('aboutMe', e.target.value)}
          placeholder="Passionate software engineer with experience designing robust frontend architectures..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
        />
      </div>

    </div>
  );
}
