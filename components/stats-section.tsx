"use client";

import React, { useState, useEffect } from "react";
import { Award, FlaskConical, Users, GraduationCap } from "lucide-react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

function Counter({ value, duration = 2 }: { value: number | string, duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = typeof value === 'string' ? parseInt(value) : value;

  useEffect(() => {
    if (isNaN(targetValue)) return;
    
    const controls = animate(0, targetValue, {
      duration: duration,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [targetValue, duration]);

  return <span>{displayValue}{typeof value === 'string' && value.includes('+') ? '+' : ''}</span>;
}

export default function StatsSection() {
  const [facultyCount, setFacultyCount] = useState<number | null>(null);
  const [randomCount, setRandomCount] = useState(0);

  useEffect(() => {
    // Random number interval while loading
    let interval: NodeJS.Timeout;
    if (facultyCount === null) {
      interval = setInterval(() => {
        setRandomCount(Math.floor(Math.random() * 20) + 1);
      }, 150);
    }

    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.faculty && Array.isArray(data.faculty)) {
          setTimeout(() => {
            setFacultyCount(data.faculty.length);
          }, 500); // Slight delay for smoother transition from random to real
        }
      })
      .catch(err => {
        console.error("Error fetching stats:", err);
        setFacultyCount(5); // Fallback
      });

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [facultyCount]);

  const stats = [
    { label: "Years of Excellence", value: "41+", icon: Award, target: 41 },
    { label: "Laboratories", value: "7", icon: FlaskConical, target: 7 },
    { label: "Faculty Members", value: facultyCount, icon: Users, isDynamic: true },
    { label: "Programs Offered", value: "3", icon: GraduationCap, target: 3 },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-20 w-[90%] md:w-[80%] max-w-6xl mx-auto -mt-0 md:-mt-24 bg-primary-dark text-white rounded-3xl shadow-xl overflow-hidden py-8"
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
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                {stat.isDynamic ? (
                  facultyCount === null ? (
                    <span className="text-accent/50">{randomCount}</span>
                  ) : (
                    <Counter value={facultyCount} />
                  )
                ) : (
                  <Counter value={stat.value} />
                )}
              </h2>
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
