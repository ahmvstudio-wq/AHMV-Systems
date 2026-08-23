import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { num: '01', title: 'Hands-on Engineering', desc: 'Every line of code and automation is built directly, never outsourced.' },
  { num: '02', title: 'No Artificial Bloat', desc: 'We only build what directly moves the bottleneck - nothing superfluous.' },
  { num: '03', title: 'Full IP & Data Ownership', desc: 'All code, databases, and assets remain 100% private to your company.' },
  { num: '04', title: 'Long-term Support', desc: 'We train your team and stay available post-deployment to support your runtime.' },
];

export default function FounderSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (sectionRef.current) {
      const lines = sectionRef.current.querySelectorAll('.founder-head-line');
      if (lines.length > 0) {
        gsap.set(lines, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: lines[0],
          start: 'top 84%',
          onEnter: () => gsap.to(lines, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }),
          once: true,
        });
      }
    }
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: '#FFFFFF',
        color: '#0A0A0B',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }} className="founder-split">
        <div>
        <div className="founder-head-container" style={{ maxWidth: '900px' }}>
          <p className="founder-head-line" style={{ 
            fontSize: 'clamp(24px, 3.5vw, 42px)', 
            fontWeight: 400, 
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '16px',
            color: '#A1A1AA'
          }}>
            You don't need another generic agency.
          </p>
          
          <h2 className="founder-head-line" style={{ 
            fontSize: 'clamp(32px, 5vw, 64px)', 
            fontWeight: 500, 
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '24px',
            color: '#0A0A0B',
            fontFamily: 'var(--font-grotesk)'
          }}>
            You need a partner who understands <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>marketing</span>, <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>sales</span>, and pure operations.
          </h2>

          <p className="founder-head-line" style={{ fontSize: '17px', color: '#52525B', lineHeight: 1.65, maxWidth: '580px', marginBottom: '32px', fontWeight: 400 }}>
            One rule: diagnose first, then decide whether you need AI, automation, or just a better process. Every system AHMV ships is built hands-on, not delegated to a subcontractor.
          </p>
        </div>


        </div>

        {/* Right side: 4 Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {principles.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#F4F4F5',
                border: '1px solid #E4E4E7',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
              }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--mwg2-grey)' }}>
                {p.num}
              </span>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0B', marginBottom: '4px' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .founder-split { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}
