import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>Real Estate Finder</Link>
            </div>
            <div style={styles.links}>
                <Link
                    to="/properties"
                    style={{ ...styles.link, ...(location.pathname === '/properties' ? styles.active : {}) }}
                    data-testid="nav-properties"
                >
                    Properties
                </Link>
                <Link
                    to="/saved-searches"
                    style={{ ...styles.link, ...(location.pathname === '/saved-searches' ? styles.active : {}) }}
                    data-testid="nav-saved-searches"
                >
                    Saved Searches
                </Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#333',
        color: 'white',
        alignItems: 'center'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    links: {
        display: 'flex',
        gap: '20px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem'
    },
    active: {
        textDecoration: 'underline',
        fontWeight: 'bold'
    }
};

export default Navbar;
