import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

// ── Question Data ──
const questions = [
  {
    id: 'business-type',
    question: 'What kind of business are you running?',
    options: [
      { label: 'B2B services', value: 'b2b', icon: '◈' },
      { label: 'B2C services', value: 'b2c', icon: '◇' },
      { label: 'E-commerce', value: 'ecommerce', icon: '⬡' },
      { label: 'Real estate', value: 'realestate', icon: '△' },
      { label: 'Professional services', value: 'services', icon: '□' },
      { label: 'Other', value: 'other', icon: '○' },
    ],
  },
  {
    id: 'team-size',
    question: 'How big is the team today?',
    options: [
      { label: '1 to 10 people', value: '1-10', icon: '①' },
      { label: '11 to 25', value: '11-25', icon: '②' },
      { label: '26 to 50', value: '26-50', icon: '③' },
      { label: '51 to 100', value: '51-100', icon: '④' },
      { label: '101 to 250', value: '101-250', icon: '⑤' },
      { label: '250+', value: '250+', icon: '⑥' },
    ],
  },
  {
    id: 'bottleneck',
    question: 'Where is the business losing the most time, money or opportunities?',
    options: [
      { label: 'Lead generation or follow-up', value: 'leads', icon: '↗' },
      { label: 'Customer handling', value: 'retention', icon: '↺' },
      { label: 'Internal operations', value: 'ops', icon: '⚙' },
      { label: 'Finance or invoicing', value: 'finance', icon: '💳' },
      { label: 'Manual data entry', value: 'data', icon: '📋' },
      { label: 'Disconnected software', value: 'tools', icon: '⬡' },
      { label: 'Digital growth', value: 'growth', icon: '⚡' },
      { label: 'Not sure yet', value: 'unknown', icon: '?' },
    ],
  },
  {
    id: 'goal',
    question: 'What are you trying to improve?',
    options: [
      { label: 'More qualified opportunities', value: 'leads_goal', icon: '🎯' },
      { label: 'Faster response and follow-up', value: 'speed_goal', icon: '⚡' },
      { label: 'Less manual work', value: 'ops_goal', icon: '⚙' },
      { label: 'Better visibility into operations', value: 'visibility_goal', icon: '👁' },
      { label: 'Better financial control', value: 'finance_goal', icon: '📊' },
      { label: 'A new digital system', value: 'system_goal', icon: '💻' },
      { label: 'Something else', value: 'other_goal', icon: '○' },
    ],
  }
];

// ── Result Mapping ──
function getResult(answers) {
  const bottleneck = answers['bottleneck'];

  const results = {
    leads: {
      title: 'Based on your answers, an Operations Review is probably worth doing.',
      subtitle: "We'll read your answers before the call, so we go straight to the actual problem instead of starting from zero.",
      system: 'Applied AI & Acquisition Systems',
      urgency: 'High leverage — lead decay compounds quickly.',
    },
    retention: {
      title: 'Based on your answers, an Operations Review is probably worth doing.',
      subtitle: "We'll read your answers before the call, so we go straight to the actual problem instead of starting from zero.",
      system: 'Business Infrastructure & Client Portals',
      urgency: 'Immediate — customer experience directly affects LTV.',
    },
    finance: {
      title: 'Based on your answers, an Operations Review is probably worth doing.',
      subtitle: "We'll read your answers before the call, so we go straight to the actual problem instead of starting from zero.",
      system: 'Business Infrastructure (Finance ERP & Cash Flow)',
      urgency: 'High — manual invoicing creates cash lag.',
    },
    ops: {
      title: 'Based on your answers, an Operations Review is probably worth doing.',
      subtitle: "We'll read your answers before the call, so we go straight to the actual problem instead of starting from zero.",
      system: 'Business Infrastructure & Workflow Systems',
      urgency: 'High priority — operational drag limits capacity.',
    },
  };

  return results[bottleneck] || {
    title: 'Based on your answers, an Operations Review is probably worth doing.',
    subtitle: "We'll read your answers before the call, so we go straight to the actual problem instead of starting from zero.",
    system: 'Business Infrastructure & Operations Engineering',
    urgency: 'Recommended — structured diagnosis clarifies ROI.',
  };
}

// ── Main Component ──
export default function DiagnosticFlow({ onComplete }) {
  const [phase, setPhase] = useState('intro'); // intro | welcome | questions | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [introStep, setIntroStep] = useState(0);

  const introTexts = [
    "We Don't Sell Software. We Fix Operational Problems.",
    [
      "A clearer picture.",
      "A better system.",
      "Start here."
    ]
  ];

  const containerRef = useRef(null);
  const introTextRef = useRef(null);
  const welcomeRef = useRef(null);
  const questionRef = useRef(null);
  const optionsRef = useRef(null);
  const progressRef = useRef(null);

  // ── Animate Intro Sequence ──
  useEffect(() => {
    if (phase !== 'intro' || !introTextRef.current) return;

    const el = introTextRef.current;
    const isMultiLine = Array.isArray(introTexts[introStep]);
    const tl = gsap.timeline({
      onComplete: () => {
        if (introStep < introTexts.length - 1) {
          setIntroStep(prev => prev + 1);
        } else {
          setPhase('welcome');
        }
      }
    });

    if (isMultiLine) {
      const lines = el.querySelectorAll('.intro-line');
      gsap.set(el, { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 });
      
      tl.fromTo(lines,
        { opacity: 0, y: 24, filter: 'blur(16px)', scale: 0.96 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1.3, stagger: 0.75, ease: 'power2.out' }
      )
      .to(el,
        { opacity: 0, y: -16, filter: 'blur(14px)', scale: 1.03, duration: 0.9, ease: 'power2.inOut', delay: 1.8 }
      );
    } else {
      tl.fromTo(el,
        { opacity: 0, y: 18, filter: 'blur(12px)', scale: 0.96 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.9, ease: 'power2.out' }
      )
      .to(el,
        { opacity: 0, y: -14, filter: 'blur(12px)', scale: 1.03, duration: 0.8, ease: 'power2.in', delay: 1.5 }
      );
    }

    return () => {
      tl.kill();
    };
  }, [phase, introStep]);

  // ── Animate Welcome entrance ──
  useEffect(() => {
    if (phase === 'welcome' && welcomeRef.current) {
      gsap.fromTo(welcomeRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [phase]);

  // ── Welcome → Questions transition ──
  const startQuiz = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => setPhase('questions'),
    });
    tl.to(welcomeRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power3.in',
    });
  }, []);

  // ── Animate question entrance ──
  useEffect(() => {
    if (phase === 'questions' && questionRef.current && optionsRef.current) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });

      const tl = gsap.timeline();

      // Question text
      tl.fromTo(questionRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
      );

      // Progress
      if (progressRef.current) {
        tl.fromTo(progressRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.5'
        );
      }

      // Options - staggered from bottom
      const optionEls = optionsRef.current.children;
      tl.fromTo(optionEls,
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }
  }, [phase, currentQ]);

  // ── Animate result entrance ──
  useEffect(() => {
    if (phase === 'result' && containerRef.current) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });

      const children = containerRef.current.querySelectorAll('.result-animate');
      gsap.fromTo(children,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }
  }, [phase]);

  // ── Handle option selection ──
  const selectOption = useCallback((value) => {
    if (selectedOption) return; // prevent double-clicks
    setSelectedOption(value);

    const newAnswers = { ...answers, [questions[currentQ].id]: value };
    setAnswers(newAnswers);

    // Animate out
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedOption(null);
        if (currentQ < questions.length - 1) {
          setCurrentQ(prev => prev + 1);
        } else {
          setPhase('result');
        }
      },
    });

    tl.to(optionsRef.current.children, {
      opacity: 0,
      y: -12,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
    });
    tl.to(questionRef.current, {
      opacity: 0,
      y: -20,
      filter: 'blur(6px)',
      duration: 0.35,
      ease: 'power2.in',
    }, '-=0.15');
  }, [answers, currentQ, selectedOption]);

  // ── Skip to website ──
  const skipToSite = useCallback(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => onComplete(null),
    });
  }, [onComplete]);

  // ── Enter site from result ──
  const enterSite = useCallback(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => onComplete(answers),
    });
  }, [onComplete, answers]);

  const result = phase === 'result' ? getResult(answers) : null;

  return (
    <div style={styles.overlay}>
      <div ref={containerRef} style={styles.container}>

        {/* ── INTRO SCREEN ── */}
        {phase === 'intro' && (
          <div style={styles.introInner}>
            <h2 key={introStep} ref={introTextRef} style={styles.introText}>
              {Array.isArray(introTexts[introStep]) 
                ? introTexts[introStep].map((line, i) => (
                    <span
                      key={i}
                      className="intro-line"
                      style={{ display: 'block', margin: '4px 0', willChange: 'opacity, filter, transform' }}
                    >
                      {line}
                    </span>
                  ))
                : introTexts[introStep]
              }
            </h2>
          </div>
        )}

        {/* ── WELCOME SCREEN ── */}
        {phase === 'welcome' && (
          <div ref={welcomeRef} style={styles.welcomeInner}>
            {/* Logo */}
            <div style={styles.logoMark}>
              <img
                src="/logo.png.png"
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                alt="AHMV Systems Logo"
                style={{ height: '48px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>

            <h1 style={styles.welcomeTitle}>
              Let's see if we're a fit.
            </h1>

            <p style={styles.welcomeSub}>
              Four quick questions. No signup. No email.
            </p>

            <button onClick={startQuiz} style={styles.beginBtn}>
              <span>Begin</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button onClick={skipToSite} style={styles.skipLink}>
              Skip to website →
            </button>
          </div>
        )}

        {/* ── QUESTION SCREEN ── */}
        {phase === 'questions' && (
          <div style={styles.questionInner}>
            {/* Progress */}
            <div ref={progressRef} style={styles.progressWrap}>
              <span style={styles.progressText}>
                {currentQ + 1}
              </span>
              <span style={styles.progressDivider}>/</span>
              <span style={styles.progressTotal}>
                {questions.length}
              </span>
              {/* Progress dots */}
              <div style={styles.dotsRow}>
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.dot,
                      backgroundColor: i <= currentQ ? '#0A0A0B' : '#E4E4E7',
                      transform: i === currentQ ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <h2 ref={questionRef} style={styles.questionText}>
              {questions[currentQ].question}
            </h2>

            {/* Options */}
            <div ref={optionsRef} style={styles.optionsGrid}>
              {questions[currentQ].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  style={{
                    ...styles.optionCard,
                    ...(selectedOption === opt.value ? styles.optionSelected : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedOption) {
                      e.currentTarget.style.borderColor = '#0A0A0B';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedOption || selectedOption !== opt.value) {
                      e.currentTarget.style.borderColor = '#E4E4E7';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <span style={styles.optionIcon}>{opt.icon}</span>
                  <span style={styles.optionLabel}>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Skip */}
            <button onClick={skipToSite} style={styles.skipLinkBottom}>
              Skip to website →
            </button>
          </div>
        )}

        {/* ── RESULT SCREEN ── */}
        {phase === 'result' && result && (
          <div style={styles.resultInner}>
            <div className="result-animate" style={styles.resultBadge}>
              DIAGNOSIS COMPLETE
            </div>

            <h2 className="result-animate" style={styles.resultTitle}>
              {result.title}
            </h2>

            <p className="result-animate" style={styles.resultSub}>
              {result.subtitle}
            </p>

            <div className="result-animate" style={styles.resultCard}>
              <div style={styles.resultCardRow}>
                <span style={styles.resultCardLabel}>RECOMMENDED SYSTEM</span>
                <span style={styles.resultCardValue}>{result.system}</span>
              </div>
              <div style={{ ...styles.resultCardRow, borderTop: '1px solid #F4F4F5' }}>
                <span style={styles.resultCardLabel}>URGENCY</span>
                <span style={styles.resultCardValue}>{result.urgency}</span>
              </div>
            </div>

            <div className="result-animate" style={styles.resultActions}>
              <button onClick={enterSite} style={styles.enterSiteBtn}>
                Explore AHMV Systems
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <a href="#contact" onClick={(e) => { e.preventDefault(); enterSite(); }} style={styles.bookCallLink}>
                Book a free operations review →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Inline Styles for mobile ── */}
      <style>{`
        @media (max-width: 640px) {
          .df-question-text {
            font-size: 26px !important;
            margin-bottom: 24px !important;
          }
          .df-options-grid {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            max-height: 50vh;
            overflow-y: auto;
            padding-right: 4px;
          }
          .df-option-card {
            padding: 12px 16px !important;
            gap: 6px !important;
          }
          .df-welcome-title {
            font-size: 32px !important;
          }
          .df-result-title {
            font-size: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Styles ──
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: '#FAFAFA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  container: {
    width: '100%',
    maxWidth: '680px',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  // ── Intro ──
  introInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: 0, left: 0,
    padding: '24px'
  },
  introText: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 500,
    letterSpacing: '-0.03em',
    color: '#0A0A0B',
    lineHeight: 1.2,
    maxWidth: '800px',
    willChange: 'opacity, filter, transform'
  },

  // ── Welcome ──
  welcomeInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0',
  },
  logoMark: {
    marginBottom: '48px',
  },
  welcomeTitle: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '42px',
    fontWeight: 600,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    color: '#0A0A0B',
    marginBottom: '16px',
  },
  welcomeSub: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '17px',
    fontWeight: 400,
    color: '#71717A',
    marginBottom: '48px',
    lineHeight: 1.5,
  },
  beginBtn: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '16px',
    fontWeight: 500,
    color: '#FFFFFF',
    background: '#0A0A0B',
    border: 'none',
    borderRadius: '100px',
    padding: '14px 40px',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    marginBottom: '24px',
  },
  skipLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    fontWeight: 500,
    color: '#A1A1AA',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'color 0.2s ease',
    padding: '8px',
  },

  // ── Questions ──
  questionInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '40px',
  },
  progressText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    fontWeight: 700,
    color: '#0A0A0B',
  },
  progressDivider: {
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    color: '#D4D4D8',
    margin: '0 2px',
  },
  progressTotal: {
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    fontWeight: 400,
    color: '#A1A1AA',
  },
  dotsRow: {
    display: 'flex',
    gap: '6px',
    marginLeft: '16px',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  questionText: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '38px',
    fontWeight: 600,
    letterSpacing: '-0.035em',
    lineHeight: 1.15,
    color: '#0A0A0B',
    marginBottom: '48px',
    maxWidth: '560px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    width: '100%',
    maxWidth: '560px',
    marginBottom: '40px',
  },
  optionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '20px 24px',
    background: '#FFFFFF',
    border: '1.5px solid #E4E4E7',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    textAlign: 'left',
  },
  optionSelected: {
    borderColor: '#0A0A0B',
    background: '#0A0A0B',
    color: '#FFFFFF',
    transform: 'scale(0.97)',
  },
  optionIcon: {
    fontSize: '18px',
    lineHeight: 1,
    opacity: 0.5,
  },
  optionLabel: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '15px',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  skipLinkBottom: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 500,
    color: '#A1A1AA',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'color 0.2s ease',
    padding: '8px',
  },

  // ── Result ──
  resultInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  resultBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    color: '#71717A',
    marginBottom: '24px',
    padding: '6px 16px',
    border: '1px solid #E4E4E7',
    borderRadius: '100px',
  },
  resultTitle: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '36px',
    fontWeight: 600,
    letterSpacing: '-0.035em',
    lineHeight: 1.15,
    color: '#0A0A0B',
    marginBottom: '16px',
    maxWidth: '520px',
  },
  resultSub: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '16px',
    fontWeight: 400,
    color: '#71717A',
    lineHeight: 1.6,
    marginBottom: '36px',
    maxWidth: '480px',
  },
  resultCard: {
    width: '100%',
    maxWidth: '480px',
    background: '#FFFFFF',
    border: '1px solid #E4E4E7',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '40px',
  },
  resultCardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 24px',
    gap: '16px',
  },
  resultCardLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: '#A1A1AA',
    textAlign: 'left',
  },
  resultCardValue: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0A0A0B',
    textAlign: 'right',
  },
  resultActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  enterSiteBtn: {
    fontFamily: 'var(--font-grotesk)',
    fontSize: '15px',
    fontWeight: 500,
    color: '#FFFFFF',
    background: '#0A0A0B',
    border: 'none',
    borderRadius: '100px',
    padding: '14px 36px',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  bookCallLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    fontWeight: 500,
    color: '#71717A',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
};
