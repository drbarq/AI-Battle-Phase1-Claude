import React, { useState, useEffect, useCallback } from 'react';
import Game from './components/Game';
import IntroScreen from './components/IntroScreen';
import Settings from './components/Settings';

const DIFFICULTIES = {
  easy: { speed: 200, name: 'Easy' },
  medium: { speed: 150, name: 'Medium' },
  hard: { speed: 100, name: 'Hard' }
};

function App() {
  const [gameState, setGameState] = useState('intro');
  const [difficulty, setDifficulty] = useState('medium');
  const [showSettings, setShowSettings] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setShowSettings(false);
  }, []);

  const gameOver = useCallback((finalScore) => {
    setGameState('gameOver');
    setScore(finalScore);
    
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('snakeHighScore', finalScore.toString());
    }
  }, [highScore]);

  const restartGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState('paused');
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && gameState === 'intro') {
        startGame();
      } else if (e.key === ' ' && gameState === 'playing') {
        pauseGame();
      } else if (e.key === ' ' && gameState === 'paused') {
        resumeGame();
      } else if (e.key === 'r' && gameState === 'gameOver') {
        restartGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, startGame, pauseGame, resumeGame, restartGame]);

  if (gameState === 'intro') {
    return (
      <IntroScreen 
        onStartGame={startGame} 
        onOpenSettings={openSettings}
        highScore={highScore}
      />
    );
  }

  return (
    <div className="game-container">
      <Game
        gameState={gameState}
        difficulty={DIFFICULTIES[difficulty]}
        onGameOver={gameOver}
        onPause={pauseGame}
        onResume={resumeGame}
        onRestart={restartGame}
        score={score}
        setScore={setScore}
      />
      
      {showSettings && (
        <Settings
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          onClose={closeSettings}
        />
      )}
    </div>
  );
}

export default App;