import { Search, CheckCircle, AlertCircle, X, Check } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '../utils/formatUtils';

export default function SalaryManagementPage({
  staffPayroll,
  searchTerm,
  onSearchChange,
  payrollStatusFilter,
  onPayrollStatusFilterChange,
  paymentDateFilter,
  onPaymentDateFilterChange,
  updateSalaryStatus,
}) {
  const [toast, setToast] = useState(null);

  const grossSalary = staffPayroll.reduce((sum, staff) => sum + staff.salary, 0);
  const disbursedSalary = staffPayroll.filter((staff) => staff.salaryStatus === 'Paid').reduce((sum, staff) => sum + staff.salary, 0);
  const awaitingRelease = staffPayroll.filter((staff) => staff.salaryStatus === 'Pending').reduce((sum, staff) => sum + staff.salary, 0);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleReleaseSalary = (staff) => {
    try {
      updateSalaryStatus(staff.id, 'Paid');
      showToast(`Salary released for ${staff.name}.`, 'success');
    } catch (error) {
      showToast('Failed to release salary. Please try again.', 'error');
    }
  };

  return (
    <div className="space-y-6 relative">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-red-500" />}
          <span className="text-sm font-bold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900 text-xl">Salary Summary & Ledger Payroll</h2>
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
          </select>

          <select value={paymentDateFilter} onChange={(event) => onPaymentDateFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Dates</option>
            <option value="LastWeek">Last 7 Days</option>
            <option value="ThisMonth">This Month</option>
            <option value="LastMonth">Last Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Gross Salary Approved</div>
          <h3 className="text-[28px] font-black text-slate-900 leading-none">{formatCurrency(grossSalary)}</h3>
          <div className="text-xs mt-2 text-slate-500">Calculated for {staffPayroll.length} registered employees</div>
        </div>

        <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-1">Disbursed This Month</div>
          <h3 className="text-[28px] font-black text-emerald-600 leading-none">{formatCurrency(disbursedSalary)}</h3>
          <div className="text-xs mt-2 text-emerald-600/80">Direct Bank Transfers processed</div>
        </div>

        <div className="bg-yellow-50/50 p-5 rounded-xl border border-yellow-100 flex flex-col justify-between">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide mb-1">Awaiting Release</div>
          <h3 className="text-[28px] font-black text-amber-700 leading-none">{formatCurrency(awaitingRelease)}</h3>
          <div className="text-xs mt-2 text-amber-700/80">Subject to final attendance audit</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Staff Role</th>
                <th className="px-6 py-4">Salary Base</th>
                <th className="px-6 py-4">E-Mail</th>
                <th className="px-6 py-4">Monthly Status</th>
                <th className="px-6 py-4">Payroll Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffPayroll.length > 0 ? (
                staffPayroll.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/80 transition-all">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-xs">{staff.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{staff.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-bold uppercase">{staff.role}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{formatCurrency(staff.salary)}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-[10px]">{staff.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${staff.salaryStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-yellow-50 text-amber-700 border border-yellow-100'}`}>
                        {staff.salaryStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {staff.salaryStatus === 'Paid' ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                          <Check size={14} strokeWidth={3} /> Transferred
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReleaseSalary(staff)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3 py-1.5 rounded transition-colors"
                        >
                          Release Salary
                        </button>
                      )}
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
      </div>
    </div>
  );
}
