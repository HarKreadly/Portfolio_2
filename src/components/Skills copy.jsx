import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Database, Wrench, TrendingUp } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaAws, FaFigma } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiExpress, SiMongodb } from "react-icons/si";
import { gsap } from "gsap";

const CHAPTERS = [
  {
    id: "frontend",
    label: "Chapter 01",
    title: "Front-End Expertise",
    description:
      "Cinematic interfaces orchestrated with React, GSAP, and resilient design systems.",
    palette: {
      background: "#050716",
      primary: "#23F0FF",
      secondary: "#FF3AB3",
      highlight: "rgba(35, 240, 255, 0.08)",
    },
    cards: [
      {
        title: "React Architecture",
        description:
          "Component-driven flows, Suspense-ready data orchestration, and state charts that stay in sync across devices.",
        icon: FaReact,
        meta: "Component Systems",
        tags: ["React", "Hooks"],
      },
      {
        title: "GSAP Motion Systems",
        description:
          "Scroll-linked timelines, micro-interactions, and velocity curves that respond directly to user intent.",
        icon: SiJavascript,
        meta: "Animation Layer",
        tags: ["GSAP", "ScrollTrigger"],
      },
      {
        title: "TypeScript DX",
        description:
          "Typed contracts, discriminated unions, and shared design tokens that harden UI workflows.",
        icon: SiTypescript,
        meta: "Language Rigor",
        tags: ["TypeScript", "DX"],
      },
      {
        title: "Design Systems",
        description:
          "Composable UI kits, accessibility-checked patterns, and multi-brand theming guided by tokens.",
        icon: FaFigma,
        meta: "Experience Ops",
        tags: ["Design", "A11y"],
      },
    ],
  },
  {
    id: "backend",
    label: "Chapter 02",
    title: "Back-End Mastery",
    description:
      "Node runtimes, API gateways, and data layers designed to scale with observability baked in.",
    palette: {
      background: "#04060f",
      primary: "#FFB347",
      secondary: "#3DDAD7",
      highlight: "rgba(255, 179, 71, 0.1)",
    },
    cards: [
      {
        title: "Node.js Services",
        description:
          "Event-driven services, streaming mechanics, and runtime tuning for predictable throughput.",
        icon: FaNodeJs,
        meta: "Runtime",
        tags: ["Node", "Streams"],
      },
      {
        title: "API Surface Craft",
        description:
          "REST and GraphQL interfaces modeled with clean contracts, rate-shaping, and zero-downtime deploys.",
        icon: SiExpress,
        meta: "API Layer",
        tags: ["APIs", "Contracts"],
      },
      {
        title: "Distributed Data",
        description:
          "Replica sets, sharded collections, and caching tiers that serve low-latency experiences.",
        icon: SiMongodb,
        meta: "Data Fabric",
        tags: ["Databases", "Caching"],
      },
      {
        title: "Observability & Resilience",
        description:
          "Tracing, structured logging, and automatic remediation loops powering confident releases.",
        icon: Database,
        meta: "Reliability",
        tags: ["Monitoring", "SLOs"],
      },
    ],
  },
  {
    id: "tools",
    label: "Chapter 03",
    title: "Tools & Workflow",
    description:
      "DevOps automation, cloud delivery, and performance loops that keep teams shipping with intent.",
    palette: {
      background: "#05060f",
      primary: "#C5F227",
      secondary: "#6E7CFF",
      highlight: "rgba(197, 242, 39, 0.1)",
    },
    cards: [
      {
        title: "DevOps Automation",
        description:
          "CI/CD choreography, branch protections, and container pipelines that bake in quality gates.",
        icon: FaGitAlt,
        meta: "Delivery",
        tags: ["CI/CD", "Git"],
      },
      {
        title: "Cloud Delivery",
        description:
          "IaC, blue/green rollouts, and regional failover strategies on AWS and edge platforms.",
        icon: FaAws,
        meta: "Cloud",
        tags: ["AWS", "IaC"],
      },
      {
        title: "Testing Fabric",
        description:
          "Contract, visual, and performance tests orchestrated as part of every merge.",
        icon: Wrench,
        meta: "Quality",
        tags: ["Testing", "Automation"],
      },
      {
        title: "Performance Ops",
        description:
          "Synthetic monitoring, RUM dashboards, and flame charts that guide continuous tuning.",
        icon: TrendingUp,
        meta: "Velocity",
        tags: ["Perf", "Insights"],
      },
    ],
  },
];

const Skills = () => {
  const { t } = useTranslation("common");
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stacks = gsap.utils.toArray(".skill-stack");

      stacks.forEach((stack, stackIndex) => {
        const cards = stack.querySelectorAll(".stack-card");
        cards.forEach((card, cardIndex) => {
          gsap.set(card, {
            rotate: -6 + cardIndex * 2,
            y: cardIndex * -18,
            zIndex: cards.length - cardIndex,
          });

          gsap.to(card, {
            y: `+=${18 + cardIndex * 2}`,
            rotate: `+=${1.5 - cardIndex * 0.3}`,
            duration: 4 + cardIndex * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: stackIndex * 0.4 + cardIndex * 0.2,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-[#020202] text-white"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-24 sm:px-8 lg:flex-row lg:gap-24">
        <div className="flex-1 space-y-10">
          {CHAPTERS.map((chapter, index) => {
            const titleText = t(`skills.chapters.${chapter.id}.title`, chapter.title);
            const descriptionText = t(
              `skills.chapters.${chapter.id}.description`,
              chapter.description
            );
            const labelText = t(`skills.chapters.${chapter.id}.label`, chapter.label);

            return (
              <article
                key={chapter.id}
                className="border border-white/10 bg-white/5 px-6 py-8 text-left shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] transition hover:border-white/30"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.6em] text-white/50">
                  {labelText}
                </p>
                <div className="mt-5 flex items-center justify-between gap-6">
                  <h2
                    className="font-black uppercase leading-none tracking-[0.2em]"
                    style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
                  >
                    {titleText}
                  </h2>
                  <div className="hidden text-sm text-white/50 lg:block">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <p className="mt-4 text-base text-white/80">{descriptionText}</p>
                <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                  {chapter.cards.slice(0, 3).map((card) => (
                    <span key={card.title} className="border border-white/20 px-3 py-1">
                      {card.meta}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] blur-3xl" />
          <div className="relative h-[32rem] w-full">
            {CHAPTERS.map((chapter, index) => (
              <div
                key={`${chapter.id}-stack`}
                className="skill-stack absolute flex max-w-sm flex-col gap-4"
                style={{
                  top: `${index * 90}px`,
                  right: `${index * 30}px`,
                }}
              >
                {chapter.cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={`${chapter.id}-${card.title}`}
                      className="stack-card border border-white/15 bg-white/8 px-5 py-4 text-left backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/80">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-[0.5em] text-white/50">
                            {card.meta}
                          </p>
                          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-white/70">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.4em] text-white/40">
            {t("skills.cta", "Minimal stack. Maximum intent.")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
