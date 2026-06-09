export function formatCurrency(amount) {
  return `₹${amount.toLocaleString()}`;
}

export function eventTagClasses(tagColor) {
  const mapping = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
  };
  return mapping[tagColor] || mapping.blue;
}

export function statusBadgeClasses(label, type) {
  if (type === 'fee') {
    if (label === 'Paid') return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    if (label === 'Pending') return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
    return 'bg-red-50 text-red-800 border border-red-200';
  }

  if (type === 'salary') {
    return label === 'Paid' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200';
  }

  return 'bg-slate-100 text-slate-800';
}

export function priorityBadgeClasses(priority) {
  if (priority === 'Urgent') return 'bg-red-100 text-red-800';
  if (priority === 'High') return 'bg-orange-100 text-orange-800';
  return 'bg-slate-200 text-slate-700';
}
