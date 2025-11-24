import React from 'react';
import { TimelineEvent } from '../types';
import { Calendar, MapPin } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      {/* Central Line - Desktop */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-rose-200" />
      
      {/* Central Line - Mobile */}
      <div className="md:hidden absolute left-8 w-0.5 h-full bg-rose-200" />

      <div className="space-y-12 md:space-y-24">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={event.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Date Marker (Center) */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-rose-400 rounded-full shadow-lg flex items-center justify-center">
                   <Calendar className="w-5 h-5 text-rose-500" />
                </div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? 'md:pr-16 text-left' : 'md:pl-16 text-left'}`}>
                <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-rose-50">
                  {/* Image Section */}
                  <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-rose-50 text-rose-200">
                        <MapPin className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                       <p className="p-4 text-white font-serif text-sm opacity-90">{event.date}</p>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-rose-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Empty Spacer for alternating layout */}
              <div className="hidden md:block w-5/12" />
            </div>
          );
        })}
      </div>
      
      {/* End Marker */}
      <div className="relative mt-24 flex justify-center">
         <div className="w-4 h-4 bg-rose-300 rounded-full animate-ping" />
      </div>
    </div>
  );
};

export default Timeline;