import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Is this just another AI agency?',
    a: 'No. Generic AI agencies sell chatbots and Zapier templates. We build the operating infrastructure underneath - connecting your leads, workflows, customer records, and internal tools into one system you own. AI is one tool inside that, not the whole pitch.',
  },
  {
    q: "What if I don't actually need AI?",
    a: "Then we won't build it. Most businesses need clean data pipelines, automated follow-ups, and a centralized portal long before they need AI. We only implement what actually solves the bottleneck.",
  },
  {
    q: 'How is this different from hiring an ops person or buying another SaaS tool?',
    a: 'An ops hire takes months to train and manual SaaS tools still require human data entry. We build custom automated infrastructure that connects your tools and runs 24/7 without adding headcount or expensive per-seat software fees.',
  },
  {
    q: 'What does an engagement cost?',
    a: 'Every project has a clear setup fee (typically AED 2,000–7,500 or regional equivalent) plus an ongoing retainer for support and maintenance. You get a transparent, fixed quote after the operations review.',
  },
  {
    q: 'How long does a build take?',
    a: 'Most core systems are architected, tested, and deployed to your team within 14 days.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const headRef = useRef(null);

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
  }, []);

  return (
    <section
      id="faq"
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
          FAQ
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
            marginBottom: '40px',
            maxWidth: '780px',
            willChange: 'clip-path',
          }}
        >
          Questions worth answering upfront.
        </h2>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E4E4E7',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.03)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#0A0A0B', paddingRight: '16px' }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: '20px',
                      color: 'var(--mwg2-grey)',
                      fontFamily: 'var(--font-mono)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '16px 28px 24px',
                      fontSize: '14px',
                      color: '#52525B',
                      lineHeight: 1.65,
                      borderTop: '1px solid #F4F4F5',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
