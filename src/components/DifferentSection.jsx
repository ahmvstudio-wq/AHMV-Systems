import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { agency: 'Strategy decks & vanity metrics', ahmv: 'Internal operating systems & revenue engines' },
  { agency: 'Adds more SaaS tools', ahmv: 'Removes bloat via custom localized systems' },
  { agency: 'Optimizes for campaigns', ahmv: 'Optimizes for leak-free, deterministic outcomes' },
  { agency: 'Competes on price', ahmv: 'Competes on structural impact & IP' },
];

const stats = [
  { label: 'SaaS tools replaced', value: 100, suffix: '%' },
  { label: 'Lead response speed', value: 60, suffix: 's' },
  { label: 'Avg. time to deploy', value: 14, suffix: 'd' },
  { label: 'Ops work eliminated', value: 80, suffix: '%' },
];

export default function DifferentSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline clip reveal
    const h2 = sectionRef.current.querySelector('.diff-head');
    if (h2) {
      gsap.set(h2, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: h2, start: 'top 84%',
        onEnter: () => gsap.to(h2, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }

    // Table rows — alternate slide from left/right
    const tRows = sectionRef.current.querySelectorAll('.diff-row');
    tRows.forEach((row, i) => gsap.set(row, { x: i % 2 === 0 ? -50 : 50, opacity: 0 }));
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('table'), start: 'top 80%',
      onEnter: () => gsap.to(tRows, { x: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'expo.out' }),
      once: true,
    });

    // Stat cards — 3D rotateY flip
    const statCards = sectionRef.current.querySelectorAll('.stat-card');
    gsap.set(statCards, { rotateY: -70, opacity: 0, transformPerspective: 700 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.stat-grid'), start: 'top 80%',
      onEnter: () => gsap.to(statCards, { rotateY: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.6)' }),
      once: true,
    });

  }, []);

  return (
    <section
      id="different"
      ref={sectionRef}
      className="wrapper sec-white pr"
      style={{ padding: '100px 40px' }}
    >
      <p className="label" style={{ marginBottom: '16px', color: 'var(--mwg2-grey)' }}>WHY AHMV SYSTEMS</p>

      <h2
        className="diff-head"
        style={{
          fontFamily: 'var(--font-grotesk)',
          fontSize: 'clamp(28px, 4.5vw, 68px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 1.06,
          color: 'var(--mwg2-black)',
          marginBottom: '16px',
          maxWidth: '820px',
          willChange: 'clip-path',
        }}
      >
        The difference is not the AI. It is the level we work at.
      </h2>

      <p style={{ fontSize: '15px', color: 'var(--mwg2-grey)', maxWidth: '560px', marginBottom: '64px' }}>
        We operate at the layer below campaigns — where systems move leads, work, data, and decisions.
      </p>

      {/* 50/50 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="diff-split">

        {/* Table */}
        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '16px', letterSpacing: '0.06em' }}>
            TYPICAL AGENCY VS AHMV
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--mwg2-black)' }}>
                <th style={{ padding: '10px 6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', textAlign: 'left', width: '50%' }}>TYPICAL</th>
                <th style={{ padding: '10px 6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-black)', textAlign: 'left', width: '50%' }}>AHMV</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="diff-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <td style={{ padding: '14px 6px', fontSize: '14px', color: 'var(--mwg2-grey)' }}>{r.agency}</td>
                  <td style={{ padding: '14px 6px', fontSize: '14px', color: 'var(--mwg2-black)', fontWeight: 500 }}>{r.ahmv}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Displacement tag cloud */}
          <div style={{ marginTop: '28px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '12px' }}>SOFTWARE WE REPLACE</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Salesforce', 'HubSpot', 'Asana', 'Monday', 'Sheets'].map((t, i) => (
                <span key={i} style={{
                  fontSize: '12px', padding: '5px 12px',
                  border: '1px solid rgba(0,0,0,0.12)', borderRadius: '4px',
                  color: 'var(--mwg2-grey)', fontFamily: 'var(--font-mono)',
                  textDecoration: 'line-through', opacity: 0.55,
                }}>{t}</span>
              ))}
              <span style={{
                fontSize: '12px', padding: '5px 12px', borderRadius: '4px',
                background: 'var(--mwg2-black)', color: '#FFF',
                fontFamily: 'var(--font-mono)', fontWeight: 600,
              }}>ONE OS</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '16px', letterSpacing: '0.06em' }}>
            REAL SYSTEM OUTCOMES
          </p>
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-card"
                data-tilt
                style={{
                  background: 'var(--mwg2-black)', color: '#FFF',
                  padding: '28px 20px', borderRadius: '12px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  data-count={s.value}
                  data-suffix={s.suffix}
                  style={{ fontSize: '40px', fontWeight: 600, fontFamily: 'var(--font-mono)', lineHeight: 1 }}
                >
                  {s.value}{s.suffix}
                </div>
                <div style={{ fontSize: '11px', color: '#A1A1AA', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) { .diff-split { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
