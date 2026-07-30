import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Diagnostic Conversation', desc: 'We map how leads move, what breaks, and where time bleeds.' },
  { num: '02', title: 'Honest Fit Verdict',      desc: 'Plain read: what we found and whether we can genuinely help.' },
  { num: '03', title: 'System Design',            desc: 'We architect the fix — pipeline, OS, tools, or custom app.' },
  { num: '04', title: 'Build & Stay',             desc: 'Built in code, trained with your team, accountable after handoff.' },
];

const protections = [
  'Sold automation when governance is the real problem',
  'Sold another tool when your stack is already bloated',
  'Sold AI for problems that don\'t need AI at all',
];

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline — clip-path wipe
    const h2 = sectionRef.current.querySelector('.proc-head');
    if (h2) {
      gsap.set(h2, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: h2, start: 'top 84%',
        onEnter: () => gsap.to(h2, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }

    // Step cards — scale+blur with stagger
    const cards = sectionRef.current.querySelectorAll('.proc-card');
    gsap.set(cards, { scale: 0.88, opacity: 0, filter: 'blur(8px)', y: 36 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.proc-grid'), start: 'top 78%',
      onEnter: () => gsap.to(cards, { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.85, stagger: 0.15, ease: 'back.out(1.5)' }),
      once: true,
    });

    // Timeline line draw
    const line = sectionRef.current.querySelector('.timeline-line');
    if (line) {
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: line, start: 'top 82%',
        onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }),
        once: true,
      });
    }

    // Protection chips
    const chips = sectionRef.current.querySelectorAll('.prot-chip');
    gsap.set(chips, { y: 28, opacity: 0 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.prot-grid'), start: 'top 82%',
      onEnter: () => gsap.to(chips, { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'expo.out' }),
      once: true,
    });

  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="sec-black pr"
      style={{ padding: '100px 40px', background: 'var(--mwg2-black)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>
          DIAGNOSTIC PROCESS
        </p>

        <h2
          className="proc-head"
          style={{
            fontSize: 'clamp(28px, 4vw, 62px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            marginBottom: '16px',
            maxWidth: '720px',
            willChange: 'clip-path',
          }}
        >
          The diagnostic comes before the proposal. Always.
        </h2>

        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', marginBottom: '64px' }}>
          Not a sales call with a better name.
        </p>

        {/* Timeline connector */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div
            className="timeline-line"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg,rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.08) 100%)',
              marginBottom: '20px',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFF', color: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {s.num}
              </div>
            ))}
          </div>
        </div>

        {/* Step Cards */}
        <div className="proc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '56px' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              className="proc-card"
              data-tilt
              style={{
                background: '#18181B',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '26px 20px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>
                STEP {s.num}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#FFF', marginBottom: '10px', lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Protection block */}
        <div data-tilt style={{ background: '#18181B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px', transformStyle: 'preserve-3d' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: '20px', letterSpacing: '0.06em' }}>
            WHAT THIS PROTECTS YOU FROM
          </p>
          <div className="prot-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
            {protections.map((p, i) => (
              <div key={i} className="prot-chip" style={{ background: '#0A0A0B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '18px', fontSize: '13px', color: '#FFF', fontWeight: 500, lineHeight: 1.4 }}>
                {p}
              </div>
            ))}
          </div>
          <a href="#diagnostic" className="cta-main cta-main1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 24px' }}>
            Start Your Diagnostic
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) { .proc-grid { grid-template-columns: 1fr 1fr !important; } .prot-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 540px) { .proc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
