import { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import Supercluster, { ClusterProperties } from "supercluster";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useMapViewport } from "./useMapViewport";

export function useSupercluster<T extends GeoJsonProperties>(
  geojson: FeatureCollection<Point, T>,
  superclusterOptions: Supercluster.Options<T, ClusterProperties>
) {
  // Use a ref to store the clusterer instance to ensure it persists across renders
  const clustererRef = useRef<Supercluster<T, ClusterProperties> | null>(null);

  // State to track if data has been loaded
  const [dataLoaded, setDataLoaded] = useState(false);

  // Create the clusterer if it doesn't exist yet
  useEffect(() => {
    if (!clustererRef.current) {
      clustererRef.current = new Supercluster(superclusterOptions);
    }
  }, [superclusterOptions]);

  // Load data into the clusterer
  useEffect(() => {
    if (clustererRef.current && geojson.features.length > 0) {
      clustererRef.current.load(geojson.features);
      setDataLoaded(true);
    }
  }, [geojson.features]);

  const { bbox, zoom, isLoaded } = useMapViewport({ padding: 100 });

  // Get clusters based on current viewport
  const clusters = useMemo(() => {
    if (
      !clustererRef.current ||
      !dataLoaded ||
      !isLoaded ||
      !bbox ||
      zoom === undefined
    ) {
      return [];
    }

    try {
      return clustererRef.current.getClusters(bbox, zoom);
    } catch (error) {
      console.error("Error getting clusters:", error);
      return [];
    }
  }, [bbox, zoom, dataLoaded, isLoaded]);

  const getClusterExpansionZoom = useCallback(
    (clusterId: number) =>
      clustererRef.current?.getClusterExpansionZoom(clusterId),
    [clustererRef]
  );

  return { clusters, getClusterExpansionZoom };
}
