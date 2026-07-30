import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playHoverSound, playClickSound } from '../utils/audio';

export default function BubbleCursor() {
  const cursorRef = useRef(null);
  const coordRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.style.cursor = 'none';

    let mx = -300, my = -300;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Instant position update - zero lag
      gsap.set(cursor, { x: mx, y: my });
      
      // Update coordinates readout text in real-time
      if (coordRef.current) {
        coordRef.current.textContent = `[${mx.toString().padStart(4, '0')}:${my.toString().padStart(4, '0')}]`;
      }
    };
    window.addEventListener('mousemove', onMove);

    // Dynamic scale on interactive hover
    const growTargets = 'a, button, [data-tilt], .cta-main, input, label, [role="button"], .svc-card, .proc-card, .stat-card';

    const onOver = (e) => {
      if (e.target.closest(growTargets)) {
        gsap.to(cursor, {
          scale: 1.6,
          duration: 0.25,
          ease: 'power2.out',
        });
        playHoverSound();
      }
    };

    const onOut = (e) => {
      if (e.target.closest(growTargets)) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Click pulse effect & click sound
    const onClick = (e) => {
      gsap.fromTo(cursor,
        { scale: 0.7 },
        { scale: 1.3, duration: 0.35, ease: 'power2.out', onComplete: () => {
          gsap.to(cursor, { scale: 1, duration: 0.2 });
        }}
      );
      if (e.target.closest(growTargets)) {
        playClickSound();
      }
    };
    window.addEventListener('click', onClick);

    // Show / Hide when leaving window
    const hide = () => gsap.to(cursor, { opacity: 0, duration: 0.15 });
    const show = () => gsap.to(cursor, { opacity: 1, duration: 0.15 });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '36px',
        height: '36px',
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        mixBlendMode: 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer spinning dashed ring */}
      <div
        className="cursor-ring"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1px dashed #ffffff',
          opacity: 0.7,
        }}
      />
      {/* Center target dot */}
      <div
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
        }}
      />
      {/* Coordinates readout */}
      <span
        ref={coordRef}
        style={{
          position: 'absolute',
          left: '24px',
          top: '-12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '8px',
          color: 'rgba(255, 255, 255, 0.75)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
        }}
      >
        [0000:0000]
      </span>
    </div>
  );
}
