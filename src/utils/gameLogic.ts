
export type Player = 'black' | 'white';
export type CellValue = Player | null;
export type BoardState = CellValue[][];

export const checkWin = (board: BoardState, lastRow: number, lastCol: number, player: Player): boolean => {
  if (lastRow < 0 || lastCol < 0 || !board[lastRow] || board[lastRow][lastCol] !== player) {
    return false;
  }

  const directions = [
    [0, 1],   // Horizontal
    [1, 0],   // Vertical
    [1, 1],   // Diagonal
    [1, -1]   // Anti-diagonal
  ];

  const size = board.length;

  for (const [dr, dc] of directions) {
    let count = 1;

    // Check forward
    for (let i = 1; i < 5; i++) {
      const r = lastRow + dr * i;
      const c = lastCol + dc * i;
      if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
        count++;
      } else {
        break;
      }
    }

    // Check backward
    for (let i = 1; i < 5; i++) {
      const r = lastRow - dr * i;
      const c = lastCol - dc * i;
      if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 5) {
      return true;
    }
  }

  return false;
};

export const checkDraw = (board: BoardState): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};
