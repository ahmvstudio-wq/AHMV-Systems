import React from 'react';

const projectsList = [
  {
    title: 'AI Inbound Sales Engine',
    tag: 'ACQUISITION OS',
    whatWasIt: 'A WhatsApp-based AI qualification and booking system for inbound lead campaigns.',
    bottleneck: 'Leads from ads sat unqualified for hours because follow-up depended on someone being free to respond. Nights and weekends were dead zones.',
    built: 'Meta lead ads ➔ data enrichment ➔ WhatsApp Business API ➔ AI agent ➔ CRM ➔ calendar booking. Handled FAQs and objections automatically.',
    result: 'Leads moved from "form submitted" to "booked slot" in under 60 seconds, 24/7, with zero human chasing.',
    honestNote: 'Early routing logic incorrectly assumed every inbound contact was an existing customer. Tracing and fixing this required rewiring how the agent read initial payloads and adjusting our data model.'
  },
  {
    title: 'Localized SME Internal CRM & OS',
    tag: 'SYSTEM DISPLACEMENT',
    whatWasIt: 'A custom internal CRM that replaced Salesforce, HubSpot, and Asana in a single SME stack.',
    bottleneck: 'The business was paying $4,200/mo in stacked SaaS fees while sales, ops, and finance argued over conflicting spreadsheet numbers.',
    built: 'Tailored PostgreSQL CRM engine built around the firm\'s exact taxonomy, local GCC/India currency rules, and automated role-based views.',
    result: 'Displaced SaaS licensing cost to zero while giving the founder a live single-source-of-truth dashboard for cash, pipeline, and ops.',
    honestNote: 'First version of migration script failed to resolve duplicate historic records across Asana and HubSpot. We had to write a deduplication layer before full deployment.'
  },
  {
    title: 'Predictive Intelligence & Content Engine',
    tag: 'REVENUE INTELLIGENCE',
    whatWasIt: 'Automated LinkedIn/Instagram publishing combined with proposal engagement tracking.',
    bottleneck: 'Founders spent 8+ hours a week drafting posts and chasing proposals blindly without knowing if prospects were actually reviewing them.',
    built: 'Content calendar automation engine + active trackers monitoring proposal dwell times and email open velocities to auto-draft 1-click sales follow-ups.',
    result: '30 days of content executed on autopilot while sales reps received perfectly timed follow-up drafts aligned with buyer behavior.',
    honestNote: 'Initial email open velocity threshold triggered false positives when corporate security scanners pre-opened emails. Added a duration-dwell filter to fix accuracy.'
  },
  {
    title: 'Back-Office Command Center',
    tag: 'INTERNAL TOOLS',
    whatWasIt: 'A custom back-office operations web application connecting sales to fulfillment and accounting.',
    bottleneck: 'Closed deals took days to move from sales to invoicing and logistics because handoffs depended on manual WhatsApp messages and Excel sheets.',
    built: 'Focused internal app establishing automated data handoffs: closed deal ➔ invoicing ➔ fulfillment ➔ collections.',
    result: 'Reduced accounting overhead by 70% and eliminated missed handoffs completely.',
    honestNote: 'Initial API webhook timeout during high-volume invoice generation required refactoring job processing into an asynchronous background queue.'
  }
];

export default function ShowcaseSection() {
  return (
    <section id="projects" className="h-showcase wrapper sec-black pr" style={{ padding: '100px var(--grid-margin)' }}>
      <p className="label diode pr" style={{ marginBottom: '16px' }}>PRODUCTION BUILDS</p>
      
      <h2 className="title-m" style={{ marginBottom: '16px' }}>
        Systems we've actually built. Not concepts: production.
      </h2>

      <p className="body-s" style={{ color: 'var(--text-grey)', maxWidth: '850px', marginBottom: '50px' }}>
        Every project below is a real system built hands-on, debugged in production, and either live or has been live for a real business. Where we can't name the client, we say so directly, no implied logos.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {projectsList.map((project, index) => (
          <div key={index} style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', borderRadius: 'var(--mwg2-radius-m)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-grey)' }}>BUILD 0{index + 1}</span>
                <span style={{ fontSize: '10px', background: '#27272A', color: '#FFF', padding: '3px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{project.tag}</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#FFF', marginBottom: '12px' }}>{project.title}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', borderTop: '1px solid #27272A', paddingTop: '16px' }}>
                <div>
                  <strong style={{ color: 'var(--text-grey)', display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>WHAT IT WAS</strong>
                  <p style={{ color: '#FFF' }}>{project.whatWasIt}</p>
                </div>

                <div>
                  <strong style={{ color: 'var(--text-grey)', display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>THE BOTTLENECK</strong>
                  <p style={{ color: '#A1A1AA' }}>{project.bottleneck}</p>
                </div>

                <div>
                  <strong style={{ color: '#FFF', display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>WHAT WE BUILT</strong>
                  <p style={{ color: '#FFF', lineHeight: '1.4' }}>{project.built}</p>
                </div>

                <div style={{ background: '#0A0A0B', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #FFF' }}>
                  <strong style={{ color: '#FFF', display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '2px' }}>THE RESULT</strong>
                  <p style={{ color: '#FFF', fontSize: '13px' }}>{project.result}</p>
                </div>
              </div>
            </div>

            {/* Honest Note */}
            <div style={{ marginTop: '20px', background: '#18181B', padding: '14px', borderRadius: '8px', border: '1px dashed #3F3F46' }}>
              <strong style={{ color: '#A1A1AA', display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '4px' }}>HONEST BUILD NOTE (WHAT BROKE & WAS REBUILT)</strong>
              <p style={{ color: '#A1A1AA', fontSize: '12px', fontStyle: 'italic', lineHeight: '1.4' }}>"{project.honestNote}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
