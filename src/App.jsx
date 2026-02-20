import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import SavedSearches from './pages/SavedSearches';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/properties" replace />} />
                <Route path="/properties" element={<Layout><Properties /></Layout>} />
                <Route path="/property/:id" element={<Layout><PropertyDetail /></Layout>} />
                <Route path="/saved-searches" element={<Layout><SavedSearches /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
