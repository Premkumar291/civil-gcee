"use client";

import React, { useEffect, useState } from "react";
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  ExternalLink,
  MapPin,
  Clock,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notice { id: string; text: string; date: string; }
interface EventData { id: string; title: string; date: string; time: string; location: string; desc: string; }

export default function NewsEventsSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        const sortedNotices = (data.notices || []).sort((a: any, b: any) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const sortedEvents = (data.events || []).sort((a: any, b: any) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setNotices(sortedNotices);
        setEvents(sortedEvents);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news/events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="news" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Recent Notices Board */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-primary-dark text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Bell className="w-6 h-6 animate-swing" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-dark">Recent Notices</h2>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Latest Updates</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-light flex-grow flex flex-col">
              <div className="bg-primary-dark p-4 flex justify-between items-center">
                <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Notice Board</span>
                <span className="flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                </span>
              </div>
              
              <div className="flex-grow overflow-y-auto max-h-[500px] overflow-custom">
                {loading ? (
                  <div className="p-10 text-center">
                    <div className="inline-block w-8 h-8 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-4 text-muted-foreground">Loading notices...</p>
                  </div>
                ) : notices.length === 0 ? (
                  <div className="p-10 text-center">
                     <p className="text-muted-foreground">No recent notices available.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {notices.map((notice, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="p-5 hover:bg-gray-50 transition-colors group flex items-start"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary-light text-primary-dark flex-shrink-0 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <ChevronRight size={20} />
                        </div>
                        <div className="flex-grow">
                          <p className="text-foreground leading-relaxed mb-2 font-medium">
                            {notice.text}
                          </p>
                          <span className="text-xs text-muted-foreground flex items-center font-bold">
                            <Clock size={12} className="mr-1" /> {new Date(notice.date).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-accent text-primary-dark rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-dark">Upcoming Events</h2>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Mark Your Calendar</p>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse flex">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl mr-4"></div>
                    <div className="flex-grow space-y-3 pt-2">
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : events.length === 0 ? (
                <div className="bg-white p-10 rounded-3xl text-center border border-dashed border-gray-300">
                   <p className="text-muted-foreground">No upcoming events listed.</p>
                </div>
              ) : (
                events.map((event, idx) => {
                  const evDate = new Date(event.date);
                  const day = evDate.getDate();
                  const month = evDate.toLocaleString('default', { month: 'short' });
                  
                  return (
                    <motion.button 
                      key={idx} 
                      onClick={() => setSelectedEvent(event)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center group overflow-hidden relative w-full text-left"
                    >
                      {/* Date Block */}
                      <div className="flex-shrink-0 w-20 h-20 bg-primary-dark text-white rounded-2xl flex flex-col items-center justify-center mr-6 shadow-md group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                        <span className="text-2xl font-bold font-serif">{day}</span>
                        <span className="text-xs uppercase font-bold tracking-widest">{month}</span>
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors">{event.title}</h4>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-medium">
                           {event.time && (
                             <span className="flex items-center"><Clock size={14} className="mr-1.5 text-accent" /> {event.time}</span>
                           )}
                           {event.location && (
                             <span className="flex items-center"><MapPin size={14} className="mr-1.5 text-accent" /> {event.location}</span>
                           )}
                        </div>
                      </div>
                      
                      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ChevronRight className="w-6 h-6 text-accent" />
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10"
            >
              <div className="bg-primary-dark p-6 text-white relative">
                 <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                 >
                   <X size={20} />
                 </button>
                 <div className="flex items-center space-x-4 mb-2">
                    <div className="bg-accent px-3 py-1 rounded-full text-primary-dark font-bold text-xs uppercase tracking-wider">
                      Event Details
                    </div>
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight">{selectedEvent.title}</h3>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-50 rounded-xl text-accent flex-shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                      <p className="font-bold text-primary-dark">{new Date(selectedEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  {selectedEvent.time && (
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-50 rounded-xl text-accent flex-shrink-0">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Time</p>
                        <p className="font-bold text-primary-dark">{selectedEvent.time}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.location && (
                    <div className="flex items-start space-x-3 col-span-2">
                      <div className="p-2 bg-gray-50 rounded-xl text-accent flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                        <p className="font-bold text-primary-dark">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Description</p>
                  <p className="text-primary-dark/80 leading-relaxed">
                    {selectedEvent.desc || "No additional description provided for this event."}
                  </p>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="w-full bg-primary-dark text-white font-bold py-4 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .overflow-custom::-webkit-scrollbar {
          width: 5px;
        }
        .overflow-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-custom::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .overflow-custom::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes swing {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(10deg); }
          30% { transform: rotate(-10deg); }
          50% { transform: rotate(5deg); }
          70% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-swing {
          animation: swing 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
