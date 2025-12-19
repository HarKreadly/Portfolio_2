import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Github,
  Dribbble,
  Check,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact2 = () => {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    services: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    "Website design",
    "Content creation",
    "UX design",
    "Strategy & consulting",
    "User research",
    "Other",
  ];

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      gsap.fromTo(
        section.querySelector(".contact-container"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const newServices = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: newServices };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "", services: [] });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full bg-white dark:bg-gray-900"
    >
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
          
          {/* Left Column - Contact Info */}
          <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-white dark:bg-gray-900">
            <div className="pt-12 lg:pt-20">
              <div className="mb-12">
                <h3 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-gray-900 dark:text-white leading-none">
                  Get in<br />touch
                </h3>
              </div>

              <div className="space-y-6 max-w-md">
                <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-6 h-6 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-1">Chat to us</h4>
                      <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">Our friendly team is here to help.</p>
                      <a href="mailto:hi@untitledui.com" className="font-sans text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">hi@untitledui.com</a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-1">Visit us</h4>
                      <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">Come say hello at our office HQ.</p>
                      <p className="font-sans text-base font-bold text-gray-900 dark:text-white leading-relaxed">100 Smith Street<br/>Collingwood VIC 3066 AU</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-1">Call us</h4>
                      <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">Mon-Fri from 8am to 5pm.</p>
                      <a href="tel:+15550000000" className="font-sans text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+1 (555) 000-0000</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 pb-8 lg:pb-0">
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Github size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Dribbble size={24} /></a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-1/2 p-4 lg:p-8 flex">
            <div className="flex-1 bg-[#B8FF48] rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden flex flex-col justify-center">
            {/* Decorative circles */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full border-[30px] border-[#a3e635]/30 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[0.9] tracking-tight">
                Got ideas? We've got the skills. Let's team up.
              </h2>
              <p className="text-gray-800 text-lg mb-8">
                Tell us more about yourself and what you've got in mind.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-gray-900/20 py-3 text-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-b border-gray-900/20 py-3 text-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us a little about the project..."
                    rows={1}
                    className="w-full bg-transparent border-b border-gray-900/20 py-3 text-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-3">How can we help?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label key={service} className="flex items-center gap-3 cursor-pointer group">
                        <div 
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            formData.services.includes(service) 
                              ? "bg-gray-900 border-gray-900" 
                              : "border-gray-900/30 group-hover:border-gray-900"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleServiceToggle(service);
                          }}
                        >
                          {formData.services.includes(service) && <Check size={14} className="text-[#B8FF48]" />}
                        </div>
                        <span className="text-gray-800 text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 mt-6 text-lg"
                >
                  {isSubmitting ? "Sending..." : "Let's get started!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact2;
