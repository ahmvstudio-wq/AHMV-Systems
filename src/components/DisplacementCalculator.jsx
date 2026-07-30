import React, { useState } from 'react';
import { ArrowRight, CheckSquare, Square, Calculator } from 'lucide-react';
import { playClickSound, playHoverSound, playSuccessPulse } from '../utils/audio';

export default function DisplacementCalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [selectedTools, setSelectedTools] = useState(['salesforce', 'hubspot', 'monday']);

  const availableTools = [
    { id: 'salesforce', name: 'Salesforce CRM Enterprise', costPerSeat: 150 },
    { id: 'hubspot', name: 'HubSpot Marketing Hub', costPerSeat: 90 },
    { id: 'monday', name: 'Monday.com Work OS Pro', costPerSeat: 30 },
    { id: 'asana', name: 'Asana Business Edition', costPerSeat: 25 },
    { id: 'zapier', name: 'Zapier Enterprise Workflows', costPerSeat: 45 },
    { id: 'activecampaign', name: 'ActiveCampaign Plus', costPerSeat: 40 },
  ];

  const toggleTool = (id) => {
    playClickSound();
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter(t => t !== id));
    } else {
      setSelectedTools([...selectedTools, id]);
      playSuccessPulse();
    }
  };

  const monthlyCostPerUser = availableTools
    .filter(t => selectedTools.includes(t.id))
    .reduce((acc, curr) => acc + curr.costPerSeat, 0);

  const totalMonthlyWasteUSD = monthlyCostPerUser * teamSize;
  const totalAnnualWasteUSD = totalMonthlyWasteUSD * 12;

  const totalMonthlyWasteINR = Math.round(totalMonthlyWasteUSD * 83);
  const totalAnnualWasteINR = Math.round(totalAnnualWasteUSD * 83);

  const ahmvRetainerINR = 15000;
  const netMonthlySavingsINR = totalMonthlyWasteINR - ahmvRetainerINR;

  return (
    <section id="process" className="light-section-wrapper light-padding">
      <div className="light-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="light-section-tag">02 // DISPLACEMENT CALCULATOR</span>
          <h2 className="light-section-title">
            Software Displacement:<br />
            Immediate Cash-Flow Arbitrage
          </h2>
          <p className="light-section-desc" style={{ margin: '0 auto' }}>
            Before launching a single ad, AHMV Systems executes an operational audit to eliminate fragmented SaaS tools, 
            replacing them with bespoke internal code and creating instant profit.
          </p>
        </div>

        {/* Calculator Main Card */}
        <div className="light-card">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'start',
          }} className="calc-grid">
            
            {/* Left Controls */}
            <div>
              {/* Slider */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <label style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#09090b',
                    fontWeight: 700,
                  }}>
                    ACTIVE TEAM SEATS:
                  </label>
                  <span style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#ffffff',
                    background: '#09090b',
                    padding: '2px 14px',
                    borderRadius: '6px',
                  }}>
                    {teamSize} SEATS
                  </span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="100"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  onInput={playHoverSound}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#e4e4e7',
                    outline: 'none',
                    cursor: 'pointer',
                    accentColor: '#09090b',
                  }}
                />
              </div>

              {/* Tools List */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-dark-secondary)',
                  marginBottom: '14px',
                }}>
                  SELECT CURRENT SaaS TOOLS IN YOUR ORGANIZATION:
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }} className="tool-grid">
                  {availableTools.map((tool) => {
                    const isSelected = selectedTools.includes(tool.id);
                    return (
                      <div
                        key={tool.id}
                        onClick={() => toggleTool(tool.id)}
                        onMouseEnter={playHoverSound}
                        style={{
                          background: isSelected ? '#f4f4f5' : '#ffffff',
                          border: `1px solid ${isSelected ? '#09090b' : '#e4e4e7'}`,
                          padding: '14px 16px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isSelected ? (
                          <CheckSquare size={18} color="#09090b" style={{ flexShrink: 0 }} />
                        ) : (
                          <Square size={18} color="#a1a1aa" style={{ flexShrink: 0 }} />
                        )}
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: isSelected ? '#09090b' : '#71717a' }}>
                            {tool.name}
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#71717a' }}>
                            ${tool.costPerSeat}/seat/mo
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Output Meter Box */}
            <div style={{
              background: '#09090b',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '36px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#a1a1aa',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>DISPLACEMENT REPORT</span>
                <Calculator size={16} color="#ffffff" />
              </div>

              <div style={{
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              }}>
                <div style={{ fontSize: '12px', color: '#a1a1aa', fontFamily: 'var(--font-mono)' }}>
                  CURRENT ANNUAL SaaS BLOAT:
                </div>
                <div style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '34px',
                  fontWeight: 800,
                  color: '#ffffff',
                }}>
                  ${totalAnnualWasteUSD.toLocaleString()} / yr
                </div>
                <div style={{ fontSize: '12px', color: '#71717a', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  ≈ ₹{totalAnnualWasteINR.toLocaleString()} / year in license sprawl
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
              }}>
                <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  NET MONTHLY CASHFLOW ARBITRAGE
                </div>
                <div style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '38px',
                  fontWeight: 800,
                  color: '#ffffff',
                }}>
                  +₹{netMonthlySavingsINR > 0 ? netMonthlySavingsINR.toLocaleString() : 0} <span style={{ fontSize: '14px', color: '#a1a1aa' }}>/ month</span>
                </div>
                <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '6px' }}>
                  Net cash saved monthly AFTER paying AHMV's ₹15,000 recurring retainer.
                </div>
              </div>

              <a
                href="#services"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="btn-solid-white"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>PROCEED TO REPLACEMENT CODE</span>
                <ArrowRight size={15} />
              </a>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
          .tool-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
