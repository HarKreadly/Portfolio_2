import About from '../components/sections/About';
import HeroSection from '../components/sections/HeroSection';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <About />
        <Skills />
        <Projects />
        <Contact />
        {/* <Contact2 /> */}
      </main>
    </div>
  );
};

export default Home;
