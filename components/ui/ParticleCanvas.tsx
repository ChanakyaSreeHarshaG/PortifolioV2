'use client';

import React, { useEffect, useRef } from 'react';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 35; // dot grid resolution
    const mouse: { x: number | null; y: number | null; radius: number } = {
      x: null,
      y: null,
      radius: 120,
    };

    class Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = 1.5;
        this.color = 'rgba(0, 212, 212, 0.12)';
        this.density = Math.random() * 15 + 8;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;

            const pushForce = force * this.density;
            this.x -= directionX * pushForce;
            this.y -= directionY * pushForce;

            // Light up
            const alpha = 0.12 + force * 0.65;
            this.color = `rgba(0, 212, 212, ${alpha})`;
            this.size = 1.5 + force * 1.5;
            return;
          }
        }

        const dx2 = this.x - this.baseX;
        const dy2 = this.y - this.baseY;

        if (this.x !== this.baseX) {
          this.x -= dx2 / 10;
        }
        if (this.y !== this.baseY) {
          this.y -= dy2 / 10;
        }

        this.color = 'rgba(0, 212, 212, 0.12)';
        this.size = 1.5;
      }
    }

    let dots: Dot[] = [];

    const initDots = (width: number, height: number) => {
      dots = [];
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          dots.push(new Dot(x, y));
        }
      }
    };

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initDots(canvas.width, canvas.height);
    };

    resizeCanvas();

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        dots[i].update();
        dots[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const parent = canvas.parentElement;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
