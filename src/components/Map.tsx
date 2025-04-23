import { APIProvider } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import Markers from "./Markers";
import { LOCATIONS } from "../consts/constants";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";

type Props = {
  apiKey: string;
};

export default function Map({ apiKey }: Props) {
  const mapId = useMemo(() => import.meta.env.VITE_MAP_ID, []);
  const locations: Poi[] = useMemo(() => LOCATIONS, []);

  return (
    <APIProvider
      apiKey={apiKey}
    >
      <div style={{ width: "100vw", height: "100vh" }}>
        <GoogleMap
          mapId={mapId}
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        >
          <Markers pois={locations} />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
