import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'sales',
    slug: 'sales-revenue',
    index: '01',
    name: 'Sales & Revenue',
    headline: 'Never lose a lead to a spreadsheet again.',
    desc: 'Leads sit in DMs and spreadsheets, follow-up depends on someone remembering, and nobody can say what the pipeline is actually worth.',
    blueprint: [
      { step: 'INBOUND CAPTURE', detail: 'Meta, Google & Web leads tagged' },
      { step: 'AI QUALIFICATION', detail: 'Screened & booked in < 60s' },
      { step: 'CRM PIPELINE', detail: 'Real-time pipeline value tracked' },
    ],
    systems: [
      {
        title: 'Revenue Command Center',
        desc: 'Give your sales team an automated deal pipeline that tracks conversions automatically.',
        price: 'INR 100,000 setup',
      },
      {
        title: 'Lead Intelligence Platform',
        desc: 'Own your entire inbound lead qualification and appointment engine, end to end.',
        price: 'AED 3,500 setup',
      },
      {
        title: 'AI Outreach & Prospecting System',
        desc: 'Outreach workflows, multichannel touches, and prospect qualification on autopilot.',
        price: 'Scoped on a call',
      },
    ],
  },
  {
    id: 'customer',
    slug: 'customer-ops',
    index: '02',
    name: 'Customer Operations',
    headline: 'Streamline the customer journey from handoff to expansion.',
    desc: 'Eliminate handoff delays, slow client support resolution, client blindspots, and missed renewal timelines.',
    blueprint: [
      { step: 'DEAL CLOSED', detail: 'Auto-welcome & folder generation' },
      { step: 'CLIENT PORTAL', detail: 'Live milestone & asset tracking' },
      { step: 'SUPPORT & EXPANSION', detail: '< 10 min response & renewal alerts' },
    ],
    systems: [
      {
        title: 'Client Portal & Project Tracker',
        desc: 'Live milestone visibility, secure file uploads, and stage-by-stage client dashboards.',
        price: 'AED 4,000 setup',
      },
      {
        title: 'Support Ticket Engine',
        desc: 'Rapid inquiry routing, automated status updates, and client response timers.',
        price: 'AED 3,000 setup',
      },
      {
        title: 'Retention & Account Renewal Monitor',
        desc: 'Automated health tracking and proactive contract renewal alerts.',
        price: 'Scoped on a call',
      },
    ],
  },
  {
    id: 'finance',
    slug: 'finance-ops',
    index: '03',
    name: 'Finance',
    headline: 'Real-time cash flow control and automated billing.',
    desc: 'Slow quoting processes, manual invoicing reconciliation, delayed collection follow-ups, and lack of clear cash views.',
    blueprint: [
      { step: 'CONTRACT SIGNED', detail: 'Instant invoice generation' },
      { step: 'REMINDERS ENGINE', detail: 'WhatsApp & email payment alerts' },
      { step: 'CASH RECONCILIATION', detail: 'Live cash position & bank sync' },
    ],
    systems: [
      {
        title: 'Automated Invoicing Engine',
        desc: 'Generate, send, and track client invoices the moment a contract is signed.',
        price: 'AED 3,200 setup',
      },
      {
        title: 'Payment Reminders Pipeline',
        desc: 'Automated follow-ups that gently recover receivables without awkward manual chasing.',
        price: 'AED 2,500 setup',
      },
      {
        title: 'Cash Flow Intelligence Dashboard',
        desc: 'Unified visibility across active cash, outstanding balances, and monthly runway.',
        price: 'Scoped on a call',
      },
    ],
  },
  {
    id: 'ai-workforce',
    slug: 'people-ops',
    index: '04',
    name: 'AI Workforce',
    headline: 'The employees you never have to hire, train, or manage.',
    desc: 'Autonomous AI agents for repetitive business tasks - qualified lead intake, 24/7 client booking, and company policy search.',
    blueprint: [
      { step: 'INQUIRY RECEIVED', detail: 'Omnichannel message listener' },
      { step: 'AI WORKER EXECUTION', detail: 'Answers FAQs & books calendar' },
      { step: 'DATA LOGGED', detail: 'Full transcript logged to database' },
    ],
    systems: [
      {
        title: 'WhatsApp & Email AI Assistant',
        desc: '24/7 buyer inquiry screening, FAQ replies, and calendar booking in under 60 seconds.',
        price: 'AED 4,500 setup',
      },
      {
        title: 'Internal Knowledge AI Helper',
        desc: 'Instant staff policy, SOP, and company handbook search assistant.',
        price: 'AED 3,500 setup',
      },
      {
        title: 'Document & Contract Extractor',
        desc: 'Automated parsing of vendor forms, PDFs, and client intakes.',
        price: 'Scoped on a call',
      },
    ],
  },
  {
    id: 'custom',
    slug: 'tech-systems',
    index: '05',
    name: 'Custom Builds',
    headline: 'Tailored software machinery for unique business workflows.',
    desc: 'Private databases, custom internal dashboards, and dedicated API bridges owned completely by you.',
    blueprint: [
      { step: 'SCHEMA ARCHITECTURE', detail: 'Dedicated database design' },
      { step: 'CUSTOM PORTAL', detail: 'React / JS tailored frontend' },
      { step: 'API INTEGRATIONS', detail: 'Reliable cross-platform sync' },
    ],
    systems: [
      {
        title: 'Unified Internal Operating System',
        desc: 'Replaces fragmented SaaS subscriptions with one private team database.',
        price: 'AED 6,500 setup',
      },
      {
        title: 'API Integration Bridges',
        desc: 'Reliable custom sync pipelines connecting all your third-party tools.',
        price: 'AED 3,000 setup',
      },
      {
        title: 'Dedicated Cloud Infrastructure',
        desc: 'Secure hosting, private code repositories, and custom endpoints.',
        price: 'Scoped on a call',
      },
    ],
  },
];

export default function SystemsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  const activeCategory = categories[activeTab];

  useEffect(() => {
    if (!sectionRef.current) return;

    if (headRef.current) {
      gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: headRef.current,
        start: 'top 84%',
        onEnter: () => gsap.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }
  }, []);

  return (
    <section
      id="systems"
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: '#FFFFFF',
        color: '#0A0A0B',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
          WHAT WE BUILD
        </p>

        <h2
          ref={headRef}
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 'clamp(30px, 4.2vw, 54px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--mwg2-black)',
            marginBottom: '20px',
            maxWidth: '780px',
            willChange: 'clip-path',
          }}
        >
          Five categories. One operating system.
        </h2>

        <p style={{ fontSize: '15px', color: 'var(--mwg2-grey)', maxWidth: '580px', marginBottom: '40px', lineHeight: 1.65, fontWeight: 400 }}>
          Every system we build falls into one of five categories. Open one to see the specific architecture and systems inside it.
        </p>

        {/* Category Navigation Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            borderBottom: '1px solid #E4E4E7',
            paddingBottom: '20px',
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(idx)}
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                padding: '10px 20px',
                borderRadius: '8px',
                border: activeTab === idx ? '1px solid #0A0A0B' : '1px solid #E4E4E7',
                background: activeTab === idx ? '#0A0A0B' : '#FFFFFF',
                color: activeTab === idx ? '#FFFFFF' : '#27272A',
                cursor: 'pointer',
                fontWeight: activeTab === idx ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '10px', opacity: activeTab === idx ? 0.7 : 0.4 }}>{cat.index}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active System Details Card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '20px',
            padding: '44px 36px',
            boxShadow: '0 4px 25px rgba(0,0,0,0.02)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#0A0A0B', marginBottom: '10px' }}>
              {activeCategory.headline}
            </h3>
            <p style={{ fontSize: '14px', color: '#52525B', maxWidth: '760px', lineHeight: 1.6 }}>
              {activeCategory.desc}
            </p>
          </div>

          {/* Operational Flow Blueprint Strip */}
          <div
            style={{
              background: '#F4F4F5',
              border: '1px solid #E4E4E7',
              borderRadius: '12px',
              padding: '18px 24px',
              marginBottom: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', fontWeight: 600 }}>
              OPERATIONAL BLUEPRINT:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {activeCategory.blueprint.map((b, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0A0A0B' }}>
                      {b.step}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--mwg2-grey)' }}>
                      {b.detail}
                    </span>
                  </div>
                  {i < activeCategory.blueprint.length - 1 && (
                    <span style={{ color: '#A1A1AA', fontSize: '12px' }}>➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 3 System Cards */}
          <div
            className="system-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '36px',
            }}
          >
            {activeCategory.systems.map((sys, i) => (
              <div
                key={i}
                data-tilt
                style={{
                  background: '#F4F4F5',
                  border: '1px solid #E4E4E7',
                  borderRadius: '14px',
                  padding: '28px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transformStyle: 'preserve-3d',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4D4D8'; e.currentTarget.style.background = '#EAEAEB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E4E7'; e.currentTarget.style.background = '#F4F4F5'; }}
              >
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0A0A0B', marginBottom: '10px', lineHeight: 1.3 }}>
                    {sys.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.55, marginBottom: '24px' }}>
                    {sys.desc}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: '#0A0A0B',
                    fontWeight: 600,
                    borderTop: '1px solid #E4E4E7',
                    paddingTop: '14px',
                  }}
                >
                  {sys.price}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid #F4F4F5', paddingTop: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                className="cta-main cta-main1"
                style={{
                  height: '46px',
                  padding: '0 24px',
                  fontSize: '12px',
                  background: '#0A0A0B',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                }}
              >
                Get pricing for {activeCategory.name} →
              </a>

              <Link
                to={`/services/${activeCategory.slug || 'sales-revenue'}`}
                style={{
                  height: '46px',
                  padding: '0 20px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  color: '#0A0A0B',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                Explore Full Architecture →
              </Link>
            </div>

            <span style={{ fontSize: '12px', color: 'var(--mwg2-grey)', fontFamily: 'var(--font-mono)' }}>
              Setup scoped & confirmed during review
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .system-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
