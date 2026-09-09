import React from 'react';
import { Plus, Trash2, Upload, FileText, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function CertificationsTab() {
  const { activePortfolio, updateActivePortfolio } = usePortfolio();
  const certifications = activePortfolio.certifications || [];

  const handleAddCert = () => {
    const newCert = {
      id: 'cert_' + Date.now(),
      title: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
      fileUrl: ''
    };
    updateActivePortfolio(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
  };

  const handleUpdateCert = (id, field, value) => {
    updateActivePortfolio(prev => ({
      ...prev,
      certifications: (prev.certifications || []).map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const handleRemoveCert = (id) => {
    updateActivePortfolio(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(c => c.id !== id)
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white font-outfit">Certifications & Credentials</h3>
          <p className="text-xs text-slate-400">Upload certificate PDFs or add external credential verification links</p>
        </div>
        <button
          onClick={handleAddCert}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, idx) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Credential #{idx + 1}
              </span>
              <button
                onClick={() => handleRemoveCert(cert.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={cert.title || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'title', e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Body / Organization</label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services / Coursera"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Date</label>
                <input
                  type="text"
                  value={cert.issueDate || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'issueDate', e.target.value)}
                  placeholder="2023-06"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Verification Web Link (URL)</label>
                <input
                  type="text"
                  value={cert.credentialUrl || ''}
                  onChange={(e) => handleUpdateCert(cert.id, 'credentialUrl', e.target.value)}
                  placeholder="https://credly.com/badges/..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* PDF / Image Certificate File Upload */}
            <div className="pt-2 border-t border-slate-900">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Attach Certificate PDF / Image File</label>
              <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <label className="cursor-pointer px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{cert.fileUrl ? 'Replace PDF / Image' : 'Upload PDF / Image File'}</span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleUpdateCert(cert.id, 'fileUrl', reader.result);
                          if (!cert.credentialUrl) {
                            handleUpdateCert(cert.id, 'credentialUrl', reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                      }
                    }}
                  />
                </label>

                {cert.fileUrl && (
                  <div className="flex items-center gap-2">
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View Uploaded File</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        handleUpdateCert(cert.id, 'fileUrl', '');
                      }}
                      className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
