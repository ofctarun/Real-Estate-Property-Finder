import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, onSave, savedIds }) => {
    return (
        <div data-testid="property-list" style={styles.list}>
            {properties.map(property => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    onSave={onSave}
                    isSaved={savedIds && savedIds.includes(property.id)}
                />
            ))}
        </div>
    );
};

const styles = {
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem'
    }
};

export default PropertyList;
