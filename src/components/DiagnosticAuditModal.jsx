import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const questions = [
  {
    key: 'businessType',
    title: 'What kind of business are you running?',
    options: [
      'B2B services',
      'B2C services',
      'E-commerce',
      'Real estate',
      'Professional services',
      'Other',
    ],
  },
  {
    key: 'teamSize',
    title: 'How big is the team today?',
    options: [
      '1 to 10 people',
      '11 to 25',
      '26 to 50',
      '51 to 100',
      '101 to 250',
      '250+',
    ],
  },
  {
    key: 'lossArea',
    title: 'Where is the business losing the most time, money or opportunities?',
    options: [
      'Lead generation or follow-up',
      'Customer handling',
      'Internal operations',
      'Finance or invoicing',
      'Manual data entry',
      'Disconnected software',
      'Digital growth',
      'Not sure yet',
    ],
  },
  {
    key: 'improvementGoal',
    title: 'What are you trying to improve?',
    options: [
      'More qualified opportunities',
      'Faster response and follow-up',
      'Less manual work',
      'Better visibility into operations',
      'Better financial control',
      'A new digital system',
      'Something else',
    ],
  },
];

export default function DiagnosticAuditModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (key, val) => {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setCompleted(false);
    onClose();
  };

  const currentQ = questions[step];

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
              {questions.map((_, s) => (
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
              QUESTION 0{step + 1} OF 0{questions.length}
            </p>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', lineHeight: 1.25 }}>
                {currentQ.title}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: currentQ.options.length > 4 ? '1fr 1fr' : '1fr', gap: '10px' }}>
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(currentQ.key, opt)}
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
          </div>
        ) : (
          /* Audit Results Screen */
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
              <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '10px', lineHeight: 1.25 }}>
                Based on your answers, an Operations Review is probably worth doing.
              </h3>
              <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.5, maxWidth: '440px', margin: '0 auto' }}>
                We'll read your answers before the call, so we go straight to the actual problem instead of starting from zero.
              </p>
            </div>

            <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--mwg2-grey)' }}>PRIMARY FOCUS:</span>
                <span style={{ fontWeight: 600, color: '#0A0A0B' }}>{answers.lossArea || 'Operations'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--mwg2-grey)' }}>TARGET OUTCOME:</span>
                <span style={{ fontWeight: 600, color: '#0A0A0B' }}>{answers.improvementGoal || 'Process Clarity'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--mwg2-grey)' }}>ESTIMATED TIME:</span>
                <span style={{ fontWeight: 600, color: '#10B981' }}>14 Days</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="#contact"
                onClick={() => reset()}
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
                <span>Book My Operations Review</span>
              </a>

              <a
                href="#products"
                onClick={() => reset()}
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: '#71717A',
                  padding: '8px',
                  textDecoration: 'none'
                }}
              >
                See what we build →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
