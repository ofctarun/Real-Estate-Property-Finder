import React, { useState } from 'react';

const Filters = ({ onFilterChange, onDrawClick, isDrawActive, onLocationSelect }) => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [radius, setRadius] = useState(5);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');

    const mockLocations = [
        { name: "San Francisco, CA", center: [-122.4194, 37.7749] },
        { name: "Los Angeles, CA", center: [-118.2437, 34.0522] },
        { name: "New York, NY", center: [-74.0060, 40.7128] }
    ];

    const handleApply = () => {
        onFilterChange({
            location,
            radius,
            minPrice,
            maxPrice,
            bedrooms
        });
    };

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);

        if (value.length > 2) {
            const filtered = mockLocations.filter(loc =>
                loc.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion.name);
        setSuggestions([]);
        if (onLocationSelect) {
            onLocationSelect(suggestion.center);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.group}>
                <label>Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    data-testid="location-autocomplete"
                    placeholder="Enter location (e.g. San Francisco)"
                    style={styles.input}
                />
                {suggestions.length > 0 && (
                    <ul style={styles.suggestions}>
                        {suggestions.map((s, index) => (
                            <li
                                key={index}
                                data-testid={`autocomplete-suggestion-${index}`}
                                onClick={() => handleSuggestionClick(s)}
                                style={styles.suggestionItem}
                            >
                                {s.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={styles.group}>
                <label>Radius: {radius} km</label>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    data-testid="search-radius-slider"
                    style={styles.slider}
                />
            </div>

            <div style={styles.row}>
                <div style={styles.group}>
                    <label>Min Price</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        data-testid="price-min-input"
                        style={styles.input}
                    />
                </div>
                <div style={styles.group}>
                    <label>Max Price</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        data-testid="price-max-input"
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.group}>
                <label>Bedrooms</label>
                <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    data-testid="bedrooms-select"
                    style={styles.input}
                >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                </select>
            </div>

            <div style={styles.actions}>
                <button
                    onClick={onDrawClick}
                    data-testid="draw-boundary-button"
                    style={{ ...styles.button, backgroundColor: isDrawActive ? '#e74c3c' : '#95a5a6' }}
                >
                    {isDrawActive ? 'Clear Boundary' : 'Draw Boundary'}
                </button>

                <button
                    onClick={handleApply}
                    data-testid="apply-filters-button"
                    style={{ ...styles.button, backgroundColor: '#2ecc71' }}
                >
                    Apply Filters
                </button>
            </div>

        </div>
    );
};

const styles = {
    container: {
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        position: 'relative' // for suggestion absolute positioning
    },
    group: {
        marginBottom: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    row: {
        display: 'flex',
        gap: '1rem'
    },
    input: {
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    slider: {
        width: '100%'
    },
    actions: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem'
    },
    button: {
        flex: 1,
        padding: '0.5rem',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    suggestions: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        border: '1px solid #ccc',
        backgroundColor: 'white',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
        color: '#000',
        maxHeight: '200px',
        overflowY: 'auto'
    },
    suggestionItem: {
        padding: '0.5rem',
        cursor: 'pointer',
        borderBottom: '1px solid #eee'
    }
};

export default Filters;
