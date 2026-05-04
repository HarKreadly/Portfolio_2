import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { personalStory } from "../data/about.js";
import { ChevronLeft, ChevronRight, Eye, Heart } from "lucide-react";
import logo from "../assets/HK.svg";

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.round(latest * (personalStory.length - 1));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  });

  const handleNext = () => {
    if (currentIndex < personalStory.length - 1 && containerRef.current) {
      const nextIndex = currentIndex + 1;
      const targetY =
        containerRef.current.offsetTop + nextIndex * window.innerHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0 && containerRef.current) {
      const prevIndex = currentIndex - 1;
      const targetY =
        containerRef.current.offsetTop + prevIndex * window.innerHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const currentStory = personalStory[currentIndex];

  return (
    <>
      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(0,0,0,0.8);
          color: transparent;
        }
        .dark .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.8);
          color: transparent;
        }
      `}</style>
      <div
        ref={containerRef}
        style={{ height: `${personalStory.length * 100}vh` }}
        className="relative w-full bg-white dark:bg-stone-950"
      >
        <section
          id="about2"
          className="sticky top-0 min-h-screen w-full overflow-hidden font-sans text-gray-900 dark:text-white transition-colors duration-500 py-24 flex items-center"
        >
          {/* Header Navigation (Simulated from reference) */}
          <div className="absolute top-12 left-0 w-full px-8 md:px-16 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50 text-black dark:text-white">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="HK Logo"
                className="w-10 h-10 dark:invert opacity-80"
              />
            </div>
            <div className="hidden md:flex items-center gap-16">
              <span className="hover:opacity-50 cursor-pointer transition-opacity">
                HOME SCREEN
              </span>
              <span className="hover:opacity-50 cursor-pointer transition-opacity border-b border-black dark:border-white pb-1">
                ABOUT ME
              </span>
              <span className="hover:opacity-50 cursor-pointer transition-opacity">
                MY SKILLS
              </span>
            </div>
          </div>

          <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col lg:flex-row px-8 md:px-16 mt-16 lg:mt-0 relative z-10 items-center justify-between gap-12 lg:gap-24">
            {/* LEFT: Image Carousel */}
            <div className="w-full lg:w-[60%] h-[50vh] md:h-[60vh] lg:h-[75vh] relative flex items-center mt-12 lg:mt-0">
              <AnimatePresence initial={false}>
                {personalStory.map((story, index) => {
                  const offset = index - currentIndex;

                  // Render current and previous 2
                  if (offset > 0 || offset < -2) return null;

                  const isActive = offset === 0;
                  const isPrev1 = offset === -1;
                  const isPrev2 = offset === -2;

                  let left = "0%";
                  let width = "0%";
                  let opacity = 1;
                  let zIndex = 10;

                  if (isActive) {
                    left = "35%";
                    width = "65%";
                    zIndex = 30;
                  } else if (isPrev1) {
                    left = "15%";
                    width = "18%";
                    opacity = 0.8;
                    zIndex = 20;
                  } else if (isPrev2) {
                    left = "0%";
                    width = "13%";
                    opacity = 0.5;
                    zIndex = 10;
                  }

                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      animate={{ left, width, opacity, zIndex }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute h-[85%] top-0 overflow-hidden"
                    >
                      <img
                        src={story.images[0]}
                        alt={story.title}
                        className="w-full h-full object-cover filter brightness-90 dark:brightness-75"
                      />

                      {/* Active Slide Text Overlay */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
                          >
                            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-black text-center tracking-widest leading-[1.2] uppercase drop-shadow-2xl">
                              {story.category.split(" ").map((word, i) => (
                                <span key={i} className="block">
                                  {word}
                                </span>
                              ))}
                            </h2>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bottom Stats (Simulated) & Slide Number */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        {isActive ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col gap-2 text-white/90 text-xs tracking-wider font-medium"
                          >
                            <div className="flex items-center gap-2">
                              <Eye size={14} /> <span>{1800 + index * 10}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart size={14} />{" "}
                              <span>{1350 + index * 5}</span>
                            </div>
                          </motion.div>
                        ) : (
                          <div
                            className="text-white/80 font-serif text-3xl lg:text-4xl font-bold ml-auto opacity-70"
                            style={{
                              WebkitTextStroke: "1px rgba(255,255,255,0.5)",
                              color: "transparent",
                            }}
                          >
                            {(index + 1).toString().padStart(2, "0")}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Text blocks below images */}
              <div className="absolute bottom-0 left-0 w-full flex text-[10px] text-gray-500 leading-relaxed tracking-wide">
                <div className="w-[15%] pr-4 hidden md:block border-t border-gray-200 dark:border-gray-800 pt-4">
                  {currentIndex > 1 && (
                    <p className="line-clamp-4 pr-2">
                      {personalStory[currentIndex - 2].description}
                    </p>
                  )}
                </div>
                <div className="w-[18%] pr-4 hidden md:block border-l border-t border-gray-200 dark:border-gray-800 pl-4 pt-4">
                  {currentIndex > 0 && (
                    <p className="line-clamp-4 pr-2">
                      {personalStory[currentIndex - 1].description}
                    </p>
                  )}
                </div>
                <div className="w-[65%] pl-4 lg:pl-8 flex flex-col md:flex-row items-start justify-between border-t md:border-l border-gray-200 dark:border-gray-800 pt-4 gap-4">
                  <p className="max-w-xs lg:max-w-md line-clamp-4">
                    {currentStory.description}
                  </p>
                  <div className="flex items-center gap-4 font-bold uppercase tracking-[0.2em] text-black dark:text-white cursor-pointer hover:opacity-50 transition-opacity shrink-0">
                    <span className="w-8 h-px bg-black dark:bg-white block"></span>
                    MORE ABOUT IT
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Content & Timeline */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center relative pl-0 lg:pl-12 h-full lg:h-[75%] pb-20 lg:pb-0">
              <div className="flex relative mt-auto lg:mt-0 lg:mb-12">
                {/* Vertical Timeline Numbers */}
                <div className="absolute -left-20 top-20 flex flex-col gap-10 text-sm font-black text-gray-300 dark:text-gray-700 font-serif tracking-widest hidden lg:flex">
                  {personalStory.map((_, idx) => (
                    <div
                      key={idx}
                      className={`transition-colors duration-500 ${idx === currentIndex ? "" : "opacity-50"}`}
                    >
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col w-full"
                  >
                    {/* Number & Title */}
                    <div className="flex items-start justify-between w-full mb-8 relative pr-4 lg:pr-8">
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div className="absolute top-8 -left-32 w-24 h-px bg-gray-300 dark:bg-gray-700 hidden lg:block"></div>

                        <div className="text-6xl md:text-7xl font-black font-sans leading-none tracking-tighter outline-text shrink-0">
                          {(currentIndex + 1).toString().padStart(2, "0")}
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 dark:text-white leading-tight mt-1 max-w-[280px]">
                          {currentStory.title}
                        </h3>
                      </div>

                      <div className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1">
                        {currentStory.year}
                      </div>
                    </div>

                    <p className="text-gray-400 dark:text-gray-500 text-xs md:text-sm leading-loose max-w-sm ml-0 lg:ml-[5.5rem]">
                      Looking for inspiration for your soul project? Search for
                      images based on colors, image formats, etc. Our brain is
                      continually exposed to internal and external stimuli.
                      Silence feels impossible, like emptying our spirit. <br />
                      <br />
                      <span className="font-bold text-gray-900 dark:text-gray-300 block mb-1">
                        Details:
                      </span>
                      <span className="opacity-80">
                        {currentStory.items.join(" — ")}
                      </span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-12 lg:mt-auto border-t border-gray-200 dark:border-gray-800 pt-6">
                <button
                  onClick={handlePrev}
                  className="flex-1 flex flex-col items-center justify-center py-5 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group cursor-pointer relative"
                >
                  <span className="text-[10px] tracking-[0.2em] font-bold mb-3 text-black dark:text-white">
                    PREV
                  </span>
                  <div className="flex overflow-hidden text-gray-400">
                    <ChevronLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    <ChevronLeft
                      size={16}
                      className="-ml-2 group-hover:-translate-x-1 transition-transform"
                    />
                  </div>
                </button>

                <button
                  onClick={handleNext}
                  className="flex-1 flex flex-col items-center justify-center py-5 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group cursor-pointer"
                >
                  <span className="text-[10px] tracking-[0.2em] font-bold mb-3 text-black dark:text-white">
                    NEXT
                  </span>
                  <div className="flex overflow-hidden text-gray-400">
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    <ChevronRight
                      size={16}
                      className="-ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutSection;
