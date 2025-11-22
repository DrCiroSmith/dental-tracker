import { useLoadScript } from '@react-google-maps/api';
import GoogleMapComponent from './GoogleMapComponent';

interface MapProps {
    center?: [number, number];
    zoom?: number;
    markers?: {
        id: number;
        lat: number;
        lng: number;
        title: string;
        color?: 'blue' | 'red' | 'green' | 'orange' | 'yellow' | 'violet' | 'grey' | 'black';
    }[];
    onMapClick?: (lat: number, lng: number) => void;
}

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

export default function Map({ center, zoom = 13, markers = [], onMapClick }: MapProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries
    });

    const defaultCenter = { lat: 42.3601, lng: -71.0589 }; // Boston default
    const mapCenter = center ? { lat: center[0], lng: center[1] } : defaultCenter;

    const handleClick = (e: google.maps.MapMouseEvent) => {
        if (onMapClick && e.latLng) {
            onMapClick(e.latLng.lat(), e.latLng.lng());
        }
    };

    // Log errors to console for debugging
    if (loadError) {
        console.error('Google Maps load error:', loadError);
    }

    // Log API key status (first few characters only for security)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log('Google Maps API Key status:', apiKey ? `Configured (${apiKey.substring(0, 10)}...)` : 'NOT CONFIGURED');

    if (loadError) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
                <p className="text-red-600 font-semibold">Error loading Google Maps</p>
                <p className="text-sm text-gray-600 mt-2">{loadError.message}</p>
                <p className="text-xs text-gray-500 mt-1">Check browser console for details</p>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-600">Loading map...</p>
            </div>
        );
    }

    return (
        <GoogleMapComponent
            center={mapCenter}
            zoom={zoom}
            markers={markers}
            onClick={handleClick}
        />
    );
}
