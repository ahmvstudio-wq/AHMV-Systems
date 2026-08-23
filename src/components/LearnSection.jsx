import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LearnSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (headRef.current) {
      gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: headRef.current,
        start: 'top 84%',
        onEnter: () => gsap.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }
  }, []);

  return (
    <section id="positioning" className="wrapper sec-black pr" ref={sectionRef} style={{ padding: '80px 40px', background: 'var(--mwg2-black)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Positioning */}
        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            WHAT WE DO
          </p>
          <h2 ref={headRef} style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#FFF', marginBottom: '24px', willChange: 'clip-path' }}>
            Most agencies sell generic templates. <br />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>We build software made for your exact workflow.</span>
          </h2>

          <p style={{ maxWidth: '820px', color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '16px' }}>
            As your business grows, off-the-shelf software stops fitting. Leads get dropped, follow-ups are delayed, and your team wastes hours on manual spreadsheet updates and disconnected tools.
          </p>
          <p style={{ maxWidth: '820px', color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
            We design, build, and deploy custom tools and automated pipelines that cut monthly software bills, speed up sales, and let your team focus on high-value work.
          </p>

          <a href="#different" className="cta-main cta-main2" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 24px' }}>
            <span>See how we compare</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
