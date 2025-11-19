import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Phone, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

import type { Clinic } from '../lib/db';

const statusColors: Record<Clinic['status'], string> = {
    'To Contact': 'bg-gray-100 text-gray-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Shadowing': 'bg-green-100 text-green-800',
    'Dental Volunteering': 'bg-purple-100 text-purple-800',
    'Non-Dental Volunteering': 'bg-orange-100 text-orange-800',
    'Rejected': 'bg-red-100 text-red-800',
};

export default function Clinics() {
    const clinics = useLiveQuery(() => db.clinics.toArray()) ?? [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Clinics</h2>
                    <p className="text-gray-500">Manage dental practices for shadowing.</p>
                </div>
                <Link
                    to="/clinics/new"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Clinic
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinics.map((clinic) => (
                    <div key={clinic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg text-gray-900">{clinic.name}</h3>
                                <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[clinic.status])}>
                                    {clinic.status}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                                    <span>{clinic.address}</span>
                                </div>
                                {clinic.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{clinic.phone}</span>
                                    </div>
                                )}
                                {clinic.website && (
                                    <div className="flex items-center gap-2">
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                        <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {clinics.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500">No clinics added yet.</p>
                        <Link to="/clinics/new" className="text-teal-600 font-medium hover:underline mt-2 inline-block">
                            Add your first clinic
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
