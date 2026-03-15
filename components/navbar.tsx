"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Info, GraduationCap, Microscope, Users, LineChart, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: Info },
    { name: "Programs", href: "#programs", icon: GraduationCap },
    { name: "Laboratories", href: "#facilities", icon: Microscope },
    { name: "Faculty", href: "#faculty", icon: Users },
    { name: "Activities", href: "#activities", icon: LineChart },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const navHeight = 64; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 sticky-top shadow-sm bg-primary-dark w-full transition-all">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16 lg:h-auto lg:py-3">
          
          {/* Mobile Brand (hidden on lg+) */}
          <button 
            onClick={(e) => scrollToSection(e, 'home')}
            className="lg:hidden text-white font-bold text-xl tracking-wide bg-transparent border-0 cursor-pointer"
          >
            GCEE Civil
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white border-0 transition-colors focus:outline-none bg-transparent"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex w-full justify-center">
            <ul className="flex items-center space-x-2 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex items-center text-white/80 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 group bg-transparent border-0 cursor-pointer"
                  >
                    <link.icon className="w-4 h-4 mr-2 group-hover:text-accent transition-colors" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col space-y-1 font-medium bg-primary-dark/95 rounded-b-lg">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={(e) => {
                      scrollToSection(e, link.href);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-md transition-colors bg-transparent border-0 text-left cursor-pointer"
                  >
                    <link.icon className="w-5 h-5 mr-3 text-accent" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
