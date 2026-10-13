import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MapSelector from '../components/MapSelector';

function ReportItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') === 'found' ? 'found' : 'lost';
  
  const [itemType, setItemType] = useState(initialType);
  const [user, setUser] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    setItemType(initialType);
  }, [initialType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Report Submitted!');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="page-container" style={{ maxWidth: '600px', margin: '2rem auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Poppins', color: 'var(--text-main)' }}>Report an Item</h2>
        <p style={{ color: 'var(--text-muted)' }}>Help reconnect items with their owners</p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        {/* Type Toggle */}
        <div className="status-toggle">
          <button 
            type="button" 
            className={`type-btn ${itemType === 'lost' ? 'active-lost' : ''}`}
            onClick={() => setItemType('lost')}
          >
            I Lost Something
          </button>
          <button 
            type="button" 
            className={`type-btn ${itemType === 'found' ? 'active-found' : ''}`}
            onClick={() => setItemType('found')}
          >
            I Found Something
          </button>
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Item Title</label>
          <input type="text" placeholder="e.g. Pink Water Bottle, Student ID" required />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select required>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="documents">IDs & Documents</option>
            <option value="accessories">Accessories & Bags</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Location Selector & Faculty Map */}
        <div className="form-group">
          <label>Location in Faculty of Engineering (Hapugala)</label>
          <select required style={{ marginBottom: '0.8rem' }}>
            <option value="">Select Location inside Faculty</option>
            <option value="cafeteria_1">Cafeteria 1 (Kalderama)</option>
            <option value="cafeteria_2">Cafeteria 2 (Hilton)</option>
            <option value="library">Library</option>
            <option value="do_1">DO 1</option>
            <option value="do_2">DO 2</option>
            <option value="auditorium">Auditorium</option>
            <option value="lt_1">LT 1</option>
            <option value="lt_2">LT 2</option>
            <option value="lr_1">LR 1</option>
            <option value="lr_2">LR 2</option>
            <option value="ncc">NCC</option>
            <option value="occ">OCC</option>
            <option value="dcee">DCEE</option>
            <option value="deie">DEIE</option>
            <option value="dmme">DMME</option>
            <option value="dis">DIS</option>
            <option value="dmena">DMENA</option>
            <option value="playground">Faculty Playground</option>
            <option value="other">Other Location</option>
          </select>

          {/* Interactive Leaflet Map */}
          <div style={{ marginTop: '1rem' }}>
            <MapSelector onLocationSelect={setMapLocation} />
          </div>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input type="date" required />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description / Identifying Marks</label>
          <textarea rows="3" placeholder="Add details like brand, stickers, scratches etc."></textarea>
        </div>

        {/* Contact Info */}
        <div className="form-group">
          <label>Contact Number / WhatsApp</label>
          <input type="tel" placeholder="07x xxx xxxx" required />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Image (Optional)</label>
          <input type="file" accept="image/png, image/jpeg, image/jpg" style={{ padding: '0.5rem', background: '#fff' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.2rem' }}>Helps others easily identify the item.</p>
        </div>

        <button type="submit" className="btn-submit">
          Submit Report
        </button>
        <button type="button" className="btn-card" onClick={() => navigate('/')} style={{ marginTop: '0.5rem' }}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ReportItem;
