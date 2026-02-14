import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react";

/**
 * SkillShowcase - A cinematic modal for displaying skill details
 * @param {Object} skill - The currently selected skill object
 * @param {Function} onClose - Handler to close the modal
 * @param {Function} onNext - Handler for next skill
 * @param {Function} onPrev - Handler for previous skill
 */
const SkillShowcase = ({ skill, onClose, onNext, onPrev }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Intro Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      bgRef.current,
      { opacity: 0, backdropFilter: "blur(0px)" },
      { opacity: 1, backdropFilter: "blur(20px)", duration: 0.8 }
    )
    .fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      ".showcase-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
        ".showcase-icon",
        { scale: 0, rotation: -45, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.8"
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [skill]); // Re-run animation when skill changes? Or just content? 
  // Ideally, for smooth transitions between skills, we'd use AnimatePresence or simpler key-based re-mounts.
  // For now, re-mounting on skill change gives a fresh "enter" effect which fits the "cinematic" request.

  if (!skill) return null;

  const Icon = skill.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-black/90 cursor-pointer"
        onClick={onClose}
      />

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-video md:aspect-[21/9] bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* Left Side - Visual / Icon */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-gray-800 to-black relative flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="showcase-icon relative z-10 p-12 rounded-full bg-white/5 border border-white/10 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
                <Icon className="text-8xl md:text-9xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-2/3 p-8 md:p-16 flex flex-col justify-center relative bg-black/80">
           
           {/* Navigation Arrows (Absolute on desktop) */}
           <button 
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all hidden md:block"
            >
                <ChevronLeft size={32} />
           </button>
           <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all hidden md:block"
            >
                <ChevronRight size={32} />
           </button>

           <div className="max-w-2xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 showcase-text">
                    <span className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase">
                        {skill.meta || "Skill"}
                    </span>
                    <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                            <Star key={i} size={12} className="fill-blue-500 text-blue-500" />
                        ))}
                    </div>
                </div>

                <h2 className="showcase-text text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
                    {skill.title}
                </h2>

                <p className="showcase-text text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10 border-l-2 border-blue-500/50 pl-6">
                    {skill.desc}
                    <br />
                    <span className="text-base text-gray-500 mt-4 block">
                        Mastering this tool allows for the creation of scalable, high-performance digital solutions. It is a key component of the modern development stack.
                    </span>
                </p>

                <div className="showcase-text flex flex-wrap gap-4">
                    <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                        View Projects
                    </button>
                    <button className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                        Documentation
                    </button>
                </div>
           </div>

           {/* Mobile Navigation */}
           <div className="flex justify-between mt-8 md:hidden">
                <button onClick={onPrev} className="flex items-center gap-2 text-white/50">
                    <ChevronLeft size={20} /> Prev
                </button>
                <button onClick={onNext} className="flex items-center gap-2 text-white/50">
                    Next <ChevronRight size={20} />
                </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SkillShowcase;
