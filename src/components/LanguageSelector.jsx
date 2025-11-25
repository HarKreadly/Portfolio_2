import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTranslate } from "react-icons/hi";
import { MdOutlineTranslate } from "react-icons/md";



const LanguageSelector = () => {
  const { i18n, t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "EN" },
    { code: "es", name: "ES" },
    { code: "fr", name: "FR" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Prevent scrolling when modal is open
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Select language"
      >
        <MdOutlineTranslate size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md px-6">
              <div className="col-span-3 text-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-widest uppercase">
                  Select Language
                </h2>
              </div>
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`flex items-center justify-center py-6 rounded-none border transition-all duration-300 ${
                    i18n.language === language.code
                      ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className="text-xl font-bold tracking-widest">
                    {language.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSelector;
