import React from 'react';
import type { Player } from '../hooks/useGame';
import styles from './WinnerModal.module.css';

interface WinnerModalProps {
  isOpen: boolean;
  winner: Player | null;
  onClose: () => void;
  onNewGame: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, winner, onClose, onNewGame }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Game Over</h2>
        <div className={styles.message}>
          {winner ? (
            <>
              Winner: <span className={`${styles.winner} ${styles[winner]}`}>{winner}</span>
            </>
          ) : (
            'Draw!'
          )}
        </div>
        <div className={styles.actions}>
          <button className={styles.button} onClick={onNewGame}>New Game</button>
          <button className={`${styles.button} ${styles.secondary}`} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
