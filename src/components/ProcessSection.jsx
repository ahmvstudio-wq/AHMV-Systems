import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Diagnose',
    desc: 'We review your operations to see how data moves.',
  },
  {
    num: '02',
    title: 'Decide fit',
    desc: 'We decide if you need custom software or nothing at all.',
  },
  {
    num: '03',
    title: 'Design the system',
    desc: 'We design the architecture before writing any code.',
  },
  {
    num: '04',
    title: 'Build & stay',
    desc: 'We build and deploy the system for your team.',
  },
];

const protections = [
  'Paying for bloated software.',
  'Adding confusing apps.',
  'Building unnecessary tools.',
];

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline - fade up
    const lines = sectionRef.current.querySelectorAll('.proc-head-line');
    if (lines.length > 0) {
      gsap.set(lines, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: lines[0],
        start: 'top 84%',
        onEnter: () => gsap.to(lines, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }),
        once: true,
      });
    }

    // Step cards
    const cards = sectionRef.current.querySelectorAll('.proc-card');
    gsap.set(cards, { scale: 0.9, opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.proc-grid'),
      start: 'top 78%',
      onEnter: () => gsap.to(cards, { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }),
      once: true,
    });

    // Timeline line draw
    const line = sectionRef.current.querySelector('.timeline-line');
    if (line) {
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: line,
        start: 'top 82%',
        onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }),
        once: true,
      });
    }
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: '#FFFFFF',
        color: '#0A0A0B',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
          METHODOLOGY
        </p>

        <div className="proc-head-container" style={{ marginBottom: '64px', maxWidth: '900px' }}>
          <p className="proc-head-line" style={{ 
            fontSize: 'clamp(24px, 3.5vw, 42px)', 
            fontWeight: 400, 
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '16px',
            color: '#A1A1AA'
          }}>
            An operational review comes before the proposal.
          </p>
          
          <h2 className="proc-head-line" style={{ 
            fontSize: 'clamp(32px, 5vw, 64px)', 
            fontWeight: 500, 
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '24px',
            color: '#0A0A0B',
            fontFamily: 'var(--font-grotesk)'
          }}>
            <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>Guesswork</span>, <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>Assumptions</span>.<br/>We map your exact data flow first.
          </h2>

          <p className="proc-head-line" style={{ fontSize: '17px', color: '#52525B', maxWidth: '680px', lineHeight: 1.65, fontWeight: 400 }}>
            This is what protects you from being sold automation when the real problem is process, or another tool when your stack is already bloated.
          </p>
        </div>

        {/* Timeline connector */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div
            className="timeline-line"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.08) 100%)',
              marginBottom: '20px',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#0A0A0B',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                {s.num}
              </div>
            ))}
          </div>
        </div>

        {/* Step Cards */}
        <div
          className="proc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className="proc-card"
              data-tilt
              style={{
                background: '#F4F4F5',
                border: '1px solid #E4E4E7',
                borderRadius: '14px',
                padding: '28px 22px',
                transformStyle: 'preserve-3d',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '12px' }}>
                  STEP {s.num}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0A0A0B', marginBottom: '10px', lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Protection Guarantee Strip */}
        <div
          style={{
            background: '#0A0A0B',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', marginBottom: '6px', letterSpacing: '0.06em' }}>
              WHAT OUR METHODOLOGY PROTECTS YOU FROM
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {protections.map((p, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.8)',
                    background: '#18181B',
                    border: '1px solid #27272A',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ✕ {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .proc-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .proc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
