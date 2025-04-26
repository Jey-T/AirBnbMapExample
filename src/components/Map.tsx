import { APIProvider } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import Markers from "./Map/Markers/Markers";
import mapConfig from "@/config/mapConfig";

type Props = {
  apiKey: string;
};

export default function Map({ apiKey }: Props) {
  const mapId = useMemo(() => import.meta.env.VITE_MAP_ID, []);
 
  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <GoogleMap
          mapId={mapId}
          {...mapConfig}
        >
          <Markers />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
