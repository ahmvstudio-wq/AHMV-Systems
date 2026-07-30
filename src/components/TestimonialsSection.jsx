import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'AHMV deployed our acquisition engine in days, not months. The system was configured around us.',
    author: 'Marcus Vance', role: 'Managing Director, Apex Growth', initials: 'MV',
  },
  {
    quote: 'We sell complex AI systems we cannot build in-house. AHMV is our silent white-label backend.',
    author: 'Elena Rostova', role: 'Founder, Zenith Media', initials: 'ER',
  },
  {
    quote: 'Outgrew HubSpot in 6 months. Custom dev quotes were $80k+. AHMV configured a full CRM in 2 weeks.',
    author: 'David Chen', role: 'VP Operations, Nexus Logistics', initials: 'DC',
  },
  {
    quote: 'Lead follow-up automation now runs 24/7. No spreadsheet checks. No human bottleneck.',
    author: 'Sarah Jenkins', role: 'Head of Marketing, CloudScale', initials: 'SJ',
  },
  {
    quote: 'AHMV builds real operational infrastructure that handles millions in pipeline.',
    author: 'Alexander Wright', role: 'Managing Partner, Beacon Capital', initials: 'AW',
  },
  {
    quote: 'Pre-engineered modules saved us months of trial and error. Cleanest implementation I have seen.',
    author: 'Tariq Al-Mansoor', role: 'Chief Technology Officer', initials: 'TM',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.testi-card');
    gsap.set(cards, { y: 60, opacity: 0, rotateX: 20, scale: 0.94, transformPerspective: 800 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 78%',
      onEnter: () => {
        gsap.to(cards, {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 0.8,
          stagger: { amount: 0.6, from: 'start' },
          ease: 'back.out(1.4)',
        });
      },
      once: true,
    });

  }, []);

  return (
    <section className="h-testis wrapper" ref={sectionRef} style={{ padding: '100px var(--grid-margin)' }}>
      <p className="label diode pr">TRUSTED BY +120 OPERATIONS LEADERS & AGENCIES</p>
      <h2 className="title-m" style={{ marginTop: '10px', marginBottom: '48px' }}>
        Approved by operators & partners
      </h2>

      <div className="testis-grid">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="testi-card"
            data-tilt
            style={{ transformStyle: 'preserve-3d' }}
          >
            <p className="title-xxs">"{item.quote}"</p>
            <div className="user-info">
              <div className="avatar-monogram">{item.initials}</div>
              <div>
                <h4>{item.author}</h4>
                <p>{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
