import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Calendar, Code2 } from 'lucide-react';
import {
  FaReact,
  FaNodeJs,
  FaStripe,
  FaChartBar,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiFirebase,
  SiTailwindcss,
  SiFramer,
  SiCss3,
  SiGreensock,
  SiI18Next,
  SiSocketdotio,
  SiMui,
  SiChartdotjs,
} from "react-icons/si";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation('common');
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      // Initial state
      gsap.set(card, { opacity: 0, y: 50 });

      // Animate on scroll
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, [index]);

  const getTechIcon = (techName) => {
    const name = techName.toLowerCase();
    if (name.includes('react')) return <FaReact className="text-blue-400" />;
    if (name.includes('node')) return <FaNodeJs className="text-green-500" />;
    if (name.includes('mongo')) return <SiMongodb className="text-green-500" />;
    if (name.includes('express')) return <SiExpress className="text-gray-500 dark:text-white" />;
    if (name.includes('stripe')) return <FaStripe className="text-indigo-500" />;
    if (name.includes('firebase')) return <SiFirebase className="text-yellow-500" />;
    if (name.includes('tailwind')) return <SiTailwindcss className="text-cyan-400" />;
    if (name.includes('framer')) return <SiFramer className="text-purple-500" />;
    if (name.includes('chart')) return <SiChartdotjs className="text-orange-400" />;
    if (name.includes('css')) return <SiCss3 className="text-blue-500" />;
    if (name.includes('gsap')) return <SiGreensock className="text-green-500" />;
    if (name.includes('i18n')) return <SiI18Next className="text-teal-500" />;
    if (name.includes('socket')) return <SiSocketdotio className="text-gray-500 dark:text-white" />;
    if (name.includes('material')) return <SiMui className="text-blue-500" />;
    
    return <Code2 size={14} className="text-gray-500" />;
  };

  return (
    <div ref={cardRef} className="h-full">
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        scale={1.02}
        transitionSpeed={1000}
        className="h-full"
      >
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                Featured
              </span>
            </div>
          )}

          {/* Project Image */}
          <div className="relative h-48 overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Overlay Links */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg"
                aria-label="View Demo"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-900 text-white rounded-full hover:scale-110 transition-transform duration-300 shadow-lg"
                aria-label="View Code"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 flex items-center">
                <Calendar size={12} className="mr-1" />
                {project.year}
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-grow">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-600"
                >
                  <span className="mr-1.5 text-base">{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex gap-3 mt-auto">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                {t('projects.viewProject')}
                <ExternalLink size={16} className="ml-2" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium rounded-lg transition-colors duration-300"
              >
                {t('projects.viewCode')}
                <Github size={16} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-300 pointer-events-none"></div>
        </div>
      </Tilt>
    </div>
  );
};

export default ProjectCard;
