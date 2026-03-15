"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Megaphone, 
  CalendarDays, 
  LogOut, 
  Eye, 
  Plus, 
  Trash2,
  Edit2,
  Calendar,
  Clock,
  MapPin,
  X,
  LogIn, 
  ArrowLeft,
  User 
} from "lucide-react";

interface Notice { id: string; text: string; date: string; }
interface EventData { id: string; title: string; date: string; time: string; location: string; desc: string; }
interface FacultyData { 
  id: string; 
  title: string;
  initial: string;
  name: string; 
  role: string; 
  qual: string;
  exp: string;
  spec: string;
  conferences: string;
  journals: string;
  phone: string;
  email: string;
  image: string;
  isHead: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"notices" | "events" | "faculty">("notices");
  const [siteData, setSiteData] = useState<{notices: Notice[], events: EventData[], faculty: FacultyData[]}>({ notices: [], events: [], faculty: [] });
  const [toast, setToast] = useState<{message: string, success: boolean} | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [noticeText, setNoticeText] = useState("");
  const [noticeDate, setNoticeDate] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  const [facTitle, setFacTitle] = useState("");
  const [facInitial, setFacInitial] = useState("");
  const [facName, setFacName] = useState("");
  const [facRole, setFacRole] = useState("");
  const [facQual, setFacQual] = useState("");
  const [facExp, setFacExp] = useState("");
  const [facSpec, setFacSpec] = useState("");
  const [facConferences, setFacConferences] = useState("");
  const [facJournals, setFacJournals] = useState("");
  const [facPhone, setFacPhone] = useState("");
  const [facEmail, setFacEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      
      // Normalize _id to id for all items from MongoDB
      const normalize = (items: any[]) => items.map(item => ({
        ...item,
        id: item.id || item._id
      }));

      setSiteData({
         notices: Array.isArray(data.notices) ? normalize(data.notices) : [],
         events: Array.isArray(data.events) ? normalize(data.events) : [],
         faculty: Array.isArray(data.faculty) ? normalize(data.faculty) : []
      });
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const saveData = async (newData: any) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      });
      
      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }
      
      if (res.ok) {
        showToast('Updates saved successfully!', true);
        setSiteData(newData);
      } else {
        showToast('Failed to save updates.', false);
      }
    } catch (err) {
      console.error(err);
      showToast('Error connecting to server.', false);
    }
  };

  const showToast = (message: string, success: boolean) => {
    setToast({ message, success });
    setTimeout(() => setToast(null), 3000);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Common Handlers
  const cancelEdit = () => {
    setEditingId(null);
    // Reset all forms
    setNoticeText(""); setNoticeDate("");
    setEventTitle(""); setEventDate(""); setEventTime(""); setEventLocation(""); setEventDesc("");
    setFacTitle(""); setFacInitial(""); setFacName(""); setFacRole(""); setFacQual(""); 
    setFacExp(""); setFacSpec(""); setFacConferences(""); setFacJournals(""); 
    setFacPhone(""); setFacEmail("");
  };

  // Notice Handlers
  const startEditNotice = (n: Notice) => {
    setEditingId(n.id);
    setNoticeText(n.text);
    setNoticeDate(new Date(n.date).toISOString().split('T')[0]);
    setActiveTab('notices');
  };

  const startEditEvent = (ev: EventData) => {
    setEditingId(ev.id);
    setEventTitle(ev.title);
    setEventDate(new Date(ev.date).toISOString().split('T')[0]);
    setEventTime(ev.time || "");
    setEventLocation(ev.location || "");
    setEventDesc(ev.desc || "");
    setActiveTab('events');
  };

  const startEditFaculty = (f: FacultyData) => {
    setEditingId(f.id);
    setFacTitle(f.title || "");
    setFacInitial(f.initial || "");
    setFacName(f.name);
    setFacRole(f.role || "");
    setFacQual(f.qual || "");
    setFacExp(f.exp || "");
    setFacSpec(f.spec || "");
    setFacConferences(f.conferences || "");
    setFacJournals(f.journals || "");
    setFacPhone(f.phone || "");
    setFacEmail(f.email || "");
    setActiveTab('faculty');
  };

  // Notice Handlers
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    let newData;
    if (editingId) {
      newData = { 
        ...siteData, 
        notices: siteData.notices.map(n => n.id === editingId ? { ...n, text: noticeText, date: noticeDate } : n) 
      };
    } else {
      const newNotice = { id: generateId(), text: noticeText, date: noticeDate };
      newData = { ...siteData, notices: [...siteData.notices, newNotice] };
    }
    saveData(newData);
    cancelEdit();
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      const newData = { ...siteData, notices: siteData.notices.filter(n => n.id !== id) };
      saveData(newData);
    }
  };

  // Event Handlers
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    let newData;
    const eventData = {
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      desc: eventDesc
    };

    if (editingId) {
      newData = {
        ...siteData,
        events: siteData.events.map(ev => ev.id === editingId ? { ...ev, ...eventData } : ev)
      };
    } else {
      const newEvent = { id: generateId(), ...eventData };
      newData = { ...siteData, events: [...siteData.events, newEvent] };
    }
    saveData(newData);
    cancelEdit();
  };

  const handleDeleteEvent = (id: string) => {
    if(confirm("Are you sure you want to delete this event?")) {
        const newData = { ...siteData, events: siteData.events.filter(ev => ev.id !== id) };
        saveData(newData);
    }
  };

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    let newData;
    const facultyData = {
      title: facTitle,
      initial: facInitial,
      name: facName,
      role: facRole,
      qual: facQual,
      exp: facExp,
      spec: facSpec,
      conferences: facConferences,
      journals: facJournals,
      phone: facPhone,
      email: facEmail,
      image: `https://ui-avatars.com/api/?name=${facName.replace(' ', '+')}&background=random&color=fff&size=150&bold=true`
    };

    if (editingId) {
      newData = {
        ...siteData,
        faculty: siteData.faculty.map(f => f.id === editingId ? { ...f, ...facultyData, image: f.image } : f)
      };
    } else {
      const newFaculty = { id: generateId(), ...facultyData, isHead: false };
      newData = { ...siteData, faculty: [...siteData.faculty, newFaculty] };
    }
    saveData(newData);
    cancelEdit();
  };

  const handleDeleteFaculty = (id: string) => {
    if(confirm("Are you sure you want to delete this faculty member?")) {
      const newData = { ...siteData, faculty: siteData.faculty.filter(f => f.id !== id) };
      saveData(newData);
    }
  };

  const sortedNotices = [...siteData.notices].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sortedEvents = [...siteData.events].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      
      {/* Sidebar */}
      <div className="md:w-64 bg-primary-dark text-white p-6 flex flex-col">
        <div className="text-center mb-10 pt-4 border-b border-white/20 pb-6">
          <ShieldCheck className="w-12 h-12 text-accent mx-auto mb-3" />
          <h5 className="font-bold text-xl font-serif">GCEE Admin</h5>
        </div>
        
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('notices')}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'notices' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                <Megaphone className="w-5 h-5 mr-3" /> Manage Notices
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'events' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                <CalendarDays className="w-5 h-5 mr-3" /> Manage Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('faculty')}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'faculty' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                <User className="w-5 h-5 mr-3" /> Manage Faculty
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="pt-10">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center border border-white/30 text-white hover:bg-white/10 py-3 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-12 md:max-h-screen overflow-y-auto relative">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-primary-dark m-0">
            {activeTab === 'notices' ? 'Manage Notices' : activeTab === 'events' ? 'Manage Events' : 'Manage Faculty'}
          </h2>
          <Link href="/" className="inline-flex items-center text-primary-dark bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm transition-colors text-sm font-medium">
            <Eye className="w-4 h-4 mr-2" /> View Site
          </Link>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-6 right-6 z-50">
            <div className={`flex items-center p-4 rounded-xl shadow-lg text-white font-medium min-w-[300px] ${toast.success ? 'bg-green-500' : 'bg-red-500'}`}>
              <div className="flex-grow">{toast.message}</div>
              <button onClick={() => setToast(null)} className="ml-4 hover:opactiy-80">
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* --- NOTICES TAB --- */}
        {activeTab === 'notices' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Add Notice Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h5 className="font-bold text-primary-dark m-0 tracking-wide">{editingId ? 'Edit Notice' : 'Add New Notice'}</h5>
                {editingId && (
                  <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-primary-dark flex items-center">
                    <X size={14} className="mr-1" /> Cancel Edit
                  </button>
                )}
              </div>
              <div className="p-6">
                <form onSubmit={handleAddNotice} className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="text" 
                    required 
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    placeholder="Enter notice content description..." 
                    className="flex-grow basis-full md:basis-2/3 border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                  <input 
                    type="date" 
                    required 
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    className="basis-full md:basis-[20%] border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                  <button type="submit" className={`${editingId ? 'bg-orange-500' : 'bg-primary'} text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center basis-full md:basis-auto whitespace-nowrap`}>
                    {editingId ? <Edit2 size={18} className="mr-1" /> : <Plus size={18} className="mr-1" />}
                    {editingId ? 'Update' : 'Add'}
                  </button>
                </form>
              </div>
            </div>

            {/* Notice List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 pl-6 font-semibold text-gray-500 w-16">No.</th>
                      <th className="p-4 font-semibold text-gray-500">Content</th>
                      <th className="p-4 font-semibold text-gray-500 w-40">Date</th>
                      <th className="p-4 pr-6 font-semibold text-gray-500 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sortedNotices.length === 0 ? (
                      <tr key="empty-notices"><td colSpan={4} className="p-8 text-center text-muted-foreground">No notices found. Add one above.</td></tr>
                    ) : (
                      sortedNotices.map((n, idx) => (
                        <tr key={n.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 pl-6 font-bold text-muted-foreground">{idx + 1}</td>
                          <td className="p-4 text-foreground">{n.text}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 whitespace-nowrap">
                              <Calendar size={14} className="mr-2" /> {new Date(n.date).toLocaleDateString('en-GB')}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right whitespace-nowrap">
                            <button onClick={() => startEditNotice(n)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-1" title="Edit Notice">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteNotice(n.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Notice">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Add Event Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h5 className="font-bold text-primary-dark m-0 tracking-wide">{editingId ? 'Edit Event' : 'Add New Event'}</h5>
                {editingId && (
                  <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-primary-dark flex items-center">
                    <X size={14} className="mr-1" /> Cancel Edit
                  </button>
                )}
              </div>
              <div className="p-6">
                <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <input type="text" required placeholder="Event Title (e.g., Tech Symposium 2024)" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="md:col-span-4">
                    <input type="text" placeholder="Location (e.g., Main Auditorium)" value={eventLocation} onChange={e => setEventLocation(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="md:col-span-4">
                    <textarea placeholder="Brief event description..." rows={2} value={eventDesc} onChange={e => setEventDesc(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"></textarea>
                  </div>
                  <div className="md:col-span-4 flex justify-end">
                    <button type="submit" className={`${editingId ? 'bg-orange-500 text-white' : 'bg-accent text-primary-dark'} font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity flex items-center`}>
                      {editingId ? <Edit2 size={18} className="mr-2" /> : <Plus size={18} className="mr-2" />}
                      {editingId ? 'Update Event' : 'Add Event'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Event List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 pl-6 font-semibold text-gray-500">Title</th>
                      <th className="p-4 font-semibold text-gray-500 w-48">Date & Time</th>
                      <th className="p-4 font-semibold text-gray-500">Location</th>
                      <th className="p-4 pr-6 font-semibold text-gray-500 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sortedEvents.length === 0 ? (
                      <tr key="empty-events"><td colSpan={4} className="p-8 text-center text-muted-foreground">No events found. Add one above.</td></tr>
                    ) : (
                      sortedEvents.map(evt => (
                        <tr key={evt.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 pl-6">
                            <h6 className="font-bold text-primary-dark m-0">{evt.title}</h6>
                            {evt.desc && <p className="text-sm text-muted-foreground m-0 mt-1 truncate max-w-[250px]">{evt.desc}</p>}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col space-y-2">
                              <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 whitespace-nowrap">
                                <Calendar size={12} className="mr-1.5" /> {new Date(evt.date).toLocaleDateString('en-GB')}
                              </span>
                              {evt.time && (
                                <span className="inline-flex items-center px-2 py-1 bg-gray-50 border border-dashed border-gray-200 rounded text-xs text-gray-500 whitespace-nowrap max-w-min">
                                  <Clock size={12} className="mr-1.5" /> {evt.time}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground text-sm">
                            {evt.location ? (
                              <div className="flex items-center"><MapPin size={14} className="text-red-400 mr-2" /> {evt.location}</div>
                            ) : '-'}
                          </td>
                          <td className="p-4 pr-6 text-right align-middle whitespace-nowrap">
                            <button onClick={() => startEditEvent(evt)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-1" title="Edit Event">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteEvent(evt.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Event">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}

        {/* --- FACULTY TAB --- */}
        {activeTab === 'faculty' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Add Faculty Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h5 className="font-bold text-primary-dark m-0 tracking-wide">{editingId ? 'Edit Faculty Member' : 'Add New Faculty'}</h5>
                {editingId && (
                  <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-primary-dark flex items-center">
                    <X size={14} className="mr-1" /> Cancel Edit
                  </button>
                )}
              </div>
              <div className="p-6">
                <form onSubmit={handleAddFaculty} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Row 1: Title, Initial, Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Title</label>
                    <select 
                      value={facTitle} 
                      onChange={e => setFacTitle(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-white"
                    >
                      <option value="">Select Title</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Professor">Professor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Initial</label>
                    <input type="text" placeholder="e.g. A." value={facInitial} onChange={e => setFacInitial(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" required placeholder="Name" value={facName} onChange={e => setFacName(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>

                  {/* Row 2: Role, Qual, Exp */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Role/Designation</label>
                    <input type="text" required placeholder="e.g. Assistant Professor" value={facRole} onChange={e => setFacRole(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Qualification</label>
                    <input type="text" placeholder="e.g. M.E., Ph.D." value={facQual} onChange={e => setFacQual(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Experience (Years)</label>
                    <input type="text" placeholder="e.g. 12" value={facExp} onChange={e => setFacExp(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>

                  {/* Row 3: Specialization, Conferences, Journals */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Specialization</label>
                    <input type="text" placeholder="Area of specialization" value={facSpec} onChange={e => setFacSpec(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Conferences</label>
                    <input type="text" placeholder="National/International" value={facConferences} onChange={e => setFacConferences(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Journals</label>
                    <input type="text" placeholder="Publications" value={facJournals} onChange={e => setFacJournals(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>

                   {/* Row 4: Phone, Email */}
                   <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Phone Number</label>
                    <input type="text" placeholder="+91..." value={facPhone} onChange={e => setFacPhone(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</label>
                    <input type="email" placeholder="example@gcee.ac.in" value={facEmail} onChange={e => setFacEmail(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  
                  <div className="md:col-span-3 flex justify-end pt-4">
                    <button type="submit" className={`${editingId ? 'bg-orange-500' : 'bg-primary'} text-white font-bold py-4 px-10 rounded-xl hover:opacity-90 transition-opacity flex items-center shadow-lg`}>
                      {editingId ? <Edit2 size={20} className="mr-2" /> : <Plus size={20} className="mr-2" />}
                      {editingId ? 'Update Faculty Details' : 'Register Faculty Member'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Faculty List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 pl-6 font-semibold text-gray-500">Name</th>
                      <th className="p-4 font-semibold text-gray-500">Role</th>
                      <th className="p-4 font-semibold text-gray-500">Exp</th>
                      <th className="p-4 font-semibold text-gray-500">Conf/Journ</th>
                      <th className="p-4 pr-6 font-semibold text-gray-500 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {siteData.faculty.length === 0 ? (
                      <tr key="empty-faculty"><td colSpan={5} className="p-8 text-center text-muted-foreground">No faculty members found. Add one above.</td></tr>
                    ) : (
                      siteData.faculty.map(f => (
                        <tr key={f.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center">
                               <div className="w-8 h-8 rounded-full bg-gray-100 mr-3 overflow-hidden">
                                  <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                               </div>
                               <span className="font-bold text-primary-dark">{f.title} {f.initial} {f.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground text-xs">{f.role}</td>
                          <td className="p-4 text-muted-foreground text-xs">{f.exp} Yrs</td>
                          <td className="p-4 text-muted-foreground text-[10px] leading-tight max-w-[150px]">
                            {f.conferences && <div className="truncate" title={f.conferences}>C: {f.conferences}</div>}
                            {f.journals && <div className="truncate" title={f.journals}>J: {f.journals}</div>}
                          </td>
                          <td className="p-4 pr-6 text-right align-middle whitespace-nowrap">
                            <button onClick={() => startEditFaculty(f)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-1" title="Edit Faculty">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteFaculty(f.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Faculty">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
