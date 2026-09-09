import React, { useState, useRef, useEffect } from 'react';
import { X, Crop, ZoomIn, ZoomOut, RotateCw, Check, Move, RefreshCw } from 'lucide-react';

export function ImageCropperModal({ isOpen, onClose, imageSrc, onCropSave, aspectRatio = 1, title = 'Crop Profile Photo' }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgDimensions, setImgDimensions] = useState({ baseWidth: 260, baseHeight: 260 });

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const cropBoxWidth = 260;
  const cropBoxHeight = Math.round(260 / aspectRatio);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  if (!isOpen || !imageSrc) return null;

  const handleImageLoad = (e) => {
    const img = e.target;
    const naturalWidth = img.naturalWidth || 300;
    const naturalHeight = img.naturalHeight || 300;
    
    // Calculate cover scale so the image initially fills the crop box completely without blank gaps
    const scaleX = cropBoxWidth / naturalWidth;
    const scaleY = cropBoxHeight / naturalHeight;
    const coverScale = Math.max(scaleX, scaleY);

    setImgDimensions({
      baseWidth: naturalWidth * coverScale,
      baseHeight: naturalHeight * coverScale
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    setZoom((prev) => Math.min(Math.max(1, prev + delta), 3.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const handleCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    const outputWidth = 400;
    const outputHeight = Math.round(400 / aspectRatio);
    const scaleToCanvas = outputWidth / cropBoxWidth;

    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // 1. Move canvas origin to screen center + scaled offset
    ctx.translate(
      canvas.width / 2 + offset.x * scaleToCanvas,
      canvas.height / 2 + offset.y * scaleToCanvas
    );
    // 2. Rotate around image center
    ctx.rotate((rotation * Math.PI) / 180);
    // 3. Scale by zoom * scaleToCanvas
    ctx.scale(zoom * scaleToCanvas, zoom * scaleToCanvas);

    // 4. Draw image centered at origin with base DOM dimensions
    ctx.drawImage(
      img,
      -imgDimensions.baseWidth / 2,
      -imgDimensions.baseHeight / 2,
      imgDimensions.baseWidth,
      imgDimensions.baseHeight
    );

    ctx.restore();

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCropSave(croppedDataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-outfit">{title}</h3>
              <p className="text-[11px] text-slate-400">Drag to position, scroll/zoom slider to scale, or rotate photo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Crop Viewport Box */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          onWheel={handleWheel}
          className="relative h-72 sm:h-80 bg-slate-950 flex items-center justify-center overflow-hidden cursor-move touch-none"
        >
          {/* Background Image Container */}
          <div
            className="absolute transition-transform duration-75 flex items-center justify-center"
            style={{
              width: `${imgDimensions.baseWidth}px`,
              height: `${imgDimensions.baseHeight}px`,
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop target"
              onLoad={handleImageLoad}
              className="max-w-none pointer-events-none select-none"
              style={{
                width: `${imgDimensions.baseWidth}px`,
                height: `${imgDimensions.baseHeight}px`,
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Mask Overlay with Hole */}
          <div className="absolute inset-0 bg-slate-950/70 pointer-events-none flex items-center justify-center">
            <div
              className={`border-2 border-cyan-400 shadow-2xl pointer-events-none ${
                aspectRatio === 1 ? 'rounded-full' : 'rounded-2xl'
              }`}
              style={{
                width: `${cropBoxWidth}px`,
                height: `${cropBoxHeight}px`,
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.75)'
              }}
            />
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-center pointer-events-none">
            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 rounded-full border border-white/10 inline-flex items-center gap-1">
              <Move className="w-3 h-3 text-cyan-400" /> Click & Drag to move photo | Scroll to zoom
            </span>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="p-5 bg-slate-900 space-y-4 border-t border-slate-800">
          
          {/* Zoom Slider */}
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range"
              min="1"
              max="3.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
            />
            <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="w-10 text-right font-fira text-[11px] text-cyan-400">{Math.round(zoom * 100)}%</span>
          </div>

          {/* Action Tools & Save Button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleRotate}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all"
                title="Rotate 90° Clockwise"
              >
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Rotate</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all"
                title="Reset Zoom & Position"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCrop}
                className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Apply Crop</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
