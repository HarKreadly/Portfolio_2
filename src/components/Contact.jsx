import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
    services: [],
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);

  const services = [
    "Branding",
    "UX/UI",
    "Animation",
    "3D Design",
    "Identify",
    "Webflow",
  ];

  const budgets = ["2K - 10K", "10K - 50K", "More than 50K"];

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      // Animate elements on scroll
      const elements = section.querySelectorAll(".animate-up");
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
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

  const handleBudgetSelect = (budget) => {
    setFormData((prev) => ({
      ...prev,
      budget: prev.budget === budget ? "" : budget,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      projectDetails: "",
      services: [],
      budget: "",
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full bg-white dark:bg-gray-900 py-20 lg:py-32 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column - Contact Info */}
        <div className="lg:w-1/3 flex flex-col justify-between animate-up">
          <div>
            <h4 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-8">
              Contacts
            </h4>
            <a
              href="mailto:hey@mattered.com"
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white hover:opacity-70 transition-opacity block mb-12"
            >
              HEY@MATTERED.COM
            </a>

            <div className="mb-12">
              <h4 className="text-gray-500 mb-6">Follow</h4>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              We strategically design beautiful brands, websites, and digital
              products that actually work. Creating a product that connects with
              your target group is essential for success, and we know how to do
              it.
            </p>
            <p className="font-bold text-gray-900 dark:text-white text-sm">
              © MATTERED 2022
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:w-2/3 animate-up">
          <div className="mb-12">
            <h4 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">
              Hire Us
            </h4>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.9] tracking-tight mb-12">
              A PROJECT WITH
              <br />
              MATTERED?
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Services */}
            <div className="space-y-4">
              <label className="block text-gray-500 text-lg">Services</label>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.services.includes(service)
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <label className="block text-gray-500 text-lg">Your Budget</label>
              <div className="flex flex-wrap gap-3">
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => handleBudgetSelect(budget)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.budget === budget
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="block text-gray-500 text-lg">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Mohammad Reza"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-4 text-xl text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-500 text-lg">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-4 text-xl text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-500 text-lg">
                Project Details ( Optional )
              </label>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleInputChange}
                placeholder="A Very cool Animation..."
                rows={1}
                className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-4 text-xl text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-8 w-full">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg flex items-center justify-center hover:opacity-80 transition-opacity duration-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
