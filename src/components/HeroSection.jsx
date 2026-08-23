import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeDTopographyCanvas from './ThreeDTopographyCanvas';
import HeroDiagnosticHUD from './HeroDiagnosticHUD';

export default function HeroSection({ onOpenAudit }) {
  const headRef   = useRef(null);
  const subRef    = useRef(null);
  const ctaRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 } });

    // Headline - clip-path curtain wipe (NO word split DOM hack)
    gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
    tl.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1 });

    // Sub
    gsap.set(subRef.current, { y: 20, opacity: 0 });
    tl.to(subRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');

    // CTA
    gsap.set(ctaRef.current, { y: 16, opacity: 0, scale: 0.97 });
    tl.to(ctaRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, '-=0.4');

    // Fade in the Diagnostic HUD slowly
    gsap.fromTo('.hero-hud-fade', 
      { opacity: 0, x: 24 }, 
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', delay: 0.8 }
    );

  }, []);

  return (
    <section
      id="hero"
      className="hero-fullscreen"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0 60px',
        overflow: 'hidden',
        background: '#FFFFFF',
        color: '#0A0A0B',
      }}
    >
      {/* 3D Topography Canvas Background */}
      <ThreeDTopographyCanvas />

      {/* Grid Content Container */}
      <div 
        className="hero-content"
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%', 
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '64px',
          flexWrap: 'wrap',
        }}
      >
        {/* Left Column: Heading and CTAs */}
        <div style={{ flex: '1 1 600px', textAlign: 'left' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '14px' }}>
            AHMV Systems · Operations engineering
          </p>

          <h2
            ref={headRef}
            className="hero-headline-gradient"
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 'clamp(30px, 4.2vw, 54px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '20px',
              willChange: 'clip-path',
            }}
          >
            Businesses don't scale. <br />
            <span>Systems do.</span>
          </h2>

          <p
            ref={subRef}
            style={{
              fontSize: '15px',
              lineHeight: '1.65',
              color: 'var(--mwg2-grey)',
              marginBottom: '36px',
              fontWeight: 400,
              maxWidth: '580px',
            }}
          >
            We diagnose your business first, then build the sales, customer, finance, and AI workforce systems that fix what's actually broken - no pitch, no chatbot bolted onto a broken process.
          </p>

          <div
            ref={ctaRef}
            className="hero-content-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'inherit',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}
          >
            <a
              href="#contact"
              className="cta-main cta-main3"
              style={{ height: '50px', padding: '0 26px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px' }}
            >
              Book a Free Operations Review
            </a>

            {onOpenAudit && (
              <button
                onClick={onOpenAudit}
                style={{
                  height: '50px',
                  padding: '0 20px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  border: '1px solid #0A0A0B',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  color: '#0A0A0B',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                Take 60s Audit
              </button>
            )}

            <a
              href="#systems"
              className="cta-main cta-main2"
              style={{ height: '50px', padding: '0 20px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px', border: '1px solid #E4E4E7' }}
            >
              See what we build
            </a>
          </div>

          {/* Quick Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Sales & Revenue', 'Customer Ops', 'Finance', 'AI Workforce', 'Custom Builds'].map((pill, i) => (
              <a
                key={i}
                href="#systems"
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#F4F4F5',
                  border: '1px solid #E4E4E7',
                  color: '#27272A',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0B'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5'; e.currentTarget.style.color = '#27272A'; }}
              >
                {pill}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Generative Diagnostics Scope HUD */}
        <div 
          className="hero-hud-fade"
          style={{ 
            flex: '0 1 360px', 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <HeroDiagnosticHUD />
        </div>
      </div>
    </section>
  );
}
