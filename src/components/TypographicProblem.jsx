import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TypographicProblem() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const lines = containerRef.current.querySelectorAll('.typo-line');
    
    gsap.set(lines, { opacity: 0, y: 40 });
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: 'power3.out'
        });
      },
      once: true
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ 
        padding: '160px 0', 
        background: '#FFFFFF', 
        color: '#0A0A0B',
        position: 'relative',
        zIndex: 2,
        borderBottom: '1px solid #E4E4E7'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        <p className="typo-line" style={{ 
          fontSize: 'clamp(28px, 4vw, 48px)', 
          fontWeight: 400, 
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '24px',
          color: '#A1A1AA'
        }}>
          You are running a 7-figure business.
        </p>
        
        <p className="typo-line" style={{ 
          fontSize: 'clamp(32px, 5vw, 64px)', 
          fontWeight: 500, 
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '64px',
          color: '#0A0A0B'
        }}>
          But underneath, it's held together by <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>Google Sheets</span>, <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>WhatsApp</span>, and memory.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '80px' }}>
          <p className="typo-line" style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 400, color: '#52525B', margin: 0, letterSpacing: '-0.02em' }}>
            Leads are lost due to manual follow-up.
          </p>
          <p className="typo-line" style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 400, color: '#52525B', margin: 0, letterSpacing: '-0.02em' }}>
            Fulfillment is chaotic.
          </p>
          <p className="typo-line" style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 400, color: '#52525B', margin: 0, letterSpacing: '-0.02em' }}>
            Your team is stuck doing data entry.
          </p>
        </div>

        <p className="typo-line" style={{ 
          fontSize: 'clamp(24px, 3.5vw, 42px)', 
          fontWeight: 500, 
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: 0,
          color: '#0A0A0B'
        }}>
          This is <span style={{ fontStyle: 'italic' }}>not</span> a hiring problem.<br/>
          It is an <span style={{ padding: '0 8px', background: '#0A0A0B', color: '#FFFFFF', borderRadius: '6px' }}>engineering problem</span>.
        </p>
        
      </div>
    </section>
  );
}
