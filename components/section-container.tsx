"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionContainerProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  title?: string;
  subtitle?: string;
  animate?: boolean;
}

export default function SectionContainer({
  children,
  id,
  className,
  title,
  subtitle,
  animate = true,
}: SectionContainerProps) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (animate) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [animate]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden", className)}
    >
      {(title || subtitle) && (
        <div ref={headerRef} className="mb-16 text-center max-w-3xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground font-medium">
              {subtitle}
            </p>
          )}
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </div>
      )}
      <div className={cn(animate ? "section-reveal" : "")}>
        {children}
      </div>
    </section>
  );
}
