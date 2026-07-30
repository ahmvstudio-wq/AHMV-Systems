import React, { useState } from 'react';

export default function AwwwardsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="awww backdrop f pr" style={{ maxWidth: '520px' }}>
      <div className="left pr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark-navy)', padding: '12px', borderRadius: 'var(--mwg2-radius-s)', border: '1px solid var(--navy-border)' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--navy-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>
      <div className="right">
        <p className="label-s label-cd" style={{ color: 'var(--navy-blue)', fontWeight: 700 }}>
          AHMV SYSTEM ARCHITECTURE
        </p>
        <p className="p1" style={{ fontWeight: 600 }}>
          Deploy pre-engineered modules for acquisition, CRM, automation & ops.
        </p>
        <p className="p2">
          Stop rebuilding from scratch. Get product speed + custom fit.
        </p>
        <div className="f countdown" style={{ marginTop: '8px' }}>
          <a href="#engagement" className="cta-main cta-main3 roll" style={{ height: '36px', padding: '0 16px', fontSize: '11px' }}>
            <span>
              <span className="translate">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Book Architecture Audit</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </span>
            </span>
          </a>
        </div>
      </div>
      <button 
        className="pa close-awww" 
        onClick={() => setIsVisible(false)}
        aria-label="Close notification"
        style={{ cursor: 'pointer' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="1" y1="1" x2="13" y2="13" />
          <line x1="13" y1="1" x2="1" y2="13" />
        </svg>
      </button>
    </div>
  );
}
