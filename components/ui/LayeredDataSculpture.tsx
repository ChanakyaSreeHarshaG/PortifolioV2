'use client';

import React, { useEffect, useRef } from 'react';

export function LayeredDataSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relativeX * 0.4;
      targetY = relativeY * 0.4;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Abstract stacked data layers configuration
    const layers = [
      { zOffset: -40, scale: 0.75, label: 'Bronze · Raw Data', color: '#DDD7CE', activeColor: '#C65D2E', opacity: 0.4, nodes: 6 },
      { zOffset: 0, scale: 0.88, label: 'Silver · Cleansed Schema', color: '#9CA3AF', activeColor: '#C65D2E', opacity: 0.65, nodes: 8 },
      { zOffset: 40, scale: 1.0, label: 'Gold · Star Schema Model', color: '#1C1C1A', activeColor: '#C65D2E', opacity: 0.9, nodes: 5 },
    ];

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth lerp movement towards cursor target
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Is Dark Theme detection
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const baseBorderColor = isDark ? 'rgba(236, 232, 225, 0.25)' : 'rgba(95, 91, 84, 0.25)';
      const accentColor = isDark ? '#E06D3B' : '#C65D2E';

      layers.forEach((layer, idx) => {
        const floatY = prefersReducedMotion ? 0 : Math.sin(time + idx * 1.2) * 4;
        const layerX = centerX + (currentX * 60 * (idx + 1) * 0.5);
        const layerY = centerY + (currentY * 40 * (idx + 1) * 0.5) + floatY + (idx - 1) * 38;

        const planeW = 200 * layer.scale;
        const planeH = 100 * layer.scale;

        ctx.save();
        ctx.translate(layerX, layerY);

        // Perspective skew transform simulating 3D data planes
        const tiltX = currentY * 0.2;
        const tiltY = currentX * 0.3;
        ctx.transform(1, tiltX, tiltY, 0.55, 0, 0);

        // Plane Fill
        ctx.fillStyle = isDark ? 'rgba(30, 28, 25, 0.6)' : 'rgba(239, 235, 227, 0.6)';
        ctx.fillRect(-planeW / 2, -planeH / 2, planeW, planeH);

        // Plane Border
        ctx.strokeStyle = idx === 2 ? accentColor : baseBorderColor;
        ctx.lineWidth = idx === 2 ? 1.5 : 1;
        ctx.strokeRect(-planeW / 2, -planeH / 2, planeW, planeH);

        // Grid lines inside data plane
        ctx.beginPath();
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 0.5;
        for (let x = -planeW / 2 + 25; x < planeW / 2; x += 25) {
          ctx.moveTo(x, -planeH / 2);
          ctx.lineTo(x, planeH / 2);
        }
        for (let y = -planeH / 2 + 25; y < planeH / 2; y += 25) {
          ctx.moveTo(-planeW / 2, y);
          ctx.lineTo(planeW / 2, y);
        }
        ctx.stroke();

        // Node points on Gold layer
        if (idx === 2) {
          const nodes = [
            { x: -planeW * 0.3, y: -planeH * 0.2 },
            { x: 0, y: 0 },
            { x: planeW * 0.3, y: planeH * 0.2 },
            { x: -planeW * 0.2, y: planeH * 0.25 },
            { x: planeW * 0.25, y: -planeH * 0.3 }
          ];

          // Connecting data relationships
          ctx.beginPath();
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[0].x, nodes[0].y);
          ctx.lineTo(nodes[1].x, nodes[1].y);
          ctx.lineTo(nodes[2].x, nodes[2].y);
          ctx.moveTo(nodes[1].x, nodes[1].y);
          ctx.lineTo(nodes[3].x, nodes[3].y);
          ctx.moveTo(nodes[1].x, nodes[1].y);
          ctx.lineTo(nodes[4].x, nodes[4].y);
          ctx.stroke();

          nodes.forEach((node) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.fill();
          });
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-right-sculpture" title="Abstract Data Layer Model">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
export default LayeredDataSculpture;
