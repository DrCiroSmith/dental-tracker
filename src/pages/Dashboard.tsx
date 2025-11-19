import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Clock, Building2, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    const logs = useLiveQuery(() => db.logs.toArray()) ?? [];
    const clinics = useLiveQuery(() => db.clinics.toArray()) ?? [];

    const totalHours = logs.reduce((acc, log) => acc + log.duration, 0);
    const progress = Math.min((totalHours / 350) * 100, 100);
    const clinicsContacted = clinics.filter(c => c.status !== 'To Contact').length;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500">Track your progress towards 350 hours.</p>
            </div>

            {/* Progress Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Total Progress</h3>
                    <span className="text-2xl font-bold text-teal-600">{totalHours} / 350 hrs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-teal-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Hours Logged</p>
                        <p className="text-xl font-bold text-gray-900">{totalHours}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Clinics Tracked</p>
                        <p className="text-xl font-bold text-gray-900">{clinics.length}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Clinics Contacted</p>
                        <p className="text-xl font-bold text-gray-900">{clinicsContacted}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
