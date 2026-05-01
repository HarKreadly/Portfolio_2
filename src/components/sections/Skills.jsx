import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Database, Wrench, TrendingUp, Globe, Layers, Cpu, Palette } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaAws, FaFigma, FaDocker } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiExpress, SiMongodb, SiRedux, SiPostgresql, SiWebpack, SiJest } from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SkillShowcase from "../features/Skills/SkillShowcase";

// Import images from assets
import img1 from "../../assets/image_1.jpg";
import img2 from "../../assets/image_2.jpg";
import img3 from "../../assets/image_3.jpg";
import img4 from "../../assets/image_4.jpg";
import imgOther from "../../assets/corrupted_grace.jpg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SIDEBAR_CATEGORIES = ["FrontEnd", "Backend", "Tools", "Creativity", "Other"];

const CHAPTERS = [
  {
    id: "frontend",
    title: "Interface Design\n& Engineering",
    sidebarIndex: 0,
    image: img1,
    description:
      "Architecting fluid, high-performance web experiences through modern frameworks, advanced motion design, and accessible component architectures.",
    cards: [
      { title: "React",        icon: FaReact,      desc: "Building modular, component-driven UIs with hooks, context, and optimised re-render patterns." },
      { title: "GSAP",         icon: SiJavascript, desc: "Award-winning motion design — scroll-triggered timelines, morphing SVGs, and physics springs." },
      { title: "TypeScript",   icon: SiTypescript, desc: "End-to-end type safety across large codebases: generics, discriminated unions, strict null checks." },
      { title: "Figma",        icon: FaFigma,      desc: "Prototyping pixel-perfect designs and translating design tokens directly into production code." },
      { title: "Redux",        icon: SiRedux,      desc: "Predictable global state management with RTK slices, selectors, and middleware pipelines." },
      { title: "Webpack",      icon: SiWebpack,    desc: "Custom bundler config: code splitting, tree shaking, module federation, and build-time optimisations." },
      { title: "CSS / SCSS",   icon: Palette,      desc: "Advanced layouts — CSS Grid, custom properties, animations, and BEM-structured stylesheets." },
      { title: "Accessibility",icon: Globe,        desc: "WCAG 2.1 AA compliance, semantic HTML, ARIA roles, keyboard navigation, and screen-reader support." },
    ],
  },
  {
    id: "backend",
    title: "System Architecture\n& Data",
    sidebarIndex: 1,
    image: img2,
    description:
      "Developing scalable server environments and resilient database schemas that power complex business logic and real-time data pipelines.",
    cards: [
      { title: "Node.js",    icon: FaNodeJs,     desc: "Event-driven, non-blocking server architecture — microservices, streaming, and worker threads." },
      { title: "Express",    icon: SiExpress,    desc: "Minimal HTTP framework: middleware chains, routing, error handling, and JWT auth flows." },
      { title: "MongoDB",    icon: SiMongodb,    desc: "Schema-flexible document storage with aggregation pipelines, indexing, and Atlas cloud hosting." },
      { title: "PostgreSQL", icon: SiPostgresql, desc: "ACID-compliant relational queries, stored procedures, full-text search, and connection pooling." },
      { title: "GraphQL",    icon: Layers,       desc: "Declarative data fetching with Apollo Server, dataloaders, and subscriptions over WebSockets." },
      { title: "REST APIs",  icon: Globe,        desc: "RESTful design principles — versioning, hypermedia, rate limiting, and OpenAPI documentation." },
      { title: "Auth",       icon: Cpu,          desc: "OAuth 2.0, JWT, session management, RBAC, and secure refresh-token rotation strategies." },
      { title: "SQL",        icon: Database,     desc: "Complex relational modelling: joins, window functions, CTEs, and query-plan optimisation." },
    ],
  },
  {
    id: "tools",
    title: "Development\nEcosystem",
    sidebarIndex: 2,
    image: img3,
    description:
      "Streamlining product delivery with robust DevOps automation, container orchestration, and cloud-native infrastructure solutions.",
    cards: [
      { title: "Git",         icon: FaGitAlt,   desc: "Branch strategies (Git Flow, trunk-based), interactive rebasing, bisect, and large-repo tooling." },
      { title: "Docker",      icon: FaDocker,   desc: "Multi-stage image builds, compose orchestration, layer caching, and secure runtime configs." },
      { title: "AWS",         icon: FaAws,      desc: "S3, Lambda, EC2, CloudFront, RDS — architecting serverless and containerised cloud solutions." },
      { title: "CI / CD",     icon: Layers,     desc: "GitHub Actions and GitLab pipelines: lint, test, build, deploy — zero-downtime blue-green releases." },
      { title: "Jest",        icon: SiJest,     desc: "Unit and integration testing — mocking, snapshot tests, coverage thresholds, and TDD workflows." },
      { title: "Webpack",     icon: SiWebpack,  desc: "Bundle analysis, performance budgets, dynamic imports, and micro-frontend configurations." },
      { title: "Performance", icon: TrendingUp, desc: "Core Web Vitals optimisation, lazy loading, virtual lists, memoisation, and profiling tools." },
      { title: "Reliability", icon: Wrench,     desc: "Error boundaries, Sentry integration, structured logging, alerting, and chaos-engineering drills." },
    ],
  },
  {
    id: "creativity",
    title: "Visual Identity\n& UX Design",
    sidebarIndex: 3,
    image: img4,
    description: "Defining the visual language and user psychology that transforms digital products into memorable, brand-defining experiences.",
    cards: [
      { title: "UI Design",    icon: Palette,    desc: "Crafting intuitive interfaces with emphasis on visual hierarchy and user-centric flows." },
      { title: "Brand Art",    icon: Cpu,        desc: "Developing cohesive visual identities: logos, palettes, and brand guidelines." },
      { title: "Motion",       icon: TrendingUp, desc: "Animating micro-interactions and transitions to enhance spatial awareness." },
      { title: "Typography",   icon: Globe,      desc: "Precise typesetting and font pairing to ensure readability and tone across platforms." },
      { title: "Prototyping",  icon: Layers,     desc: "Rapidly iterating interactive mockups to validate UX concepts early in development." },
      { title: "UX Research",  icon: Database,   desc: "Analysing user behavior and feedback to drive data-informed design decisions." },
      { title: "Illustration", icon: Palette,    desc: "Creating custom vector assets and icons to give products a unique visual voice." },
      { title: "Design Sys",   icon: Wrench,     desc: "Building scalable atomic design libraries for consistent multi-platform delivery." },
    ],
  },
  {
    id: "other",
    title: "Strategic\nLeadership",
    sidebarIndex: 4,
    image: imgOther,
    description: "Fostering technical excellence through cross-functional team management, agile mentorship, and continuous technological research.",
    cards: [
      { title: "Management",   icon: Layers,     desc: "Leading cross-functional teams to deliver complex software on strict deadlines." },
      { title: "Agile",        icon: TrendingUp, desc: "Scrum and Kanban mastery: sprint planning, retrospectives, and backlog grooming." },
      { title: "Mentoring",    icon: Cpu,        desc: "Guiding junior developers through code reviews and pair programming sessions." },
      { title: "Open Source",  icon: Globe,      desc: "Contributing to community projects and maintaining public library ecosystems." },
      { title: "Research",     icon: Database,   desc: "Staying ahead of trends by investigating emerging technologies and paradigms." },
      { title: "Soft Skills",  icon: TrendingUp, desc: "Optimising team velocity through effective communication and conflict resolution." },
      { title: "Documentation",icon: Wrench,     desc: "Writing clear, comprehensive technical guides for both internal and public APIs." },
      { title: "Community",    icon: Globe,      desc: "Active participation in tech meetups, forums, and knowledge-sharing initiatives." },
    ],
  },
];

const Skills = () => {
  const { t } = useTranslation("common");
  const containerRef = useRef(null);
  const triggerRef   = useRef(null);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const handleOpenShowcase  = (skill) => setSelectedSkill(skill);
  const handleCloseShowcase = () => setSelectedSkill(null);

  const scrollToChapter = (index) => {
    const chapterIndex = CHAPTERS.findIndex((c) => c.sidebarIndex === index);
    if (chapterIndex === -1) return;

    const totalDistance = 12000;
    const targetProgress = chapterIndex / (CHAPTERS.length - 1);
    const trigger = ScrollTrigger.getById("skillsTrigger");

    if (trigger) {
      const targetScroll = trigger.start + targetProgress * totalDistance;
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "skillsTrigger",
          trigger: triggerRef.current,
          start: "top top",
          end: "+=12000",
          scrub: 0.6,
          pin: true,
          snap: {
            snapTo: 1 / (CHAPTERS.length - 1),
            duration: { min: 0.1, max: 0.3 },
            delay: 0.02,
            ease: "power1.inOut",
          },
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (CHAPTERS.length - 1));
            setActiveChapter(Math.min(idx, CHAPTERS.length - 1));
          },
        },
      });

      CHAPTERS.forEach((chapter, index) => {
        const sceneSel   = `.scene-${chapter.id}`;
        const contentSel = `${sceneSel} .scene-content`;
        const cardsSel   = `${sceneSel} .skill-card`;

        // ── ENTER ────────────────────────────────────────────────
        if (index === 0) {
          // First chapter: content rises up from below on load
          tl.fromTo(
            contentSel,
            { y: 80, opacity: 0 },
            { y: 0,  opacity: 1, duration: 1.2, ease: "power3.out" }
          );
          // Cards stagger up into view
          tl.fromTo(
            cardsSel,
            { y: 40, opacity: 0 },
            { y: 0,  opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
            "-=0.6"
          );
        } else {
          // Scene slides in from the right
          tl.fromTo(
            sceneSel,
            { x: "100%" },
            { x: "0%", duration: 1.4, ease: "power2.inOut" }
          );
          // Content rises from below while scene is settling
          tl.fromTo(
            contentSel,
            { y: 80, opacity: 0 },
            { y: 0,  opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.7"
          );
          // Cards stagger up
          tl.fromTo(
            cardsSel,
            { y: 40, opacity: 0 },
            { y: 0,  opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
            "-=0.5"
          );
        }

        // ── EXIT ─────────────────────────────────────────────────
        // (skipped for the last chapter — nothing to exit into)
        if (index !== CHAPTERS.length - 1) {
          // Cards drift upward first
          tl.to(cardsSel, {
            y: -40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.in",
          });
          // Content follows upward — reversed on scroll-up: falls back down
          tl.to(
            contentSel,
            { y: -80, opacity: 0, duration: 0.8, ease: "power2.in" },
            "-=0.3"
          );
          // Scene slides out to the left
          tl.to(
            sceneSel,
            { x: "-100%", duration: 1.4, ease: "power2.inOut" },
            "-=0.3"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SkillShowcase skill={selectedSkill} onClose={handleCloseShowcase} />

      <section
        ref={containerRef}
        className="relative bg-white dark:bg-[#0a0a0a] text-black dark:text-white overflow-hidden"
      >
        <div ref={triggerRef} className="h-screen w-full relative">

          {/* ── Top nav ── Corrected to not overlap sidebar ── */}
          <div className="absolute top-12 left-0 w-full pr-12 md:pr-14 px-8 md:px-16 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50 text-black dark:text-white">
            <div className="flex flex-col leading-tight font-black font-serif text-lg">
              <span>BASE</span>
              <span>HOME</span>
            </div>
            <div className="hidden md:flex items-center gap-16">
              <span className="hover:opacity-50 cursor-pointer transition-opacity">HOME SCREEN</span>
              <span className="hover:opacity-50 cursor-pointer transition-opacity border-b border-black dark:border-white pb-1">MY SKILLS</span>
              <span className="hover:opacity-50 cursor-pointer transition-opacity">ABOUT ME</span>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="absolute right-0 top-0 h-full w-12 md:w-14 bg-black z-40 flex flex-col items-center py-8">
            {/* Hamburger */}
            <div className="flex flex-col gap-[5px] mb-10">
              <span className="w-5 h-[2px] bg-white block" />
              <span className="w-5 h-[2px] bg-white block" />
              <span className="w-5 h-[2px] bg-white block" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-20">
              {SIDEBAR_CATEGORIES.map((label, i) => {
                const isActive   = i === CHAPTERS[activeChapter]?.sidebarIndex;
                const hasChapter = CHAPTERS.some((c) => c.sidebarIndex === i);

                return (
                  <span
                    key={label}
                    onClick={() => scrollToChapter(i)}
                    className={`rotate-90 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-500 ${
                      hasChapter
                        ? "cursor-pointer hover:text-white"
                        : "opacity-20 pointer-events-none"
                    }`}
                    style={{
                      color:         isActive ? "#fff" : "rgba(255,255,255,0.25)",
                      letterSpacing: isActive ? "0.3em" : "0.2em",
                    }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* ── Chapters ── */}
          {CHAPTERS.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className={`scene-${chapter.id} absolute inset-0 flex flex-col pr-12 md:pr-14 bg-white dark:bg-[#0a0a0a]`}
              style={{ transform: chapterIndex === 0 ? "none" : "translateX(100%)" }}
            >
              {/* scene-content animates up/down */}
              <div className="scene-content w-full max-w-[1400px] mx-auto flex flex-col flex-1 px-8 md:px-16 pt-32 pb-8 gap-8">

                {/* ── Hero row: image LEFT + title RIGHT ── */}
                <div className="flex flex-col lg:flex-row gap-10 items-center">

                  <div className="w-full lg:w-[52%] h-[200px] md:h-[230px] overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-800 shadow-sm">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="flex flex-col gap-4 lg:w-[48%]">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                      {chapter.title.split("\n").map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                      {chapter.description}
                    </p>
                  </div>
                </div>

                {/* ── 8-card grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {chapter.cards.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skillIndex}
                        onClick={() => handleOpenShowcase(skill)}
                        className="skill-card group flex flex-col bg-white dark:bg-[#111] p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer min-h-[160px]"
                      >
                        {/* Number badge */}
                        <div className="w-6 h-6 bg-gray-800 dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center mb-3 flex-shrink-0">
                          {skillIndex + 1}
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-semibold mb-1.5 text-black dark:text-white">
                          {skill.title}
                        </h4>

                        {/* Divider */}
                        <div className="w-5 h-[2px] bg-black dark:bg-white mb-2 group-hover:w-8 transition-all duration-500" />

                        {/* Description */}
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed mb-auto line-clamp-3">
                          {skill.desc}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center justify-between mt-3 text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                          <span>More Detailed</span>
                          <span className="text-sm leading-none">›</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
};

export default Skills;