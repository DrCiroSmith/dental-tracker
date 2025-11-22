import { GoogleMap, Marker } from '@react-google-maps/api';

interface GoogleMapComponentProps {
    markers?: {
        id: number;
        lat: number;
        lng: number;
        title: string;
        color?: 'blue' | 'red' | 'green' | 'orange' | 'yellow' | 'violet' | 'grey' | 'black';
    }[];
    center?: { lat: number; lng: number };
    zoom?: number;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onLoad?: (map: google.maps.Map) => void;
    className?: string;
}

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 25.8123,
    lng: -80.3553
};

// Color mapping for Google Maps marker icons
const getMarkerIcon = (color: string = 'red') => {
    return `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
};

export default function GoogleMapComponent({
    markers = [],
    center = defaultCenter,
    zoom = 12,
    onClick,
    onLoad
}: GoogleMapComponentProps) {
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={onClick}
            onLoad={onLoad}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.title}
                    icon={getMarkerIcon(marker.color)}
                    onClick={() => {
                        if (onClick) {
                            const event = {
                                latLng: {
                                    lat: () => marker.lat,
                                    lng: () => marker.lng
                                }
                            } as google.maps.MapMouseEvent;
                            onClick(event);
                        }
                    }}
                />
            ))}
        </GoogleMap>
    );
}
