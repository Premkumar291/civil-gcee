import React from "react";
import Image from "next/image";
import gov from "../assets/images/Govt_Logo.jpeg";
import gcee from "../assets/images/logo_clg_black.png";

export default function HeaderBanner() {
  return (
    <header className="w-full bg-white py-3 border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl flex flex-wrap justify-between items-center text-center md:text-left">
        {/* Left Logo (hidden on mobile, visible on md+) */}
        <div className="hidden md:flex items-center" style={{ height: "80px", width: "80px", position: "relative" }}>
          <Image
            src={gcee}
            alt="College Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Center Text content */}
        <div className="flex-grow text-center px-3">
          <h1 className="mb-1 text-[#0a325e] font-bold text-xl md:text-2xl lg:text-[28px] leading-tight font-serif">
            Government College of Engineering, Erode
          </h1>
          <h5 className="mb-1 text-foreground font-medium text-base md:text-lg">
            Tamil Nadu, India
          </h5>
          <p className="mb-0 text-muted-foreground text-xs md:text-sm font-semibold">
            Approved by AICTE | Affiliated to Anna University
          </p>
        </div>

        {/* Right Logo (hidden on mobile, visible on md+) */}
        <div className="hidden md:flex items-center justify-end" style={{ height: "80px", width: "80px", position: "relative" }}>
          <Image
            src={gov}
            alt="Tamil Nadu Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </header>
  );
}
