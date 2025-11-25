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
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-3 items-center cursor-pointer group"
      >
        <span className="text-gray-900 hidden dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
          Translate
        </span>
        <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
          <MdOutlineTranslate size={20} className="text-gray-900 dark:text-white" />
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
              >
                <X size={32} />
              </button>

              <div className="space-y-12">
                {/* Title */}
                <h3 className="text-sm uppercase tracking-[0.3em] text-center text-gray-500 font-sans">
                  Select Language
                </h3>

                {/* Language Buttons */}
                <div className="flex flex-col gap-6 min-w-[400px]">
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
                          : "bg-gray-100/50 dark:bg-white/10 hover:bg-gray-200/50 dark:hover:bg-white/20"
                      }`}
                    >
                      <span className={`font-sans uppercase text-xs font-bold tracking-widest ${
                        i18n.language === language.code
                          ? "text-white dark:text-gray-900"
                          : "text-gray-900 dark:text-white"
                      }`}>
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
