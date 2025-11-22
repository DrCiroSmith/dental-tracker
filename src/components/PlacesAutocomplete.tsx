import { useRef, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries: ("places" | "geometry")[] = ["places"];

interface PlacesAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
    placeholder?: string;
    className?: string;
}

export default function PlacesAutocomplete({ onPlaceSelect, placeholder, className }: PlacesAutocompleteProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries
    });

    useEffect(() => {
        if (!isLoaded || !inputRef.current) return;

        // Initialize Google Places Autocomplete
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            types: ['establishment'],
            fields: ['name', 'formatted_address', 'geometry', 'formatted_phone_number', 'website', 'address_components']
        });

        // Handle place selection
        autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place && place.geometry) {
                onPlaceSelect(place);
            }
        });

        return () => {
            if (autocompleteRef.current) {
                google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, [isLoaded, onPlaceSelect]);

    if (!isLoaded) {
        return (
            <input
                type="text"
                placeholder="Loading..."
                className={className}
                disabled
            />
        );
    }

    return (
        <input
            ref={inputRef}
            type="text"
            placeholder={placeholder || "Search for a place..."}
            className={className}
        />
    );
}
