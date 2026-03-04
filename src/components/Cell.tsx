import React, { memo } from 'react';
import type { CellValue, Player } from '../utils/gameLogic';
import styles from './Cell.module.css';

interface CellProps {
  row: number;
  col: number;
  value: CellValue;
  onClick: (row: number, col: number) => void;
  currentPlayer: Player;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = memo(({ row, col, value, onClick, currentPlayer, disabled }) => {
  const handleClick = () => {
    if (!disabled && !value) {
      onClick(row, col);
    }
  };

  return (
    <div
      className={`${styles.cell} ${!value && !disabled ? styles.playable : ''}`}
      onClick={handleClick}
      data-row={row}
      data-col={col}
    >
      {!value && !disabled && (
        <div className={`${styles.preview} ${styles[currentPlayer]}`} />
      )}
      {value && <div className={`${styles.piece} ${styles[value]}`} />}
    </div>
  );
});

export default Cell;
