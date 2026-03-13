import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 border-t border-border overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-primary">
              CIVIL<span className="text-foreground"></span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Excellence in civil engineering education since 1986. Innovating 
              for a sustainable and resilient future through research and leadership.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="p-3 glass border border-border/20 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About", "Gallery", "Staff", "Civil Association"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Research Areas</h4>
            <ul className="space-y-4">
              {["Structural Analysis", "Geotechnical Engg.", "Water Resources", "Environmental Engg.", "Transportation"].map((item) => (
                <li key={item} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                <span>Government College of Engineering-Erode, Tamil Nadu, India.</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span>+91 (427) 2346102</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <span>civil@gcee.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground space-y-4 md:space-y-0">
          <p>© 2026 Department of Civil Engineering, GCEE. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
