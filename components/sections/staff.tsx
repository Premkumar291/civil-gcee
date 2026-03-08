"use client";

import React from "react";
import SectionContainer from "@/components/section-container";
import { Mail, GraduationCap, Award, MapPin } from "lucide-react";

const staffList = [
  {
    name: "Dr. Alexander Thorne",
    role: "Professor & Head",
    spec: "Structural Engineering & Earthquake Dynamics",
    email: "thorne.a@gcee.edu",
    initials: "AT",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Dr. Elena Vance",
    role: "Associate Professor",
    spec: "Environmental Fluid Mechanics & Water Resources",
    email: "vance.e@gcee.edu",
    initials: "EV",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    name: "Dr. Silas Freeman",
    role: "Asst. Professor",
    spec: "Geotechnical Engineering & Foundation Design",
    email: "freeman.s@gcee.edu",
    initials: "SF",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    name: "Dr. Judith Mossman",
    role: "Asst. Professor",
    spec: "Transportation Engineering & Smart Cities",
    email: "mossman.j@gcee.edu",
    initials: "JM",
    color: "bg-purple-500/10 text-purple-500",
  },
];

export default function Staff() {
  return (
    <SectionContainer
      id="staff"
      title="Our Expert Faculty"
      subtitle="Guiding students through excellence and technical innovation."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {staffList.map((staff, i) => (
          <div
            key={staff.name}
            className="group relative h-[450px] rounded-[40px] glass border border-border/10 overflow-hidden hover:border-primary/50 transition-all duration-500"
          >
            {/* Background Image/Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="p-8 h-full flex flex-col items-center text-center">
              {/* Profile Wrapper */}
              <div className={`w-32 h-32 rounded-3xl ${staff.color} flex items-center justify-center text-4xl font-bold mb-8 shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                {/* Profile Placeholder Initials */}
                {staff.initials}
                <div className="absolute inset-0 bg-white/10 group-hover:translate-y-full transition-transform duration-700" />
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{staff.name}</h3>
              <p className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">{staff.role}</p>
              
              <div className="space-y-4 pt-4 border-t border-border mt-auto w-full">
                <div className="flex items-start space-x-3 text-left">
                  <GraduationCap className="text-primary flex-shrink-0" size={18} />
                  <p className="text-xs text-muted-foreground leading-snug">{staff.spec}</p>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <Mail className="text-primary flex-shrink-0" size={18} />
                  <p className="text-xs text-muted-foreground font-medium">{staff.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
