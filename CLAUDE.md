# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mobile-first Snake game built with React, optimized for smartphone touch screens and designed for Vercel deployment. The game features a 15x17 grid, virtual joystick controls, haptic feedback, and three difficulty levels.

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

## Architecture

### Core Structure
- **React Components**: Game logic split into discrete components (Game, Snake, Food, Joystick, Settings)
- **Game State Management**: Uses React hooks (useState, useEffect) for game state and animations
- **Mobile-First Design**: Touch-optimized controls with virtual joystick interface
- **Animation System**: requestAnimationFrame-based game loop for smooth 60fps gameplay

### Key Components
- `Game.jsx`: Main game component handling game loop, collision detection, and state management
- `Snake.jsx`: Snake rendering and movement logic
- `Food.jsx`: Food generation and rendering
- `Joystick.jsx`: Virtual joystick component with touch event handling
- `Settings.jsx`: Difficulty selection and game configuration

### Game Mechanics
- **Grid System**: 15x17 fixed grid size across all devices
- **Movement**: Direction-based snake movement with collision detection
- **Difficulty**: Speed-based difficulty levels (Easy: 200ms, Medium: 150ms, Hard: 100ms)
- **Mobile Optimization**: Touch controls with haptic feedback where supported

## Mobile Optimization

The game is specifically designed for mobile devices:
- Fixed-position virtual joystick for thumb-friendly controls
- Haptic feedback integration using navigator.vibrate()
- Responsive design that maintains 15x17 grid across screen sizes
- Touch event handling optimized for mobile browsers
- Battery-conscious animation loops

## Development Notes

- Game uses CSS Grid for the game board layout
- Snake movement is handled via coordinate arrays
- Food positioning uses random generation with collision avoidance
- Game state includes: playing, paused, gameOver, and intro screens
- Touch controls prevent default browser behaviors for better mobile experience