import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Is AHMV just another AI agency?',
    a: 'No. AI is one part of what we build. We start with your problem, then decide if the right answer is software, AI, automation, integration or something simpler.',
  },
  {
    q: 'Do I need to know what system I need before I contact you?',
    a: "No. That's our job. Tell us what's happening in the business and what you want to improve. We'll work out what the system should look like.",
  },
  {
    q: "What if I don't actually need AI?",
    a: "Then we won't sell you AI. If a normal piece of software or a process change is the better answer, that's what we'll recommend.",
  },
  {
    q: 'Do you only work with certain industries?',
    a: 'No. We build around the problem, not the industry. Our work spans sales, finance, operations, property, e-commerce and digital experiences.',
  },
  {
    q: 'Can you work with the software we already have?',
    a: 'Yes. Keeping a system that already works and connecting it to the rest of your stack is often better than replacing it.',
  },
  {
    q: "Who owns the system once it's built?",
    a: 'Ownership is agreed upfront in the contract. As a standard position, you own the code, the data and the business assets we build for you, subject to the final agreement and any third-party components.',
  },
  {
    q: 'How long does a build take?',
    a: 'It depends on the scope. Small, well-defined builds move fast. Larger systems need discovery, staged development, testing and a proper rollout.',
  },
  {
    q: 'What does a project start with?',
    a: 'An Operations Review or discovery call. We want to understand how things work today before recommending anything.',
  },
  {
    q: 'Can you maintain the system after launch?',
    a: "Yes. Support and ongoing maintenance can be included whenever it's needed.",
  },
  {
    q: 'Do you guarantee sales results?',
    a: 'We guarantee the work and the system we deliver. Results that depend on the market, your sales team, or how customers behave sit outside the system itself. Any performance guarantee has to be tied to specific, measurable terms we agree upfront.',
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
