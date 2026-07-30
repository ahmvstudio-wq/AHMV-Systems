import React, { useState } from 'react';

const latestDeployments = [
  { id: 'MOD-01', title: 'Acquisition Pipeline', desc: 'Auto-captures & qualifies paid leads from Meta/Google Ads directly into CRM.', throughput: '1,420 Leads/mo', status: 'Live 99.9%' },
  { id: 'MOD-02', title: 'CRM Data Engine', desc: 'Unifies 3 disconnected SaaS tools into a single real-world operational workflow.', throughput: 'Unified Sync', status: 'Active Core' },
  { id: 'MOD-03', title: 'Content Automation', desc: 'Executes multi-channel follow-ups silently in the background 24/7.', throughput: '24/7 Execution', status: 'Running' },
  { id: 'MOD-04', title: 'Internal Ops Redesign', desc: 'Replaces spreadsheet chaos and manual handoffs with automated Kanban ops.', throughput: '0 Spreadsheets', status: 'Streamlined' },
  { id: 'MOD-05', title: 'White-Label Agency Engine', desc: 'Delivers technical backend execution behind the scenes for agency partners.', throughput: '100% White-Label', status: 'Delivered' }
];

export default function LatestEffects() {
  const [activeItem, setActiveItem] = useState(latestDeployments[0]);

  return (
    <section id="deployments" className="h-latest sec-white pr">
      <div className="content pr">
        <div className="top label">
          <p>AHMV ARCHITECTURE</p>
          <p className="diode pr">PRE-ENGINEERED FOUNDATION</p>
          <p>CUSTOM CONFIGURATION</p>
        </div>

        <div className="title1" style={{ margin: '30px 0' }}>
          <h2 className="title-l">
            Pre-built modules, <br />
            <span style={{ color: 'var(--mwg2-grey)' }}>configured to fit</span>
          </h2>
        </div>

        {/* Deployment Cards Grid */}
        <div className="latest-effects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {latestDeployments.map((item) => (
            <div 
              key={item.id}
              className={`latest-effect-item ${activeItem.id === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item)}
              onMouseEnter={() => setActiveItem(item)}
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: activeItem.id === item.id ? 'var(--dark-navy)' : 'var(--mwg2-light-grey)', color: activeItem.id === item.id ? '#FFF' : 'var(--mwg2-black)', transition: 'all 0.3s ease' }}
            >
              <div>
                <span className="item-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '10px' }}>{item.id}</span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '8px 0' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', opacity: 0.8 }}>{item.desc}</p>
              </div>
              <div style={{ marginTop: '15px', borderTop: '1px solid rgba(128,128,128,0.2)', paddingTop: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.throughput}</span>
                <span style={{ color: 'var(--navy-blue)', fontWeight: 700 }}>● {item.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Deployment Details Bar */}
        <div className="datas f f-space f-center" style={{ margin: '30px 0', padding: '15px 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span className="cta-sec cta-sec2">{activeItem.id}</span>
            <span className="cta-sec cta-sec2">{activeItem.title}</span>
            <span className="cta-sec cta-sec2">{activeItem.throughput}</span>
          </div>
          <a href="#engagement" className="cta-main cta-main1 roll">
            <span>
              <span className="translate">
                <span>Configure This Module</span>
                <span>Configure This Module</span>
              </span>
            </span>
          </a>
        </div>

        {/* Bottom Heading CTA */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <p className="label diode pr" style={{ marginBottom: '15px', display: 'inline-block' }}>
            Eliminate SaaS bloat & manual work
          </p>
          <h3 className="title-l">
            Deploy your custom <br />
            <span style={{ color: 'var(--mwg2-grey)' }}>operations engine</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
