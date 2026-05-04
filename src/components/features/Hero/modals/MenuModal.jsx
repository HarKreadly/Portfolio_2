import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Instagram, Github, ArrowRight, CornerDownRight, Square } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/", sub: "System Root" },
  { name: "About", path: "/about", sub: "User Profile" },
  { name: "Skills", path: "/skills", sub: "Capabilities" },
  { name: "Projects", path: "/projects", sub: "Archive" },
  { name: "Settings", path: "/settings", sub: "System" },
  { name: "Contact", path: "/contact", sub: "Connection" },
];

const MenuModal = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 0% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2
      }
    },
    open: (i) => ({
      clipPath: "circle(150% at 0% 0%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2,
        delay: i * 0.08,
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Pie Slices */}
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`menu-slice-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute inset-0 pointer-events-none ${
                i === 0 ? "bg-[#0a0a0b]" : 
                i === 1 ? "bg-[#111112]" : 
                "bg-[#161618]"
              } ${i === 0 ? "z-[101]" : i === 1 ? "z-[102]" : "z-[103]"}`}
            />
          ))}

          {/* Content Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="relative z-[110] w-full h-full flex flex-col p-6 lg:p-12 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start w-full">
               <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="flex flex-col gap-1.5"
               >
                  <div className="flex items-center gap-2">
                    <Square size={10} className="text-white fill-white" />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">Main Menu</span>
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-600">Access Restricted // Authentication Required</span>
               </motion.div>
               <button
                  onClick={onClose}
                  className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all border border-white/10 group shadow-lg"
               >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
               </button>
            </div>

            {/* Compact Navigation List */}
            <nav className="flex-1 flex flex-col justify-center gap-3 max-w-sm w-full mx-auto">
              {menuItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.4 + (i * 0.05), type: "spring" }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`
                        relative group flex items-center justify-between p-5 rounded-2xl border transition-all duration-500
                        ${isActive 
                          ? "bg-white text-black border-white shadow-[0_10px_40px_rgba(255,255,255,0.15)]" 
                          : "bg-white/5 text-white border-white/5 hover:bg-white/10 hover:border-white/20"
                        }
                      `}
                    >
                      <div className="flex items-center gap-5">
                        <span className={`text-[10px] font-black tracking-tighter ${isActive ? "opacity-30" : "opacity-15"}`}>0{i + 1}</span>
                        <div className="flex flex-col">
                          <span className="text-lg font-black tracking-tighter uppercase leading-none">{item.name}</span>
                          <span className={`text-[9px] font-bold tracking-[0.2em] uppercase mt-1 ${isActive ? "opacity-60" : "opacity-30"}`}>
                            {item.sub}
                          </span>
                        </div>
                      </div>

                      <div className={`transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                        <ArrowRight size={16} />
                      </div>

                      {/* Active Indicator Bar */}
                      {isActive && (
                        <motion.div 
                          layoutId="active-menu-indicator"
                          className="absolute -right-1 top-4 bottom-4 w-1 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Refined Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-white/10">
               <div className="flex gap-10">
                  {[Linkedin, Instagram, Github].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.25 }}
                      whileHover={{ opacity: 1, scale: 1.1, y: -2 }}
                      className="text-white transition-all"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
               </div>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.4 }}
                 className="flex flex-col items-end gap-1"
               >
                  <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.4em] uppercase text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    System Status: Active
                  </div>
                  <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                    © HarKreadly 2026 // Distributed Profile
                  </span>
               </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
