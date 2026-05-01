import { Github, Linkedin, Mail, Heart, Instagram, Twitter, ArrowUpRight, Code2, Globe, Sparkles } from "lucide-react";
import image2 from "../../assets/image_2.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-white dark:bg-[#0a0a0a] font-sans transition-colors duration-500 py-12">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src={image2}
          alt="Site Background"
          className="w-full h-full object-cover opacity-30 dark:opacity-40"
        />
        <div className="absolute inset-0 backdrop-blur-[80px] bg-white/40 dark:bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16">
        
        {/* MODULAR GRID: Smaller, tighter cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          
          {/* Card 1: The Site Identity */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col leading-none font-black font-serif text-xl mb-6 tracking-tighter text-stone-900 dark:text-white">
                <span>PORT</span>
                <span>FOLIO</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 leading-relaxed">
                A digital studio at the intersection of English pedagogy and creative engineering.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-900/5 dark:bg-white/5 hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Card 2: Technical Stack */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-stone-400 flex items-center gap-2 mb-6">
              <Code2 size={12} /> Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {["React", "GSAP", "Tailwind", "Three.js", "Framer", "Canva"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-full bg-white/50 dark:bg-stone-900/40 border border-white/20 dark:border-stone-800/50 text-[9px] font-black uppercase tracking-widest text-stone-600 dark:text-stone-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Project Categories */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-stone-400 mb-6 block">Selected Work</span>
            <nav className="flex flex-col gap-3">
              {["Visual Identity", "LMS Platforms", "Interactive Books", "Web Experience"].map((item) => (
                <a key={item} href="#" className="text-[11px] font-bold uppercase tracking-widest hover:pl-2 transition-all flex items-center justify-between group">
                  {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>

          {/* Card 4: Local Status */}
          <div className="backdrop-blur-xl bg-stone-900 dark:bg-white border border-stone-900 dark:border-white rounded-[2.5rem] p-8 text-white dark:text-stone-900">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 flex items-center gap-2 mb-6">
              <Globe size={12} /> Availability
            </span>
            <p className="text-lg font-black leading-tight tracking-tighter uppercase">
              Open for <br /> 2026 Remote <br /> Contracts
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 dark:border-black/10">
              <span className="text-[10px] font-black tracking-widest uppercase">GMT +0 (UTC)</span>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Larger Name Branding & Full Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Detailed Bio Card */}
          <div className="lg:col-span-4 backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8">
             <span className="text-[10px] font-black tracking-[0.3em] uppercase text-stone-400 mb-4 block">Instructional Design</span>
             <p className="text-[11px] font-medium leading-loose text-stone-500 dark:text-stone-400 italic">
               Specializing in the ECRIF model and educational psychology for 8th-grade English instruction, bridging the gap between classroom theory and digital-first presentation.
             </p>
          </div>

          {/* Massive Name Card (Creative Focus) */}
          <div className="lg:col-span-8 backdrop-blur-xl bg-white/20 dark:bg-stone-900/10 border border-white/40 dark:border-stone-800/30 rounded-[2.5rem] p-8 flex items-center justify-between overflow-hidden relative">
            <h2 className="text-3xl md:text-3xl font-black tracking-[ -0.05em] text-stone-900 dark:text-white uppercase leading-none">
              Har <span className="opacity-20">Kreadly</span>
            </h2>
            <div className="hidden md:flex flex-col items-end gap-1">
               <span className="text-[10px] font-black tracking-widest text-stone-400">BASED IN DIGITAL SPACE</span>
               <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase">© {currentYear} Har Kreadly</span>
            </div>
          </div>
        </div>

              <hr className="text-black my-8" />
        {/* FINAL STRIP */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-4 text-[9px] font-black uppercase tracking-[0.4em] text-stone-400">
          <div className="flex gap-8">
             <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
             <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
          <div className="flex items-center gap-2">
            Made with <Heart size={10} fill="currentColor" className="text-stone-900 dark:text-white" /> by Har Kreadly
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;