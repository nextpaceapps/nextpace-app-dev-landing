import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SharedProps } from '../../types';
import styles from './Hero.module.scss';

const Hero: React.FC<SharedProps> = ({ onOpenContact }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let rotation = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

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
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#e879f9';
        this.size = Math.random() * 2 + 1;
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

        const perspective = 800;
        const scale = perspective / (perspective + rz + 400); // Push back

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
        const drawSize = Math.max(0.5, this.size * scale);
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
      const spacing = 40; 
      const size = 180; // Cube radius
      
      // Create hollow cube grid
      for (let x = -size; x <= size; x += spacing) {
        for (let y = -size; y <= size; y += spacing) {
          for (let z = -size; z <= size; z += spacing) {
            // Check if point is on the surface (one coord is at +/- size)
            // Using a tolerance or exact check depending on loop
            if (Math.abs(Math.abs(x) - size) < 1 || 
                Math.abs(Math.abs(y) - size) < 1 || 
                Math.abs(Math.abs(z) - size) < 1) {
              particles.push(new Particle(x, y, z));
            }
          }
        }
      }
    };

    const animate = () => {
      // Clear with fade for trails
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Always rotate cube
      rotation.x += 0.005;
      rotation.y += 0.008;

      particles.forEach(p => p.update(centerX, centerY));
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />
      
      {/* Dark overlay to ensure text readability */}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ pointerEvents: 'auto' }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot}>
              <span className={styles.badgePing}></span>
              <span className={styles.badgeDotInner}></span>
            </span>
            <span className={styles.badgeText}>
              Vibe coding enabled
            </span>
          </div>

          <h1 className={styles.heading}>
            GET YOUR PROJECT <br />
            <span className={styles.headingGradient}>
              DONE IN WEEKS
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.description}
        >
          We develop complex digital systems with extreme speed and quality.
          From concept to production faster than you can imagine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={styles.actions}
        >
          <button 
            onClick={onOpenContact}
            className={styles.button}
          >
            <div className={styles.buttonContent}>START PROJECT</div>
            <div className={styles.buttonBorder} />
          </button>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
