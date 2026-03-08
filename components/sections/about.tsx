"use client";

import React from "react";
import SectionContainer from "@/components/section-container";
import { Building2, Microscope, Target, Lightbulb, Users, FlaskConical } from "lucide-react";

const aboutCards = [
  {
    title: "Our Vision",
    desc: "To be a center of excellence in civil engineering education and research, fostering innovation and sustainable development for the benefit of society.",
    icon: Target,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Our Mission",
    desc: "To provide quality technical education, promote interdisciplinary research, and develop professional ethics and leadership qualities in our students.",
    icon: Lightbulb,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Research Excellence",
    desc: "Engaged in cutting-edge research in structural engineering, geotechnical engineering, and water resource management with global impact.",
    icon: Microscope,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

const infrastructure = [
  { name: "Structural Analysis Lab", icon: Building2 },
  { name: "Geotechnical Engineering Lab", icon: FlaskConical },
  { name: "Environmental Engineering Lab", icon: Microscope },
  { name: "Advanced Surveying Lab", icon: Users },
];

export default function About() {
  return (
    <SectionContainer
      id="about"
      title="Department Overview"
      subtitle="A legacy of excellence in civil engineering education and research since 1995."
    >
      <div className="grid md:grid-cols-3 gap-8">
        {aboutCards.map((card, i) => (
          <div
            key={card.title}
            className="p-8 rounded-3xl glass border border-border/10 hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center group"
          >
            <div className={`p-4 rounded-2xl ${card.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <card.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-24">
        <h3 className="text-2xl font-bold mb-12 text-center">Infrastructure & Labs</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infrastructure.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl glass border border-border/5 hover:bg-muted/30 transition-all flex items-center space-x-4"
            >
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <item.icon size={24} />
              </div>
              <span className="font-semibold text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
