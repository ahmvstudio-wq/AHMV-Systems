import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="navigation" style={{ padding: '16px var(--grid-margin)' }}>
        <div className="nav-brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="/logo.png.png"
              onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              alt="AHMV Systems Logo"
              style={{ height: '54px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="label desktop-nav">
          <ul>
            <li><a href="#hero">HOME</a></li>
            <li><a href="#different">DIFFERENT</a></li>
            <li><a href="#process">PROCESS</a></li>
            <li><a href="#services">SERVICES <i className="label-s">05</i></a></li>
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#founder">FOUNDER</a></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#diagnostic" className="cta-main cta-main1 desktop-nav" style={{ height: '44px', padding: '0 22px', fontSize: '12px' }}>
            <span>FREE DIAGNOSTIC</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/logo.png.png"
              onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              alt="AHMV Logo"
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <button onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', fontSize: '20px', background: 'none', border: 'none' }}>✕</button>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          <li><a href="#hero" onClick={() => setMobileMenuOpen(false)}>HOME</a></li>
          <li><a href="#different" onClick={() => setMobileMenuOpen(false)}>DIFFERENT</a></li>
          <li><a href="#process" onClick={() => setMobileMenuOpen(false)}>DIAGNOSTIC PROCESS</a></li>
          <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>SERVICES (5 PILLARS)</a></li>
          <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>ABOUT AHMV</a></li>
          <li><a href="#founder" onClick={() => setMobileMenuOpen(false)}>FOUNDER STATEMENT</a></li>
        </ul>
      </div>
    </>
  );
}
