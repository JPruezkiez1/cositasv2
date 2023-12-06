import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ events }) => {
    const [response, setResponse] = useState(null);
    const [distance, setDistance] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (!events || events.length === 0) {
            return;
        }

        const sortedEvents = [...events].sort((a, b) => a.CallOrder - b.CallOrder);

        if (!window.google) {
            console.error("Google Maps JavaScript API not loaded");
            return;
        }

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: sortedEvents[0].Address,
                destination: sortedEvents[sortedEvents.length - 1].Address,
                waypoints: sortedEvents.slice(1, -1).map(event => ({ location: event.Address })),
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    console.log(result);  // This line logs the API response
                    setResponse(result);
                    const totalDistance = result.routes[0].legs.reduce((total, leg) => total + leg.distance.value, 0) * 0.000621371;
                    setDistance(totalDistance);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, [events]);

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
                            <>
                                <DirectionsRenderer
                                    options={{
                                        directions: response,
                                        suppressMarkers: false
                                    }}
                                />
                                {events.map(event => (
                                    <Marker
                                        key={event.EventID}
                                        position={{ lat: event.lat, lng: event.lng }}
                                        onClick={() => {
                                            setSelectedEvent(event);
                                        }}
                                        label={event.EventType}
                                    >
                                        {selectedEvent === event &&
                                            <InfoWindow onCloseClick={() => setSelectedEvent(null)}>
                                                <div>
                                                    <h4>{event.EventType}</h4>
                                                </div>
                                            </InfoWindow>
                                        }
                                    </Marker>
                                ))}
                            </>
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
