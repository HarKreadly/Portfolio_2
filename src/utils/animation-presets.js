import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation Presets for the Portfolio
 * Reusable GSAP animation functions
 */

// Fade in from bottom animation
export const fadeInUp = (element, options = {}) => {
  const {
    duration = 0.8,
    delay = 0,
    y = 50,
    opacity = 0,
    stagger = 0,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(element,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger
    }
  );
};

// Fade in from left animation
export const fadeInLeft = (element, options = {}) => {
  const {
    duration = 0.8,
    delay = 0,
    x = -50,
    opacity = 0,
    stagger = 0,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(element,
    { opacity, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger
    }
  );
};

// Fade in from right animation
export const fadeInRight = (element, options = {}) => {
  const {
    duration = 0.8,
    delay = 0,
    x = 50,
    opacity = 0,
    stagger = 0,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(element,
    { opacity, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger
    }
  );
};

// Scale in animation
export const scaleIn = (element, options = {}) => {
  const {
    duration = 0.6,
    delay = 0,
    scale = 0.8,
    opacity = 0,
    stagger = 0,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(element,
    { opacity, scale },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: "back.out(1.7)",
      scrollTrigger
    }
  );
};

// Stagger animation for lists
export const staggerChildren = (elements, options = {}) => {
  const {
    duration = 0.6,
    stagger = 0.1,
    delay = 0,
    y = 30,
    opacity = 0,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(elements,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger
    }
  );
};

// Counter animation
export const animateCounter = (element, options = {}) => {
  const {
    duration = 2,
    delay = 0,
    endValue = 100,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(element,
    { innerText: 0 },
    {
      innerText: endValue,
      duration,
      delay,
      ease: "power2.out",
      snap: { innerText: 1 },
      scrollTrigger
    }
  );
};

// Hover animations
export const addHoverEffect = (element, options = {}) => {
  const {
    scale = 1.05,
    duration = 0.3,
    y = -5
  } = options;

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      y,
      duration,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration,
      ease: "power2.out"
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Scroll-triggered section animation
export const animateSection = (section, options = {}) => {
  const {
    trigger = section,
    start = "top 80%",
    end = "bottom 20%",
    toggleActions = "play none none reverse"
  } = options;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    toggleActions,
    animation: gsap.fromTo(section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    )
  });
};

// Parallax effect
export const addParallax = (element, options = {}) => {
  const {
    speed = 0.5,
    trigger = element
  } = options;

  return gsap.fromTo(element,
    { y: -100 * speed },
    {
      y: 100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
};

// Text reveal animation
export const revealText = (element, options = {}) => {
  const {
    duration = 1,
    delay = 0,
    stagger = 0.05,
    scrollTrigger = null
  } = options;

  return gsap.fromTo(element.querySelectorAll('span, .char'),
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger
    }
  );
};

// Button hover effect
export const buttonHoverEffect = (button) => {
  const handleMouseEnter = () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  button.addEventListener('mouseenter', handleMouseEnter);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mouseenter', handleMouseEnter);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};
