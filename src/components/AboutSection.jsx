import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { label: 'Lead & Sales Systems',         sub: 'Automated booking, fast follow-ups & organized contacts' },
  { label: 'Internal Team Portals',        sub: 'Custom dashboards, project trackers & company databases' },
  { label: 'Workflow Automations',         sub: 'Eliminate hours of repetitive manual data entry' },
  { label: 'Dedicated Engineering Support', sub: 'Direct partnership to build, maintain & scale your tools' },
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
      className="sec-white pr"
      style={{ padding: '100px 40px', background: '#FFFFFF', color: '#0A0A0B' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="about-split">

        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '16px' }}>ABOUT AHMV SYSTEMS</p>
          <h2
            className="about-head"
            style={{
              fontSize: 'clamp(26px, 3.8vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
              color: '#0A0A0B',
              marginBottom: '20px',
              willChange: 'clip-path',
            }}
          >
            Technology should make work simpler, not add more headache.
          </h2>
          <p style={{ fontSize: '15px', color: '#52525B', marginBottom: '32px', lineHeight: 1.6 }}>
            We help growing businesses fix broken processes, eliminate manual busywork, and build clean software their teams actually enjoy using.
          </p>

          <div
            className="footprint-card"
            data-tilt
            style={{
              background: '#F4F4F5',
              border: '1px solid #E4E4E7',
              borderLeft: '3px solid #0A0A0B',
              borderRadius: '0 12px 12px 0',
              padding: '20px 24px',
              color: '#27272A',
              fontSize: '13px',
              lineHeight: 1.6,
              transformStyle: 'preserve-3d',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}
          >
            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', display: 'block', marginBottom: '6px', color: 'var(--mwg2-grey)', letterSpacing: '0.06em' }}>
              WHERE WE WORK
            </strong>
            Serving growing businesses across India, Oman, UAE, and international markets.
          </div>
        </div>

        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '20px' }}>CORE AREAS WE BUILD FOR</p>
          <div className="about-pillars" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pillars.map((p, i) => (
              <div
                key={i}
                className="about-pillar"
                data-tilt
                style={{
                  background: '#F4F4F5',
                  border: '1px solid #E4E4E7',
                  borderRadius: '10px',
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'default',
                  transformStyle: 'preserve-3d',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EAEAEB'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F4F4F5'; }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#0A0A0B', marginBottom: '3px' }}>{p.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--mwg2-grey)', fontFamily: 'var(--font-mono)' }}>{p.sub}</div>
                </div>
                <span style={{ color: '#71717A', fontSize: '16px' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 820px) { .about-split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}
