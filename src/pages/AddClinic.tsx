import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../lib/db';
import Map from '../components/Map';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { Save, ArrowLeft, MapPin, Trash2 } from 'lucide-react';

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
        status: 'To Contact' | 'Contacted' | 'Applied' | 'Interview Scheduled' | 'Accepted' | 'Waitlisted' | 'Rejected';
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

    const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
        if (!place.geometry?.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation([lat, lng]);

        // Extract phone number (remove country code and formatting)
        let phone = place.formatted_phone_number || '';
        if (phone) {
            phone = phone.replace(/^\+1\s*/, '').replace(/[()-\s]/g, '');
        }

        setFormData(prev => ({
            ...prev,
            name: place.name || '',
            address: place.formatted_address || '',
            phone: phone,
            website: place.website || ''
        }));
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

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsSearching(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation([latitude, longitude]);
                setIsSearching(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location');
                setIsSearching(false);
            }
        );
    };

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
                                <option value="Applied">Applied</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Waitlisted">Waitlisted</option>
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
                    <div className="p-4 border-b border-gray-200 flex gap-2 relative">
                        <div className="flex-1 relative">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search for Clinic or Location</label>
                                <div className="flex gap-2">
                                    <PlacesAutocomplete
                                        onPlaceSelect={handlePlaceSelect}
                                        placeholder="Search for a clinic (e.g., 'Doral Dental')..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                    <button
                                        onClick={handleUseMyLocation}
                                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                        title="Use My Location"
                                    >
                                        <MapPin className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">✨ Powered by Google - auto-fills name, address, phone, and website</p>
                            </div>
                        </div>
                        <button
                            onClick={findNearbyClinics}
                            disabled={isSearching}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2 self-end mb-1"
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
