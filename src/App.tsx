import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Zap } from 'lucide-react';
import { ThemeProvider } from '../theme';
import LoadingScreen from './components/LoadingScreen';
import Hero from './pages/Hero';
import Navbar from './components/Navbar';
import Services from './pages/Services';
import Process from './pages/Process';
import Pricing from './pages/Pricing';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <ThemeProvider initialTheme="neonic">
      <div className={styles.app}>
        <AnimatePresence mode='wait'>
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.main}
          >
            <Navbar onOpenContact={handleOpenContact} />
            <Hero onOpenContact={handleOpenContact} />
            <Services />
            <Process onOpenContact={handleOpenContact} />
            <Pricing onOpenContact={handleOpenContact} />
            
            <footer className={styles.footer}>
              <div className={styles.footerContainer}>
                 <div className={styles.footerCard}>
                    <div className={styles.footerBadge}>
                       <Zap size={16} fill="currentColor" />
                       <span className={styles.footerBadgeText}>Demo Project</span>
                    </div>
                    <p className={styles.footerText}>
                      This website serves as a live demonstration of our speed. It was designed, developed, and deployed in <span className={styles.footerTextBold}>under 24 hours</span>.
                      <br /><br />
                      <span className={styles.footerTech}>
                        Built with <span className={styles.footerTechItem}>React</span> • Hosted on <span className={styles.footerTechItem}>Firebase</span> • Emails via <span className={styles.footerTechItem}>AWS SES</span> • Powered by Custom CRM
                      </span>
                    </p>
                    
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                    >
                      <Github size={18} />
                      <span className={styles.footerLinkText}>View Source on GitHub</span>
                    </a>
                 </div>

                <p className={styles.footerCopyright}>
                  © {new Date().getFullYear()} Next Pace Development. All systems operational.
                </p>
              </div>
            </footer>

            <Footer />

            <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
          </motion.main>
        )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
