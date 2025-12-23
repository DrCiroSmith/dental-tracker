import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, Heart, ChevronRight, Filter, Calendar, BarChart3, TrendingUp, Lock } from 'lucide-react';
import clsx from 'clsx';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../context/AuthContext';
import CongratulationsModal from '../components/CongratulationsModal';

type ChartView = 'weekly' | 'monthly' | 'full';

export default function Dashboard() {
    const { isSubscribed } = useAuth();
    const navigate = useNavigate();
    const [chartView, setChartView] = useState<ChartView>('weekly');
    const [showCongrats, setShowCongrats] = useState(false);
    const [congratsData, setCongratsData] = useState({ title: '', message: '' });

    const { user } = useAuth();
    const stats = useLiveQuery(async () => {
        if (!user?.id) return null;
        const logs = await db.logs.toArray();
        const clinics = await db.clinics.toArray();
        const profile = await db.profile.get(user.id);

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
        // Use UTC generation for DATA matching (matches ActivityLogs logic)
        // But use Local Time for LABELS (matches user's wall clock)

        if (chartView === 'weekly') {
            chartTitle = 'Weekly Progress';
            chartSubtitle = 'Last 7 Days';
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(today);
                d.setDate(today.getDate() - 6 + i);
                return d.toISOString().split('T')[0]; // UTC Date String for matching DB
            });

            chartData = last7Days.map(date => {
                const dayLogs = logs.filter(log => log.date === date);
                const shadowing = dayLogs.filter(l => l.type === 'Shadowing').reduce((sum, l) => sum + l.duration, 0);
                const dentalVol = dayLogs.filter(l => l.type === 'Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);
                const nonDentalVol = dayLogs.filter(l => l.type === 'Non-Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);

                // Label: Parse UTC string as Date object, then format to Local
                // new Date("2025-11-22") -> UTC Midnight -> Local Previous Day 7pm (if EST)
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

            const utcToday = new Date();
            const utcMonth = utcToday.getUTCMonth();
            const utcYear = utcToday.getUTCFullYear();
            const utcDay = utcToday.getUTCDate();

            const days = Array.from({ length: utcDay }, (_, i) => {
                const d = new Date(Date.UTC(utcYear, utcMonth, i + 1));
                return d.toISOString().split('T')[0];
            });

            chartData = days.map(date => {
                const dayLogs = logs.filter(log => log.date === date);
                const shadowing = dayLogs.filter(l => l.type === 'Shadowing').reduce((sum, l) => sum + l.duration, 0);
                const dentalVol = dayLogs.filter(l => l.type === 'Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);
                const nonDentalVol = dayLogs.filter(l => l.type === 'Non-Dental Volunteering').reduce((sum, l) => sum + l.duration, 0);

                return {
                    name: new Date(date).getDate().toString(), // Use Local date for label (e.g. 22 UTC -> 21 Local)
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
            // Use UTC parsing for sorting to be safe
            const firstLogDate = sortedLogs.length > 0 ? new Date(sortedLogs[0].date) : new Date(today);

            // Create weeks from first log date to today
            const weeks = [];
            const currentStart = new Date(firstLogDate);

            let weekCount = 1;
            while (currentStart <= today) {
                const currentEnd = new Date(currentStart);
                currentEnd.setDate(currentStart.getDate() + 6);

                const weekStartStr = currentStart.toISOString().split('T')[0];
                const weekEndStr = currentEnd.toISOString().split('T')[0];

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

    useEffect(() => {
        if (stats) {
            const checkAchievement = (key: string, current: number, target: number, title: string, message: string) => {
                if (current >= target && !localStorage.getItem(`achievement_${key}`)) {
                    setCongratsData({ title, message });
                    setShowCongrats(true);
                    localStorage.setItem(`achievement_${key}`, 'true');

                    // Simulate Email Notification
                    console.log(`[EMAIL SIMULATION] Sending email to user: Achievement Unlocked - ${title}`);
                    // We could also use a toast here, but the modal is the primary feedback
                }
            };

            const shadowingHours = stats.byType['Shadowing'] || 0;
            const dentalHours = stats.byType['Dental Volunteering'] || 0;
            const nonDentalHours = stats.byType['Non-Dental Volunteering'] || 0;

            const targetShadowing = stats.profile?.targetHoursShadowing || 100;
            const targetDental = stats.profile?.targetHoursDental || 100;
            const targetNonDental = stats.profile?.targetHoursNonDental || 150;
            const totalTarget = targetShadowing + targetDental + targetNonDental;

            checkAchievement('shadowing', shadowingHours, targetShadowing, 'Shadowing Target Met!', 'Congratulations! You have completed your shadowing hours target.');
            checkAchievement('dental', dentalHours, targetDental, 'Dental Volunteering Met!', 'Great job! You have reached your dental volunteering goal.');
            checkAchievement('non_dental', nonDentalHours, targetNonDental, 'Non-Dental Volunteering Met!', 'Awesome! You have fulfilled your non-dental volunteering requirement.');
            checkAchievement('total', stats.totalHours, totalTarget, 'All Targets Completed!', 'Incredible! You have completed ALL your required hours. You are ready for application!');
        }
    }, [stats]);

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
            <CongratulationsModal
                isOpen={showCongrats}
                onClose={() => setShowCongrats(false)}
                title={congratsData.title}
                message={congratsData.message}
            />

            {/* Header & Progress */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {stats.profile?.name ? `Hi ${stats.profile.name}!` : 'Dashboard'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Track your progress towards dental school admission.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className={clsx("text-3xl font-bold", stats.totalHours >= ((stats.profile?.targetHoursShadowing || 100) + (stats.profile?.targetHoursDental || 100) + (stats.profile?.targetHoursNonDental || 150)) ? "text-green-600 dark:text-green-400" : "text-teal-600 dark:text-teal-400")}>
                            {stats.totalHours} <span className="text-lg text-gray-400 dark:text-gray-500 font-normal">/ {(stats.profile?.targetHoursShadowing || 100) + (stats.profile?.targetHoursDental || 100) + (stats.profile?.targetHoursNonDental || 150)} hrs</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Hours Logged</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                        className={clsx("h-full rounded-full transition-all duration-1000 ease-out", stats.progress >= 100 ? "bg-green-500" : "bg-teal-500")}
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
                            chartView === 'weekly' ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
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
                                ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
                                : !isSubscribed
                                    ? "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/70"
                                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
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
                                ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
                                : !isSubscribed
                                    ? "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/70"
                                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
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
                {cards.map((card) => {
                    const isCompleted = card.hours >= card.target;
                    return (
                        <Link
                            key={card.title}
                            to={card.link}
                            className={clsx(
                                "p-6 rounded-xl shadow-sm border transition-shadow group",
                                isCompleted ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 hover:shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={clsx("p-3 rounded-lg", isCompleted ? "bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300" : card.color + " dark:bg-opacity-20")}>
                                    <card.icon className="w-6 h-6" />
                                </div>
                                <ChevronRight className={clsx("w-5 h-5 transition-colors", isCompleted ? "text-green-400 group-hover:text-green-600" : "text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400")} />
                            </div>
                            <h3 className={clsx("font-medium text-sm", isCompleted ? "text-green-800 dark:text-green-300" : "text-gray-500 dark:text-gray-400")}>{card.title}</h3>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className={clsx("text-2xl font-bold", isCompleted ? "text-green-900 dark:text-green-200" : "text-gray-900 dark:text-gray-100")}>{card.hours}</span>
                                <span className={clsx("text-sm", isCompleted ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500")}>/ {card.target} hrs</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Clinic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/clinics" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-lg">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Clinics Tracked</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalClinics}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 ml-auto group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                    </div>
                </Link>

                <Link to="/clinics?filter=active" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg">
                            <Filter className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Active Engagement</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.activeClinics}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 ml-auto group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
