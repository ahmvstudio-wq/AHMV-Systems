import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function InfographicPillar1() {
  return (
    <div style={{ width: '100%', background: '#0A0A0B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px', color: '#FFF', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #27272A', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>INBOUND + OUTBOUND VECTOR</span>
        <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 700 }}>● 24/7 ACTIVE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: '#18181B', padding: '14px', borderRadius: '8px', border: '1px solid #3F3F46' }}>
          <span style={{ fontSize: '10px', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>VECTOR A: INBOUND</span>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#FFF', marginTop: '4px' }}>Meta & Google Lead Ads</p>
        </div>
        <div style={{ background: '#18181B', padding: '14px', borderRadius: '8px', border: '1px solid #3F3F46' }}>
          <span style={{ fontSize: '10px', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>VECTOR B: OUTBOUND</span>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#FFF', marginTop: '4px' }}>Scraped B2B Data</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#FFF', fontWeight: 800, fontSize: '18px' }}>↓</div>

      <div style={{ background: '#18181B', padding: '16px', borderRadius: '10px', border: '2px solid #FFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFF' }}>WhatsApp / Email Conversational Agent</span>
          <span style={{ fontSize: '10px', background: '#FFF', color: '#0A0A0B', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>AI ROUTER</span>
        </div>
        <p style={{ fontSize: '11px', color: '#A1A1AA', marginTop: '6px' }}>Qualifies lead ➔ Answers FAQs ➔ Checks calendar ➔ Books slot</p>
      </div>

      <div style={{ textAlign: 'center', color: '#FFF', fontWeight: 800, fontSize: '18px' }}>↓</div>

      <div style={{ background: '#27272A', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#FFF', fontWeight: 600 }}>Confirmed Meeting in CRM</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FFF' }}>&lt; 60 SEC SPEED</span>
      </div>
    </div>
  );
}

function InfographicPillar2() {
  return (
    <div style={{ width: '100%', background: '#0A0A0B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px', color: '#FFF', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #27272A', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>SYSTEM DISPLACEMENT MATRIX</span>
        <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 700 }}>0 FRAGMENTED TOOLS</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', opacity: 0.5 }}>
        <div style={{ background: '#18181B', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', textDecoration: 'line-through' }}>Salesforce</div>
        <div style={{ background: '#18181B', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', textDecoration: 'line-through' }}>HubSpot</div>
        <div style={{ background: '#18181B', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', textDecoration: 'line-through' }}>Asana</div>
      </div>

      <div style={{ textAlign: 'center', color: '#FFF', fontWeight: 800, fontSize: '18px' }}>➔ MERGED INTO ONE ➔</div>

      <div style={{ background: '#18181B', padding: '20px', borderRadius: '12px', border: '2px solid #FFF' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFF', marginBottom: '8px' }}>Localized Internal CRM & OS Spine</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#A1A1AA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#27272A', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Sales & Pipeline Data</span>
            <span style={{ color: '#FFF' }}>Synced</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#27272A', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Operations & Fulfillment</span>
            <span style={{ color: '#FFF' }}>Synced</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#27272A', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Finance & Invoicing</span>
            <span style={{ color: '#FFF' }}>Synced</span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: '#FFF', textAlign: 'center', fontWeight: 600 }}>
        100% Taxonomical Fit for GCC & India SMEs
      </div>
    </div>
  );
}

function InfographicPillar3() {
  return (
    <div style={{ width: '100%', background: '#0A0A0B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px', color: '#FFF', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #27272A', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>DUAL ENGINE INTELLIGENCE</span>
        <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 700 }}>● REAL-TIME TRACKING</span>
      </div>

      <div style={{ background: '#18181B', padding: '14px', borderRadius: '8px', border: '1px solid #3F3F46' }}>
        <span style={{ fontSize: '10px', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>ENGINE A: CONTENT AUTOPILOT</span>
        <p style={{ fontSize: '12px', color: '#FFF', marginTop: '4px' }}>LinkedIn & Instagram Posts Scheduled & Programmatically Published</p>
      </div>

      <div style={{ background: '#18181B', padding: '14px', borderRadius: '8px', border: '1px solid #3F3F46' }}>
        <span style={{ fontSize: '10px', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>ENGINE B: PREDICTIVE REVENUE SIGNALS</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#27272A', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Email Open Velocity</span>
            <span style={{ color: '#FFF', fontWeight: 700 }}>HIGH INTENT</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#27272A', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Proposal Dwell Time</span>
            <span style={{ color: '#FFF', fontWeight: 700 }}>4 MIN 20 SEC</span>
          </div>
        </div>
      </div>

      <div style={{ background: '#FFF', color: '#0A0A0B', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: 700, fontSize: '12px' }}>
        Auto-Drafts 1-Click Context-Aware Follow-Up for Sales
      </div>
    </div>
  );
}

function InfographicPillar4() {
  return (
    <div style={{ width: '100%', background: '#0A0A0B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px', color: '#FFF', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #27272A', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>BACK-OFFICE COMMAND CENTER</span>
        <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 700 }}>ZERO HANDOFF LEAKS</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', fontSize: '10px', textAlign: 'center' }}>
        <div style={{ background: '#18181B', padding: '10px 4px', borderRadius: '6px', borderTop: '2px solid #FFF' }}>
          <strong>1. Deal Closed</strong>
        </div>
        <div style={{ background: '#18181B', padding: '10px 4px', borderRadius: '6px', borderTop: '2px solid #A1A1AA' }}>
          <strong>2. Auto Invoicing</strong>
        </div>
        <div style={{ background: '#18181B', padding: '10px 4px', borderRadius: '6px', borderTop: '2px solid #71717A' }}>
          <strong>3. Fulfillment</strong>
        </div>
        <div style={{ background: '#18181B', padding: '10px 4px', borderRadius: '6px', borderTop: '2px solid #3F3F46' }}>
          <strong>4. Collections</strong>
        </div>
      </div>

      <div style={{ background: '#18181B', padding: '16px', borderRadius: '10px', border: '1px solid #27272A' }}>
        <span style={{ fontSize: '10px', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>LIVE OPERATIONAL IMPACT</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', fontWeight: 700 }}>
          <span>Accounting Overhead: -70%</span>
          <span style={{ color: '#FFF' }}>Visibility: 100% Live</span>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: '#A1A1AA', textAlign: 'center' }}>
        Replaces fragile spreadsheets and WhatsApp chains with code.
      </div>
    </div>
  );
}

function InfographicPillar5() {
  return (
    <div style={{ width: '100%', background: '#0A0A0B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px', color: '#FFF', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #27272A', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>WHITE-LABEL B2B MODEL</span>
        <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 700 }}>100% MARGIN RETAINED</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1.2fr', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ background: '#18181B', padding: '14px', borderRadius: '8px', border: '1px solid #3F3F46' }}>
          <strong style={{ fontSize: '12px', color: '#FFF', display: 'block' }}>YOUR AGENCY</strong>
          <span style={{ fontSize: '10px', color: '#A1A1AA' }}>Client Account Management</span>
        </div>

        <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFF' }}>➔</div>

        <div style={{ background: '#27272A', padding: '14px', borderRadius: '8px', border: '2px solid #FFF' }}>
          <strong style={{ fontSize: '12px', color: '#FFF', display: 'block' }}>AHMV BACKEND</strong>
          <span style={{ fontSize: '10px', color: '#A1A1AA' }}>Technical Build & SLA</span>
        </div>
      </div>

      <div style={{ background: '#18181B', padding: '14px', borderRadius: '8px', fontSize: '11px', color: '#A1A1AA', lineHeight: '1.4' }}>
        Agency sells AI operational systems under its own brand without hiring engineers. AHMV maintains the technical backend.
      </div>
    </div>
  );
}

const pillarsData = [
  {
    num: 'PILLAR 01',
    title: 'Autonomous Client Acquisition Pipeline',
    sub: 'Stop leaking leads. Make acquisition deterministic.',
    problem: 'Traditional acquisition relies on fragmented ads, manual follow-ups, and disconnected spreadsheets. Leads sit unqualified in inboxes and depend on someone being free to respond.',
    build: 'Omnichannel, deterministic pipeline combining inbound Meta/Google ads and enriched outbound B2B prospecting into an autonomous qualification interface (WhatsApp/Email APIs).',
    tech: 'Ad platform webhooks, scraped B2B data, API-based messaging flows, qualification rules & calendar booking.',
    proof: 'Inbound WhatsApp sales engine where leads move from ad ➔ qualification ➔ booked call in under 60 seconds with zero human chasing.',
    cta: 'Diagnose Your Acquisition Pipeline',
    route: '/services/acquisition',
    component: InfographicPillar1
  },
  {
    num: 'PILLAR 02',
    title: 'Enterprise Ecosystem Consolidation & Localized CRMs',
    sub: 'Replace SaaS sprawl with one localized operating system.',
    problem: 'SMEs often pay stacked licensing fees for CRM, project tools, and task trackers that don\'t talk to each other. Data is siloed, reconciliation is manual, and nobody trusts any single source of truth.',
    build: 'Singular, custom internal CRM & OS tailored to your exact data taxonomy, operational workflow, and local market realities in India & GCC.',
    tech: 'Custom data models, role-based views, internal logic, platform integrations & purpose-built operating interfaces.',
    proof: 'Replaced 3 separate paid SaaS tools in one SME stack, cut licensing cost to zero, and gave founder live view of pipeline, cash, and ops in one interface.',
    cta: 'Diagnose Your Ecosystem & CRM',
    route: '/services/crm',
    component: InfographicPillar2
  },
  {
    num: 'PILLAR 03',
    title: 'Predictive Intelligence & Content Automation',
    sub: 'Know where deals stand: and let content run itself.',
    problem: 'Founders waste hours drafting repetitive follow-ups and manually scheduling content. Deals stall silently because nobody knows when to nudge.',
    build: 'Fully automated content calendar framework for LinkedIn/Instagram combined with active-intelligence trackers that monitor email opens and proposal dwell times.',
    tech: 'Publishing workflows, LLM-assisted drafting, behavioral tracking from proposals, deal scoring logic & 1-click follow-up generation.',
    proof: 'Powered an internal engine where 30 days of content ran on autopilot while system monitored deal behavior and drafted context-aware follow-ups.',
    cta: 'Diagnose Your Follow-Up & Content',
    route: '/services/predictive',
    component: InfographicPillar3
  },
  {
    num: 'PILLAR 04',
    title: 'Bespoke Internal Tools & Infrastructure Modernization',
    sub: 'Turn fragile spreadsheets and manual routines into one back-office OS.',
    problem: 'Back-office operations (HR, finance pipelines, fulfillment) are run through ad-hoc spreadsheets and manual routines. Leadership lacks real-time visibility.',
    build: 'Focused internal web applications and custom software blocks that replace broken manual processes and wire HR, finance, ops, and fulfillment into the same OS.',
    tech: 'Focused internal web apps, automated data handoffs (closed deal ➔ invoicing ➔ fulfillment), custom logic & management command center.',
    proof: 'Turned fragmented back-office workflows into one command-center interface, cutting hours of manual tracking and eliminating missed handoffs.',
    cta: 'Diagnose Your Internal Operations',
    route: '/services/internal-tools',
    component: InfographicPillar4
  },
  {
    num: 'PILLAR 05',
    title: 'White-Labeled AI System Partnership Program',
    sub: 'Give your agency AI infrastructure: without hiring engineers.',
    problem: 'Creative, web, and PR agencies want to upsell AI systems to clients to prevent churn and increase retainers, but lack internal technical staff to build them.',
    build: 'B2B partnership program where partner agencies sell AI operational systems under their brand while AHMV operates silently as the backend technical fulfillment engine.',
    tech: 'White-labeled delivery, scoped technical builds, shared implementation logic & recurring infrastructure maintenance.',
    proof: 'Enables agencies to keep clients sticky and collect high margins while AHMV guarantees 100% technical SLA.',
    cta: 'Explore White-Label Partnership',
    route: '/services/white-label',
    component: InfographicPillar5
  }
];

export default function FeaturesSection() {
  return (
    <section id="services" className="h-features wrapper sec-black pr" style={{ padding: '100px var(--grid-margin)' }}>
      <div className="inner-title">
        <p className="label diode pr" style={{ marginBottom: '16px' }}>THE FIVE CORE SYSTEMS</p>
        <h2 className="title-m" style={{ marginBottom: '16px' }}>Five systems. One operating brain.</h2>
        <p className="body-s" style={{ color: 'var(--text-grey)', maxWidth: '800px' }}>
          Each pillar below is a system we architect and implement. 50% content explanation, 50% visual operational infographic.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginTop: '60px' }}>
        {pillarsData.map((pillar, index) => {
          const InfographicComp = pillar.component;

          return (
            <div 
              key={index}
              style={{ 
                background: 'var(--navy-card)', 
                border: '1px solid var(--navy-border)', 
                borderRadius: 'var(--mwg2-radius-l)', 
                padding: '40px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'center'
              }}
              className="pillar-50-split"
            >
              {/* Left 50%: Detailed Content */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-grey)' }}>{pillar.num}</span>
                  <span style={{ fontSize: '10px', background: '#27272A', color: '#FFF', padding: '3px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>CORE SYSTEM</span>
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#FFF', marginBottom: '8px' }}>{pillar.title}</h3>
                <p style={{ fontSize: '15px', color: '#FFF', fontWeight: 500, marginBottom: '20px' }}>"{pillar.sub}"</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', borderTop: '1px solid #27272A', paddingTop: '16px' }}>
                  <div>
                    <strong style={{ color: 'var(--text-grey)', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>THE PROBLEM</strong>
                    <p style={{ color: '#A1A1AA', lineHeight: '1.5' }}>{pillar.problem}</p>
                  </div>

                  <div>
                    <strong style={{ color: '#FFF', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>WHAT AHMV BUILDS</strong>
                    <p style={{ color: '#FFF', lineHeight: '1.5' }}>{pillar.build}</p>
                  </div>

                  <div style={{ background: '#0A0A0B', padding: '10px 14px', borderRadius: '8px', border: '1px solid #27272A' }}>
                    <strong style={{ color: '#A1A1AA', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>FOR TECHNICAL TEAMS & OPERATORS</strong>
                    <p style={{ color: '#E4E4E7', fontSize: '12px', lineHeight: '1.4' }}>{pillar.tech}</p>
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="#diagnostic" className="cta-main cta-main2" style={{ height: '46px', padding: '0 24px', fontSize: '12px' }}>
                    <span>{pillar.cta}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  {pillar.route && (
                    <Link
                      to={pillar.route}
                      style={{
                        height: '46px', padding: '0 20px',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '12px', fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        color: 'rgba(255,255,255,0.6)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#FFF'; e.currentTarget.style.color='#FFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.color='rgba(255,255,255,0.6)'; }}
                    >
                      View full system →
                    </Link>
                  )}
                </div>
              </div>

              {/* Right 50%: Visual Infographic Component */}
              <div>
                <InfographicComp />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
