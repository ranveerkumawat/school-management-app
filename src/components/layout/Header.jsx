import { Bell, Menu, Search } from 'lucide-react';

export default function Header({ searchTerm, onSearchChange, onClearSearch, onNoticeClick, onOpenSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shadow-sm">
      <div className="flex items-center space-x-4">
        <button onClick={onOpenSidebar} className="md:hidden text-slate-600 hover:text-slate-900">
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-slate-600 font-medium">Server Connected • Academic Term: June 2026</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative max-w-xs hidden md:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Global filter or ID lookup..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all w-60"
          />
          {searchTerm && (
            <button onClick={onClearSearch} className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 hover:text-slate-600">
              Clear
            </button>
          )}
        </div>

        <button onClick={onNoticeClick} className="relative p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center space-x-3 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-900">Dr. Alok Sen</p>
            <p className="text-[10px] font-medium text-emerald-600">Chief Registrar</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80"
            alt="Profile"
            className="w-9 h-9 rounded-full ring-2 ring-emerald-500 object-cover"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </header>
  );
}
