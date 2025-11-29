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
      { title: "React", icon: FaReact, meta: "Core", desc: "Building component-driven architectures." },
      { title: "GSAP", icon: SiJavascript, meta: "Motion", desc: "Award-winning animations." },
      { title: "TypeScript", icon: SiTypescript, meta: "Safety", desc: "Type-safe code." },
      { title: "Figma", icon: FaFigma, meta: "Design", desc: "Bridging design & dev." },
      { title: "Tailwind", icon: Code2, meta: "Style", desc: "Rapid UI development." },
      { title: "React", icon: FaReact, meta: "Core", desc: "Building component-driven architectures." },
    ],
  },
  {
    id: "backend",
    title: "Back-End Mastery",
    description: "Node runtimes, API gateways, and data layers designed to scale.",
    cards: [
      { title: "Node.js", icon: FaNodeJs, meta: "Runtime", desc: "Event-driven server-side logic." },
      { title: "Express", icon: SiExpress, meta: "API", desc: "Minimalist web framework." },
      { title: "MongoDB", icon: SiMongodb, meta: "Data", desc: "Flexible document storage." },
      { title: "SQL", icon: Database, meta: "Query", desc: "Relational data modeling." },
      { title: "Node.js", icon: FaNodeJs, meta: "Runtime", desc: "Event-driven server-side logic." },
      { title: "Express", icon: SiExpress, meta: "API", desc: "Minimalist web framework." },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    description: "DevOps automation, cloud delivery, and performance loops.",
    cards: [
      { title: "Git", icon: FaGitAlt, meta: "Version", desc: "Distributed version control." },
      { title: "AWS", icon: FaAws, meta: "Cloud", desc: "Scalable cloud infrastructure." },
      { title: "Testing", icon: Wrench, meta: "Quality", desc: "Ensuring code reliability." },
      { title: "Perf", icon: TrendingUp, meta: "Speed", desc: "Optimizing application performance." },
      { title: "Git", icon: FaGitAlt, meta: "Version", desc: "Distributed version control." },
      { title: "AWS", icon: FaAws, meta: "Cloud", desc: "Scalable cloud infrastructure." },
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
          end: "+=8000",
          scrub: 1,
          pin: true,
        },
      });

      // --- Scene 1: Intro ---
      tl.fromTo(
        ".intro-content",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 }
      )
      .to(".intro-content", { opacity: 0, scale: 1.1, duration: 1 });

      // --- Scene 2: Frontend ---
      tl.fromTo(
        ".scene-frontend",
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(150% at 50% 50%)", duration: 1.5, ease: "power2.inOut" },
        "-=0.5"
      );

      tl.fromTo(
        ".title-frontend",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        ".card-frontend",
        {
          x: (i) => (i % 2 === 0 ? -window.innerWidth : window.innerWidth),
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      tl.to({}, { duration: 1 });

      // --- Scene 3: Transition to Backend ---
      tl.to(".scene-frontend", {
        x: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      });

      tl.fromTo(
        ".scene-backend",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=1"
      );

      tl.fromTo(
        ".card-backend",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      tl.to({}, { duration: 1 });

      // --- Scene 4: Tools ---
      tl.fromTo(
        ".scene-tools",
        { x: "100%" },
        { x: "0%", duration: 1.5, ease: "power2.inOut" }
      );

      tl.fromTo(
        ".card-tools",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      tl.to({}, { duration: 1 });

      // --- Scene 5: Outro ---
      tl.fromTo(
        ".scene-outro",
        { x: "100%" },
        { x: "0%", duration: 1.5, ease: "power2.inOut" }
      );

      tl.fromTo(
        ".outro-text",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-gray-50 dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-1000">
      <div ref={triggerRef} className="h-screen w-full overflow-hidden relative">
        
        {/* --- Scene 1: Intro --- */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="intro-content text-center">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-gray-900 dark:text-white">
              {t("skills.intro.title", "My Arsenal")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60">
              {t("skills.intro.desc", "A curated collection of technologies.")}
            </p>
          </div>
        </div>

        {/* --- Scene 3: Backend --- */}
        <div className="scene-backend absolute inset-0 bg-gray-50 dark:bg-[#020202] flex flex-col items-center justify-center z-0 transition-colors duration-1000">
          <div className="text-center mb-12">
            <h3 className="text-5xl md:text-7xl font-black mb-4 text-gray-900 dark:text-white">
              {CHAPTERS[1].title}
            </h3>
            <p className="text-gray-600 dark:text-white/60 text-xl">{CHAPTERS[1].description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl px-4">
            {CHAPTERS[1].cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="card-backend flex items-center gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-6 py-4 rounded-xl backdrop-blur-md w-80">
                  <Icon className="text-3xl text-gray-700 dark:text-white/80" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{card.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-white/40">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Scene 2: Frontend --- */}
        <div className="scene-frontend absolute inset-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col items-center justify-center z-20 transition-colors duration-1000" style={{ clipPath: "circle(0% at 50% 50%)" }}>
          <div className="text-center mb-12 overflow-hidden">
            <h3 className="title-frontend text-5xl md:text-7xl font-black mb-4 text-gray-900 dark:text-white">
              {CHAPTERS[0].title}
            </h3>
            <p className="title-frontend text-gray-600 dark:text-gray-400 text-xl">{CHAPTERS[0].description}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl px-4">
            {CHAPTERS[0].cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="card-frontend flex items-center gap-4 bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 px-6 py-4 rounded-xl w-80">
                  <Icon className="text-3xl text-gray-700 dark:text-gray-300" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{card.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Scene 4: Tools --- */}
        <div className="scene-tools absolute inset-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col items-center justify-center z-30 transition-colors duration-1000" style={{ transform: "translateX(100%)" }}>
          <div className="text-center mb-12">
            <h3 className="text-5xl md:text-7xl font-black mb-4 text-gray-900 dark:text-white">
              {CHAPTERS[2].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xl">{CHAPTERS[2].description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl px-4">
            {CHAPTERS[2].cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="card-tools flex items-center gap-4 bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 px-6 py-4 rounded-xl w-80">
                  <Icon className="text-3xl text-gray-700 dark:text-gray-300" />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{card.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Scene 5: Outro --- */}
        <div className="scene-outro absolute inset-0 bg-gray-50 dark:bg-[#020202] flex flex-col items-center justify-center z-40 transition-colors duration-1000" style={{ transform: "translateX(100%)" }}>
          <h2 className="outro-text text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {t("skills.outro.title", "Level Up")}
          </h2>
          <p className="outro-text text-xl md:text-3xl text-gray-600 dark:text-white/60 max-w-2xl font-light text-center">
            {t("skills.outro.desc", "Ready to build something impossible?")}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Skills;
