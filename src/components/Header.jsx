import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Theme and Language Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center space-x-3">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
