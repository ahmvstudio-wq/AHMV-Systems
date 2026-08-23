import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef(null);

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

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.pricing-card');
      gsap.set(cards, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => gsap.to(cards, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' }),
        once: true,
      });
    }
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: '#FFFFFF',
        color: '#0A0A0B',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
          PRICING MODEL
        </p>

        <h2
          ref={headRef}
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 'clamp(30px, 4.2vw, 54px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--mwg2-black)',
            marginBottom: '20px',
            maxWidth: '780px',
            willChange: 'clip-path',
          }}
        >
          Setup plus retainer. Scoped, not templated.
        </h2>

        <p style={{ fontSize: '15px', color: 'var(--mwg2-grey)', maxWidth: '580px', marginBottom: '48px', lineHeight: 1.65, fontWeight: 400 }}>
          Transparent, deterministic pricing. You receive an exact scope and fixed investment quote immediately after your free review.
        </p>

        {/* 3 Pricing Pillars */}
        <div
          ref={cardsRef}
          className="pricing-cards-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* Setup Card */}
          <div
            className="pricing-card"
            data-tilt
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '16px',
              padding: '36px 28px',
              transformStyle: 'preserve-3d',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                01 / ONE-TIME BUILD
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0A0A0B', marginBottom: '12px' }}>
                Setup
              </h3>
              <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.6, marginBottom: '24px' }}>
                A one-time engineering fee scoped to the system being built - recent setups have ranged AED 2,000–7,500 (or regional equivalent).
              </p>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', borderTop: '1px solid #F4F4F5', paddingTop: '16px' }}>
              Includes: Architecture, code build, data migration & staff training
            </div>
          </div>

          {/* Retainer Card */}
          <div
            className="pricing-card"
            data-tilt
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '16px',
              padding: '36px 28px',
              transformStyle: 'preserve-3d',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                02 / ONGOING RUNTIME
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0A0A0B', marginBottom: '12px' }}>
                Retainer
              </h3>
              <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.6, marginBottom: '24px' }}>
                An ongoing fee for support, iteration, and keeping the system running smoothly - confirmed once scope is set.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', borderTop: '1px solid #F4F4F5', paddingTop: '16px' }}>
              Includes: Server uptime, webhook monitoring, speed tuning & updates
            </div>
          </div>

          {/* Transparency Card */}
          <div
            className="pricing-card"
            data-tilt
            style={{
              background: '#0A0A0B',
              color: '#FFFFFF',
              border: '1px solid #0A0A0B',
              borderRadius: '16px',
              padding: '36px 28px',
              transformStyle: 'preserve-3d',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                03 / GUARANTEE
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
                No surprise invoices
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
                You get a clear number after the review, not a generic rate card. If we can't help, we'll tell you plainly.
              </p>
            </div>

            <a
              href="#contact"
              className="cta-main cta-main1"
              style={{
                height: '46px',
                padding: '0 20px',
                fontSize: '12px',
                background: '#FFFFFF',
                color: '#0A0A0B',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Get an exact number →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .pricing-cards-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
