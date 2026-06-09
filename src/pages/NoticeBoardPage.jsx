import { Eye, Trash2, Plus } from 'lucide-react';

export default function NoticeBoardPage({ notices, setNotices, setShowAddNoticeModal, setSelectedNotice }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Broadcast Communication Notices</h4>
            <p className="text-xs text-slate-500">Manage school-wide bulletins, holiday shutdowns, and policy reminders</p>
          </div>
          <button
            onClick={() => setShowAddNoticeModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus size={14} /> Post Announcement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((notice) => (
            <div key={notice.id} className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${notice.priority === 'Urgent' ? 'bg-red-100 text-red-800' : notice.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-slate-200 text-slate-700'}`}>
                      {notice.priority} Priority
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">{notice.category}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{notice.date}</span>
                </div>

                <h5 className="font-bold text-slate-950 text-sm mt-2">{notice.title}</h5>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{notice.content}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-bold uppercase">To: {notice.target}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-xs transition-all inline-flex items-center gap-1"
                  >
                    <Eye size={12} /> View Full
                  </button>
                  <button
                    onClick={() => setNotices(notices.filter((item) => item.id !== notice.id))}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                    title="Delete Notice"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
