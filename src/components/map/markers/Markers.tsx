import React, { useEffect, useRef } from "react";
import Marker from "../Marker";
import { useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker as GoogleMarker } from "@googlemaps/markerclusterer";

type Props = {
  locations: Poi[];
  markers: { [key: string]: GoogleMarker };
  setMarkers: React.Dispatch<
    React.SetStateAction<{ [key: string]: GoogleMarker }>
  >;
};

export default function Markers({ locations, markers, setMarkers }: Props) {
  const clusterer = useRef<MarkerClusterer | null>(null);

  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);
  return locations.map((poi) => (
    <Marker key={poi.key} poi={poi} markers={markers} setMarkers={setMarkers} />
  ));
}
