import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  const scrollContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = projects.length;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Use dynamic card width if available, otherwise fallback to reasonable default
      const card = scrollContainerRef.current.children[0];
      const scrollAmount = card 
        ? (card.offsetWidth + 32) * (direction === "left" ? -1 : 1)
        : (direction === "left" ? -450 : 450);

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll logic with hover pause
  const timerRef = useRef(null);

  const startAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      scroll("right");
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Seamless Infinite Loop and Scroll Indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        // The width of a single set of projects
        const singleSetWidth = scrollWidth / 3;

        // Infinite Loop Jump: If we're at the very start or end, jump to the middle set
        if (scrollLeft <= 5) {
          container.scrollTo({ left: singleSetWidth, behavior: "auto" });
        } else if (scrollLeft + clientWidth >= scrollWidth - 5) {
          container.scrollTo({ left: singleSetWidth, behavior: "auto" });
        }

        // Calculate active index based on center of viewport
        const viewportCenter = scrollLeft + clientWidth / 2;
        const cards = container.children;
        let closestIndex = 0;
        let minDistance = Infinity;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(viewportCenter - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }
        
        // Map the index back to the 1..totalSlides range (modulating by totalSlides)
        const normalizedIndex = (closestIndex % totalSlides) + 1;
        if (!isNaN(normalizedIndex)) setCurrentSlide(normalizedIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      // Start in the middle set for seamless initial scroll in both directions
      const initialScroll = container.scrollWidth / 3;
      container.scrollTo({ left: initialScroll, behavior: "auto" });
      
      container.addEventListener("scroll", handleScroll);
      // Run once to set initial state
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [totalSlides]);

  return (
    <section className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 py-24 font-sans overflow-hidden transition-colors duration-700">
      {/* Background Dotted Pattern (Subtle) */}
      <div
        className="absolute inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: "radial-gradient(#71717a 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* Giant Watermark Text */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[15vw] font-bold text-zinc-200/50 dark:text-zinc-900/50 z-0 select-none pointer-events-none tracking-tighter leading-none uppercase">
        projects
      </div>

      {/* Header Navigation */}
      <div className="absolute top-12 left-0 w-full px-8 md:px-16 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50 text-black dark:text-white">
        <div className="flex flex-col leading-tight font-black font-serif text-lg">
          <span>BASE</span>
          <span>HOME</span>
        </div>
        <div className="hidden md:flex items-center gap-16">
          <span className="hover:opacity-50 cursor-pointer transition-opacity">
            MY SKILLS
          </span>
          <span className="hover:opacity-50 cursor-pointer transition-opacity border-b border-black dark:border-white pb-1">
            MY PROJECTS
          </span>
          <span className="hover:opacity-50 cursor-pointer transition-opacity">
            GET IN TOUCH
          </span>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative z-10 w-full mt-8">
        {/* Left Fading Edge */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>
        
        {/* Right Fading Edge */}
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all text-zinc-900 dark:text-zinc-100 border border-transparent dark:border-zinc-800"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all text-zinc-900 dark:text-zinc-100 border border-transparent dark:border-zinc-800"
        >
          <ArrowRight size={20} />
        </button>

        <div
          ref={scrollContainerRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-12 lg:px-20 pb-12 pt-4 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[...projects, ...projects, ...projects].map((project, index) => {
            // Determine focus for the "3 middle pictures"
            // We use the raw index compared to the visual center (which we track via currentSlide logic internally)
            // But since currentSlide is normalized, we need a way to check focus on the triple list
            
            // Simpler: Calculate focus based on distance from viewport center directly in render is hard,
            // so we'll use a CSS-based approach or a state-driven approach.
            // Let's use the currentSlide and a "virtual" index.
            
            const normalizedActiveIndex = (currentSlide - 1);
            const isItemActive = (index % totalSlides) === normalizedActiveIndex;
            const isNeighbor = Math.abs((index % totalSlides) - normalizedActiveIndex) <= 1 || 
                               Math.abs((index % totalSlides) - normalizedActiveIndex) === totalSlides - 1;

            return (
              <div
                key={`${project.id}-${index}`}
                className="transition-all duration-700 ease-in-out"
                style={{
                  opacity: isNeighbor ? 1 : 0.4,
                  filter: isNeighbor ? "none" : "grayscale(100%)",
                  transform: "scale(1)",
                }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer / Pagination Section */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-20 mt-12 flex justify-between items-end">
        {/* Progress Tracker */}
        <div className="w-full max-w-[250px]">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {String(currentSlide).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600">
              / {totalSlides}
            </span>
          </div>
          <div className="h-[2px] w-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-500"
              style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
