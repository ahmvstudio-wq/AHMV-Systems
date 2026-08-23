import React, { useState } from 'react';

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(8);
  const [monthlyLeads, setMonthlyLeads] = useState(120);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [toolsCount, setToolsCount] = useState(5);
  const [currency, setCurrency] = useState('AED'); // 'AED' | 'USD' | 'INR'

  // Calculations
  const rateMultiplier = currency === 'AED' ? 3.67 : (currency === 'INR' ? 86 : 1);
  const hourlyRateUsd = 30; // standard blended loaded ops cost

  const annualHoursWasted = Math.round(teamSize * hoursPerWeek * 50 * 0.75);
  const annualOpsCost = Math.round(annualHoursWasted * (hourlyRateUsd * rateMultiplier));
  const saasSavings = Math.round(toolsCount * (75 * rateMultiplier) * 12 * 0.6); // 60% tool consolidation
  const totalAnnualSavings = annualOpsCost + saasSavings;

  const currencySymbol = currency === 'AED' ? 'AED ' : (currency === 'INR' ? '₹' : '$');

  return (
    <section
      id="roi-calculator"
      style={{
        padding: '90px 0',
        background: '#FFFFFF',
        color: '#0A0A0B',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
              OPERATIONS ROI CALCULATOR
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: 'clamp(30px, 4.2vw, 54px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'var(--mwg2-black)',
                maxWidth: '720px',
              }}
            >
              Calculate your business operational debt & time leakage.
            </h2>
          </div>

          {/* Currency Toggle */}
          <div style={{ display: 'flex', gap: '6px', background: '#FFFFFF', padding: '4px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
            {['AED', 'USD', 'INR'].map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: currency === c ? '#0A0A0B' : 'none',
                  color: currency === c ? '#FFFFFF' : '#71717A',
                  fontWeight: currency === c ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid: Sliders on Left, Live Output Card on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
            alignItems: 'stretch',
          }}
          className="calculator-split"
        >
          {/* Sliders Box */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '16px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {/* Slider 1: Team Size */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0B' }}>
                  Core Team Size
                </label>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0A0A0B' }}>
                  {teamSize} people
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0A0A0B', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 2: Monthly Leads */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0B' }}>
                  Monthly Inbound Leads / Inquiries
                </label>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0A0A0B' }}>
                  {monthlyLeads} leads/mo
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="800"
                step="10"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0A0A0B', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 3: Hours Lost */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0B' }}>
                  Manual Ops / Spreadsheet Hours Per Person / Week
                </label>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0A0A0B' }}>
                  {hoursPerWeek} hours/week
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0A0A0B', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 4: SaaS Tools */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0B' }}>
                  Current Software & SaaS Subscriptions
                </label>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0A0A0B' }}>
                  {toolsCount} tools
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={toolsCount}
                onChange={(e) => setToolsCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0A0A0B', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Results Output Box */}
          <div
            data-tilt
            style={{
              background: '#0A0A0B',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.06em', display: 'block', marginBottom: '16px' }}>
                PROJECTED ANNUAL IMPACT
              </span>

              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '42px', fontWeight: 600, fontFamily: 'var(--font-mono)', lineHeight: 1, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
                  {currencySymbol}{totalAnnualSavings.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#A1A1AA', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                  Estimated annual operational value reclaimed
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid #27272A', paddingTop: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Annual Hours Saved:</span>
                  <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{annualHoursWasted.toLocaleString()} hrs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Lead Response Acceleration:</span>
                  <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#10B981' }}>&lt; 60s (Instant)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Consolidated SaaS Savings:</span>
                  <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{currencySymbol}{saasSavings.toLocaleString()}/yr</span>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="cta-main cta-main1"
              style={{
                height: '48px',
                width: '100%',
                justifyContent: 'center',
                fontSize: '13px',
                background: '#FFFFFF',
                color: '#0A0A0B',
                borderRadius: '8px',
              }}
            >
              <span>Reclaim this in your operations review →</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .calculator-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
