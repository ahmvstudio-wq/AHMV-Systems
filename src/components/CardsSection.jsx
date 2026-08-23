import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fiveComponents = [
  {
    num: '01',
    title: 'The Real Alternative',
    text: 'Stop choosing between slow, expensive custom software agencies or rigid SaaS subscriptions that force your team into clunky workflows.'
  },
  {
    num: '02',
    title: 'Pre-Engineered Architecture',
    text: 'Pre-built modular software for lead acquisition, custom CRM databases, content engines, and internal tools. We never start from zero.'
  },
  {
    num: '03',
    title: 'Speed & Custom Fit',
    text: 'Get the speed of off-the-shelf software paired with the exact fit of custom development - built and deployed in 14 days.'
  },
  {
    num: '04',
    title: 'Designed For Growing Businesses',
    text: 'Built for founders and operators who have outgrown generic spreadsheets and basic SaaS apps, but don’t want a $100k agency invoice.'
  },
  {
    num: '05',
    title: 'Systems & Operations Partner',
    text: 'Not a traditional agency. Not a SaaS vendor. An engineering operations partner dedicated to building clean, automated software for your business.'
  }
];

export default function CardsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.card-circle');

    gsap.set(cards, { y: 60, opacity: 0, rotateX: 18, scale: 0.94, transformPerspective: 900 });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 78%',
      onEnter: () => gsap.to(cards, {
        y: 0, opacity: 1, rotateX: 0, scale: 1,
        duration: 0.85, stagger: 0.12, ease: 'power4.out',
      }),
      once: true,
    });
  }, []);

  return (
    <section className="h-cards wrapper sec-white" ref={sectionRef} style={{ padding: '80px 40px', background: '#FAF9F6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', color: 'var(--mwg2-grey)', marginBottom: '16px', textTransform: 'uppercase' }}>
          STRATEGIC ADVANTAGE
        </p>
        <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#0A0A0B', marginBottom: '40px' }}>
          Why Businesses Switch To AHMV Systems
        </h2>

        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {fiveComponents.map((card) => (
            <div
              key={card.num}
              className="card-circle"
              data-tilt
              style={{
                background: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '16px',
                padding: '28px',
                color: '#0A0A0B',
                transformStyle: 'preserve-3d',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A0A0B'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E4E7'; }}
            >
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--mwg2-grey)', marginBottom: '12px', fontWeight: 600 }}>
                {card.num}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#0A0A0B', marginBottom: '10px', lineHeight: 1.3 }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.5 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
