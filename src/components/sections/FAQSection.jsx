import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Plus, X, Zap } from "lucide-react";
import gsap from "gsap";

const faqs = [
  {
    question: "What is your service about?",
    answer: "We provide high-quality digital solutions tailored to modern business needs, focusing on scalability and performance. Our team ensures that every line of code contributes to your business growth.",
  },
  {
    question: "How does the pricing work?",
    answer: "Our pricing is flexible and depends on the scope of the project. We also offer custom plans for enterprises, including dedicated support and infrastructure scaling.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time without hidden fees or penalties. Your access will remain active until the end of the current billing cycle.",
  },
  {
    question: "Do you offer support?",
    answer: "Yes, we provide 24/7 customer support to ensure smooth operation of all services. You can reach us via email, live chat, or our dedicated phone line.",
  },
];

const FAQItem = ({ faq, isOpen, index }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div 
      className={`w-full transition-all duration-500 px-6 py-3.5 mb-3 
        ${isOpen 
          ? "bg-stone-100 dark:bg-stone-900 shadow-sm border-stone-300/50 dark:border-stone-700/50" 
          : "bg-stone-50 dark:bg-[#111] opacity-60 border-stone-200/50 dark:border-stone-800/50"
        } 
        rounded-[1.8rem] border group`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
           <span className="text-[10px] font-black font-serif text-stone-300 dark:text-stone-700 tracking-widest">
             {(index + 1).toString().padStart(2, '0')}
           </span>
           <span className={`text-left font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-stone-900 dark:text-white text-lg' : 'text-stone-600 dark:text-stone-400 text-base'}`}>
             {faq.question}
           </span>
        </div>
        <div className={`flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-stone-800 shadow-sm shrink-0 transition-all duration-500 ${isOpen ? 'rotate-90' : ''}`}>
          {isOpen ? (
            <X size={14} className="text-stone-600 dark:text-stone-300" />
          ) : (
            <Plus size={14} className="text-stone-600 dark:text-stone-300" />
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <div className="pl-12 pr-6 pb-2 text-stone-500 dark:text-stone-400 text-xs md:text-sm leading-relaxed mt-3 border-t border-stone-200/30 dark:border-stone-800/30 pt-4">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Scroll Tracking logic similar to About2
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.round(latest * (faqs.length - 1));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  });

  return (
    <div ref={containerRef} style={{ height: `${faqs.length * 100}vh` }} className="relative w-full bg-white dark:bg-[#0a0a0a]">
      <section className="sticky top-0 h-screen w-full overflow-hidden font-sans text-gray-900 dark:text-white transition-colors duration-500 py-24 flex items-center">
        
        {/* Header Navigation */}
        <div className="absolute top-12 left-0 w-full px-8 md:px-16 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50 text-black dark:text-white">
          <div className="flex flex-col leading-tight font-black font-serif text-lg">
            <span>BASE</span>
            <span>HOME</span>
          </div>
          <div className="hidden md:flex items-center gap-16">
            <span className="hover:opacity-50 cursor-pointer transition-opacity">MY PROJECTS</span>
            <span className="hover:opacity-50 cursor-pointer transition-opacity">CONTACT ME</span>
            <span className="hover:opacity-50 cursor-pointer transition-opacity border-b border-black dark:border-white pb-1">FAQ</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row px-8 md:px-16 mt-16 lg:mt-0 relative z-10 items-center justify-between gap-12 lg:gap-24">
          
          {/* LEFT: Title & Info */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <span className="text-[10px] font-black tracking-[0.3em] text-stone-400 dark:text-stone-500 uppercase mb-6 flex items-center gap-4">
               <span className="w-8 h-px bg-stone-300 dark:bg-stone-700"></span>
               Inquiry Hub
            </span>
            
            <h2 className="text-5xl md:text-7xl font-black font-sans leading-[0.9] tracking-tighter text-stone-900 dark:text-white mb-8">
              COMMON <br/> <span className="text-stone-200 dark:text-stone-900" style={{ WebkitTextStroke: "1px #a8a29e" }}>QUERIES</span>
            </h2>
            
            <p className="text-stone-400 dark:text-stone-500 text-xs leading-loose max-w-sm mb-12">
              Our support framework is structured to provide clarity on our pedagogical approach and digital workflows. Scroll through to explore the most frequent questions from our partners.
            </p>

            <div className="flex items-center gap-4 font-bold uppercase tracking-[0.2em] text-[10px] text-black dark:text-white cursor-pointer hover:opacity-50 transition-opacity">
               <span className="w-12 h-px bg-black dark:bg-white block"></span>
               GET IN TOUCH
            </div>
          </div>

          {/* RIGHT: Snap-Scroll Accordions */}
          <div className="w-full lg:w-[55%] h-[60vh] flex flex-col justify-center">
            <div className="flex flex-col w-full relative">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  index={index}
                  faq={faq}
                  isOpen={currentIndex === index}
                />
              ))}
              
              {/* Progress Indicator */}
              <div className="absolute -left-12 top-0 bottom-0 w-px bg-stone-200 dark:bg-stone-800 hidden lg:block">
                <motion.div 
                  className="w-full bg-stone-800 dark:bg-stone-400"
                  style={{ height: `${((currentIndex + 1) / faqs.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default FAQSection;