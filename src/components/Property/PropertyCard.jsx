import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, onSave, isSaved }) => {
    const { id, title, price, address, city, state, zipcode, latitude, longitude, images, bedrooms, bathrooms, sqft } = property;

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(price);

    return (
        <div
            className="property-card"
            data-testid={`property-card-${id}`}
            data-latitude={latitude}
            data-longitude={longitude}
            style={styles.card}
        >
            <div style={styles.imageContainer}>
                <img src={images[0]} alt={title} style={styles.image} />
            </div>
            <div style={styles.content}>
                <Link to={`/property/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 data-testid={`property-title-${id}`} style={styles.title}>{title}</h3>
                </Link>
                <p data-testid={`property-price-${id}`} style={styles.price}>{formattedPrice}</p>
                <p data-testid={`property-address-${id}`} style={styles.address}>
                    {address}, {city}, {state} {zipcode}
                </p>
                <div style={styles.details}>
                    <span>{bedrooms} Beds</span> • <span>{bathrooms} Baths</span> • <span>{sqft} sqft</span>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onSave(property);
                    }}
                    data-testid={`save-property-${id}`}
                    style={styles.saveButton}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '1rem',
        backgroundColor: '#fff',
        color: '#333',
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        height: '200px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    content: {
        padding: '1rem'
    },
    title: {
        margin: '0 0 0.5rem 0',
        fontSize: '1.2rem'
    },
    price: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2ecc71',
        margin: '0 0 0.5rem 0'
    },
    address: {
        color: '#666',
        margin: '0 0 0.5rem 0'
    },
    details: {
        fontSize: '0.9rem',
        color: '#888',
        marginBottom: '1rem'
    },
    saveButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default PropertyCard;
