import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center?: [number, number];
    zoom?: number;
    markers?: {
        id: number;
        lat: number;
        lng: number;
        title: string;
    }[];
    onMapClick?: (lat: number, lng: number) => void;
}

function MapEvents({ onClick }: { onClick?: (lat: number, lng: number) => void }) {
    const map = useMap();

    useEffect(() => {
        if (!onClick) return;

        map.on('click', (e) => {
            onClick(e.latlng.lat, e.latlng.lng);
        });

        return () => {
            map.off('click');
        };
    }, [map, onClick]);

    return null;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function Map({ center = [42.3601, -71.0589], zoom = 13, markers = [], onMapClick }: MapProps) {
    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} className="z-0">
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
                <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                    <Popup>
                        {marker.title}
                    </Popup>
                </Marker>
            ))}
            <MapEvents onClick={onMapClick} />
        </MapContainer>
    );
}
