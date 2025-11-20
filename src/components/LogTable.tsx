import { Link } from 'react-router-dom';
import { FileText, Pencil, Trash2, ClipboardList } from 'lucide-react';
import clsx from 'clsx';

interface Log {
    id: number;
    date: string;
    clinicName: string;
    type: string;
    duration: number;
    supervisor?: string;
    attachment?: Blob;
    attachmentName?: string;
}

interface LogTableProps {
    logs: Log[];
    onDelete: (id: number) => void;
}

export default function LogTable({ logs, onDelete }: LogTableProps) {
    if (!logs.length) {
        return (
            <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ClipboardList className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No logs found</h3>
                <p className="text-gray-500 max-w-sm">
                    There are no activity logs matching your current filter. Try changing the filter or add a new log.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="whitespace-nowrap">
                        <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Clinic</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Type</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Duration</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Supervisor</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Attachment</th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {logs.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{log.date}</td>
                            <td className="px-6 py-4 text-gray-900">{log.clinicName}</td>
                            <td className="px-6 py-4">
                                <span className={clsx(
                                    "px-2 py-1 text-xs rounded-full whitespace-nowrap",
                                    log.type === 'Shadowing' && "bg-blue-100 text-blue-800",
                                    log.type === 'Dental Volunteering' && "bg-purple-100 text-purple-800",
                                    log.type === 'Non-Dental Volunteering' && "bg-orange-100 text-orange-800"
                                )}>
                                    {log.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{log.duration} hrs</td>
                            <td className="px-6 py-4 text-gray-500">{log.supervisor || '-'}</td>
                            <td className="px-6 py-4">
                                {log.attachment ? (
                                    <span className="flex items-center gap-1 text-teal-600">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-xs max-w-[100px] truncate">{log.attachmentName}</span>
                                    </span>
                                ) : (
                                    <span className="text-gray-400">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        to={`/log-hours?id=${log.id}`}
                                        className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(log.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
