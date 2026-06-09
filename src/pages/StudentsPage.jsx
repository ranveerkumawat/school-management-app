import { Search, Trash2 } from 'lucide-react';
import { statusBadgeClasses } from '../utils/formatUtils';

export default function StudentsPage({
  filteredStudents,
  searchTerm,
  onSearchChange,
  classFilter,
  onClassFilterChange,
  feeFilter,
  onFeeFilterChange,
  toggleStudentAttendance,
  deleteStudent,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Student Ledger Directory</h4>
          <p className="text-xs text-slate-500">Monitor classes, real-time presence log, and parent relations</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search Name or Guardian..."
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              className="pl-8.5 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none w-48"
            />
          </div>

          <select value={classFilter} onChange={(event) => onClassFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Grades</option>
            <option value="8-A">Class 8-A</option>
            <option value="9-A">Class 9-A</option>
            <option value="10-A">Class 10-A</option>
            <option value="10-B">Class 10-B</option>
            <option value="11-C">Class 11-C</option>
            <option value="12-B">Class 12-B</option>
          </select>

          <select value={feeFilter} onChange={(event) => onFeeFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wide">
              <th className="px-6 py-4">ID & Roll</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Attendance Status</th>
              <th className="px-6 py-4">Transit Assignment</th>
              <th className="px-6 py-4">Primary Guardian</th>
              <th className="px-6 py-4">Fee Status</th>
              <th className="px-6 py-4 text-right">Instant Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-3.5">
                    <span className="font-bold text-slate-950">#{student.roll}</span>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{student.id}</div>
                  </td>
                  <td className="px-6 py-3.5 font-bold text-slate-900">{student.name}</td>
                  <td className="px-6 py-3.5">
                    <span className="bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded text-[11px]">{student.class}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button onClick={() => toggleStudentAttendance(student.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border transition-all ${student.attendance === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`} title="Click to toggle status">
                      <span className={`w-1.5 h-1.5 rounded-full ${student.attendance === 'Present' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                      {student.attendance}
                    </button>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 font-medium">{student.transport}</td>
                  <td className="px-6 py-3.5">
                    <div className="font-medium text-slate-900">{student.guardian}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{student.phone}</div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusBadgeClasses(student.feeStatus, 'fee')}`}>
                      {student.feeStatus}
                    </span>
                    {student.dues > 0 && <div className="text-[10px] text-slate-400 font-bold mt-1">₹{student.dues.toLocaleString()}</div>}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button onClick={() => deleteStudent(student.id)} className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors" title="Delete Record">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-slate-500 font-medium">
                  No students matched current filter search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
