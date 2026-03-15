"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Mail, GraduationCap, Clock, Book } from "lucide-react";

export default function FacultySection() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        const normalizedFaculty = (data.faculty || []).map((f: any) => ({
          ...f,
          id: f.id || f._id
        }));
        setFaculty(normalizedFaculty);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching faculty:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="faculty" className="py-20 bg-gray-50 text-center">
        <div className="inline-block w-8 h-8 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading Faculty...</p>
      </section>
    );
  }

  return (
    <section id="faculty" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h6 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Renowned Educators</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Faculty Members</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* HOD Card */}
        <div className="flex justify-center mb-8">
          {faculty.filter(f => f.isHead).map(f => (
            <FacultyCard key={f.id} data={f} isLarge={true} />
          ))}
        </div>

        {/* Other Faculty Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
          {faculty.filter(f => !f.isHead).map(f => (
            <FacultyCard key={f.id} data={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacultyCard({ data, isLarge = false }: { data: any, isLarge?: boolean }) {
  return (
    <div className={`bg-white rounded-3xl shadow-lg border-t-4 hover:-translate-y-2 transition-transform duration-300 w-full overflow-hidden ${isLarge ? 'max-w-md border-accent' : 'max-w-sm border-primary-dark/30 hover:border-accent'}`}>
      
      {/* Background Header Image Style */}
      <div className="bg-primary-dark pt-16 pb-8 relative text-center">
        {/* Profile Image Float */}
      </div>

      {/* Content Body */}
      <div className="pt-20 pb-8 px-6 text-center">
        <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-primary-dark mb-1`}>
          {data.title && `${data.title} `}{data.initial && `${data.initial} `}{data.name}
        </h3>
        <p className="text-accent font-bold text-xs uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">{data.role}</p>
        
        <ul className="text-left text-sm text-muted-foreground space-y-4 max-w-[280px] mx-auto">
          <li className="flex items-center">
            <div className="w-8 flex justify-center text-primary-dark">
              <GraduationCap size={18} />
            </div>
            <strong>Qual:</strong> <span className="ml-2">{data.qual}</span>
          </li>
          <li className="flex items-center">
             <div className="w-8 flex justify-center text-primary-dark">
              <Clock size={18} />
             </div>
             <strong>Exp:</strong> <span className="ml-2">{data.exp} Years</span>
          </li>
          <li className="flex items-center">
             <div className="w-8 flex justify-center text-primary-dark">
              <Book size={18} />
             </div>
             <strong>Spec:</strong> <span className="ml-2 truncate max-w-[170px]" title={data.spec}>{data.spec}</span>
          </li>
          <li className="flex items-center">
             <div className="w-8 flex justify-center text-primary-dark">
              <Phone size={16} />
             </div>
             <strong>Mob:</strong> <span className="ml-2">{data.phone}</span>
          </li>
          <li className="flex items-center">
             <div className="w-8 flex justify-center text-primary-dark">
              <Mail size={16} />
             </div>
             <strong>Mail:</strong> <span className="ml-2 truncate max-w-[170px]" title={data.email}>{data.email}</span>
          </li>
        </ul>

        {/* Research Block */}
        {(data.conferences || data.journals) && (
          <div className="mt-6 pt-4 border-t border-gray-100 text-left">
            <h5 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">Research & Publications</h5>
            <div className="space-y-1.5">
              {data.conferences && (
                <div className="flex items-start text-[11px] text-muted-foreground leading-tight">
                  <span className="text-accent mr-1.5">•</span>
                  <span><strong>Conferences:</strong> {data.conferences}</span>
                </div>
              )}
              {data.journals && (
                <div className="flex items-start text-[11px] text-muted-foreground leading-tight">
                  <span className="text-accent mr-1.5">•</span>
                  <span><strong>Journals:</strong> {data.journals}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Contact */}
      <div className="bg-gray-50 py-4 px-6 flex justify-center gap-4 border-t border-gray-100">
        <a href={`tel:${data.phone}`} className="w-10 h-10 rounded-full border-2 border-primary-dark/20 text-primary-dark hover:bg-primary-dark hover:text-white flex items-center justify-center transition-colors" title={data.phoneDisplay}>
          <Phone size={16} />
        </a>
        <a href={`mailto:${data.email}`} className="w-10 h-10 rounded-full border-2 border-primary-dark/20 text-primary-dark hover:bg-primary-dark hover:text-white flex items-center justify-center transition-colors" title={data.email}>
          <Mail size={16} />
        </a>
      </div>
    </div>
  );
}
