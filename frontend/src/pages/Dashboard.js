import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scene from '../components/Scene';
import '../index.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || 'User';
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const hour = time.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <Scene />
      <div className="dash-page">
        <nav className="dash-nav">
          <div className="dash-logo">
            <div className="dash-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="dash-logo-text">AuthFlow</span>
          </div>
          <button className="btn-ghost" onClick={logout}>Sign out</button>
        </nav>

        <div className="dash-hero">
          <div className="dash-greeting">{greeting}, {name}! 👋</div>
          <p className="dash-sub">You're securely signed in. Your session is active.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-pill pill-indigo">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
              ACTIVE
            </div>
            <div className="stat-value">Verified</div>
            <div className="stat-label">Auth Status · JWT Token</div>
          </div>

          <div className="stat-card">
            <div className="stat-pill pill-cyan">⏱ LIVE</div>
            <div className="stat-value" style={{ fontSize: '20px', fontVariantNumeric: 'tabular-nums' }}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="stat-label">Local Time</div>
          </div>

          <div className="stat-card">
            <div className="stat-pill pill-emerald">👤 USER</div>
            <div className="stat-value" style={{ fontSize: '19px' }}>{name}</div>
            <div className="stat-label">Signed in as · Member</div>
          </div>
        </div>
      </div>
    </>
  );
}
