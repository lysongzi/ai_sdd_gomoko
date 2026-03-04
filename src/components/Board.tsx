import React from 'react';
import type { BoardState, Player } from '../utils/gameLogic';
import Cell from './Cell';
import styles from './Board.module.css';

interface BoardProps {
  board: BoardState;
  onCellClick: (row: number, col: number) => void;
  currentPlayer: Player;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, currentPlayer, disabled }) => {
  const size = board.length;

  return (
    <div 
      className={styles.board}
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            value={cellValue}
            onClick={onCellClick}
            currentPlayer={currentPlayer}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
};

export default Board;
