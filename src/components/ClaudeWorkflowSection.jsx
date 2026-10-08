import React from 'react';

export default function ClaudeWorkflowSection() {
  const workflows = [
    {
      step: '01',
      title: 'Contextual Document & Intake Extraction',
      description: 'Using Claude 3.5 Sonnet to parse unstructured customer intakes, statements, and operational data with 99.4% accuracy, routing directly into unified database schemas.',
      badge: 'Claude 3.5 Sonnet'
    },
    {
      step: '02',
      title: 'Executive Routine & Data Synthesis',
      description: 'Autonomous Claude agents aggregate CRM activity, financial transactions, and operational metrics into actionable daily executive briefings with clear anomaly detection.',
      badge: 'Agentic Workflows'
    },
    {
      step: '03',
      title: 'Pre-Engineered Tool-Calling Automations',
      description: 'Deterministic tool-use pipelines that interface Claude directly with PostgreSQL databases, webhooks, and accounting ledgers to automate cross-platform operations.',
      badge: 'Tool Calling'
    }
  ];

  return (
    <section
      id="claude-architecture"
      style={{
        padding: '100px 0',
        background: '#0A0A0B',
        color: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.07em', color: '#A1A1AA', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>
            ANTHROPIC & CLAUDE INTEGRATION
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'flex-start', marginBottom: '48px' }} className="claude-header-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, fontFamily: 'var(--font-grotesk)' }}>
              How AHMV builds on <span style={{ color: '#D97706' }}>Claude</span>.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: '15px', color: '#A1A1AA', lineHeight: 1.6, margin: 0 }}>
              We deploy Claude to power data unification, complex workflow automations, and executive visibility systems for multi-division companies and fast-growing organizations.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="claude-cards-grid">
          {workflows.map((wf, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#71717A', fontWeight: 600 }}>
                    {wf.step}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', color: '#E4E4E7', padding: '4px 10px', borderRadius: '100px', fontWeight: 600 }}>
                    {wf.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {wf.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: 1.6, margin: 0 }}>
                  {wf.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .claude-header-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .claude-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
