import React from 'react';

function IntroScreen({ onStartGame, onOpenSettings, highScore }) {
  return (
    <div className="intro-screen">
      <h1 className="intro-title">🐍 Snake Game</h1>
      <p className="intro-subtitle">
        Swipe or use the joystick to control your snake
      </p>
      {highScore > 0 && (
        <p className="intro-subtitle">
          High Score: {highScore}
        </p>
      )}
      <button className="start-button" onClick={onStartGame}>
        Start Game
      </button>
      <button className="settings-button" onClick={onOpenSettings}>
        Settings
      </button>
    </div>
  );
}

export default IntroScreen;