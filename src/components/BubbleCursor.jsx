import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BubbleCursor() {
  const cursorRef = useRef(null);

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
    };
    window.addEventListener('mousemove', onMove);

    // Dynamic scale on interactive hover
    const growTargets = 'a, button, [data-tilt], .cta-main, input, label, [role="button"], .svc-card, .proc-card, .stat-card';

    const onOver = (e) => {
      if (e.target.closest(growTargets)) {
        gsap.to(cursor, {
          scale: 2.2,
          duration: 0.25,
          ease: 'power2.out',
        });
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

    // Click pulse effect
    const onClick = () => {
      gsap.fromTo(cursor,
        { scale: 0.7 },
        { scale: 1.6, duration: 0.35, ease: 'power2.out', onComplete: () => {
          gsap.to(cursor, { scale: 1, duration: 0.2 });
        }}
      );
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
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#ffffff',
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        mixBlendMode: 'difference',
      }}
    />
  );
}
