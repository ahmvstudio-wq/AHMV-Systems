import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductsByCategory } from '../data/serviceCategories';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// Canvas 1: Acquisition Pipeline Flow (Revenue & Sales Operations)
// ─────────────────────────────────────────────────────────────
function AcquisitionCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const nodes = [
      { x: 0.12, y: 0.35, label: 'Ads & Leads' },
      { x: 0.12, y: 0.65, label: 'Proposals' },
      { x: 0.38, y: 0.5, label: 'Qualification' },
      { x: 0.62, y: 0.3, label: 'WhatsApp' },
      { x: 0.62, y: 0.7, label: 'Email Outreach' },
      { x: 0.88, y: 0.5, label: 'Booked Slot' },
    ];

    const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]];
    const particles = edges.map(([a, b]) => ({
      from: a, to: b, progress: Math.random(), speed: 0.005 + Math.random() * 0.003,
    }));

    function drawNode(n, pulse) {
      const nx = n.x * w, ny = n.y * h;
      const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 24 + pulse * 6);
      g.addColorStop(0, 'rgba(0,0,0,0.06)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(nx, ny, 28 + pulse * 6, 0, Math.PI * 2); ctx.fill();

      ctx.beginPath(); ctx.arc(nx, ny, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#0A0A0B'; ctx.fill();

      ctx.fillStyle = 'rgba(10,10,11,0.8)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(n.label, nx, ny + 24);
    }

    function drawEdge(a, b) {
      const ax = a.x * w, ay = a.y * h, bx = b.x * w, by = b.y * h;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    }

    function drawParticle(p) {
      const from = nodes[p.from], to = nodes[p.to];
      const px = (from.x + (to.x - from.x) * p.progress) * w;
      const py = (from.y + (to.y - from.y) * p.progress) * h;
      const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
      g.addColorStop(0, '#0A0A0B');
      g.addColorStop(1, 'rgba(10,10,11,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    }

    function draw() {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);
      edges.forEach(([a, b]) => drawEdge(nodes[a], nodes[b]));
      const pulse = Math.sin(t) * 0.5 + 0.5;
      nodes.forEach((n) => drawNode(n, pulse));
      particles.forEach((p) => {
        drawParticle(p);
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
      });
      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 2: Sync Spine Orbit (Business Operations)
// ─────────────────────────────────────────────────────────────
function BusinessOpsCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const cx = w / 2, cy = h / 2;
    const orbitNodes = [
      { label: 'Files', angle: 0 },
      { label: 'Workflows', angle: 72 },
      { label: 'Approvals', angle: 144 },
      { label: 'Alerts', angle: 216 },
      { label: 'SOPs', angle: 288 },
    ];

    function draw() {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      const rad = Math.min(w, h) * 0.32;

      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 1; ctx.stroke();

      ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#0A0A0B'; ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 9px Inter,sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('OPS', cx, cy);

      orbitNodes.forEach((n) => {
        const angle = (n.angle + t * 8) * (Math.PI / 180);
        const nx = cx + Math.cos(angle) * rad;
        const ny = cy + Math.sin(angle) * rad;

        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
        ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1; ctx.stroke();

        ctx.beginPath(); ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0A0A0B'; ctx.fill();

        ctx.fillStyle = 'rgba(10,10,11,0.8)';
        ctx.font = '500 10px Inter,sans-serif';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(n.label, nx, ny + 22);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 3: Onboarding & Portals Tracker (Customer Operations)
// ─────────────────────────────────────────────────────────────
function CustomerPortalCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    function draw() {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;

      const radius = 60;
      const progress = (t % 10) / 10;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
      ctx.strokeStyle = '#0A0A0B';
      ctx.lineWidth = 8;
      ctx.stroke();

      const pulse = 10 + Math.sin(t * 3) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fill();

      ctx.fillStyle = '#0A0A0B';
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(progress * 100)}%`, cx, cy);

      ctx.fillStyle = 'rgba(10, 10, 11, 0.6)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.fillText('Client Welcome Checklist', cx, cy + 90);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 4: Billing Ledgers Grid (Finance Operations)
// ─────────────────────────────────────────────────────────────
function FinanceGridCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const COLS = 6, ROWS = 4;
    const cellStates = Array.from({ length: COLS * ROWS }, () => Math.random());

    function draw() {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);
      const cw = w / COLS, ch = h / ROWS;

      cellsDraw();

      function cellsDraw() {
        for (let col = 0; col < COLS; col++) {
          for (let row = 0; row < ROWS; row++) {
            const idx = col + row * COLS;
            const state = cellStates[idx];
            const pulseVal = Math.sin(t + state * 5) * 0.4 + 0.6;
            const isHighlighted = (Math.floor(t / 2) % (COLS * ROWS)) === idx;

            ctx.fillStyle = isHighlighted
              ? `rgba(0,0,0,${0.15 + pulseVal * 0.1})`
              : `rgba(0,0,0,${0.02 + pulseVal * 0.03})`;

            ctx.beginPath();
            ctx.roundRect(col * cw + 4, row * ch + 4, cw - 8, ch - 8, 4);
            ctx.fill();

            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(col * cw + cw / 2 - 1, row * ch + ch / 2 - 1, 2, 2);
          }
        }
      }

      ctx.fillStyle = 'rgba(10, 10, 11, 0.6)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText('Billing Sync Status', 16, 24);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 5: Workforce Tree Network (People Operations)
// ─────────────────────────────────────────────────────────────
function WorkforceCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    function draw() {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h * 0.85;

      function branch(x, y, angle, len, depth) {
        if (depth === 0 || len < 4) return;
        const ex = x + Math.cos(angle) * len;
        const ey = y + Math.sin(angle) * len;
        const alpha = (depth / 5) * 0.45;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(10,10,11,${alpha})`;
        ctx.lineWidth = depth * 0.9; ctx.stroke();

        const swing = Math.sin(t + depth) * 0.08;
        branch(ex, ey, angle - 0.45 + swing, len * 0.72, depth - 1);
        branch(ex, ey, angle + 0.45 + swing, len * 0.72, depth - 1);
      }

      branch(cx, cy, -Math.PI / 2, h * 0.28, 5);

      ctx.fillStyle = 'rgba(10,10,11,0.6)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('Staff Database & Policy Guide Tree', cx, cy + 18);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 6: Real-time Cockpit Vitals (Management Intelligence)
// ─────────────────────────────────────────────────────────────
function CommandCenterCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    function draw() {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#0A0A0B';
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * 0.02 + t * 2.5) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(10, 10, 11, 0.6)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('Business Vitals Activity Indicator', w / 2, 24);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 7: Neural Server Network (Technology & Systems)
// ─────────────────────────────────────────────────────────────
function TechNetworkCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const points = [
      { x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 },
      { x: 0.5, y: 0.5 },
      { x: 0.2, y: 0.8 }, { x: 0.8, y: 0.8 },
      { x: 0.15, y: 0.5 }, { x: 0.85, y: 0.5 }
    ];

    const connections = [
      [0, 2], [1, 2], [3, 2], [4, 2], [5, 0], [5, 3], [6, 1], [6, 4]
    ];

    function draw() {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.lineWidth = 1;
      connections.forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(points[p1].x * w, points[p1].y * h);
        ctx.lineTo(points[p2].x * w, points[p2].y * h);
        ctx.stroke();
      });

      points.forEach((p, idx) => {
        const px = p.x * w, py = p.y * h;
        const pulse = Math.sin(t + idx) * 3 + 6;

        ctx.beginPath();
        ctx.arc(px, py, pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#0A0A0B';
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(10, 10, 11, 0.6)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('Custom Code API Infrastructure', w / 2, h - 20);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Dynamic SVG Visualization Components
// ─────────────────────────────────────────────────────────────
function SalesFunnelSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', fontFamily: 'var(--font-mono)' }}>QUALIFICATION FUNNEL EFFICIENCY</h4>
      <svg width="100%" height="160" viewBox="0 0 300 160" style={{ maxWidth: '300px' }}>
        <polygon points="10,10 290,10 240,40 60,40" fill="#E4E4E7" stroke="#D1D5DB" />
        <text x="150" y="26" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">1. Raw Leads (100%)</text>
        
        <polygon points="60,45 240,45 200,75 100,75" fill="#C7D2FE" stroke="#A5B4FC" />
        <text x="150" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#312E81">2. Validated Outreach (78%)</text>

        <polygon points="100,80 200,80 170,110 130,110" fill="#818CF8" stroke="#6366F1" />
        <text x="150" y="97" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0A0A0B">3. Qualified (54%)</text>

        <polygon points="130,115 170,115 155,145 145,145" fill="#4F46E5" stroke="#4338CA" />
        <text x="150" y="132" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0A0A0B">4. Calendars (38%)</text>
      </svg>
    </div>
  );
}

function ProcessFlowSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>WORKFLOW INTEGRATION MODEL</h4>
      <svg width="100%" height="160" viewBox="0 0 320 160">
        <rect x="10" y="55" width="80" height="40" rx="6" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="2" />
        <text x="50" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">Contract Sign</text>

        <line x1="90" y1="75" x2="120" y2="75" stroke="#FFFFFF" strokeWidth="2" markerEnd="url(#arrow)" />
        
        <rect x="120" y="25" width="80" height="40" rx="6" fill="#FFFFFF" stroke="#FFFFFF" />
        <text x="160" y="48" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0A0A0B">Fulfillment Sync</text>

        <rect x="120" y="85" width="80" height="40" rx="6" fill="#18181B" stroke="#FFFFFF" strokeWidth="2" />
        <text x="160" y="108" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">Portal Setup</text>

        <line x1="200" y1="45" x2="230" y2="75" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="200" y1="105" x2="230" y2="75" stroke="#FFFFFF" strokeWidth="1.5" />

        <rect x="230" y="55" width="80" height="40" rx="6" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
        <text x="270" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#312E81">Client Welcome</text>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFFFFF" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function WelcomeOnboardingSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>CLIENT WELCOMING TIMELINE</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FAFAFA', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' }}>1</span>
          <div style={{ flex: 1, borderBottom: '1px solid #F3F4F6', paddingBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>IMMEDIATE ACTION</span>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#09090B' }}>Portal Link & Welcome Email Dispatched</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#27272A', color: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' }}>2</span>
          <div style={{ flex: 1, borderBottom: '1px solid #F3F4F6', paddingBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>CLIENT ACTION</span>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#09090B' }}>Files Uploaded directly in Portal Directory</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#27272A', color: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' }}>3</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>SYSTEM SYNC</span>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#09090B' }}>Team Alerted & Kick-Off Scheduled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoicingCashflowSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>ACCOUNTS RECEIVABLE VELOCITY</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#A1A1AA', marginBottom: '4px' }}>
            <span>Auto-collected (Under 3 Days)</span>
            <strong>75%</strong>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '75%', height: '100%', background: '#FAFAFA' }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#A1A1AA', marginBottom: '4px' }}>
            <span>Reminder Assisted (Under 7 Days)</span>
            <strong>20%</strong>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '20%', height: '100%', background: '#71717A' }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#A1A1AA', marginBottom: '4px' }}>
            <span>Follow-up needed</span>
            <strong>5%</strong>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '5%', height: '100%', background: '#EF4444' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeRAGTreeSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>AI KNOWLEDGE RESPONSIVENESS</h4>
      <svg width="100%" height="150" viewBox="0 0 300 150">
        <line x1="150" y1="15" x2="60" y2="70" stroke="#E4E4E7" strokeWidth="2" />
        <line x1="150" y1="15" x2="150" y2="70" stroke="#E4E4E7" strokeWidth="2" />
        <line x1="150" y1="15" x2="240" y2="70" stroke="#E4E4E7" strokeWidth="2" />

        <circle cx="150" cy="15" r="12" fill="#FFFFFF" />
        <text x="150" y="19" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0A0A0B">AI</text>

        <rect x="15" y="70" width="90" height="30" rx="4" fill="#18181B" stroke="#E4E4E7" strokeWidth="2" />
        <text x="60" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">Policy PDF Docs</text>

        <rect x="105" y="70" width="90" height="30" rx="4" fill="#18181B" stroke="#E4E4E7" strokeWidth="2" />
        <text x="150" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">Company SOPs</text>

        <rect x="195" y="70" width="90" height="30" rx="4" fill="#18181B" stroke="#E4E4E7" strokeWidth="2" />
        <text x="240" y="88" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">Forms & Sheets</text>

        <line x1="60" y1="100" x2="150" y2="135" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="150" y1="100" x2="150" y2="135" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="240" y1="100" x2="150" y2="135" stroke="#FFFFFF" strokeWidth="1.5" />

        <rect x="90" y="125" width="120" height="22" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
        <text x="150" y="138" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#312E81">Employee Answer</text>
      </svg>
    </div>
  );
}

function CommandCenterMetricsSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>EXECUTIVE VIEW STABILITY</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ borderLeft: '3px solid #0A0A0B', paddingLeft: '8px' }}>
          <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>INCOMING VITALS</span>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#09090B' }}>Reconciled</p>
        </div>
        <div style={{ borderLeft: '3px solid #0A0A0B', paddingLeft: '8px' }}>
          <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>METRICS DELAYS</span>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#09090B' }}>0 ms</p>
        </div>
      </div>
    </div>
  );
}

function APIArchitectureSVG() {
  return (
    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#09090B', marginBottom: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>OWNED INFRASTRUCTURE LAYERS</h4>
      <svg width="100%" height="150" viewBox="0 0 300 150">
        <rect x="20" y="10" width="260" height="24" rx="4" fill="#18181B" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="150" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">Custom Dashboard (Owned Domain)</text>

        <line x1="150" y1="34" x2="150" y2="48" stroke="#FFFFFF" strokeWidth="1.5" />

        <rect x="20" y="48" width="260" height="24" rx="4" fill="#18181B" stroke="#D1D5DB" />
        <text x="150" y="63" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4B5563">API Bridges (Encrypted Routers)</text>

        <line x1="150" y1="72" x2="150" y2="86" stroke="#FFFFFF" strokeWidth="1.5" />

        <rect x="20" y="86" width="260" height="24" rx="4" fill="#18181B" stroke="#D1D5DB" />
        <text x="150" y="101" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4B5563">AI Assistants & Workflows (Private Server)</text>

        <line x1="150" y1="110" x2="150" y2="124" stroke="#FFFFFF" strokeWidth="1.5" />

        <rect x="20" y="124" width="260" height="24" rx="4" fill="#FFFFFF" stroke="#FFFFFF" />
        <text x="150" y="139" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0A0A0B">Secure Cloud Database (Your Account)</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Master Service Data with Simplified Copwriting (No robotic language)
// ─────────────────────────────────────────────────────────────
const servicesData = [
  {
    id: 'sales-revenue',
    num: '01',
    badge: 'SALES & REVENUE SYSTEMS',
    title: 'Sales & Revenue Systems',
    headline: 'Make your sales pipeline clear, reliable, and highly responsive.',
    sub: 'Avoid missing qualified leads and struggling to estimate sales closings. We build a unified sales pipeline and messaging setup that links your inquiries to active staff, updates deal stages automatically, and displays progress clearly.',
    Canvas: AcquisitionCanvas,
    Chart: SalesFunnelSVG,
    stats: [
      { label: 'Outreach Latency', value: '< 60', suffix: 's' },
      { label: 'Meeting Bookings', value: '3.4', suffix: 'x' },
      { label: 'Lost Inquiries Restored', value: '100', suffix: '%' },
      { label: 'Pipeline Accuracy', value: '95', suffix: '%' },
    ],
    overview: `Many growing businesses miss out on sales because of slow lead follow-ups and out-of-date pipelines. Inquiries from search and social campaigns get lost in files or chat threads, depending entirely on manual routing. Furthermore, sales stages are updated inconsistently, making sales forecasting difficult.\n\nOur Sales Operations setups resolve these gaps. We connect incoming leads directly to automated outreach channels (WhatsApp and Email), instantly validating interest, scheduling calls, routing prospects, and structuring a clear sales pipeline.\n\nBy standardizing qualifications, automating reminders, and providing managers with real-time conversion charts, you replace guesswork with reliable operations.`,
    workflow: [
      { step: '01', title: 'Real-time Inbound Ingestion', desc: 'Leads from social and search channels connect directly to your system the second they submit.' },
      { step: '02', title: 'Automated Outreach Qualifier', desc: 'Instant WhatsApp and Email messages validate inquiry details and confirm scheduling.' },
      { step: '03', title: 'Pipeline Synchronization', desc: 'Qualified prospects are routed to sales folders and trigger alerts for account representatives.' },
      { step: '04', title: 'Performance Analytics Dashboard', desc: 'Visual summaries aggregate response times, conversion ratios, and source metrics.' },
    ],
    features: [
      { title: 'Inbound Automation', desc: 'Instant response channels, automated calendar schedulers, lead routing, and central database storage.' },
      { title: 'Clear Sales CRM Pipeline', desc: 'Visual board cards, automated reminder updates, and pipeline analytics.' },
      { title: 'Sales Process Consistency', desc: 'Outlined script sequences, digital contract updates, and invoice generation.' },
      { title: 'Source Performance Insights', desc: 'Detailed reports showing which channels and campaigns bring the most valuable clients.' },
    ],
    beforeAfter: [
      { area: 'Customer Response Time', before: '2 to 24 hours (leads go cold)', after: 'Under 60 seconds (24/7 active)' },
      { area: 'Qualifying Prospects', before: 'Reps waste hours chasing unqualified leads', after: 'Automated schedule checks validation first' },
      { area: 'Pipeline Visibility', before: 'Out-of-date spreadsheets; missed deals', after: 'Real-time sales cards; automatic notifications' },
      { area: 'Sales Analytics', before: 'No idea which ad channels pay off', after: 'Clear path from inquiry to signed contract' },
    ],
    roadmap: [
      { phase: 'Phase 1: Workflow Review', timeline: 'Days 1 - 3', desc: 'Review your current sales stages, lead sources, and team quotas to align guidelines.' },
      { phase: 'Phase 2: CRM & System Setup', timeline: 'Days 4 - 8', desc: 'Connect database hooks, build customized pipeline boards, and set up messaging reminders.' },
      { phase: 'Phase 3: Launch & Testing', timeline: 'Days 9 - 14', desc: 'Run end-to-end trials with mock leads, verify metrics reporting, and run staff training.' },
    ],
    faqs: [
      { q: 'Will this system sound robotic to our premium leads?', a: 'No. The message templates are custom-written to fit your brand tone, acting as a helpful and polite scheduling assistant.' },
      { q: 'Can we integrate our existing CRM platforms like HubSpot?', a: 'Yes. We connect and push validated leads directly into HubSpot, Salesforce, Zoho, or keep it inside your custom dashboard.' },
      { q: 'How does lead routing handle multiple sales reps?', a: 'We write custom assignment rules (round-robin, regional, or performance-weighted) so leads route to the best rep automatically.' },
    ],
  },
  {
    id: 'operations-automation',
    num: '02',
    badge: 'OPERATIONS & AUTOMATION',
    title: 'Operations & Automation',
    headline: 'Zero-friction client delivery from onboarding to renewal.',
    sub: 'Stop paying stacked software subscription fees for tools that do not connect. We build a unified internal operating system that houses your operations, files, task routing, approvals, and workflow steps in one place.',
    Canvas: BusinessOpsCanvas,
    Chart: ProcessFlowSVG,
    stats: [
      { label: 'Admin Work Saved', value: '70', suffix: '%' },
      { label: 'Handoff Gaps Fixed', value: '100', suffix: '%' },
      { label: 'Fulfillment Speed', value: '5.2', suffix: 'x' },
      { label: 'SaaS License Savings', value: '100', suffix: '%' },
    ],
    overview: `Duplicate data entry and licensing fees slow down business operations. When sales wins a client, the project team must copy details manually, while managers spend time chasing status updates. Important steps get missed, causing delivery delays.\n\nOur Business Operations setups combine fragmented tasks into one custom internal web page tailored to your exact business structure. We write the database around your specific metrics, keeping only the fields you need.\n\nNotifications, approvals, task updates, and document generation trigger automatically in the background on specific event rules, giving you a fast, error-free back-office.`,
    workflow: [
      { step: '01', title: 'Task & File Mapping', desc: 'Review existing spreadsheet structures, document templates, and team tools.' },
      { step: '02', title: 'Database Configuration', desc: 'Create a clean, centralized database to hold your operational and client information.' },
      { step: '03', title: 'Automation Implementation', desc: 'Configure automatic task routing, email notifications, and data updates.' },
      { step: '04', title: 'Unified Dashboard Launch', desc: 'Deploy simple dashboard pages with custom access permissions for your staff.' },
    ],
    features: [
      { title: 'Workflow Automation', desc: 'Automate next-step task assignments, notifications, and internal approvals based on deal rules.' },
      { title: 'Consolidated Internal Database', desc: 'Houses all operations data under your control with zero per-user software licensing tax.' },
      { title: 'Document Auto-Generation', desc: '1-click proposal drafts, work orders, and invoices populated directly from database values.' },
      { title: 'Secure Customer Portals', desc: 'Private client pages for file exchange, billing history, payment links, and files.' },
    ],
    beforeAfter: [
      { area: 'Software Spend', before: 'Stacked user subscriptions across 4-6 SaaS apps', after: 'One custom-fit internal dashboard owned by you' },
      { area: 'Data Coordination', before: 'WhatsApp chains, spreadsheets, and manual updates', after: 'Real-time database sync across every operational stage' },
      { area: 'Step Approvals', before: 'Chasing managers for paper/email sign-offs', after: 'Digital approval prompts sent instantly with escalation alerts' },
      { area: 'Client Onboarding', before: 'Back-and-forth emails requesting files; delays', after: 'Automated login link to upload required documents in one page' },
    ],
    roadmap: [
      { phase: 'Phase 1: Process Outline', timeline: 'Days 1 - 4', desc: 'Document step-by-step tasks, document requirements, and team roles.' },
      { phase: 'Phase 2: Database & Dashboard Build', timeline: 'Days 5 - 10', desc: 'Build database structure, back-office forms, automation paths, and data connections.' },
      { phase: 'Phase 3: Migration & Launch', timeline: 'Days 11 - 14', desc: 'Import old Excel sheets, run testing scenarios, and conduct hands-on staff training.' },
    ],
    faqs: [
      { q: 'Will this force us to change our existing workflows?', a: 'No. We mold the custom software around your successful workflows, making them faster instead of forcing you into a rigid template.' },
      { q: 'How do clients log into their customer portal?', a: 'Using secure magic links sent to their email or phone, removing password hassles while maintaining encrypted security.' },
      { q: 'Can we add new database fields later?', a: 'Yes. The modular code structure allows developers or admins to quickly add fields, forms, and rules as you grow.' },
    ],
  },
  {
    id: 'ai-finance',
    num: '03',
    badge: 'AI & FINANCE INTELLIGENCE',
    title: 'AI & Finance Intelligence',
    headline: '24/7 digital workforce and real-time cash reconciliation.',
    sub: 'Stop wasting hours compiling bills, reconciling bank transfers, and manually answering routine policy questions. We deploy autonomous agents and automated billing tools that handle support, billing, and reporting.',
    Canvas: FinanceGridCanvas,
    Chart: CommandCenterMetricsSVG,
    stats: [
      { label: 'Collection Speed', value: '3.0', suffix: 'x' },
      { label: 'Dashboard Lag', value: '0', suffix: 'ms' },
      { label: 'Billing Errors Fixed', value: '100', suffix: '%' },
      { label: 'Policy Query Speed', value: '< 10', suffix: 's' },
    ],
    overview: `Invoicing administration and data aggregation are slow and prone to errors. Drafting quotes, matching deposits with invoices, and tracking overdue balances drains admin hours. Meanwhile, leadership lacks real-time visibility into these metrics.\n\nOur AI & Finance setups automate the entire invoicing lifecycle and aggregate departmental data into a single Command Center. The second a sales deal closes, the database drafts the invoice and alerts the customer. Reconciled totals stream directly to your executive dashboard.\n\nAdditionally, private AI assistants handle routine staff questions, making your organization significantly faster and more autonomous.`,
    workflow: [
      { step: '01', title: 'Metric & Billing Outline', desc: 'Identify target KPIs, billing triggers, and documentation needed for AI assistants.' },
      { step: '02', title: 'Invoicing Generation', desc: 'Closed sales trigger invoice drafts sent automatically with secure gateway payment links.' },
      { step: '03', title: 'Dashboard & AI Setup', desc: 'Write database queries for the Command Center and set up private AI document indexing.' },
      { step: '04', title: 'Cash Flow Reporting', desc: 'Settled records reconcile instantly, updating cash position and net margin charts.' },
    ],
    features: [
      { title: 'Automated Billing', desc: 'Quoting tools, internal discounting approvals, invoice generation, and gateway links.' },
      { title: 'Business Command Center', desc: 'Executive dashboard summarizing critical indicators (sales, invoices, projects, HR vitals).' },
      { title: 'Private AI Assistants', desc: 'Secure company knowledge assistant answering policy questions from private PDFs.' },
      { title: 'Warning Notifications', desc: 'Automated Slack or WhatsApp alerts when KPIs drop below targets or invoices go unpaid.' },
    ],
    beforeAfter: [
      { area: 'Invoice Drafting', before: 'Excel spreadsheets; manual invoicing; duplicate entries', after: 'Automated invoice generation triggered by pipeline changes' },
      { area: 'Leadership Visibility', before: 'Logging into 6 tools to check cash, sales, and projects', after: 'One dashboard shows net margins, pipelines, and backlog' },
      { area: 'Overdue Collections', before: 'Accounting staff manually checks bank accounts and calls', after: 'System schedules reminder notifications via WhatsApp and Email' },
      { area: 'Policy Access', before: 'HR spends hours answering repetitive policy questions', after: 'Staff gets instant, accurate answers from private AI bot' },
    ],
    roadmap: [
      { phase: 'Phase 1: Setup & Integrations', timeline: 'Days 1 - 4', desc: 'Connect payment gateways, outline dashboard KPIs, and ingest company documents.' },
      { phase: 'Phase 2: Code Build & AI Training', timeline: 'Days 5 - 11', desc: 'Write database queries, design dashboard widgets, and set up AI RAG pipelines.' },
      { phase: 'Phase 3: Launch & Verification', timeline: 'Days 12 - 14', desc: 'Verify webhook callbacks, check reminder alerts, and deploy financial pipeline.' },
    ],
    faqs: [
      { q: 'Does this software replace QuickBooks or Xero?', a: 'No. It integrates and pushes clean transactional events to QuickBooks, Zoho, or Xero, keeping your accounting stack intact.' },
      { q: 'Is our company documentation shared with public AI models?', a: 'No. The AI assistant uses private vector databases hosted securely. Your data is never used to train public LLM models.' },
      { q: 'Does the Command Center require moving our departmental databases?', a: 'No. The management cockpit reads from existing department tables, acting as an aggregator layer.' },
    ],
  },
  {
    id: 'custom-enterprise',
    num: '04',
    badge: 'CUSTOM SOFTWARE & FULL OS',
    title: 'Custom Software & Full OS',
    headline: 'Deploy secure, modular custom codebases, API bridges, and databases.',
    sub: 'Stop building core processes on fragile integrations that break during updates. We engineer custom software backends, secure APIs, relational database schemas, and private AI RAG setups that you own completely.',
    Canvas: TechNetworkCanvas,
    Chart: APIArchitectureSVG,
    stats: [
      { label: 'API Connection Reliability', value: '99.9', suffix: '%' },
      { label: 'Custom Code Ownership', value: '100', suffix: '%' },
      { label: 'Tech Debt Reduced', value: '80', suffix: '%' },
      { label: 'Build Speed', value: '14-21', suffix: 'd' },
    ],
    overview: `Relying on generic templates limits operational fit. No-code connections break when apps update details, and third-party tools expose private business records. AI, CRMs, and APIs are implementation layers rather than standalone products.\n\nOur Custom Enterprise setups replace fragile integrations with custom software architectures. We write modular, secure code, design private cloud databases, deploy API webhooks, and unify every department into a single command center (The AHMV OS).\n\nBy building custom software blocks and maintaining them under a structured SLA, we ensure your tools scale securely as transaction volume grows.`,
    workflow: [
      { step: '01', title: 'Systems & Stack Review', desc: 'Audit databases, code standards, server configurations, and integrations.' },
      { step: '02', title: 'Architecture Planning', desc: 'Design server layouts, database schemas, API maps, and security layers.' },
      { step: '03', title: 'Custom Coding', desc: 'Write custom backend code, deploy databases, connect webhooks, and set up AI pipelines.' },
      { step: '04', title: 'Server Launch & Support', desc: 'Deploy systems to dedicated cloud instances and initiate technical support.' },
    ],
    features: [
      { title: 'Custom Web Apps', desc: 'Fast, secure React/JS web applications tailored to your business operations.' },
      { title: 'API Integration Pipelines', desc: 'Webhook connections linking CRM, bookkeeping, bank, and messaging platforms.' },
      { title: 'Private AI Assistants', desc: 'Private LLM prompt pipelines, document indexers, and local databases.' },
      { title: 'Cloud Database Setup', desc: 'Encrypted databases, routine backups, and cloud servers under your control.' },
    ],
    beforeAfter: [
      { area: 'Integration Stability', before: 'No-code connections break when apps update schemas', after: 'Custom codebases with structured error logging' },
      { area: 'Feature Custom Fit', before: 'SaaS off-the-shelf layouts restrict fields and rules', after: '100% custom databases, forms, and permission roles' },
      { area: 'System Data Control', before: 'Business files stored across third-party servers', after: 'Encrypted databases hosted on your private cloud' },
      { area: 'AI Assistants', before: 'Generic chatbots with no company context', after: 'Private RAG systems reading internal documents safely' },
    ],
    roadmap: [
      { phase: 'Phase 1: Architecture Review', timeline: 'Days 1 - 4', desc: 'Review existing platforms, map databases, and design cloud server structures.' },
      { phase: 'Phase 2: Backend & Database build', timeline: 'Days 5 - 12', desc: 'Write custom API routers, deploy databases, write web apps, and set up AI engines.' },
      { phase: 'Phase 3: Deploy & Handover', timeline: 'Days 13 - 18', desc: 'Run loading and security tests, deploy to production servers, and share code repo.' },
    ],
    faqs: [
      { q: 'Do we get full ownership of the source code?', a: 'Yes. Once built, you receive full repository ownership and database credentials under your control.' },
      { q: 'Where is our custom software hosted?', a: 'On secure private cloud instances (AWS, GCP, DigitalOcean, or Azure) under your company credit.' },
      { q: 'How do you handle ongoing software patches?', a: 'We offer a technical SLA providing support, server updates, security checks, and minor feature additions.' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Service Page Component — Conversion-Focused Dark Mode
// ─────────────────────────────────────────────────────────────
function ServicePage({ service }) {
  const headRef = useRef(null);
  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const workflowRef = useRef(null);
  const featuresRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const roadmapRef = useRef(null);
  const faqRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.refresh();

    // Hero entrance
    if (headRef.current) {
      const headLines = headRef.current.querySelectorAll('.sp-head-line');
      gsap.fromTo(headLines,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );
    }

    // Stat cards
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-box');
      gsap.fromTo(statCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 88%', once: true } }
      );
    }

    // Workflow cards
    if (workflowRef.current) {
      const steps = workflowRef.current.querySelectorAll('.flow-card');
      gsap.fromTo(steps,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: workflowRef.current, start: 'top 85%', once: true } }
      );
    }

    // Feature cards
    if (featuresRef.current) {
      const featCards = featuresRef.current.querySelectorAll('.feat-box');
      gsap.fromTo(featCards,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 82%', once: true } }
      );
    }

    // Before/After rows
    if (beforeAfterRef.current) {
      const rows = beforeAfterRef.current.querySelectorAll('.ba-row');
      gsap.fromTo(rows,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: beforeAfterRef.current, start: 'top 80%', once: true } }
      );
    }

    // Roadmap cards
    if (roadmapRef.current) {
      const rCards = roadmapRef.current.querySelectorAll('.rm-card');
      gsap.fromTo(rCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: roadmapRef.current, start: 'top 84%', once: true } }
      );
    }
  }, [service]);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', color: '#09090B', fontFamily: 'var(--font-grotesk)' }}>

      {/* Sticky Nav */}
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(10,10,11,0.92)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#09090B'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Home
          </Link>
          <a href="#diagnostic" style={{ height: '38px', padding: '0 20px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#09090B', color: '#FFFFFF', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
            Book Free Strategy Session
          </a>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px 120px' }}>

        {/* ═══════════════════════════════════════════
            HERO — Massive typographic + Canvas
        ═══════════════════════════════════════════ */}
        <div ref={headRef} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center', marginBottom: '100px' }} className="hero-split">
          <div>
            <p className="sp-head-line" style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', color: '#52525B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
              SYSTEM {service.num}
            </p>

            <h1 className="sp-head-line" style={{
              fontSize: 'clamp(38px, 5vw, 72px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              marginBottom: '24px',
              color: '#09090B',
            }}>
              {service.title}
            </h1>

            <p className="sp-head-line" style={{ fontSize: '18px', color: '#52525B', lineHeight: 1.6, marginBottom: '40px', maxWidth: '520px' }}>
              {service.headline}
            </p>

            <div className="sp-head-line" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#diagnostic" style={{ height: '52px', padding: '0 30px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#09090B', color: '#FFFFFF', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '15px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Schedule Free Strategy Session
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          {/* Canvas */}
          <div style={{ height: '400px', background: '#FFFFFF', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(17,17,19,0.9)', backdropFilter: 'blur(8px)', padding: '5px 10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#52525B', textTransform: 'uppercase' }}>LIVE</span>
            </div>
            <service.Canvas />
          </div>
        </div>

        {/* METRICS */}
        <div ref={statsRef} style={{ marginBottom: '100px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '40px', color: '#52525B' }}>
            What changes when this is live.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }} className="stats-grid-responsive">
            {service.stats.map((s, idx) => (
              <div key={idx} className="stat-box" style={{ background: '#FAFAFA', padding: '36px 28px' }}>
                <div style={{ fontSize: '48px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#09090B', lineHeight: 1, marginBottom: '8px' }}>
                  {s.value}{s.suffix}
                </div>
                <div style={{ fontSize: '12px', color: '#52525B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY THIS EXISTS */}
        <div ref={overviewRef} style={{ marginBottom: '100px', maxWidth: '900px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '32px', color: '#52525B' }}>
            Why this system exists.
          </p>
          <div style={{ fontSize: '17px', color: '#A1A1AA', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {service.overview}
          </div>
        </div>

        {/* BEFORE vs AFTER */}
        <div ref={beforeAfterRef} style={{ marginBottom: '100px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '12px', color: '#52525B' }}>
            What changes.
          </p>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '48px', color: '#09090B' }}>
            <span style={{ textDecoration: 'line-through', color: '#A1A1AA' }}>Manual chaos</span> becomes structured output.
          </h2>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.1fr 1.1fr', background: '#F4F4F5', padding: '16px 28px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#52525B', fontWeight: 'bold', letterSpacing: '0.04em' }}>
              <span>AREA</span>
              <span style={{ color: '#EF4444' }}>BEFORE</span>
              <span style={{ color: '#22C55E' }}>AFTER</span>
            </div>
            {service.beforeAfter.map((ba, i) => (
              <div key={i} className="ba-row" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.1fr 1.1fr', padding: '22px 28px', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: '14px', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, color: '#18181B', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{ba.area}</div>
                <div style={{ color: '#52525B', lineHeight: 1.5 }}>{ba.before}</div>
                <div style={{ color: '#27272A', fontWeight: 500, lineHeight: 1.5 }}>{ba.after}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW WE BUILD IT */}
        <div ref={workflowRef} style={{ marginBottom: '100px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '12px', color: '#52525B' }}>
            How we build it.
          </p>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '48px', color: '#09090B' }}>
            Four stages. Two weeks. Fully deployed.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }} className="flow-grid-responsive">
            {service.workflow.map((w, i) => (
              <div key={i} className="flow-card" style={{ background: '#FAFAFA', padding: '36px 24px' }}>
                <div style={{ fontSize: '48px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.05)', lineHeight: 1, marginBottom: '20px' }}>
                  {w.step}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#09090B', marginBottom: '10px', lineHeight: 1.3 }}>{w.title}</h3>
                <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.55 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT'S INCLUDED */}
        <div ref={featuresRef} style={{ marginBottom: '100px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '48px', color: '#52525B' }}>
            What's included.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }} className="features-grid-responsive">
            {service.features.map((f, i) => (
              <div key={i} className="feat-box" style={{ background: '#FAFAFA', padding: '40px 32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#09090B', marginBottom: '14px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DEPLOYMENT TIMELINE */}
        <div ref={roadmapRef} style={{ marginBottom: '100px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '48px', color: '#52525B' }}>
            Deployment timeline.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }} className="roadmap-grid-responsive">
            {service.roadmap.map((r, i) => (
              <div key={i} className="rm-card" style={{ background: '#FAFAFA', padding: '36px 28px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#22C55E', display: 'block', marginBottom: '12px', fontWeight: 'bold', letterSpacing: '0.04em' }}>{r.timeline}</span>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#09090B', marginBottom: '12px' }}>{r.phase}</h3>
                <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.55 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div ref={faqRef} style={{ marginBottom: '100px' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '48px', color: '#52525B' }}>
            Common questions.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            {service.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ background: isOpen ? '#F4F4F5' : '#FFFFFF', transition: 'background 0.2s ease' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: '100%', padding: '22px 28px', background: 'none', border: 'none', color: '#09090B', fontSize: '15px', fontWeight: 500, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'var(--font-grotesk)', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span>{f.q}</span>
                    <span style={{ fontSize: '20px', color: '#A1A1AA', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0, marginLeft: '16px' }}>+</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 28px 24px', fontSize: '14px', color: '#52525B', lineHeight: 1.65 }}>{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '12px', color: '#52525B' }}>
            Ready to fix this?
          </p>
          <h2 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: '24px', color: '#09090B' }}>
            Book a free strategy session.
          </h2>
          <p style={{ fontSize: '16px', color: '#52525B', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            We review your operations, identify bottlenecks, and present a structured plan. No commitment.
          </p>
          <a href="#diagnostic" style={{ height: '56px', padding: '0 36px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#09090B', color: '#FFFFFF', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '16px', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Schedule Free Strategy Session
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* EXPLORE OTHER SYSTEMS */}
        <div style={{ paddingTop: '60px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', marginBottom: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            EXPLORE OTHER SYSTEMS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }} className="other-services-grid">
            {servicesData.filter((s) => s.id !== service.id).map((s) => (
              <Link key={s.id} to={`/services/${s.id}`}
                style={{ background: '#FAFAFA', padding: '24px', color: '#09090B', textDecoration: 'none', transition: 'background 0.2s', display: 'block' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F4F4F5'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
              >
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', marginBottom: '8px' }}>{s.num}</div>
                <div style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.4 }}>{s.headline}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .stats-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .flow-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .roadmap-grid-responsive { grid-template-columns: 1fr !important; }
          .features-grid-responsive { grid-template-columns: 1fr !important; }
          .other-services-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
          .flow-grid-responsive { grid-template-columns: 1fr !important; }
          .other-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Services Grid Component for FeaturesSection on Homepage
// ─────────────────────────────────────────────────────────────
export function ServicesGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.svc-card');
    gsap.set(cards, { y: 50, opacity: 0, rotateX: 14, scale: 0.95, transformPerspective: 800 });
    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 78%',
      onEnter: () => gsap.to(cards, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.85, stagger: 0.12, ease: 'power4.out' }),
      once: true,
    });
  }, []);

  return (
    <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      {servicesData.map((s) => (
        <Link
          key={s.id}
          to={`/services/${s.id}`}
          className="svc-card"
          style={{
            background: '#F4F4F5',
            border: '1px solid #27272A',
            borderRadius: '16px',
            padding: '28px',
            display: 'block',
            color: '#FFF',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272A'; }}
        >
          <div style={{ height: '150px', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', background: '#FFF', border: '1px solid rgba(255,255,255,0.08)' }}>
            <s.Canvas />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>{s.num}</span>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '4px', color: 'rgba(255,255,255,0.7)' }}>
              {s.badge}
            </span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 500, lineHeight: 1.3, marginBottom: '10px' }}>{s.title}</h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.headline}</p>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#FFF' }}>
            Explore Full System →
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Router Entry Point
// ─────────────────────────────────────────────────────────────
export default function ServicePageRouter({ serviceId }) {
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA', color: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            SYSTEM NOT FOUND
          </p>
          <Link to="/" style={{ color: '#09090B', textDecoration: 'underline' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <ServicePage service={service} />;
}
