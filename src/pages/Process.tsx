import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { SharedProps } from '../../types';
import styles from './Process.module.scss';

const processSteps = [
  { 
    id: 1, 
    title: "Requirements & Agreement", 
    duration: "Day 1",
    desc: "We align on business goals, timeline, and sign the contract.",
    width: "15%",
    offset: "0%",
    color: "bg-gray-600"
  },
  { 
    id: 2, 
    title: "Rapid Prototyping", 
    duration: "Days 2-4",
    desc: "Interactive mockups to visualize the final product immediately.",
    width: "20%",
    offset: "12%",
    color: "bg-cyan-500"
  },
  { 
    id: 3, 
    title: "High-Velocity Development", 
    duration: "Week 1+",
    desc: "Iterative coding sprints. You see progress every few days.",
    width: "45%",
    offset: "30%",
    color: "bg-fuchsia-500"
  },
  { 
    id: 4, 
    title: "QA & Refinement", 
    duration: "Final Days",
    desc: "Automated testing and manual polish for a bug-free experience.",
    width: "18%",
    offset: "72%",
    color: "bg-cyan-400"
  },
  { 
    id: 5, 
    title: "Launch", 
    duration: "Liftoff",
    desc: "Deployment to cloud infrastructure and handover.",
    width: "10%",
    offset: "90%",
    color: "bg-white",
    isLaunch: true
  }
];

const Process: React.FC<SharedProps> = ({ onOpenContact }) => {
  const getBarClass = (color: string) => {
    if (color === 'bg-gray-600') return styles.barGray;
    if (color === 'bg-cyan-500') return styles.barCyan;
    if (color === 'bg-fuchsia-500') return styles.barFuchsia;
    if (color === 'bg-cyan-400') return styles.barCyanLight;
    if (color === 'bg-white') return styles.barWhite;
    return styles.barCyan;
  };

  return (
    <section id="process" className={styles.section}>
      {/* Background Grid */}
      <div className={styles.gridBackground} />

      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            EXECUTION TIMELINE
          </motion.h2>
          <div className={styles.divider} />
          <p className={styles.description}>
            Our streamlined workflow ensures we move from concept to code without friction.
          </p>
        </div>

        {/* Gantt Chart Container */}
        <div className={styles.ganttContainer}>
          <div className={styles.ganttInner}>
            {/* Time Markers */}
            <div className={styles.timeMarkers}>
              <span>Start</span>
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Launch</span>
            </div>

            <div className={styles.stepsList}>
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={styles.step}
                >
                  {/* Label Row */}
                  <div className={styles.stepHeader}>
                    <h4 className={styles.stepTitle}>
                      {index + 1}. {step.title}
                    </h4>
                    <span className={styles.stepDuration}>{step.duration}</span>
                  </div>

                  {/* Bar Track */}
                  <div className={styles.barTrack}>
                    {/* Animated Bar */}
                    <motion.div
                      className={`${styles.bar} ${getBarClass(step.color)}`}
                      style={{ left: step.offset }}
                      initial={{ width: 0 }}
                      whileInView={{ width: step.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.2, ease: "circOut" }}
                    >
                      {step.isLaunch ? (
                        <Rocket className={styles.rocketIcon} />
                      ) : (
                        <div className={styles.barEnd} />
                      )}
                    </motion.div>
                    
                    {/* Description Tooltip (visible on hover) */}
                    <div className={styles.tooltip}>
                      {step.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.cta}
        >
          <h3 className={styles.ctaTitle}>Ready to break the speed limit?</h3>
          <button 
            onClick={onOpenContact}
            className={styles.ctaButton}
          >
            <span className={styles.ctaButtonContent}>
              START PROJECT <ArrowRight className={styles.arrowIcon} />
            </span>
            <div className={styles.ctaButtonOverlay} />
          </button>
          <p className={styles.ctaNote}>
            <Clock className={styles.clockIcon} /> Response time: Under 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
