import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * React Bits inspired interactive Quantum Radar & Particle Canvas.
 * Draws spinning quantum probability amplitudes, node connections, and orbital packets.
 */
export const QuantumRadarCanvas = ({ width = 460, height = 400 }) => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const centerY = height / 2;

    // Nodes
    const nodes = [
      { angle: 0, radius: 60, speed: 0.008, color: '#00f2fe', label: 'Q1' },
      { angle: Math.PI / 2, radius: 100, speed: -0.006, color: '#38bdf8', label: 'Q2' },
      { angle: Math.PI, radius: 140, speed: 0.004, color: '#a855f7', label: 'Q3' },
      { angle: (3 * Math.PI) / 2, radius: 175, speed: -0.003, color: '#c084fc', label: 'Q4' },
    ];

    // Background particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle concentric orbital rings
      const rings = [60, 100, 140, 175];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${0.08 + idx * 0.03})`
          : `rgba(2, 132, 199, ${0.1 + idx * 0.04})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Draw sweeping radar beam
      radarAngle += 0.012;
      const gradient = ctx.createConicGradient(radarAngle, centerX, centerY);
      gradient.addColorStop(0, isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)');
      gradient.addColorStop(0.15, isDark ? 'rgba(168, 85, 247, 0.05)' : 'rgba(124, 58, 237, 0.04)');
      gradient.addColorStop(0.2, 'transparent');
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, 175, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // 3. Draw particles and subtle entanglement links
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(168, 85, 247, ${p.alpha})` : `rgba(124, 58, 237, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${0.15 * (1 - dist / 60)})`
              : `rgba(2, 132, 199, ${0.15 * (1 - dist / 60)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      // 4. Draw rotating Quantum Nodes and entanglement lines to center
      const currentPositions = [];
      nodes.forEach(n => {
        n.angle += n.speed;
        const x = centerX + Math.cos(n.angle) * n.radius;
        const y = centerY + Math.sin(n.angle) * n.radius;
        currentPositions.push({ x, y, color: n.color, label: n.label });

        // Line to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.fillText(n.label, x + 10, y - 6);
      });

      // Draw inter-qubit entanglement lines
      ctx.beginPath();
      ctx.moveTo(currentPositions[0].x, currentPositions[0].y);
      for (let i = 1; i < currentPositions.length; i++) {
        ctx.lineTo(currentPositions[i].x, currentPositions[i].y);
      }
      ctx.closePath();
      ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. Draw Central Quantum Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#0b1120' : '#ffffff';
      ctx.strokeStyle = isDark ? '#38bdf8' : '#0284c7';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Core inner pulse
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height, isDark]);

  return (
    <div style={{ position: 'relative', width, height, margin: '0 auto' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};
export default QuantumRadarCanvas;
