import React from 'react';
import styles from './Modal.module.scss'

const Modal = ({isActive, setIsActive, children}) => {
    return (
        <div className={isActive ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setIsActive(false)}>
            <div className={isActive ? `${styles.modal__content} ${styles.active}` : styles.modal__content}  onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;