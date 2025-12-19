import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Github,
  Dribbble,
  Check,
  ArrowRight,
  Send
} from "lucide-react";
import { useTheme } from "next-themes";
import TextPressure from "./ui/TextPressure";

const Contact2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    services: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  
  const services = [
    "Website design",
    "Content creation",
    "UX design",
    "Strategy & consulting",
    "User research",
    "Other",
  ];

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
    <div className="relative w-full min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden font-serif transition-colors duration-1000 flex items-center">
      
      {/* Layer 1: Blur Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-[50px] bg-white/40 dark:bg-black/40 transition-colors duration-500"></div>

      {/* Layer 2: Dark Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] pointer-events-none transition-all duration-500"></div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 md:px-8 lg:px-16 py-20">
        
        {/* Left Column: Title & Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-4">
              Get in Touch
            </h3>
            <div className="h-[120px] md:h-[160px] w-full -ml-2">
               <TextPressure
                  text="CONTACT"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor={theme === 'dark' ? "#ffffff" : "#111827"}
                  minFontSize={36}
                />
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-6 max-w-md font-sans leading-relaxed">
              Have a project in mind? Let's build something extraordinary together.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start gap-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold mb-1">Chat to us</h4>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-1">Our friendly team is here to help.</p>
                <a href="mailto:hi@untitledui.com" className="font-sans font-bold hover:text-[#B8FF48] transition-colors">hi@untitledui.com</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start gap-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold mb-1">Visit us</h4>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-1">Come say hello at our office HQ.</p>
                <p className="font-sans font-bold">100 Smith Street, Collingwood VIC 3066</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-start gap-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold mb-1">Call us</h4>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+15550000000" className="font-sans font-bold hover:text-[#B8FF48] transition-colors">+1 (555) 000-0000</a>
              </div>
            </motion.div>
          </div>

          <div className="flex gap-6 mt-12">
            {[Twitter, Linkedin, Github, Dribbble].map((Icon, idx) => (
              <a key={idx} href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8FF48] opacity-10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-4 text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#B8FF48] transition-colors font-sans"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-4 text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#B8FF48] transition-colors font-sans"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">How can we help?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                          formData.services.includes(service) 
                            ? "bg-[#B8FF48] border-[#B8FF48]" 
                            : "border-gray-400 dark:border-gray-600 group-hover:border-[#B8FF48]"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleServiceToggle(service);
                        }}
                      >
                        {formData.services.includes(service) && <Check size={14} className="text-black" />}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-sans group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us a little about the project..."
                  rows={3}
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-4 text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#B8FF48] transition-colors resize-none font-sans"
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full md:w-auto px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs overflow-hidden rounded-lg hover:shadow-lg hover:shadow-[#B8FF48]/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </span>
                  <div className="absolute inset-0 bg-[#B8FF48] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {isSubmitting ? "Sending..." : "Send Message"}
                     {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact2;
