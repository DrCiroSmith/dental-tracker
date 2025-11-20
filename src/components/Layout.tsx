import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, PlusCircle, FileClock, Settings, GraduationCap } from 'lucide-react';
import clsx from 'clsx';

export default function Layout() {
    const navItems = [
        { to: "/", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/clinics", icon: Building2, label: "Clinics" },
        { to: "/log-hours", icon: PlusCircle, label: "Log Hours" },
        { to: "/activity-logs", icon: FileClock, label: "Activity Logs" },
        { to: "/admissions-guide", icon: GraduationCap, label: "Admissions Guide" },
        { to: "/settings", icon: Settings, label: "Settings" },
    ];

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-full shrink-0">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-teal-700">Dental Tracker</h1>
                    <p className="text-xs text-gray-500 mt-1">Shadowing & Volunteering</p>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-teal-50 text-teal-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                <header className="md:hidden bg-white border-b border-gray-200 p-4 shrink-0 z-10">
                    <h1 className="text-lg font-bold text-teal-700">Dental Tracker</h1>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 w-full scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-20">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => clsx(
                            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                            isActive
                                ? "text-teal-600"
                                : "text-gray-500 hover:text-gray-900"
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
