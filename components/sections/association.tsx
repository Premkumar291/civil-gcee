"use client";

import React from "react";
import SectionContainer from "@/components/section-container";
import { Calendar, Award, BookOpen, Rocket, Users, ChevronRight } from "lucide-react";

const associationEvents = [
  {
    title: "CIVIL CONCLAVE 2024",
    type: "National Conference",
    desc: "A flagship technical symposium with 500+ participants nationwide.",
    date: "Dec 15-20, 2024",
    icon: Rocket,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Smart Structures Workshop",
    type: "Skill Development",
    desc: "Hands-on structural design session with industry-lead expert.",
    date: "Oct 22, 2024",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Best Student Chapter Award",
    type: "Achievement",
    desc: "Consistently recognized as the Most Active Students Chapter by ICI.",
    date: "Academic Year 23-24",
    icon: Award,
    color: "bg-amber-500/10 text-amber-500",
  },
];

const upcomingActivities = [
  { name: "Fluid Mechanics Quiz", date: "April 12, 2025" },
  { name: "Field Surveying Camp", date: "May 5-10, 2025" },
  { name: "Bridge Design Challenge", date: "June 20, 2025" },
];

export default function CivilAssociation() {
  return (
    <SectionContainer
      id="association"
      title="Civil Association"
      subtitle="Fostering community through technical events, professional chapters, and peer excellence."
    >
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Side: Events Timeline Style */}
        <div className="space-y-12">
           <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
             <Calendar size={24} className="text-primary" />
             <span>Highlights & Achievements</span>
           </h3>
           <div className="space-y-8 relative pl-8 border-l border-border/50">
             {associationEvents.map((event, i) => (
               <div key={event.title} className="relative group">
                 {/* Dot */}
                 <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full glass border-2 border-primary group-hover:scale-125 transition-transform duration-300" />
                 
                 <div className="p-8 rounded-3xl glass border border-border/5 hover:border-primary/50 transition-all duration-500">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${event.color}`}>
                        <event.icon size={20} />
                      </div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">{event.type}</span>
                    </div>
                    <h4 className="text-2xl font-extrabold mb-2">{event.title}</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{event.desc}</p>
                    <span className="text-sm font-medium text-muted-foreground italic">{event.date}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Right Side: Chapters & Interaction */}
        <div className="space-y-12">
          {/* Professional Chapters Card */}
          <div className="p-10 rounded-[40px] glass border border-border shadow-2xl relative overflow-hidden group">
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
             <div className="flex items-center space-x-3 mb-6">
                <Users size={28} className="text-primary" />
                <h3 className="text-2xl font-bold">Students Chapters</h3>
             </div>
             <p className="text-muted-foreground mb-8 leading-relaxed">
               Affiliated with premium professional bodies like the <strong>Indian Concrete Institute (ICI)</strong>, 
               <strong>Indian Roads Congress (IRC)</strong>, and <strong>ASCE</strong>.
             </p>
             <button className="flex items-center text-primary font-bold hover:translate-x-2 transition-transform">
               Learn More <ChevronRight size={20} className="ml-1" />
             </button>
          </div>

          {/* Upcoming Activities */}
          <div className="p-10 rounded-[40px] glass border border-border shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <Rocket size={24} className="text-primary" />
              <span>Upcoming Activities</span>
            </h3>
            <div className="space-y-6">
               {upcomingActivities.map((act) => (
                 <div key={act.name} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all border border-transparent hover:border-border">
                   <div className="font-semibold">{act.name}</div>
                   <div className="text-sm text-primary font-bold">{act.date}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
