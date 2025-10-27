import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Database, Wrench, Star, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, skillCategories } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { t } = useTranslation("common");
  const sectionRef = useRef(null);
  const skillsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      // Animate section on scroll
      gsap.fromTo(
        section.querySelector(".skills-header"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate skill cards
      skillsRef.current.forEach((skill, index) => {
        if (skill) {
          gsap.fromTo(
            skill,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: skill,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      javascript: "🟨",
      react: "⚛️",
      typescript: "🔷",
      html: "🌐",
      css: "🎨",
      tailwind: "💨",
      nodejs: "🟢",
      express: "⚡",
      mongodb: "🍃",
      postgresql: "🐘",
      git: "📋",
      docker: "🐳",
      aws: "☁️",
      figma: "🎭",
      vscode: "💻",
      python: "🐍",
      java: "☕",
      php: "🐘",
    };
    return icons[iconName] || "💻";
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      frontend: <Code2 size={24} />,
      backend: <Database size={24} />,
      tools: <Wrench size={24} />,
    };
    return icons[categoryId] || <Code2 size={24} />;
  };

  const filteredSkills = (category) => {
    return skills.filter((skill) => skill.category === category);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 skills-header">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("skills.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Here are the technologies and tools I use to bring ideas to life
            </p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {skillCategories.map((category) => (
              <div key={category.id} className="skills-category">
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400">
                      {getCategoryIcon(category.id)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {t(`skills.categories.${category.id}`)}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredSkills(category.id).map((skill, index) => (
                    <div
                      key={skill.id}
                      ref={(el) => (skillsRef.current[index] = el)}
                      className="group relative bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Skill Icon */}
                      <div className="text-4xl mb-4 text-center">
                        {getIcon(skill.icon)}
                      </div>

                      {/* Skill Name */}
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-3">
                        {skill.name}
                      </h4>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${skill.color}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>

                      {/* Skill Level */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Level
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              <TrendingUp size={20} className="mr-2" />
              Always Learning New Technologies
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
