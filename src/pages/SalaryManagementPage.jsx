import { Search, Wallet, ShieldCheck, BarChart2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatUtils';

export default function SalaryManagementPage({
  staffPayroll,
  searchTerm,
  onSearchChange,
  payrollStatusFilter,
  onPayrollStatusFilterChange,
  paymentDateFilter,
  onPaymentDateFilterChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Salary Management Hub</h4>
          <p className="text-xs text-slate-500">Review payroll status by staff, department, and payment batches</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search staff, salary or department..."
              className="pl-8.5 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none w-52"
            />
          </div>

          <select value={payrollStatusFilter} onChange={(event) => onPayrollStatusFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Payroll</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Clear">Clear</option>
          </select>

          <select value={paymentDateFilter} onChange={(event) => onPaymentDateFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Dates</option>
            <option value="LastWeek">Last 7 Days</option>
            <option value="ThisMonth">This Month</option>
            <option value="LastMonth">Last Month</option>
          </select>
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-200 bg-slate-50">
        <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-sm">
          <div className="text-[11px] uppercase text-slate-400 font-semibold">Total Payroll</div>
          <div className="font-extrabold text-slate-900 text-xl mt-2">{formatCurrency(staffPayroll.reduce((sum, staff) => sum + staff.salary, 0))}</div>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-sm">
          <div className="text-[11px] uppercase text-slate-400 font-semibold">Pending Salary</div>
          <div className="font-extrabold text-slate-900 text-xl mt-2">{formatCurrency(staffPayroll.filter((staff) => staff.status === 'Pending').reduce((sum, staff) => sum + staff.salary, 0))}</div>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-sm">
          <div className="text-[11px] uppercase text-slate-400 font-semibold">Finalized Payroll</div>
          <div className="font-extrabold text-slate-900 text-xl mt-2">{formatCurrency(staffPayroll.filter((staff) => staff.status === 'Paid').reduce((sum, staff) => sum + staff.salary, 0))}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wide">
              <th className="px-6 py-4">Staff Member</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Payment Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staffPayroll.length > 0 ? (
              staffPayroll.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-3.5 font-bold text-slate-900">{staff.name}</td>
                  <td className="px-6 py-3.5 text-slate-600">{staff.department}</td>
                  <td className="px-6 py-3.5 font-semibold text-slate-900">{formatCurrency(staff.salary)}</td>
                  <td className="px-6 py-3.5 text-slate-500">{staff.paymentDate}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${staff.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : staff.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right text-slate-500">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                      <ShieldCheck size={12} /> {staff.verified ? 'Verified' : 'Review'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-500 font-medium">
                  No payroll entries available for the selected view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 p-4 bg-slate-50 text-[11px] text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Wallet size={14} />
          <span>Payroll records are updated automatically for the current month.</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 size={14} />
          <span>Use staff payroll reports to confirm salary distribution by department.</span>
        </div>
      </div>
    </div>
  );
}
