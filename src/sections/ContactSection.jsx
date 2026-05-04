import { useState, useEffect, useRef } from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Globe,
  Clock,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
    services: [],
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);

  const services = ["Branding", "UX/UI", "Animation", "3D Design", "Webflow"];
  const budgets = ["2K - 10K", "10K - 50K", "50K+"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for content blocks
      gsap.from(".animate-contact", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field, value) => {
    setFormData((prev) => {
      if (field === "services") {
        const services = prev.services.includes(value)
          ? prev.services.filter((s) => s !== value)
          : [...prev.services, value];
        return { ...prev, services };
      }
      return { ...prev, [field]: prev[field] === value ? "" : value };
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white dark:bg-[#0a0a0a]"
    >
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

      {/* STICKY SECTION: Ensures the positioning matches About2 and FAQ */}
      <section className="sticky top-0 h-screen w-full overflow-hidden font-sans text-gray-900 dark:text-white transition-colors duration-500 flex items-center">
        {/* Header Navigation */}
        <div className="absolute top-12 left-0 w-full px-8 md:px-16 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase z-50 text-black dark:text-white">
          <div className="flex flex-col leading-tight font-black font-serif text-lg">
            <span>BASE</span>
            <span>HOME</span>
          </div>
          <div className="hidden md:flex items-center gap-16">
            <span className="hover:opacity-50 cursor-pointer transition-opacity">
              MY PROJECTS
            </span>
            <span className="hover:opacity-50 cursor-pointer transition-opacity border-b border-black dark:border-white pb-1">
              GET IN TOUCH
            </span>
            <span className="hover:opacity-50 cursor-pointer transition-opacity">
              FAQ
            </span>
          </div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row px-8 md:px-16 relative z-10 items-start justify-between gap-12 lg:gap-24">
          {/* LEFT: Identity & Metadata (35%) */}
          <div className="animate-contact w-full lg:w-[35%] flex flex-col justify-between min-h-[60vh]">
            <div>
              <span className="text-[10px] font-black tracking-[0.3em] text-stone-400 dark:text-stone-500 uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-stone-300 dark:bg-stone-700"></span>
                Inquiry Hub
              </span>

              <h2 className="text-6xl md:text-8xl font-black font-sans leading-[0.85] tracking-tighter text-stone-900 dark:text-white mb-10">
                WANT TO <br /> <span className="outline-text">CONNECT?</span>
              </h2>

              <div className="space-y-8 mb-12">
                <div className="group">
                  <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase block mb-2">
                    Primary Email
                  </span>
                  <a
                    href="mailto:harkreadly@gmail.com"
                    className="flex items-center gap-3 text-xl md:text-2xl font-bold hover:text-stone-500 transition-colors"
                  >
                    HARKREADLY@GMAIL.COM{" "}
                    <ArrowUpRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-stone-200 dark:border-stone-800">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase block mb-2 flex items-center gap-2">
                      <Globe size={10} /> Location
                    </span>
                    <p className="text-sm font-bold tracking-tight">
                      Remote / EU
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase block mb-2 flex items-center gap-2">
                      <Clock size={10} /> Local Time
                    </span>
                    <p className="text-sm font-bold tracking-tight">11:28 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-stone-400 dark:text-stone-500 text-[11px] leading-loose max-w-xs mb-4">
                Strategically designing brands and websites that bridge the gap
                between educational instruction and high-end digital
                experiences.
              </p>
              <p className="font-black text-stone-900 dark:text-stone-200 text-[10px] tracking-[0.2em] uppercase">
                © HAR KREADLY — 2026
              </p>
            </div>
          </div>

          {/* RIGHT: The Form with Budget (60%) */}
          <div className="animate-contact w-full lg:w-[60%] bg-stone-50 dark:bg-[#111] p-8 md:p-14 rounded-[3rem] border border-stone-200/50 dark:border-stone-800/50">
            <form className="space-y-10">
              {/* Service Selection */}
              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  I'm looking for...
                </span>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleToggle("services", s)}
                      className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-500 border ${
                        formData.services.includes(s)
                          ? "bg-black text-white border-black dark:bg-white dark:text-black"
                          : "bg-transparent text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* BUDGET SELECTION (Restored) */}
              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  Your Budget
                </span>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleToggle("budget", b)}
                      className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-500 border ${
                        formData.budget === b
                          ? "bg-black text-white border-black dark:bg-white dark:text-black"
                          : "bg-transparent text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-400"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="YOUR NAME"
                  className="w-full bg-transparent border-b border-stone-200 dark:border-stone-800 py-4 text-sm font-bold tracking-[0.2em] placeholder-stone-300 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors uppercase"
                />
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-transparent border-b border-stone-200 dark:border-stone-800 py-4 text-sm font-bold tracking-[0.2em] placeholder-stone-300 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors uppercase"
                />
              </div>

              <textarea
                name="projectDetails"
                onChange={handleInputChange}
                placeholder="TELL US ABOUT THE PROJECT..."
                rows={1}
                className="w-full bg-transparent border-b border-stone-200 dark:border-stone-800 py-4 text-sm font-bold tracking-[0.2em] placeholder-stone-300 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors resize-none uppercase"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-between py-6 px-10 rounded-full bg-black dark:bg-white text-white dark:text-black transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-50"
              >
                <span className="text-xs font-black tracking-[0.4em] uppercase">
                  {isSubmitting ? "SENDING..." : "SUBMIT REQUEST"}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
