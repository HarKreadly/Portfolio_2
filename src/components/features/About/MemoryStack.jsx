import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MemoryStack = ({ images, onImageClick, className = "" }) => {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = stack.querySelectorAll(".memory-card");

    // Initial Set: Hidden, slightly lower, and random subtle rotation
    cards.forEach((card) => {
        gsap.set(card, {
            opacity: 0,
            y: 50,
            rotation: Math.random() * 12 - 6 // -6 to 6 degrees
        });
    });

    // Elegant slide-up sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stack,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
      stagger: 0.08,
    });
  }, []);

  return (
    <div
      ref={stackRef}
      className={`relative flex items-center justify-center gap-6 px-12 w-full max-w-6xl overflow-hidden h-48 md:h-64 ${className}`}
      style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
      }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="memory-card relative w-28 h-40 md:w-36 md:h-52 flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg rounded-xl transform transition-all duration-300 border-[6px] border-white dark:border-gray-700 cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:scale-105 z-10"
          onClick={(e) => {
            e.stopPropagation();
            if (onImageClick) onImageClick(img, index);
          }}
        >
          <div className="w-full h-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 pointer-events-none">
            <img
              src={img}
              alt="Memory"
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoryStack;
