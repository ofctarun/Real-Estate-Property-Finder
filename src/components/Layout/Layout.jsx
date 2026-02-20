import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>
            <footer style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#eee', color: '#333' }}>
                &copy; 2024 Real Estate Property Finder
            </footer>
        </div>
    );
};

export default Layout;
