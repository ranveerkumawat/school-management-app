import { X } from 'lucide-react';
import { SIDEBAR_MENU } from '../../utils/initialData';

export default function Sidebar({ activeTab, sidebarOpen, setSidebarOpen, onTabChange }) {
  return (
    <aside className={`bg-slate-900 text-slate-300 w-64 fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-0'} transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col border-r border-slate-800`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center space-x-2.5">
          <div className="bg-emerald-500 text-white p-1.5 rounded-lg font-bold text-lg tracking-wider">Edu</div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">Apex ERP</h1>
            <p className="text-[10px] text-emerald-400 font-medium">Administrator Panel</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Main Controls</div>
        {SIDEBAR_MENU.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => {
                onTabChange(item.name);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-150'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.name}</span>
              </div>
              {item.adminOnly && (
                <span className="text-[9px] bg-red-900/60 text-red-300 border border-red-800/50 px-1.5 py-0.5 rounded font-mono">SECURE</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">AD</div>
          <div>
            <p className="text-white font-medium">Headmaster Admin</p>
            <p className="text-[10px] text-emerald-400">Term Session 2026</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
