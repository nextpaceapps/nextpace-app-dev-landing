import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Database, Globe, Smartphone, Cloud, Server, Box } from 'lucide-react';
import styles from './Services.module.scss';

// Import PNG images using Vite static imports
import awsImg from '../../theme/images/aws.png';
import azureImg from '../../theme/images/azure.png';
import csharpImg from '../../theme/images/csharp.png';
import dotnetImg from '../../theme/images/dotnet.png';
import fastifyImg from '../../theme/images/fastify.png';
import firebaseImg from '../../theme/images/firebase.png';
import gcloudImg from '../../theme/images/gcloud.png';
import nodejsImg from '../../theme/images/nodejs.png';
import postgresqlImg from '../../theme/images/postgresql.png';
import reactImg from '../../theme/images/react.png';

// Image mapping: technology label -> PNG image path
const TECH_IMAGE_MAP: Record<string, string> = {
  'AWS': awsImg,
  'Azure': azureImg,
  'C#': csharpImg,
  '.NET': dotnetImg,
  'Fastify': fastifyImg,
  'Firebase': firebaseImg,
  'Google Cloud': gcloudImg,
  'Node.js': nodejsImg,
  'PostgreSQL': postgresqlImg,
  'React': reactImg,
};

const services = [
  {
    icon: Zap,
    title: "High-Speed Dev",
    desc: "Rapid MVP development and scalable solutions.",
    color: "text-cyan-400"
  },
  {
    icon: Database,
    title: "Backend Systems",
    desc: "High-load architecture and distributed microservices.",
    color: "text-fuchsia-400"
  },
  {
    icon: Globe,
    title: "Web Applications",
    desc: "React, Next.js, WebGL. Immersive interactive experiences.",
    color: "text-cyan-400"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Cross-platform apps with React Native and modern frameworks.",
    color: "text-fuchsia-400"
  },
  {
    icon: Box,
    title: ".NET Ecosystem",
    desc: "Enterprise-grade solutions using C# and .NET Core.",
    color: "text-cyan-400"
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Rapid setup in Azure, Google Cloud, and AWS.",
    color: "text-fuchsia-400"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            TECHNOLOGY STACK
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className={styles.divider}
          />
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={styles.card}
            >
              <div className={styles.iconContainer}>
                <service.icon className={`${styles.icon} ${service.color === 'text-cyan-400' ? styles.iconCyan : styles.iconFuchsia}`} />
              </div>
              <h3 className={styles.cardTitle}>
                {service.title}
              </h3>
              <p className={styles.cardDescription}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Octagons */}
        <div className={styles.techContainer}>
           <TechOctagon label="AWS" color="cyan" index={0} />
           <TechOctagon label="Azure" color="fuchsia" index={1} />
           <TechOctagon label="C#" color="cyan" index={2} />
           <TechOctagon label=".NET" color="fuchsia" index={3} />
           <TechOctagon label="Fastify" color="cyan" index={4} />
           <TechOctagon label="Firebase" color="fuchsia" index={5} />
           <TechOctagon label="Google Cloud" color="cyan" index={6} />
           <TechOctagon label="Node.js" color="fuchsia" index={7} />
           <TechOctagon label="PostgreSQL" color="cyan" index={8} />
           <TechOctagon label="React" color="fuchsia" index={9} />
        </div>
      </div>
    </section>
  );
};

interface TechOctagonProps {
  label: string;
  color: 'cyan' | 'fuchsia';
  imagePath?: string;
  index: number;
}

const TechOctagon: React.FC<TechOctagonProps> = ({ label, color, imagePath, index }) => {
  const borderColor = color === 'cyan' ? '#06b6d4' : '#e879f9';
  const [imageError, setImageError] = useState(false);

  // Get image path from mapping if not provided
  const imgPath = imagePath || TECH_IMAGE_MAP[label] || '';

  const handleImageError = () => {
    setImageError(true);
  };

  // Show fallback text if no image path or image failed to load
  const shouldShowFallback = !imgPath || imageError;
  
  // Wave animation: each icon moves up and down with a delay based on index
  const waveAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: index * 0.15,
      ease: "easeInOut"
    }
  };
  
  return (
    <motion.div 
      animate={waveAnimation}
      whileHover={{ scale: 1.05 }}
      className={styles.techItem}
    >
      <div className={styles.techIcon}>
        {/* SVG Octagon Border */}
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}>
          <polygon 
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" 
            fill="none" 
            stroke={borderColor} 
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <polygon 
             points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" 
             fill={borderColor}
             fillOpacity="0.08"
          />
        </svg>
        
        {/* Image or Fallback Container */}
        {shouldShowFallback ? (
          <div className={styles.techFallback}>
            {label}
          </div>
        ) : (
          <img
            src={imgPath}
            alt={label}
            className={styles.techImage}
            onError={handleImageError}
          />
        )}
      </div>
      <span className={styles.techLabel}>{label}</span>
    </motion.div>
  );
}

export default Services;