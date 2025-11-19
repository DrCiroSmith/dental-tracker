import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Save, Upload, Download } from 'lucide-react';

export default function LogHours() {
    const navigate = useNavigate();
    const clinics = useLiveQuery(() => db.clinics.toArray()) ?? [];

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        duration: '',
        type: 'Shadowing' as const,
        clinicId: '',
        supervisor: '',
        procedures: '',
        notes: ''
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await db.logs.add({
                ...formData,
                clinicId: formData.clinicId ? Number(formData.clinicId) : undefined,
                duration: Number(formData.duration),
                attachment: file ? new Blob([file], { type: file.type }) : undefined,
                attachmentName: file ? file.name : undefined
            });
            navigate('/');
        } catch (error) {
            console.error('Error saving log:', error);
        }
    };

    const handleExport = async () => {
        try {
            const logs = await db.logs.toArray();
            const allClinics = await db.clinics.toArray();
            const clinicMap = new Map(allClinics.map(c => [c.id, c]));

            const csvContent = [
                ['Date', 'Type', 'Duration (Hrs)', 'Clinic', 'Supervisor', 'Procedures', 'Notes'].join(','),
                ...logs.map(log => {
                    const clinicName = log.clinicId ? clinicMap.get(log.clinicId)?.name || 'Unknown' : 'N/A';
                    return [
                        log.date,
                        log.type,
                        log.duration,
                        `"${clinicName}"`,
                        `"${log.supervisor || ''}"`,
                        `"${log.procedures || ''}"`,
                        `"${log.notes || ''}"`
                    ].join(',');
                })
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `dental_logs_export_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export logs.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Log Activity</h2>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export Logs
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.5"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                    >
                        <option value="Shadowing">Dental Shadowing</option>
                        <option value="Dental Volunteering">Dental Volunteering</option>
                        <option value="Non-Dental Volunteering">Non-Dental Volunteering</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinic / Organization</label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={formData.clinicId}
                        onChange={e => setFormData({ ...formData, clinicId: e.target.value })}
                    >
                        <option value="">Select a clinic (Optional)</option>
                        {clinics.map(clinic => (
                            <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Leave empty for non-clinical volunteering.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            value={formData.supervisor}
                            onChange={e => setFormData({ ...formData, supervisor: e.target.value })}
                            placeholder="Dr. Smith / Coordinator Name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Procedures Observed / Tasks</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        rows={3}
                        value={formData.procedures}
                        onChange={e => setFormData({ ...formData, procedures: e.target.value })}
                        placeholder="e.g., Root canal, cleaning, front desk support..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        rows={2}
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (Invoice/Signature)</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                                accept="image/*,.pdf"
                            />
                        </label>
                    </div>
                    {file && (
                        <p className="mt-2 text-sm text-teal-600 font-medium">Selected: {file.name}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg"
                >
                    <Save className="w-5 h-5" />
                    Save Log Entry
                </button>
            </form>
        </div>
    );
}
