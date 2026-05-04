import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import ClickSpark from "./components/ui/ClickSpark";
import FloatingParticles from "./components/ui/FloatingParticles";
import "./i18n";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ErrorPage from "./pages/ErrorPage";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import GlobalCursor from "./components/common/GlobalCursor";

gsap.registerPlugin(ScrollTrigger);

const AppContent = () => {
  const { 
    sparksEnabled, 
    monochrome, 
    floatingParticles, 
    scanlines, 
    performanceMode, 
    smoothScroll 
  } = useSettings();

  useEffect(() => {
    // Conditional Lenis Scroll
    let lenis = null;
    
    if (smoothScroll && !performanceMode) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
    }

    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000);
        });
      }
    };
  }, [smoothScroll, performanceMode]);

  return (
    <div className={`
      min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300
      ${monochrome ? "monochrome" : ""}
      ${performanceMode ? "performance-mode" : ""}
    `}>
      {/* Global Overlays */}
      {floatingParticles && <FloatingParticles count={60} opacity={0.4} />}
      {scanlines && <div className="scanlines" />}
      
      <GlobalCursor />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      
      <Footer />
      
      {sparksEnabled && (
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
