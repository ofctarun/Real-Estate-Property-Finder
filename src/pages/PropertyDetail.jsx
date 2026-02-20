import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { mockProperties, mockAmenities } from '../utils/mockData';
import { getDistanceFromLatLonInKm } from '../utils/geospatial';

// Token is injected via vite.config.js define
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.test.mock-token-for-testing-purposes';

const PropertyDetail = () => {
    const { id } = useParams();
    const property = mockProperties.find(p => p.id === parseInt(id));
    const mapContainer = useRef(null);
    const map = useRef(null);

    if (!property) {
        return <div>Property not found</div>;
    }

    // Calculate amenities distances
    const amenitiesWithDistance = mockAmenities.map(amenity => {
        const distance = getDistanceFromLatLonInKm(
            property.latitude,
            property.longitude,
            amenity.latitude,
            amenity.longitude
        );
        return { ...amenity, distance: distance.toFixed(2) }; // rounded to 2 decimal places
    }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        .slice(0, 5); // Show closest 5

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [property.longitude, property.latitude],
            zoom: 14
        });

        new mapboxgl.Marker()
            .setLngLat([property.longitude, property.latitude])
            .addTo(map.current);

    }, [property]);

    return (
        <div data-testid="property-detail-container" style={styles.container}>
            <h1 data-testid="property-title">{property.title}</h1>
            <p data-testid="property-price" style={styles.price}>${property.price.toLocaleString()}</p>
            <p data-testid="property-full-address">
                {property.address}, {property.city}, {property.state} {property.zipcode}
            </p>

            <div style={styles.grid}>
                <div style={styles.main}>
                    <img src={property.images[0]} alt={property.title} style={styles.image} />
                    <div style={styles.details}>
                        <p>{property.description}</p>
                        <ul>
                            {property.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </div>
                </div>

                <div style={styles.sidebar}>
                    <div data-testid="property-map" style={styles.mapContainer}>
                        <div ref={mapContainer} style={{ width: '100%', height: '300px' }} />
                    </div>
                    <div data-testid="property-coordinates" style={styles.coords}>
                        Lat: {property.latitude}, Lng: {property.longitude}
                    </div>

                    <div data-testid="nearby-amenities" style={styles.amenities}>
                        <h3>Nearby Amenities</h3>
                        <ul>
                            {amenitiesWithDistance.map((amenity, index) => (
                                <li key={index} data-testid={`amenity-distance-${index}`}>
                                    {amenity.name} ({amenity.type}): {amenity.distance} km
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    price: {
        fontSize: '1.5rem',
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    grid: {
        display: 'flex',
        gap: '2rem',
        marginTop: '2rem',
        flexWrap: 'wrap'
    },
    main: {
        flex: 2,
        minWidth: '300px'
    },
    sidebar: {
        flex: 1,
        minWidth: '300px'
    },
    image: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px'
    },
    mapContainer: {
        marginBottom: '1rem',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    coords: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '1rem'
    },
    amenities: {
        backgroundColor: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px'
    }
};

export default PropertyDetail;
