import About from '../components/About';
import HeroSection from '../components/HeroSection';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Contact2 from '../components/Contact2';

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
