import { Github, Linkedin, Mail, Heart, Instagram, Twitter } from "lucide-react";
import { SiArtstation } from "react-icons/si";
import image2 from "../assets/image_2.jpg";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-gray-50 dark:bg-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 py-20 font-serif transition-colors duration-1000">
      {/* Layer 0: Background Image - Colorful & Visible */}
      <div className="absolute inset-0 z-0">
        <img
          src={image2}
          alt="Footer Background"
          className="w-full h-full object-cover opacity-20 dark:opacity-30"
        />
      </div>

      {/* Layer 1: Blur Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-[30px] bg-white/10 dark:bg-black/60 transition-colors duration-500"></div>

      {/* Layer 2: Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)] pointer-events-none transition-all duration-500"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-6">
            <span className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">
              Har Kreadly
            </span>
            <p className="text-sm font-sans leading-relaxed text-gray-600 dark:text-gray-300 max-w-xs">
              A creative developer focused on building immersive digital experiences that merge art and technology.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {["Home", "Portfolio", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Projects */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Projects</h4>
            <nav className="flex flex-col gap-4">
              {["E-Commerce", "Portfolio v1", "Dashboard", "Mobile App"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Social & Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Connect</h4>
            <div className="flex gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:opacity-50 transition-opacity"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:opacity-50 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-900 dark:text-white hover:opacity-50 transition-opacity"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:opacity-50 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:opacity-50 transition-opacity"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Based in Digital Space <br />
              Available for freelance
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans uppercase tracking-widest text-gray-500 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Har Kreadly. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart size={12} className="text-gray-900 dark:text-white mx-2" fill="currentColor" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
