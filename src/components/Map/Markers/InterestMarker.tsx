import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { LocationFeatureProps } from "@/consts/locations";
import Supercluster from "supercluster";

export default function InterestMarker({
  geometry,
  properties,
}: Supercluster.PointFeature<LocationFeatureProps>) {
  const [lng, lat] = geometry.coordinates;
  const [markerRef] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      position={{ lat, lng }}
      ref={markerRef}
    >
      <Popover key={`${properties.key}-popover`}>
        <PopoverTrigger className="group">
          <div
            className={`px-2 py-1 border border-gray-200 rounded-xl transition-scale duration-100 transition-colors duration-200 transition-background-color duration-200 bg-white shadow-md hover:scale-105 cursor-pointer group-data-[state=open]:bg-black group-data-[state=open]:text-white`}
          >
            <p className="text-sm font-bold">{properties.shortName}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" avoidCollisions>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">{properties.name}</p>
            <p className="text-sm">{properties.description}</p>
          </div>
        </PopoverContent>
      </Popover>
    </AdvancedMarker>
  );
}
