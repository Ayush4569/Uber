import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";

function LocationMarker({ position }) {
  const map = useMapEvents({
    locationfound(e) {
      map.setView(position, 17); // Ensure the map view uses the updated position
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker  position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function LiveTracking({className}) {
  const [position, setPosition] = useState(null); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      (err) => console.error("Error fetching location:", err),
      { enableHighAccuracy: true }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      (err) => console.error("Error watching location:", err),
      { enableHighAccuracy: true, maximumAge: 0}
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) {
    return <div>Loading location...</div>; 
  }

  return (
    <MapContainer
      center={position}
      className={`w-full ${className}`}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker position={position} />
    </MapContainer>
  );
}

export default LiveTracking;
