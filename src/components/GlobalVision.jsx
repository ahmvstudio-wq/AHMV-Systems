import React from 'react';
import { Globe, Plane, Heart, Home, DollarSign, ShieldCheck } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

export default function GlobalVision() {
  return (
    <section id="global-vision" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div className="hud-badge" style={{ marginBottom: '16px' }}>
            <Globe size={12} />
            <span>PART 6: LONG-TERM ENTERPRISE VISION</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '34px',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '16px',
          }}>
            THE GLOBAL PIVOT: <span className="gradient-text-mono">OMAN ➔ DUBAI ➔ US EXPANSION</span>
          </h2>
          <p style={{ color: 'var(--mono-muted)', fontSize: '15px' }}>
            Transforming Indian operational proof-of-concept into a high-ticket international B2B SaaS empire collecting revenue in AED & USD.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '40px',
        }} className="roadmap-grid">
          
          <div className="hud-panel" style={{ padding: '24px' }}>
            <div className="hud-corner-trims"></div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--mono-muted)',
              marginBottom: '10px',
            }}>
              PHASE 1: SEP - DEC 2026
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              India Proof-of-Concept
            </h3>
            <p style={{ color: 'var(--mono-muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '14px' }}>
              Build massive technical proof of concept in Indian market, generating ₹7,80,000 in accumulated banked net profit runway.
            </p>
            <div className="hud-badge">
              ₹7.8L BANKED RUNWAY
            </div>
          </div>

          <div className="hud-panel" style={{ padding: '24px', border: '1px solid #ffffff' }}>
            <div className="hud-corner-trims"></div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#ffffff',
              marginBottom: '10px',
            }}>
              PHASE 2: JANUARY 2027
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              Strategic Oman Relocation
            </h3>
            <p style={{ color: 'var(--mono-muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '14px' }}>
              Execute strategic international relocation to Muscat, Oman using the ₹7.8L runway to establish GCC corporate headquarters.
            </p>
            <div className="hud-badge" style={{ background: '#ffffff', color: '#000000' }}>
              <Plane size={12} /> OMAN HEADQUARTERS
            </div>
          </div>

          <div className="hud-panel" style={{ padding: '24px' }}>
            <div className="hud-corner-trims"></div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--mono-muted)',
              marginBottom: '10px',
            }}>
              PHASE 3: 2027 ONWARD
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              Dubai & US Currency Scale
            </h3>
            <p style={{ color: 'var(--mono-muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '14px' }}>
              Pivot marketing framework to high-ticket Dubai & US corporate niches, capturing hands-free recurring SaaS revenue in AED & USD.
            </p>
            <div className="hud-badge">
              <DollarSign size={12} /> AED & USD REVENUE
            </div>
          </div>

        </div>

        {/* Milestones Pod */}
        <div className="hud-panel" style={{
          padding: '32px',
          background: '#0a0a0a',
          border: '1px solid #ffffff',
        }}>
          <div className="hud-corner-trims"></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--mono-muted)' }}>
                THE ULTIMATE WHY & FOUNDER DRIVERS
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                Strategic Enterprise Milestones
              </h3>
            </div>
            <ShieldCheck size={24} color="#ffffff" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }} className="milestone-grid">
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              padding: '18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}>
              <Home size={20} color="#ffffff" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  Parents 3BHK Home Sponsorship
                </h4>
                <p style={{ color: 'var(--mono-muted)', fontSize: '12px', lineHeight: 1.5 }}>
                  Comfortably funding a spacious, premium 3BHK home for the parents using hands-free recurring corporate software profits.
                </p>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              padding: '18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}>
              <Heart size={20} color="#ffffff" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  Family Umrah Trip Sponsorship
                </h4>
                <p style={{ color: 'var(--mono-muted)', fontSize: '12px', lineHeight: 1.5 }}>
                  Safely financing their upcoming sacred Umrah pilgrimage to Makkah & Madinah with zero financial stress or debt.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
