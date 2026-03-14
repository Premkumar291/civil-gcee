"use client";

import React from "react";
import { 
  MapPin, 
  Layers, 
  Droplet, 
  Cuboid, 
  Waves, 
  Map, 
  Laptop
} from "lucide-react";
import { motion } from "framer-motion";

export default function FacilitiesSection() {
  const labs = [
    {
      id: 1,
      title: "Surveying Laboratory",
      desc: "Equipped with 4 total station instruments, 4 automatic engineering levels, tripod-mounted laser level, hand-held laser distance meter, and 3 mapping-grade GPS units with all ancillary equipment.",
      icon: MapPin,
    },
    {
      id: 2,
      title: "Soil Mechanics Laboratory",
      desc: "Comprehensive facility for studying soil behavior under loading and weathering conditions. Focuses on geotechnical engineering principles and soil-structure interactions.",
      icon: Layers,
    },
    {
      id: 3,
      title: "Water & Waste Water Analysis Lab",
      desc: "Environmental testing facility for water quality analysis, helping students understand appropriate tests for environmental problems and technical solutions.",
      icon: Droplet,
    },
    {
      id: 4,
      title: "Strength of Materials Laboratory",
      desc: "Features Universal Testing Machine, Compression Testing Machine, Hardness Testing Machine, and Rebound Hammer for comprehensive material testing and analysis.",
      icon: Cuboid,
    },
    {
      id: 5,
      title: "Hydraulic Engineering Laboratory",
      desc: "Specialized for fluid mechanics applications including open channel flow, hydraulic structures design, and environmental water management studies.",
      icon: Waves,
    },
    {
      id: 6,
      title: "Highway Engineering Laboratory",
      desc: "Complete facility for standardized highway materials testing, pavement evaluation, and traffic engineering studies with quality assurance protocols.",
      icon: Map,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h6 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">State of the Art</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Department Facilities</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Seven well-established, comprehensively equipped laboratories that enhance conceptual understanding 
            through hands-on practical exposure and advanced research.
          </p>
        </motion.div>

        {/* Labs Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {labs.map((lab) => (
            <motion.div 
              key={lab.id} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary-light text-primary-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <lab.icon size={28} />
              </div>
              <h5 className="text-xl font-bold text-primary-dark mb-3">{lab.title}</h5>
              <p className="text-muted-foreground text-sm leading-relaxed">{lab.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured CAD Lab */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary-dark rounded-3xl overflow-hidden shadow-2xl text-white"
        >
          <div className="flex flex-col md:flex-row items-center">
            
            <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/20 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-20 h-20 bg-accent text-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Laptop size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">CAD Laboratory</h3>
              <span className="inline-block bg-white text-primary-dark px-4 py-2 rounded-full font-bold text-sm">
                Premier Computing Facility
              </span>
            </div>
            
            <div className="md:w-2/3 p-8 lg:p-12">
              <p className="text-white/90 text-lg font-light leading-relaxed mb-8">
                Equipped with more than 30 computer systems installed with industry-standard design software. 
                The lab provides a modern environment for students to master technical computation.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {['AutoCAD 2D & 3D', 'Revit Architecture', 'STAAD.Pro'].map((software, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="font-medium text-white/80">{software}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
