import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockItems } from '../data/mockData';

function AllItems() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="page-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontSize: '2rem', color: 'var(--text-main)' }}>Browse All Items</h2>
        <p style={{ color: 'var(--text-muted)' }}>Search through all lost and found items in the system.</p>
      </div>

      {/* Filter Section */}
      <section className="filter-container" style={{ margin: '0 auto 3rem', width: '100%' }}>
        <input 
          type="text" 
          placeholder="Search for items (e.g., Water bottle, ID card)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="documents">IDs & Documents</option>
          <option value="accessories">Accessories & Bags</option>
          <option value="clothing">Clothing</option>
          <option value="other">Other</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </section>

      {/* Items Grid */}
      <main className="items-section" style={{ width: '100%', padding: '0' }}>
        <div className="items-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
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
                  <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: item.status === 'lost' ? 'var(--primary-rose)' : 'var(--found-green)' }}>
                    <strong>Status: </strong> {item.status === 'lost' ? 'Still Missing' : 'Safely Found'}
                  </div>
                  <button className="btn-card" onClick={(e) => { e.stopPropagation(); navigate(`/item/${item.id}`); }}>View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: 'var(--text-muted)' }}>
              No items found matching your criteria.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllItems;
