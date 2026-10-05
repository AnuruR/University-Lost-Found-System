import React from 'react';

function Contact() {
  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontSize: '2.2rem', color: 'var(--text-main)' }}>Contact & Security Office</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Reach out to the University Security Office for urgent lost or found matters.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

        {/* Security Office Details */}
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
          <h3 style={{ color: 'var(--primary-rose)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🛡️ Security Office
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Emergency Hotline:</strong>
              <p style={{ color: 'var(--text-muted)' }}>+94 91 224 5765</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>General Inquiries:</strong>
              <p style={{ color: 'var(--text-muted)' }}>+94 91 224 5766</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Email:</strong>
              <p style={{ color: 'var(--text-muted)' }}>security@eng.ruh.ac.lk</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Location:</strong>
              <p style={{ color: 'var(--text-muted)' }}>Main Gate, Faculty of Engineering, Hapugala.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Hours:</strong>
              <p style={{ color: 'var(--text-muted)' }}>24/7 Available</p>
            </div>
          </div>
        </div>

        {/* Administration Office Details */}
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-pink)' }}>
          <h3 style={{ color: 'var(--primary-rose)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🏢 Faculty Administration
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Student Affairs:</strong>
              <p style={{ color: 'var(--text-muted)' }}>+94 91 224 5767</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Email:</strong>
              <p style={{ color: 'var(--text-muted)' }}>admin@eng.ruh.ac.lk</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Location:</strong>
              <p style={{ color: 'var(--text-muted)' }}>Admin Block, Faculty of Engineering.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Hours:</strong>
              <p style={{ color: 'var(--text-muted)' }}>Weekdays, 8:30 AM - 4:15 PM</p>
            </div>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '2.5rem', background: 'var(--bg-pink)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-pink)', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Important Note</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          If you have found a highly valuable item (e.g., wallet with large cash, passports, expensive electronics) and cannot reach the owner, please hand it over directly to the <strong>Security Office at the Main Gate</strong>. They will secure it and assist in finding the owner.
        </p>
      </div>
    </div>
  );
}

export default Contact;
