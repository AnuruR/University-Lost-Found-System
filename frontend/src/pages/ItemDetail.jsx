import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockItems } from '../data/mockData';

function ItemDetail() {
  const { id } = useParams();
  const item = mockItems.find(i => i.id === parseInt(id));

  if (!item) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Item not found</h2>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--primary-rose)', textDecoration: 'none', fontWeight: '500' }}>
        &larr; Back to Home
      </Link>
      
      <div style={{ background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
        <div style={{ position: 'relative', height: '300px' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className={`badge badge-${item.status}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
            {item.status.toUpperCase()}
          </span>
        </div>
        
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="category">{item.category}</span>
              <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', color: 'var(--text-main)' }}>{item.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>{item.description}</p>
            </div>
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-pink)', margin: '1.5rem 0' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Location</h4>
              <p style={{ color: 'var(--text-muted)' }}>📍 {item.location}</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Date</h4>
              <p style={{ color: 'var(--text-muted)' }}>🗓️ {item.date}</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Reported By</h4>
              <p style={{ color: 'var(--text-muted)' }}>👤 {item.reporter}</p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-pink)', borderRadius: '12px', border: '1px solid var(--border-pink)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Take Action</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {item.status === 'lost' 
                ? 'Did you find this item? Contact the person who lost it to return it.' 
                : 'Is this your lost item? Contact the finder to claim it.'}
            </p>
            
            <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-pink)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Contact Number:</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-rose)' }}>📞 {item.contact}</p>
            </div>

            {item.status === 'found' ? (
              <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem' }} onClick={() => alert('Claim request sent! Please contact the finder directly as well.')}>
                ✋ Claim This Item
              </button>
            ) : (
              <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem' }} onClick={() => alert('Thank you! Please contact the owner to arrange the return.')}>
                🤝 I Found This Item!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
