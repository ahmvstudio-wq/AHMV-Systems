import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LearnSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef(null);
  const movesRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline curtain reveal
    if (headRef.current) {
      gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: headRef.current,
        start: 'top 84%',
        onEnter: () => gsap.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }

    // Production proof cards staggered entrance
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.proof-card');
      gsap.set(cards, { y: 50, opacity: 0, rotateX: 12, transformPerspective: 800 });
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => gsap.to(cards, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'power4.out' }),
        once: true,
      });
    }

    // Moves step cards
    if (movesRef.current) {
      const moves = movesRef.current.querySelectorAll('.move-card');
      gsap.set(moves, { y: 35, opacity: 0 });
      ScrollTrigger.create({
        trigger: movesRef.current,
        start: 'top 82%',
        onEnter: () => gsap.to(moves, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'expo.out' }),
        once: true,
      });
    }
  }, []);

  return (
    <section id="positioning" className="wrapper sec-black pr" ref={sectionRef} style={{ padding: '100px 40px', background: 'var(--mwg2-black)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section 1: Positioning */}
        <div style={{ marginBottom: '80px', borderBottom: '1px solid #27272A', paddingBottom: '60px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            THE AHMV DIFFERENCE
          </p>
          <h2 ref={headRef} style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#FFF', marginBottom: '24px', willChange: 'clip-path' }}>
            Is this just another AI agency? <br />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>AI is the interface. The real work is your internal system.</span>
          </h2>

          <p style={{ maxWidth: '820px', color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
            No. Generic AI agencies sell chatbots, Zapier templates, and basic ad management. AHMV builds custom operating infrastructure. We connect your sales leads, operational workflows, customer records, and internal tools into one clean, automated software engine.
          </p>
          <p style={{ maxWidth: '820px', color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
            Instead of selling strategy decks and surface-level vanity metrics, we engineer reliable systems that eliminate manual human labor, cut monthly software licensing costs, and generate measurable revenue.
          </p>

          <a href="#different" className="cta-main cta-main2" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 24px' }}>
            <span>See how we compare to typical agencies</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Section 2: Production Proof */}
        <div style={{ marginBottom: '80px', borderBottom: '1px solid #27272A', paddingBottom: '60px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            PRODUCTION PROOF
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            What We Have Engineered & Deployed
          </h2>

          <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }} className="proof-grid-responsive">
            <div className="proof-card" data-tilt style={{ background: '#18181B', padding: '28px', borderRadius: '16px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>01. ACQUISITION</span>
              <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '12px 0 8px', color: '#FFF' }}>Autonomous Client Acquisition OS</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '16px' }}>
                Combines inbound ad leads (Meta/Google) with an AI WhatsApp qualification agent that screens buyers and books meetings 24/7 in under 60 seconds.
              </p>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', borderTop: '1px solid #27272A', paddingTop: '12px' }}>
                Outcome: 3.4x faster lead booking with zero manual chasing.
              </div>
            </div>

            <div className="proof-card" data-tilt style={{ background: '#18181B', padding: '28px', borderRadius: '16px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>02. INTERNAL OS</span>
              <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '12px 0 8px', color: '#FFF' }}>Localized Internal CRM & OS</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '16px' }}>
                A custom internal operating system that replaces fragmented tools (Salesforce, HubSpot, Asana) into one unified database owned completely by the company.
              </p>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', borderTop: '1px solid #27272A', paddingTop: '12px' }}>
                Outcome: Zero monthly SaaS licensing fees & 100% data clarity.
              </div>
            </div>

            <div className="proof-card" data-tilt style={{ background: '#18181B', padding: '28px', borderRadius: '16px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>03. INTELLIGENCE</span>
              <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '12px 0 8px', color: '#FFF' }}>Predictive Content & Intent Engine</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '16px' }}>
                Runs social media publishing on autopilot while active document trackers alert sales reps the moment a prospect opens a proposal.
              </p>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', borderTop: '1px solid #27272A', paddingTop: '12px' }}>
                Outcome: 45% faster deal closing with instant 1-click follow-ups.
              </div>
            </div>
          </div>

          <a href="#services" className="cta-main cta-main2" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '46px', padding: '0 22px' }}>
            <span>Explore all five core systems</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Section 3: Methodology */}
        <div>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            METHODOLOGY
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            How We Work: The Four Steps
          </h2>

          <div ref={movesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="moves-grid-responsive">
            <div className="move-card" data-tilt style={{ background: '#18181B', padding: '24px', borderRadius: '14px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>01</span>
              <h4 style={{ fontSize: '16px', fontWeight: 500, margin: '8px 0 6px', color: '#FFF' }}>Diagnose</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                Map how leads move, where manual work is wasted, and why software fails.
              </p>
            </div>

            <div className="move-card" data-tilt style={{ background: '#18181B', padding: '24px', borderRadius: '14px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>02</span>
              <h4 style={{ fontSize: '16px', fontWeight: 500, margin: '8px 0 6px', color: '#FFF' }}>Decide Fit</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                Provide an honest assessment of whether you need AI, custom tools, or process fixes.
              </p>
            </div>

            <div className="move-card" data-tilt style={{ background: '#18181B', padding: '24px', borderRadius: '14px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>03</span>
              <h4 style={{ fontSize: '16px', fontWeight: 500, margin: '8px 0 6px', color: '#FFF' }}>Design System</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                Architect clean software tailored to your specific business data and pipeline needs.
              </p>
            </div>

            <div className="move-card" data-tilt style={{ background: '#18181B', padding: '24px', borderRadius: '14px', border: '1px solid #27272A', transformStyle: 'preserve-3d' }}>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>04</span>
              <h4 style={{ fontSize: '16px', fontWeight: 500, margin: '8px 0 6px', color: '#FFF' }}>Build & Support</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                Build in production code, train your staff, and remain accountable post-launch.
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .proof-grid-responsive { grid-template-columns: 1fr !important; }
          .moves-grid-responsive { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 550px) {
          .moves-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
