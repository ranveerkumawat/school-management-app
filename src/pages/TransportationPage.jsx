import { Bus, RefreshCw } from 'lucide-react';

export default function TransportationPage({ vehicles, setVehicles }) {
  const activeVehicles = vehicles.filter((vehicle) => vehicle.status === 'Active').length;
  const totalCapacity = vehicles.reduce((sum, vehicle) => sum + vehicle.capacity, 0);
  const assignedStudents = vehicles.reduce((sum, vehicle) => sum + vehicle.assignedStudents, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Transit Fleet Vehicles</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{vehicles.length}</p>
          <p className="text-[10px] text-slate-400 mt-1">{activeVehicles} active, {vehicles.length - activeVehicles} maintenance</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Transit Users Count</p>
          <p className="text-2xl font-black text-teal-600 mt-1">{assignedStudents} Students</p>
          <p className="text-[10px] text-slate-400 mt-1">Assigned to regular routes</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Fuel Allocation Fund</p>
          <p className="text-2xl font-black text-slate-900 mt-1">₹48,000</p>
          <p className="text-[10px] text-slate-400 mt-1">Budgeted for this semester</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Route Safety Rating</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">A+ Certified</p>
          <p className="text-[10px] text-slate-400 mt-1">GPS and CCTV equipped</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Vehicle Fleet & School Route Management</h4>
            <p className="text-xs text-slate-500">Monitor driver duties, registration numbers, and optimize passenger capacity</p>
          </div>
          <button
            onClick={() => setVehicles(vehicles.map((v) => ({ ...v, assignedStudents: Math.min(v.capacity, v.assignedStudents || 0) })))}
            className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-2"
          >
            <RefreshCw size={14} /> Sync Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="px-6 py-4">Vehicle ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Plate No.</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-4 font-mono font-bold text-slate-700">{vehicle.id}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[11px]">{vehicle.type}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{vehicle.plate}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{vehicle.driver}</td>
                  <td className="px-6 py-4 text-teal-800 font-semibold">{vehicle.route}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{vehicle.assignedStudents} / {vehicle.capacity}</span>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-teal-500 h-full rounded-full" style={{ width: `${(vehicle.assignedStudents / vehicle.capacity) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${vehicle.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setVehicles(vehicles.map((item) => item.id === vehicle.id ? { ...item, status: item.status === 'Active' ? 'Under Maintenance' : 'Active', assignedStudents: item.status === 'Active' ? 0 : Math.min(item.capacity, item.assignedStudents || 25) } : item))}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded transition-colors"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
