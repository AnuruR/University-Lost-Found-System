import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockItems } from '../data/mockData';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Filter items specifically for this logged-in user
  const userItems = user ? mockItems.filter(i => i.reporter === user.name) : [];
  
  const myLostItems = userItems.filter(i => i.status === 'lost');
  const myFoundItems = userItems.filter(i => i.status === 'found');
  
  // Dummy data for claimed items
  const claimedItems = [];

  const renderGrid = (items, emptyMessage) => (
    items.length > 0 ? (
      <div className="items-grid" style={{ marginTop: '1rem' }}>
        {items.map(item => (
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
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn-card" style={{ flex: 1 }} onClick={(e) => { e.stopPropagation(); navigate(`/item/${item.id}`); }}>View</button>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={(e) => { e.stopPropagation(); alert('Edit coming soon!'); }}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-pink)', borderRadius: '8px', border: '1px dashed var(--border-pink)' }}>
        <p style={{ color: 'var(--text-muted)' }}>{emptyMessage}</p>
      </div>
    )
  );

  if (!user) return null;

  return (
    <div className="page-container" style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '2rem', color: 'var(--text-main)' }}>My Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage items you have lost, found, or claimed.</p>
        </div>
        <Link to="/report" className="btn-primary" style={{ textDecoration: 'none' }}>+ Report New Item</Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Section: Things I Lost */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-rose)', borderBottom: '2px solid var(--border-pink)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            😞 Items I Have Lost
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>These are items you reported missing. Other students will contact you if they find them.</p>
          {renderGrid(myLostItems, "You haven't reported any lost items.")}
        </div>

        {/* Section: Things I Found */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--found-green)', borderBottom: '2px solid var(--border-pink)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🤝 Items I Have Found
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>These are someone else's items that you found and are keeping safe until they claim them.</p>
          {renderGrid(myFoundItems, "You haven't reported any found items.")}
        </div>

        {/* Section: Things I Claimed */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--border-pink)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ✋ Items I Am Claiming
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>These are items found by others that you have submitted a claim request for.</p>
          {renderGrid(claimedItems, "You haven't claimed any items found by others.")}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
