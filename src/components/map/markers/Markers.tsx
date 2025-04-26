import { useCallback } from "react";
import Marker from "./InterestMarker";
import { useMap } from "@vis.gl/react-google-maps";
import { useSupercluster } from "@/hooks/useSuperCluster";
import { LocationFeatureProps, locationsGeojson } from "@/consts/locations";
import Supercluster, { ClusterProperties } from "supercluster";
import ClusterMarker from "./ClusterMarker";

type ClusterFeature = Supercluster.ClusterFeature<ClusterProperties>;
type PointFeature = Supercluster.PointFeature<LocationFeatureProps>;
type MapFeature = ClusterFeature | PointFeature;

export default function Markers() {
  const { clusters, getClusterExpansionZoom } =
    useSupercluster<LocationFeatureProps>(locationsGeojson, {
      radius: 75,
      maxZoom: 20,
      minZoom: 0,
      minPoints: 2,
    });

  const map = useMap();

  const onClusterClick = useCallback(
    (markerPosition: { lat: number; lng: number }, clusterId: number) => {
      const zoom = getClusterExpansionZoom(clusterId);
      if (!map || !zoom) return;
      map.moveCamera({
        center: markerPosition,
        zoom: zoom,
      });
    },
    [map]
  );

  const isCluster = useCallback(
    (
      properties: ClusterProperties | LocationFeatureProps
    ): properties is ClusterProperties => {
      return "cluster" in properties && properties.cluster === true;
    },
    []
  );

  return clusters.map((feature: MapFeature) => {
    if (isCluster(feature.properties)) {
      return (
        <ClusterMarker
          {...(feature as ClusterFeature)}
          key={feature.id}
          onClusterClick={onClusterClick}
        />
      );
    }

    return <Marker key={feature.id} {...(feature as PointFeature)} />;
  });
}
