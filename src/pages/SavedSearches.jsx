import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedSearches = () => {
    const [savedSearches, setSavedSearches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load from local storage
        const stored = JSON.parse(localStorage.getItem('savedSearches') || '[]');
        setSavedSearches(stored);
    }, []);

    const handleDelete = (id) => {
        const updated = savedSearches.filter(s => s.id !== id);
        setSavedSearches(updated);
        localStorage.setItem('savedSearches', JSON.stringify(updated));
    };

    const handleLoad = (search) => {
        // Navigate to properties with criteria
        // We pass state via navigation or query params
        // For now, simpler to navigate with state
        navigate('/properties', { state: { loadSearch: search } });
    };

    if (savedSearches.length === 0) {
        return (
            <div data-testid="no-saved-searches" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>No Saved Searches</h2>
                <p>Save a search from the properties page to see it here.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Saved Searches</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {savedSearches.map(search => (
                    <div
                        key={search.id}
                        data-testid={`saved-search-${search.id}`}
                        style={styles.card}
                    >
                        <div>
                            <h3>{search.name || `Search ${search.id}`}</h3>
                            <p>Location: {search.criteria.location || 'Any'}</p>
                            <p>Radius: {search.criteria.radius} miles</p>
                            <p>Price: {search.criteria.minPrice || 0} - {search.criteria.maxPrice || 'Any'}</p>
                        </div>
                        <div style={styles.actions}>
                            <button
                                onClick={() => handleLoad(search)}
                                data-testid={`load-search-${search.id}`}
                                style={styles.loadButton}
                            >
                                Load
                            </button>
                            <button
                                onClick={() => handleDelete(search.id)}
                                data-testid={`delete-search-${search.id}`}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    actions: {
        display: 'flex',
        gap: '0.5rem'
    },
    loadButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    deleteButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default SavedSearches;
