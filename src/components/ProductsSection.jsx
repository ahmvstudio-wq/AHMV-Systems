import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { serviceCategories } from '../data/serviceCategories';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection({ onOpenAudit }) {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text animation for title
    const titleLines = titleRef.current.querySelectorAll('.line-inner');
    gsap.set(titleLines, { y: '100%', rotateZ: 2 });
    
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(titleLines, {
          y: '0%',
          rotateZ: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        });
      },
      once: true,
    });

    gsap.set(descRef.current, { opacity: 0, x: -20 });
    ScrollTrigger.create({
      trigger: descRef.current,
      start: 'top 85%',
      onEnter: () => gsap.to(descRef.current, { opacity: 1, x: 0, duration: 1, delay: 0.3 }),
      once: true,
    });

    // Pinning the left column while the right column scrolls
    if (window.innerWidth > 900) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftColRef.current,
        pinSpacing: false,
      });
    }

    // Advanced staggered reveal for cards
    const cards = rightColRef.current.querySelectorAll('.svc-module-card');
    cards.forEach((card, idx) => {
      gsap.set(card, { 
        opacity: 0, 
        y: 100, 
        scale: 0.9, 
        rotateX: -10,
        transformOrigin: "center top"
      });
      
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.4,
            ease: 'expo.out'
          });
        },
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="products"
      ref={containerRef}
      style={{
        position: 'relative',
        background: '#0A0A0B',
        color: '#FFFFFF',
        paddingTop: '120px',
        paddingBottom: '120px'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div 
          className="services-layout" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '80px',
            position: 'relative',
            alignItems: 'start'
          }}
        >
          {/* LEFT COLUMN: Sticky Narrative */}
          <div ref={leftColRef} style={{ paddingBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 600 }}>
                OPERATING SYSTEMS
              </span>
            </div>

            <h2 ref={titleRef} style={{ fontSize: 'clamp(48px, 6vw, 84px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '40px' }}>
              <div style={{ overflow: 'hidden' }}><div className="line-inner">We replace</div></div>
              <div style={{ overflow: 'hidden' }}><div className="line-inner">fragmented tools</div></div>
              <div style={{ overflow: 'hidden' }}><div className="line-inner">with a single</div></div>
              <div style={{ overflow: 'hidden' }}><div className="line-inner" style={{ color: '#52525B' }}>command center.</div></div>
            </h2>

            <div ref={descRef} style={{ maxWidth: '480px' }}>
              <p style={{ fontSize: '20px', color: '#A1A1AA', lineHeight: 1.6, marginBottom: '24px' }}>
                Instead of selling isolated software subscriptions, we engineer complete, custom-built operational systems for your business.
              </p>
              <p style={{ fontSize: '16px', color: '#52525B', lineHeight: 1.6, marginBottom: '48px' }}>
                Every system is deployed securely on your private cloud, integrating your existing workflows into a unified, high-performance architecture. You own the code. You own the data.
              </p>
              
              <button
                onClick={(e) => { e.preventDefault(); if (onOpenAudit) onOpenAudit(); }}
                style={{
                  height: '64px',
                  padding: '0 40px',
                  background: '#FFFFFF',
                  color: '#0A0A0B',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.background = '#F4F4F5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#FFFFFF'; }}
              >
                Run Diagnostic Audit
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: The Modules */}
          <div ref={rightColRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {serviceCategories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/services/${cat.id}`}
                className="svc-module-card"
                style={{
                  display: 'block',
                  position: 'relative',
                  padding: '48px',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'background 0.4s ease, border-color 0.4s ease'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; 
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; 
                  const arrow = e.currentTarget.querySelector('.arrow-icon');
                  if(arrow) arrow.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; 
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; 
                  const arrow = e.currentTarget.querySelector('.arrow-icon');
                  if(arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                {/* Background image tint */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.05,
                  mixBlendMode: 'luminosity',
                  pointerEvents: 'none',
                  zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontFamily: 'var(--font-mono)', 
                      background: '#FFFFFF', 
                      color: '#0A0A0B', 
                      padding: '6px 12px', 
                      borderRadius: '4px', 
                      fontWeight: 700 
                    }}>
                      SYSTEM 0{idx + 1}
                    </div>
                    <div className="arrow-icon" style={{ transition: 'transform 0.3s ease' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                    {cat.name}
                  </h3>
                  
                  <p style={{ fontSize: '15px', color: '#A1A1AA', lineHeight: 1.6, maxWidth: '400px' }}>
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
