import React, { useState, useEffect } from 'react';
import { Settings, Heart } from 'lucide-react';
import { TimelineEvent } from './types';
import { INITIAL_EVENTS, START_DATE } from './constants';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import AdminModal from './components/AdminModal';

const App: React.FC = () => {
  // Initialize state from localStorage or constants
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('amber-jasper-events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Persist events whenever they change
  useEffect(() => {
    localStorage.setItem('amber-jasper-events', JSON.stringify(events));
  }, [events]);

  const handleUpdateEvents = (updatedEvents: TimelineEvent[]) => {
    // Sort events by date whenever updated
    const sorted = [...updatedEvents].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setEvents(sorted);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-gradient-to-b from-rose-50 via-white to-rose-50">
      
      {/* Navigation / Header Icons */}
      <nav className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-between items-center pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm pointer-events-auto">
           <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="pointer-events-auto bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:bg-rose-100 transition-colors text-slate-600 hover:text-rose-600"
          aria-label="Admin Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </nav>

      <main className="pb-20">
        <Hero startDate={START_DATE} />
        
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-800 mb-4">Our Journey</h2>
            <div className="h-1 w-24 bg-rose-300 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-500 italic">Every moment counts, every memory stays.</p>
          </div>
          
          <Timeline events={events} />
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Amber & Jasper. Forever & Always.</p>
      </footer>

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminModal 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
          events={events}
          onUpdateEvents={handleUpdateEvents}
        />
      )}
    </div>
  );
};

export default App;