# Mobile Snake Game

A mobile-first Snake game built with React, optimized for smartphone touch screens and designed for seamless Vercel deployment. Features a responsive 15x17 grid, virtual joystick controls, haptic feedback, and multiple difficulty levels.

## 🎮 Features

- **Mobile-Optimized**: Touch-friendly virtual joystick controls
- **Responsive Design**: Fixed 15x17 grid that adapts to all screen sizes
- **Haptic Feedback**: Vibration feedback on food collection (where supported)
- **Three Difficulty Levels**: Easy (200ms), Medium (150ms), Hard (100ms)
- **High Score Tracking**: Persistent local storage for best scores
- **Smooth Gameplay**: 60fps animations with requestAnimationFrame
- **Keyboard Support**: WASD and arrow key controls for desktop

## Code Stats
      17 text files.
      13 unique files.
       5 files ignored.

github.com/AlDanial/cloc v 2.06  T=0.01 s (1816.7 files/s, 169650.3 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSX                              6             77              0            449
CSS                              1             40              0            297
Markdown                         3             87              0            236
HTML                             1              0              0             16
JavaScript                       1              1              1              9
SVG                              1              0              0              1
-------------------------------------------------------------------------------
SUM:                            13            205              1           1008
-------------------------------------------------------------------------------

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mobile-snake-game

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint

# Deployment
vercel --prod        # Deploy to Vercel
```

## 🎯 How to Play

### Mobile Controls
- Use the virtual joystick at the bottom of the screen
- Tap and drag to control snake direction
- Tap the pause button to pause/resume

### Desktop Controls
- **Arrow Keys** or **WASD**: Move snake
- **Space**: Pause/Resume
- **Enter**: Start game (from intro screen)
- **R**: Restart (from game over screen)

### Game Rules
- Collect food to grow and increase score
- Avoid hitting walls or your own tail
- Each food item gives 10 points
- Game speed increases with difficulty level

## 🏗️ Project Structure

```
src/
├── App.jsx              # Main app component with game state management
├── main.jsx             # React entry point
├── index.css            # Global styles
└── components/
    ├── Game.jsx         # Core game logic and rendering
    ├── IntroScreen.jsx  # Welcome screen
    ├── Joystick.jsx     # Virtual joystick component
    └── Settings.jsx     # Difficulty selection
```

## 🔧 Technical Details

### Architecture
- **React Hooks**: State management with useState and useEffect
- **Game Loop**: setInterval-based movement with collision detection
- **Grid System**: CSS Grid layout for consistent game board
- **Touch Events**: Optimized touch handling for mobile devices

### Key Features
- **Collision Detection**: Wall and self-collision checking
- **Food Generation**: Random placement avoiding snake body
- **State Management**: Intro, playing, paused, and game over states
- **Local Storage**: High score persistence across sessions

### Mobile Optimizations
- Fixed-position virtual joystick for thumb-friendly controls
- Haptic feedback using `navigator.vibrate()`
- Responsive design maintaining 15x17 grid across devices
- Touch event preventDefault for better mobile experience
- Battery-conscious animation loops

## 🌐 Deployment

The game is optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel --prod
```

### Build Output
- Static files generated in `dist/` directory
- Optimized for CDN delivery
- Compatible with any static hosting service

## 🎨 Customization

### Difficulty Levels
Modify difficulty settings in `App.jsx`:
```javascript
const DIFFICULTIES = {
  easy: { speed: 200, name: 'Easy' },
  medium: { speed: 150, name: 'Medium' },
  hard: { speed: 100, name: 'Hard' }
};
```

### Grid Size
Adjust grid dimensions in `Game.jsx`:
```javascript
const GRID_SIZE = { width: 15, height: 17 };
```

### Styling
- CSS classes in `index.css`
- Game board uses CSS Grid
- Mobile-first responsive design

## 📱 Browser Support

- Modern mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Haptic feedback requires browser support for `navigator.vibrate()`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).