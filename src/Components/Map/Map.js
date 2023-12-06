import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = ({ origin, destination }) => {
    const [response, setResponse] = useState(null);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API not loaded");
            return;
        }

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setResponse(result);
                    const totalDistance = result.routes[0].legs.reduce((total, leg) => total + leg.distance.value, 0) * 0.000621371;
                    setDistance(totalDistance);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, [origin, destination]);

    return (
        <div style={{ width: '60vw', height: 400, border: '1px solid black' }}>
            <LoadScript googleMapsApiKey="AIzaSyCztUKCZ4mi0VCHzUAaAtSY3aXMi1sqRYg">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '80%' }}
                    center={{ lat: 39.50, lng: -98.35 }}
                    zoom={4}
                >
                    {
                        response !== null && (
                            <DirectionsRenderer
                                options={{
                                    directions: response
                                }}
                            />
                        )
                    }
                </GoogleMap>
            </LoadScript>
            <Typography variant="h6">
                Distance: {distance.toFixed(2)} miles
            </Typography>
        </div>
    );
}

export default MapComponent;
