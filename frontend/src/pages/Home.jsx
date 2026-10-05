import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockItems } from '../data/mockData';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleReportClick = (e, type) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login first to report an item.");
      navigate('/login');
    } else {
      navigate(`/report?type=${type}`);
    }
  };

  // Only show the 3 most recent items on the Home page
  const recentItems = mockItems.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <h1>Lost Something on Campus?</h1>
        <p>Report lost or found items quickly and reconnect with their owners inside university.</p>
        <div className="hero-buttons">
          <button onClick={(e) => handleReportClick(e, 'lost')} className="btn-primary">
            Report Lost Item
          </button>
          <button onClick={(e) => handleReportClick(e, 'found')} className="btn-secondary">
            Report Found Item
          </button>
        </div>
      </header>

      {/* Items Section */}
      <main className="items-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Recent Reports</h2>
          <Link to="/items" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Browse All Items &rarr;
          </Link>
        </div>
        
        <div className="items-grid">
          {recentItems.length > 0 ? (
            recentItems.map(item => (
              <div className="item-card" key={item.id} onClick={() => navigate(`/item/${item.id}`)} style={{ cursor: 'pointer' }}>
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                  <span className={`badge badge-${item.status}`}>{item.status.toUpperCase()}</span>
                </div>
                <div className="card-content">
                  <span className="category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p className="location">📍 {item.location}</p>
                  <p className="date">🗓️ {item.date}</p>
                  <button className="btn-card" onClick={(e) => { e.stopPropagation(); navigate(`/item/${item.id}`); }}>View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p>No recent items found.</p>
          )}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/items" className="btn-primary" style={{ textDecoration: 'none', padding: '0.8rem 2rem' }}>
            View All Lost & Found Items
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
