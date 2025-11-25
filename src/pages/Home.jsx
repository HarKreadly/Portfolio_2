import HeroSection from '../components/HeroSection';
import About from '../components/About';
import ThirdHeroSection from '../components/ThirdHeroSection';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* <HeroSection /> */}
        <ThirdHeroSection />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
