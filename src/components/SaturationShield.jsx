import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

export default function SaturationShield() {
  const comparisons = [
    {
      feature: 'Core Deliverable',
      traditional: 'Standard Social Media Posts, Aesthetic Grids & Basic Ad Sets',
      ahmv: 'Custom Code Engineering + Infrastructure + System Displacement Math',
    },
    {
      feature: 'Value Metric',
      traditional: 'Vanity Metrics (Likes, Impressions, Reach, Followers)',
      ahmv: 'Direct, Trackable Banked Net Profit & Revenue Engineering',
    },
    {
      feature: 'Client Software Stack',
      traditional: 'Adds more third-party subscriptions & fragmented SaaS tools',
      ahmv: 'Eliminates Salesforce/HubSpot bloat with a single bespoke internal CRM',
    },
    {
      feature: 'Lead Handling & Follow-up',
      traditional: 'Manual human follow-ups leading to severe lead degradation',
      ahmv: 'Instant 24/7 WhatsApp API & Email Autonomous AI Lead Qualification',
    },
    {
      feature: 'Pricing & Margin Structure',
      traditional: 'Price war race to the bottom due to severe commodity saturation',
      ahmv: 'Structurally insulated by operating at custom software engineering layer',
    },
  ];

  return (
    <section id="different" className="light-section-wrapper light-padding">
      <div className="light-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="light-section-tag">01 // MARKET DIFFERENTIATION</span>
          <h2 className="light-section-title">
            The Saturation Shield:<br />
            Escaping the Agency Trap
          </h2>
          <p className="light-section-desc" style={{ margin: '0 auto' }}>
            Traditional digital marketing agencies in India suffer from severe market saturation and compete strictly on price. 
            AHMV Systems is structurally insulated by operating at custom software engineering & localized systems design.
          </p>
        </div>

        {/* Split Contrast Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
        }} className="shield-grid">
          
          {/* Traditional Agencies */}
          <div className="light-card" style={{ background: '#f8f8fa', border: '1px solid #e4e4e7' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid #e4e4e7',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} color="#a1a1aa" />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 800, color: '#71717a' }}>
                    TRADITIONAL AGENCIES
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#a1a1aa', marginTop: '2px' }}>
                    COMMODITIZED MODEL
                  </div>
                </div>
              </div>
              <span className="light-badge-pill" style={{ opacity: 0.6, background: '#e4e4e7' }}>COMMODITY</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comparisons.map((item, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '1px solid #e4e4e7',
                  padding: '16px',
                  borderRadius: '12px',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#a1a1aa', marginBottom: '4px' }}>
                    {item.feature.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '14px', color: '#71717a', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <XCircle size={16} color="#a1a1aa" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item.traditional}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AHMV Systems */}
          <div className="light-card" style={{ background: '#ffffff', border: '2px solid #09090b', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid #e4e4e7',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#09090b" />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 800, color: '#09090b' }}>
                    AHMV SYSTEMS
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#09090b', marginTop: '2px' }}>
                    FULL-STACK ENGINEERING
                  </div>
                </div>
              </div>
              <span className="light-badge-pill" style={{ background: '#09090b', color: '#ffffff' }}>
                INSULATED
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comparisons.map((item, i) => (
                <div key={i} style={{
                  background: '#f4f4f5',
                  border: '1px solid #e4e4e7',
                  padding: '16px',
                  borderRadius: '12px',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#09090b', fontWeight: 700, marginBottom: '4px' }}>
                    {item.feature.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '14px', color: '#09090b', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#09090b" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item.ahmv}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .shield-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
