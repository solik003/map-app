
import { useState, useCallback } from "react";
import { useFirebaseAddRecord } from "./useFirebaseAddRecord";

interface Marker {
  id: string;
  location: { lat: number; lng: number };
  timestamp: string;
  markerNumber: string;
  nextMarkerId: string | null;
}

const useMarkers = (token: string | null) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const { addRecord } = useFirebaseAddRecord(token);

  const handleMapClick = useCallback(
    (event: any) => {
      const { lng, lat } = event.lngLat;

      const newMarker: Marker = {
        id: Math.random().toString(36).substring(7),
        location: { lat, lng },
        timestamp: new Date().toISOString(),
        markerNumber: (markers.length + 1).toString(),
        nextMarkerId: markers.length > 0 ? markers[markers.length - 1].id : null,
      };

      addRecord('marker', newMarker).then(() => {
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      });
    },
    [markers, addRecord]
  );

  const handleMarkerDragEnd = (id: string, event: any) => {
    const { lng, lat } = event.lngLat;

    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === id
          ? { ...marker, location: { lat, lng } }
          : marker
      )
    );
  };

  const handleMarkerClick = (id: string) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.id !== id)
    );
    console.log("Deleted marker ID:", id);
  };

  const handleClearAllMarkers = () => {
    setMarkers([]);
  };

  return {
    markers,
    handleMapClick,
    handleMarkerDragEnd,
    handleMarkerClick,
    handleClearAllMarkers,
  };
};

export default useMarkers;
