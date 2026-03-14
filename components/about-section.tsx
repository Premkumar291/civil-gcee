"use client";

import React from "react";
import Image from "next/image";
import { HardHat, Factory } from "lucide-react";
import aboutImg from "../assets/images/Civil_Dept.jpg";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Images Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background design block */}
            <div className="absolute w-full h-full bg-accent/25 rounded-3xl top-5 left-5 -z-10"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <Image
                src={aboutImg}
                alt="Civil Engineering Department"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pl-8"
          >
            <div className="mb-8">
              <h6 className="text-accent font-bold uppercase tracking-widest mb-2 text-sm">
                Discover Our Department
              </h6>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                About the Department
              </h2>
              <div className="w-20 h-1 bg-accent"></div>
            </div>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Designing and executing structural works requires a great amount of
              analyzing, understanding, and planning. A skilled civil engineer plays a crucial role in
              infrastructure development.
            </p>
            
            <div className="border-l-4 border-accent pl-4 mb-8 text-muted-foreground">
              <p className="opacity-90 leading-relaxed">
                Modern construction management systems require a strong understanding of information technology. Keeping this in
                mind, Government College of Engineering, Erode imparts training to civil engineering students
                using the latest curriculum.
              </p>
            </div>

            <div className="space-y-4">
              {/* Feature 1 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-4 bg-gray-50 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-light text-primary-dark rounded-lg flex items-center justify-center mr-4">
                  <HardHat size={24} />
                </div>
                <div>
                  <h6 className="font-bold text-primary-dark mb-1">Versatile Systems Integrator</h6>
                  <p className="text-muted-foreground text-sm m-0">
                    Engineers trained to act as construction and environmental specialists.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-4 bg-gray-50 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent text-primary-dark rounded-lg flex items-center justify-center mr-4">
                  <Factory size={24} />
                </div>
                <div>
                  <h6 className="font-bold text-primary-dark mb-1">Practical Exposure</h6>
                  <p className="text-muted-foreground text-sm m-0">
                    Hands-on experience through industrial visits, site visits, and guest lectures.
                  </p>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
