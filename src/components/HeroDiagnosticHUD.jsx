import React, { useState, useEffect, useRef } from 'react';

export default function HeroDiagnosticHUD() {
  const [stats, setStats] = useState({
    latency: 12,
    signal: 99.8,
    temp: 36.4,
    load: 4.1,
    nodes: 84,
  });

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  // Fluctuate diagnostics stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        latency: Math.floor(8 + Math.random() * 8),
        signal: +(99.2 + Math.random() * 0.7).toFixed(1),
        temp: +(35.8 + Math.random() * 1.5).toFixed(1),
        load: +(3.8 + Math.random() * 1.2).toFixed(1),
        nodes: prev.nodes + (Math.random() > 0.5 ? 1 : -1),
      }));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Smooth mouse-follow spring animation for the HUD center
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left - rect.width / 2;
      const localY = e.clientY - rect.top - rect.height / 2;
      
      // Limit influence range
      targetOffset.current = {
        x: (localX / (rect.width / 2)) * 18,
        y: (localY / (rect.height / 2)) * 18,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updatePosition = () => {
      // Lerp (Linear Interpolation) for spring-like smoothing
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.08;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.08;
      
      setMouseOffset({
        x: currentOffset.current.x,
        y: currentOffset.current.y,
      });

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.07)',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        maxWidth: '360px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
      }}
    >
      {/* Corner brackets */}
      <span style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', borderTop: '1.5px solid rgba(0,0,0,0.15)', borderLeft: '1.5px solid rgba(0,0,0,0.15)' }} />
      <span style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderTop: '1.5px solid rgba(0,0,0,0.15)', borderRight: '1.5px solid rgba(0,0,0,0.15)' }} />
      <span style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', borderBottom: '1.5px solid rgba(0,0,0,0.15)', borderLeft: '1.5px solid rgba(0,0,0,0.15)' }} />
      <span style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', borderBottom: '1.5px solid rgba(0,0,0,0.15)', borderRight: '1.5px solid rgba(0,0,0,0.15)' }} />

      {/* SVG Interactive Scope */}
      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '24px' }}>
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          {/* Grid guidelines */}
          <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
          
          {/* Concentric radar rings */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.8" />

          {/* Rotating sweep hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 90 * Math.cos(Date.now() * 0.0015)}
            y2={100 + 90 * Math.sin(Date.now() * 0.0015)}
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="1.2"
          />

          {/* Interactive target dot (follows mouse with offset tilt) */}
          <g transform={`translate(${mouseOffset.x}, ${mouseOffset.y})`}>
            {/* Target circle */}
            <circle cx="100" cy="100" r="10" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
            {/* Crosshair inside target */}
            <line x1="100" y1="92" x2="100" y2="108" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
            <line x1="92" y1="100" x2="108" y2="100" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
            {/* Blip dot */}
            <circle cx="100" cy="100" r="2" fill="rgba(0,0,0,0.8)" />
          </g>
        </svg>
        {/* Decorative sweeping overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, rgba(0,0,0,0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          animation: 'radarScan 4s linear infinite',
        }} />
      </div>

      {/* Diagnostics readout variables */}
      <div
        style={{
          width: '100%',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--mwg2-grey)',
          lineHeight: '1.6',
          borderTop: '1px dashed rgba(0,0,0,0.08)',
          paddingTop: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>SYSTEM_OS_INIT</span>
          <span style={{ color: 'var(--mwg2-black)', fontWeight: 600 }}>[OK_100%]</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>SYS_LATENCY_RATE</span>
          <span style={{ color: 'var(--mwg2-black)', fontWeight: 600 }}>{stats.latency}ms</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>DIAG_SIG_STRENGTH</span>
          <span style={{ color: 'var(--mwg2-black)', fontWeight: 600 }}>{stats.signal}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>CORE_OPER_TEMP</span>
          <span style={{ color: 'var(--mwg2-black)', fontWeight: 600 }}>{stats.temp}°C</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>ENGINE_LOAD_INDX</span>
          <span style={{ color: 'var(--mwg2-black)', fontWeight: 600 }}>{stats.load}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>ACTIVE_STACK_NODES</span>
          <span style={{ color: 'var(--mwg2-black)', fontWeight: 600 }}>{stats.nodes.toString().padStart(4, '0')}</span>
        </div>
      </div>
      
      {/* Radar style conic scan animation definition */}
      <style>{`
        @keyframes radarScan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
