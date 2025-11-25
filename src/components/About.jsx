import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Download, Users, Code, Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation("common");
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      // Animate section on scroll
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

      // Animate stats
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const number = stat.querySelector(".stat-number");
          const finalValue = stat.dataset.value;

          gsap.fromTo(
            number,
            { innerText: 0 },
            {
              innerText: finalValue,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, []);

  const stats = [
    { icon: Code, value: 50, label: t("about.stats.projects"), suffix: "+" },
    { icon: Users, value: 25, label: t("about.stats.clients"), suffix: "+" },
    { icon: Award, value: 3, label: t("about.stats.years"), suffix: "+" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("about.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Passionate About Creating Digital Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                With a strong background in full-stack development, I specialize
                in creating modern, scalable web applications that deliver
                exceptional user experiences. My expertise spans across the
                entire development lifecycle, from concept to deployment.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe in writing clean, maintainable code and staying
                up-to-date with the latest technologies and best practices.
                Every project is an opportunity to learn something new and push
                the boundaries of what's possible.
              </p>

              {/* Resume Download */}
              <div className="pt-4 flex gap-3">
                <a
                  href="/cv_en.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Download size={20} className="mr-2" />
                  CV (EN)
                </a>
                <a
                  href="/cv_de.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Download size={20} className="mr-2" />
                  CV (DE)
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="relative mx-auto w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                <img
                  src="/assets/headshot.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                <span className="text-2xl">⚛️</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                ref={(el) => (statsRef.current[index] = el)}
                data-value={stat.value}
                className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  <span className="stat-number">0</span>
                  {stat.suffix}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
