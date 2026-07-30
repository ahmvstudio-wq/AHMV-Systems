import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { label: 'Client acquisition systems',  sub: 'Omnichannel pipelines & conversational OS' },
  { label: 'Internal operating systems',  sub: 'Localized CRMs, internal tools & back-office OS' },
  { label: 'Predictive intelligence',     sub: 'Behavior-driven tracking & automated follow-ups' },
  { label: 'Strategic partnerships',      sub: 'White-label infrastructure for partner agencies' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline clip
    const h2 = sectionRef.current.querySelector('.about-head');
    if (h2) {
      gsap.set(h2, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: h2, start: 'top 84%',
        onEnter: () => gsap.to(h2, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }

    // Pillar rows
    const rows = sectionRef.current.querySelectorAll('.about-pillar');
    gsap.set(rows, { x: -40, opacity: 0 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.about-pillars'), start: 'top 80%',
      onEnter: () => gsap.to(rows, { x: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'expo.out' }),
      once: true,
    });

    // Footprint card
    const ftprint = sectionRef.current.querySelector('.footprint-card');
    if (ftprint) {
      gsap.set(ftprint, { scale: 0.93, opacity: 0, rotateX: 8, transformPerspective: 700 });
      ScrollTrigger.create({
        trigger: ftprint, start: 'top 85%',
        onEnter: () => gsap.to(ftprint, { scale: 1, opacity: 1, rotateX: 0, duration: 0.75, ease: 'back.out(1.5)' }),
        once: true,
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="sec-black pr"
      style={{ padding: '100px 40px', background: 'var(--mwg2-black)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="about-split">

        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>ABOUT AHMV SYSTEMS</p>
          <h2
            className="about-head"
            style={{
              fontSize: 'clamp(26px, 3.8vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
              marginBottom: '20px',
              willChange: 'clip-path',
            }}
          >
            Understand the business before recommending anything.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', marginBottom: '32px', lineHeight: 1.6 }}>
            One rule: diagnose first, then decide whether you need AI, automation, or just a better process.
          </p>

          <div
            className="footprint-card"
            data-tilt
            style={{
              background: '#18181B',
              borderLeft: '3px solid rgba(255,255,255,0.6)',
              borderRadius: '0 12px 12px 0',
              padding: '20px 24px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '13px',
              lineHeight: 1.6,
              transformStyle: 'preserve-3d',
            }}
          >
            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', display: 'block', marginBottom: '6px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
              OPERATING FOOTPRINT
            </strong>
            India operations underwrite a pivot to Oman, Dubai, and US corporate markets.
          </div>
        </div>

        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' }}>WE OPERATE AT THE INTERSECTION OF</p>
          <div className="about-pillars" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {pillars.map((p, i) => (
              <div
                key={i}
                className="about-pillar"
                data-tilt
                style={{
                  background: '#18181B',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px',
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'default',
                  transformStyle: 'preserve-3d',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1F1F23'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#18181B'; }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFF', marginBottom: '3px' }}>{p.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>{p.sub}</div>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '16px' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 820px) { .about-split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}
