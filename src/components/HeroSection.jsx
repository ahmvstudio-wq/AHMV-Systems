import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeDTopographyCanvas from './ThreeDTopographyCanvas';

export default function HeroSection() {
  const headRef   = useRef(null);
  const subRef    = useRef(null);
  const ctaRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 } });

    // Headline — clip-path curtain wipe (NO word split DOM hack)
    gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
    tl.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1 });

    // Sub
    gsap.set(subRef.current, { y: 20, opacity: 0 });
    tl.to(subRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');

    // CTA
    gsap.set(ctaRef.current, { y: 16, opacity: 0, scale: 0.97 });
    tl.to(ctaRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, '-=0.4');

    // Continuous floating glow
    gsap.to('.hero-glow', {
      scale: 1.18, opacity: 0.65,
      duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
    });

  }, []);

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
        padding: '120px 24px 80px',
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
          background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content Grid Container */}
      <div className="hero-grid-container">
        
        {/* Grid Body */}
        <div className="hero-grid-body">
          
          {/* Left Column: Heading and CTAs */}
          <div className="hero-grid-left">
            <h2
              ref={headRef}
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                color: 'var(--mwg2-black)',
                marginBottom: '24px',
                willChange: 'clip-path',
              }}
            >
              We diagnose your business, then build the system that fixes it.
            </h2>

            <p
              ref={subRef}
              style={{
                fontSize: '15px',
                lineHeight: '1.5',
                color: 'var(--mwg2-grey)',
                marginBottom: '36px',
                fontWeight: 400,
                maxWidth: '640px',
              }}
            >
              We start with a diagnostic, not a demo. Our engineering teams deploy modular growth stacks built specifically for enterprise operations.
            </p>

            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="#diagnostic"
                className="cta-main cta-main3"
                style={{ height: '48px', padding: '0 24px', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '8px' }}
              >
                Start Free Diagnostic
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--mwg2-black)', fontFamily: 'var(--font-mono)' }}>
                  NO PITCH.
                </span>
                <span style={{ fontSize: '11px', color: 'var(--mwg2-grey)', fontFamily: 'var(--font-mono)' }}>
                  NO OBLIGATION.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
