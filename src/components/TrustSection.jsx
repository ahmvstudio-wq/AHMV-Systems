import React from 'react';

const techStack = [
  'META ADS API',
  'GOOGLE ADS ENGINE',
  'STRIPE PAYMENTS',
  'HUBSPOT DATA SYNC',
  'POSTGRESQL CORE',
  'SUPABASE DATA HUB',
  'SALESFORCE CRM',
  'OPENAI AUTOMATION',
  'VERCEL EDGE',
  'MAKE WORKFLOWS',
  'ZAPIER PIPELINES',
  'REACT ARCHITECTURE'
];

export default function TrustSection() {
  return (
    <section className="h-trust">
      <p className="label diode pr" style={{ display: 'inline-block', marginBottom: '15px' }}>
        OPERATIONAL INFRASTRUCTURE
      </p>

      <p className="title-m" style={{ color: 'var(--mwg2-white)', marginBottom: '35px' }}>
        Trusted by +120 operations leaders <br />
        <span style={{ color: 'var(--text-grey)' }}>& used by high-growth agencies & systems firms</span>
      </p>

      <div className="logos-marquee">
        <div className="logos-track">
          {[...techStack, ...techStack].map((tech, index) => (
            <span 
              key={index} 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '13px', 
                fontWeight: 700, 
                color: 'var(--mwg2-white)', 
                letterSpacing: '0.08em',
                background: 'var(--navy-card)',
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid var(--navy-border)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
