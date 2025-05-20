
import React, { useEffect, useState } from 'react';
import { useShipMovement } from '../../contexts/ShipMovementContext';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

const StarSystemBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const { currentMovementState } = useShipMovement();
  const { position, velocity } = currentMovementState;
  
  // Generate stars on component mount
  useEffect(() => {
    const starCount = 200;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const newStars: Star[] = [];
    
    const starColors = [
      '#FFFFFF', // White
      '#F8F7FF', // Slightly blue white
      '#FFF4EA', // Slightly yellow white
      '#FFCCCC', // Slightly red white
      '#FFE5CC', // Slightly orange white
    ];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * windowWidth * 3 - windowWidth,
        y: Math.random() * windowHeight * 3 - windowHeight,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }
    
    setStars(newStars);
  }, []);
  
  // Move stars based on ship velocity for parallax effect
  useEffect(() => {
    const moveStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          // Apply parallax effect based on ship velocity
          let newX = star.x - velocity.x * (star.size / 3); // Smaller stars move slower
          let newY = star.y - velocity.y * (star.size / 3);
          
          // Wrap stars around screen
          const buffer = 100;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          if (newX < -windowWidth - buffer) newX = windowWidth + buffer;
          if (newX > windowWidth + buffer) newX = -windowWidth - buffer;
          if (newY < -windowHeight - buffer) newY = windowHeight + buffer;
          if (newY > windowHeight + buffer) newY = -windowHeight - buffer;
          
          return {
            ...star,
            x: newX,
            y: newY
          };
        })
      );
    };
    
    const intervalId = setInterval(moveStars, 33); // ~30fps
    
    return () => clearInterval(intervalId);
  }, [velocity]);
  
  return (
    <div className="fixed inset-0 bg-space-bg overflow-hidden">
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: star.size > 1.5 ? `0 0 ${star.size * 2}px ${star.color}` : 'none'
          }}
        />
      ))}
    </div>
  );
};

export default StarSystemBackground;
