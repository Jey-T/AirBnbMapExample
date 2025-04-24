import { APIProvider } from "@vis.gl/react-google-maps";
import { useMemo, useState } from "react";
import { LOCATIONS } from "../../consts/constants";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import type { Marker as GoogleMarker } from "@googlemaps/markerclusterer";
import Markers from "./markers/Markers";

type Props = {
  apiKey: string;
};

export default function Map({ apiKey }: Props) {
  const mapId = useMemo(() => import.meta.env.VITE_MAP_ID, []);
  const locations: Poi[] = useMemo(() => LOCATIONS, []);
  const [markers, setMarkers] = useState<{ [key: string]: GoogleMarker }>({});
  
  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <GoogleMap
          clickableIcons={false}
          mapId={mapId}
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        >
          <Markers locations={locations} markers={markers} setMarkers={setMarkers} />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
