"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Gallery from "@/components/sections/gallery";
import Staff from "@/components/sections/staff";
import CivilAssociation from "@/components/sections/association";
import Footer from "@/components/footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initial global animations
    gsap.utils.toArray(".section-reveal").forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <Hero />

      <div className="space-y-12">
        <About />
        <Gallery />
        <Staff />
        <CivilAssociation />
      </div>

      <Footer />
    </main>
  );
}
