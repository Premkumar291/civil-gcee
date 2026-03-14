"use client";

import React from "react";
import { MapPin, PhoneCall, MailOpen } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-primary-light relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h6 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Get in touch</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* Visit Us */}
          <div 
            onClick={() => window.open('https://maps.google.com/maps?q=11.415582,77.66462', '_blank')}
            className="bg-white rounded-3xl p-10 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-20 h-20 bg-primary-light text-primary flex items-center justify-center rounded-full mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <MapPin size={36} />
            </div>
            <h4 className="text-xl font-bold text-primary-dark mb-3">Visit Us</h4>
            <p className="text-muted-foreground font-medium m-0 leading-relaxed">
              Government College of Engineering, Erode<br/>Tamil Nadu, India
            </p>
          </div>

          {/* Call Us */}
          <div className="bg-white rounded-3xl p-10 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-20 h-20 bg-primary-light text-primary flex items-center justify-center rounded-full mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <PhoneCall size={36} />
            </div>
            <h4 className="text-xl font-bold text-primary-dark mb-3">Call Us</h4>
            <p className="text-muted-foreground font-medium mb-2">Department Contact Number</p>
            <a href="tel:+910000000000" className="text-primary font-bold text-xl hover:underline">
              +91-XXXXXXXXXX
            </a>
          </div>

          {/* Email Us */}
          <div className="bg-white rounded-3xl p-10 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-20 h-20 bg-primary-light text-primary flex items-center justify-center rounded-full mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <MailOpen size={36} />
            </div>
            <h4 className="text-xl font-bold text-primary-dark mb-3">Email Us</h4>
            <p className="text-muted-foreground font-medium mb-2">Department Email address</p>
            <a href="mailto:civil@gcee.ac.in" className="text-primary font-bold text-xl hover:underline break-all">
              civil@gcee.ac.in
            </a>
          </div>

        </div>

        {/* Google Map */}
        <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
          <iframe 
            src="https://maps.google.com/maps?q=11.415582,77.66462&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="500" 
            className="border-0 rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
