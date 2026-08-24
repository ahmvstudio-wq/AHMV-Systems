import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeDTopographyCanvas from './ThreeDTopographyCanvas';
import HeroDiagnosticHUD from './HeroDiagnosticHUD';

export default function HeroSection({ onOpenAudit, diagnosticData }) {
  const headRef   = useRef(null);
  const subRef    = useRef(null);
  const ctaRef    = useRef(null);

  const bottleneck = diagnosticData?.bottleneck || 'ops';
  let headlineStart = "Businesses don't scale.";
  
  if (bottleneck === 'leads') {
    headlineStart = "Referrals don't scale.";
  } else if (bottleneck === 'sales') {
    headlineStart = "Conversations don't scale.";
  } else if (bottleneck === 'retention') {
    headlineStart = "Hustle doesn't scale.";
  }

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

    // Fade in scroll indicator
    gsap.fromTo('.hero-scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 1.2 }
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
          maxWidth: '1440px', 
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
        <div className="mobile-hero-text-col" style={{ flex: '1 1 540px', textAlign: 'left' }}>
          <p className="mobile-hero-eyebrow" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '14px' }}>
            AHMV Systems · Operations engineering
          </p>

          <h2
            ref={headRef}
            className="mobile-hero-headline"
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: '24px',
              willChange: 'clip-path',
            }}
          >
            <span style={{ display: 'block', color: '#18181B', whiteSpace: 'nowrap' }}>{headlineStart}</span>
            <span style={{ display: 'block', color: '#71717A', whiteSpace: 'nowrap' }}>Systems do.</span>
          </h2>



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
              style={{ height: '46px', padding: '0 24px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px' }}
            >
              Book a Free Operations Review
            </a>

            {onOpenAudit && (
              <button
                onClick={onOpenAudit}
                style={{
                  height: '46px',
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
              style={{ height: '46px', padding: '0 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px', border: '1px solid #E4E4E7' }}
            >
              See what we build
            </a>
          </div>


        </div>

        {/* Right Column: Generative Diagnostics Scope HUD */}
        <div 
          className="hero-hud-fade"
          style={{ 
            flex: '0 1 320px', 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <HeroDiagnosticHUD />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: 0,
        zIndex: 10
      }}>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.1em' }}>EXPLORE</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #D4D4D8, transparent)' }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-fullscreen {
            padding: 0 !important;
          }
          .hero-content {
            gap: 0 !important;
            padding: 0 16px !important;
            justify-content: center !important;
          }
          .mobile-hero-text-col {
            flex: 1 1 100% !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .mobile-hero-headline {
            font-size: 8.2vw !important;
            line-height: 1.1 !important;
            margin-bottom: 0 !important;
            text-align: center !important;
          }
          .mobile-hero-eyebrow {
            display: inline-block !important;
            padding: 6px 14px;
            border-radius: 100px;
            border: 1px solid rgba(0,0,0,0.08);
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(8px);
            margin-bottom: 32px !important;
          }
          .hero-content-cta {
            display: none !important;
          }
          .hero-hud-fade {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
