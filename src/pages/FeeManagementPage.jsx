import { Search, CreditCard, DollarSign, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/formatUtils';

export default function FeeManagementPage({
  feePayments,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentModeFilter,
  onPaymentModeFilterChange,
  overdueFilter,
  onOverdueFilterChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Fee Management Console</h4>
          <p className="text-xs text-slate-500">Track collections, invoices, and overdue defaulters in one table</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by student or invoice..."
              className="pl-8.5 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none w-52"
            />
          </div>

          <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          <select value={paymentModeFilter} onChange={(event) => onPaymentModeFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Modes</option>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <select value={overdueFilter} onChange={(event) => onOverdueFilterChange(event.target.value)} className="text-xs border border-slate-200 bg-slate-50 px-2 py-1.5 rounded-lg focus:outline-none">
            <option value="All">All Dues</option>
            <option value="Overdue">Only Overdue</option>
            <option value="DueSoon">Due in 7 days</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wide">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Invoice #</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-right">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {feePayments.length > 0 ? (
              feePayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-3.5">
                    <div className="font-bold text-slate-900">{payment.student}</div>
                    <div className="text-[10px] text-slate-400">{payment.class}</div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600">{payment.invoice}</td>
                  <td className="px-6 py-3.5 font-semibold text-slate-900">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-3.5 text-slate-500">{payment.mode}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${payment.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : payment.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">{payment.dueDate}</td>
                  <td className="px-6 py-3.5 text-right text-slate-500 text-[11px]">{payment.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-slate-500 font-medium">
                  No fee records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 p-4 bg-slate-50 text-[11px] text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-600">
          <CreditCard size={14} />
          <span>Accept cash, bank transfers, and card transactions securely.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <DollarSign size={14} />
          <span>Current cycle generated on demand for fee verification.</span>
        </div>
      </div>
    </div>
  );
}
