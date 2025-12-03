import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { SharedProps } from '../../types';
import styles from './Navbar.module.scss';

const Navbar: React.FC<SharedProps> = ({ onOpenContact }) => {
  return (
    <motion.nav
      className={styles.nav}
    >
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Zap className={styles.logoIcon} />
            <span className={styles.logoText}>
              NEXT PACE
            </span>
          </div>
          
          <div className={styles.navLinks}>
            <div className={styles.linksList}>
              {['SERVICES', 'PROCESS', 'PRICING', 'CAREERS', 'CONTACT'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={styles.link}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={onOpenContact}
                className={styles.button}
              >
                Start Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
