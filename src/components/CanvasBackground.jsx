import React, { useEffect, useRef } from 'react';

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Neural Network Constellation Nodes (Matching MEUZE Reference Screenshot)
    const numNodes = 75;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: (Math.random() - 0.2) * 900,
      y: (Math.random() - 0.5) * 750,
      z: Math.random() * 600 + 100, // Keep z positive in front of camera
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      vz: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 3.5 + 1.5,
      glowing: Math.random() > 0.7,
    }));

    let mouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX - width / 2) * 0.0003;
      mouse.y = (e.clientY - height / 2) * 0.0003;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Dark Canvas Background
      ctx.fillStyle = '#07080b';
      ctx.fillRect(0, 0, width, height);

      angleX += 0.001 + mouse.y;
      angleY += 0.0015 + mouse.x;

      const centerOffsetX = width * 0.62;
      const centerOffsetY = height * 0.42;

      const projectedNodes = nodes.map(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        if (node.x < -600 || node.x > 600) node.vx *= -1;
        if (node.y < -500 || node.y > 500) node.vy *= -1;
        if (node.z < 50 || node.z > 800) node.vz *= -1;

        let x1 = node.x * Math.cos(angleY) + node.z * Math.sin(angleY);
        let z1 = -node.x * Math.sin(angleY) + node.z * Math.cos(angleY);
        let y1 = node.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = node.y * Math.sin(angleX) + z1 * Math.cos(angleX);

        const fov = 450;
        const scale = Math.max(0.1, fov / (z2 + 700));

        return {
          x: x1 * scale + centerOffsetX,
          y: y1 * scale + centerOffsetY,
          scale: scale,
          z: z2,
          radius: node.radius,
          glowing: node.glowing,
        };
      });

      // Draw 3D Neural Constellation Network Edges
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = Math.max(0, (1 - dist / 130) * 0.35 * Math.min(n1.scale, n2.scale));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = Math.max(0.2, 0.8 * n1.scale);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Neural Nodes & Glowing Clusters
      projectedNodes.forEach(node => {
        if (node.x > 0 && node.x < width && node.y > 0 && node.y < height) {
          const size = Math.max(0.5, node.radius * node.scale);
          const alpha = Math.min(0.9, Math.max(0.2, (800 - node.z) / 1000));

          if (node.glowing && size > 0) {
            const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4);
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

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
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
