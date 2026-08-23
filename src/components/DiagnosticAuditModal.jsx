import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DiagnosticAuditModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    bottleneck: '',
    stackSize: '',
    targetOutcome: '',
  });
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (key, val) => {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setStep(1);
    setAnswers({ bottleneck: '', stackSize: '', targetOutcome: '' });
    setCompleted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10,10,11,0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={reset}
    >
      <div
        style={{
          background: '#FFFFFF',
          color: '#0A0A0B',
          borderRadius: '20px',
          padding: '40px 36px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          border: '1px solid #E4E4E7',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={reset}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '18px',
            color: '#71717A',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {!completed ? (
          <div>
            {/* Step indicator */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    height: '4px',
                    flex: 1,
                    borderRadius: '2px',
                    background: step >= s ? '#0A0A0B' : '#E4E4E7',
                    transition: 'background 0.2s ease',
                  }}
                />
              ))}
            </div>

            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '8px' }}>
              QUESTION 0{step} OF 03
            </p>

            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', lineHeight: 1.25 }}>
                  Where is your biggest operational leak today?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Inbound leads going cold in DMs or slow follow-ups',
                    'Support & project delivery running on memory without a portal',
                    'Invoicing is manual and cash flow numbers lag behind',
                    'Paying for 5+ SaaS tools that do not talk to each other',
                  ].map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect('bottleneck', opt)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid #E4E4E7',
                        background: '#F4F4F5',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#0A0A0B',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0B'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5'; e.currentTarget.style.color = '#0A0A0B'; }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', lineHeight: 1.25 }}>
                  How many disconnected tools is your team managing?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    '1 to 3 tools (mostly spreadsheets & WhatsApp)',
                    '4 to 7 tools (CRM, task board, email software, billing app)',
                    '8+ complex subscriptions with overlapping features',
                    'Custom internal mess built by previous contractors',
                  ].map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect('stackSize', opt)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid #E4E4E7',
                        background: '#F4F4F5',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#0A0A0B',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0B'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5'; e.currentTarget.style.color = '#0A0A0B'; }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', lineHeight: 1.25 }}>
                  What outcome would create the highest leverage?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Automated 24/7 lead qualification & instant calendar booking',
                    'Centralized client portal with live delivery milestones',
                    'Automated invoicing and receivable reconciliation',
                    'One unified custom internal operating system that replaces all bloat',
                  ].map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect('targetOutcome', opt)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: '1px solid #E4E4E7',
                        background: '#F4F4F5',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#0A0A0B',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0B'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5'; e.currentTarget.style.color = '#0A0A0B'; }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Audit Results Screen */
          (() => {
            const getRecommendedService = () => {
              const out = answers.targetOutcome || '';
              if (out.includes('lead') || out.includes('booking')) return { id: 'sales-revenue', name: 'Sales & Revenue Vertical', url: '/services/sales-revenue', bottleneck: 'Lead Pipeline Decay' };
              if (out.includes('invoicing')) return { id: 'ai-finance', name: 'AI Finance Vertical', url: '/services/ai-finance', bottleneck: 'Manual Financial Processing' };
              if (out.includes('custom')) return { id: 'custom-software', name: 'Custom Architecture', url: '/services/custom-software', bottleneck: 'Fragmented Tech Stack' };
              return { id: 'operations-automation', name: 'Operations Vertical', url: '/services/operations-automation', bottleneck: 'Manual Ops Debt' };
            };
            const rec = getRecommendedService();
            return (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#0A0A0B',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      margin: '0 auto 16px',
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
                    Diagnostic Blueprint Ready
                  </h3>
                  <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.5 }}>
                    Based on your inputs, your business exhibits <strong>High Operational Friction</strong> that can be fixed within 14 days.
                  </p>
                </div>

                <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--mwg2-grey)' }}>IDENTIFIED BOTTLENECK:</span>
                    <span style={{ fontWeight: 600, color: '#DC2626' }}>{rec.bottleneck}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--mwg2-grey)' }}>PRESCRIBED SYSTEM:</span>
                    <span style={{ fontWeight: 600, color: '#0A0A0B' }}>{rec.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mwg2-grey)' }}>ESTIMATED DEPLOY TIME:</span>
                    <span style={{ fontWeight: 600, color: '#10B981' }}>14 Days</span>
                  </div>
                </div>

                <Link
                  to={rec.url}
                  onClick={reset}
                  className="cta-main cta-main1"
                  style={{
                    height: '50px',
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '13px',
                    background: '#0A0A0B',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                >
                  <span>View {rec.name} Details</span>
                </Link>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
