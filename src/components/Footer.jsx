import React, { useState } from 'react';

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    bottleneck: '',
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="diagnostic" style={{ background: 'var(--mwg2-white)', color: 'var(--mwg2-black)', borderRadius: 'var(--mwg2-radius-l)', margin: '10px', padding: '80px var(--grid-margin) 40px' }}>
      
      {/* Diagnostic Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto 60px', textAlign: 'center' }}>
        <p className="label diode pr" style={{ marginBottom: '16px', color: 'var(--mwg2-black)' }}>OPERATIONS ASSESSMENT</p>
        
        <h2 className="title-m" style={{ color: 'var(--mwg2-black)', marginBottom: '16px' }}>
          Start with a free operational review. No sales pitch, no obligation.
        </h2>

        <p className="body-s" style={{ color: 'var(--mwg2-dark-grey)', maxWidth: '720px', margin: '0 auto 30px' }}>
          This is not a sales call. It is an honest, structured conversation to see whether we can genuinely help: and if we can't, we will tell you plainly.
        </p>

        {/* 3 Step Process Box */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left', background: 'var(--mwg2-light-grey)', padding: '24px', borderRadius: 'var(--mwg2-radius-m)', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)' }}>STEP 1</span>
            <p style={{ fontSize: '13px', color: 'var(--mwg2-black)', fontWeight: 600, marginTop: '4px' }}>We review your note first</p>
            <p style={{ fontSize: '12px', color: 'var(--mwg2-dark-grey)', marginTop: '2px' }}>We read what you send before the call so you don't waste time repeating yourself.</p>
          </div>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)' }}>STEP 2</span>
            <p style={{ fontSize: '13px', color: 'var(--mwg2-black)', fontWeight: 600, marginTop: '4px' }}>We review workflows</p>
            <p style={{ fontSize: '12px', color: 'var(--mwg2-dark-grey)', marginTop: '2px' }}>Direct questions about your sales process, pipelines, customer welcoming, and admin delays.</p>
          </div>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)' }}>STEP 3</span>
            <p style={{ fontSize: '13px', color: 'var(--mwg2-black)', fontWeight: 600, marginTop: '4px' }}>You get an honest read</p>
            <p style={{ fontSize: '12px', color: 'var(--mwg2-dark-grey)', marginTop: '2px' }}>A mapped set of fixes if we're a fit, or a direct recommendation to another team if we're not.</p>
          </div>
        </div>
      </div>

      {/* Diagnostic Form */}
      <div style={{ maxWidth: '680px', margin: '0 auto 80px' }}>
        {submitted ? (
          <div style={{ background: 'var(--mwg2-black)', color: '#FFF', padding: '40px', borderRadius: 'var(--mwg2-radius-m)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Assessment Request Received</h3>
            <p style={{ fontSize: '15px', color: '#A1A1AA', lineHeight: '1.5' }}>
              We will review your operational bottleneck note personally and respond via Email / WhatsApp within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="info-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Your Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Tariq Al-Mansoor"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', height: '48px', padding: '0 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--mwg2-light-grey)', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Business Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Apex Operations"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  style={{ width: '100%', height: '48px', padding: '0 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--mwg2-light-grey)', fontSize: '14px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                What's the one thing about your operations that's costing you the most time or money right now? *
              </label>
              <textarea 
                required 
                rows="4"
                placeholder="e.g. Leads are coming in from Meta ads, but follow-up is manual & slow. We're also paying $3k/mo for HubSpot and Asana..."
                value={formData.bottleneck}
                onChange={(e) => setFormData({...formData, bottleneck: e.target.value})}
                style={{ width: '100%', padding: '16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--mwg2-light-grey)', fontSize: '14px', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email / WhatsApp *</label>
              <input 
                type="text" 
                required 
                placeholder="email@company.com or +968 / +91 WhatsApp"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                style={{ width: '100%', height: '48px', padding: '0 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--mwg2-light-grey)', fontSize: '14px' }}
              />
            </div>

            <button type="submit" className="cta-main cta-main3" style={{ height: '54px', width: '100%', justifyContent: 'center', fontSize: '14px' }}>
              <span>Submit Assessment Request</span>
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <p style={{ fontSize: '13px', color: 'var(--mwg2-grey)', textAlign: 'center', fontStyle: 'italic' }}>
              "We read every submission personally. If it's not a fit, you'll hear that from us directly: not silence."
            </p>
          </form>
        )}
      </div>

      {/* Footer Navigation & Copyright */}
      <div className="bottom">
        <div>
          <div style={{ marginBottom: '16px' }}>
            <img
              src="/logo.png.png"
              onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              alt="AHMV Systems Logo"
              style={{ height: '60px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
          <p style={{ fontSize: '13px', color: 'var(--mwg2-dark-grey)', maxWidth: '280px', lineHeight: 1.5 }}>
            Operations Review & Growth Engineering Practice. India & GCC.
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h2>Pillars</h2>
            <ul>
              <li><a href="#services">Revenue & Sales</a></li>
              <li><a href="#services">Business Operations</a></li>
              <li><a href="#services">Customer Operations</a></li>
              <li><a href="#services">Finance Operations</a></li>
              <li><a href="#services">People Operations</a></li>
              <li><a href="#services">Management Intelligence</a></li>
              <li><a href="#services">Technology & Systems</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Company</h2>
            <ul>
              <li><a href="#different">Why AHMV</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#founder">Founder</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Contact</h2>
            <ul>
              <li><a href="#diagnostic">Operations Review</a></li>
              <li><a href="mailto:diagnostic@ahmv.systems">diagnostic@ahmv.systems</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-end">
        <p>© {new Date().getFullYear()} AHMV Systems. All rights reserved.</p>
        <p>Built hands-on for real operations.</p>
      </div>
    </footer>
  );
}
