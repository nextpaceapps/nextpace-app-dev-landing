import React, { useEffect, useRef } from 'react';

interface AnimatedCubeProps {
  size?: number; // Size of the cube container (default: 96px for 6rem)
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ size = 96 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    canvas.width = size;
    canvas.height = size;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let rotation = { x: 0, y: 0 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      tx: number; // Target x (cube space)
      ty: number;
      tz: number;
      color: string;
      size: number;

      constructor(tx: number, ty: number, tz: number) {
        this.tx = tx;
        this.ty = ty;
        this.tz = tz;
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        // Default colors: cyan and fuchsia mix (as per clarifications)
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#e879f9';
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles for octagon
      }

      update(centerX: number, centerY: number) {
        // 1. Calculate Target Position (Cube Rotation)
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        let rx = this.tx * cosY - this.tz * sinY;
        let rz = this.tx * sinY + this.tz * cosY;
        let ry = this.ty * cosX - rz * sinX;
        rz = this.ty * sinX + rz * cosX;

        const perspective = 400; // Reduced perspective for smaller cube
        const scale = perspective / (perspective + rz + 200); // Push back

        const targetX = centerX + rx * scale;
        const targetY = centerY + ry * scale;

        // 2. Physics (Velocity + Spring)
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        
        // Spring force
        const force = 0.02; 
        
        this.vx += dx * force;
        this.vy += dy * force;
        
        // Friction
        const friction = 0.92;
        this.vx *= friction;
        this.vy *= friction;

        this.x += this.vx;
        this.y += this.vy;

        // 3. Draw
        const drawSize = Math.max(0.3, this.size * scale);
        const alpha = Math.max(0.1, Math.min(1, scale));

        if (ctx) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, drawSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const spacing = 20; // Reduced spacing for smaller cube
      const cubeSize = 60; // Smaller cube radius for octagon container
      
      // Create hollow cube grid
      for (let x = -cubeSize; x <= cubeSize; x += spacing) {
        for (let y = -cubeSize; y <= cubeSize; y += spacing) {
          for (let z = -cubeSize; z <= cubeSize; z += spacing) {
            // Check if point is on the surface (one coord is at +/- cubeSize)
            if (Math.abs(Math.abs(x) - cubeSize) < 1 || 
                Math.abs(Math.abs(y) - cubeSize) < 1 || 
                Math.abs(Math.abs(z) - cubeSize) < 1) {
              particles.push(new Particle(x, y, z));
            }
          }
        }
      }
    };

    const animate = () => {
      // Clear with fade for trails
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Slightly more opaque for visibility
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Always rotate cube
      rotation.x += 0.005;
      rotation.y += 0.008;

      particles.forEach(p => p.update(centerX, centerY));
      
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        inset: 0,
        zIndex: 5
      }} 
    />
  );
};

export default AnimatedCube;

