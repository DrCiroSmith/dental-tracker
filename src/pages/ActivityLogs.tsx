import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../context/AuthContext';
import LogFilters from '../components/LogFilters';
import ExportButton from '../components/ExportButton';
import LogTable from '../components/LogTable';

import { formatDate } from '../lib/formatDate';

export default function ActivityLogs() {
    const { isSubscribed } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const typeFilter = searchParams.get('type') || 'All';

    const data = useLiveQuery(async () => {
        const clinics = await db.clinics.toArray();
        const clinicsMap = new Map(clinics.map(c => [c.id, c.name]));

        let collection = db.logs.orderBy('date').reverse();
        let logs = await collection.toArray();

        // Calculate weekly data for chart BEFORE filtering logs for the table
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() - 6 + i);
            return d.toISOString().split('T')[0];
        });

        const chartData = last7Days.map(date => {
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

        if (typeFilter !== 'All') {
            logs = logs.filter(log => log.type === typeFilter);
        }

        const formattedLogs = logs.map(log => ({
            ...log,
            clinicName: log.clinicId ? clinicsMap.get(log.clinicId) || 'Unknown Clinic' : 'N/A'
        }));

        return { logs: formattedLogs, chartData };
    }, [typeFilter]);

    const logs = data?.logs || [];
    const chartData = data?.chartData || [];

    const handleExport = async () => {
        if (!logs || logs.length === 0) return;

        const zip = new JSZip();
        const folder = zip.folder("attachments");

        // 1. Generate CSV
        const headers = ['Date', 'Type', 'Clinic', 'Duration (Hours)', 'Supervisor', 'Procedures', 'Notes', 'Attachment Filename'];
        const csvRows = [headers.join(',')];

        for (const log of logs) {
            let attachmentName = '';
            if (log.attachment && log.attachmentName) {
                attachmentName = `${log.id}_${log.attachmentName}`;
                // Add file to zip folder
                folder?.file(attachmentName, log.attachment);
            }

            const row = [
                formatDate(log.date),
                log.type,
                `"${(log.clinicName || '').replace(/"/g, '""')}"`,
                log.duration,
                `"${(log.supervisor || '').replace(/"/g, '""')}"`,
                `"${(log.procedures || '').replace(/"/g, '""')}"`,
                `"${(log.notes || '').replace(/"/g, '""')}"`,
                attachmentName
            ];
            csvRows.push(row.join(','));
        }

        const csvContent = csvRows.join('\n');
        zip.file("logs.csv", csvContent);

        // 2. Generate Zip
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `dental_tracker_export_${typeFilter.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.zip`);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this log?')) {
            await db.logs.delete(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <LogFilters
                    currentFilter={typeFilter}
                    onFilterChange={(type) => setSearchParams({ type })}
                />
                <ExportButton
                    isSubscribed={isSubscribed}
                    hasLogs={logs.length > 0}
                    onExport={handleExport}
                />
            </div>

            {/* Weekly Chart */}
            {chartData.length > 0 && (
                <ProgressChart
                    data={chartData}
                    variant={typeFilter === 'All' ? 'stacked' : 'single'}
                    activityType={typeFilter === 'All' ? undefined : typeFilter}
                />
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <LogTable logs={logs} onDelete={handleDelete} />
            </div>
        </div>
    );
}
