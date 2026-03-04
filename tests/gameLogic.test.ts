import { describe, it, expect } from 'vitest';
import { checkWin, checkDraw, BoardState } from '../src/utils/gameLogic';

const createEmptyBoard = (size: number): BoardState => 
  Array(size).fill(null).map(() => Array(size).fill(null));

describe('Game Logic', () => {
  it('should detect horizontal win', () => {
    const board = createEmptyBoard(20);
    for (let i = 0; i < 5; i++) {
      board[10][5 + i] = 'black';
    }
    expect(checkWin(board, 10, 9, 'black')).toBe(true);
  });

  it('should detect vertical win', () => {
    const board = createEmptyBoard(20);
    for (let i = 0; i < 5; i++) {
      board[5 + i][10] = 'white';
    }
    expect(checkWin(board, 9, 10, 'white')).toBe(true);
  });

  it('should detect diagonal win', () => {
    const board = createEmptyBoard(20);
    for (let i = 0; i < 5; i++) {
      board[5 + i][5 + i] = 'black';
    }
    expect(checkWin(board, 9, 9, 'black')).toBe(true);
  });

  it('should detect anti-diagonal win', () => {
    const board = createEmptyBoard(20);
    for (let i = 0; i < 5; i++) {
      board[5 + i][9 - i] = 'white';
    }
    expect(checkWin(board, 9, 5, 'white')).toBe(true);
  });

  it('should not detect win for less than 5', () => {
    const board = createEmptyBoard(20);
    for (let i = 0; i < 4; i++) {
      board[10][5 + i] = 'black';
    }
    expect(checkWin(board, 10, 8, 'black')).toBe(false);
  });

  it('should detect draw', () => {
    const board = createEmptyBoard(20);
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        board[i][j] = 'black';
      }
    }
    expect(checkDraw(board)).toBe(true);
  });

  it('should not detect draw if empty cells exist', () => {
    const board = createEmptyBoard(20);
    board[0][0] = 'black';
    expect(checkDraw(board)).toBe(false);
  });
});
