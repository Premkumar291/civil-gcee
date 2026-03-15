"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2500); // 2.5 seconds duration

    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ 
             opacity: 0,
             y: -100,
             transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
           }}
           className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-dark"
        >
          {/* Animated Background Elements */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-accent rounded-full blur-[120px]"
          />

          <div className="relative text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-accent mb-6 rounded-full"
              />
              
              <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight mb-2 overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="inline-block"
                >
                  Welcome to
                </motion.span>
              </h2>
              
              <h1 className="text-accent text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter overflow-hidden">
                <motion.span
                   initial={{ y: "100%" }}
                   animate={{ y: 0 }}
                   transition={{ duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                   className="inline-block"
                >
                  Civil Engineering Association
                </motion.span>
              </h1>

              <div className="mt-8 flex items-center space-x-2">
                <motion.span 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]"
                >
                  Loading Excellence
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
