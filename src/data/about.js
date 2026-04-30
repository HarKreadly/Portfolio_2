import image1 from "../assets/image_1.jpg";
import image2 from "../assets/image_2.jpg";
import image3 from "../assets/image_3.jpg";
import corrupted from "../assets/corrupted_grace.jpg";
import developing from "../assets/Developing.png";

export const personalStory = [
  {
    title: "The Beginning",
    description:
      "Born with an insatiable curiosity. The early 2000s marked the start of a journey fueled by imagination and a desire to understand how things work.",
    year: "2000",
    category: "Origins",
    items: ["Discovery", "Imagination", "Explore"],
    images: [image1, image2, image3],
  },
  {
    title: "The Tech Gate",
    description:
      "A pivotal moment of discovery. Writing the first lines of code and realizing the power of creating software. The gate to the digital world opened wide.",
    year: "2013",
    category: "Tech Gate",
    items: ["Programming", "Hello World", "Passion"],
    images: [image3, corrupted, image1],
  },
  {
    title: "Academic Milestone",
    description:
      "Culmination of secondary education. The Baccalaureate marked the transition from general studies to focused technical expertise.",
    year: "2019",
    category: "Baccalaureate",
    items: ["Graduation", "Science", "University"],
    images: [image2, image1, corrupted],
  },
  {
    title: "Engineering Journey",
    description:
      "Intensive years of higher education. Earning the Bachelor's degree (EN) represented mastery of fundamental engineering principles and computer science concepts.",
    year: "2022",
    category: "Bachelor EN",
    items: ["Engineering", "Core CS", "Achieved"],
    images: [corrupted, image3, image2],
  },
  {
    title: "Web Development",
    description:
      "Specializing in the modern web. Mastering the ecosystem of tools and frameworks to build responsive, dynamic, and beautiful applications.",
    year: "2025",
    category: "Web Dev",
    items: ["Full Stack", "React & Node", "Creator"],
    images: [image1, corrupted, image3],
  },
  {
    title: "The Present",
    description:
      "Living the craft every day. Building meaningful solutions, collaborating with great minds, and constantly pushing the boundaries of what's possible on the web.",
    year: "Now",
    category: "Present",
    items: ["Building", "Future", "Impact"],
    images: [developing],
  },
];