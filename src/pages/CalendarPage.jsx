import { Calendar, X } from 'lucide-react';
import { eventTagClasses } from '../utils/formatUtils';

export default function CalendarPage({ events, setEvents, setShowAddEventModal }) {
  const activeEvents = events.length;
  const examCount = events.filter((event) => event.type === 'Exam').length;
  const holidayCount = events.filter((event) => event.type === 'Holiday').length;

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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Academic Session Calendar</h4>
            <p className="text-xs text-slate-500">Visualized monthly planner with event markers</p>
          </div>
          <button onClick={() => setShowAddEventModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all">
            Add Calendar Event
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 text-xs font-bold text-slate-500 grid grid-cols-7 text-center border-b border-slate-100 pb-2">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const event = events.find((item) => Number(item.date.split('-')[2]) === day);
              const dayClass = event ? 'font-bold' : 'text-slate-600';
              return (
                <div key={day} className={`aspect-square flex flex-col items-center justify-between p-1.5 rounded-lg border border-slate-100 transition-all ${event ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'} ${dayClass}`}>
                  <span className="self-start text-[10px] font-mono">{day}</span>
                  {event && <span className={`w-2.5 h-2.5 rounded-full ${event.tagColor === 'red' ? 'bg-red-600' : event.tagColor === 'purple' ? 'bg-purple-600' : event.tagColor === 'green' ? 'bg-emerald-600' : 'bg-blue-600'}`} />}
                </div>
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Chronological Event Timeline</h4>
            <p className="text-xs text-slate-500">View the full event schedule and remove obsolete entries</p>
          </div>
          <div className="text-xs text-slate-500">Updated live</div>
        </div>

        <div className="p-6 space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-3 bg-slate-50 rounded-lg border border-slate-150 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-400 font-mono font-semibold">{event.date}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${eventTagClasses(event.tagColor)}`}>
                  {event.type}
                </span>
              </div>
              <h5 className="font-bold text-xs text-slate-950">{event.title}</h5>
              <p className="text-[11px] text-slate-500 mt-1">{event.description}</p>
              <button
                onClick={() => setEvents(events.filter((item) => item.id !== event.id))}
                className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
