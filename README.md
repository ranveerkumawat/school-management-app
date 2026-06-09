# Apex School ERP Admin Dashboard

![Apex School ERP](./screenshots/dashboard-placeholder.png)

A modern React + Vite administration dashboard for a school ERP system. This project provides a clean, responsive interface to manage student data, staff attendance, fee collections, payroll, transportation, events, secure question papers, and notice board announcements.

## 🚀 Features

- Dashboard overview with attendance, notices, calendar, finance, and transport summaries
- Student directory with search, filters, attendance toggle, and record deletion
- Teacher and staff management with search, department/role filtering, and attendance toggles
- Fee management and salary payroll dashboards with filter controls
- Transportation fleet tracking and route assignment display
- School calendar with event creation and event listing
- Secure question paper access flow for admin-only content
- Notice board creation, preview, and deletion
- Mock data reset button for instant state rollback

## 📁 Project Structure

```text
School-Mangement-app/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── pages/
│   │   ├── CalendarPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── FeeManagementPage.jsx
│   │   ├── NoticeBoardPage.jsx
│   │   ├── QuestionPapersPage.jsx
│   │   ├── SalaryManagementPage.jsx
│   │   ├── StaffPage.jsx
│   │   ├── StudentsPage.jsx
│   │   └── TransportationPage.jsx
│   ├── utils/
│   │   ├── formatUtils.js
│   │   └── initialData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🧩 Main Components

- `src/App.jsx` - Main application shell, routing logic, global state, and page rendering
- `src/pages/DashboardPage.jsx` - Summary cards, attendance previews, notices, and event quicklinks
- `src/pages/StudentsPage.jsx` - Student ledger with search, grade and payment filters, and attendance toggles
- `src/pages/StaffPage.jsx` - Personnel directory for teachers and support staff with search and department filters
- `src/pages/FeeManagementPage.jsx` - Fee collection management UI
- `src/pages/SalaryManagementPage.jsx` - Payroll status and salary filters
- `src/pages/TransportationPage.jsx` - Fleet status and route assignment overview
- `src/pages/CalendarPage.jsx` - School calendar event management
- `src/pages/QuestionPapersPage.jsx` - Secure question paper approval workflow for admin-level access
- `src/pages/NoticeBoardPage.jsx` - Notice creation, publication, and board management
- `src/components/layout/Sidebar.jsx` - Navigation menu and app layout shell
- `src/utils/formatUtils.js` - Currency formatting and UI badge utilities
- `src/utils/initialData.js` - Mock dataset for students, staff, vehicles, events, papers, and notices

## 🛠️ Technologies Used

- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React icons
- PostCSS + Autoprefixer

## 📦 Dependencies

- `react`
- `react-dom`
- `lucide-react`

### Dev Dependencies

- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `tailwindcss-animate`

## ⚙️ Prerequisites

- Node.js 18+ installed
- npm installed

## 💻 Installation

```bash
npm install
```

## ▶️ Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal to preview the dashboard.

## 📦 Build for Production

```bash
npm run build
```

## 🔍 Preview Production Build

```bash
npm run preview
```

## 🧭 Usage & Workflows

### Dashboard
- View high-level attendance, issue summaries, upcoming events, and financial totals
- Jump directly to key modules using dashboard quick links

### Students
- Search by name, student ID, or guardian name
- Filter by class or fee status
- Toggle attendance and delete mock student records

### Teachers / Staff
- Search and filter by role or department
- Toggle presence status for staff and teachers
- Monitor salary payment status at a glance

### Fee & Salary Management
- Manage payment and payroll filters for the school ERP workflow
- Review unpaid dues and pending salary totals

### Transportation
- Track buses and vans with route assignments and driver details

### School Calendar
- Add events, view upcoming schedule entries, and preview term events

### Question Papers
- Admin-only secure flow requiring demo passcode `admin123`
- Approve or review question paper submissions

### Notice Board
- Publish new announcements
- Remove outdated or resolved notices
- View board announcements with priority and category labels

## 🧪 Troubleshooting

- If styles are missing, confirm `index.css` is imported in `src/main.jsx`
- If the dev server fails to start, run `npm install` again and verify Node.js version
- If Tailwind classes do not render, ensure `tailwind.config.js` and `postcss.config.js` are present
- For build issues, delete `node_modules` and `package-lock.json`, then run `npm install`

## 🤝 Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-change`
3. Commit your changes: `git commit -m "Add feature description"`
4. Push to your branch: `git push origin feature/my-change`
5. Open a pull request and describe the change

## 📄 License

This repository does not include a license file.

> Add a `LICENSE` file to define legal usage and distribution terms.

## 📌 Notes

- This project is implemented in JavaScript only (no TypeScript)
- The UI uses reusable page components and Tailwind-based layout
- Mock datasets are seeded directly from `src/utils/initialData.js`

---

Made with React, Vite, and Tailwind CSS for a clean school ERP admin experience.