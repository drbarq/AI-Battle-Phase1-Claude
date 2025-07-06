import React from 'react';

function Settings({ difficulty, onDifficultyChange, onClose }) {
  const difficulties = [
    { key: 'easy', name: 'Easy', description: 'Slow pace' },
    { key: 'medium', name: 'Medium', description: 'Normal pace' },
    { key: 'hard', name: 'Hard', description: 'Fast pace' }
  ];

  return (
    <div className="settings-panel">
      <button className="close-settings" onClick={onClose}>
        ×
      </button>
      <h3 className="settings-title">Difficulty</h3>
      <div className="difficulty-options">
        {difficulties.map(({ key, name, description }) => (
          <button
            key={key}
            className={`difficulty-button ${difficulty === key ? 'active' : ''}`}
            onClick={() => onDifficultyChange(key)}
          >
            <div>{name}</div>
            <small>{description}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Settings;