import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import styles from './ContactModal.module.scss';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation finishes
    setTimeout(() => {
      setStep('form');
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className={styles.backdrop}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={styles.modalWrapper}
          >
            <div className={styles.modal}>
              
              {/* Header */}
              <div className={styles.header}>
                <h3 className={styles.headerTitle}>
                  {step === 'form' ? 'START YOUR PROJECT' : 'MESSAGE SENT'}
                </h3>
                <button 
                  onClick={handleClose}
                  className={styles.closeButton}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className={styles.content}>
                {step === 'form' ? (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="you@company.com"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Project Idea / Requirements
                      </label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Tell us about what you want to build..."
                        className={`${styles.input} ${styles.textarea}`}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <button 
                        type="submit"
                        className={styles.submitButton}
                      >
                        <Send size={18} /> SEND REQUEST
                      </button>
                      <p className={styles.submitNote}>
                        We usually respond within 2 hours.
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className={styles.successContent}>
                    <div className={styles.successIcon}>
                      <CheckCircle size={40} />
                    </div>
                    <h4 className={styles.successTitle}>Received!</h4>
                    <p className={styles.successMessage}>
                      Our team is already reviewing your request. Expect an email from us shortly.
                    </p>
                    <button 
                      onClick={handleClose}
                      className={styles.closeButtonSecondary}
                    >
                      CLOSE
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative bottom line */}
              <div className={styles.decorativeLine} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
