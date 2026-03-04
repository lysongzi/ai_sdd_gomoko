import React from 'react';
import type { GameStatus, Player } from '../hooks/useGame';
import styles from './GameInfo.module.css';

interface GameInfoProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  onReset: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, gameStatus, winner, onReset }) => {
  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {gameStatus === 'playing' ? (
          <div className={styles.turn}>
            Turn: <span className={`${styles.player} ${styles[currentPlayer]}`}>{currentPlayer}</span>
          </div>
        ) : (
          <div className={styles.gameOver}>
            {gameStatus === 'won' ? (
              <span>Winner: <span className={`${styles.player} ${styles[winner!]}`}>{winner}</span></span>
            ) : (
              <span>Draw!</span>
            )}
          </div>
        )}
      </div>
      <button className={styles.resetButton} onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
};

export default GameInfo;
