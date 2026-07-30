import React, { useState } from 'react';
import { Cpu, Users, Zap, Terminal, Share2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function OperationalPillars() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'pillar-1',
      title: 'Pillar 1: Autonomous Client Acquisition Pipeline',
      shortTitle: '01. GTM Acquisition',
      badge: 'INBOUND & OUTBOUND GTM',
      icon: Zap,
      problem: 'Traditional customer acquisition relies on disjointed advertising and slow, manual human follow-ups, leading to severe lead degradation and top-of-funnel revenue leakage.',
      architecture: 'An omnichannel, deterministic pipeline targeting high-intent buyers through dual vectors: Inbound Meta/Google Lead Ads + Outbound automated B2B web-scraping & enrichment pipelines.',
      trigger: 'All leads from inbound ads and outbound emails route instantly to an autonomous conversational interface (WhatsApp / Email APIs) that qualifies prospects, handles objections, and books meetings 24/7.',
      specs: [
        'Meta & Google Lead Form API integration',
        'B2B Profile Data Scraping & Webhook Enrichment',
        '24/7 WhatsApp Conversational Qualification',
        'Direct Calendar Booking without Human Friction'
      ]
    },
    {
      id: 'pillar-2',
      title: 'Pillar 2: Enterprise Ecosystem Consolidation & Localized CRMs',
      shortTitle: '02. Ecosystem CRM',
      badge: 'ZERO SaaS BLOAT',
      icon: Users,
      problem: 'Small & medium enterprises (SMEs) suffer from extreme software bloat, paying high licensing fees for fragmented SaaS tools that create siloed databases and require manual data reconciliation.',
      architecture: 'A singular, custom-built internal CRM platform tailored specifically to the client\'s exact data taxonomy and operational workflow, cutting corporate software expenses down to zero.',
      trigger: 'Cross-departmental data fidelity establishes single-point context updates across all departments automatically.',
      specs: [
        'Bespoke Data Taxonomy Architecture',
        'Complete Elimination of Salesforce/HubSpot Licenses',
        'Cross-Departmental Data Fidelity',
        'Unified Customer Context & Interaction Log'
      ]
    },
    {
      id: 'pillar-3',
      title: 'Pillar 3: Predictive Intelligence & Content Automation',
      shortTitle: '03. Predictive AI',
      badge: 'ACTIVE AI TRACKING',
      icon: Terminal,
      problem: 'Sales representatives and founders waste valuable hours on manual administrative tasks, drafting repetitive follow-ups and scheduling organic social posts, instead of closing deals.',
      architecture: 'Dual Engine Architecture: 1) Content Engine programmatically publishes LinkedIn & Instagram posts on autopilot. 2) Predictive Intelligence tracks prospect velocities to score deals.',
      trigger: 'Active trackers monitor email open velocities & proposal document dwell times to probabilistically score deals and draft 1-click context-aware follow-ups for sales reps.',
      specs: [
        'Autopilot LinkedIn & Instagram Publishing',
        'Real-time Proposal Document Dwell Time Tracking',
        'Email Open Velocity Deal Scoring',
        '1-Click AI Contextual Sales Follow-up Generation'
      ]
    },
    {
      id: 'pillar-4',
      title: 'Pillar 4: Bespoke Internal Tools & Infrastructure Modernization',
      shortTitle: '04. Internal Tools',
      badge: 'SINGLE SOURCE OF TRUTH',
      icon: Cpu,
      problem: 'Legacy back-office operations (tracking human capital, finance pipelines, fulfillment workflows) are managed through fragmented, spreadsheet-reliant systems preventing real-time strategic decision-making.',
      architecture: 'Highly focused internal web applications and custom software blocks built to replace broken manual processes, establishing automated data handoffs and removing accounting overhead.',
      trigger: 'Unifies human capital tracking, finance pipelines, and fulfillment workflows into a single executive command board.',
      specs: [
        'Spreadsheet Replacement Web Applications',
        'Automated Back-Office Data Handoffs',
        'Real-Time Financial & Operational Dashboards',
        'Accounting & Operational Friction Reduction'
      ]
    },
    {
      id: 'pillar-5',
      title: 'Pillar 5: White-Labeled AI System Partnership Program',
      shortTitle: '05. B2B Partnership',
      badge: 'RECURRING RETAINER ENGINE',
      icon: Share2,
      problem: 'Traditional creative, web design, or PR agencies want to upsell advanced AI operational capabilities to their existing client databases to prevent churn, but lack internal engineering talent.',
      architecture: 'A comprehensive B2B partnership program where AHMV Systems white-labels its entire technical infrastructure suite for partner agencies.',
      trigger: 'The partner agency sells AI services under their brand name; AHMV Systems operates silently as the backend technical engine, collecting a hands-free recurring monthly retainer.',
      specs: [
        '100% White-Labeled Technical Infrastructure',
        'Agency Churn Prevention Framework',
        'Silent Backend Fulfillment Engine',
        'Hands-Free Recurring Retainer Revenue'
      ]
    }
  ];

  return (
    <section id="services" className="light-section-wrapper light-padding">
      <div className="light-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="light-section-tag">03 // FIVE CORE OPERATIONAL SOLUTIONS</span>
          <h2 className="light-section-title">
            Architectural Solutions<br />
            Engineered for Scale
          </h2>
          <p className="light-section-desc" style={{ margin: '0 auto' }}>
            Explore the five deterministic software systems engineered by AHMV Systems to replace legacy manual labor and capture maximum revenue.
          </p>
        </div>

        {/* Pillars Card Container */}
        <div className="light-card" style={{ padding: 0, overflow: 'hidden' }}>
          
          {/* Horizontal Architectural Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            overflowX: 'auto',
            background: '#f4f4f5',
          }}>
            {pillars.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    playClickSound();
                    setActivePillar(idx);
                  }}
                  onMouseEnter={playHoverSound}
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '20px 24px',
                    background: isActive ? '#ffffff' : 'transparent',
                    border: 'none',
                    color: isActive ? '#09090b' : '#71717a',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <pillar.icon size={16} color={isActive ? '#09090b' : '#a1a1aa'} />
                  <span>{pillar.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Active Content */}
          <div style={{ padding: '44px' }}>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '26px',
                fontWeight: 800,
                color: '#09090b',
              }}>
                {pillars[activePillar].title}
              </h3>
              <span className="light-badge-pill">
                {pillars[activePillar].badge}
              </span>
            </div>

            {/* Problem vs Solution Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '28px',
              marginBottom: '32px',
            }} className="pillar-detail-grid">
              
              <div style={{
                background: '#f8f8fa',
                border: '1px solid #e4e4e7',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#71717a',
                  marginBottom: '10px',
                  fontWeight: 700,
                }}>
                  <AlertCircle size={16} />
                  <span>OPERATIONAL FRICTION:</span>
                </div>
                <p style={{ color: '#52525b', fontSize: '14px', lineHeight: 1.6 }}>
                  {pillars[activePillar].problem}
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '2px solid #09090b',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#09090b',
                  marginBottom: '10px',
                  fontWeight: 700,
                }}>
                  <Cpu size={16} />
                  <span>DETERMINISTIC ARCHITECTURE:</span>
                </div>
                <p style={{ color: '#09090b', fontSize: '14px', lineHeight: 1.6, fontWeight: 500 }}>
                  {pillars[activePillar].architecture}
                </p>
              </div>

            </div>

            {/* Automation Trigger Banner */}
            <div style={{
              background: '#f4f4f5',
              borderLeft: '4px solid #09090b',
              borderRadius: '0 12px 12px 0',
              padding: '18px 24px',
              marginBottom: '32px',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#09090b',
                fontWeight: 700,
                marginBottom: '4px',
              }}>
                AUTOMATION TRIGGER PROTOCOL
              </div>
              <div style={{ fontSize: '14px', color: '#09090b', fontWeight: 500 }}>
                {pillars[activePillar].trigger}
              </div>
            </div>

            {/* Tech Specs Grid */}
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#71717a',
                marginBottom: '16px',
              }}>
                SYSTEM HARDWARE & SOFTWARE SPECIFICATIONS:
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }} className="spec-grid">
                {pillars[activePillar].specs.map((spec, i) => (
                  <div key={i} style={{
                    background: '#f8f8fa',
                    border: '1px solid #e4e4e7',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px',
                    color: '#09090b',
                  }}>
                    <CheckCircle2 size={16} color="#09090b" style={{ flexShrink: 0 }} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .pillar-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .spec-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
