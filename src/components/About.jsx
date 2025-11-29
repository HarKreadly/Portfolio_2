import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const yearRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const progressBarsRef = useRef([]);
  const bottomGridRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayYear, setDisplayYear] = useState(1995);
  const prevIndexRef = useRef(0);

  const personalStory = [
    {
      title: "The Beginning",
      description: "Born with an insatiable curiosity and a passion for creating things that matter. From early days tinkering with computers to building digital experiences, the journey has been driven by a simple belief: technology should serve people, not the other way around.",
      year: 1995,
      yearDisplay: "1995",
      category: "Origins",
      items: [
        { label: "Birthplace", value: "Digital Native" },
        { label: "First love", value: "Computers" },
        { label: "Dream", value: "Build & Create" },
        { label: "Drive", value: "Curiosity" },
      ]
    },
    {
      title: "Finding Purpose",
      description: "Education opened doors to endless possibilities. Studying design, code, and human behavior revealed that the best solutions come from understanding people first. Every challenge became an opportunity to learn, grow, and make an impact.",
      year: 2015,
      yearDisplay: "2015",
      category: "Education",
      items: [
        { label: "Learning", value: "Never Stops" },
        { label: "Focus", value: "User Experience" },
        { label: "Approach", value: "Human-Centered" },
        { label: "Philosophy", value: "Empathy First" },
      ]
    },
    {
      title: "Living the Craft",
      description: "Today, every project is a canvas. Working with passionate teams, solving real problems, and creating digital experiences that people love. The mission is clear: build meaningful solutions that inspire, delight, and empower.",
      year: 2025,
      yearDisplay: "Now",
      category: "Present",
      items: [
        { label: "Passion", value: "Building Dreams" },
        { label: "Values", value: "Quality & Care" },
        { label: "Mission", value: "Impact Lives" },
        { label: "Vision", value: "Better Future" },
      ]
    },
  ];

  const currentStory = personalStory[activeIndex];

  const handleNavigation = (direction) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const totalScroll = st.end - st.start;
    const sectionSize = totalScroll / personalStory.length;
    
    let targetIndex;
    if (direction === 'next') {
      targetIndex = Math.min(activeIndex + 1, personalStory.length - 1);
    } else {
      targetIndex = Math.max(activeIndex - 1, 0);
    }

    // Calculate target scroll position (start of the section + a small buffer)
    const targetScroll = st.start + (targetIndex * sectionSize) + 50;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  // Animate counter when activeIndex changes
  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      const fromYear = personalStory[prevIndexRef.current].year;
      const toYear = personalStory[activeIndex].year;
      
      // Animate the counter
      gsap.to({ value: fromYear }, {
        value: toYear,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function() {
          setDisplayYear(Math.round(this.targets()[0].value));
        }
      });
      
      // Animate text elements when content changes
      const tl = gsap.timeline();
      
      // Fade out and slide up
      tl.to([titleRef.current, descriptionRef.current, categoryRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.05,
      })
      // Fade in and slide down with new content
      .to([titleRef.current, descriptionRef.current, categoryRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });

      // Animate year with scale effect
      gsap.fromTo(yearRef.current,
        { scale: 0.95, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
      );

      // Animate bottom grid items
      if (bottomGridRef.current) {
        const gridItems = bottomGridRef.current.querySelectorAll('.grid-item');
        gsap.fromTo(gridItems,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3
          }
        );
      }
      
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      // Fade in section
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Initial animation for text elements
      gsap.fromTo(
        [titleRef.current, descriptionRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Scroll-triggered carousel progression
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Calculate which story we're on
          const newIndex = Math.min(
            Math.floor(progress * personalStory.length),
            personalStory.length - 1
          );
          setActiveIndex(newIndex);
        },
      });
      scrollTriggerRef.current = st;
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-[300vh] relative z-20 font-serif"
    >
      <div className="sticky top-0 h-screen flex flex-col">
        <div className="w-full flex-1 bg-gray-50 dark:bg-gray-900 rounded-t-[3rem] pt-12 pb-12 lg:pt-20 lg:pb-24 transition-colors duration-1000 flex flex-col justify-center">
          <div className="w-full h-full flex flex-col justify-center px-4 md:px-8 lg:px-24">
            <div className="w-full">
              
              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-8 lg:mb-16">
                
                {/* Left Column - Text Content */}
                <div className="space-y-6 lg:space-y-10">
                  <div className="space-y-4 lg:space-y-6">
                    <h1 
                      ref={titleRef}
                      className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight"
                    >
                      {currentStory.title}
                    </h1>
                    
                    <div className="w-12 lg:w-16 h-1 bg-gray-400 dark:bg-gray-700"></div>
                    
                    <p 
                      ref={descriptionRef}
                      className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed lg:leading-loose max-w-xl font-light"
                    >
                      {currentStory.description}
                    </p>
                  </div>

                  {/* Scroll indicator */}
                  <div className="pt-2 lg:pt-4">
                    <p className="text-[10px] lg:text-xs font-sans font-bold tracking-widest text-gray-900 dark:text-white uppercase mb-2 lg:mb-4">
                      Progress
                    </p>
                    <div className="flex gap-2 mb-6">
                      {personalStory.map((_, idx) => (
                        <div
                          key={idx}
                          ref={(el) => (progressBarsRef.current[idx] = el)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === activeIndex
                              ? 'w-8 lg:w-12 bg-gray-900 dark:bg-white'
                              : 'w-4 lg:w-6 bg-gray-400 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center bg-white dark:bg-gray-800 rounded-full border-gray-200 dark:border-gray-700 w-fit">
                      <button 
                        onClick={() => handleNavigation('prev')}
                        disabled={activeIndex === 0}
                        className={`p-3 px-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 rounded-l-full ${
                          activeIndex === 0 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'active:bg-gray-100 dark:active:bg-gray-700'
                        }`}
                        aria-label="Previous story"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                      </button>
                      <div className="w-[1px] h-5 bg-gray-200 dark:bg-gray-700"></div>
                      <button 
                        onClick={() => handleNavigation('next')}
                        disabled={activeIndex === personalStory.length - 1}
                        className={`p-3 px-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 rounded-r-full ${
                          activeIndex === personalStory.length - 1 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'active:bg-gray-100 dark:active:bg-gray-700'
                        }`}
                        aria-label="Next story"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Large Year Display */}
                <div className="flex flex-col items-center lg:items-end justify-center order-first lg:order-last mb-8 lg:mb-0">
                  <div className="text-center lg:text-right">
                    <div 
                      ref={categoryRef}
                      className="text-[10px] lg:text-xs font-sans font-bold tracking-[0.3em] text-gray-500 dark:text-gray-500 uppercase mb-4 lg:mb-8"
                    >
                      {currentStory.category}
                    </div>
                    <div 
                      ref={yearRef}
                      className="text-[6rem] md:text-[10rem] lg:text-[18rem] font-bold leading-none text-gray-900 dark:text-white tracking-tighter tabular-nums font-serif"
                    >
                      {activeIndex === 2 ? "Now" : displayYear}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid - Personal Details */}
              <div className="pt-8 lg:pt-16 mt-6 lg:mt-12 border-t border-gray-200 dark:border-gray-800">
                <div 
                  ref={bottomGridRef}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
                >
                  {currentStory.items.map((item, index) => (
                    <div 
                      key={index}
                      className="grid-item group"
                    >
                      <div className="h-full p-3 lg:p-5 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-900 dark:hover:border-white transition-all duration-300">
                        <div className="text-[10px] lg:text-xs font-sans font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-1 lg:mb-3">
                          {item.label}
                        </div>
                        <div className="text-sm lg:text-base font-normal text-gray-900 dark:text-white leading-relaxed">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
