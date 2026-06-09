import { Search, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
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
  updateFeeStatus,
}) {
  const [toast, setToast] = useState(null);

  const outstandingPayments = feePayments.filter(p => p.status !== 'Paid');
  const totalOutstanding = outstandingPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingStudentsCount = outstandingPayments.length;
  
  const paidPayments = feePayments.filter(p => p.status === 'Paid');
  const paidPercentage = feePayments.length ? Math.round((paidPayments.length / feePayments.length) * 100) : 0;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (payment) => {
    try {
      if (payment.status === 'Paid') {
        // Revoke payment - assigning a mock default due value for a pending state
        updateFeeStatus(payment.id, 'Pending', 15000); 
        showToast(`Payment revoked for ${payment.student}.`, 'success');
      } else {
        // Mark as paid
        updateFeeStatus(payment.id, 'Paid', 0);
        showToast(`Payment marked as paid for ${payment.student}.`, 'success');
      }
    } catch (error) {
      showToast('Failed to perform action. Please try again.', 'error');
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Outstanding Dues</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-red-600">{formatCurrency(totalOutstanding)}</h3>
            <div className="text-[11px] mt-1.5 text-slate-400">
              Total pending from {outstandingStudentsCount} students
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Fully Paid Status</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-600">{paidPercentage}%</h3>
            <div className="text-[11px] mt-1.5 text-slate-400">
              {paidPayments.length} Completed records
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Pending Reminders Sent</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-indigo-600">42 Alerts</h3>
            <div className="text-[11px] mt-1.5 text-slate-400">
              SMS & E-mail alerts delivered
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Est. Monthly Collection</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">₹4,50,000</h3>
            <div className="text-[11px] mt-1.5 text-slate-400">
              All classes consolidated
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Student Fee Defaulter & Accounts Register</h4>
            <p className="text-xs text-slate-500">Record incoming offline payments or adjust tuition concessions here</p>
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
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Grade Class</th>
                <th className="px-6 py-4">Assigned Dues</th>
                <th className="px-6 py-4">Fee Status Label</th>
                <th className="px-6 py-4">Guardian Contact</th>
                <th className="px-6 py-4">Instant Ledger Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feePayments.length > 0 ? (
                feePayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/80 transition-all">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-xs">{payment.student}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{payment.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-bold">{payment.class}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${payment.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : payment.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700">{payment.guardian}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{payment.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {payment.status === 'Paid' ? (
                        <button
                          onClick={() => handleAction(payment)}
                          className="text-red-600 bg-red-50 hover:bg-red-100 font-bold text-[10px] px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5 min-w-[110px] justify-center"
                        >
                          Revoke Payment
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(payment)}
                          className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-bold text-[10px] px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5 min-w-[110px] justify-center"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-500 font-medium">
                    No fee records match the selected filters.
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
