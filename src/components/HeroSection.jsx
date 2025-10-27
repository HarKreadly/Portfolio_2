import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./ui/SplitText";
import CardNav from "./ui/CardNav";
import Aurora from "./ui/Aurora";
import Particles from "./ui/Particles";
import ShinyText from "./ui/ShinyText";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t } = useTranslation("common");
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;

    if (hero && content) {
      // Set initial state
      gsap.set(content.children, { y: 50, opacity: 0 });

      // Create animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(content.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Floating animation for scroll indicator
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, []);

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "My Story", href: "#about", ariaLabel: "Learn about me" },
        { label: "Resume", href: "#resume", ariaLabel: "Download my resume" },
      ],
    },
    {
      label: "Work",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Projects", href: "#projects", ariaLabel: "View my projects" },
        { label: "Skills", href: "#skills", ariaLabel: "View my skills" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Get In Touch", href: "#contact", ariaLabel: "Contact me" },
        {
          label: "LinkedIn",
          href: "https://linkedin.com",
          ariaLabel: "Connect on LinkedIn",
        },
      ],
    },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
      {/* Aurora Background Overlay */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.3}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Particles Background */}
      <div className="absolute inset-0 z-5">
        <Particles
          particleColors={["#3A29FF", "#FF94B4", "#FF3232", "#ffffff"]}
          particleCount={100}
          particleSpread={5}
          speed={0.05}
          particleBaseSize={50}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          sizeRandomness={1.5}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          {/* CardNav positioned at top */}
          <div className="mb-12 flex justify-center">
            <CardNav items={items} ease="power3.out" />
          </div>

          {/* Greeting */}
          <div className="mb-6">
            <SplitText
              text={t("hero.greeting")}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-200 font-medium drop-shadow-sm"
            />
          </div>

          {/* Greeting */}
          <div className="mb-6 font-bold lg:text-5xl text-4xl ">
            <SplitText
              text="Har Kreadly"
              className="text-lg md:text-xl text-gray-700 dark:text-gray-200 font-medium drop-shadow-sm"
            />
          </div>

          {/* Title */}
          <div className="mb-8">
            <SplitText
              text={t("hero.title")}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-200 font-semibold drop-shadow-sm"
            />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="#projects"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg drop-shadow-md"
            >
              {t("hero.cta.viewWork")}
            </Link>
            <Link
              to="#contact"
              className="px-8 py-4 border-2 border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-full transition-all duration-300 drop-shadow-sm"
            >
              {t("hero.cta.getInTouch")}
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full bg-white/20 backdrop-blur-sm"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full bg-white/20 backdrop-blur-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full bg-white/20 backdrop-blur-sm"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator z-40">
          <Link
            to="#about"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
