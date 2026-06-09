import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { eventTagClasses } from '../utils/formatUtils';

export default function CalendarPage({ events, setEvents, setShowAddEventModal }) {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const activeEvents = events.length;
  const examCount = events.filter((event) => event.type === 'Exam').length;
  const holidayCount = events.filter((event) => event.type === 'Holiday').length;

  const handleDateClick = (day) => {
    // Format day to match event.date format (YYYY-MM-DD)
    // We assume the current month is 2026-06 based on the reference image
    const formattedDate = `2026-06-${day.toString().padStart(2, '0')}`;
    
    if (selectedDate === formattedDate) {
      setSelectedDate(null); // Deselect if clicked again
    } else {
      setSelectedDate(formattedDate);
    }
  };

  const displayedEvents = selectedDate 
    ? events.filter(e => e.date === selectedDate)
    : events;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Scheduled Events</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{activeEvents}</p>
          <p className="text-[10px] text-slate-400 mt-1">Academic and extracurricular dates</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Examinations</p>
          <p className="text-2xl font-black text-red-600 mt-1">{examCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">High priority assessment dates</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Holidays</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{holidayCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">Official campus closures</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Academic Session Calendar</h4>
              <p className="text-xs text-slate-500">Visualized monthly planner with event markers</p>
            </div>
            <button onClick={() => setShowAddEventModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all">
              Add Calendar Event
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4 text-xs font-bold text-slate-500 grid grid-cols-7 text-center border-b border-slate-100 pb-2">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs flex-1">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const formattedDate = `2026-06-${day.toString().padStart(2, '0')}`;
                const event = events.find((item) => item.date === formattedDate);
                const isSelected = selectedDate === formattedDate;
                const dayClass = event ? 'font-bold' : 'text-slate-600';
                
                return (
                  <button 
                    key={day} 
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square flex flex-col items-center justify-between p-2 rounded-lg border transition-all ${isSelected ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50' : event ? 'border-slate-100 bg-red-50/50' : 'border-slate-100 bg-white hover:bg-slate-50'} ${dayClass}`}
                  >
                    <span className="self-start text-[11px] font-medium">{day}</span>
                    {event && <span className={`w-1.5 h-1.5 rounded-full ${event.tagColor === 'red' ? 'bg-red-500' : event.tagColor === 'purple' ? 'bg-purple-500' : event.tagColor === 'green' ? 'bg-emerald-500' : 'bg-blue-500'}`} />}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-red-100 border border-red-300"></span>
                <span>Scheduled Examinations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-100 border border-purple-300"></span>
                <span>Functions & Festivals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200"></span>
                <span>Weekend Holidays</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative xl:h-full h-[500px]">
          <div className="absolute inset-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Chronological Event Timeline</h4>
                <p className="text-xs text-slate-500">View the full event schedule</p>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {displayedEvents.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No events found for the selected date.
                </div>
              ) : (
                [...displayedEvents].sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => (
                  <div key={event.id} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-slate-400 font-mono font-semibold">{event.date}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${eventTagClasses(event.tagColor)}`}>
                        {event.type}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-900">{event.title}</h5>
                    <p className="text-xs text-slate-500 mt-1.5">{event.description}</p>
                    <button
                      onClick={() => setEvents(events.filter((item) => item.id !== event.id))}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-200 shrink-0 bg-slate-50/50">
              <button
                onClick={() => setShowAddEventModal(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-all"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
