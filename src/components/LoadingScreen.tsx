import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingProps } from '../../types';
import styles from './LoadingScreen.module.scss';

const LoadingScreen: React.FC<LoadingProps> = ({ onComplete }) => {
  useEffect(() => {
    // Duration for the text to appear and sit for a moment before transitioning
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          scale: 1.1, 
          filter: 'blur(10px)',
          transition: { duration: 0.8, ease: "easeInOut" } 
        }}
      >
         <motion.h1 
            initial={{ scale: 0.8, filter: 'blur(10px)', opacity: 0 }}
            animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={styles.title}
         >
           NEXT PACE
         </motion.h1>
         
         <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className={styles.divider}
         />

         <motion.p
           initial={{ opacity: 0, y: 20, letterSpacing: '0.2em' }}
           animate={{ opacity: 1, y: 0, letterSpacing: '0.8em' }}
           transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
           className={styles.subtitle}
         >
           Development
         </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;