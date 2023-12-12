import React, { useEffect, useRef, useContext, useState } from 'react';
import 'ol/ol.css';
import './ol.css'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import OSM from 'ol/source/OSM.js';
import Overlay from 'ol/Overlay';
import { Circle, Fill, Stroke, Text, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { DefaultContext } from '../../Context/Context';

const API_KEY = '5b3ce3597851110001cf6248b79337769f8f4c6487ffd785bc7ce8bd';

const Marker = (event) => {
    const marker = new Feature({
        geometry: new Point(fromLonLat([event.lng, event.lat])),
        event: event,
    });

    const iconStyle = new Style({
        image: new Circle({
            radius: 7,
            fill: new Fill({ color: event.EventType === 'PICKUP' ? 'green' : 'orange' }),
            stroke: new Stroke({ color: 'white', width: 2 })
        }),
        text: new Text({
            text: event.CallOrder.toString(),
            offsetY: -15,
            fill: new Fill({ color: 'black' }),
        }),
    });

    marker.setStyle(iconStyle);
    return marker;
};

const MapComponent = () => {
    useEffect(() => {
        require('ol/ol.css');
    }, []);
    const mapRef = useRef();
    const popupRef = useRef();
    const { selectedLoad } = useContext(DefaultContext);
    const [popupContent, setPopupContent] = useState('');

    useEffect(() => {
        const vectorSource = new VectorSource();

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        const popup = new Overlay({
            element: popupRef.current,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -50],
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            overlays: [popup],
            view: new View({
                center: fromLonLat([-98.5795, 39.8283]),
                zoom: 4,
            }),
        });

        const handleMapClick = evt => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);

            if (feature) {
                const coordinates = feature.getGeometry().getCoordinates();
                popup.setPosition(coordinates);
                setPopupContent(
                    `<p>${feature.get('event').EventType}</p><p>${feature.get('event').Address}</p>`
                );
            } else {
                popup.setPosition(undefined);
            }
        };

        map.on('click', handleMapClick);

        if (selectedLoad && selectedLoad.events && selectedLoad.events.length >= 2) {
            vectorSource.addFeatures(selectedLoad.events.map(event => Marker(event)));

            const fetchRoute = async () => {
                const sortedEvents = [...selectedLoad.events].sort((a, b) => a.CallOrder - b.CallOrder);

                for (let i = 0; i < sortedEvents.length - 1; i++) {
                    const start = [sortedEvents[i].lng, sortedEvents[i].lat];
                    const end = [sortedEvents[i + 1].lng, sortedEvents[i + 1].lat];

                    try {
                        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start.join(',')}&end=${end.join(',')}`);

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const data = await response.json();

                        if (data.features && data.features[0] && data.features[0].geometry && data.features[0].geometry.coordinates) {
                            const route = new LineString(data.features[0].geometry.coordinates).transform('EPSG:4326', map.getView().getProjection());
                            const routeFeature = new Feature(route);
                            routeFeature.setStyle(new Style({
                                stroke: new Stroke({
                                    color: '#ffcc33',
                                    width: 5
                                })
                            }));
                            vectorSource.addFeature(routeFeature);
                        }
                    } catch (error) {
                        console.error('There has been a problem with your fetch operation:', error);
                    }
                }
            };

            fetchRoute();
        }

        return () => {
            map.un('click', handleMapClick);
            map.setTarget(undefined);
        };
    }, [selectedLoad]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            <div ref={popupRef} className="ol-popup" dangerouslySetInnerHTML={{ __html: popupContent }} />
        </div>
    );
};

export default MapComponent;
