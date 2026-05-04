import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hammer, 
  ArrowLeft, 
  Terminal, 
  Cpu,
  Activity,
  Maximize2,
  Menu,
  Zap,
  Layers,
  Code2
} from "lucide-react";
import { slides } from "../data/heroSlides";
import { useSettings } from "../context/SettingsContext";
import MenuModal from "../components/features/Hero/modals/MenuModal";

const Projects = () => {
  const { fontSize } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuModalOpen, setIsMenuModal] = useState(false);
  const [diagnostics, setDiagnostics] = useState([]);

  // Auto-slide background
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(slideTimer);
  }, []);

  // Terminal logs: Linear sequence ending with integration message
  useEffect(() => {
    const sequence = [
      "INITIALIZING SKILLS MODULE...",
      "UPLINK STATUS: PENDING",
      "CORE: COMPILING TECH STACK...",
      "OPTIMIZING COMPONENT ARCHITECTURE...",
      "FETCHING REPOSITORY DATA...",
      "STABILIZING INTERFACE...",
      "WAITING FOR NEW MODULES TO BE INTEGRATED..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setDiagnostics(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval); // Stop execution once finished
      }
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  const fontSizes = {
    sm: "text-[9px]",
    md: "text-[11px]",
    lg: "text-[13px]",
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans select-none">
      
      {/* Cinematic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Background"
            className="w-full h-full object-cover opacity-20 scale-110 blur-md"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-0 backdrop-blur-3xl bg-black/70 transition-colors duration-500"></div>
      
      {/* HUD Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
          <div className="flex gap-2 items-center cursor-pointer group" onClick={() => setIsMenuModal(true)}>
            <div className="p-1.5 rounded-full bg-white/5 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
              <Menu size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Menu</span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <Maximize2 size={12} className="text-zinc-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Protocol // Intelligence Module</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 h-full max-w-5xl mx-auto flex flex-col justify-center px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
           
           {/* Left Column */}
           <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-4 text-cyan-500/50">
                 <Zap size={24} />
                 <span className="text-[11px] font-black uppercase tracking-[0.5em]">Module Offline</span>
              </div>
              <h1 className="text-[10rem] font-black uppercase tracking-tighter leading-none text-white/5 select-none -ml-2">
                 SOON
              </h1>
              <div className="space-y-2">
                 <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Constructing <br/> Projects Core</h2>
                 <p className={`text-zinc-500 font-bold uppercase tracking-widest leading-relaxed ${fontSizes[fontSize]}`}>
                    Currently curating my technical toolkit and immersive digital experiences.
                 </p>
              </div>
              
              <Link to="/" className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-sm rounded-br-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 <ArrowLeft size={16} />
                 Return to Base
              </Link>
           </div>

           {/* Right Column: Deployment Diagnostic Module */}
           <div className="md:col-span-7 bg-white/5 backdrop-blur-md p-8 rounded-sm rounded-br-[4rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-25 transition-opacity">
                 <Layers size={120} strokeWidth={1} />
              </div>

              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <Terminal size={18} className="text-cyan-500/50" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em]">Deployment Status</span>
                </div>
              </div>

              <div className="space-y-4 font-mono">
                 {diagnostics.map((log, idx) => {
                   const isFinalLine = log === "WAITING FOR NEW MODULES TO BE INTEGRATED...";
                   return (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="flex items-center gap-4"
                     >
                        <span className="text-zinc-700 text-[10px]">{idx + 1}.</span>
                        <span className={`uppercase tracking-widest ${isFinalLine ? "text-white font-bold" : (log?.includes?.("PENDING") || log?.includes?.("OFFLINE") ? "text-cyan-500" : "text-zinc-400")} ${fontSizes[fontSize]}`}>
                           {log}
                        </span>
                        {isFinalLine && <div className="w-2 h-4 bg-white animate-pulse" />}
                     </motion.div>
                   );
                 })}
                 {/* Only show the general pulse if the final line hasn't appeared yet */}
                 {!diagnostics.includes("WAITING FOR NEW MODULES TO BE INTEGRATED...") && (
                    <div className="w-2 h-4 bg-cyan-500/40 animate-pulse ml-8" />
                 )}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-30">
                 <div className="flex items-center gap-4">
                    <Activity size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Build v1.0.4</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Code2 size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Stack: REACT // GSAP</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* HUD Bottom Status */}
      <footer className="absolute bottom-0 left-0 w-full p-10 flex justify-between items-center opacity-20">
         <div className="flex items-center gap-6 text-[9px] font-black tracking-[0.4em] uppercase">
            <span>Module: SKILLS_V1</span>
            <div className="h-3 w-px bg-white/20" />
            <span>Progress: 88%</span>
         </div>
         <div className="text-[9px] font-black tracking-[0.4em] uppercase">
            State: Development Horizon
         </div>
      </footer>

      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModal(false)} />
    </div>
  );
};

export default Projects;