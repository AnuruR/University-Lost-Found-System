import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Uni<span>Find</span></Link>
      <ul className="nav-links">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/items" className={isActive('/items')}>Browse Items</Link></li>
        {user && <li><Link to="/dashboard" className={isActive('/dashboard')}>My Reports</Link></li>}
        <li><Link to="/contact" className={isActive('/contact')}>Contact Security</Link></li>
      </ul>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
              Hi, {user.name.split(' ')[0]}
            </span>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 1rem' }}>
              Logout
            </button>
            <Link to="/report" className="btn-primary" style={{ textDecoration: 'none' }}>
              + Report Item
            </Link>
          </>
        ) : (
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
