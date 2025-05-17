
import React, { useEffect, useState, useRef } from 'react';
import { StarDataTypeG, StarType } from '../../types/stars';

interface StarTypeGProps {
  star: StarDataTypeG;
  size: number;
  showDetails?: boolean;
}

const StarTypeG: React.FC<StarTypeGProps> = ({ star, size, showDetails = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [activityLevel, setActivityLevel] = useState(star.activityLevel || 0.5);

  // Efekt pro rotaci hvězdy
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % 360);
    }, 100);
    return () => clearInterval(rotationInterval);
  }, []);

  // Vykreslení hvězdy pomocí Canvas API
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = size / 2;

    // Vyčištění canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vykreslení základního disku hvězdy
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, '#FFFF00'); // Žluté jádro
    gradient.addColorStop(0.8, '#FFCC00'); // Přechod do oranžova
    gradient.addColorStop(1, '#FF9900'); // Okraj do oranžova
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Funkce pro vytvoření náhodné polohy na disku hvězdy
    const randomPosition = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius * 0.8; // Omezení maximální vzdálenosti od středu
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      };
    };

    // Vykreslení granulace povrchu
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 300; i++) {
      const pos = randomPosition();
      const granuleSize = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, granuleSize, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF80' : '#FF880080';
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Vykreslení slunečních skvrn (více při vyšší aktivitě)
    const spotCount = Math.floor(3 + activityLevel * 5);
    for (let i = 0; i < spotCount; i++) {
      const pos = randomPosition();
      const spotSize = 3 + Math.random() * 5 * activityLevel;
      
      // Umbra (tmavý střed)
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, spotSize, 0, Math.PI * 2);
      ctx.fillStyle = '#884400';
      ctx.fill();
      
      // Penumbra (světlejší okraj)
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, spotSize * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#AA7700';
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }

    // Vykreslení koróny (vnější atmosféry)
    ctx.save();
    ctx.globalAlpha = 0.2;
    const coronaGradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 1.5);
    coronaGradient.addColorStop(0, '#FFFF88');
    coronaGradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = coronaGradient;
    ctx.fill();
    ctx.restore();

    // Vykreslení protuberancí (slunečních erupcí) při vyšší aktivitě
    if (activityLevel > 0.3) {
      const flareCount = Math.floor(activityLevel * 3);
      for (let i = 0; i < flareCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const flareSize = radius * 0.2 + Math.random() * radius * 0.3 * activityLevel;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(radius, 0);
        
        // Vykreslit protuberanci jako trojúhelníkový tvar
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(flareSize, -flareSize / 3);
        ctx.lineTo(flareSize, flareSize / 3);
        ctx.closePath();
        
        const flareGradient = ctx.createLinearGradient(0, 0, flareSize, 0);
        flareGradient.addColorStop(0, '#FFAA00');
        flareGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = flareGradient;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.restore();
      }
    }

  }, [size, rotation, activityLevel]);

  // Definice CSS stylu pro komponentu
  const starStyles: React.CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    borderRadius: '50%',
    filter: `blur(${size * 0.005}px) brightness(1.05)`,
    boxShadow: `0 0 ${size * 0.2}px #FFFF80, 0 0 ${size * 0.5}px #FFCC40`
  };

  const canvasStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  };

  // Definice stylu pro info-panel, pokud je zobrazen
  const infoPanelStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: '5px',
    maxWidth: '400px',
    textAlign: 'center',
    display: showDetails ? 'block' : 'none'
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={starStyles}>
        <canvas 
          ref={canvasRef} 
          width={size} 
          height={size}
          style={canvasStyles}
        />
      </div>
      
      {showDetails && star.loreEntry && (
        <div style={infoPanelStyles}>
          <h3>{star.name}</h3>
          <p>Typ: G (Žlutý trpaslík)</p>
          <p>Aktivita: {activityLevel < 0.3 ? 'Nízká' : activityLevel < 0.7 ? 'Střední' : 'Vysoká'}</p>
        </div>
      )}
    </div>
  );
};

export default StarTypeG;
