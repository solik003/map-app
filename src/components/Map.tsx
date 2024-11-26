
import Map, { Marker as MapMarker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useFirebaseToken from "../hooks/useFirebaseToken";
import useMarkers from "../hooks/useMarkers";

const MapWithMarker = () => {
  const { token } = useFirebaseToken();
  const {
    markers,
    handleMapClick,
    handleMarkerDragEnd,
    handleMarkerClick,
    handleClearAllMarkers,
  } = useMarkers(token);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic29sb21paWEzNDIiLCJhIjoiY20zeWJtdHl3MW5rYzJrczVuYjV4Y2dsZiJ9.9Ale-mD7R0pNmc503_L5uw"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            longitude={marker.location.lng}
            latitude={marker.location.lat}
            anchor="center"
            draggable={true}
            onDragEnd={(event) => handleMarkerDragEnd(marker.id, event)}
            onClick={() => handleMarkerClick(marker.id)}
          >
            <div
              style={{
                backgroundColor: "red",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontSize: "12px" }}>
                {marker.markerNumber}
              </span>
            </div>
          </MapMarker>
        ))}
      </Map>
      <div
        style={{
          position: "absolute",
          top: "20px", 
          right: "20px", 
          zIndex: 1,
          backgroundColor: "#007bff", 
          color: "white",
          padding: "10px 20px",  
        }}
        onClick={handleClearAllMarkers}
      >
        Clear All Markers
      </div>
    </div>
  );
};

export default MapWithMarker;
