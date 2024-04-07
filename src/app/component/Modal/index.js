import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'; 

const Modal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
     
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const closeModal = () => {
    setVisible(false);
    onClose();
  };

  return (
    <>
      {visible &&
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Congratulations!</h2>
              <button className={styles.closeBtn} onClick={closeModal}>X</button>
            </div>
            <div className={styles.modalBody}>
              <p>Payment Successfull</p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
