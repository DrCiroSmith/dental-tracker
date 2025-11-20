import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../lib/db';
import Map from '../components/Map';
import { Search, Save, ArrowLeft, MapPin, Trash2 } from 'lucide-react';

const DORAL_COORDS: [number, number] = [25.8123, -80.3553]; // 5225 NW 85th Ave, Doral, FL approx

export default function AddClinic() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('id');

    const [formData, setFormData] = useState<{
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        status: 'To Contact' | 'Contacted' | 'Shadowing' | 'Dental Volunteering' | 'Non-Dental Volunteering' | 'Rejected';
        notes: string;
    }>({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        status: 'To Contact',
        notes: ''
    });

    // Initialize location from localStorage or default to Doral
    const [location, setLocation] = useState<[number, number]>(() => {
        const saved = localStorage.getItem('lastMapLocation');
        return saved ? JSON.parse(saved) : DORAL_COORDS;
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [nearbyClinics, setNearbyClinics] = useState<{ id: number, lat: number, lng: number, title: string }[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Save location to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('lastMapLocation', JSON.stringify(location));
    }, [location]);

    // Fetch existing clinic if editing
    useEffect(() => {
        if (editId) {
            db.clinics.get(Number(editId)).then(clinic => {
                if (clinic) {
                    setFormData({
                        name: clinic.name,
                        address: clinic.address,
                        phone: clinic.phone || '',
                        email: clinic.email || '',
                        website: clinic.website || '',
                        status: clinic.status,
                        notes: clinic.notes || ''
                    });
                    setLocation([clinic.lat, clinic.lng]);
                }
            });
        }
    }, [editId]);

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                setLocation([lat, lon]);
                setFormData(prev => ({ ...prev, address: data[0].display_name }));
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    const findNearbyClinics = async () => {
        setIsSearching(true);
        try {
            // Overpass API query for dentists around current location (radius 5000m)
            const query = `
                [out:json];
                (
                    node["healthcare"="dentist"](around:5000,${location[0]},${location[1]});
                    way["healthcare"="dentist"](around:5000,${location[0]},${location[1]});
                    relation["healthcare"="dentist"](around:5000,${location[0]},${location[1]});
                );
                out center;
            `;

            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: query
            });

            const data = await response.json();
            const clinics = data.elements.map((el: any, index: number) => ({
                id: index + 1000, // Offset ID to avoid conflict with selected location
                lat: el.lat || el.center.lat,
                lng: el.lon || el.center.lon,
                title: el.tags.name || 'Unknown Dentist'
            }));

            setNearbyClinics(clinics);
        } catch (error) {
            console.error('Error fetching nearby clinics:', error);
            alert('Failed to fetch nearby clinics. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const clinicData = {
                ...formData,
                lat: location[0],
                lng: location[1]
            };

            if (editId) {
                await db.clinics.update(Number(editId), clinicData);
            } else {
                await db.clinics.add(clinicData);
            }
            navigate('/clinics');
        } catch (error) {
            console.error('Error saving clinic:', error);
        }
    };

    const handleDelete = async () => {
        if (!editId) return;
        if (confirm('Are you sure you want to delete this clinic? WARNING: This may orphan associated logs.')) {
            await db.clinics.delete(Number(editId));
            navigate('/clinics');
        }
    };

    const markers = [
        { id: 0, lat: location[0], lng: location[1], title: 'Selected Location' },
        ...nearbyClinics
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/clinics')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">{editId ? 'Edit Clinic' : 'Add New Clinic'}</h2>
                </div>
                {editId && (
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="To Contact">To Contact</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Shadowing">Shadowing</option>
                                <option value="Dental Volunteering">Dental Volunteering</option>
                                <option value="Non-Dental Volunteering">Non-Dental Volunteering</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery(formData.address)} // Pre-fill search
                                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                    title="Use address to search on map"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                value={formData.website}
                                onChange={e => setFormData({ ...formData, website: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                rows={3}
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                        >
                            <Save className="w-4 h-4" />
                            {editId ? 'Update Clinic' : 'Save Clinic'}
                        </button>
                    </div>
                </div>

                {/* Map */}
                <div className="h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-200 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search location..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                        <button
                            onClick={findNearbyClinics}
                            disabled={isSearching}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
                            title="Find dental clinics nearby"
                        >
                            <MapPin className="w-4 h-4" />
                            {isSearching ? 'Searching...' : 'Nearby'}
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <Map
                            center={location}
                            zoom={13}
                            markers={markers}
                            onMapClick={(lat, lng) => setLocation([lat, lng])}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
