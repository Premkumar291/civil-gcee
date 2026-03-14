"use client";

import React from "react";
import { Award, FlaskConical, Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { label: "Years of Excellence", value: "41+", icon: Award },
    { label: "Laboratories", value: "7", icon: FlaskConical },
    { label: "Faculty Members", value: "5", icon: Users },
    { label: "Programs Offered", value: "3", icon: GraduationCap },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-20 w-[90%] md:w-[80%] max-w-6xl mx-auto -mt-16 bg-primary-dark text-white rounded-3xl shadow-xl overflow-hidden py-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-x-0 md:divide-x divide-white/20 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
              className="p-4 flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <stat.icon className="w-10 h-10 text-accent mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h2>
              <p className="text-white/60 font-medium text-xs md:text-sm tracking-wider uppercase text-center max-w-[150px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
