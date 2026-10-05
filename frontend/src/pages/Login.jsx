import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('user', JSON.stringify({ name, regNo }));
    alert(`Welcome to UniFind, ${name}!`);
    navigate('/');
    // Refresh to update navbar state
    window.location.reload();
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Poppins', color: 'var(--text-main)', fontSize: '1.8rem' }}>Student Login</h2>
          <p style={{ color: 'var(--text-muted)' }}>Enter your details to report or claim items.</p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Perera A.B.C"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Registration Number Field */}
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label>Registration Number</label>
            <input
              type="text"
              placeholder="e.g. EG/2020/XXXX"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '0.8rem', fontSize: '1.1rem' }}>
            Login to UniFind
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Staff members can also login using their Staff ID.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
