import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';

function dataURLtoBlob(dataurl) {
  try {
    if (!dataurl || typeof dataurl !== 'string') return null;
    const arr = dataurl.split(',');
    if (arr.length < 2) return null;
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error('Error converting dataURL to blob:', e);
    return null;
  }
}

export function PdfViewerModal({ isOpen, onClose, certData, title = 'Certificate Document' }) {
  const [blobUrl, setBlobUrl] = useState('');

  const targetSrc = certData?.fileUrl || certData?.credentialUrl || '';
  const isDataUrl = targetSrc.startsWith('data:');
  const isPdf = targetSrc.includes('application/pdf') || targetSrc.includes('.pdf') || (isDataUrl && targetSrc.includes('pdf'));
  const isImage = targetSrc.startsWith('data:image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(targetSrc);

  useEffect(() => {
    if (isOpen && targetSrc) {
      document.body.style.overflow = 'hidden';
      if (isDataUrl && isPdf) {
        const blob = dataURLtoBlob(targetSrc);
        if (blob) {
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
          return () => {
            URL.revokeObjectURL(url);
            document.body.style.overflow = '';
          };
        }
      } else {
        setBlobUrl(targetSrc);
      }
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, targetSrc, isDataUrl, isPdf]);

  if (!isOpen || !targetSrc) return null;

  const handleDownload = () => {
    const src = certData?.fileUrl || certData?.credentialUrl || targetSrc;
    if (!src) return;

    try {
      if (src.startsWith('data:')) {
        const blob = dataURLtoBlob(src);
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          const ext = isImage ? 'png' : 'pdf';
          const safeTitle = (certData?.title || title || 'Certificate').replace(/[^a-zA-Z0-9_\-]/g, '_');
          a.download = `${safeTitle}.${ext}`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            if (a.parentNode) document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 2000);
          return;
        }
      }

      // Fallback for Blob URL or HTTP URL
      const downloadUrl = blobUrl || src;
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      const ext = isImage ? 'png' : 'pdf';
      const safeTitle = (certData?.title || title || 'Certificate').replace(/[^a-zA-Z0-9_\-]/g, '_');
      a.download = `${safeTitle}.${ext}`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (a.parentNode) document.body.removeChild(a);
      }, 2000);
    } catch (err) {
      console.error('Certificate Download Error:', err);
      if (blobUrl || src) {
        window.open(blobUrl || src, '_blank');
      }
    }
  };

  const handleOpenNewTab = () => {
    const src = certData?.fileUrl || certData?.credentialUrl || targetSrc;
    if (!src) return;

    if (src.startsWith('data:')) {
      const blob = dataURLtoBlob(src);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (!win || win.closed) {
          // Popup blocked fallback: download directly
          handleDownload();
        }
        return;
      }
    }
    window.open(src, '_blank');
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-outfit line-clamp-1">
                {certData?.title || title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Certificate ({certData?.issuer || 'Official Record'})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenNewTab}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all border border-slate-700 hover:border-slate-600"
              title="Open document in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Open Full Document</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Viewport */}
        <div className="relative flex-1 bg-slate-950 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center min-h-[55vh]">
          {isImage ? (
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={targetSrc}
                alt={certData?.title || 'Certificate Preview'}
                className="max-h-[65vh] object-contain rounded-2xl border border-slate-800 shadow-2xl"
              />
            </div>
          ) : (
            <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
                <FileText className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full">
                  Verified Certificate Document
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
                  {certData?.title || title}
                </h4>
                <p className="text-sm text-cyan-400 font-semibold">
                  Issued by {certData?.issuer || 'Verified Record'} {certData?.issueDate ? `(${certData.issueDate})` : ''}
                </p>
              </div>

              {/* Embedded Frame Viewport (For browsers supporting inline PDF) */}
              <div className="w-full h-[38vh] rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-inner">
                <iframe
                  src={blobUrl || targetSrc}
                  title={certData?.title || 'Certificate Viewer'}
                  className="w-full h-full border-0"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleOpenNewTab}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl flex items-center gap-2 transition-all border border-slate-700 hover:scale-105 shadow-md"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Open PDF in Full Window</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{certData?.issuer ? `Issuer: ${certData.issuer}` : 'Verified Credential Document'}</span>
          {certData?.issueDate && <span>Issued: {certData.issueDate}</span>}
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
