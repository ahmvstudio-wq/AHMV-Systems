import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chips = [
  { icon: '⚡', label: 'Acquisition pipelines' },
  { icon: '🗄️', label: 'Localized CRMs & OS' },
  { icon: '📡', label: 'Predictive engines' },
  { icon: '⚙️', label: 'Back-office automation' },
];

export default function FounderSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline clip
    const h2 = sectionRef.current.querySelector('.founder-head');
    if (h2) {
      gsap.set(h2, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: h2, start: 'top 84%',
        onEnter: () => gsap.to(h2, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }

    // Chips — 3D rotateY flip
    const chipEls = sectionRef.current.querySelectorAll('.proof-chip');
    gsap.set(chipEls, { rotateY: -60, opacity: 0, scale: 0.88, transformPerspective: 700 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.chips-grid'), start: 'top 80%',
      onEnter: () => gsap.to(chipEls, { rotateY: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: 'back.out(1.6)' }),
      once: true,
    });

    // Bio
    const bio = sectionRef.current.querySelector('.founder-bio');
    if (bio) {
      gsap.set(bio, { y: 24, opacity: 0 });
      ScrollTrigger.create({
        trigger: bio, start: 'top 86%',
        onEnter: () => gsap.to(bio, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }),
        once: true,
      });
    }

  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="sec-white pr"
      style={{ padding: '100px 40px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="founder-split">

        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '16px' }}>FOUNDER STATEMENT</p>
          <h2
            className="founder-head"
            style={{
              fontSize: 'clamp(26px, 3.8vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
              color: 'var(--mwg2-black)',
              marginBottom: '20px',
              willChange: 'clip-path',
            }}
          >
            Every system on this site was built hands-on. Not delegated.
          </h2>

          <p
            className="founder-bio"
            style={{ fontSize: '15px', color: 'var(--mwg2-grey)', marginBottom: '32px', lineHeight: 1.6 }}
          >
            Built and run by Ahmed — starting point is always the same: where is this business actually losing time and money?
          </p>

          <a href="#process" className="cta-main cta-main3" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 24px' }}>
            See the Diagnostic Process
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '20px' }}>BUILT BY HAND</p>
          <div className="chips-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            {chips.map((c, i) => (
              <div
                key={i}
                className="proof-chip"
                data-tilt
                style={{
                  background: 'var(--mwg2-light-grey)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '12px',
                  padding: '22px 18px',
                  transformStyle: 'preserve-3d',
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{c.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--mwg2-black)', lineHeight: 1.4 }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Founder card */}
          <div
            data-tilt
            style={{
              background: 'var(--mwg2-black)',
              borderRadius: '12px',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 600, color: '#FFF', flexShrink: 0 }}>
              A
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#FFF' }}>Ahmed</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>Founder, AHMV Systems</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`@media (max-width: 820px) { .founder-split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}
