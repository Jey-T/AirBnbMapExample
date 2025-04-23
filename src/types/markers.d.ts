declare global {
    export interface Poi {
        key: string;
        location: google.maps.LatLngLiteral;
    }
}

export {};