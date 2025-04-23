import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useMemo } from "react";

function App() {
  const apiKey = useMemo(() => import.meta.env.VITE_API_KEY, []);

  if (!apiKey) {
    return <p style={{ color: "red" }}>API key is not set</p>;
  }

  return (
    <APIProvider
      apiKey={apiKey}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div style={{ width: "100vw", height: "100vh" }}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        ></Map>
      </div>
    </APIProvider>
  );
}

export default App;
