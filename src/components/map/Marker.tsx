import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Marker } from "@googlemaps/markerclusterer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { Marker as GoogleMarker } from "@googlemaps/markerclusterer";

interface MarkerProps {
  poi: Poi;
  markers: { [key: string]: GoogleMarker };
  setMarkers: React.Dispatch<
    React.SetStateAction<{ [key: string]: GoogleMarker }>
  >;
}

export default function Marker({ poi, markers, setMarkers }: MarkerProps) {
  
  const setMarkerRef = (marker: GoogleMarker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev: { [key: string]: GoogleMarker }) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <AdvancedMarker
      key={poi.key}
      position={poi.location}
      ref={(marker) => setMarkerRef(marker, poi.key)}
    >
      <Popover key={`${poi.key}-popover`}>
        <PopoverTrigger className="group">
          <div
            className={`px-2 py-1 border border-gray-200 rounded-xl transition-scale duration-300 transition-colors duration-200 transition-background-color duration-200 bg-white shadow-md hover:scale-105 cursor-pointer group-data-[state=open]:bg-black group-data-[state=open]:text-white`}
          >
            <p className="text-sm font-bold">{poi.shortName}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" avoidCollisions>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">{poi.name}</p>
            <p className="text-sm">{poi.description}</p>
          </div>
        </PopoverContent>
      </Popover>
    </AdvancedMarker>
  );
}
