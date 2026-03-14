"use client";

import React, { useState } from "react";
import { Building, Building2, Microscope, Quote } from "lucide-react";

export default function ProgramsSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const programs = [
    {
      id: "be",
      icon: Building,
      title: "B.E.",
      subtitle: "Civil Engineering",
      points: [
        "Implement quality control systems",
        "Design civil engineering systems",
        "Use modern engineering tools",
      ],
      color: "bg-white",
      textColor: "text-primary-dark",
      iconBg: "bg-primary-light",
      iconColor: "text-primary-dark",
      outcomes: [
        { title: "Engineering Knowledge", desc: "Apply knowledge of mathematics, science, and engineering fundamentals to solve civil engineering problems." },
        { title: "Problem Analysis", desc: "Identify, formulate, and analyze complex engineering problems reaching substantiated conclusions." },
        { title: "Design/Development of Solutions", desc: "Design solutions for complex civil engineering problems that meet specific needs with public health and safety considerations." },
        { title: "Modern Tool Usage", desc: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling." },
        { title: "Environment and Sustainability", desc: "Understand the impact of engineering solutions in societal and environmental contexts, and demonstrate knowledge of sustainable development." }
      ]
    },
    {
      id: "me",
      icon: Building2,
      title: "M.E.",
      subtitle: "Structural Engineering",
      points: [
        "Analyze RC, PSC & steel structures",
        "Solve complex structural problems",
        "Conduct independent research",
      ],
      color: "bg-white",
      textColor: "text-primary-dark",
      iconBg: "bg-primary-light",
      iconColor: "text-primary-dark",
      outcomes: [
        { title: "Independent Research", desc: "Independently carry out research and development work to solve practical structural problems." },
        { title: "Advanced Design Literacy", desc: "Write and present substantial technical reports and documents to professional standards." },
        { title: "Complex Problem Solving", desc: "Demonstrate a degree of mastery by analyzing and designing complex structural elements under various loading conditions, including wind and seismic loads." },
        { title: "Software Proficiency", desc: "Utilize advanced analysis software like finite element programs for accurate modeling and assessment of structures." },
        { title: "Retrofitting & Quality", desc: "Design and apply modern techniques for retrofitting damaged structures and incorporating advanced composite materials." }
      ]
    },
    {
      id: "phd",
      icon: Microscope,
      title: "Ph.D.",
      subtitle: "Civil Engineering",
      points: [
        "Advanced concrete research",
        "Seismic analysis innovations",
        "Sustainable materials study",
      ],
      color: "bg-white",
      textColor: "text-primary-dark",
      iconBg: "bg-primary-light",
      iconColor: "text-primary-dark",
      outcomes: [
        { title: "Advanced Concrete Technologies", desc: "" },
        { title: "Seismic Analysis and Retrofitting", desc: "" },
        { title: "Geotechnical Engineering & Soil Mechanics", desc: "" },
        { title: "Environmental Engineering & Waste Water", desc: "" },
        { title: "Sustainable Construction Materials", desc: "" },
        { title: "Water Resources and Hydrology", desc: "" }
      ]
    },
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h6 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Academic Excellence</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Programs Offered</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className={`rounded-3xl shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ${prog.color}`}
            >
              <div className="p-10 text-center flex-grow flex flex-col relative z-10">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${prog.iconBg} ${prog.iconColor}`}>
                  <prog.icon size={36} />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${prog.textColor}`}>{prog.title}</h3>
                <h5 className="pb-4 mb-6 border-b border-dashed text-muted-foreground">
                  {prog.subtitle}
                </h5>

                <ul className="text-left text-sm space-y-3 flex-grow text-muted-foreground">
                  {prog.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-accent mr-2 mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 text-center bg-white border-t border-gray-100">
                 <button
                   onClick={() => setActiveModal(prog.id)}
                   className="font-bold hover:translate-x-1 inline-flex items-center transition-transform text-primary-dark"
                 >
                   View Outcomes
                   <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* PEO Box */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center relative border-t-4 border-accent max-w-4xl mx-auto">
          <Quote className="absolute top-4 left-4 w-12 h-12 text-primary-light opacity-50" />
          <h4 className="text-2xl font-bold text-primary-dark mb-4">Programme Educational Objectives</h4>
          <p className="text-muted-foreground leading-relaxed">
            Civil Engineering is one of the oldest engineering disciplines dealing with the design, construction, 
            and maintenance of infrastructure. The curriculum equips students with strong theoretical knowledge 
            and practical skills, preparing them to pursue careers in industry, research, or entrepreneurship.
          </p>
        </div>
      </div>

      {/* Modals - Custom Tailwind implementation instead of Bootstrap */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
          <div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary-dark text-white p-6 flex justify-between items-center">
              <h5 className="text-xl font-bold flex items-center font-serif">
                <span className="text-accent mr-3">
                  {programs.find(p => p.id === activeModal)?.icon && React.createElement(programs.find(p => p.id === activeModal)?.icon as React.ElementType, { size: 24 })}
                </span>
                {programs.find(p => p.id === activeModal)?.title} Outcomes
              </h5>
              <button onClick={() => setActiveModal(null)} className="text-white hover:text-accent transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <h6 className="text-primary-dark font-bold uppercase tracking-wider mb-6 border-b pb-4">
                {activeModal === 'phd' ? 'Research Focus Areas' : 'Program Outcomes'}
              </h6>
              
              {activeModal === 'phd' ? (
                <>
                  <p className="text-muted-foreground border-l-4 border-accent pl-4 mb-8 text-lg">
                    The Ph.D. program is designed to develop highly skilled researchers capable of leading the next
                    generation of civil engineering innovation.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {programs.find(p => p.id === activeModal)?.outcomes.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span className="text-muted-foreground">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  {programs.find(p => p.id === activeModal)?.outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-accent mr-3 mt-1 font-bold text-xl">•</span>
                      <div>
                        <strong className="text-foreground block mb-1">{item.title}:</strong>
                        <span className="text-muted-foreground">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-100">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-primary-dark text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
