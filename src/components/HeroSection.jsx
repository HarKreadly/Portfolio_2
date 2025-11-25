import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./ui/SplitText";
import ShinyText from "./ui/ShinyText";
import FloatingLines from './ui/FloatingLines';


gsap.registerPlugin(ScrollTrigger);

import { usePortfolioTheme } from "../hooks/useTheme";



const HeroSection = () => {
  const { t } = useTranslation("common");
  const { isDark } = usePortfolioTheme();
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

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] pt-20"
    >
      {/* Floating Lines Background */}
      <div className="absolute inset-0 z-0">
        <FloatingLines
          linesGradient={isDark ? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9"] : ["#0ea5e9", "#6366f1", "#a855f7", "#d946ef"]}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[5, 5, 5]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="normal"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          {/* Greeting */}

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
            
            <div className="flex gap-3">
              <a
                href="/cv_en.pdf"
                download
                className="flex items-center px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-md group"
              >
                <Download size={18} className="mr-2 group-hover:text-blue-500 transition-colors" />
                CV (EN)
              </a>
              <a
                href="/cv_de.pdf"
                download
                className="flex items-center px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-md group"
              >
                <Download size={18} className="mr-2 group-hover:text-blue-500 transition-colors" />
                CV (DE)
              </a>
            </div>
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
