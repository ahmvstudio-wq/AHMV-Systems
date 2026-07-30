import React, { useEffect, useRef } from 'react';

export default function ThreeDTopographyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const ROWS = 50;
    const COLS = 60;
    let time = 0;

    const render = () => {
      time += 0.012;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Cursor radial glow
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
      grad.addColorStop(0, 'rgba(0,0,0,0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Horizontal topography contour lines
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * width;
          const baseY = (r / (ROWS - 1)) * height;
          const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y);
          const mf = Math.max(0, 1 - distToMouse / 250);
          const elevation =
            Math.sin(c * 0.22 + time + r * 0.18) * 18 +
            Math.cos(r * 0.28 - time * 0.7) * 13 +
            Math.sin(c * 0.08 - r * 0.05 + time * 0.5) * 8 +
            mf * -48 * Math.sin(distToMouse * 0.025 - time * 3.5);
          const y = baseY + elevation;
          const edgeFade = 1 - Math.abs(r - ROWS / 2) / (ROWS / 2);
          const alpha = edgeFade * 0.18 + mf * 0.22;
          ctx.strokeStyle = `rgba(0,0,0,${Math.min(0.32, Math.max(0.03, alpha))})`;
          ctx.lineWidth = 0.8;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Vertical cross-lines for grid feel
      for (let c = 0; c < COLS; c += 4) {
        ctx.beginPath();
        for (let r = 0; r < ROWS; r++) {
          const x = (c / (COLS - 1)) * width;
          const baseY = (r / (ROWS - 1)) * height;
          const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y);
          const mf = Math.max(0, 1 - distToMouse / 250);
          const elevation =
            Math.sin(c * 0.22 + time + r * 0.18) * 18 +
            Math.cos(r * 0.28 - time * 0.7) * 13 +
            mf * -48 * Math.sin(distToMouse * 0.025 - time * 3.5);
          const y = baseY + elevation;
          const alpha = 0.04 + mf * 0.08;
          ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
          ctx.lineWidth = 0.5;
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Moving dot particles on surface
      for (let i = 0; i < 12; i++) {
        const t = time * 0.4 + i * 0.8;
        const px = (Math.sin(t * 0.7 + i) * 0.4 + 0.5) * width;
        const py = (Math.cos(t * 0.5 + i * 1.3) * 0.3 + 0.5) * height;
        const distToMouse = Math.hypot(px - mouse.x, py - mouse.y);
        const mf = Math.max(0, 1 - distToMouse / 180);
        const a = 0.06 + mf * 0.18;
        ctx.beginPath();
        ctx.arc(px, py, 2 + mf * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
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
        opacity: 1,
      }}
    />
  );
}
