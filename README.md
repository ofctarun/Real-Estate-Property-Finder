# Real Estate Property Finder

A comprehensive real estate platform with interactive Mapbox maps, geospatial search, and robust integration testing using Puppeteer.

## Features

- **Interactive Map**: Visualize properties on a Mapbox map with custom markers.
- **Geospatial Search**:
  - **Location Autocomplete**: Mock geocoding for SF, LA, and NY.
  - **Radius Search**: Filter properties within a customizable radius.
  - **Boundary Search**: Draw custom polygons to filter properties.
- **Advanced Filtering**: Filter by price, bedrooms, and more.
- **Property Details**: View detailed property info and distance to nearby amenities.
- **Saved Searches**: Save and reload your search criteria.
- **Responsive Design**: Split-screen map/list view.

## Tech Stack

- **Frontend**: React (Vite)
- **Maps**: Mapbox GL JS, `@mapbox/mapbox-gl-draw`, `@turf/turf`
- **Testing**: Jest, Puppeteer (Headless Chrome)
- **Containerization**: Docker, Docker Compose

## Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- Mapbox Public Access Token

## Getting Started

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```
Ensure `MAPBOX_ACCESS_TOKEN` is set (a mock token is provided for testing, but a real token is recommended for development).

### 2. Running with Docker (Recommended)

To build the application and run the integration tests in a containerized environment:

```bash
docker-compose up --build --abort-on-container-exit
```

This will:
1. Start the React application on port 3006.
2. Launch the Puppeteer test runner.
3. Execute the integration test suite.
4. Output test results to `./test-results`.

### 3. Local Development

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
Access the app at `http://localhost:3006`.

Run integration tests locally (requires running app):
```bash
# In a separate terminal
npm run test:integration
```

## Project Structure

```
src/
  components/       # Reusable UI components (Map, Property, Search)
  pages/            # Page components (Properties, Detail, Saved)
  utils/            # Helper functions (Mock Data, Geospatial)
tests/
  integration/      # Puppeteer integration tests
```

## Testing Strategy

The project includes a comprehensive suite of integration tests covering:
- Map initialization and marker rendering.
- Location autocomplete and map centering.
- Geospatial filtering (Radius and Polygon).
- Marker interactions and card highlighting.
- Saving and loading search criteria.

Tests are located in `tests/integration/` and use `jest` with `puppeteer`.
