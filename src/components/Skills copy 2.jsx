import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Database, Wrench, TrendingUp } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaAws, FaFigma } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiExpress, SiMongodb } from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: "frontend",
    title: "Front-End Expertise",
    description: "Cinematic interfaces orchestrated with React, GSAP, and resilient design systems.",
    cards: [
      { title: "React", icon: FaReact, meta: "Core" },
      { title: "GSAP", icon: SiJavascript, meta: "Motion" },
      { title: "TypeScript", icon: SiTypescript, meta: "Safety" },
      { title: "Figma", icon: FaFigma, meta: "Design" },
      { title: "Tailwind", icon: Code2, meta: "Style" },
      { title: "React", icon: FaReact, meta: "Core" }, // Duplicates for infinite feel
      { title: "GSAP", icon: SiJavascript, meta: "Motion" },
      { title: "TypeScript", icon: SiTypescript, meta: "Safety" },
    ],
  },
  {
    id: "backend",
    title: "Back-End Mastery",
    description: "Node runtimes, API gateways, and data layers designed to scale.",
    cards: [
      { title: "Node.js", icon: FaNodeJs, meta: "Runtime" },
      { title: "Express", icon: SiExpress, meta: "API" },
      { title: "MongoDB", icon: SiMongodb, meta: "Data" },
      { title: "SQL", icon: Database, meta: "Query" },
      { title: "Node.js", icon: FaNodeJs, meta: "Runtime" },
      { title: "Express", icon: SiExpress, meta: "API" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    description: "DevOps automation, cloud delivery, and performance loops.",
    cards: [
      { title: "Git", icon: FaGitAlt, meta: "Version" },
      { title: "AWS", icon: FaAws, meta: "Cloud" },
      { title: "Testing", icon: Wrench, meta: "Quality" },
      { title: "Perf", icon: TrendingUp, meta: "Speed" },
      { title: "Git", icon: FaGitAlt, meta: "Version" },
      { title: "AWS", icon: FaAws, meta: "Cloud" },
    ],
  },
];

const Skills = () => {
  const { t } = useTranslation("common");
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=4000", // Long scroll distance for the sequence
          scrub: 1,
          pin: true,
          // markers: true, // Uncomment for debugging
        },
      });

      // --- Scene 1: Intro ---
      tl.fromTo(
        ".intro-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .to(".intro-text", { opacity: 0, y: -50, duration: 1, delay: 1 });

      // --- Scene 2: Frontend ---
      tl.fromTo(
        ".scene-frontend",
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.5 }
      )
      .fromTo(
        ".cards-frontend",
        { x: "-20%", y: "20%" }, // Start bottom-leftish
        { x: "20%", y: "-20%", duration: 5, ease: "none" }, // Move to top-rightish
        "<"
      )
      .to(".scene-frontend", { opacity: 0, duration: 0.5 });

      // --- Scene 3: Backend ---
      tl.fromTo(
        ".scene-backend",
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.5 }
      )
      .fromTo(
        ".cards-backend",
        { x: "-20%", y: "20%" },
        { x: "20%", y: "-20%", duration: 5, ease: "none" },
        "<"
      )
      .to(".scene-backend", { opacity: 0, duration: 0.5 });

      // --- Scene 4: Tools ---
      tl.fromTo(
        ".scene-tools",
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.5 }
      )
      .fromTo(
        ".cards-tools",
        { x: "-20%", y: "20%" },
        { x: "20%", y: "-20%", duration: 5, ease: "none" },
        "<"
      )
      .to(".scene-tools", { opacity: 0, duration: 0.5 });

      // --- Scene 5: Outro ---
      tl.fromTo(
        ".outro-text",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#020202] text-white">
      {/* The Trigger Element (Pinned) */}
      <div ref={triggerRef} className="h-screen w-full overflow-hidden relative">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />

        {/* --- Scene 1: Intro --- */}
        <div className="intro-text absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            {t("skills.intro.title", "My Arsenal")}
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light">
            {t("skills.intro.desc", "A curated collection of technologies I've mastered to build digital experiences.")}
          </p>
          <div className="mt-12 animate-bounce text-white/30">
            <span className="text-sm uppercase tracking-[0.3em]">Scroll to Explore</span>
          </div>
        </div>

        {/* --- Scenes Template --- */}
        {CHAPTERS.map((chapter) => (
          <div
            key={chapter.id}
            className={`scene-${chapter.id} absolute inset-0 flex flex-col opacity-0 pointer-events-none`}
          >
            {/* Text Content (Top Left) */}
            <div className="absolute top-12 left-8 md:top-24 md:left-24 z-10 max-w-md">
              <span className="text-sm text-cyan-400 uppercase tracking-[0.4em] mb-2 block">
                {chapter.id}
              </span>
              <h3 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {chapter.title}
              </h3>
              <p className="text-white/60 text-lg">
                {chapter.description}
              </p>
            </div>

            {/* Rolling Cards Track */}
            {/* Rotated container */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
               <div 
                 className={`cards-${chapter.id} flex gap-8 flex-wrap w-[150vw] justify-center opacity-80`}
                 style={{ transform: "rotate(-45deg)" }} // Initial static rotation, movement handled by GSAP
               >
                 {/* Generate enough rows to fill the screen */}
                 {Array.from({ length: 4 }).map((_, rowIndex) => (
                   <div key={rowIndex} className="flex gap-8 w-full justify-center">
                     {chapter.cards.map((card, cardIndex) => {
                       const Icon = card.icon;
                       return (
                         <div
                           key={`${chapter.id}-${rowIndex}-${cardIndex}`}
                           className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-xl backdrop-blur-sm min-w-[200px]"
                         >
                           <Icon className="text-2xl text-white/80" />
                           <div>
                             <h4 className="font-bold text-lg">{card.title}</h4>
                             <span className="text-xs text-white/40 uppercase tracking-wider">{card.meta}</span>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        ))}

        {/* --- Scene 5: Outro --- */}
        <div className="outro-text absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {t("skills.outro.title", "The Journey Continues")}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl">
            {t("skills.outro.desc", "Always learning. Always evolving. Exploring new frontiers in AI, WebGL, and beyond.")}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Skills;
