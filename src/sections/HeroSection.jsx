import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Menu, Sun, Moon, Linkedin, Instagram, Github } from "lucide-react";
import { useTheme } from "next-themes";
import LanguageSelector from "../components/common/LanguageSelector";
import HeroControls from "../components/features/Hero/HeroControls";
import HeroCarousel from "../components/features/Hero/HeroCarousel";
import HeroInfo from "../components/features/Hero/HeroInfo";
import { useSettings } from "../context/SettingsContext";
import CVModal from "../components/features/Hero/modals/CVModal";
import MenuModal from "../components/features/Hero/modals/MenuModal";
import { slides } from "../data/heroSlides";
import logo from "../assets/HK.svg";
const HeroSection = () => {
  const { fontSize, setFontSize, autoPlaySpeed, setAutoPlaySpeed } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModal] = useState(false);
  const { theme, setTheme } = useTheme();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play for carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, autoPlaySpeed);
    return () => clearInterval(slideTimer);
  }, [currentSlide, autoPlaySpeed]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % slides.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full min-h-dvh bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden font-serif transition-colors duration-1000">
      {/* Layer 0: Full Screen Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Background"
            className="w-full h-full object-cover opacity-30 dark:opacity-60 transition-opacity duration-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Layer 1: Blur Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-2xl bg-white/40 dark:bg-black/40 transition-colors duration-500"></div>

      {/* Layer 2: Dark Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] pointer-events-none transition-all duration-500"></div>

      {/* Header Navigation */}
      <nav className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-20 text-sm tracking-widest text-gray-400">
        <div className="flex items-center gap-8">
          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setIsMenuModal(true)}
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
              <Menu size={20} className="text-gray-900 dark:text-white" />
            </div>
            <span className="text-gray-900 dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Menu
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-white/20"></div>
          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
              {theme === "dark" ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-gray-900" />
              )}
            </div>
            <span className="text-gray-900 dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Theme
            </span>
          </div>
        </div>
        <div className="hidden lg:flex gap-12 font-sans uppercase text-xs font-bold">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex gap-6 items-center">
          <div className="hidden min-[475px]:flex gap-6 items-center">
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
          </div>
          <LanguageSelector />
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-dvh pt-20 pb-10 px-4 md:px-8 lg:px-16 gap-8 items-center">
        <HeroControls
          currentSlide={currentSlide}
          currentQuote={currentQuote}
          nextQuote={nextQuote}
          prevQuote={prevQuote}
          dateTime={dateTime}
          fontSize={fontSize}
          setFontSize={setFontSize}
          autoPlaySpeed={autoPlaySpeed}
          setAutoPlaySpeed={setAutoPlaySpeed}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />

        <HeroCarousel
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          setIsCVModalOpen={setIsCVModalOpen}
        />

        <HeroInfo
          currentSlide={currentSlide}
          dateTime={dateTime}
          fontSize={fontSize}
        />
      </div>


      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModal(false)}
      />
    </div>
  );
};

export default HeroSection;
