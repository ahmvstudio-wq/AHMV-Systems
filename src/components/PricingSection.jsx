import React, { useState } from 'react';

export default function PricingSection() {
  const [model, setModel] = useState('module'); // 'module' or 'partner'

  return (
    <section id="engagement" className="s-pricing wrapper">
      <div className="pricing-card">
        {/* Toggle Switch */}
        <div className="pricing-toggle">
          <button 
            className={model === 'module' ? 'active' : ''}
            onClick={() => setModel('module')}
          >
            Module Deployment
          </button>
          <button 
            className={model === 'partner' ? 'active' : ''}
            onClick={() => setModel('partner')}
          >
            Operations Partnership <span style={{ background: 'var(--navy-blue)', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontSize: '10px', marginLeft: '4px' }}>POPULAR</span>
          </button>
        </div>

        {/* Price Display */}
        {model === 'module' ? (
          <div>
            <p className="price-amount">Configured</p>
            <p className="price-sub">Per Pre-Engineered Module Deployment</p>
          </div>
        ) : (
          <div>
            <p className="price-amount" style={{ color: 'var(--mwg2-white)' }}>Partnership</p>
            <p className="price-sub">Full Operations & Backend Engineering</p>
          </div>
        )}

        <a 
          href="mailto:contact@ahmvsystems.com" 
          className="cta-main cta-main3" 
          style={{ width: '100%', marginTop: '20px' }}
        >
          <span>Schedule Systems Audit</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Features list */}
        <ul className="pricing-features">
          <li>Pre-built modular foundation (0% rebuild delay)</li>
          <li>100% custom configuration to your real workflow</li>
          <li>Acquisition, CRM, Content & Ops integration</li>
          <li>White-label partner technical delivery available</li>
          <li>Ongoing monitoring & system performance optimization</li>
          <li>Zero SaaS tool bloat or forced workflow rigidness</li>
        </ul>

        <p className="body-xs" style={{ color: 'var(--text-grey)', marginTop: '20px' }}>
          No rigid software licenses. Custom scope & SLA confirmed during system design session.
        </p>
      </div>

      {/* FAQ prompt */}
      <div 
        className="question f f-space f-center" 
        style={{ 
          marginTop: '40px', 
          background: 'var(--navy-card)', 
          padding: '20px 30px', 
          borderRadius: 'var(--mwg2-radius-m)', 
          maxWidth: '620px', 
          width: '100%',
          border: '1px solid var(--navy-border)'
        }}
      >
        <p className="label">Have questions about your exact workflow fit?</p>
        <a href="mailto:contact@ahmvsystems.com" className="cta-main cta-main4 roll" style={{ height: '40px', padding: '0 18px', fontSize: '12px' }}>
          <span>
            <span className="translate">
              <span>Talk to Systems Engineer</span>
              <span>Talk to Systems Engineer</span>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
