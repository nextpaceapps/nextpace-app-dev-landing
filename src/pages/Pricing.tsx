import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Code, Layers, Rocket, Clock, Ban } from 'lucide-react';
import { SharedProps } from '../../types';
import styles from './Pricing.module.scss';

const tiers = [
  {
    id: 1,
    name: "Micro Tasks",
    price: "€75 – €150",
    time: "15 – 60 min",
    icon: Zap,
    desc: "Instant fixes and adjustments.",
    features: [
      "Fix bug in Node API",
      "Add one endpoint",
      "Adjust CORS configuration",
      "Update CI/CD pipeline step",
      "Add environment variable",
      "Azure Function hotfix",
      "Small cloud IAM change"
    ],
    color: "from-cyan-400 to-cyan-600",
    borderColor: "group-hover:border-cyan-400/50",
    shadow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    iconColor: "text-cyan-400"
  },
  {
    id: 2,
    name: "Small Features",
    price: "€250 – €450",
    time: "1 – 3 hours",
    icon: Code,
    desc: "Specific functionality implementation.",
    features: [
      "New endpoint + validation",
      "Add OAuth to backend",
      "Add Redis caching",
      "Logging & Alerts in Azure",
      "Cloud Run / Lambda deploy",
      "Basic GitHub pipeline"
    ],
    color: "from-fuchsia-400 to-fuchsia-600",
    borderColor: "group-hover:border-fuchsia-400/50",
    shadow: "group-hover:shadow-[0_0_30px_rgba(232,121,249,0.2)]",
    iconColor: "text-fuchsia-400"
  },
  {
    id: 3,
    name: "Medium Project",
    price: "€600 – €1,200",
    time: "0.5 – 1 day",
    icon: Layers,
    desc: "Substantial integrations & migrations.",
    features: [
      "CRUD Microservice (Node/.NET)",
      "External API Integration",
      "Containerize App + Cloud Deploy",
      "GitHub Actions CI/CD + IaC",
      "Mongo to Postgres Migration",
      "Stripe Billing Integration"
    ],
    color: "from-violet-400 to-violet-600",
    borderColor: "group-hover:border-violet-400/50",
    shadow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]",
    iconColor: "text-violet-400"
  },
  {
    id: 4,
    name: "Full System",
    price: "€1,500 – €3,000",
    time: "2 – 5 days",
    icon: Rocket,
    desc: "Production-ready architecture.",
    features: [
      "Full Microservice (DB+IAM+CI/CD)",
      "Production Kubernetes Setup",
      "Cloud Infrastructure (Azure/AWS)",
      "Serverless Architecture",
      "Multi-env Deployment",
      "Logging + Monitoring Stack"
    ],
    color: "from-blue-400 to-blue-600",
    borderColor: "group-hover:border-blue-400/50",
    shadow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
    iconColor: "text-blue-400"
  }
];

const Pricing: React.FC<SharedProps> = ({ onOpenContact }) => {
  const getIconClass = (iconColor: string) => {
    if (iconColor.includes('cyan')) return styles.iconCyan;
    if (iconColor.includes('fuchsia')) return styles.iconFuchsia;
    if (iconColor.includes('violet')) return styles.iconViolet;
    if (iconColor.includes('blue')) return styles.iconBlue;
    return styles.iconCyan;
  };

  const getPriceClass = (color: string) => {
    if (color.includes('cyan-400')) return styles.priceCyan;
    if (color.includes('fuchsia')) return styles.priceFuchsia;
    if (color.includes('violet')) return styles.priceViolet;
    if (color.includes('blue')) return styles.priceBlue;
    return styles.priceCyan;
  };

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.radialGradient} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.badge}
          >
            <span className={styles.badgeContent}>
              <Ban size={16} /> NO HOURLY RATES
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            FIXED PRICE. <br className="md:hidden" />
            <span className={styles.titleGradient}>
              EXTREME SPEED.
            </span>
          </motion.h2>
          
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className={styles.subtitle}
          >
            You pay for outcomes, not time. We leverage our speed to give you better prices while delivering faster than anyone else.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.card}
            >
              {/* Header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <tier.icon className={`${styles.icon} ${getIconClass(tier.iconColor)}`} />
                </div>
                <h3 className={styles.cardTitle}>{tier.name}</h3>
                <p className={styles.cardDesc}>{tier.desc}</p>
              </div>

              {/* Price & Time */}
              <div className={styles.priceSection}>
                <div className={`${styles.price} ${getPriceClass(tier.color)}`}>
                  {tier.price}
                </div>
                <div className={styles.timeInfo}>
                  <Clock size={14} className={getIconClass(tier.iconColor)} />
                  {tier.time}
                </div>
              </div>

              {/* Features List */}
              <ul className={styles.featuresList}>
                {tier.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <Check size={16} className={`${styles.featureIcon} ${getIconClass(tier.iconColor)}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Glow Effect */}
              <div className={styles.hoverGlow} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={styles.cta}
        >
          <button 
            onClick={onOpenContact}
            className={styles.ctaButton}
          >
            Start a Micro-Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
