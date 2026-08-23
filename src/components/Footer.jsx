import React, { useState } from 'react';

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    workEmail: '',
    company: '',
    systemNeed: 'Not sure yet - that\'s what the review is for',
    bottleneck: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer
      id="contact"
      style={{
        background: '#FFFFFF',
        color: '#0A0A0B',
        padding: '100px 0 40px',
        position: 'relative',
      }}
    >
      {/* Assessment Form Container */}
      <div style={{ maxWidth: '780px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
            OPERATIONS ASSESSMENT
          </p>
          
          <h2
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 'clamp(30px, 4.2vw, 54px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--mwg2-black)',
              marginBottom: '20px',
            }}
          >
            Start with a free operational review.
          </h2>

          <p style={{ color: 'var(--mwg2-grey)', maxWidth: '580px', margin: '0 auto', fontSize: '15px', lineHeight: 1.65, fontWeight: 400 }}>
            This is not a sales call. We read your note before we call, ask direct questions about how your business actually runs, and give you an honest read - a mapped set of fixes if we're a fit, or a direct recommendation elsewhere if we're not.
          </p>
        </div>

        {submitted ? (
          <div style={{ background: '#0A0A0B', color: '#FFFFFF', padding: '48px 32px', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Operations Review Booked</h3>
            <p style={{ fontSize: '15px', color: '#A1A1AA', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
              We will review your notes personally and reach out to your work email within 24 hours with scheduled times.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: '#F4F4F5',
              border: '1px solid #E4E4E7',
              borderRadius: '16px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px', color: '#27272A' }}>
                  Name *
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#FFFFFF', fontSize: '14px', color: '#0A0A0B' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px', color: '#27272A' }}>
                  Work Email *
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({...formData, workEmail: e.target.value})}
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#FFFFFF', fontSize: '14px', color: '#0A0A0B' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px', color: '#27272A' }}>
                  Company *
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#FFFFFF', fontSize: '14px', color: '#0A0A0B' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px', color: '#27272A' }}>
                  System you need
                </label>
                <select
                  value={formData.systemNeed}
                  onChange={(e) => setFormData({...formData, systemNeed: e.target.value})}
                  style={{ width: '100%', height: '46px', padding: '0 12px', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#FFFFFF', fontSize: '13px', color: '#0A0A0B' }}
                >
                  <option value="Sales & Revenue">Sales & Revenue</option>
                  <option value="Customer Operations">Customer Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="AI Workforce">AI Workforce</option>
                  <option value="Custom Builds">Custom Builds</option>
                  <option value="Not sure yet - that's what the review is for">Not sure yet - that's what the review is for</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px', color: '#27272A' }}>
                Where is your business losing time or money? *
              </label>
              <textarea 
                required 
                rows="4"
                placeholder="Describe your current bottleneck, disconnected tools, or manual workflow..."
                value={formData.bottleneck}
                onChange={(e) => setFormData({...formData, bottleneck: e.target.value})}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7', background: '#FFFFFF', fontSize: '14px', fontFamily: 'inherit', color: '#0A0A0B' }}
              />
            </div>

            <button
              type="submit"
              className="cta-main cta-main1"
              style={{
                height: '52px',
                width: '100%',
                justifyContent: 'center',
                fontSize: '14px',
                background: '#0A0A0B',
                color: '#FFFFFF',
                borderRadius: '8px',
              }}
            >
              <span>Book my free operations review</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <p style={{ fontSize: '12px', color: 'var(--mwg2-grey)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
              No pitch. No obligation. We'll tell you plainly if we can't help.
            </p>
          </form>
        )}
      </div>

      {/* Footer Navigation & Brand */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #E4E4E7', paddingTop: '48px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '12px' }}>
            <img
              src="/logo.png.png"
              onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              alt="AHMV Systems Logo"
              style={{ height: '48px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
          <p style={{ fontSize: '13px', color: '#71717A', maxWidth: '360px', lineHeight: 1.5 }}>
            AHMV.SYSTEMS - We build and operate the systems behind sales, operations, customer management, and finance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0A0A0B', marginBottom: '12px' }}>
              NAVIGATION
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="/#systems" style={{ color: '#52525B', textDecoration: 'none' }}>Systems</a></li>
              <li><a href="/#products" style={{ color: '#52525B', textDecoration: 'none' }}>Products (10)</a></li>
              <li><a href="/#process" style={{ color: '#52525B', textDecoration: 'none' }}>Process</a></li>
              <li><a href="/#pricing" style={{ color: '#52525B', textDecoration: 'none' }}>Pricing</a></li>
              <li><a href="/#faq" style={{ color: '#52525B', textDecoration: 'none' }}>FAQ</a></li>
              <li><a href="/#contact" style={{ color: '#52525B', textDecoration: 'none' }}>Book Operations Review</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', borderTop: '1px solid #F4F4F5', paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#A1A1AA', fontFamily: 'var(--font-mono)', flexWrap: 'wrap', gap: '12px' }}>
        <p>© 2026 AHMV Systems. All rights reserved.</p>
        <p>Operations engineering.</p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
