import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useCallback, useMemo } from "react";
import Supercluster, { ClusterProperties } from "supercluster";

type ClusterMarkerProps = Supercluster.ClusterFeature<ClusterProperties> & {
  onClusterClick: (
    position: { lat: number; lng: number },
    clusterId: number
  ) => void;
};

export default function ClusterMarker({
  geometry,
  properties,
  onClusterClick,
}: ClusterMarkerProps) {

  const clusterProperties = properties as ClusterProperties;
  const [markerRef] = useAdvancedMarkerRef();
  const [lng, lat] = geometry.coordinates;
  const size = clusterProperties.point_count;
  const markerSize = useMemo(() => Math.floor(48 + Math.sqrt(size) * 2), [size]);

  const handleClusterClick = useCallback(
    () =>
      onClusterClick &&
      onClusterClick({ lat, lng }, clusterProperties.cluster_id),
    [onClusterClick, clusterProperties]
  );

  return (
    <AdvancedMarker
      onClick={handleClusterClick}
      ref={markerRef}
      position={{ lat, lng }}
      zIndex={size}
      style={{ width: markerSize, height: markerSize }}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
    >
      <div className="flex items-center justify-center w-full h-full bg-white rounded-full border border-gray-200 shadow-md cursor-pointer transition-scale duration-100 hover:scale-105">
        <p className="text-sm font-bold">
          {clusterProperties.point_count > 9
            ? "9+"
            : clusterProperties.point_count}
        </p>
      </div>
    </AdvancedMarker>
  );
}
