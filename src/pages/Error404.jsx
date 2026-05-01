import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  const canvasRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Star {
      constructor(isInitial = false) {
        this.isInitial = isInitial;
        this.reset();
      }

      reset() {
        // Spawn from the top and sides
        this.x = Math.random() * canvas.width;
        this.y = this.isInitial ? Math.random() * canvas.height : -20;
        this.isInitial = false;

        this.size = Math.random() * 2 + 0.5;
        // Faster speed as they get closer to the bottom (gravity)
        this.speed = Math.random() * 2 + 1;
        this.drift = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.y += this.speed;
        this.x += this.drift;
        
        // Accelerate as they approach the massive black hole at the bottom
        const gravityEffect = (this.y / canvas.height) * 4;
        this.y += gravityEffect;

        // Reset once they "sink" into the bottom void
        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = isDarkMode ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      stars = Array.from({ length: 250 }, () => new Star(true));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isDarkMode]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-1000 flex flex-col font-sans">
      
      {/* MASSIVE BOTTOM BLACK HOLE (The Sink) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[40vh] z-20 pointer-events-none">
        {/* Accretion Disk - Saturn Perspective at the bottom */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'rotateX(80deg) translateY(-50%)' }}
        >
          <div className="w-full h-full border-[2px] border-stone-200/30 dark:border-stone-800/30 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-10 border-[1px] border-stone-100/20 dark:border-stone-900/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
        </div>
        
        {/* The Giant Core Void */}
        <div className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 w-full h-full bg-black rounded-[100%] shadow-[0_-20px_100px_rgba(0,0,0,0.8)]" />
        
        {/* Atmospheric Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-stone-100 dark:bg-stone-900/40 rounded-full blur-[120px] opacity-70 -z-10" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* TOP SECTION - NAVIGATION */}
      <div className="relative z-30 p-12 flex justify-between items-start w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-900 dark:text-stone-100">Har Kreadly</span>
          <span className="text-[9px] font-bold text-stone-300 dark:text-stone-700 uppercase tracking-widest">Observation Deck</span>
        </div>
        
        <Link to="/" className="group flex items-center gap-4 py-3 px-8 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase">Initiate Re-entry</span>
        </Link>
      </div>

      {/* MIDDLE SECTION - THE "CLOSE" NARRATIVE */}
      <div className="relative z-30 flex-1 flex flex-col justify-center px-12 md:px-24">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white italic leading-none mb-6">
            You have left Earth.
          </h2>
          <div className="h-px w-12 bg-stone-900 dark:bg-white opacity-20 mb-6" />
          <p className="text-[11px] md:text-[13px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] leading-relaxed max-w-sm">
            Description: Lost attempting to <br/> make new discovery.
          </p>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="relative z-30 p-12 flex justify-between text-[9px] font-black tracking-[0.4em] uppercase text-stone-300 dark:text-stone-800">
        <span>Sector 0404</span>
        <span>Odyssey Protocol — 2026</span>
      </div>
    </div>
  );
};

export default Error404;