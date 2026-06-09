import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  Receipt,
  Wallet,
  Bus,
  Calendar,
  FileText,
  Bell,
  Search,
  ShieldAlert,
  Plus,
  CheckCircle,
  Clock,
  Eye,
  AlertTriangle,
  Menu,
  X,
  ArrowUpRight,
  Download,
  RefreshCw,
  Lock,
  Trash2,
} from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import StaffPage from './pages/StaffPage';
import FeeManagementPage from './pages/FeeManagementPage';
import SalaryManagementPage from './pages/SalaryManagementPage';
import TransportationPage from './pages/TransportationPage';
import CalendarPage from './pages/CalendarPage';
import QuestionPapersPage from './pages/QuestionPapersPage';
import NoticeBoardPage from './pages/NoticeBoardPage';
import { formatCurrency } from './utils/formatUtils';

const INITIAL_STUDENTS = [
  { id: 'STU-2026-001', name: 'Aarav Sharma', class: '10-A', attendance: 'Present', roll: 12, transport: 'Route A', feeStatus: 'Paid', dues: 0, guardian: 'Rajesh Sharma', phone: '+91 98765 43210' },
  { id: 'STU-2026-002', name: 'Isha Patel', class: '12-B', attendance: 'Present', roll: 24, transport: 'Route B', feeStatus: 'Pending', dues: 12000, guardian: 'Amit Patel', phone: '+91 98765 43211' },
  { id: 'STU-2026-003', name: 'Reyansh Gupta', class: '9-A', attendance: 'Absent', roll: 31, transport: 'Self', feeStatus: 'Overdue', dues: 24000, guardian: 'Sanjay Gupta', phone: '+91 98765 43212' },
  { id: 'STU-2026-004', name: 'Ananya Rao', class: '10-A', attendance: 'Present', roll: 4, transport: 'Route A', feeStatus: 'Paid', dues: 0, guardian: 'Kiran Rao', phone: '+91 98765 43213' },
  { id: 'STU-2026-005', name: 'Kabir Singh', class: '11-C', attendance: 'Present', roll: 15, transport: 'Route C', feeStatus: 'Paid', dues: 0, guardian: 'Harpreet Singh', phone: '+91 98765 43214' },
  { id: 'STU-2026-006', name: 'Diya Malhotra', class: '12-B', attendance: 'Absent', roll: 8, transport: 'Route B', feeStatus: 'Pending', dues: 15000, guardian: 'Vikram Malhotra', phone: '+91 98765 43215' },
  { id: 'STU-2026-007', name: 'Sai Prasad', class: '8-A', attendance: 'Present', roll: 19, transport: 'Self', feeStatus: 'Paid', dues: 0, guardian: 'Raman Prasad', phone: '+91 98765 43216' },
  { id: 'STU-2026-008', name: 'Meera Nair', class: '10-B', attendance: 'Present', roll: 11, transport: 'Route A', feeStatus: 'Overdue', dues: 8000, guardian: 'Gopal Nair', phone: '+91 98765 43217' },
];

const INITIAL_STAFF = [
  { id: 'TCH-001', name: 'Dr. Ramesh Verma', role: 'Teacher', subject: 'Mathematics', classes: ['10-A', '12-B'], attendance: 'Present', phone: '+91 99112 23344', email: 'r.verma@school.edu', salary: 75000, salaryStatus: 'Paid' },
  { id: 'TCH-002', name: 'Mrs. Sarah Jones', role: 'Teacher', subject: 'English Literature', classes: ['11-C', '12-B'], attendance: 'Present', phone: '+91 99112 23345', email: 's.jones@school.edu', salary: 68000, salaryStatus: 'Paid' },
  { id: 'TCH-003', name: 'Mr. Anil Mehta', role: 'Teacher', subject: 'Physics', classes: ['11-A', '12-A'], attendance: 'Absent', phone: '+91 99112 23346', email: 'a.mehta@school.edu', salary: 72000, salaryStatus: 'Pending' },
  { id: 'STF-101', name: 'Ms. Priya Desai', role: 'Administrator', department: 'Admissions', attendance: 'Present', phone: '+91 99112 23347', email: 'p.desai@school.edu', salary: 55000, salaryStatus: 'Paid' },
  { id: 'STF-102', name: 'Mr. John Peterson', role: 'IT Administrator', department: 'Infrastructure', attendance: 'Present', phone: '+91 99112 23348', email: 'j.peter@school.edu', salary: 62000, salaryStatus: 'Paid' },
  { id: 'STF-103', name: 'Mr. Gagan Yadav', role: 'Transport Staff', duty: 'Bus Route A Driver', attendance: 'Present', phone: '+91 99112 23349', email: 'g.yadav@school.edu', salary: 32000, salaryStatus: 'Paid' },
  { id: 'STF-104', name: 'Mrs. Shanti Devi', role: 'Support Staff', duty: 'Housekeeping Head', attendance: 'Present', phone: '+91 99112 23350', email: 's.devi@school.edu', salary: 22000, salaryStatus: 'Pending' },
];

const INITIAL_VEHICLES = [
  { id: 'VEH-BUS-01', type: 'Bus', plate: 'DL 1PA 4210', driver: 'Gagan Yadav', route: 'Route A - North Sector', capacity: 50, assignedStudents: 32, status: 'Active' },
  { id: 'VEH-BUS-02', type: 'Bus', plate: 'DL 1PA 7785', driver: 'Manish Kumar', route: 'Route B - South Extension', capacity: 50, assignedStudents: 41, status: 'Active' },
  { id: 'VEH-VAN-01', type: 'Van', plate: 'DL 3CA 1102', driver: 'Satish Pal', route: 'Route C - Airport Suburbs', capacity: 15, assignedStudents: 12, status: 'Active' },
  { id: 'VEH-BUS-03', type: 'Bus', plate: 'DL 1PA 8820', driver: 'Harish Rawat', route: 'Route D - West Ridge', capacity: 50, assignedStudents: 0, status: 'Under Maintenance' },
];

const INITIAL_EVENTS = [
  { id: 'EVT-01', title: 'First Term Examinations', date: '2026-06-15', type: 'Exam', description: 'Standardized assessments for grades 6 to 12.', tagColor: 'red' },
  { id: 'EVT-02', title: 'Annual Science Exhibition', date: '2026-06-22', type: 'Function', description: 'Students showcasing science models & innovations.', tagColor: 'purple' },
  { id: 'EVT-03', title: 'Summer Camp Conclusion Ceremony', date: '2026-06-29', type: 'Event', description: 'Award distributions for music, arts, and robotics.', tagColor: 'blue' },
  { id: 'EVT-04', title: 'Independence Day Recess', date: '2026-08-15', type: 'Holiday', description: 'National Holiday - School remains completely closed.', tagColor: 'green' },
];

const INITIAL_PAPERS = [
  { id: 'QP-1042', subject: 'Advanced Physics', class: '12-A', creator: 'Mr. Anil Mehta', examType: 'Term 1', secureStatus: 'Approved', uploadedOn: '2026-06-02', code: 'PHY-12-T1' },
  { id: 'QP-1043', subject: 'Calculus & Algebra', class: '12-B', creator: 'Dr. Ramesh Verma', examType: 'Term 1', secureStatus: 'Pending Review', uploadedOn: '2026-06-05', code: 'MATH-12-T1' },
  { id: 'QP-1044', subject: 'English Literature - Shakespeare Focus', class: '11-C', creator: 'Mrs. Sarah Jones', examType: 'Mid-Term', secureStatus: 'Draft', uploadedOn: '2026-06-08', code: 'ENG-11-MT' },
  { id: 'QP-1045', subject: 'Inorganic Chemistry', class: '11-A', creator: 'Dr. Ramesh Verma', examType: 'Term 1', secureStatus: 'Approved', uploadedOn: '2026-05-29', code: 'CHEM-11-T1' },
];

const INITIAL_NOTICES = [
  { id: 'NTC-301', title: 'Term-1 Tuition Fee Reminders', category: 'Fee Notice', date: '2026-06-08', priority: 'High', target: 'All Parents', content: 'This is to remind all guardians that Term-1 fee submission deadline has passed. Late fee charges will apply starting next week. Please pay online via the dashboard to avoid penalties.' },
  { id: 'NTC-302', title: 'Emergency Water Main Maintenance', category: 'Emergency', date: '2026-06-09', priority: 'Urgent', target: 'All Students & Staff', content: 'Notice: The drinking water facility block B will experience temporary shutdown today from 2 PM to 4 PM. Alternative mineral water dispensers have been arranged in the cafeteria.' },
  { id: 'NTC-303', title: "Teacher's Professional Development Seminar", category: 'Teacher Notice', date: '2026-06-12', priority: 'Medium', target: 'Teachers Only', content: "A seminar on 'Implementing Active Learning Methodologies in K-12' will be held in the main conference hall. Attendance is mandatory for all primary and secondary grade teachers." },
  { id: 'NTC-304', title: 'Sports Club Selection Trials', category: 'Student Notice', date: '2026-06-06', priority: 'Low', target: 'Students', content: 'Trials for Football, Basketball, and Athletics teams will take place at the school stadium. Interested students can register with their class teachers.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [papers, setPapers] = useState(INITIAL_PAPERS);
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [feePaymentStatus, setFeePaymentStatus] = useState('All');
  const [paymentModeFilter, setPaymentModeFilter] = useState('All');
  const [overdueFilter, setOverdueFilter] = useState('All');
  const [payrollStatusFilter, setPayrollStatusFilter] = useState('All');
  const [paymentDateFilter, setPaymentDateFilter] = useState('All');
  const [securePaperCode, setSecurePaperCode] = useState('');
  const [isPaperAdminUnlocked, setIsPaperAdminUnlocked] = useState(false);
  const [securityError, setSecurityError] = useState('');

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '10-A',
    attendance: 'Present',
    transport: 'Self',
    feeStatus: 'Paid',
    dues: 0,
    guardian: '',
    phone: '',
  });

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'School Notices',
    priority: 'Medium',
    target: 'All Students & Staff',
    content: '',
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'Event',
    description: '',
    tagColor: 'blue',
  });

  const totalStudents = students.length;
  const presentStudents = students.filter((s) => s.attendance === 'Present').length;
  const absentStudents = totalStudents - presentStudents;
  const totalTeachers = staff.filter((s) => s.role === 'Teacher').length;
  const presentTeachers = staff.filter((s) => s.role === 'Teacher' && s.attendance === 'Present').length;
  const absentTeachers = totalTeachers - presentTeachers;
  const totalStaff = staff.length;
  const administratorsCount = staff.filter((s) => s.role === 'Administrator' || s.role === 'IT Administrator').length;
  const totalDues = students.reduce((acc, curr) => acc + curr.dues, 0);
  const paidSalaries = staff.filter((s) => s.salaryStatus === 'Paid').reduce((acc, curr) => acc + curr.salary, 0);
  const pendingSalaries = staff.filter((s) => s.salaryStatus === 'Pending').reduce((acc, curr) => acc + curr.salary, 0);
  const studentAttendancePercent = totalStudents ? ((presentStudents / totalStudents) * 100).toFixed(0) : '0';
  const paidPercentage = totalStudents ? ((students.filter((s) => s.feeStatus === 'Paid').length / totalStudents) * 100).toFixed(0) : '0';

  const handleAddStudent = (event) => {
    event.preventDefault();
    if (!newStudent.name || !newStudent.guardian) return;
    const newId = `STU-2026-00${students.length + 1}`;
    const formattedDues = Number(newStudent.dues) || 0;
    const formattedFeeStatus = formattedDues > 0 ? (newStudent.feeStatus === 'Paid' ? 'Pending' : newStudent.feeStatus) : 'Paid';
    setStudents([
      ...students,
      {
        ...newStudent,
        id: newId,
        dues: formattedDues,
        feeStatus: formattedFeeStatus,
        roll: students.length + 12,
      },
    ]);
    setNewStudent({ name: '', class: '10-A', attendance: 'Present', transport: 'Self', feeStatus: 'Paid', dues: 0, guardian: '', phone: '' });
    setShowAddStudentModal(false);
  };

  const handleAddNotice = (event) => {
    event.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    const newId = `NTC-${notices.length + 301}`;
    setNotices([{ ...newNotice, id: newId, date: new Date().toISOString().split('T')[0] }, ...notices]);
    setNewNotice({ title: '', category: 'School Notices', priority: 'Medium', target: 'All Students & Staff', content: '' });
    setShowAddNoticeModal(false);
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    const newId = `EVT-0${events.length + 1}`;
    setEvents([...events, { ...newEvent, id: newId }]);
    setNewEvent({ title: '', date: '', type: 'Event', description: '', tagColor: 'blue' });
    setShowAddEventModal(false);
  };

  const toggleStudentAttendance = (id) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, attendance: s.attendance === 'Present' ? 'Absent' : 'Present' } : s)));
  };

  const toggleStaffAttendance = (id) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, attendance: s.attendance === 'Present' ? 'Absent' : 'Present' } : s)));
  };

  const updateFeeStatus = (id, newStatus, newDues = 0) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, feeStatus: newStatus, dues: newStatus === 'Paid' ? 0 : newDues || s.dues } : s)));
  };

  const handleApprovePaper = (id) => {
    setPapers(papers.map((p) => (p.id === id ? { ...p, secureStatus: 'Approved' } : p)));
  };

  const handleUnlockQuestionPapers = (event) => {
    event.preventDefault();
    if (securePaperCode.toLowerCase() === 'admin123') {
      setIsPaperAdminUnlocked(true);
      setSecurityError('');
    } else {
      setSecurityError('Invalid Administrator Passcode. Access Denied.');
    }
  };

  const filteredStudents = useMemo(
    () =>
      students.filter((s) => {
        const searchLower = searchTerm.toLowerCase();
        const matchSearch =
          s.name.toLowerCase().includes(searchLower) ||
          s.id.toLowerCase().includes(searchLower) ||
          s.guardian.toLowerCase().includes(searchLower);
        const matchClass = classFilter === 'All' || s.class === classFilter;
        const matchFee = feeFilter === 'All' || s.feeStatus === feeFilter;
        return matchSearch && matchClass && matchFee;
      }),
    [students, searchTerm, classFilter, feeFilter]
  );

  const filteredStaff = useMemo(
    () =>
      staff.filter((s) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          s.name.toLowerCase().includes(searchLower) ||
          s.id.toLowerCase().includes(searchLower) ||
          s.role.toLowerCase().includes(searchLower) ||
          (s.department || '').toLowerCase().includes(searchLower);
        const matchesDepartment =
          departmentFilter === 'All' ||
          (s.department && s.department === departmentFilter) ||
          s.role === departmentFilter;
        const matchesRole = roleFilter === 'All' || s.role === roleFilter;
        return matchesSearch && matchesDepartment && matchesRole;
      }),
    [staff, searchTerm, departmentFilter, roleFilter]
  );

  const feePayments = useMemo(() => {
    const payments = students.map((student) => ({
      id: student.id,
      student: student.name,
      class: student.class,
      amount: student.dues,
      invoice: `INV-${student.roll.toString().padStart(4, '0')}`,
      mode: student.feeStatus === 'Paid' ? 'Bank Transfer' : 'Cash',
      status: student.feeStatus === 'Paid' ? 'Paid' : student.feeStatus,
      dueDate: '2026-06-30',
      notes: student.feeStatus === 'Overdue' ? 'Follow up required' : 'Auto billed',
    }));

    return payments.filter((payment) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        payment.student.toLowerCase().includes(searchLower) ||
        payment.invoice.toLowerCase().includes(searchLower) ||
        payment.notes.toLowerCase().includes(searchLower);
      const matchesStatus = feePaymentStatus === 'All' || payment.status === feePaymentStatus;
      const matchesMode = paymentModeFilter === 'All' || payment.mode === paymentModeFilter;
      const matchesOverdue =
        overdueFilter === 'All' ||
        (overdueFilter === 'Overdue' && payment.status === 'Overdue') ||
        (overdueFilter === 'DueSoon' && payment.status === 'Pending');
      return matchesSearch && matchesStatus && matchesMode && matchesOverdue;
    });
  }, [students, searchTerm, feePaymentStatus, paymentModeFilter, overdueFilter]);

  const staffPayroll = useMemo(
    () =>
      staff.filter((member) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          member.name.toLowerCase().includes(searchLower) ||
          member.id.toLowerCase().includes(searchLower) ||
          member.department?.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower);
        const matchesStatus = payrollStatusFilter === 'All' || member.salaryStatus === payrollStatusFilter;
        return matchesSearch && matchesStatus;
      }),
    [staff, searchTerm, payrollStatusFilter]
  );

  const sidebarMenu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: Users },
    { name: 'Teachers', icon: UserCheck },
    { name: 'Staff', icon: UserX },
    { name: 'Fee Management', icon: Receipt },
    { name: 'Salary Management', icon: Wallet },
    { name: 'Transportation', icon: Bus },
    { name: 'School Calendar', icon: Calendar },
    { name: 'Question Papers', icon: FileText, adminOnly: true },
    { name: 'Notice Board', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <aside
        className={`bg-slate-900 text-slate-300 w-64 fixed inset-y-0 left-0 z-40 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-0'
        } transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col border-r border-slate-800`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center space-x-2.5">
            <div className="bg-emerald-500 text-white p-1.5 rounded-lg font-bold text-lg tracking-wider">Edu</div>
            <div>
              <h1 className="text-white font-semibold text-sm leading-tight">Apex ERP</h1>
              <p className="text-[10px] text-emerald-400 font-medium">Administrator Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Main Controls</div>
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-150'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.name}</span>
                </div>
                {item.adminOnly && (
                  <span className="text-[9px] bg-red-900/60 text-red-300 border border-red-800/50 px-1.5 py-0.5 rounded font-mono">
                    SECURE
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">AD</div>
            <div>
              <p className="text-white font-medium">Headmaster Admin</p>
              <p className="text-[10px] text-emerald-400">Term Session 2026</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-600 hover:text-slate-900">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-slate-600 font-medium">Server Connected • Academic Term: June 2026</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative max-w-xs hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Global filter or ID lookup..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all w-60"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 hover:text-slate-600">
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => setActiveTab('Notice Board')}
              className="relative p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200"></div>

            <div className="flex items-center space-x-3 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-900">Dr. Alok Sen</p>
                <p className="text-[10px] font-medium text-emerald-600">Chief Registrar</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80"
                alt="Profile"
                className="w-9 h-9 rounded-full ring-2 ring-emerald-500 object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Apex School Suite &gt; Admin</div>
              <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
                {activeTab}
                <span className="text-xs font-normal text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full">Real-time ERP Module</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setStudents(INITIAL_STUDENTS);
                  setStaff(INITIAL_STAFF);
                  setVehicles(INITIAL_VEHICLES);
                  setEvents(INITIAL_EVENTS);
                  setPapers(INITIAL_PAPERS);
                  setNotices(INITIAL_NOTICES);
                  setSearchTerm('');
                  setClassFilter('All');
                  setFeeFilter('All');
                }}
                className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-200 inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <RefreshCw size={13} /> Reset Mock Database
              </button>

              {activeTab === 'Students' && (
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/10"
                >
                  <Plus size={14} /> Admit New Student
                </button>
              )}

              {activeTab === 'Notice Board' && (
                <button
                  onClick={() => setShowAddNoticeModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/10"
                >
                  <Plus size={14} /> Publish Notice
                </button>
              )}

              {activeTab === 'School Calendar' && (
                <button
                  onClick={() => setShowAddEventModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/10"
                >
                  <Plus size={14} /> Add Calendar Event
                </button>
              )}
            </div>
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">Student Registration</span>
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Users size={16} /></span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">{totalStudents}</h3>
                <div className="flex items-center gap-1.5 text-xs mt-1.5 text-slate-500">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-1 py-0.2 rounded text-[10px]">{presentStudents} Online</span>
                  <span>Currently present</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">Student Presenteeism</span>
                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><UserCheck size={16} /></span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-emerald-600">{studentAttendancePercent}%</h3>
                <div className="flex items-center gap-1.5 text-xs mt-1.5 text-slate-500">
                  <span className="bg-red-100 text-red-800 font-bold px-1 py-0.2 rounded text-[10px]">{absentStudents} Absent</span>
                  <span>Awaiting leave letters</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">Faculty Headcount</span>
                <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><UserCheck size={16} /></span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">{totalTeachers}</h3>
                <div className="flex items-center gap-1.5 text-xs mt-1.5 text-slate-500">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-1 py-0.2 rounded text-[10px]">{presentTeachers} Active</span>
                  <span>{absentTeachers} Absent today</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Operational Staff</span>
                <span className="p-1.5 bg-yellow-50 text-yellow-600 rounded-lg"><Users size={16} /></span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">{totalStaff}</h3>
                <div className="flex items-center gap-1.5 text-xs mt-1.5 text-slate-500">
                  <span className="bg-slate-100 text-slate-800 font-bold px-1 py-0.2 rounded text-[10px]">{administratorsCount} Admins</span>
                  <span>Running campus operations</span>
                </div>
              </div>
            </div>
          </section>

          {activeTab === 'Dashboard' && (
            <DashboardPage
              students={students}
              notices={notices}
              events={events}
              vehicles={vehicles}
              totalStudents={totalStudents}
              presentStudents={presentStudents}
              absentStudents={absentStudents}
              totalTeachers={totalTeachers}
              presentTeachers={presentTeachers}
              absentTeachers={absentTeachers}
              totalStaff={totalStaff}
              administratorsCount={administratorsCount}
              totalDues={totalDues}
              setActiveTab={setActiveTab}
              setShowAddNoticeModal={setShowAddNoticeModal}
              setShowAddEventModal={setShowAddEventModal}
              setSelectedNotice={setSelectedNotice}
            />
          )}

          {activeTab === 'Students' && (
            <StudentsPage
              filteredStudents={filteredStudents}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              classFilter={classFilter}
              onClassFilterChange={setClassFilter}
              feeFilter={feeFilter}
              onFeeFilterChange={setFeeFilter}
              toggleStudentAttendance={toggleStudentAttendance}
              deleteStudent={(id) => setStudents(students.filter((s) => s.id !== id))}
            />
          )}

          {(activeTab === 'Teachers' || activeTab === 'Staff') && (
            <StaffPage
              activeCategory={activeTab}
              filteredStaff={filteredStaff}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              departmentFilter={departmentFilter}
              onDepartmentFilterChange={setDepartmentFilter}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              toggleStaffPresence={toggleStaffAttendance}
            />
          )}

          {activeTab === 'Fee Management' && (
            <FeeManagementPage
              feePayments={feePayments}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={feePaymentStatus}
              onStatusFilterChange={setFeePaymentStatus}
              paymentModeFilter={paymentModeFilter}
              onPaymentModeFilterChange={setPaymentModeFilter}
              overdueFilter={overdueFilter}
              onOverdueFilterChange={setOverdueFilter}
            />
          )}

          {activeTab === 'Salary Management' && (
            <SalaryManagementPage
              staffPayroll={staffPayroll}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              payrollStatusFilter={payrollStatusFilter}
              onPayrollStatusFilterChange={setPayrollStatusFilter}
              paymentDateFilter={paymentDateFilter}
              onPaymentDateFilterChange={setPaymentDateFilter}
            />
          )}

          {activeTab === 'Transportation' && (
            <TransportationPage vehicles={vehicles} setVehicles={setVehicles} />
          )}

          {activeTab === 'School Calendar' && (
            <CalendarPage events={events} setEvents={setEvents} setShowAddEventModal={setShowAddEventModal} />
          )}

          {activeTab === 'Question Papers' && (
            <QuestionPapersPage
              papers={papers}
              isPaperAdminUnlocked={isPaperAdminUnlocked}
              securePaperCode={securePaperCode}
              setSecurePaperCode={setSecurePaperCode}
              securityError={securityError}
              setIsPaperAdminUnlocked={setIsPaperAdminUnlocked}
              handleUnlockQuestionPapers={handleUnlockQuestionPapers}
              handleApprovePaper={handleApprovePaper}
            />
          )}

          {activeTab === 'Notice Board' && (
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
                    <div
                      key={notice.id}
                      className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                notice.priority === 'Urgent'
                                  ? 'bg-red-100 text-red-800'
                                  : notice.priority === 'High'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
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
          )}
        </main>

        <footer className="py-6 px-8 text-center text-[11px] text-slate-400 border-t border-slate-200/60 bg-white">
          <p>© 2026 Apex K-12 Cloud ERP Suite. All Rights Reserved. Fully Certified & Watermarked Sandbox Server.</p>
        </footer>
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden transition-all duration-150">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Bulletin: {selectedNotice.id}</span>
              <button onClick={() => setSelectedNotice(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded">{selectedNotice.category}</span>
                <span className="text-xs text-slate-400">{selectedNotice.date}</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base leading-snug">{selectedNotice.title}</h4>
              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{selectedNotice.content}</p>
              <div className="text-xs text-slate-400 flex justify-between font-medium">
                <span>Priority: <b>{selectedNotice.priority}</b></span>
                <span>Audience Target: <b>{selectedNotice.target}</b></span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setSelectedNotice(null)} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddStudent} className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden transition-all duration-150">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Admit Student to Sandbox ERP</h4>
              <button type="button" onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sen"
                  value={newStudent.name}
                  onChange={(event) => setNewStudent({ ...newStudent, name: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Assigned Grade</label>
                  <select
                    value={newStudent.class}
                    onChange={(event) => setNewStudent({ ...newStudent, class: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  >
                    <option value="8-A">8-A</option>
                    <option value="9-A">9-A</option>
                    <option value="10-A">10-A</option>
                    <option value="11-C">11-C</option>
                    <option value="12-B">12-B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Transit Assignment</label>
                  <select
                    value={newStudent.transport}
                    onChange={(event) => setNewStudent({ ...newStudent, transport: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  >
                    <option value="Self">Self Drive / Walk</option>
                    <option value="Route A">Bus Route A</option>
                    <option value="Route B">Bus Route B</option>
                    <option value="Route C">Van Route C</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Pending Dues Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newStudent.dues}
                    onChange={(event) => setNewStudent({ ...newStudent, dues: Number(event.target.value) })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Initial Status</label>
                  <select
                    value={newStudent.feeStatus}
                    onChange={(event) => setNewStudent({ ...newStudent, feeStatus: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  >
                    <option value="Paid">Fully Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Guardian Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sen"
                  value={newStudent.guardian}
                  onChange={(event) => setNewStudent({ ...newStudent, guardian: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Guardian Mobile</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 00000"
                  value={newStudent.phone}
                  onChange={(event) => setNewStudent({ ...newStudent, phone: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}

      {showAddNoticeModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddNotice} className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden transition-all duration-150">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Publish Notice Board Announcement</h4>
              <button type="button" onClick={() => setShowAddNoticeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Fair Registration Details"
                  value={newNotice.title}
                  onChange={(event) => setNewNotice({ ...newNotice, title: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Category Group</label>
                  <select
                    value={newNotice.category}
                    onChange={(event) => setNewNotice({ ...newNotice, category: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  >
                    <option value="School Notices">School Notices</option>
                    <option value="Fee Notice">Fee Notice</option>
                    <option value="Student Notice">Student Notice</option>
                    <option value="Teacher Notice">Teacher Notice</option>
                    <option value="Emergency">Emergency Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Severity / Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(event) => setNewNotice({ ...newNotice, priority: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. All Parents & Staff"
                  value={newNotice.target}
                  onChange={(event) => setNewNotice({ ...newNotice, target: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Notice Content</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Draft clear detailed instructions for the target group..."
                  value={newNotice.content}
                  onChange={(event) => setNewNotice({ ...newNotice, content: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddNoticeModal(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      )}

      {showAddEventModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddEvent} className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden transition-all duration-150">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Add Academic Event or Holiday</h4>
              <button type="button" onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Exhibition"
                  value={newEvent.title}
                  onChange={(event) => setNewEvent({ ...newEvent, title: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(event) => setNewEvent({ ...newEvent, date: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Classification Type</label>
                  <select 
                    value={newEvent.type}
                    onChange={(event) => setNewEvent({ ...newEvent, type: event.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Function">Function</option>
                    <option value="Event">Co-curricular Event</option>
                    <option value="Holiday">National Holiday</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Badge Color Theme</label>
                <select
                  value={newEvent.tagColor}
                  onChange={(event) => setNewEvent({ ...newEvent, tagColor: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                >
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Short brief on guidelines, timings, or target grades..."
                  value={newEvent.description}
                  onChange={(event) => setNewEvent({ ...newEvent, description: event.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddEventModal(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                Schedule Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
