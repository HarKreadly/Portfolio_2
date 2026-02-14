import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineTranslate } from "react-icons/md";

const languages = [
  { code: "en", name: "EN" },
  { code: "es", name: "ES" },
  { code: "fr", name: "FR" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-3 items-center cursor-pointer group"
        role="button"
        tabIndex={0}
        aria-label="Open language selector"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
      >
        <span className="text-gray-900 hidden dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
          Translate
        </span>
        <div className="p-2 rounded-full bg-gray-200 dark:bg-white/20 group-hover:bg-gray-300 dark:group-hover:bg-white/30 transition-colors">
          <MdOutlineTranslate
            size={20}
            className="text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Close language selector"
              >
                <X size={32} />
              </button>

              <div className="space-y-12">
                {/* Title */}
                <h3 className="text-sm uppercase tracking-[0.3em] text-center text-gray-500 font-sans">
                  Select Language
                </h3>

                {/* Language Buttons */}
                <div className="flex flex-col gap-6 min-w-[300px] sm:min-w-[400px]">
                  {languages.map((language) => (
                    <motion.button
                      key={language.code}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`group flex items-center justify-center gap-4 px-8 py-6 backdrop-blur-sm rounded-md transition-all duration-300 ${
                        i18n.language === language.code
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                          : "bg-gray-200/80 dark:bg-white/20 hover:bg-gray-300/80 dark:hover:bg-white/30"
                      }`}
                    >
                      <span
                        className={`font-sans uppercase text-xs font-bold tracking-widest ${
                          i18n.language === language.code
                            ? "text-white dark:text-gray-900"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {language.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSelector;
