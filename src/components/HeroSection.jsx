import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeDTopographyCanvas from './ThreeDTopographyCanvas';

export default function HeroSection() {
  const eyebrowRef = useRef(null);
  const headRef   = useRef(null);
  const subRef    = useRef(null);
  const ctaRef    = useRef(null);
  const stripRef  = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 } });

    // Eyebrow
    gsap.set(eyebrowRef.current, { y: 16, opacity: 0 });
    tl.to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6 });

    // Headline — clip-path curtain wipe (NO word split DOM hack)
    gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
    tl.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1 }, '-=0.3');

    // Sub
    gsap.set(subRef.current, { y: 20, opacity: 0 });
    tl.to(subRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');

    // CTA
    gsap.set(ctaRef.current, { y: 16, opacity: 0, scale: 0.97 });
    tl.to(ctaRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, '-=0.4');

    // Strip
    gsap.set(stripRef.current, { y: 32, opacity: 0 });
    tl.to(stripRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3');

    // Continuous floating glow
    gsap.to('.hero-glow', {
      scale: 1.18, opacity: 0.65,
      duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
    });

  }, []);

  const stripItems = [
    { num: '01', label: 'Lead Flow' },
    { num: '02', label: 'Internal OS' },
    { num: '03', label: 'Automation' },
    { num: '04', label: 'Outcome' },
  ];

  return (
    <section
      id="hero"
      className="sec-white pr"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 40px 80px',
        overflow: 'hidden',
      }}
    >
      {/* Animated topography canvas */}
      <ThreeDTopographyCanvas />

      {/* Radial glow blob */}
      <div
        className="hero-glow"
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        <p
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--mwg2-grey)',
            marginBottom: '36px',
          }}
        >
          Operations Diagnostic & Engineering — India & GCC
        </p>

        <h2
          ref={headRef}
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 'clamp(40px, 6.5vw, 96px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: 'var(--mwg2-black)',
            maxWidth: '860px',
            marginBottom: '32px',
            willChange: 'clip-path',
          }}
        >
          We diagnose your business, then build the system that fixes it.
        </h2>

        <p
          ref={subRef}
          style={{
            fontSize: '15px',
            color: 'var(--mwg2-grey)',
            marginBottom: '48px',
            fontWeight: 400,
          }}
        >
          We start with a diagnostic, not a demo.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <a
            href="#diagnostic"
            className="cta-main cta-main3"
            style={{ height: '52px', padding: '0 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Start With a Free Diagnostic
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span style={{ fontSize: '13px', color: 'var(--mwg2-grey)', fontFamily: 'var(--font-mono)' }}>
            No pitch. No obligation.
          </span>
        </div>
      </div>

      {/* Architecture strip */}
      <div
        ref={stripRef}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1200px', margin: '64px auto 0',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {stripItems.map((item) => (
          <div
            key={item.num}
            data-tilt
            style={{
              background: '#FFF',
              padding: '20px 22px',
              cursor: 'default',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F4F4F5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFF'; }}
          >
            <span style={{ display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '5px' }}>
              {item.num}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--mwg2-black)' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
