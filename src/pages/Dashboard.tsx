import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, Heart, ChevronRight, Filter, Calendar, BarChart3, TrendingUp, Lock } from 'lucide-react';
import clsx from 'clsx';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../context/AuthContext';

type ChartView = 'weekly' | 'monthly' | 'full';

export default function Dashboard() {
    const { isSubscribed } = useAuth();
    const navigate = useNavigate();
    const [chartView, setChartView] = useState<ChartView>('weekly');

    const stats = useLiveQuery(async () => {
        const logs = await db.logs.toArray();
        const clinics = await db.clinics.toArray();
        const profile = await db.profile.toCollection().first();

        const totalHours = logs.reduce((acc, log) => acc + log.duration, 0);

        const targetShadowing = profile?.targetHoursShadowing || 100;
        const targetDental = profile?.targetHoursDental || 100;
        const targetNonDental = profile?.targetHoursNonDental || 150;
        const totalTarget = targetShadowing + targetDental + targetNonDental;

        const progress = Math.min((totalHours / totalTarget) * 100, 100);

        const byType = logs.reduce((acc, log) => {
            acc[log.type] = (acc[log.type] || 0) + log.duration;
            return acc;
        }, {} as Record<string, number>);

        // Chart Data Logic
        let chartData = [];
        let chartTitle = '';
        let chartSubtitle = '';

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (chartView === 'weekly') {
            chartTitle = 'Weekly Progress';
            chartSubtitle = 'Last 7 Days';
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(today);
                d.setDate(today.getDate() - 6 + i);
                return d.toISOString().split('T')[0];
            });

            chartData = last7Days.map(date => {
                const dayLogs = logs.filter(log => log.date === date);
                const shadowing = dayLogs.filter(l => l.type === 'Shadowing').reduce((sum, l) => sum + l.duration, 0);
                const dentalVol = dayLogs.filter(l => l.type === 'Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);
                const nonDentalVol = dayLogs.filter(l => l.type === 'Non-Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);
                const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

                return {
                    name: dayName,
                    date: date,
                    'Shadowing': shadowing,
                    'Dental Volunteering': dentalVol,
                    'Non-Dental Volunteering': nonDentalVol,
                    total: shadowing + dentalVol + nonDentalVol
                };
            });
        } else if (chartView === 'monthly') {
            const monthName = today.toLocaleDateString('en-US', { month: 'long' });
            chartTitle = `${monthName} Progress`;
            chartSubtitle = `1st - ${today.getDate()}th`;

            const daysInMonthSoFar = today.getDate();

            const days = Array.from({ length: daysInMonthSoFar }, (_, i) => {
                const d = new Date(today.getFullYear(), today.getMonth(), i + 1);
                return d.toISOString().split('T')[0];
            });

            chartData = days.map(date => {
                const dayLogs = logs.filter(log => log.date === date);
                const shadowing = dayLogs.filter(l => l.type === 'Shadowing').reduce((sum, l) => sum + l.duration, 0);
                const dentalVol = dayLogs.filter(l => l.type === 'Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);
                const nonDentalVol = dayLogs.filter(l => l.type === 'Non-Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);

                return {
                    name: new Date(date).getDate().toString(), // Just the day number
                    date: date,
                    'Shadowing': shadowing,
                    'Dental Volunteering': dentalVol,
                    'Non-Dental Volunteering': nonDentalVol,
                    total: shadowing + dentalVol + nonDentalVol
                };
            });
        } else { // Full Progress
            chartTitle = 'Full Progress';
            chartSubtitle = 'Since Start';

            // Find earliest log date or default to today
            const sortedLogs = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const firstLogDate = sortedLogs.length > 0 ? new Date(sortedLogs[0].date) : new Date(today);

            // Create weeks from first log date to today
            const weeks = [];
            let currentStart = new Date(firstLogDate);
            // Adjust to start of week (optional, but let's stick to 7-day chunks from first log)

            let weekCount = 1;
            while (currentStart <= today) {
                const currentEnd = new Date(currentStart);
                currentEnd.setDate(currentStart.getDate() + 6);

                const weekStartStr = currentStart.toISOString().split('T')[0];
                const weekEndStr = currentEnd.toISOString().split('T')[0]; // Note: this might go into future, but we filter logs

                // Filter logs for this week range
                const weekLogs = logs.filter(log => log.date >= weekStartStr && log.date <= weekEndStr);

                const shadowing = weekLogs.filter(l => l.type === 'Shadowing').reduce((sum, l) => sum + l.duration, 0);
                const dentalVol = weekLogs.filter(l => l.type === 'Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);
                const nonDentalVol = weekLogs.filter(l => l.type === 'Non-Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);

                weeks.push({
                    name: `W${weekCount}`,
                    date: `${weekStartStr} - ${weekEndStr}`,
                    'Shadowing': shadowing,
                    'Dental Volunteering': dentalVol,
                    'Non-Dental Volunteering': nonDentalVol,
                    total: shadowing + dentalVol + nonDentalVol
                });

                // Move to next week
                currentStart.setDate(currentStart.getDate() + 7);
                weekCount++;
            }
            chartData = weeks;
        }

        const activeClinics = clinics.filter(c => ['Contacted', 'Shadowing', 'Dental Volunteering', 'Non-Dental Volunteering'].includes(c.status)).length;

        return { totalHours, progress, byType, activeClinics, totalClinics: clinics.length, chartData, chartTitle, chartSubtitle, profile };
    }, [chartView]);

    if (!stats) return null;

    const cards = [
        {
            title: 'Shadowing',
            hours: stats.byType['Shadowing'] || 0,
            target: stats.profile?.targetHoursShadowing || 100,
            icon: Users,
            color: 'bg-blue-50 text-blue-700',
            link: '/activity-logs?type=Shadowing'
        },
        {
            title: 'Dental Volunteering',
            hours: stats.byType['Dental Volunteering'] || 0,
            target: stats.profile?.targetHoursDental || 100,
            icon: Heart,
            color: 'bg-purple-50 text-purple-700',
            link: '/activity-logs?type=Dental Volunteering'
        },
        {
            title: 'Non-Dental Volunteering',
            hours: stats.byType['Non-Dental Volunteering'] || 0,
            target: stats.profile?.targetHoursNonDental || 150,
            icon: Building2,
            color: 'bg-orange-50 text-orange-700',
            link: '/activity-logs?type=Non-Dental Volunteering'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header & Progress */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {stats.profile?.name ? `Hi ${stats.profile.name}!` : 'Dashboard'}
                        </h2>
                        <p className="text-gray-500">
                            Track your progress towards dental school admission.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-teal-600">{stats.totalHours} <span className="text-lg text-gray-400 font-normal">/ {(stats.profile?.targetHoursShadowing || 100) + (stats.profile?.targetHoursDental || 100) + (stats.profile?.targetHoursNonDental || 150)} hrs</span></div>
                        <div className="text-sm text-gray-500">Total Hours Logged</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-teal-500 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.progress}%` }}
                    />
                </div>
            </div>

            {/* Chart Section with Controls */}
            <div className="space-y-4">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setChartView('weekly')}
                        className={clsx(
                            "px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors",
                            chartView === 'weekly' ? "bg-teal-100 text-teal-700" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        )}
                    >
                        <Calendar className="w-4 h-4" />
                        Weekly
                    </button>
                    <button
                        onClick={() => {
                            if (!isSubscribed) {
                                navigate('/settings#subscription');
                                return;
                            }
                            setChartView('monthly');
                        }}
                        className={clsx(
                            "px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors",
                            chartView === 'monthly'
                                ? "bg-teal-100 text-teal-700"
                                : !isSubscribed
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        )}
                    >
                        {!isSubscribed ? <Lock className="w-3 h-3" /> : <BarChart3 className="w-4 h-4" />}
                        Monthly
                    </button>
                    <button
                        onClick={() => {
                            if (!isSubscribed) {
                                navigate('/settings#subscription');
                                return;
                            }
                            setChartView('full');
                        }}
                        className={clsx(
                            "px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-colors",
                            chartView === 'full'
                                ? "bg-teal-100 text-teal-700"
                                : !isSubscribed
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        )}
                    >
                        {!isSubscribed ? <Lock className="w-3 h-3" /> : <TrendingUp className="w-4 h-4" />}
                        Full Progress
                    </button>
                </div>

                <ProgressChart
                    data={stats.chartData}
                    variant="stacked"
                    title={stats.chartTitle}
                    subtitle={stats.chartSubtitle}
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        to={card.link}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={clsx("p-3 rounded-lg", card.color)}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm">{card.title}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-gray-900">{card.hours}</span>
                            <span className="text-sm text-gray-400">/ {card.target} hrs</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Clinic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/clinics" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-50 text-teal-700 rounded-lg">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Clinics Tracked</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalClinics}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" />
                    </div>
                </Link>

                <Link to="/clinics?filter=active" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg">
                            <Filter className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Engagement</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.activeClinics}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
