import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Twitter,
  Instagram,
  Facebook,
  X,
  Moon,
  Sun,
  Globe,
  Download,
  Menu,
  Linkedin,
  Github,
} from "lucide-react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import image1 from "../assets/image_1.jpg";
import image2 from "../assets/image_2.jpg";
import image3 from "../assets/image_3.jpg";
import { useTheme } from "next-themes";
import LanguageSelector from "./LanguageSelector";

import HKLogo from "./HKLogo";
import TextPressure from "./ui/TextPressure";
import { PiShareFat } from "react-icons/pi";

const slides = [
  {
    id: 0,
    image: image1,
    title: "PORTFOLIO",
    subtitle: "GENESIS",
    quote: "The future is already here, it's just not evenly distributed.",
    neonColor: "#ff0055", // Neon Red/Pink
    accentColor: "text-[#ff0055]",
    rightTitle: "Welcome to My Digital Space",
    rightText:
      "I am a passionate developer crafting unique digital experiences. Explore my journey through code and design.",
  },
  {
    id: 1,
    image: image2,
    title: "PORTFOLIO",
    subtitle: "EVOLUTION",
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
    neonColor: "#00e5ff", // Neon Cyan
    accentColor: "text-[#00e5ff]",
    rightTitle: "Mastering the Craft",
    rightText:
      "Proficient in React, Node.js, and modern web technologies. I turn complex problems into elegant solutions.",
  },
  {
    id: 2,
    image: image3,
    title: "PORTFOLIO",
    subtitle: "REVOLUTION",
    quote: "Simplicity is the ultimate sophistication.",
    neonColor: "#7000ff", // Neon Purple
    accentColor: "text-[#7000ff]",
    rightTitle: "Pushing Boundaries",
    rightText:
      "From interactive 3D elements to seamless animations, I bring static designs to life with performance and style.",
  },
];

const ThirdHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [dateTime, setDateTime] = useState(new Date());
  const [fontSize, setFontSize] = useState("lg"); // sm, md, lg
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(4); // seconds
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModal] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return { hours: hoursStr, minutes, seconds, ampm };
  };

  const { day, month, year } = formatDate(dateTime);
  const { hours, minutes, seconds, ampm } = formatTime(dateTime);

  // Font size classes mapping
  const fontSizes = {
    sm: {
      title: "text-6xl md:text-9xl",
      text: "text-sm",
      quote: "text-xs",
    },
    md: { 
      title: "text-8xl md:text-[10rem]", 
      text: "text-base", 
      quote: "text-sm" 
    },
    lg: {
      title: "text-9xl md:text-[12rem]",
      text: "text-lg",
      quote: "text-base",
    },
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-gray-50  dark:bg-black text-gray-900 dark:text-white overflow-hidden font-serif transition-colors duration-1000">
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

      {/* Layer 1: Blur Overlay - Enhanced for Light Mode */}
      <div className="absolute inset-0 z-0 backdrop-blur-[50px] bg-white/40 dark:bg-black/40 transition-colors duration-500"></div>

      {/* Layer 2: Dark Vignette (Corners) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] pointer-events-none transition-all duration-500"></div>

      {/* Header Navigation */}
      <nav className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-20 text-sm tracking-widest text-gray-400">
        <div className="flex items-center gap-6">
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
          <div className="h-8 w-[1px] bg-gray-200 dark:bg-white/20"></div>
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
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Requests
          </a>
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Photos
          </a>
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Contact
          </a>
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
            <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
          </div>
          <LanguageSelector />
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh] pt-20 pb-10 px-4 md:px-8 lg:px-16 gap-8 items-center">
        {/* Left Section */}
        <div className="lg:col-span-3 flex flex-col h-full py-6 lg:py-12 order-3 lg:order-1 px-4 md:px-8 lg:pl-8 relative z-40 items-center lg:items-start gap-8">
          {/* Speed & Size Controls - Desktop Only */}
          <div className="mb-auto hidden lg:flex lg:flex-col lg:gap-20">
            {/* Speed */}
            <div>
              <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white mb-4 uppercase">
                Speed
              </span>
              <div className="text-sm tracking-[0.5em] text-gray-500 dark:text-gray-500 font-light flex gap-4">
                {[16, 8, 4, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => setAutoPlaySpeed(num)}
                    className={`transition-colors hover:text-black dark:hover:text-white ${
                      autoPlaySpeed === num
                        ? "text-black dark:text-white font-bold"
                        : ""
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-4">
              <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
                Size
              </span>
              <div className="flex gap-6">
                <div className="w-[1px] h-32 bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex flex-col justify-between h-32 font-serif">
                  <button
                    onClick={() => setFontSize("lg")}
                    className={`text-5xl leading-none transition-colors ${
                      fontSize === "lg"
                        ? "text-gray-900 dark:text-white font-normal"
                        : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize("md")}
                    className={`text-3xl leading-none transition-colors ${
                      fontSize === "md"
                        ? "text-gray-900 dark:text-white font-normal"
                        : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize("sm")}
                    className={`text-xl leading-none transition-colors ${
                      fontSize === "sm"
                        ? "text-gray-900 dark:text-white font-normal"
                        : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                    }`}
                  >
                    A
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Speed & Size Controls - Mobile/Tablet/Small Laptop */}
          <div className="lg:hidden w-full flex gap-4">
            {/* Speed */}
            <div className="flex-1 backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg p-4 flex flex-col items-center gap-3">
              <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
                Speed
              </span>
              <div className="text-sm tracking-[0.3em] text-gray-500 dark:text-gray-500 font-light flex gap-3 justify-center">
                {[16, 8, 4, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => setAutoPlaySpeed(num)}
                    className={`transition-colors hover:text-black dark:hover:text-white ${
                      autoPlaySpeed === num
                        ? "text-black dark:text-white font-bold"
                        : ""
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="flex-1 backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg p-4 flex flex-col items-center gap-3">
              <span className="block text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">
                Size
              </span>
              <div className="flex gap-4 items-end justify-center">
                <button
                  onClick={() => setFontSize("lg")}
                  className={`text-3xl leading-none transition-colors ${
                    fontSize === "lg"
                      ? "text-gray-900 dark:text-white font-normal"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("md")}
                  className={`text-2xl leading-none transition-colors ${
                    fontSize === "md"
                      ? "text-gray-900 dark:text-white font-normal"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("sm")}
                  className={`text-lg leading-none transition-colors ${
                    fontSize === "sm"
                      ? "text-gray-900 dark:text-white font-normal"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white font-light"
                  }`}
                >
                  A
                </button>
              </div>
            </div>
          </div>
          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden lg:flex lg:flex-col gap-6">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-300/50 dark:hover:bg-white/20 transition-all duration-300 group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 ml-4 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Date & Time - Mobile/Tablet/Small Laptop */}
          <div className="lg:hidden w-full backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg p-6 flex flex-col gap-6">
            {/* Date */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center">
                Date
              </span>
              <div className="text-2xl font-serif text-center">
                <span className="font-normal text-gray-900 dark:text-white">
                  {day}
                </span>{" "}
                <span className="text-gray-500 dark:text-gray-400 font-light">
                  of
                </span>{" "}
                {month}
                <span className="text-base text-gray-900 dark:text-white font-normal ml-2">
                  {year}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center">
                Time
              </span>
              <div className="text-center">
                <span className="text-3xl font-light text-gray-900 dark:text-white tracking-tighter flex items-baseline gap-2 justify-center">
                  <span>
                    <span className="font-bold">{hours}</span>:{minutes}
                  </span>
                  <span className="text-xl text-gray-500 dark:text-gray-400 font-normal">
                    {ampm}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quote & Navigation */}
          <div className="mt-auto w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-6 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={prevQuote}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={nextQuote}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="relative pt-8 pb-8 px-6 backdrop-blur-sm bg-gray-100/30 dark:bg-white/5 rounded-lg w-full lg:w-auto"
              >
                <FaQuoteLeft className="absolute top-2 left-2 text-gray-400 dark:text-gray-500 opacity-60" size={24} />
                <p className={`${fontSizes[fontSize].quote} text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left`}>
                  {slides[currentQuote].quote}
                </p>
                <FaQuoteRight className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-500 opacity-60" size={24} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Center Section (Carousel) */}
        <div className="lg:col-span-6 flex opacity-80 flex-col items-center justify-center order-1 lg:order-2 relative z-10">
          {/* Image Container */}
          <div className="relative w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] flex items-center justify-center">
            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                {/* Vignette on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
              </motion.div>
            </AnimatePresence>

            {/* Title Overlay - STATIC (No Animation) */}
            {/* Title Overlay - TextPressure */}
            <div className="absolute z-50 text-center flex flex-col items-center pointer-events-none w-full h-full justify-center">
              <div className="w-[300px] md:w-[700px] lg:w-[600px] h-[100px] md:h-[200px]">
                <TextPressure
                  text="PORTFOLIO"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  minFontSize={36}
                />
              </div>
            </div>
          </div>

          {/* CV Download Button (Triggers Popup) */}
          <div className="relative mt-12 z-30">
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="group relative px-6 py-3
                        text-gray-900 dark:text-white
                        tracking-widest text-xs uppercase
                        border border-gray-900 dark:border-white
                        overflow-hidden
                        transition-colors duration-300
                        hover:text-white dark:hover:text-gray-900"
            >
              {/* Fill effect on hover */}
              <span
                className="absolute inset-0 bg-gray-900 dark:bg-white
                              scale-x-0 group-hover:scale-x-100
                              transition-transform duration-300 ease-out origin-left"
              />

              {/* Text & Icon */}
              <span className="relative z-10 flex items-center gap-2">
                <span>Download CV</span>
                <Download size={14} />
              </span>
            </button>
          </div>

          {/* Decorative Lines (Carousel Indicators) */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-gray-900 dark:bg-white"
                    : "w-2 bg-gray-400 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons - Mobile/Tablet/Small Laptop */}
          <div className="lg:hidden flex gap-6 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-300/50 dark:hover:bg-white/20 transition-all duration-300 group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full py-6 lg:py-12 order-2 lg:order-3 px-4 md:px-8 lg:pr-8 relative z-40 items-center lg:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-end"
            >
              <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight text-gray-900 dark:text-white text-center lg:text-right">
                {slides[currentSlide].rightTitle}
              </h3>
              <div className="w-12 h-1 bg-gray-400 dark:bg-gray-700 mb-8 mx-auto lg:ml-auto lg:mr-0"></div>
              <p
                className={`${fontSizes[fontSize].text} text-gray-600 dark:text-gray-400 leading-loose mb-12 max-w-xs transition-all duration-300 text-center lg:text-right`}
              >
                {slides[currentSlide].rightText}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center lg:items-end gap-8"
          >
            {/* Date */}
            <div className="hidden lg:flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center lg:text-right">
                Date
              </span>
              <div className="text-2xl font-serif text-center lg:text-right">
              <span className="font-normal text-gray-900 dark:text-white">
                {day}
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400 font-light">
                of
              </span>{" "}
              {month}
              <span className="text-base text-gray-900 dark:text-white font-normal ml-2">
                {year}
              </span>
            </div>
            </div>
            
            {/* Clock */}
            <div className="hidden lg:flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase text-center lg:text-right">
                Time
              </span>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <div className="text-center lg:text-right">
                <span className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tighter flex items-baseline gap-2 justify-center lg:justify-end">
                  <span>
                    <span className="font-bold">{hours}</span>:{minutes}
                  </span>
                  <span className="text-2xl text-gray-500 dark:text-gray-400 font-normal">
                    {ampm}
                  </span>
                </span>
                <span className="text-xl text-gray-500 font-light tracking-widest mt-1 block">
                  {seconds}
                </span>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CV Modal */}
      <AnimatePresence>
        {isCVModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
            onClick={() => setIsCVModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCVModalOpen(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <div className="space-y-12">
                {/* Title */}
                <h3 className="text-sm uppercase tracking-[0.3em] text-center text-gray-500 font-sans">
                  Download CV
                </h3>

                {/* Download Links */}
                <div className="flex flex-col gap-6 min-w-[400px]">
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                      English Version
                    </span>
                    <Download
                      size={16}
                      className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ml-auto"
                    />
                  </a>
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                      French Version
                    </span>
                    <Download
                      size={16}
                      className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ml-auto"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
            onClick={() => setIsMenuModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsMenuModal(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <div className="space-y-12">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-8 text-center">
                  <a
                    href="#"
                    className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#"
                    className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </a>
                </nav>

                <div className="w-64 h-[1px] bg-gray-200 dark:bg-gray-800 mx-auto"></div>

                {/* Social Media Links */}
                <div className="flex justify-center gap-8 mt-12">
                  <a
                    href="#"
                    className="p-4 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="#"
                    className="p-4 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="p-4 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Follow Modal */}
      <AnimatePresence>
        {isFollowModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
            onClick={() => setIsFollowModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFollowModalOpen(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <div className="space-y-12">
                {/* Title */}
                <h3 className="text-sm uppercase tracking-[0.3em] text-center text-gray-500 font-sans">
                  Follow Me
                </h3>

                {/* Social Media Links */}
                <div className="flex flex-col gap-6 min-w-[400px]">
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <Linkedin size={20} className="text-gray-900 dark:text-white" />
                    <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <Instagram size={20} className="text-gray-900 dark:text-white" />
                    <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                      Instagram
                    </span>
                  </a>
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <Github size={20} className="text-gray-900 dark:text-white" />
                    <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                      GitHub
                    </span>
                  </a>
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-8 py-6 backdrop-blur-sm bg-gray-100/50 dark:bg-white/10 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <Twitter size={20} className="text-gray-900 dark:text-white" />
                    <span className="font-sans uppercase text-xs font-bold tracking-widest text-gray-900 dark:text-white">
                      Twitter
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThirdHeroSection;
