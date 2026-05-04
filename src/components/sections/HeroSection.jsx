import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Menu,
  Sun,
  Moon,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";
import { useTheme } from "next-themes";
import LanguageSelector from "../common/LanguageSelector";
import HeroControls from "../features/Hero/HeroControls";
import HeroCarousel from "../features/Hero/HeroCarousel";
import HeroInfo from "../features/Hero/HeroInfo";
import CVModal from "../features/Hero/modals/CVModal";
import MenuModal from "../features/Hero/modals/MenuModal";
import { slides } from "../../data/heroSlides";
import logo from "../../assets/HK.svg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const [fontSize, setFontSize] = useState("lg"); // sm, md, lg
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(4); // seconds
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModal] = useState(false);
  const { theme, setTheme } = useTheme();

  // Custom Cursor state and logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [imageBounds, setImageBounds] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile to disable cursor
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const imgContainer = document.getElementById("hero-image-container");
      if (imgContainer) {
        const rect = imgContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const threshold = rect.width / 2 + 20; // approach distance

        if (dist < threshold) {
           setIsHovered(true);
           setImageBounds({ width: rect.width, height: rect.height });
           cursorX.set(centerX);
           cursorY.set(centerY);
        } else {
           setIsHovered(false);
           cursorX.set(e.clientX);
           cursorY.set(e.clientY);
        }
      } else {
         cursorX.set(e.clientX);
         cursorY.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isMobile]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play for carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, autoPlaySpeed * 3000);
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
          {/* <div className="flex items-center gap-3">
             <img src={logo} alt="HK Logo" className="w-10 h-10 dark:invert opacity-80" />
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-white/20"></div> */}
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
            <a
              key={item}
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {item}
            </a>
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

      {/* Custom Cursor */}
      {!isMobile && (
        <motion.div
          className={`fixed top-0 left-0 pointer-events-none mix-blend-difference ${
            isHovered ? "z-5" : "z-100"
          }`}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isHovered ? imageBounds.width + 40 : 100,
              height: isHovered ? imageBounds.height + 40 : 100,
              opacity: 0.02,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
          />
        </motion.div>
      )}

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModal(false)}
      />
    </div>
  );
};

export default HeroSection;
