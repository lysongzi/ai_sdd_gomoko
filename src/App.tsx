import { useState } from 'react';
import { useGame } from './hooks/useGame';
import type { Player } from './hooks/useGame';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import WinnerModal from './components/WinnerModal';
import GameSettings from './components/GameSettings';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [boardSize, setBoardSize] = useState(20);
  const [initialPlayer, setInitialPlayer] = useState<Player>('black');

  const {
    board,
    currentPlayer,
    gameStatus,
    winner,
    makeMove,
    resetGame
  } = useGame({ boardSize, initialPlayer });

  const handleStartGame = (size: number, player: Player) => {
    setBoardSize(size);
    setInitialPlayer(player);
    resetGame(size, player);
    setIsPlaying(true);
  };

  const handleNewGame = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    resetGame(boardSize, initialPlayer);
  };

  if (!isPlaying) {
    return <GameSettings onStartGame={handleStartGame} />;
  }

  return (
    <div className="app-container">
      <h1 className="game-title">GOMOKU</h1>
      <GameInfo
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
        winner={winner}
        onReset={handleReset}
      />
      <Board
        board={board}
        onCellClick={makeMove}
        currentPlayer={currentPlayer}
        disabled={gameStatus !== 'playing'}
      />
      <WinnerModal
        isOpen={gameStatus !== 'playing'}
        winner={winner}
        onClose={() => {}} // Modal stays open until New Game is clicked
        onNewGame={handleNewGame}
      />
    </div>
  );
}

export default App;
