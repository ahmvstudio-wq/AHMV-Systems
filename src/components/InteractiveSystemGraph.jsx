import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveSystemGraph() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [mode, setMode] = useState('optimized'); // 'fragmented' | 'optimized'
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: 0, x: 0.12, y: 0.3, label: 'Inbound Inquiries', type: 'inbound', desc: 'Meta, Google, WhatsApp & website visitors' },
    { id: 1, x: 0.12, y: 0.7, label: 'Outbound Leads', type: 'outbound', desc: 'B2B databases, cold email & partner intros' },
    { id: 2, x: 0.38, y: 0.5, label: 'AI Intake & Qualification', type: 'ai', desc: 'Answers FAQs, qualifies budget, logs to DB in < 60s' },
    { id: 3, x: 0.62, y: 0.28, label: 'Pipeline & Calendar', type: 'sales', desc: 'Auto-books sales calendar & routes priority reps' },
    { id: 4, x: 0.62, y: 0.72, label: 'Client Portal & Delivery', type: 'ops', desc: 'Onboards client, provisions milestone dashboard' },
    { id: 5, x: 0.88, y: 0.5, label: 'Finance & Invoicing Engine', type: 'finance', desc: 'Auto-bills retainer, reconciles cash in real time' },
  ];

  const edgesOptimized = [
    [0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]
  ];

  const edgesFragmented = [
    [0, 0], [1, 1], [0, 3], [1, 4] // Disconnected/stuck paths
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let cssW = canvas.offsetWidth;
    let cssH = canvas.offsetHeight;
    let t = 0;
    let raf;

    const currentEdges = mode === 'optimized' ? edgesOptimized : edgesFragmented;
    const particles = currentEdges.map(([a, b]) => ({
      from: a,
      to: b,
      progress: Math.random(),
      speed: mode === 'optimized' ? 0.007 + Math.random() * 0.004 : 0.002,
      stuck: mode === 'fragmented' && Math.random() > 0.4,
    }));

    function drawNode(n, pulse) {
      const nx = n.x * cssW;
      const ny = n.y * cssH;
      const isSelected = selectedNode && selectedNode.id === n.id;

      // Outer glow
      const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 24 + pulse * 6);
      g.addColorStop(0, mode === 'optimized' ? 'rgba(10,10,11,0.08)' : 'rgba(239,68,68,0.08)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(nx, ny, 28 + pulse * 6, 0, Math.PI * 2);
      ctx.fill();

      // Node Circle
      ctx.beginPath();
      ctx.arc(nx, ny, isSelected ? 12 : 8, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? '#0A0A0B' : (mode === 'optimized' ? '#0A0A0B' : '#71717A');
      ctx.fill();

      if (isSelected) {
        ctx.strokeStyle = '#0A0A0B';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      ctx.fillStyle = isSelected ? '#0A0A0B' : '#52525B';
      ctx.font = isSelected ? "600 12px 'Inter', sans-serif" : "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(n.label, nx, ny + 22);
    }

    function drawEdge(a, b) {
      if (a === b) return;
      const na = nodes[a];
      const nb = nodes[b];
      const ax = na.x * cssW;
      const ay = na.y * cssH;
      const bx = nb.x * cssW;
      const by = nb.y * cssH;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = mode === 'optimized' ? 'rgba(10,10,11,0.12)' : 'rgba(239,68,68,0.2)';
      ctx.lineWidth = 1.5;
      if (mode === 'fragmented') {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawParticle(p) {
      if (p.from === p.to) return;
      const from = nodes[p.from];
      const to = nodes[p.to];
      const px = (from.x + (to.x - from.x) * p.progress) * cssW;
      const py = (from.y + (to.y - from.y) * p.progress) * cssH;

      ctx.beginPath();
      ctx.arc(px, py, mode === 'optimized' ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = mode === 'optimized' ? '#0A0A0B' : '#DC2626';
      ctx.fill();
    }

    function render() {
      t += 0.02;
      ctx.clearRect(0, 0, cssW, cssH);

      // Draw edges
      currentEdges.forEach(([a, b]) => drawEdge(a, b));

      // Draw nodes
      const pulse = Math.sin(t) * 0.5 + 0.5;
      nodes.forEach((n) => drawNode(n, pulse));

      // Draw particles
      particles.forEach((p) => {
        if (!p.stuck) {
          drawParticle(p);
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
        } else {
          drawParticle(p);
        }
      });

      raf = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      cssW = canvas.offsetWidth;
      cssH = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode, selectedNode]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '80px 0',
        background: '#FFFFFF',
        color: '#0A0A0B',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div>
            <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
              LIVE ARCHITECTURE SIMULATOR
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: 'clamp(30px, 4.2vw, 54px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'var(--mwg2-black)',
                maxWidth: '720px',
              }}
            >
              See how data flows through a unified operating engine.
            </h2>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: '8px', background: '#F4F4F5', padding: '4px', borderRadius: '10px', border: '1px solid #E4E4E7' }}>
            <button
              onClick={() => setMode('optimized')}
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                padding: '8px 16px',
                borderRadius: '8px',
                background: mode === 'optimized' ? '#0A0A0B' : 'none',
                color: mode === 'optimized' ? '#FFFFFF' : '#71717A',
                fontWeight: mode === 'optimized' ? 600 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              ● AHMV Unified System
            </button>
            <button
              onClick={() => setMode('fragmented')}
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                padding: '8px 16px',
                borderRadius: '8px',
                background: mode === 'fragmented' ? '#DC2626' : 'none',
                color: mode === 'fragmented' ? '#FFFFFF' : '#71717A',
                fontWeight: mode === 'fragmented' ? 600 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              ✕ Fragmented / Manual Ops
            </button>
          </div>
        </div>

        {/* Canvas Visualizer Card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            height: '420px',
            marginBottom: '24px',
          }}
        >
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

          {/* Live Telemetry Indicator Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #E4E4E7',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: mode === 'optimized' ? '#10B981' : '#EF4444',
                boxShadow: mode === 'optimized' ? '0 0 8px #10B981' : '0 0 8px #EF4444',
              }}
            />
            <span>STATUS: {mode === 'optimized' ? 'DETERMINISTIC PIPELINE ACTIVE (< 60s)' : '42% PACKET DROP & DELAY DETECTED'}</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--mwg2-grey)',
            }}
          >
            Click any node to view architecture details
          </div>
        </div>

        {/* Node Detail Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '10px',
          }}
          className="node-cards-grid"
        >
          {nodes.map((n) => (
            <div
              key={n.id}
              onClick={() => setSelectedNode(selectedNode?.id === n.id ? null : n)}
              style={{
                background: selectedNode?.id === n.id ? '#0A0A0B' : '#F4F4F5',
                color: selectedNode?.id === n.id ? '#FFFFFF' : '#0A0A0B',
                border: '1px solid #E4E4E7',
                borderRadius: '10px',
                padding: '14px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', opacity: 0.6, display: 'block', marginBottom: '4px' }}>
                0{n.id + 1}
              </span>
              <h4 style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.3 }}>{n.label}</h4>
            </div>
          ))}
        </div>

        {selectedNode && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px 20px',
              background: '#0A0A0B',
              color: '#FFFFFF',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>
                NODE: {selectedNode.label.toUpperCase()}
              </span>
              <p style={{ fontSize: '13px', color: '#E4E4E7', marginTop: '2px' }}>{selectedNode.desc}</p>
            </div>
            <a
              href="#contact"
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                color: '#FFFFFF',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Diagnose this module in your review →
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .node-cards-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 550px) {
          .node-cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
