import React, { useState } from 'react';
import { Terminal, Database, Cpu, Send, RefreshCw, Layers } from 'lucide-react';
import { playClickSound, playHoverSound, playSuccessPulse } from '../utils/audio';

export default function TechnicalPipeline() {
  const [prospectName, setProspectName] = useState('Rajesh Sharma');
  const [companyName, setCompanyName] = useState('Apex Logistics India');
  const [industry, setIndustry] = useState('Supply Chain & Freight');
  
  const [simulating, setSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [icebreakerResult, setIcebreakerResult] = useState(null);

  const runSimulation = () => {
    playClickSound();
    setSimulating(true);
    setActiveStep(1);
    setIcebreakerResult(null);

    setTimeout(() => {
      setActiveStep(2);
      playHoverSound();
    }, 800);

    setTimeout(() => {
      setActiveStep(3);
      playHoverSound();
    }, 1600);

    setTimeout(() => {
      setActiveStep(4);
      playSuccessPulse();
      setSimulating(false);
      setIcebreakerResult(
        `"Hi ${prospectName}, saw Apex Logistics' expansion into regional freight corridors. Noticed legacy dispatch tracking still relies on manual WhatsApp logs. We built a custom Node.js pipeline that automated dispatch updates for 14 regional fleets, cutting customer inquiry calls by 78% without adding new SaaS licenses. Worth a brief 5-min look?"`
      );
    }, 2400);
  };

  return (
    <section id="projects" className="light-section-wrapper light-padding">
      <div className="light-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="light-section-tag">04 // TECHNICAL ARCHITECTURE & STACK</span>
          <h2 className="light-section-title">
            Programmatic Infrastructure<br />
            & API Routing
          </h2>
          <p className="light-section-desc" style={{ margin: '0 auto' }}>
            AHMV Systems avoids rigid, bloated, low-tier no-code setups. Instead, we leverage custom programmatic logic, 
            API routing, and advanced LLMs to engineer highly scalable revenue engines.
          </p>
        </div>

        {/* Main Light Card Simulator */}
        <div className="light-card" style={{ marginBottom: '40px' }}>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#09090b',
            fontWeight: 700,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <Terminal size={16} />
            <span>LIVE INTERACTIVE DATA PIPELINE SIMULATOR</span>
          </div>

          {/* Pipeline Step Nodes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '40px',
          }} className="pipeline-nodes-grid">
            
            <div style={{
              background: activeStep >= 1 ? '#09090b' : '#f4f4f5',
              color: activeStep >= 1 ? '#ffffff' : '#71717a',
              border: `1px solid ${activeStep >= 1 ? '#09090b' : '#e4e4e7'}`,
              padding: '18px',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>STEP 01</div>
              <div style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Database size={14} /> Data Sourcing
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>Apollo / Clay API</div>
            </div>

            <div style={{
              background: activeStep >= 2 ? '#09090b' : '#f4f4f5',
              color: activeStep >= 2 ? '#ffffff' : '#71717a',
              border: `1px solid ${activeStep >= 2 ? '#09090b' : '#e4e4e7'}`,
              padding: '18px',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>STEP 02</div>
              <div style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} /> Cleansing Loop
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>Webhook Validation</div>
            </div>

            <div style={{
              background: activeStep >= 3 ? '#09090b' : '#f4f4f5',
              color: activeStep >= 3 ? '#ffffff' : '#71717a',
              border: `1px solid ${activeStep >= 3 ? '#09090b' : '#e4e4e7'}`,
              padding: '18px',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>STEP 03</div>
              <div style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} /> Claude LLM AI
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>Context Icebreaker</div>
            </div>

            <div style={{
              background: activeStep >= 4 ? '#09090b' : '#f4f4f5',
              color: activeStep >= 4 ? '#ffffff' : '#71717a',
              border: `1px solid ${activeStep >= 4 ? '#09090b' : '#e4e4e7'}`,
              padding: '18px',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>STEP 04</div>
              <div style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Send size={14} /> Webhook Dispatch
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>Meta Audience Sync</div>
            </div>

          </div>

          {/* Form & Terminal Output Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '36px',
            alignItems: 'center',
          }} className="sim-grid">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>PROSPECT FOUNDER NAME:</label>
                <input
                  type="text"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  style={inputStyleLight}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>COMPANY NAME:</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={inputStyleLight}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>INDUSTRY SECTOR:</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  style={inputStyleLight}
                />
              </div>

              <button
                onClick={runSimulation}
                disabled={simulating}
                onMouseEnter={playHoverSound}
                className="btn-light-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              >
                {simulating ? <RefreshCw className="animate-spin" size={16} /> : <Cpu size={16} />}
                <span>{simulating ? 'RUNNING CLAUDE PIPELINE...' : 'EXECUTE PIPELINE SIMULATION'}</span>
              </button>
            </div>

            <div style={{
              background: '#09090b',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#a1a1aa', marginBottom: '12px' }}>
                OUTPUT: HYPER-PERSONALIZED OUTREACH MESSAGE
              </div>

              {simulating ? (
                <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6 }}>
                  &gt; Parsing company profile for {companyName}...<br />
                  &gt; Extracting digital footprint & operational bottlenecks...<br />
                  &gt; Querying Claude REST API context model...
                </div>
              ) : icebreakerResult ? (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '18px',
                  borderRadius: '10px',
                  borderLeft: '3px solid #ffffff',
                  lineHeight: 1.6,
                }}>
                  {icebreakerResult}
                </div>
              ) : (
                <div style={{ color: '#71717a', fontFamily: 'var(--font-mono)', fontSize: '12px', textAlign: 'center' }}>
                  Click 'EXECUTE PIPELINE SIMULATION' above to test real-time Claude API icebreaker generation & webhook dispatch routing.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Subsystems Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="subsystem-grid">
          
          <div className="light-card" style={{ padding: '28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700, marginBottom: '8px' }}>
              TECH STACK 01
            </div>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '10px' }}>
              System Automation
            </h4>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6 }}>
              Custom programmatic scripts in Python / Node.js built inside developer environments like Claude Code to rapidly deploy clean, error-free backend logic.
            </p>
          </div>

          <div className="light-card" style={{ padding: '28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700, marginBottom: '8px' }}>
              TECH STACK 02
            </div>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '10px' }}>
              Omnichannel Delivery
            </h4>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6 }}>
              Custom backend pipelines connected to automated webhooks (Smartlead, Instantly) for cold email rotation, and WhatsApp Business APIs for instant lead qualification.
            </p>
          </div>

          <div className="light-card" style={{ padding: '28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700, marginBottom: '8px' }}>
              TECH STACK 03
            </div>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '10px' }}>
              Retargeting Sync
            </h4>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6 }}>
              Automated data loops continuously stream outbound email lists into Meta & Google Ad platforms as a "Custom Audience", creating market dominance.
            </p>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .pipeline-nodes-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .sim-grid {
            grid-template-columns: 1fr !important;
          }
          .subsystem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const inputStyleLight = {
  width: '100%',
  background: '#ffffff',
  border: '1px solid #e4e4e7',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#09090b',
  fontFamily: 'var(--font-outfit)',
  fontSize: '13px',
  outline: 'none',
  marginTop: '4px',
};
