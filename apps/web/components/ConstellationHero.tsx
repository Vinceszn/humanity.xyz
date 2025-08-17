import { useEffect, useRef } from 'react';

// Simple animated SVG constellation with interactive mouse/touch parallax
export default function ConstellationHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let mouseX = 0, mouseY = 0;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = svg.getBoundingClientRect();
      if ('touches' in e && e.touches.length) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      } else if ('clientX' in e) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
    };
    svg.addEventListener('mousemove', handleMove);
    svg.addEventListener('touchmove', handleMove);
    let frame = 0;
    const animate = () => {
      frame++;
      const nodes = Array.from(svg.querySelectorAll('.node'));
      nodes.forEach((node, i) => {
        const angle = (frame / 60) + i * 0.7;
        const radius = 120 + 30 * Math.sin(frame / 80 + i);
        const x = 320 + Math.cos(angle) * radius + (mouseX - 320) * 0.05;
        const y = 160 + Math.sin(angle) * radius + (mouseY - 160) * 0.05;
        node.setAttribute('cx', x.toString());
        node.setAttribute('cy', y.toString());
      });
      // Animate lines
      const lines = Array.from(svg.querySelectorAll('.line'));
      lines.forEach((line, i) => {
        const n1 = nodes[i % nodes.length];
        const n2 = nodes[(i + 1) % nodes.length];
        line.setAttribute('x1', n1.getAttribute('cx'));
        line.setAttribute('y1', n1.getAttribute('cy'));
        line.setAttribute('x2', n2.getAttribute('cx'));
        line.setAttribute('y2', n2.getAttribute('cy'));
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      svg.removeEventListener('mousemove', handleMove);
      svg.removeEventListener('touchmove', handleMove);
    };
  }, []);
  return (
    <svg
      ref={svgRef}
      width={640}
      height={320}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-auto select-none"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    >
      {/* Lines */}
      {[...Array(10)].map((_, i) => (
        <line key={i} className="line" stroke="#a5b4fc" strokeWidth={2} />
      ))}
      {/* Nodes */}
      {[...Array(10)].map((_, i) => (
        <circle key={i} className="node" r={16} fill={`url(#g${i})`} />
      ))}
      {/* Gradients for nodes */}
      <defs>
        {[...Array(10)].map((_, i) => (
          <radialGradient key={i} id={`g${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="80%" stopColor={i % 2 ? '#6366f1' : '#a21caf'} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
          </radialGradient>
        ))}
      </defs>
    </svg>
  );
}
