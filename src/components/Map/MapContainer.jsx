import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

// Token is injected via vite.config.js define
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.test.mock-token-for-testing-purposes';

const MapContainer = ({ properties, center, isDrawActive, onMapLoad, onDrawCreate, onDrawDelete, onDrawUpdate }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const draw = useRef(null);
    // Default center if none provided
    const initialCenter = center || { lng: -122.4194, lat: 37.7749 };
    const [zoom, setZoom] = useState(10);
    const markersRef = useRef({});

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [initialCenter.lng, initialCenter.lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            // Add hidden element for testing
            const loadedParams = document.createElement('div');
            loadedParams.setAttribute('data-testid', 'map-loaded');
            loadedParams.style.display = 'none';
            document.body.appendChild(loadedParams); // Attach to body to be easily found, or container? Body is safer for global selector

            // Also attach to window for waitForFunction
            window.mapboxMapLoaded = true;

            if (onMapLoad) onMapLoad(map.current);
        });

        // Initialize Draw
        draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'simple_select'
        });

        map.current.addControl(draw.current);

        map.current.on('draw.create', (e) => onDrawCreate && onDrawCreate(e));
        map.current.on('draw.delete', (e) => onDrawDelete && onDrawDelete(e));
        map.current.on('draw.update', (e) => onDrawUpdate && onDrawUpdate(e));
    }, []); // Only run once on mount

    // Handle center change
    useEffect(() => {
        if (map.current && center) {
            map.current.flyTo({
                center: [center.lng, center.lat],
                zoom: 12
            });
        }
    }, [center]);

    // Handle Draw Interface Logic
    useEffect(() => {
        if (!map.current || !draw.current) return;
        if (isDrawActive) {
            // Programmatically start drawing?
            // MapboxDraw API: changeMode('draw_polygon')
            draw.current.changeMode('draw_polygon');
        } else {
            draw.current.changeMode('simple_select');
            // Start fresh or keep? 
        }
    }, [isDrawActive]);

    // Update markers when properties change
    useEffect(() => {
        if (!map.current) return;

        // Remove old markers
        Object.values(markersRef.current).forEach(marker => marker.remove());
        markersRef.current = {};

        properties.forEach(property => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.setAttribute('data-testid', `map-marker-${property.id}`);
            el.style.backgroundColor = '#e74c3c';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.borderRadius = '50%';
            el.style.cursor = 'pointer';
            el.style.border = '2px solid white';

            const marker = new mapboxgl.Marker(el)
                .setLngLat([property.longitude, property.latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${property.title}</h3><p>$${property.price}</p>`))
                .addTo(map.current);

            el.addEventListener('click', () => {
                // Scroll to card? Highlight?
                const card = document.querySelector(`[data-testid="property-card-${property.id}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.border = '2px solid #3498db';
                    setTimeout(() => card.style.border = '1px solid #ddd', 2000);
                }
            });

            markersRef.current[property.id] = marker;
        });

    }, [properties]);

    // Expose map for parent access (e.g. for fitting bounds)
    useEffect(() => {
        if (map.current) {
            window.mapboxMap = map.current;
        }
    }, [map.current]);

    return (
        <div data-testid="map-container" style={{ position: 'relative', height: '100%', width: '100%' }}>
            <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

export default MapContainer;
