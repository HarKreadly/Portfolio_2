import img1 from "../assets/image_1.jpg";
import img2 from "../assets/image_2.jpg";
import img3 from "../assets/image_3.jpg";
import img4 from "../assets/image_4.jpg";
import img5 from "../assets/corrupted_grace.jpg";
import img6 from "../assets/Developing.png";

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.",
    image: img1,
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    category: "web",
    featured: true,
    demoUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    year: "2024"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application built with React and Firebase. Real-time updates, drag-and-drop functionality, team collaboration, and progress tracking.",
    image: img2,
    technologies: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    category: "web",
    featured: true,
    demoUrl: "https://example-taskmanager.com",
    githubUrl: "https://github.com/username/task-manager",
    year: "2024"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that displays current weather and forecasts for multiple cities. Features geolocation, weather alerts, and beautiful data visualizations.",
    image: img3,
    technologies: ["React", "Weather API", "Chart.js", "CSS3"],
    category: "web",
    featured: false,
    demoUrl: "https://example-weather.com",
    githubUrl: "https://github.com/username/weather-dashboard",
    year: "2023"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing projects and skills. Built with React, TailwindCSS, and GSAP animations. Features dark mode and internationalization.",
    image: img4,
    technologies: ["React", "TailwindCSS", "GSAP", "i18next"],
    category: "web",
    featured: false,
    demoUrl: "https://example-portfolio.com",
    githubUrl: "https://github.com/username/portfolio",
    year: "2024"
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Real-time chat application with React and Socket.io. Features private messaging, group chats, file sharing, and emoji reactions. Mobile-responsive design.",
    image: img5,
    technologies: ["React", "Socket.io", "Node.js", "Express"],
    category: "web",
    featured: true,
    demoUrl: "https://example-chat.com",
    githubUrl: "https://github.com/username/chat-app",
    year: "2023"
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "A recipe discovery app that helps users find recipes based on ingredients they have. Features ingredient search, nutritional information, and meal planning.",
    image: img6,
    technologies: ["React", "Spoonacular API", "Material-UI"],
    category: "web",
    featured: false,
    demoUrl: "https://example-recipes.com",
    githubUrl: "https://github.com/username/recipe-finder",
    year: "2023"
  }
];

export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Apps" },
  { id: "mobile", name: "Mobile Apps" }
];
