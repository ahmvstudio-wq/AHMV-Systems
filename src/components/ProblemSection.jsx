import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  { problem: 'Leads go cold in DMs & chats', system: 'Automated CRM booking' },
  { problem: 'Support runs on memory', system: 'Centralized client portal' },
  { problem: 'Books stay a mystery until month-end', system: 'Automated cash flow tracking' },
  { problem: 'Five tools, zero connection', system: 'One unified operating system' },
];

const stats = [
  { value: 100, suffix: '%', label: 'Data & code ownership', isLight: true },
  { value: 60, suffix: 's', label: 'Lead response speed', isLight: false },
  { value: 14, suffix: 'd', label: 'Avg. deployment time', isLight: false },
  { value: 80, suffix: '%', label: 'Manual ops eliminated', isLight: true },
];

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Headline curtain clip-path reveal
    const h2 = sectionRef.current.querySelector('.problem-head');
    if (h2) {
      gsap.set(h2, { clipPath: 'inset(0 0 100% 0)' });
      ScrollTrigger.create({
        trigger: h2,
        start: 'top 86%',
        onEnter: () => gsap.to(h2, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' }),
        once: true,
      });
    }

    // 2. Table rows entrance with stagger
    const rows = sectionRef.current.querySelectorAll('.comp-row');
    gsap.set(rows, { x: -30, opacity: 0 });
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.problem-table-container'),
      start: 'top 82%',
      onEnter: () => gsap.to(rows, { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }),
      once: true,
    });

    // 3. Stat cards 3D tilt entrance + animated counter
    const statCards = sectionRef.current.querySelectorAll('.problem-stat-card');
    gsap.set(statCards, { rotateY: -35, y: 40, opacity: 0, scale: 0.92, transformPerspective: 800 });
    
    ScrollTrigger.create({
      trigger: sectionRef.current.querySelector('.stat-grid'),
      start: 'top 80%',
      onEnter: () => {
        gsap.to(statCards, {
          rotateY: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        });

        // Numeric counters odometer effect
        stats.forEach((s, idx) => {
          const counterEl = sectionRef.current.querySelector(`.stat-val-${idx}`);
          if (counterEl) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: s.value,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                counterEl.textContent = Math.round(obj.val) + s.suffix;
              },
            });
          }
        });
      },
      once: true,
    });

    // 4. Subtle background particle animation on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w = (canvas.width = canvas.offsetWidth);
      let h = (canvas.height = canvas.offsetHeight);
      let raf;

      const particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
      }));

      function renderCanvas() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
        raf = requestAnimationFrame(renderCanvas);
      }

      renderCanvas();

      const handleResize = () => {
        if (!canvas) return;
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{
        padding: '60px 0 100px',
        background: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        
        {/* Obsidian Deep Dark Card Container with Ambient Depth */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            background: '#0A0A0B',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '72px 48px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.18)',
          }}
          className="problem-inner-container"
        >
          {/* Subtle Ambient Particle Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
              opacity: 0.65,
            }}
          />

          {/* Radial Top Glow Blob */}
          <div
            style={{
              position: 'absolute',
              top: '-150px',
              right: '-150px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header Tagline & Diode Pulse */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 0 12px #FFFFFF, 0 0 20px rgba(255,255,255,0.6)',
                  animation: 'diodePulse 2s infinite ease-in-out',
                  display: 'inline-block',
                }}
              />
              <p
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  color: '#A1A1AA',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                THE PROBLEM
              </p>
            </div>

            <h2
              className="problem-head"
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: 'clamp(30px, 4.2vw, 54px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '20px',
                maxWidth: '780px',
                willChange: 'clip-path',
              }}
            >
              Every one of these is a system problem, <br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>not a hiring problem.</span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: '#A1A1AA',
                maxWidth: '580px',
                marginBottom: '56px',
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              We operate at the infrastructure level - where systems manage leads, client delivery, billing data, and team operations.
            </p>

            {/* 50 / 50 Split Layout */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '56px',
                alignItems: 'start',
              }}
              className="problem-split-grid"
            >
              {/* Left Column: Comparison Table & Replaced Apps */}
              <div className="problem-table-container">
                <p
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: '#71717A',
                    marginBottom: '16px',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}
                >
                  THE BOTTLENECK VS THE SYSTEM
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                        <th
                          style={{
                            padding: '10px 8px',
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            color: '#A1A1AA', // Increased visibility
                            textAlign: 'left',
                            width: '50%',
                            letterSpacing: '0.04em',
                          }}
                        >
                          TYPICAL BOTTLENECK
                        </th>
                        <th
                          style={{
                            padding: '10px 8px',
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            color: '#FFFFFF',
                            textAlign: 'left',
                            width: '50%',
                            letterSpacing: '0.04em',
                          }}
                        >
                          AHMV SYSTEM FIX
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((c, i) => {
                        const isHovered = hoveredRow === i;
                        return (
                          <tr
                            key={i}
                            className="comp-row"
                            onMouseEnter={() => setHoveredRow(i)}
                            onMouseLeave={() => setHoveredRow(null)}
                            style={{
                              borderBottom: '1px solid rgba(255,255,255,0.08)',
                              background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                              transition: 'background-color 0.2s ease',
                              cursor: 'default',
                            }}
                          >
                            <td
                              style={{
                                padding: '16px 8px',
                                fontSize: '13px',
                                color: '#A1A1AA', // Increased visibility
                                lineHeight: 1.4,
                              }}
                            >
                              {c.problem}
                            </td>
                            <td
                              style={{
                                padding: '16px 8px',
                                fontSize: '13px',
                                color: isHovered ? '#FFFFFF' : '#E4E4E7',
                                fontWeight: 500,
                                lineHeight: 1.4,
                                textShadow: isHovered ? '0 0 12px rgba(255,255,255,0.3)' : 'none',
                                transition: 'color 0.2s ease, text-shadow 0.2s ease',
                              }}
                            >
                              {c.system}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Software Displaced Cloud */}
                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: '#71717A',
                      marginBottom: '12px',
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                    }}
                  >
                    SOFTWARE WE CONSOLIDATE
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {['Salesforce', 'HubSpot', 'Asana', 'Monday', 'Spreadsheets'].map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11px',
                          padding: '6px 12px',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '6px',
                          color: '#71717A',
                          fontFamily: 'var(--font-mono)',
                          textDecoration: 'line-through',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        background: '#FFFFFF',
                        color: '#0A0A0B',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        boxShadow: '0 0 16px rgba(255,255,255,0.35)',
                      }}
                    >
                      ONE OPERATING SYSTEM
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Real System Outcomes Quarter White & Black Cards */}
              <div>
                <p
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: '#71717A',
                    marginBottom: '16px',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}
                >
                  REAL SYSTEM OUTCOMES
                </p>

                <div
                  className="stat-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="problem-stat-card"
                      data-tilt
                      style={{
                        background: s.isLight ? '#FFFFFF' : '#18181B',
                        color: s.isLight ? '#0A0A0B' : '#FFFFFF',
                        padding: '32px 24px',
                        borderRadius: '16px',
                        transformStyle: 'preserve-3d',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: s.isLight ? '1px solid #FFFFFF' : '1px solid rgba(255,255,255,0.12)',
                        boxShadow: s.isLight
                          ? '0 12px 30px rgba(255,255,255,0.15)'
                          : '0 8px 30px rgba(0,0,0,0.3)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      }}
                    >
                      <div
                        className={`stat-val-${i}`}
                        style={{
                          fontSize: '42px',
                          fontWeight: 600,
                          fontFamily: 'var(--font-mono)',
                          lineHeight: 1,
                          letterSpacing: '-0.03em',
                          color: s.isLight ? '#0A0A0B' : '#FFFFFF',
                        }}
                      >
                        0{s.suffix}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: s.isLight ? '#52525B' : '#A1A1AA',
                          marginTop: '10px',
                          fontFamily: 'var(--font-mono)',
                          lineHeight: 1.4,
                          fontWeight: s.isLight ? 600 : 400,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .problem-split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .problem-inner-container { padding: 48px 24px !important; }
        }
      `}</style>
    </section>
  );
}
