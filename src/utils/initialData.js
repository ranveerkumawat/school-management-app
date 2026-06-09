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
} from 'lucide-react';

export const INITIAL_STUDENTS = [
  { id: 'STU-2026-001', name: 'Aarav Sharma', class: '10-A', attendance: 'Present', roll: 12, transport: 'Route A', feeStatus: 'Paid', dues: 0, guardian: 'Rajesh Sharma', phone: '+91 98765 43210' },
  { id: 'STU-2026-002', name: 'Isha Patel', class: '12-B', attendance: 'Present', roll: 24, transport: 'Route B', feeStatus: 'Pending', dues: 12000, guardian: 'Amit Patel', phone: '+91 98765 43211' },
  { id: 'STU-2026-003', name: 'Reyansh Gupta', class: '9-A', attendance: 'Absent', roll: 31, transport: 'Self', feeStatus: 'Overdue', dues: 24000, guardian: 'Sanjay Gupta', phone: '+91 98765 43212' },
  { id: 'STU-2026-004', name: 'Ananya Rao', class: '10-A', attendance: 'Present', roll: 4, transport: 'Route A', feeStatus: 'Paid', dues: 0, guardian: 'Kiran Rao', phone: '+91 98765 43213' },
  { id: 'STU-2026-005', name: 'Kabir Singh', class: '11-C', attendance: 'Present', roll: 15, transport: 'Route C', feeStatus: 'Paid', dues: 0, guardian: 'Harpreet Singh', phone: '+91 98765 43214' },
  { id: 'STU-2026-006', name: 'Diya Malhotra', class: '12-B', attendance: 'Absent', roll: 8, transport: 'Route B', feeStatus: 'Pending', dues: 15000, guardian: 'Vikram Malhotra', phone: '+91 98765 43215' },
  { id: 'STU-2026-007', name: 'Sai Prasad', class: '8-A', attendance: 'Present', roll: 19, transport: 'Self', feeStatus: 'Paid', dues: 0, guardian: 'Raman Prasad', phone: '+91 98765 43216' },
  { id: 'STU-2026-008', name: 'Meera Nair', class: '10-B', attendance: 'Present', roll: 11, transport: 'Route A', feeStatus: 'Overdue', dues: 8000, guardian: 'Gopal Nair', phone: '+91 98765 43217' },
];

export const INITIAL_STAFF = [
  { id: 'TCH-001', name: 'Dr. Ramesh Verma', role: 'Teacher', subject: 'Mathematics', classes: ['10-A', '12-B'], attendance: 'Present', phone: '+91 99112 23344', email: 'r.verma@school.edu', salary: 75000, salaryStatus: 'Paid' },
  { id: 'TCH-002', name: 'Mrs. Sarah Jones', role: 'Teacher', subject: 'English Literature', classes: ['11-C', '12-B'], attendance: 'Present', phone: '+91 99112 23345', email: 's.jones@school.edu', salary: 68000, salaryStatus: 'Paid' },
  { id: 'TCH-003', name: 'Mr. Anil Mehta', role: 'Teacher', subject: 'Physics', classes: ['11-A', '12-A'], attendance: 'Absent', phone: '+91 99112 23346', email: 'a.mehta@school.edu', salary: 72000, salaryStatus: 'Pending' },
  { id: 'STF-101', name: 'Ms. Priya Desai', role: 'Administrator', department: 'Admissions', attendance: 'Present', phone: '+91 99112 23347', email: 'p.desai@school.edu', salary: 55000, salaryStatus: 'Paid' },
  { id: 'STF-102', name: 'Mr. John Peterson', role: 'IT Administrator', department: 'Infrastructure', attendance: 'Present', phone: '+91 99112 23348', email: 'j.peter@school.edu', salary: 62000, salaryStatus: 'Paid' },
  { id: 'STF-103', name: 'Mr. Gagan Yadav', role: 'Transport Staff', duty: 'Bus Route A Driver', attendance: 'Present', phone: '+91 99112 23349', email: 'g.yadav@school.edu', salary: 32000, salaryStatus: 'Paid' },
  { id: 'STF-104', name: 'Mrs. Shanti Devi', role: 'Support Staff', duty: 'Housekeeping Head', attendance: 'Present', phone: '+91 99112 23350', email: 's.devi@school.edu', salary: 22000, salaryStatus: 'Pending' },
];

export const INITIAL_VEHICLES = [
  { id: 'VEH-BUS-01', type: 'Bus', plate: 'DL 1PA 4210', driver: 'Gagan Yadav', route: 'Route A - North Sector', capacity: 50, assignedStudents: 32, status: 'Active' },
  { id: 'VEH-BUS-02', type: 'Bus', plate: 'DL 1PA 7785', driver: 'Manish Kumar', route: 'Route B - South Extension', capacity: 50, assignedStudents: 41, status: 'Active' },
  { id: 'VEH-VAN-01', type: 'Van', plate: 'DL 3CA 1102', driver: 'Satish Pal', route: 'Route C - Airport Suburbs', capacity: 15, assignedStudents: 12, status: 'Active' },
  { id: 'VEH-BUS-03', type: 'Bus', plate: 'DL 1PA 8820', driver: 'Harish Rawat', route: 'Route D - West Ridge', capacity: 50, assignedStudents: 0, status: 'Under Maintenance' },
];

export const INITIAL_EVENTS = [
  { id: 'EVT-01', title: 'First Term Examinations', date: '2026-06-15', type: 'Exam', description: 'Standardized assessments for grades 6 to 12.', tagColor: 'red' },
  { id: 'EVT-02', title: 'Annual Science Exhibition', date: '2026-06-22', type: 'Function', description: 'Students showcasing science models & innovations.', tagColor: 'purple' },
  { id: 'EVT-03', title: 'Summer Camp Conclusion Ceremony', date: '2026-06-29', type: 'Event', description: 'Award distributions for music, arts, and robotics.', tagColor: 'blue' },
  { id: 'EVT-04', title: 'Independence Day Recess', date: '2026-08-15', type: 'Holiday', description: 'National Holiday - School remains completely closed.', tagColor: 'green' },
];

export const INITIAL_PAPERS = [
  { id: 'QP-1042', subject: 'Advanced Physics', class: '12-A', creator: 'Mr. Anil Mehta', examType: 'Term 1', secureStatus: 'Approved', uploadedOn: '2026-06-02', code: 'PHY-12-T1' },
  { id: 'QP-1043', subject: 'Calculus & Algebra', class: '12-B', creator: 'Dr. Ramesh Verma', examType: 'Term 1', secureStatus: 'Pending Review', uploadedOn: '2026-06-05', code: 'MATH-12-T1' },
  { id: 'QP-1044', subject: 'English Literature - Shakespeare Focus', class: '11-C', creator: 'Mrs. Sarah Jones', examType: 'Mid-Term', secureStatus: 'Draft', uploadedOn: '2026-06-08', code: 'ENG-11-MT' },
  { id: 'QP-1045', subject: 'Inorganic Chemistry', class: '11-A', creator: 'Dr. Ramesh Verma', examType: 'Term 1', secureStatus: 'Approved', uploadedOn: '2026-05-29', code: 'CHEM-11-T1' },
];

export const INITIAL_NOTICES = [
  { id: 'NTC-301', title: 'Term-1 Tuition Fee Reminders', category: 'Fee Notice', date: '2026-06-08', priority: 'High', target: 'All Parents', content: 'This is to remind all guardians that Term-1 fee submission deadline has passed. Late fee charges will apply starting next week. Please pay online via the dashboard to avoid penalties.' },
  { id: 'NTC-302', title: 'Emergency Water Main Maintenance', category: 'Emergency', date: '2026-06-09', priority: 'Urgent', target: 'All Students & Staff', content: 'Notice: The drinking water facility block B will experience temporary shutdown today from 2 PM to 4 PM. Alternative mineral water dispensers have been arranged in the cafeteria.' },
  { id: 'NTC-303', title: "Teacher's Professional Development Seminar", category: 'Teacher Notice', date: '2026-06-12', priority: 'Medium', target: 'Teachers Only', content: "A seminar on 'Implementing Active Learning Methodologies in K-12' will be held in the main conference hall. Attendance is mandatory for all primary and secondary grade teachers." },
  { id: 'NTC-304', title: 'Sports Club Selection Trials', category: 'Student Notice', date: '2026-06-06', priority: 'Low', target: 'Students', content: 'Trials for Football, Basketball, and Athletics teams will take place at the school stadium. Interested students can register with their class teachers.' },
];

export const SIDEBAR_MENU = [
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
