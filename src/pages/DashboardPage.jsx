import { ArrowUpRight, Bell, Calendar, Receipt, Bus, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/formatUtils';

export default function DashboardPage({
  students,
  notices,
  events,
  vehicles,
  totalStudents,
  presentStudents,
  absentStudents,
  totalTeachers,
  presentTeachers,
  absentTeachers,
  totalStaff,
  administratorsCount,
  totalDues,
  setActiveTab,
  setShowAddNoticeModal,
  setShowAddEventModal,
  setSelectedNotice,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl flex items-start gap-3">
        <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={18} />
        <div className="text-xs">
          <span className="font-bold text-yellow-800">Critical System Notice:</span> There are currently <span className="font-bold">{absentStudents} absent students</span> and <span className="font-bold">{absentTeachers} faculty members</span> on leave status today. Secure Term-1 Exam questions need approval before lock down.
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Student Attendance Quick Status</h4>
              <p className="text-xs text-slate-500">Click actions to instantly switch attendance status</p>
            </div>
            <button onClick={() => setActiveTab('Students')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All Students <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="px-6 py-3.5">Roll / Student ID</th>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Class / Standard</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Quick Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3">
                      <div className="font-bold text-slate-900">{student.roll}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{student.id}</div>
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-950">{student.name}</td>
                    <td className="px-6 py-3">
                      <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[11px]">{student.class}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${student.attendance === 'Present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {student.attendance}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${student.attendance === 'Present' ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200'}`}>
                        {student.attendance === 'Present' ? 'Mark Absent' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">
                <Bell className="text-emerald-600" size={16} /> Broadcast Board
              </h4>
              <button onClick={() => setActiveTab('Notice Board')} className="text-xs text-slate-500 hover:text-slate-900">
                See All
              </button>
            </div>

            <div className="space-y-4">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200/50 transition-all cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${notice.priority === 'Urgent' || notice.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{notice.date}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs line-clamp-1">{notice.title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button onClick={() => setShowAddNoticeModal(true)} className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg transition-all">
              Publish Urgent Notice
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
              <Calendar className="text-blue-500" size={16} /> Upcoming Exams & Events
            </h4>
            <button onClick={() => setActiveTab('School Calendar')} className="text-xs font-bold text-blue-600 hover:text-blue-700">
              Full Calendar
            </button>
          </div>
          <div className="space-y-3.5">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-200 shrink-0 text-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">June</span>
                  <span className="text-sm font-black mt-0.5">{event.date.split('-')[2]}</span>
                </div>
                <div>
                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold uppercase">{event.type}</span>
                  <h5 className="font-bold text-xs text-slate-900 mt-0.5">{event.title}</h5>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                <Receipt className="text-indigo-600" size={16} /> Fee Status Summary
              </h4>
              <button onClick={() => setActiveTab('Fee Management')} className="text-xs text-slate-500 hover:text-indigo-600 font-medium">
                Manage Accounts
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase">Paid Headcount</p>
                <p className="text-lg font-extrabold text-emerald-600 mt-1">{students.filter((s) => s.feeStatus === 'Paid').length}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase">Dues Outstanding</p>
                <p className="text-lg font-extrabold text-red-600 mt-1">{formatCurrency(Math.round(totalDues / 1000) * 1000)}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Defaulters: {students.filter((s) => s.feeStatus === 'Overdue').length} Overdue</span>
            <button onClick={() => setActiveTab('Fee Management')} className="text-indigo-600 font-bold hover:underline">
              Collect Fees
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                <Bus className="text-teal-600" size={16} /> Bus & Vans Transport
              </h4>
              <button onClick={() => setActiveTab('Transportation')} className="text-xs text-slate-500 hover:text-teal-600 font-medium">
                Route Assign
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {vehicles.slice(0, 2).map((v) => (
                <div key={v.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200/50">
                  <div>
                    <p className="font-bold text-slate-900">{v.route.split(' - ')[0]}</p>
                    <p className="text-[10px] text-slate-400">{v.driver} • {v.plate}</p>
                  </div>
                  <span className="bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded text-[10px]">{v.assignedStudents} Students</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            Total Active Transit: <b>{vehicles.filter((v) => v.status === 'Active').length} Fleet Vehicles</b>
          </div>
        </div>
      </div>
    </div>
  );
}
