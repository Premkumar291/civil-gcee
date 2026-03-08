"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Box, Building2, HardHat, LandPlot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", stagger: 0.2, delay: 0.5 }
      );

      gsap.fromTo(
        ".icon-float",
        { y: 0 },
        { y: -20, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--primary)_0%,transparent_50%)] opacity-20" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5 [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="text-left space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary hero-fade">
              <HardHat size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider">Building the Future</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight hero-fade">
              Engineering <span className="text-primary italic">Excellence</span> <br />
              for a Sustainable Future
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground hero-fade leading-relaxed max-w-xl">
              Innovating civil engineering through advanced research, sustainable design, and world-class technical education. Join the legacy of master builders.
            </p>

            <div className="flex flex-wrap gap-4 items-center hero-fade">
              <button className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center group shadow-xl shadow-primary/20">
                Explore Programs
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 glass border border-border/10 rounded-xl font-bold hover:bg-muted/50 transition-all">
                Campus Tour
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block hero-fade">
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
              <div className="space-y-6">
                <div className="h-64 rounded-3xl overflow-hidden glass border border-border/10 hover:border-primary/50 transition-all p-6 relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Building2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mt-20">Infrastructure</h3>
                  <p className="text-muted-foreground mt-2">World-class labs & design studios.</p>
                </div>
                <div className="h-48 rounded-3xl overflow-hidden glass border border-border/10 hover:border-primary/50 transition-all p-6 relative group">
                   <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Box size={40} className="text-primary" />
                  </div>
                   <h3 className="text-2xl font-bold mt-12">Innovation</h3>
                   <p className="text-muted-foreground mt-2">Smart city research labs.</p>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="h-48 rounded-3xl overflow-hidden glass border border-border/10 hover:border-primary/50 transition-all p-6 relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <LandPlot size={40} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mt-12">Research</h3>
                  <p className="text-muted-foreground mt-2">Cutting-edge material science.</p>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden glass border border-border/10 hover:border-primary/50 transition-all p-6 relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <HardHat size={40} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mt-20">Leadership</h3>
                  <p className="text-muted-foreground mt-2">Building next-gen leaders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
