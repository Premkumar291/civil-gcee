import React from "react";
import { 
  Wrench, 
  HardHat, 
  PersonStanding, 
  Microscope, 
  Network, 
  Lightbulb, 
  Megaphone, 
  PieChart 
} from "lucide-react";

export default function ActivitiesSection() {
  const activities = [
    { title: "Technical Workshops", desc: "Hands-on training sessions to build industry-relevant technical skills.", icon: Wrench },
    { title: "Industrial Visits", desc: "Practical exposure to ongoing real-world civil engineering projects and sites.", icon: HardHat },
    { title: "Guest Lectures", desc: "Interactive sessions led by industry experts and veteran academicians.", icon: PersonStanding },
    { title: "Research Activities", desc: "Innovative research programs focusing on modern engineering challenges.", icon: Microscope },
    { title: "Technical Symposium", desc: "Annual department fest bringing students together for various technical events.", icon: Network },
    { title: "Student Projects", desc: "Exhibitions showcasing innovative models and prototypes built by students.", icon: Lightbulb },
    { title: "Seminars & Conferences", desc: "Paper presentations and discussions on latest trends in civil engineering.", icon: Megaphone },
    { title: "Skill Development", desc: "Value added courses to bridge the gap between academia and industry needs.", icon: PieChart },
  ];

  return (
    <section id="activities" className="py-20 bg-white relative">
      {/* Background Pattern dots */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h6 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Student Life & Growth</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Department Activities</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activities.map((act, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center text-primary-dark rounded-full bg-primary-light mb-6 group-hover:bg-primary-dark group-hover:text-white transition-colors duration-300">
                <act.icon size={32} />
              </div>
              <h6 className="font-bold text-primary-dark text-lg mb-3">{act.title}</h6>
              <p className="text-muted-foreground text-sm leading-relaxed m-0">{act.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
