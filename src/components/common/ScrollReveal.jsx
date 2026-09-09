import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

const ScrollInViewContext = createContext(false);

export function useScrollInView() {
  return useContext(ScrollInViewContext);
}

export function ScrollReveal({ children, className = '', delay = 0, threshold = 0 }) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold]);

  return (
    <ScrollInViewContext.Provider value={isInView}>
      <div
        ref={elementRef}
        className={`transition-all duration-700 ease-out will-change-transform ${
          isInView
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-20 scale-95 translate-y-6'
        } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </ScrollInViewContext.Provider>
  );
}

export function AnimatedSkillBar({ percentage = 85, colorGradient = 'from-cyan-500 to-indigo-500', heightClass = 'h-1.5' }) {
  const isInView = useScrollInView();

  return (
    <div className={`w-full ${heightClass} bg-slate-950/80 rounded-full overflow-hidden border border-white/5 p-0.5 relative`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colorGradient} transition-all duration-1000 ease-out`}
        style={{
          width: isInView ? `${percentage}%` : '0%'
        }}
      />
    </div>
  );
}
