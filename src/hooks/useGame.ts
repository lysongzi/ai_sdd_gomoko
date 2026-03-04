import { useState, useCallback } from 'react';
import { checkWin, checkDraw } from '../utils/gameLogic';
import type { BoardState, Player } from '../utils/gameLogic';

export type GameStatus = 'playing' | 'won' | 'draw';
export type { Player };

interface UseGameProps {
  boardSize: number;
  initialPlayer: Player;
}

export const useGame = ({ boardSize, initialPlayer }: UseGameProps) => {
  const [board, setBoard] = useState<BoardState>(() =>
    Array(boardSize).fill(null).map(() => Array(boardSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(initialPlayer);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winner, setWinner] = useState<Player | null>(null);

  const resetGame = useCallback((size: number, player: Player) => {
    setBoard(Array(size).fill(null).map(() => Array(size).fill(null)));
    setCurrentPlayer(player);
    setGameStatus('playing');
    setWinner(null);
  }, []);

  const makeMove = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing' || board[row][col] !== null) {
      return;
    }

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, row, col, currentPlayer)) {
      setGameStatus('won');
      setWinner(currentPlayer);
    } else if (checkDraw(newBoard)) {
      setGameStatus('draw');
    } else {
      setCurrentPlayer(prev => (prev === 'black' ? 'white' : 'black'));
    }
  }, [board, currentPlayer, gameStatus]);

  return {
    board,
    currentPlayer,
    gameStatus,
    winner,
    makeMove,
    resetGame
  };
};
