"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative flex items-center min-h-[500px] md:min-h-[600px] bg-[radial-gradient(circle_at_center,_#205295_0%,_#0A2647_100%)] overflow-hidden"
    >
      {/* Light glow overlay for premium look */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent z-0"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center text-white">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-accent text-primary-dark px-4 py-2 font-bold mb-4 rounded-full uppercase tracking-wider text-sm shadow-md"
        >
          Welcome to GCEE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight"
        >
          Civil Engineering Association
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/80 font-bold text-lg md:text-xl uppercase tracking-[0.2em] mb-4"
        >
          Department of Civil Engineering
        </motion.h2>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-accent drop-shadow-md"
        >
          Designing the Infrastructure of Tomorrow
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg mb-10 mx-auto max-w-3xl drop-shadow-md text-white/90 leading-relaxed"
        >
          Civil Engineering plays a vital role in infrastructure development. Skilled civil engineers analyze,
          design, and execute structural works that support modern society and sustainable development.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={() => scrollToSection('about')}
            className="inline-flex items-center justify-center bg-accent text-primary-dark hover:bg-white px-8 py-3.5 font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-0 cursor-pointer"
          >
            Explore Department
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection('facilities')}
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-dark px-8 py-3.5 font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Our Facilities
          </button>
        </motion.div>
      </div>
    </section>
  );
}
