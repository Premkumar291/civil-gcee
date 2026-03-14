import React from "react";
import Link from "next/link";
import { Building2, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark pt-16 text-white text-sm">
      <div className="container mx-auto px-4 max-w-7xl pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Address */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <div className="flex items-center mb-6">
              <Building2 className="w-8 h-8 text-accent mr-3" />
              <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                GCE Erode
              </h4>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              Government College of Engineering, Erode imparts training to
              civil engineering students using the latest curriculum and modern pedagogical tools.
            </p>
            <ul className="text-white/60 space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-1" />
                <span>Government College of Engineering, Erode, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h5 className="font-bold text-lg mb-6 pb-2 border-b border-white/20 inline-block">
              Quick Links
            </h5>
            <ul className="space-y-4">
              {['Home', 'About Dept', 'Programs', 'Facilities', 'Faculty'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '-')}`} className="flex items-center text-white/60 hover:text-accent transition-colors duration-200 group">
                    <ChevronRight className="w-4 h-4 mr-2 text-accent transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Students Links */}
          <div className="lg:col-span-3">
            <h5 className="font-bold text-lg mb-6 pb-2 border-b border-white/20 inline-block">
              Students
            </h5>
            <ul className="space-y-4">
              {['Placements', 'Student Projects', 'Research', 'Symposiums'].map((link) => (
                <li key={link}>
                  <Link href="/students" className="flex items-center text-white/60 hover:text-accent transition-colors duration-200 group">
                    <ChevronRight className="w-4 h-4 mr-2 text-accent transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources Links */}
          <div className="lg:col-span-3">
            <h5 className="font-bold text-lg mb-6 pb-2 border-b border-white/20 inline-block">
              Resources
            </h5>
            <ul className="space-y-4">
              {['Department Library', 'Downloads', 'Notice Board', 'Curriculum'].map((link) => (
                <li key={link}>
                  <Link href="/resources" className="flex items-center text-white/60 hover:text-accent transition-colors duration-200 group">
                    <ChevronRight className="w-4 h-4 mr-2 text-accent transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bottom */}
      <div className="bg-[#051c35] py-5 border-t border-white/10 mt-4">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-white/40 text-xs tracking-wider m-0">
            &copy; 2023-27 batch Civil Engineering Department | Government College of Engineering, Erode.
          </p>
        </div>
      </div>
    </footer>
  );
}
