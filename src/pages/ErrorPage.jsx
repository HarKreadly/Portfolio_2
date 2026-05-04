import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Terminal, 
  RefreshCcw, 
  ShieldAlert,
  Cpu,
  Activity,
  Maximize2,
  Menu,
  MonitorX
} from "lucide-react";
import { slides } from "../data/heroSlides";
import { useSettings } from "../context/SettingsContext";
import MenuModal from "../components/features/Hero/modals/MenuModal";

const ErrorPage = () => {
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

  // Simulate terminal diagnostic output
  useEffect(() => {
    const initialLogs = [
      "INITIATING SYSTEM RECOVERY...",
      "ERROR CODE: 0x404_PAGE_NOT_FOUND",
      "LOCATING LOST SECTOR...",
      "CRITICAL: SIGNAL DEGRADATION DETECTED",
      "ATTEMPTING LINK STABILIZATION...",
      "RECONNECTING TO DATA CORE...",
    ];

    const repeatingLogs = [
      "SEARCHING FOR COORDINATES...",
      "PACKET LOSS: 0.04%",
      "RE-ESTABLISHING HANDSHAKE...",
      "PULSE: SYNCHRONIZING...",
      "RETRYING CORE UPLINK...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < initialLogs.length) {
        setDiagnostics(prev => [...prev, initialLogs[i]]);
        i++;
      } else {
        // Start looping connection attempts
        const loopIdx = (i - initialLogs.length) % repeatingLogs.length;
        setDiagnostics(prev => [...prev.slice(-10), repeatingLogs[loopIdx]]);
        i++;
      }
    }, 1200);

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
            className="w-full h-full object-cover opacity-30 scale-110 blur-sm"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-0 backdrop-blur-3xl bg-black/60 transition-colors duration-500"></div>
      
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Observation Deck // Lost Sector</span>
          </div>
        </div>
      </nav>

      {/* Main Error Console */}
      <div className="relative z-10 h-full max-w-5xl mx-auto flex flex-col justify-center px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
           
           {/* Left Column: Massive Error ID */}
           <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-4 text-red-500/50">
                 <ShieldAlert size={24} />
                 <span className="text-[11px] font-black uppercase tracking-[0.5em]">Critical Failure</span>
              </div>
              <h1 className="text-[12rem] font-black uppercase tracking-tighter leading-none text-white/10 select-none">
                 404
              </h1>
              <div className="space-y-2">
                 <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">System Access <br/> Denied</h2>
                 <p className={`text-zinc-500 font-bold uppercase tracking-widest ${fontSizes[fontSize]}`}>
                    The requested coordinates do not exist in the current sector.
                 </p>
              </div>
              
              <Link to="/" className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-sm rounded-br-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                 <ArrowLeft size={16} />
                 Initiate Re-entry
              </Link>
           </div>

           {/* Right Column: Diagnostic Module */}
           <div className="md:col-span-7 bg-white/5 backdrop-blur-md p-8 rounded-sm rounded-br-[4rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                 <MonitorX size={120} strokeWidth={1} />
              </div>

              <div className="flex items-center gap-3 mb-10">
                 <Terminal size={18} className="text-zinc-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Recovery Diagnostics</span>
              </div>

              <div className="space-y-4 font-mono">
                 {diagnostics.map((log, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex items-center gap-4"
                   >
                      <span className="text-zinc-700 text-[10px]">{idx + 1}.</span>
                      <span className={`uppercase tracking-widest ${log?.includes?.("ERROR") || log?.includes?.("CRITICAL") ? "text-red-500" : "text-zinc-300"} ${fontSizes[fontSize]}`}>
                         {log}
                      </span>
                   </motion.div>
                 ))}
                 <div className="w-2 h-4 bg-white/40 animate-pulse ml-8" />
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-30">
                 <div className="flex items-center gap-4">
                    <Activity size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Protocol: Odyssey</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <Cpu size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Load: 0.04%</span>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* HUD Bottom Status */}
      <footer className="absolute bottom-0 left-0 w-full p-10 flex justify-between items-center opacity-20">
         <div className="flex items-center gap-6 text-[9px] font-black tracking-[0.4em] uppercase">
            <span>Sector 0404</span>
            <div className="h-3 w-px bg-white/20" />
            <span>X: 0.00 Y: 0.00</span>
         </div>
         <div className="text-[9px] font-black tracking-[0.4em] uppercase">
            State: Lost in Deep Space
         </div>
      </footer>

      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModal(false)} />
    </div>
  );
};

export default ErrorPage;