import { Search, UserCheck, UserMinus } from 'lucide-react';
import { statusBadgeClasses } from '../utils/formatUtils';

export default function StaffPage({
  filteredStaff,
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  roleFilter,
  onRoleFilterChange,
  toggleStaffPresence,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Teachers & Staff Directory</h4>
          <p className="text-xs text-slate-500">Search personnel, approve attendance, and view payroll status</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search Staff Name or ID..."
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              className="pl-8.5 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none w-48"
            />
          </div>

          <select value={departmentFilter} onChange={(event) => onDepartmentFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Departments</option>
            <option value="Academic">Academic</option>
            <option value="Administrative">Administration</option>
            <option value="Transport">Transport</option>
            <option value="Support">Support</option>
          </select>

          <select value={roleFilter} onChange={(event) => onRoleFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Roles</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
            <option value="Driver">Driver</option>
            <option value="Counsellor">Counsellor</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wide">
              <th className="px-6 py-4">Name & Role</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Joining Date</th>
              <th className="px-6 py-4">Attendance</th>
              <th className="px-6 py-4">Salary Status</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-3.5">
                    <div className="font-bold text-slate-900">{member.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{member.role}</div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600">{member.department}</td>
                  <td className="px-6 py-3.5 text-slate-500">{member.joined}</td>
                  <td className="px-6 py-3.5">
                    <button onClick={() => toggleStaffPresence(member.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border transition-all ${member.attendance === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}>
                      {member.attendance === 'Present' ? <UserCheck size={12} /> : <UserMinus size={12} />}
                      {member.attendance}
                    </button>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusBadgeClasses(member.salaryStatus, 'salary')}`}>
                      {member.salaryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="text-[10px] text-slate-500">{member.phone}</div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="text-slate-500 hover:text-slate-900 text-xs font-semibold">
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-slate-500 font-medium">
                  No staff records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
