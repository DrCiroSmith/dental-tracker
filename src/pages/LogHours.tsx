import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Save, Upload, Download, Trash2, PenTool } from 'lucide-react';
import SignaturePad from '../components/SignaturePad';

export default function LogHours() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('id');

    const clinics = useLiveQuery(() => db.clinics.toArray()) ?? [];

    const [formData, setFormData] = useState<{
        date: string;
        duration: string;
        type: 'Shadowing' | 'Dental Volunteering' | 'Non-Dental Volunteering';
        clinicId: string;
        supervisor: string;
        procedures: string;
        notes: string;
    }>({
        date: (() => {
            const d = new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        })(),
        duration: '',
        type: 'Shadowing',
        clinicId: '',
        supervisor: '',
        procedures: '',
        notes: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [existingAttachmentName, setExistingAttachmentName] = useState<string | undefined>(undefined);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [signature, setSignature] = useState<string | null>(null);

    useEffect(() => {
        if (editId) {
            db.logs.get(Number(editId)).then(log => {
                if (log) {
                    setFormData({
                        date: log.date,
                        duration: log.duration.toString(),
                        type: log.type,
                        clinicId: log.clinicId?.toString() || '',
                        supervisor: log.supervisor || '',
                        procedures: log.procedures || '',
                        notes: log.notes || ''
                    });
                    setExistingAttachmentName(log.attachmentName);
                    setSignature(log.supervisorSignature || null);
                }
            });
        }
    }, [editId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const duration = Number(formData.duration);

            // Validate 24h limit
            const logsOnDate = await db.logs.where('date').equals(formData.date).toArray();
            let totalDurationOnDate = logsOnDate.reduce((acc, log) => acc + log.duration, 0);

            // If editing, subtract the old duration of this log from the total
            if (editId) {
                const currentLog = await db.logs.get(Number(editId));
                if (currentLog) {
                    totalDurationOnDate -= currentLog.duration;
                }
            }

            if (totalDurationOnDate + duration > 24) {
                alert(`Cannot log more than 24 hours for a single day. You already have ${totalDurationOnDate} hours logged for ${formData.date}.`);
                return;
            }

            const logData = {
                ...formData,
                clinicId: formData.clinicId ? Number(formData.clinicId) : undefined,
                duration: duration,
                // Only update attachment if a new file is selected, otherwise keep existing (handled by not overwriting if undefined in update, but Dexie replace needs full object or use update)
            };

            if (editId) {
                await db.logs.update(Number(editId), {
                    ...logData,
                    supervisorSignature: signature || undefined,
                    ...(file ? { attachment: new Blob([file], { type: file.type }), attachmentName: file.name } : {})
                });
            } else {
                await db.logs.add({
                    ...logData,
                    supervisorSignature: signature || undefined,
                    attachment: file ? new Blob([file], { type: file.type }) : undefined,
                    attachmentName: file ? file.name : undefined
                });
            }
            navigate('/activity-logs');
        } catch (error) {
            console.error('Error saving log:', error);
        }
    };

    const handleDelete = async () => {
        if (!editId) return;
        if (confirm('Are you sure you want to delete this log? This action cannot be undone.')) {
            await db.logs.delete(Number(editId));
            navigate('/activity-logs');
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{editId ? 'Edit Log Entry' : 'Log Activity'}</h2>
                <div className="flex gap-2">
                    {editId && (
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    )}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export Logs
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (Hours)</label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.5"
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activity Type</label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
                    >
                        <option value="Shadowing">Dental Shadowing</option>
                        <option value="Dental Volunteering">Dental Volunteering</option>
                        <option value="Non-Dental Volunteering">Non-Dental Volunteering</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clinic / Organization</label>
                    <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={formData.clinicId}
                        onChange={e => setFormData({ ...formData, clinicId: e.target.value })}
                    >
                        <option value="">Select a clinic</option>
                        {clinics.map(clinic => (
                            <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supervisor / Coordinator Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            value={formData.supervisor}
                            onChange={e => setFormData({ ...formData, supervisor: e.target.value })}
                            placeholder="Dr. Smith / Coordinator Name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Procedures Observed / Tasks</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        rows={3}
                        value={formData.procedures}
                        onChange={e => setFormData({ ...formData, procedures: e.target.value })}
                        placeholder="e.g., Root canal, cleaning, front desk support..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        rows={2}
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attachment (Invoice/Signature)</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, PNG, JPG (MAX. 5MB)</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                                accept="image/*,.pdf"
                            />
                        </label>
                    </div>
                    {(file || existingAttachmentName) && (
                        <p className="mt-2 text-sm text-teal-600 dark:text-teal-400 font-medium">
                            Current: {file ? file.name : existingAttachmentName}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supervisor Signature</label>
                    {signature ? (
                        <div className="space-y-2">
                            <div className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                <img src={signature} alt="Supervisor Signature" className="max-h-32 mx-auto" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setSignature(null)}
                                className="w-full px-4 py-2 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-sm"
                            >
                                Remove Signature
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowSignaturePad(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <PenTool className="w-5 h-5" />
                            Request Supervisor Signature
                        </button>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optional: Ask your supervisor to sign to verify the hours logged.</p>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg"
                >
                    <Save className="w-5 h-5" />
                    {editId ? 'Update Log Entry' : 'Save Log Entry'}
                </button>
            </form>

            {showSignaturePad && (
                <SignaturePad
                    onSave={(sig) => {
                        setSignature(sig);
                        setShowSignaturePad(false);
                    }}
                    onCancel={() => setShowSignaturePad(false)}
                />
            )}
        </div>
    );
}
