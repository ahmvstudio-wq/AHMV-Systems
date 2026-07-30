import React, { useEffect, useRef } from 'react';

export default function DotMatrixTitle({ text = "AHMV SYSTEMS" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Create an offscreen buffer to draw text and extract dot matrix pixel grid
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');

    const renderDotMatrix = () => {
      const containerWidth = canvas.parentElement.clientWidth || 900;
      const width = (canvas.width = Math.min(containerWidth, 1000));
      const height = (canvas.height = 130);

      offscreen.width = width;
      offscreen.height = height;

      // Draw bold text to offscreen canvas
      offCtx.fillStyle = '#ffffff';
      offCtx.font = '900 84px "Space Mono", monospace';
      offCtx.textAlign = 'left';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, 10, height / 2);

      // Extract pixel data
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Clear main canvas
      ctx.clearRect(0, 0, width, height);

      // Dot spacing & radius matching reference screenshot
      const step = 6;
      const dotRadius = 1.8;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            // Fill dot for character pixels
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Subtle dim background grid dots (matching reference image dot grid!)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.beginPath();
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    renderDotMatrix();

    const handleResize = () => {
      renderDotMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text]);

  return (
    <div style={{ width: '100%', overflowX: 'hidden', margin: '20px 0 30px 0' }}>
      <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
    </div>
  );
}
