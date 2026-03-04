import React, { useState } from 'react';
import type { Player } from '../hooks/useGame';
import styles from './GameSettings.module.css';

interface GameSettingsProps {
  onStartGame: (size: number, player: Player) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onStartGame }) => {
  const [boardSize, setBoardSize] = useState<number>(20);
  const [player, setPlayer] = useState<Player>('black');
  const [error, setError] = useState<string>('');

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setBoardSize(value);
    
    if (isNaN(value) || value < 20 || value > 50) {
      setError('Size must be between 20 and 50');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNaN(boardSize) && boardSize >= 20 && boardSize <= 50) {
      onStartGame(boardSize, player);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GOMOKU</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Board Size (20-50):</label>
          <input
            type="number"
            value={boardSize}
            onChange={handleSizeChange}
            className={styles.input}
            min="20"
            max="50"
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Play As:</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="black"
                checked={player === 'black'}
                onChange={() => setPlayer('black')}
                className={styles.radio}
              />
              Black (First)
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="white"
                checked={player === 'white'}
                onChange={() => setPlayer('white')}
                className={styles.radio}
              />
              White (Second)
            </label>
          </div>
        </div>

        <button type="submit" className={styles.startButton} disabled={!!error}>
          Start Game
        </button>
      </form>
    </div>
  );
};

export default GameSettings;
