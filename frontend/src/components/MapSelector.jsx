import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet (still good to have just in case)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map move events and sync center
function MapEvents({ onMove }) {
  const map = useMap();

  useMapEvents({
    move() {
      onMove(map.getCenter());
    },
    moveend() {
      onMove(map.getCenter());
    }
  });

  return null;
}

// Helper to fly to a location
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), { animate: true, duration: 1 });
    }
  }, [center, map]);
  return null;
}

const MapSelector = ({ onLocationSelect }) => {
  // Default to Faculty of Engineering Ruhuna
  const defaultPosition = { lat: 6.07718, lng: 80.22896 };
  
  // This state tracks where the map is currently centered
  const [currentCenter, setCurrentCenter] = useState(defaultPosition);
  // This state is used to programmatically move the map (e.g. after search)
  const [targetCenter, setTargetCenter] = useState(defaultPosition);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Initialize on first render
  useEffect(() => {
    onLocationSelect(defaultPosition);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setConfirmed(false); // Reset confirmation on new search
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setTargetCenter(newPos);
        setCurrentCenter(newPos);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching location');
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmLocation = () => {
    onLocationSelect(currentCenter);
    setConfirmed(true);
  };

  const handleMapMove = useCallback((newCenter) => {
    setCurrentCenter({ lat: newCenter.lat, lng: newCenter.lng });
    setConfirmed(false); // If they move the map, it's unconfirmed again
  }, []);

  return (
    <div className="map-selector-container">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-pink)',
            background: 'var(--card-bg)',
            color: 'var(--text-main)'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(e);
            }
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={isSearching}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'var(--primary-rose)',
            color: 'white',
            border: 'none',
            cursor: isSearching ? 'not-allowed' : 'pointer'
          }}
        >
          {isSearching ? '...' : 'Search'}
        </button>
      </div>

      <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-pink)', height: '250px' }}>
        
        {/* The Crosshair Marker pinned to the center of the container */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -100%)', // Shift up so the bottom point of the pin is at the center
            zIndex: 1000, 
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <MapPin size={40} color="var(--primary-rose)" fill="white" strokeWidth={2} />
          {/* Small shadow dot to indicate exact center */}
          <div style={{ width: '8px', height: '4px', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', marginTop: '-4px' }}></div>
        </div>

        <MapContainer
          center={currentCenter}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents onMove={handleMapMove} />
          <MapController center={targetCenter} />
        </MapContainer>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
          {confirmed 
            ? <span style={{ color: 'var(--found-green)', fontWeight: '600' }}>✓ Location Confirmed</span> 
            : 'Move the map to place the pin on the exact location.'}
        </p>
        <button
          type="button"
          onClick={handleConfirmLocation}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            background: confirmed ? 'var(--found-green)' : 'var(--primary-rose)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background 0.3s ease'
          }}
        >
          {confirmed ? 'Location Marked' : 'Mark Location'}
        </button>
      </div>
    </div>
  );
};

export default MapSelector;
