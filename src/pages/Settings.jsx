import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Monitor, 
  Globe, 
  Type, 
  RefreshCcw,
  ArrowLeft,
  Check,
  ChevronRight,
  Zap,
  Activity,
  Menu,
  Linkedin,
  Instagram,
  Github,
  Maximize2,
  MousePointer2,
  Sparkles,
  Tv,
  Film,
  Wind,
  Gauge,
  Cpu,
  Layers,
  Palette,
  Wind as ParticlesIcon
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { slides } from "../data/heroSlides";
import LanguageSelector from "../components/common/LanguageSelector";
import MenuModal from "../components/features/Hero/modals/MenuModal";
import { useSettings } from "../context/SettingsContext";

// Memoized Toggle for better performance
const SettingToggle = memo(({ icon: Icon, label, sub, active, onToggle }) => (
  <div 
    className={`flex items-center justify-between p-3 rounded-sm rounded-br-2xl border transition-colors duration-200 cursor-pointer group ${
      active 
      ? "bg-white text-black border-white shadow-xl" 
      : "bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10"
    }`} 
    onClick={onToggle}
  >
    <div className="flex items-center gap-3">
       <div className={`p-1.5 rounded-lg ${active ? "bg-black/5" : "bg-white/5"} transition-colors duration-200`}>
          <Icon size={14} />
       </div>
       <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
          <span className={`text-[7px] font-bold uppercase tracking-widest ${active ? "opacity-40" : "text-zinc-700"}`}>{sub}</span>
       </div>
    </div>
    <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-200 border ${active ? "bg-black/10 border-black/20" : "bg-white/5 border-white/5"}`}>
       <motion.div 
         animate={{ x: active ? 20 : 0 }}
         transition={{ type: "spring", stiffness: 500, damping: 30 }}
         className={`w-3 h-3 rounded-full ${active ? "bg-black" : "bg-zinc-600"}`} 
       />
    </div>
  </div>
));

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation("common");
  const { 
    cursorEnabled, setCursorEnabled, 
    animationsEnabled, setAnimationsEnabled,
    sparksEnabled, setSparksEnabled,
    floatingParticles, setFloatingParticles,
    scanlines, setScanlines,
    monochrome, setMonochrome,
    performanceMode, setPerformanceMode,
    smoothScroll, setSmoothScroll,
    autoPlaySpeed, setAutoPlaySpeed,
    fontSize, setFontSize
  } = useSettings();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuModalOpen, setIsMenuModal] = useState(false);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden font-sans select-none">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt="Background"
              className="w-full h-full object-cover opacity-20 dark:opacity-50 scale-110 blur-sm"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-0 backdrop-blur-3xl bg-white/40 dark:bg-black/70 transition-colors duration-500"></div>
      
      {/* HUD Navigation */}
      <nav className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center cursor-pointer group" onClick={() => setIsMenuModal(true)}>
            <div className="p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-white/5 group-hover:bg-white group-hover:text-black transition-colors duration-200">
              <Menu size={14} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Menu</span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <Maximize2 size={10} className="text-zinc-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">System Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </nav>

      {/* Main Settings Console */}
      <div className="relative z-10 h-full max-w-[1600px] mx-auto flex flex-col pt-20 pb-8 px-10">
        
        {/* Title Block */}
        <div className="mb-6 flex justify-between items-end">
           <div className="space-y-0">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Settings</h1>
              <p className="text-zinc-500 text-[9px] font-bold tracking-[0.5em] uppercase">Calibration Interface // Build 3.0</p>
           </div>
           <Link to="/" className="flex items-center gap-3 px-6 py-2 bg-white/5 hover:bg-white hover:text-black rounded-sm rounded-br-xl border border-white/10 transition-colors duration-200 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-widest">Commit & Exit</span>
           </Link>
        </div>

        {/* Multi-Module Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
           
           {/* ENVIRONMENT MODULE */}
           <div className="md:col-span-8 bg-white/5 dark:bg-black/40 backdrop-blur-md p-6 rounded-sm rounded-br-3xl border border-white/5 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 opacity-30">
                    <Sun size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Environment Mode</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setMonochrome(!monochrome)} 
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-colors duration-200 ${
                        monochrome 
                        ? "bg-white text-black border-white shadow-lg" 
                        : "border-white/10 text-zinc-500 hover:text-white"
                      }`}
                    >
                       Monochrome Build
                    </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 flex-1">
                 {[
                   { id: "dark", label: "Dark", icon: Moon },
                   { id: "light", label: "Light", icon: Sun },
                   { id: "system", label: "Auto", icon: Monitor },
                 ].map((opt) => (
                   <button
                     key={opt.id}
                     onClick={() => setTheme(opt.id)}
                     className={`flex flex-col items-center justify-center gap-4 p-6 rounded-sm rounded-br-3xl border transition-all duration-300 relative ${
                       theme === opt.id 
                       ? "bg-white text-black border-white shadow-2xl scale-[1.01]" 
                       : "bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10 hover:text-white"
                     }`}
                   >
                     <opt.icon size={20} />
                     <span className="text-[9px] font-black uppercase tracking-widest">{opt.label} Mode</span>
                     {theme === opt.id && <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-black rounded-full" />}
                   </button>
                 ))}
              </div>
           </div>

           {/* SCALING MODULE */}
           <div className="md:col-span-4 bg-white/5 dark:bg-black/40 backdrop-blur-md p-6 rounded-sm rounded-br-3xl border border-white/5">
              <div className="flex items-center gap-2 mb-6 opacity-30">
                 <Type size={12} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Interface Scaling</span>
              </div>
              <div className="flex flex-col gap-2">
                 {["sm", "md", "lg"].map((size) => (
                   <button
                     key={size}
                     onClick={() => setFontSize(size)}
                     className={`w-full py-3.5 rounded-sm rounded-br-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                       fontSize === size 
                       ? "bg-white text-black border-white shadow-xl" 
                       : "bg-white/5 text-zinc-500 border-white/5 hover:text-white"
                     }`}
                   >
                     Calibration: {size}
                   </button>
                 ))}
              </div>
           </div>

           {/* CINEMATIC BUILD MODULE */}
           <div className="md:col-span-6 bg-white/5 dark:bg-black/40 backdrop-blur-md p-6 rounded-sm rounded-br-3xl border border-white/5">
              <div className="flex items-center gap-2 mb-4 opacity-30">
                 <Film size={12} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Cinematic Overlays</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                 <SettingToggle icon={ParticlesIcon} label="Floating Particles" sub="Cinematic Depth" active={floatingParticles} onToggle={() => setFloatingParticles(!floatingParticles)} />
                 <SettingToggle icon={Tv} label="Scanlines" sub="Retro CRT" active={scanlines} onToggle={() => setScanlines(!scanlines)} />
                 <SettingToggle icon={Sparkles} label="Click Sparks" sub="Particles" active={sparksEnabled} onToggle={() => setSparksEnabled(!sparksEnabled)} />
                 <SettingToggle icon={MousePointer2} label="Custom Cursor" sub="Motion HUD" active={cursorEnabled} onToggle={() => setCursorEnabled(!cursorEnabled)} />
              </div>
           </div>

           {/* ENGINE TUNING MODULE */}
           <div className="md:col-span-6 bg-white/5 dark:bg-black/40 backdrop-blur-md p-6 rounded-sm rounded-br-3xl border border-white/5">
              <div className="flex items-center gap-2 mb-4 opacity-30">
                 <Gauge size={12} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Engine Parameters</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                 <SettingToggle icon={Wind} label="Smooth Scroll" sub="Lenis Logic" active={smoothScroll} onToggle={() => setSmoothScroll(!smoothScroll)} />
                 <SettingToggle icon={Activity} label="Transitions" sub="UI Motion" active={animationsEnabled} onToggle={() => setAnimationsEnabled(!animationsEnabled)} />
                 <SettingToggle icon={Cpu} label="Performance" sub="Low Power" active={performanceMode} onToggle={() => setPerformanceMode(!performanceMode)} />
                 
                 <div className={`p-3 rounded-sm rounded-br-xl border transition-colors duration-300 flex flex-col gap-2 ${
                    autoPlaySpeed !== 6000 ? "bg-white text-black border-white shadow-xl" : "bg-white/5 border-white/5"
                 }`}>
                    <div className="flex justify-between items-center">
                       <span className={`text-[8px] font-black uppercase tracking-widest ${autoPlaySpeed !== 6000 ? "text-black" : "text-zinc-500"}`}>Auto-Play Speed</span>
                       <span className={`text-[8px] font-black ${autoPlaySpeed !== 6000 ? "text-black" : "text-white"}`}>{(autoPlaySpeed/1000).toFixed(1)}s</span>
                    </div>
                    <input 
                       type="range" min="3000" max="15000" step="1000" 
                       value={autoPlaySpeed} 
                       onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                       className={`w-full h-1 rounded-lg appearance-none cursor-pointer ${autoPlaySpeed !== 6000 ? "bg-black/10 accent-black" : "bg-white/10 accent-white"}`}
                    />
                 </div>
              </div>
           </div>

           {/* RESET MODULE */}
           <div className="md:col-span-12 bg-red-500/5 hover:bg-red-500/10 backdrop-blur-md p-3 rounded-sm rounded-br-2xl border border-red-500/20 transition-colors duration-200 group cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <RefreshCcw size={16} className="text-red-500 group-hover:rotate-180 transition-transform duration-1000" />
                 <div>
                    <span className="block text-[9px] font-black uppercase tracking-widest text-red-500">Purge Build</span>
                    <span className="block text-[7px] font-bold uppercase tracking-widest text-red-500/40">Restore Factory Default</span>
                 </div>
              </div>
              <ChevronRight size={14} className="text-red-500 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
           </div>
        </div>

        {/* HUD Bottom Status */}
        <footer className="mt-4 flex justify-between items-center border-t border-white/5 pt-4 opacity-30">
           <div className="flex items-center gap-6 text-[9px] font-black tracking-[0.4em] uppercase">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> System Online
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex gap-4">
                 <span>Latency: 12ms</span>
                 <span>Stream: Active</span>
              </div>
           </div>
           <div className="flex gap-10 text-[9px] font-black tracking-[0.4em] uppercase">
              <span>© HarKreadly X1</span>
              <span className="hidden sm:inline">Build 3.1.2</span>
           </div>
        </footer>
      </div>

      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModal(false)} />
    </div>
  );
};

export default Settings;
