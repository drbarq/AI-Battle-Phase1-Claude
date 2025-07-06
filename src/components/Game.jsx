import React, { useState, useEffect, useCallback, useRef } from 'react';
import Joystick from './Joystick';

const GRID_SIZE = { width: 15, height: 17 };
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

function Game({ gameState, difficulty, onGameOver, onPause, onResume, onRestart, score, setScore }) {
  const [snake, setSnake] = useState([{ x: 7, y: 8 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');
  const [nextDirection, setNextDirection] = useState('right');
  const gameLoopRef = useRef(null);
  const lastDirectionRef = useRef('right');

  const generateFood = useCallback((snakeBody) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE.width),
        y: Math.floor(Math.random() * GRID_SIZE.height)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const checkCollision = useCallback((head, snakeBody) => {
    if (head.x < 0 || head.x >= GRID_SIZE.width || head.y < 0 || head.y >= GRID_SIZE.height) {
      return true;
    }
    
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(currentSnake => {
      const currentDirection = nextDirection;
      const head = currentSnake[0];
      const newHead = {
        x: head.x + DIRECTIONS[currentDirection].x,
        y: head.y + DIRECTIONS[currentDirection].y
      };

      if (checkCollision(newHead, currentSnake)) {
        onGameOver(score);
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];
      
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateFood(newSnake));
        
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });

    setDirection(nextDirection);
    lastDirectionRef.current = nextDirection;
  }, [gameState, nextDirection, food, checkCollision, onGameOver, score, setScore, generateFood]);

  const handleDirectionChange = useCallback((newDirection) => {
    if (gameState !== 'playing') return;

    const opposite = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    };

    if (newDirection !== opposite[lastDirectionRef.current]) {
      setNextDirection(newDirection);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, difficulty.speed);
    } else {
      clearInterval(gameLoopRef.current);
    }

    return () => clearInterval(gameLoopRef.current);
  }, [gameState, difficulty.speed, moveSnake]);

  useEffect(() => {
    if (gameState === 'playing') {
      setSnake([{ x: 7, y: 8 }]);
      setFood({ x: 5, y: 5 });
      setDirection('right');
      setNextDirection('right');
      lastDirectionRef.current = 'right';
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          handleDirectionChange('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          handleDirectionChange('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          handleDirectionChange('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          handleDirectionChange('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, handleDirectionChange]);

  const renderCell = (x, y) => {
    const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.some((segment, index) => 
      index > 0 && segment.x === x && segment.y === y
    );
    const isFood = food.x === x && food.y === y;

    let className = 'cell';
    if (isSnakeHead) className += ' snake-cell snake-head';
    else if (isSnakeBody) className += ' snake-cell';
    else if (isFood) className += ' food-cell';

    return (
      <div
        key={`${x}-${y}`}
        className={className}
      />
    );
  };

  return (
    <>
      <div className="score-display">
        Score: {score}
      </div>
      
      <button 
        className="pause-button"
        onClick={gameState === 'playing' ? onPause : onResume}
      >
        {gameState === 'playing' ? '⏸️' : '▶️'}
      </button>

      <div className="game-board">
        {Array.from({ length: GRID_SIZE.height }, (_, y) =>
          Array.from({ length: GRID_SIZE.width }, (_, x) => renderCell(x, y))
        )}
      </div>

      <Joystick 
        onDirectionChange={handleDirectionChange}
        disabled={gameState !== 'playing'}
      />

      {gameState === 'gameOver' && (
        <div className="game-over-screen">
          <h2 className="game-over-title">Game Over!</h2>
          <p className="final-score">Final Score: {score}</p>
          <button className="restart-button" onClick={onRestart}>
            Play Again
          </button>
        </div>
      )}

      {gameState === 'paused' && (
        <div className="game-over-screen">
          <h2 className="game-over-title">Paused</h2>
          <button className="restart-button" onClick={onResume}>
            Resume
          </button>
        </div>
      )}
    </>
  );
}

export default Game;