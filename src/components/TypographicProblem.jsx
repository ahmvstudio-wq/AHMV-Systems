import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TypographicProblem({ diagnosticData }) {
  const containerRef = useRef(null);
  
  const bottleneck = diagnosticData?.bottleneck || 'ops';

  let line1 = "Growth exposes the gaps";

  let line2 = "Your business is moving. The systems underneath it may not be keeping up.";

  let painPoints = [
    "Leads arrive, but follow-up depends on someone remembering to do it.",
    "People spend hours copying information between spreadsheets, inboxes and chat threads.",
    "Managers have to ask for updates because there is no single place to see what's happening.",
    "Your team works around the software instead of the software helping them work.",
    "You keep adding new tools, but the process still feels disjointed."
  ];

  if (bottleneck === 'leads') {
    painPoints = [
      "Leads arrive, but follow-up depends on someone remembering to do it.",
      "Your pipeline is dry and unpredictable.",
      "Cold outreach feels like a waste of time.",
      "Managers have to ask for updates because there is no single place to see what's happening.",
      "You keep adding new tools, but the process still feels disjointed."
    ];
  } else if (bottleneck === 'sales') {
    painPoints = [
      "Leads arrive, but follow-up depends on someone remembering to do it.",
      "Leads fall through the cracks between inboxes and chat threads.",
      "Follow-ups are manual, inconsistent, and slow.",
      "Your team works around the software instead of the software helping them work.",
      "You keep adding new tools, but the process still feels disjointed."
    ];
  } else if (bottleneck === 'retention') {
    painPoints = [
      "People spend hours copying information between spreadsheets, inboxes and chat threads.",
      "Client onboarding and support requests get lost in threads.",
      "Managers have to ask for updates because there is no single place to see what's happening.",
      "Your team works around the software instead of the software helping them work.",
      "You keep adding new tools, but the process still feels disjointed."
    ];
  }
  
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
  }, [bottleneck]);

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
          {line1}
        </p>
        
        <p className="typo-line" style={{ 
          fontSize: 'clamp(32px, 5vw, 64px)', 
          fontWeight: 500, 
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '64px',
          color: '#0A0A0B'
        }}>
          {line2}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '80px' }}>
          {painPoints.map((point, index) => (
            <p key={index} className="typo-line" style={{ fontSize: 'clamp(18px, 2.6vw, 28px)', fontWeight: 400, color: '#52525B', margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ color: '#A1A1AA', fontSize: '14px' }}>•</span>
              <span>{point}</span>
            </p>
          ))}
        </div>

        <p className="typo-line" style={{ 
          fontSize: 'clamp(24px, 3.5vw, 42px)', 
          fontWeight: 500, 
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: 0,
          color: '#0A0A0B'
        }}>
          Hiring more people fixes some of this.<br/>
          It <span style={{ fontStyle: 'italic' }}>doesn't fix</span> a <span style={{ padding: '0 8px', background: '#0A0A0B', color: '#FFFFFF', borderRadius: '6px' }}>broken system</span>.
        </p>
        
      </div>
    </section>
  );
}
