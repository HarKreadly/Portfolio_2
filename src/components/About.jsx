import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const personalStory = [
    {
      title: "The Beginning",
      description:
        "Born with an insatiable curiosity. The early 2000s marked the start of a journey fueled by imagination and a desire to understand how things work.",
      year: "2000",
      category: "Origins",
      items: ["Discovery", "Imagination", "Explore"],
    },
    {
      title: "The Tech Gate",
      description:
        "A pivotal moment of discovery. Writing the first lines of code and realizing the power of creating software. The gate to the digital world opened wide.",
      year: "2013",
      category: "Tech Gate",
      items: ["Programming", "Hello World", "Passion"],
    },
    {
      title: "Academic Milestone",
      description:
        "Culmination of secondary education. The Baccalaureate marked the transition from general studies to focused technical expertise.",
      year: "2019",
      category: "Baccalaureate",
      items: ["Graduation", "Science", "University"],
    },
    {
      title: "Engineering Journey",
      description:
        "Intensive years of higher education. Earning the Bachelor's degree (EN) represented mastery of fundamental engineering principles and computer science concepts.",
      year: "2022",
      category: "Bachelor EN",
      items: ["Engineering", "Core CS", "Achieved"],
    },
    {
      title: "Web Development",
      description:
        "Specializing in the modern web. Mastering the ecosystem of tools and frameworks to build responsive, dynamic, and beautiful applications.",
      year: "2025",
      category: "Web Dev",
      items: ["Full Stack", "React & Node", "Creator"],
    },
    {
      title: "The Present",
      description:
        "Living the craft every day. Building meaningful solutions, collaborating with great minds, and constantly pushing the boundaries of what's possible on the web.",
      year: "Now",
      category: "Present",
      items: ["Building", "Future", "Impact"],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
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

        const isEven = index % 2 === 0;
        const xOffset = isEven ? -50 : 50;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          [content, year],
          { opacity: 0, x: xOffset },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        ).fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.6"
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
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
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 origin-top transform md:-translate-x-1/2"
          ></div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-32">
            {personalStory.map((story, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-start md:items-center justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Side */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0 timeline-content">
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
                    <div className="flex flex-wrap gap-2">
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
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-gray-100 dark:border-gray-900 transform -translate-x-1/2 md:-translate-x-1/2 mt-1.5 md:mt-0 z-10 timeline-dot shadow-lg"></div>

                {/* Year Side */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0 mt-2 md:mt-0 timeline-year">
                  <div
                    className={`text-5xl md:text-8xl font-bold text-gray-200 dark:text-gray-800 font-serif ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {story.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
