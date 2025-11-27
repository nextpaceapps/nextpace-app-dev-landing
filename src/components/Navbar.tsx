import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Zap } from 'lucide-react';
import { SharedProps } from '../../types';
import styles from './Navbar.module.scss';

const Navbar: React.FC<SharedProps> = ({ onOpenContact }) => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
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
