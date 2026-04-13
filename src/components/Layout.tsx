import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, PlusCircle, FileClock, Settings, GraduationCap, Moon, Sun, ClipboardList } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
    const { theme, toggleTheme } = useTheme();
    const navItems = [
        { to: "/", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/clinics", icon: Building2, label: "Clinics" },
        { to: "/log-hours", icon: PlusCircle, label: "Log Hours" },
        { to: "/activity-logs", icon: FileClock, label: "Activity Logs" },
        { to: "/admissions-guide", icon: GraduationCap, label: "Admissions Guide" },
        { to: "/mock-exam", icon: ClipboardList, label: "Mock Exam" },
        { to: "/settings", icon: Settings, label: "Settings" },
    ];

    return (
        <div className="h-dvh bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full shrink-0">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <NavLink to="/" className="block hover:opacity-80 transition-opacity">
                        <h1 className="text-xl font-bold text-teal-700 dark:text-teal-400">Dental Tracker</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Shadowing & Volunteering</p>
                    </NavLink>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shrink-0 z-10 flex items-center justify-between">
                    <NavLink to="/" className="block hover:opacity-80 transition-opacity">
                        <h1 className="text-lg font-bold text-teal-700 dark:text-teal-400">Dental Tracker</h1>
                    </NavLink>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-[500px] md:pb-8 w-full scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center z-20">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => clsx(
                            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                            isActive
                                ? "text-teal-600 dark:text-teal-400"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        )}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
