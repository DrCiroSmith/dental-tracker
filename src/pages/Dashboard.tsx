import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { BarChart3, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';


const TARGETS = {
    total: 350,
    shadowing: 150, // Assumed split, user can adjust mentally or we can add settings later
    dentalVolunteering: 100,
    nonDentalVolunteering: 100
};

export default function Dashboard() {
    const stats = useLiveQuery(async () => {
        const logs = await db.logs.toArray();
        const clinics = await db.clinics.toArray();

        const hoursByType = logs.reduce((acc, log) => {
            const duration = log.duration || 0;
            const type = log.type || 'Shadowing';
            acc[type] = (acc[type] || 0) + duration;
            return acc;
        }, {} as Record<string, number>);

        const totalHours = Object.values(hoursByType).reduce((a, b) => a + b, 0);

        return {
            totalHours,
            hoursByType,
            clinicsCount: clinics.length,
            contactedCount: clinics.filter(c => c.status === 'Contacted' || c.status === 'Shadowing' || c.status === 'Dental Volunteering' || c.status === 'Non-Dental Volunteering').length
        };
    });

    if (!stats) return null;

    const getProgress = (current: number, target: number) => Math.min(100, (current / target) * 100);
    const getRemaining = (current: number, target: number) => Math.max(0, target - current);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <div className="text-sm text-gray-500">Target: February 2026</div>
            </div>

            {/* Main Progress */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Total Progress</h2>
                    <span className="text-2xl font-bold text-teal-600">{stats.totalHours} / {TARGETS.total} hrs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-teal-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${getProgress(stats.totalHours, TARGETS.total)}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">{getRemaining(stats.totalHours, TARGETS.total)} hours remaining</p>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Shadowing */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Shadowing</h3>
                            <p className="text-xs text-gray-500">Target: {TARGETS.shadowing} hrs</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{stats.hoursByType['Shadowing'] || 0} hrs done</span>
                            <span className="text-gray-500">{getRemaining(stats.hoursByType['Shadowing'] || 0, TARGETS.shadowing)} left</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${getProgress(stats.hoursByType['Shadowing'] || 0, TARGETS.shadowing)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Dental Volunteering */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Dental Volunteer</h3>
                            <p className="text-xs text-gray-500">Target: {TARGETS.dentalVolunteering} hrs</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{stats.hoursByType['Dental Volunteering'] || 0} hrs done</span>
                            <span className="text-gray-500">{getRemaining(stats.hoursByType['Dental Volunteering'] || 0, TARGETS.dentalVolunteering)} left</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${getProgress(stats.hoursByType['Dental Volunteering'] || 0, TARGETS.dentalVolunteering)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Non-Dental Volunteering */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Non-Dental Vol.</h3>
                            <p className="text-xs text-gray-500">Target: {TARGETS.nonDentalVolunteering} hrs</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{stats.hoursByType['Non-Dental Volunteering'] || 0} hrs done</span>
                            <span className="text-gray-500">{getRemaining(stats.hoursByType['Non-Dental Volunteering'] || 0, TARGETS.nonDentalVolunteering)} left</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${getProgress(stats.hoursByType['Non-Dental Volunteering'] || 0, TARGETS.nonDentalVolunteering)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Clinics Tracked</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.clinicsCount}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Active Engagement</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.contactedCount}</p>
                        <p className="text-xs text-gray-500">Contacted or Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
