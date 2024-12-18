import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        // Get the user's current position
       navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} = position.coords;
        setCurrentPosition({
            lat:latitude,
            lng:longitude
        })
       })

        // Watch the user's position for continuous updates
       const watchId = navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} = position.coords;
        setCurrentPosition({
            lat:latitude,
            lng:longitude
        })
       })

        // Cleanup the watcher on unmount
        return ()=> navigator.geolocation.clearWatch(watchId)
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;