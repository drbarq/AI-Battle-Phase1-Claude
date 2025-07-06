import React, { useRef, useEffect, useState } from 'react';

function Joystick({ onDirectionChange, disabled }) {
  const joystickRef = useRef(null);
  const knobRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 });
  const activeDirection = useRef(null);

  const calculateDirection = (x, y) => {
    const distance = Math.sqrt(x * x + y * y);
    if (distance < 20) return null;

    const angle = Math.atan2(y, x);
    const degrees = (angle * 180) / Math.PI;
    
    if (degrees >= -45 && degrees <= 45) return 'right';
    if (degrees >= 45 && degrees <= 135) return 'down';
    if (degrees >= -135 && degrees <= -45) return 'up';
    return 'left';
  };

  const handleMove = (clientX, clientY) => {
    if (!joystickRef.current || disabled) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    const maxDistance = 35;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    let x = deltaX;
    let y = deltaY;
    
    if (distance > maxDistance) {
      x = (deltaX / distance) * maxDistance;
      y = (deltaY / distance) * maxDistance;
    }
    
    setKnobPosition({ x, y });
    
    const direction = calculateDirection(x, y);
    if (direction && direction !== activeDirection.current) {
      activeDirection.current = direction;
      onDirectionChange(direction);
      
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const handleStart = (clientX, clientY) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(clientX, clientY);
  };

  const handleEnd = () => {
    setIsDragging(false);
    setKnobPosition({ x: 0, y: 0 });
    activeDirection.current = null;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging && e.touches.length > 0) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, disabled]);

  return (
    <div className="joystick-container">
      <div
        ref={joystickRef}
        className="joystick"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            const touch = e.touches[0];
            handleStart(touch.clientX, touch.clientY);
          }
        }}
      >
        <div
          ref={knobRef}
          className="joystick-knob"
          style={{
            transform: `translate(calc(-50% + ${knobPosition.x}px), calc(-50% + ${knobPosition.y}px))`
          }}
        />
      </div>
    </div>
  );
}

export default Joystick;