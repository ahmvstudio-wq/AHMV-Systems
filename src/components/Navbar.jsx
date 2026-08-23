import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories } from '../data/serviceCategories';
import { products } from '../data/productsData';

export default function Navbar({ onOpenAudit }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(serviceCategories[0].id);
  const megaTimeout = useRef(null);
  const megaRef = useRef(null);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 220);
  };

  useEffect(() => () => { if (megaTimeout.current) clearTimeout(megaTimeout.current); }, []);

  const activeCatData = serviceCategories.find(c => c.id === activeCat);
  const activeCatProducts = activeCatData
    ? products.filter(p => activeCatData.productIds.includes(p.id))
    : [];

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
            <li><a href="/#systems">SYSTEMS</a></li>
            <li
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              style={{ position: 'relative' }}
            >
              <a href="/#products" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                SERVICES
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" style={{ transition: 'transform 0.3s ease', transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </li>
            <li><a href="/#process">PROCESS</a></li>
            <li><a href="/#pricing">PRICING</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {onOpenAudit && (
            <button
              onClick={onOpenAudit}
              className="desktop-nav"
              style={{
                height: '44px',
                padding: '0 16px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                background: '#FFFFFF',
                color: '#0A0A0B',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              60s AUDIT
            </button>
          )}

          <a href="/#contact" className="cta-main cta-main1 desktop-nav" style={{ height: '44px', padding: '0 22px', fontSize: '12px' }}>
            <span>BOOK OPERATIONS REVIEW</span>
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

      {/* ═══════════════════════════════════════════════════════════════
          MEGA DROPDOWN - SERVICES
         ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={megaRef}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className="mega-dropdown-wrapper"
        style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          width: '100%',
          zIndex: 9999,
          pointerEvents: megaOpen ? 'all' : 'none',
          opacity: megaOpen ? 1 : 0,
          transform: megaOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.35s cubic-bezier(0.23,1,0.32,1), transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '16px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)',
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            overflow: 'hidden',
            minHeight: '380px',
          }}>

            {/* Left - Category List */}
            <div style={{ background: '#FAFAFA', borderRight: '1px solid #F4F4F5', padding: '12px 0' }}>
              <div style={{ padding: '12px 20px 8px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.06em', fontWeight: 600 }}>
                4 SERVICE VERTICALS
              </div>
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveCat(cat.id)}
                  onClick={() => { window.location.hash = '#products'; setMegaOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 20px',
                    background: activeCat === cat.id ? '#FFFFFF' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRight: activeCat === cat.id ? '2px solid #0A0A0B' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={cat.image}
                    alt=""
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: activeCat === cat.id ? '1px solid #0A0A0B' : '1px solid #E4E4E7',
                      transition: 'border 0.2s ease',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: activeCat === cat.id ? 600 : 500, color: '#0A0A0B', lineHeight: 1.3 }}>
                      {cat.shortName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A1A1AA', lineHeight: 1.3, marginTop: '2px' }}>
                      {cat.productIds.length} products
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right - Active Category Details + Products */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
              {/* Category Header with Image */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
                <img
                  src={activeCatData?.image}
                  alt={activeCatData?.name}
                  style={{
                    width: '160px',
                    height: '90px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0A0A0B', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                    {activeCatData?.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.5, margin: 0 }}>
                    {activeCatData?.tagline}
                  </p>
                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    {activeCatData?.stats.map((s, i) => (
                      <div key={i}>
                        <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#0A0A0B' }}>{s.value}</div>
                        <div style={{ fontSize: '10px', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products in Category */}
              <div style={{ borderTop: '1px solid #F4F4F5', paddingTop: '16px' }}>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.04em', marginBottom: '12px', fontWeight: 600 }}>
                  PRODUCTS IN THIS CATEGORY
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: activeCatProducts.length <= 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '10px' }}>
                  {activeCatProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      onClick={() => setMegaOpen(false)}
                      style={{
                        background: '#FAFAFA',
                        border: '1px solid #F4F4F5',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        textDecoration: 'none',
                        color: '#0A0A0B',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A0A0B'; e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F4F4F5'; e.currentTarget.style.background = '#FAFAFA'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>{p.title}</div>
                      <div style={{ fontSize: '11px', color: '#71717A', lineHeight: 1.4 }}>{p.shortDesc.slice(0, 65)}...</div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#0A0A0B' }}>View</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE MENU DRAWER
         ═══════════════════════════════════════════════════════════════ */}
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
          <button onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A0A0B', fontSize: '20px', background: 'none', border: 'none' }}>✕</button>
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          <li><a href="/#systems" onClick={() => setMobileMenuOpen(false)}>SYSTEMS</a></li>
          <li><a href="/#products" onClick={() => setMobileMenuOpen(false)}>SERVICES & PRODUCTS</a></li>
          <li><a href="/#process" onClick={() => setMobileMenuOpen(false)}>PROCESS</a></li>
          <li><a href="/#pricing" onClick={() => setMobileMenuOpen(false)}>PRICING</a></li>
          <li><a href="/#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a></li>
          <li><a href="/#contact" onClick={() => setMobileMenuOpen(false)}>BOOK OPERATIONS REVIEW</a></li>
        </ul>

        {/* Mobile Service Categories */}
        <div style={{ marginTop: '24px', borderTop: '1px solid #E4E4E7', paddingTop: '20px' }}>
          <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.04em', fontWeight: 600, marginBottom: '12px' }}>SERVICE CATEGORIES</p>
          {serviceCategories.map(cat => (
            <a
              key={cat.id}
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', textDecoration: 'none', color: '#0A0A0B', borderBottom: '1px solid #F4F4F5' }}
            >
              <img src={cat.image} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{cat.shortName}</div>
                <div style={{ fontSize: '11px', color: '#71717A' }}>{cat.productIds.length} products</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
