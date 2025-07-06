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
      <div className="logo-container">
        <a href="https://www.tiktok.com/@vibinwiththechef" target="_blank" rel="noopener noreferrer">
          <img src="/Images/logo.png" alt="Game Logo" className="intro-logo" />
        </a>
      </div>
    </div>
  );
}

export default IntroScreen;