import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemoryStack from "../features/About/MemoryStack";
import ImageShowcase from "../features/About/ImageShowcase";
import GalleryModal from "../features/About/GalleryModal";
import { personalStory } from "../../data/about.js"

gsap.registerPlugin(ScrollTrigger);



// Flatten images for navigation
const allImages = personalStory.flatMap(story => 
    story.images.map(img => ({
        src: img,
        title: story.title,
        year: story.year,
        category: story.category,
        description: story.description
    }))
);

const About = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [direction, setDirection] = useState("next");

  const handleImageClick = (imgSrc, storyIndex) => {
     // Find the full image object from our flattened list
     const imgObj = allImages.find(img => img.src === imgSrc && img.year === personalStory[storyIndex].year);
     setDirection("next"); // Default entry direction
     if (imgObj) setSelectedImage(imgObj);
     else {
         // Fallback if strict match fails (e.g. reused images)
          setSelectedImage({
              src: imgSrc,
              title: personalStory[storyIndex].title,
              year: personalStory[storyIndex].year,
              category: personalStory[storyIndex].category,
              description: personalStory[storyIndex].description
          });
     }
  };

  const handleClose = () => setSelectedImage(null);

  const handleViewGallery = (index) => {
    setSelectedGallery(personalStory[index]);
  };

  const handleCloseGallery = () => setSelectedGallery(null);

  const handleNext = () => {
    if (!selectedImage) return;
    setDirection("next");
    const currIdx = allImages.findIndex(img => img.src === selectedImage.src && img.year === selectedImage.year);
    const nextIdx = (currIdx + 1) % allImages.length;
    setSelectedImage(allImages[nextIdx]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    setDirection("prev");
    const currIdx = allImages.findIndex(img => img.src === selectedImage.src && img.year === selectedImage.year);
    const prevIdx = (currIdx - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIdx]);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    // Refresh ScrollTrigger to ensure correct positions
    ScrollTrigger.refresh();

    const items = section.querySelectorAll(".timeline-item");

    if (section && line) {
      // Animate the central line
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      // Animate each timeline item
      items.forEach((item, index) => {
        const content = item.querySelector(".timeline-content");
        const dot = item.querySelector(".timeline-dot");
        const year = item.querySelector(".timeline-year");
        const stack = item.querySelector(".memory-stack-container");

        const isLast = index === items.length - 1;
        const isEven = index % 2 === 0;
        
        // For the NOW card (last item), don't use horizontal offset
        const xOffset = isLast ? 0 : (isEven ? -50 : 50);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Safe array construction for main content
        const mainTargets = [content, year].filter((el) => el !== null);

        if (mainTargets.length > 0) {
          tl.fromTo(
            mainTargets,
            { opacity: 0, x: xOffset, y: isLast ? 20 : 0 },
            { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" }
          );
        }

        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.6"
          );
        }

        if (stack) {
          tl.fromTo(
            stack,
            { opacity: 0, scale: 0.8, rotation: isEven ? -10 : 10 },
            { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
            "-=0.6"
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
     <ImageShowcase 
        image={selectedImage}
        direction={direction}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
    />
    <GalleryModal 
        gallery={selectedGallery}
        onClose={handleCloseGallery}
        onImageClick={(imgSrc) => {
            // Robust find using the gallery context
            const imgMatch = allImages.find(i => 
                i.src === imgSrc && 
                i.year === selectedGallery.year && 
                i.title === selectedGallery.title
            );
            if (imgMatch) {
                setDirection("next");
                setSelectedImage(imgMatch);
            }
        }}
    />
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-stone-100 dark:bg-zinc-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32">
          <h2 className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
            My Journey
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white">
            About Me
          </h3>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 origin-top transform -translate-x-1/2"
          ></div>

          {/* Timeline Items */}
          <div className="space-y-24 md:space-y-32">
            {personalStory.map((story, index) => {
              const isLast = index === personalStory.length - 1;
              if (isLast) {
                return (
                  <div
                    key={index}
                    className={`timeline-item group flex flex-col items-center justify-center w-full relative pt-4 md:pt-8 pb-12`}
                  >
                     {/* Center Dot */}
                    <div 
                      className="absolute top-0 left-4 md:left-1/2 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-gray-100 dark:border-gray-900 -translate-x-1/2 z-20 timeline-dot shadow-lg"
                    ></div>

                    <div className="w-full flex flex-col items-center text-center p-8 md:p-12 rounded-3xl transition-colors duration-500 bg-gray-900 dark:bg-gray-100 shadow-2xl relative overflow-hidden">
                        {/* Ribbon */}
                        <div className="card-ribbon card-ribbon--special"></div>
                        
                        {/* Year */}
                        <div className="text-5xl md:text-8xl font-bold font-serif mb-2 text-white dark:text-gray-900 timeline-year relative z-10">
                             {story.year}
                        </div>

                         {/* Gallery Button */}
                         <div className="mb-8 relative z-20">
                             <MemoryStack 
                                images={story.images}
                                onImageClick={(img) => handleImageClick(img, index)}
                                onViewGallery={() => handleViewGallery(index)}
                             />
                         </div>
                        
                        {/* Content centered */}
                        <div className="flex flex-col items-center w-full timeline-content relative z-10">
                            <span className="text-sm font-bold tracking-widest text-blue-400 dark:text-blue-600 uppercase mb-3">
                              {story.category}
                            </span>
                            <h4 className="text-3xl md:text-4xl font-bold mb-6 text-white dark:text-gray-900">
                              {story.title}
                            </h4>
                            <p className="text-gray-300 dark:text-gray-600 leading-relaxed mb-8 max-w-xl text-center text-base">
                              {story.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                              {story.items.map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-4 py-2 text-xs md:text-sm rounded-full font-medium bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 border border-gray-700 dark:border-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                        </div>
                    </div>
                  </div>
                );
              }

              return (
              <div
                key={index}
                className={`timeline-item group flex flex-col md:flex-row items-center justify-between w-full p-0 md:p-8 rounded-3xl transition-all duration-500 bg-white/60 dark:bg-gray-800/20 relative overflow-visible ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Ribbon - Swapped side to match text side */}
                <div className={`card-ribbon ${index % 2 === 0 ? 'card-ribbon--right' : 'card-ribbon--left'}`}></div>
                
                {/* Content Side */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0 timeline-content lg:w-[42%]">
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:items-start" : "md:items-end"
                    }`}
                  >
                    <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
                      {story.category}
                    </span>
                    <h4
                      className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${
                        index % 2 === 0 ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      {story.title}
                    </h4>
                    <p
                      className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-md ${
                        index % 2 === 0 ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      {story.description}
                    </p>
                    <div className={`flex flex-wrap gap-2 mb-8 md:mb-0 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                      {story.items.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-gray-100 dark:border-gray-900 -translate-x-1/2 mt-0 z-10 timeline-dot shadow-lg group-hover:scale-125 transition-transform duration-300"></div>

                {/* Year & Memory Side */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0 timeline-year relative lg:w-[42%]">
                  <div 
                      className="flex flex-col items-center gap-2 w-full"
                  >
                        {/* Year Text - Order depends on side */}
                        <div
                            className={`text-5xl md:text-8xl font-bold text-gray-200 dark:text-gray-800 font-serif mb-0 transition-colors duration-500 group-hover:text-gray-300 dark:group-hover:text-gray-700`}
                        >
                            {story.year}
                        </div>
                        
                         {/* Gallery Button */}
                          <div className="w-full flex justify-center">
                              <MemoryStack 
                                 images={story.images} 
                                 onImageClick={(img) => handleImageClick(img, index)}
                                 onViewGallery={() => handleViewGallery(index)}
                              />
                          </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
