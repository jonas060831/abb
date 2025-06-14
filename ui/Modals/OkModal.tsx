'use client';

import { useRouter } from 'next/navigation';
import styles from './OkModal.module.css';
import { ReactNode } from 'react';

interface OkModalProps {
  show: boolean;
  title?: string;
  message: ReactNode;
  onClose: () => void;
  redirectUrl?: string; 
}

const OkModal: React.FC<OkModalProps> = ({ show, title, message, onClose, redirectUrl }) => {
  
  const router = useRouter()

  const handleClose = () => {
    onClose()

    if(redirectUrl) router.push(redirectUrl)
  }
  
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.message}>{message}</div>
        <button className={styles.okButton} onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default OkModal;
