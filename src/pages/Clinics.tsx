import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { MapPin, Phone, Plus, Filter, List, Map as MapIcon, Pencil, Trash2, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import Map from '../components/Map';

const statusColors: Record<string, string> = {
    'Contacted': 'bg-blue-100 text-blue-800',
    'Applied': 'bg-purple-100 text-purple-800',
    'Interview Scheduled': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800',
    'Waitlisted': 'bg-orange-100 text-orange-800',
    'Rejected': 'bg-red-100 text-red-800',
};

export default function Clinics() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [viewMode, setViewMode] = useState<'list' | 'map'>(
        location.pathname === '/map' ? 'map' : 'list'
    );
    const filter = searchParams.get('filter');

    const clinics = useLiveQuery(async () => {
        let allClinics = await db.clinics.toArray();
        if (filter === 'active') {
            return allClinics.filter(c => ['Contacted', 'Applied', 'Interview Scheduled', 'Accepted', 'Waitlisted'].includes(c.status));
        }
        return allClinics;
    }, [filter]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this clinic?')) {
            await db.clinics.delete(id);
        }
    };

    if (!clinics) return null;

    const markers = clinics.map(c => ({
        id: c.id!,
        lat: c.lat,
        lng: c.lng,
        title: c.name
    }));

    // Default center (Doral) or center of first clinic
    const center: [number, number] = clinics.length > 0
        ? [clinics[0].lat, clinics[0].lng]
        : [25.8123, -80.3553];

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Clinics</h2>
                        {filter === 'active' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium">
                                <Filter className="w-4 h-4" />
                                Active Engagement
                                <button
                                    onClick={() => setSearchParams({})}
                                    className="ml-2 hover:text-teal-900"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                    <p className="text-gray-500">Manage dental practices for shadowing.</p>
                </div>
                <div className="flex gap-2">
                    {/* Mobile Toggle */}
                    <div className="md:hidden flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('list')}
                            className={clsx(
                                "p-2 rounded-md transition-colors",
                                viewMode === 'list' ? "bg-white shadow-sm text-teal-600" : "text-gray-500"
                            )}
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={clsx(
                                "p-2 rounded-md transition-colors",
                                viewMode === 'map' ? "bg-white shadow-sm text-teal-600" : "text-gray-500"
                            )}
                        >
                            <MapIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <Link
                        to="/clinics/add"
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Clinic</span>
                    </Link>
                </div>
            </div>

            <div className="flex-1 min-h-0 relative">
                {viewMode === 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full pb-20">
                        {clinics.map((clinic) => (
                            <div key={clinic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative group h-fit">
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

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg shadow-sm">
                                    <Link
                                        to={`/clinics/add?id=${clinic.id}`}
                                        className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                                        title="Edit Clinic"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(clinic.id!)}
                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete Clinic"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {clinics.length === 0 && (
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-500">No clinics added yet.</p>
                                <Link to="/clinics/add" className="text-teal-600 font-medium hover:underline mt-2 inline-block">
                                    Add your first clinic
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <Map markers={markers} center={center} />
                    </div>
                )}
            </div>
        </div>
    );
}
