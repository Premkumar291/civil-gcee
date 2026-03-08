"use client";

import React, { useEffect } from "react";
import SectionContainer from "@/components/section-container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { title: "Concrete Lab", subtitle: "Structural Integrity Testing", size: "md:col-span-1 md:row-span-2", color: "bg-blue-500/20" },
  { title: "Surveying Camp", subtitle: "Topography Analysis", size: "md:col-span-2 md:row-span-1", color: "bg-amber-500/20" },
  { title: "Smart Buildings", subtitle: "Sustainable Infrastructure", size: "md:col-span-1 md:row-span-1", color: "bg-emerald-500/20" },
  { title: "Material Science", subtitle: "Polymer-Concrete Composite", size: "md:col-span-1 md:row-span-1", color: "bg-purple-500/20" },
  { title: "Drone Surveying", subtitle: "Next-gen Mapping", size: "md:col-span-2 md:row-span-1", color: "bg-indigo-500/20" },
];

export default function Gallery() {
  useEffect(() => {
    gsap.fromTo(
      ".gallery-item",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <SectionContainer
      id="gallery"
      title="Department Gallery"
      subtitle="Capturing the essence of civil engineering through research, field work, and events."
    >
      <div className="gallery-grid grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        {galleryItems.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "gallery-item relative rounded-3xl overflow-hidden glass border border-border group cursor-pointer",
              item.size
            )}
          >
            {/* Background Color/Pattern (instead of images for now as placeholder) */}
            <div className={cn("absolute inset-0 transition-transform duration-700 group-hover:scale-110", item.color)} />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
              <h4 className="text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.title}
              </h4>
              <p className="text-sm opacity-80 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {item.subtitle}
              </p>
            </div>

            {/* Content for when not hovered */}
            <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
               <h3 className="text-xl font-bold text-foreground/50">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
