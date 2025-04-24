declare global {
    export interface Poi {
        key: string;
        location: google.maps.LatLngLiteral;
        shortName: string;
        description: string;
        name: string;
    }
}

export {};