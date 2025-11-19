import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Clock } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Clinics', href: '/clinics', icon: MapPin },
    { name: 'Log Hours', href: '/log', icon: Clock },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="flex h-dvh bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-teal-600 flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        DentalTracker
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-teal-50 text-teal-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                <item.icon className={clsx('w-5 h-5', isActive ? 'text-teal-600' : 'text-gray-400')} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                        Target: February 2026
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-full w-full pb-20 md:pb-0">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
                <nav className="flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    'flex flex-col items-center justify-center w-full h-full space-y-1',
                                    isActive ? 'text-teal-600' : 'text-gray-500 hover:text-gray-900'
                                )}
                            >
                                <item.icon className={clsx('w-6 h-6', isActive && 'fill-current')} />
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
