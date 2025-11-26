import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ClickSpark from "./components/ui/ClickSpark";
import "./i18n";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
