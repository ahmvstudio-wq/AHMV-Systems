import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function InfographicPillar1() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A' }}>INBOUND + OUTBOUND CHANNELS</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>● 24/7 ACTIVE</span>
      </div>

      <div className="info-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
          <span style={{ fontSize: '10px', color: '#71717A', fontFamily: 'var(--font-mono)' }}>CHANNEL A: INBOUND</span>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0B', marginTop: '4px' }}>Social & Search Inquiries</p>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
          <span style={{ fontSize: '10px', color: '#71717A', fontFamily: 'var(--font-mono)' }}>CHANNEL B: OUTBOUND</span>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0B', marginTop: '4px' }}>Business Databases</p>
        </div>
      </div>

      <div className="info-arrow" style={{ textAlign: 'center', color: '#0A0A0B', fontWeight: 800, fontSize: '18px' }}>↓</div>

      <div className="info-main-indicator" style={{ background: '#F4F4F5', padding: '16px', borderRadius: '10px', border: '2px solid #0A0A0B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0A0A0B' }}>WhatsApp / Email Booking Assistant</span>
          <span className="info-badge" style={{ fontSize: '10px', background: '#0A0A0B', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>CHAT ASSISTANT</span>
        </div>
        <p style={{ fontSize: '11px', color: '#52525B', marginTop: '6px' }}>Replies to queries ➔ Answers FAQs ➔ Checks calendars ➔ Confirms slot</p>
      </div>

      <div className="info-arrow" style={{ textAlign: 'center', color: '#0A0A0B', fontWeight: 800, fontSize: '18px' }}>↓</div>

      <div className="info-card-box" style={{ background: '#F4F4F5', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#0A0A0B', fontWeight: 600 }}>Confirmed Call in CRM</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#0A0A0B' }}>&lt; 60 SEC ACTION</span>
      </div>
    </div>
  );
}

function InfographicPillar2() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#52525B' }}>SYSTEM UNIFICATION</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>0 SCATTERED APPS</span>
      </div>

      <div className="info-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', opacity: 0.6 }}>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', border: '1px solid #E4E4E7', textDecoration: 'line-through', color: '#52525B' }}>CRM Tool</div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', border: '1px solid #E4E4E7', textDecoration: 'line-through', color: '#52525B' }}>Task Tracker</div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '11px', border: '1px solid #E4E4E7', textDecoration: 'line-through', color: '#52525B' }}>File Storage</div>
      </div>

      <div className="info-arrow" style={{ textAlign: 'center', color: '#0A0A0B', fontWeight: 800, fontSize: '18px' }}>➔ COLLAPSED INTO ONE ➔</div>

      <div className="info-main-indicator" style={{ background: '#F4F4F5', padding: '20px', borderRadius: '12px', border: '2px solid #0A0A0B' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0A0A0B', marginBottom: '8px' }}>Custom Internal Portal & Dashboard</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#52525B' }}>
          <div className="info-card-box" style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #E4E4E7', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Sales & Pipelines</span>
            <span style={{ color: '#0A0A0B', fontWeight: 600 }}>Synced</span>
          </div>
          <div className="info-card-box" style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #E4E4E7', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Delivery & Fulfilment</span>
            <span style={{ color: '#0A0A0B', fontWeight: 600 }}>Synced</span>
          </div>
          <div className="info-card-box" style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #E4E4E7', padding: '6px 10px', borderRadius: '4px' }}>
            <span>Client Communications</span>
            <span style={{ color: '#0A0A0B', fontWeight: 600 }}>Synced</span>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: '#0A0A0B', textAlign: 'center', fontWeight: 600 }}>
        Tailored precisely to your team's terms.
      </div>
    </div>
  );
}

function InfographicPillar3() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A' }}>CUSTOMER EXPERIENCE JOURNEY</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>● CLIENT ONBOARDING</span>
      </div>

      <div className="info-card-box" style={{ background: '#F4F4F5', padding: '12px', borderRadius: '8px', border: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#0A0A0B' }}>Deal Closed Handoff</span>
        <span className="info-badge" style={{ fontSize: '10px', background: '#22C55E', color: '#FFF', padding: '2px 6px', borderRadius: '4px' }}>AUTO WELCOME</span>
      </div>

      <div className="info-arrow" style={{ textAlign: 'center', color: '#0A0A0B', fontWeight: 800, fontSize: '14px' }}>↓</div>

      <div className="info-main-indicator" style={{ background: '#F4F4F5', padding: '16px', borderRadius: '10px', border: '2px solid #0A0A0B' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0A0A0B', marginBottom: '6px' }}>Secure Customer Portal</div>
        <p style={{ fontSize: '11px', color: '#52525B' }}>Upload requirements ➔ Track tasks ➔ View project stages live</p>
      </div>

      <div className="info-arrow" style={{ textAlign: 'center', color: '#0A0A0B', fontWeight: 800, fontSize: '14px' }}>↓</div>

      <div className="info-card-box" style={{ background: '#F4F4F5', padding: '12px', borderRadius: '8px', border: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#0A0A0B' }}>Support Routing & Status Checks</span>
        <span style={{ fontSize: '10px', color: '#0A0A0B', fontFamily: 'var(--font-mono)' }}>&lt; 10 MIN RESPONSE</span>
      </div>
    </div>
  );
}

function InfographicPillar4() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#52525B' }}>BILLING LIFECYCLE</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>LIVE INVOICING</span>
      </div>

      <div className="info-grid-3" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.6fr 1.2fr', gap: '8px', alignItems: 'center', textAlign: 'center' }}>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '10px 4px', borderRadius: '6px', fontSize: '11px', border: '1px solid #E4E4E7' }}>Contract Signed</div>
        <div className="info-arrow" style={{ fontSize: '12px', fontWeight: 800, color: '#0A0A0B' }}>➔</div>
        <div className="info-main-indicator" style={{ background: '#F4F4F5', padding: '10px 4px', borderRadius: '6px', border: '1px solid #0A0A0B', fontSize: '11px', color: '#0A0A0B' }}>Invoice Generated</div>
      </div>

      <div className="info-card-box" style={{ background: '#F4F4F5', padding: '16px', borderRadius: '10px', border: '1px solid #E4E4E7' }}>
        <span style={{ fontSize: '10px', color: '#52525B', fontFamily: 'var(--font-mono)' }}>REMINDERS ENGINE</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: '#0A0A0B' }}>
          <span>WhatsApp & Email Alerts</span>
          <span style={{ color: '#22C55E', fontWeight: 700 }}>AUTOMATED SYNC</span>
        </div>
      </div>

      <div className="info-main-indicator" style={{ background: '#0A0A0B', color: '#FFFFFF', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: 700, fontSize: '11px', border: '1px solid #0A0A0B' }}>
        Reconciled balances update dashboard cash status automatically.
      </div>
    </div>
  );
}

function InfographicPillar5() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A' }}>TEAM MEMBER PORTAL</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>● STAFF SYSTEM</span>
      </div>

      <div className="info-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px' }}>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '10px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
          <span style={{ color: '#71717A' }}>New Hire Setup</span>
          <p style={{ marginTop: '2px', fontWeight: 600, color: '#0A0A0B' }}>Portal file upload</p>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '10px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
          <span style={{ color: '#71717A' }}>Leave Requests</span>
          <p style={{ marginTop: '2px', fontWeight: 600, color: '#0A0A0B' }}>1-Click Approval</p>
        </div>
      </div>

      <div className="info-main-indicator" style={{ background: '#F4F4F5', padding: '14px', borderRadius: '10px', border: '2px solid #0A0A0B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <strong style={{ fontSize: '12px', color: '#0A0A0B' }}>AI Policy Assistant</strong>
          <span className="info-badge" style={{ fontSize: '9px', background: '#0A0A0B', color: '#FFFFFF', padding: '1px 4px', borderRadius: '3px' }}>AI HELPER</span>
        </div>
        <p style={{ fontSize: '11px', color: '#52525B' }}>Employees get immediate answers to queries regarding policy and workflow rules.</p>
      </div>
    </div>
  );
}

function InfographicPillar6() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '14px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A' }}>AHMV SYSTEMS COMMAND CENTER</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>REAL-TIME STATUS</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
          <span style={{ color: '#71717A' }}>Gross Revenue</span>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0B', marginTop: '2px' }}>₹8.2M</p>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
          <span style={{ color: '#71717A' }}>Sales Pipeline</span>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0B', marginTop: '2px' }}>₹14.6M</p>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
          <span style={{ color: '#71717A' }}>Operations Queue</span>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0B', marginTop: '2px' }}>73 tasks</p>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
          <span style={{ color: '#71717A' }}>Retention Rate</span>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A0A0B', marginTop: '2px' }}>96.8%</p>
        </div>
      </div>

      <div className="info-main-indicator" style={{ background: '#F4F4F5', color: '#0A0A0B', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: 700, fontSize: '11px', border: '1px solid #E4E4E7' }}>
        Aggregates metrics across departments into one secure management screen.
      </div>
    </div>
  );
}

function InfographicPillar7() {
  return (
    <div className="info-wrapper" style={{ width: '100%', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '24px', color: '#0A0A0B', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease' }}>
      <div className="info-title-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E4E4E7', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#52525B' }}>INFRASTRUCTURE LAYERS</span>
        <span style={{ fontSize: '11px', color: '#0A0A0B', fontWeight: 700 }}>CODE OWNERSHIP</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '6px 12px', borderRadius: '4px', borderLeft: '3px solid #0A0A0B', borderTop: '1px solid #E4E4E7', borderRight: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between' }}>
          <strong>4. CUSTOM DASHBOARD</strong>
          <span style={{ color: '#52525B' }}>React / JS</span>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '6px 12px', borderRadius: '4px', borderLeft: '3px solid #71717A', borderTop: '1px solid #E4E4E7', borderRight: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between' }}>
          <strong>3. INTEGRATION CHANNELS</strong>
          <span style={{ color: '#52525B' }}>API bridges</span>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '6px 12px', borderRadius: '4px', borderLeft: '3px solid #A1A1AA', borderTop: '1px solid #E4E4E7', borderRight: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between' }}>
          <strong>2. AI PIPELINES</strong>
          <span style={{ color: '#52525B' }}>Company Helpers</span>
        </div>
        <div className="info-card-box" style={{ background: '#F4F4F5', padding: '6px 12px', borderRadius: '4px', borderLeft: '3px solid #E4E4E7', borderTop: '1px solid #E4E4E7', borderRight: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7', display: 'flex', justifyContent: 'space-between' }}>
          <strong>1. PRIVATE DATABASE</strong>
          <span style={{ color: '#52525B' }}>Secure Hosting</span>
        </div>
      </div>
    </div>
  );
}

const pillarsData = [
  {
    num: 'PILLAR 01',
    title: 'Revenue & Sales Operations',
    sub: 'Predictable, measurable, and efficient growth engines.',
    problem: 'Leads get lost in messaging chats or files, customer response times are slow, pipelines lack visibility, and tracking conversions feels disorganized.',
    build: 'Integrated lead and pipeline systems that capture contacts, route prospects, schedule calls automatically, and track conversion metrics.',
    tech: 'Lead databases, pipeline boards, automated messaging schedules, and sales rep performance dashboards.',
    cta: 'Diagnose Revenue Operations',
    route: '/services/revenue-sales',
    component: InfographicPillar1
  },
  {
    num: 'PILLAR 02',
    title: 'Business Operations',
    sub: 'Fast, waste-free workflows without manual coordination.',
    problem: 'Paying stacked user licensing fees for disconnected apps. Daily administrative tasks, database entries, and task routing are handled manually.',
    build: 'Unified internal operations database and pipeline system custom tailored to your team roles and daily workflows.',
    tech: 'Operational dashboards, cross-platform data syncs, and automated task notifications.',
    cta: 'Diagnose Operations & Workflows',
    route: '/services/business-ops',
    component: InfographicPillar2
  },
  {
    num: 'PILLAR 03',
    title: 'Customer Operations',
    sub: 'Streamline the customer journey from handoff to expansion.',
    problem: 'Delays during sales-to-delivery handoffs, slow customer support resolution, client status blindspots, and missed renewal timelines.',
    build: 'Automated customer welcoming, secure client portals, centralized support team folders, and account renewal tracking.',
    tech: 'Welcome lists, secure file folders, support ticket timers, and auto-reminders.',
    cta: 'Diagnose Client Operations',
    route: '/services/customer-ops',
    component: InfographicPillar3
  },
  {
    num: 'PILLAR 04',
    title: 'Finance Operations',
    sub: 'Efficient administration, cash flow control, and visibility.',
    problem: 'Slow quoting processes, manual invoicing reconciliation, delayed collection follow-ups, and lack of clear cash status views.',
    build: 'Automated invoicing pipelines, vendor checkout screens, payment notifications, and cash flow visibility dashboards.',
    tech: 'Quote templates, invoice generation code, automated reminder rules, and manager sign-off workflows.',
    cta: 'Diagnose Quoting & Invoicing',
    route: '/services/finance-ops',
    component: InfographicPillar4
  },
  {
    num: 'PILLAR 05',
    title: 'People & Workforce Operations',
    sub: 'Streamlined employee management and portals.',
    problem: 'Manual onboarding lists, scattered paper files, spreadsheet vacation schedules, and time lost searching company policies.',
    build: 'Unified employee portal for onboarding files, digital leave requests, staff logs, and AI company assistants.',
    tech: 'Staff calendars, vacation trackers, digital contract signatures, and search assistance.',
    cta: 'Diagnose HR & Team Systems',
    route: '/services/people-ops',
    component: InfographicPillar5
  },
  {
    num: 'PILLAR 06',
    title: 'Management Intelligence',
    sub: 'Real-time company health cockpit for strategic control.',
    problem: 'Data siloed across different platforms. Leadership spends hours preparing weekly report files and discovers bottleneck issues too late.',
    build: 'Unified Command Center dashboard listing your active sales, invoicing, project logs, and customer counts in one place.',
    tech: 'Automated metrics summaries, warning notifications, and private manager dashboards.',
    cta: 'Explore Management Dashboard',
    route: '/services/management-intel',
    component: InfographicPillar6
  },
  {
    num: 'PILLAR 07',
    title: 'Technology & Systems',
    sub: 'The custom software machinery driving business processes.',
    problem: 'Fragile no-code integrations that break when schemas update, rigid software templates, and AI tools with no company context.',
    build: 'Custom software architecture, API bridges, private databases, web pages, and secure AI helpers owned completely by you.',
    tech: 'Dedicated code repository, cloud hosting tables, secure data syncs, and custom AI prompt scripts.',
    cta: 'Diagnose Custom Code & Tech Stack',
    route: '/services/tech-systems',
    component: InfographicPillar7
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.pillar-card-container');
    const titleLabel = sectionRef.current.querySelector('.inner-title .label');
    const titleHead = sectionRef.current.querySelector('.inner-title h2');
    const titleDesc = sectionRef.current.querySelector('.inner-title p');

    // Light mode themes configuration
    const lightTheme = {
      bg: '#FAF9F6',
      cardBg: '#FFFFFF',
      border: '#E4E4E7',
      text: '#0A0A0B',
      subText: '#52525B',
      techBg: '#F4F4F5',
      techText: '#27272A',
      labelBg: '#E4E4E7',
      ctaBorder: 'rgba(0,0,0,0.15)',
      ctaText: 'rgba(0,0,0,0.7)',
      infoBg: '#FFFFFF',
      infoBoxBg: '#F4F4F5',
      infoBorder: '#E4E4E7',
      infoText: '#0A0A0B',
      infoSubText: '#52525B',
      infoIndicatorBg: '#F4F4F5',
      infoIndicatorBorder: '#0A0A0B',
      infoIndicatorText: '#0A0A0B'
    };
    const themes = Array(7).fill(lightTheme);

    const triggers = [];

    // Headline entrance animation
    const headLines = sectionRef.current.querySelectorAll('.features-entrance');
    if (headLines.length > 0) {
      gsap.set(headLines, { opacity: 0, y: 40 });
      const entranceTrigger = ScrollTrigger.create({
        trigger: headLines[0],
        start: 'top 84%',
        onEnter: () => gsap.to(headLines, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }),
        once: true,
      });
      triggers.push(entranceTrigger);
    }

    cards.forEach((card, index) => {
      const theme = themes[index];
      const heading = card.querySelector('h3');
      const subtitle = card.querySelector('p');
      const problemLabel = card.querySelector('.problem-label');
      const problemText = card.querySelector('.problem-text');
      const buildLabel = card.querySelector('.build-label');
      const buildText = card.querySelector('.build-text');
      const techBox = card.querySelector('.tech-box');
      const techLabel = card.querySelector('.tech-label');
      const techText = card.querySelector('.tech-text');
      const systemLabel = card.querySelector('.system-label');
      const numLabel = card.querySelector('.num-label');
      const fullSystemLink = card.querySelector('.full-system-link');

      // Infographic specific elements inside each card
      const infoWrapper = card.querySelector('.info-wrapper');
      const infoTitleRow = card.querySelector('.info-title-row');
      const infoCardBoxes = card.querySelectorAll('.info-card-box');
      const infoIndicators = card.querySelectorAll('.info-main-indicator');
      const infoArrows = card.querySelectorAll('.info-arrow');

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => applyTheme(theme),
        onEnterBack: () => applyTheme(theme)
      });

      triggers.push(trigger);

      function applyTheme(t) {
        // Smoothly animate section background
        gsap.to(sectionRef.current, { backgroundColor: t.bg, duration: 0.8, ease: 'power2.out' });

        // Update headers and text colors
        gsap.to(titleLabel, { color: '#71717A', duration: 0.8 });
        gsap.to(titleHead, { color: '#0A0A0B', duration: 0.8 });
        gsap.to(titleDesc, { color: '#52525B', duration: 0.8 });

        // Card container border & background
        gsap.to(card, { backgroundColor: t.cardBg, borderColor: t.border, duration: 0.8, ease: 'power2.out' });

        // Headline typography (from our new typographic style)
        const headLines = sectionRef.current.querySelectorAll('.features-head-line');
        headLines.forEach(line => {
          gsap.to(line, { color: t.text, duration: 0.8 });
        });
        const headLinesGrey = sectionRef.current.querySelectorAll('.features-head-line-grey');
        headLinesGrey.forEach(line => {
          gsap.to(line, { color: t.subText, duration: 0.8 });
        });

        // Card typography
        if (heading) gsap.to(heading, { color: t.text, duration: 0.8 });
        if (subtitle) gsap.to(subtitle, { color: t.text, duration: 0.8 });
        if (problemLabel) gsap.to(problemLabel, { color: t.subText, duration: 0.8 });
        if (problemText) gsap.to(problemText, { color: t.subText, duration: 0.8 });
        if (buildLabel) gsap.to(buildLabel, { color: t.text, duration: 0.8 });
        if (buildText) gsap.to(buildText, { color: t.text, duration: 0.8 });

        // Tech specs box
        if (techBox) gsap.to(techBox, { backgroundColor: t.techBg, borderColor: t.border, duration: 0.8 });
        if (techLabel) gsap.to(techLabel, { color: t.subText, duration: 0.8 });
        if (techText) gsap.to(techText, { color: t.techText, duration: 0.8 });

        // Small mono labels
        if (systemLabel) gsap.to(systemLabel, { backgroundColor: t.labelBg, color: t.text, duration: 0.8 });
        if (numLabel) gsap.to(numLabel, { color: t.subText, duration: 0.8 });

        // View full system CTA link
        if (fullSystemLink) {
          gsap.to(fullSystemLink, {
            borderColor: t.ctaBorder,
            color: t.ctaText,
            duration: 0.8
          });
        }

        // ─────────────────────────────────────────────────────────────
        // Infographic visual box colors transition
        // ─────────────────────────────────────────────────────────────
        if (infoWrapper) {
          gsap.to(infoWrapper, { backgroundColor: t.infoBg, borderColor: t.infoBorder, color: t.infoText, duration: 0.8 });
        }
        if (infoTitleRow) {
          gsap.to(infoTitleRow, { borderBottomColor: t.infoBorder, duration: 0.8 });
          const rowTitleText = infoTitleRow.querySelectorAll('span');
          rowTitleText.forEach((lbl, idx) => {
            gsap.to(lbl, { color: idx === 0 ? t.infoSubText : t.infoText, duration: 0.8 });
          });
        }
        infoCardBoxes.forEach(box => {
          gsap.to(box, { backgroundColor: t.infoBoxBg, borderColor: t.infoBorder, color: t.infoText, duration: 0.8 });
          const boxLabels = box.querySelectorAll('span');
          const boxTexts = box.querySelectorAll('p, strong');
          boxLabels.forEach(lbl => gsap.to(lbl, { color: t.infoSubText, duration: 0.8 }));
          boxTexts.forEach(txt => gsap.to(txt, { color: t.infoText, duration: 0.8 }));
        });
        infoIndicators.forEach(ind => {
          gsap.to(ind, { 
            backgroundColor: t.infoIndicatorBg, 
            borderColor: t.infoIndicatorBorder, 
            color: t.infoIndicatorText, 
            duration: 0.8 
          });
          const badge = ind.querySelector('.info-badge');
          if (badge) {
            gsap.to(badge, { 
              backgroundColor: '#0A0A0B', 
              color: '#FFFFFF', 
              duration: 0.8 
            });
          }
          const text = ind.querySelectorAll('p, span, div');
          text.forEach(txt => {
            if (!txt.classList.contains('info-badge')) {
              gsap.to(txt, { color: '#27272A', duration: 0.8 });
            }
          });
        });
        infoArrows.forEach(arrow => {
          gsap.to(arrow, { color: t.infoText, duration: 0.8 });
        });
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="h-features wrapper sec-white pr" style={{ padding: '100px var(--grid-margin)', background: '#FAF9F6', transition: 'background-color 0.8s ease' }}>
      <div className="features-head-container" style={{ maxWidth: '900px', marginBottom: '60px' }}>
        <p className="features-head-line-grey features-entrance" style={{ 
          fontSize: 'clamp(24px, 3.5vw, 42px)', 
          fontWeight: 400, 
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '16px',
          color: '#A1A1AA'
        }}>
          Features don't scale businesses.
        </p>
        
        <h2 className="features-head-line features-entrance" style={{ 
          fontSize: 'clamp(32px, 5vw, 64px)', 
          fontWeight: 500, 
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '24px',
          color: '#0A0A0B',
          fontFamily: 'var(--font-grotesk)'
        }}>
          <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }} className="features-head-line-grey">Templates</span>, <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }} className="features-head-line-grey">SaaS Subscriptions</span>.<br/>Custom architecture does.
        </h2>

        <p className="features-head-line-grey features-entrance" style={{ fontSize: '17px', color: '#52525B', maxWidth: '680px', lineHeight: 1.65, fontWeight: 400 }}>
          Each pillar below is a system we architect and implement. 50% content explanation, 50% visual operational infographic.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {pillarsData.map((pillar, index) => {
          const InfographicComp = pillar.component;

          return (
            <div 
              key={index}
              style={{ 
                background: '#FFFFFF', 
                border: '1px solid #E4E4E7', 
                borderRadius: 'var(--mwg2-radius-l)', 
                padding: '40px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'center',
                boxShadow: '0 4px 25px rgba(0,0,0,0.03)'
              }}
              className="pillar-50-split pillar-card-container"
            >
              {/* Left 50%: Detailed Content */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="num-label" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A' }}>{pillar.num}</span>
                  <span className="system-label" style={{ fontSize: '10px', background: '#E4E4E7', color: '#0A0A0B', padding: '3px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>CORE SYSTEM</span>
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#0A0A0B', marginBottom: '8px' }}>{pillar.title}</h3>
                <p style={{ fontSize: '15px', color: '#0A0A0B', fontWeight: 500, marginBottom: '20px' }}>"{pillar.sub}"</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', borderTop: '1px solid #E4E4E7', paddingTop: '16px' }}>
                  <div>
                    <strong className="problem-label" style={{ color: '#71717A', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>THE PROBLEM</strong>
                    <p className="problem-text" style={{ color: '#52525B', lineHeight: '1.5' }}>{pillar.problem}</p>
                  </div>

                  <div>
                    <strong className="build-label" style={{ color: '#0A0A0B', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>WHAT AHMV BUILDS</strong>
                    <p className="build-text" style={{ color: '#0A0A0B', lineHeight: '1.5' }}>{pillar.build}</p>
                  </div>

                  <div className="tech-box" style={{ background: '#F4F4F5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
                    <strong className="tech-label" style={{ color: '#71717A', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>FOR OPERATIONS & WORKFLOWS</strong>
                    <p className="tech-text" style={{ color: '#27272A', fontSize: '12px', lineHeight: '1.4' }}>{pillar.tech}</p>
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="#diagnostic" className="cta-main cta-main2" style={{ height: '46px', padding: '0 24px', fontSize: '12px' }}>
                    <span>{pillar.cta}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  {pillar.route && (
                    <Link
                      to={pillar.route}
                      className="full-system-link"
                      style={{
                        height: '46px', padding: '0 20px',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '12px', fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(0,0,0,0.15)',
                        borderRadius: '8px',
                        color: 'rgba(0,0,0,0.7)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#0A0A0B'; e.currentTarget.style.color='#0A0A0B'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,0,0,0.15)'; e.currentTarget.style.color='rgba(0,0,0,0.7)'; }}
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
