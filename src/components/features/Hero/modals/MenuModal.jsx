import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Instagram, Github } from "lucide-react";

const MenuModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="space-y-12">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-8 text-center">
                {["Home", "Portfolio", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="w-64 h-[1px] bg-gray-200 dark:bg-gray-800 mx-auto"></div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-8 mt-12">
                <a
                  href="#"
                  className="p-4 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-900 dark:text-white"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
