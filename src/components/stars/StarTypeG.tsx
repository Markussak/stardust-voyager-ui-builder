
import React, { useState, useEffect, useRef } from 'react';
import { StarDataTypeG } from '../../types/stars';
import { starTypeG_Specifics } from '../../config/starsConfig';

interface StarTypeGProps {
  star: StarDataTypeG;
  size?: number;
  showDetails?: boolean;
  interactive?: boolean;
  onClick?: (starId: string) => void;
}

const StarTypeG: React.FC<StarTypeGProps> = ({ 
  star, 
  size = 300, 
  showDetails = false, 
  interactive = false,
  onClick
}) => {
  const animationRef = useRef<number>(0);
  const coronaRef = useRef<HTMLDivElement>(null);
  const [activeTime, setActiveTime] = useState(0);
  const [activeSunspots, setActiveSunspots] = useState<Array<{id: number; type: string; x: number; y: number; size: number}>>([]);
  const [flareActive, setFlareActive] = useState(false);

  // Nastavení animace rotace a dynamických prvků
  useEffect(() => {
    let lastTime = 0;
    
    // Simulace náhodného generování slunečních skvrn
    generateRandomSunspots();
    
    // Funkce pro animaci hvězdy
    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      setActiveTime(prev => prev + deltaTime * 0.001); // Převod na sekundy
      
      // Animace koróny - jemná pulzující rotace
      if (coronaRef.current) {
        const rotationSpeed = 0.02; // radiány za sekundu
        coronaRef.current.style.transform = `rotate(${activeTime * rotationSpeed}rad)`;
      }
      
      // Náhodné generování erupcí/výronů hmoty
      if (Math.random() < 0.0005 && !flareActive) {
        setFlareActive(true);
        
        // Po určitém čase erupce zmizí
        setTimeout(() => {
          setFlareActive(false);
        }, 5000);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Generování náhodných slunečních skvrn
  const generateRandomSunspots = () => {
    const { sunspotConfig } = starTypeG_Specifics;
    const numSpots = Math.floor(Math.random() * (sunspotConfig.maxActiveSpots - 1)) + 1;
    
    const spots = [];
    for (let i = 0; i < numSpots; i++) {
      // Preferujeme rovníkové oblasti pro skvrny
      const angle = Math.random() * Math.PI * 2;
      const distFromCenter = 0.3 + Math.random() * 0.5; // 30-80% od středu k okraji
      
      spots.push({
        id: i,
        type: Object.values(sunspotConfig.spots)[0].type, // Pro zjednodušení používáme jeden typ
        x: Math.cos(angle) * distFromCenter * size/2 + size/2,
        y: Math.sin(angle) * distFromCenter * size/2 + size/2,
        size: Math.random() * 20 + 10 // Velikost 10-30px
      });
    }
    
    setActiveSunspots(spots);
  };

  // Manipulace s kliknutím
  const handleClick = () => {
    if (interactive && onClick) {
      onClick(star.id);
    }
  };

  return (
    <div 
      className={`relative ${interactive ? 'cursor-pointer' : ''}`} 
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={handleClick}
    >
      {/* Koróna */}
      <div 
        ref={coronaRef}
        className="absolute inset-0 animate-pulse"
        style={{
          width: `${size * 1.5}px`, // 1.5x větší než hvězda
          height: `${size * 1.5}px`,
          left: `-${size * 0.25}px`, // Vycentrování
          top: `-${size * 0.25}px`,
          background: `radial-gradient(circle, rgba(255,255,224,0.2) 0%, rgba(255,255,170,0.1) 70%, rgba(255,255,150,0) 100%)`,
          borderRadius: '50%',
        }}
      />
      
      {/* Fotosféra - základní disk hvězdy */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle, rgba(255,255,0,1) 0%, rgba(255,220,0,1) 60%, rgba(255,200,0,0.8) 80%, rgba(255,200,0,0.6) 100%)`,
          borderRadius: '50%',
          boxShadow: '0 0 80px rgba(255, 255, 128, 0.8)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      
      {/* Granulace povrchu - textura "vařící plazmy" */}
      <div 
        className="absolute inset-0 z-20 opacity-30"
        style={{
          borderRadius: '50%',
          backgroundImage: `url(${starTypeG_Specifics.photosphere.granulationTexture.animation.spritesheetUrl})`,
          backgroundSize: '160%', // Větší měřítko pro texturu
          animation: 'granulation 10s linear infinite',
        }}
      />
      
      {/* Sluneční skvrny */}
      {activeSunspots.map(spot => (
        <div
          key={spot.id}
          className="absolute z-30"
          style={{
            left: `${spot.x - spot.size/2}px`,
            top: `${spot.y - spot.size/2}px`,
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${starTypeG_Specifics.sunspotConfig.spots[0].umbraColor} 0%, ${starTypeG_Specifics.sunspotConfig.spots[0].penumbraColor} 70%, transparent 100%)`,
            opacity: 0.8,
          }}
        />
      ))}
      
      {/* Vizualizace slunečních erupcí */}
      {flareActive && (
        <div
          className="absolute z-40 animate-pulse"
          style={{
            width: `${size * 0.4}px`,
            height: `${size * 0.3}px`,
            left: `${(Math.random() * 0.6 + 0.2) * size}px`,
            top: `${(Math.random() * 0.2) * size}px`,
            background: 'radial-gradient(ellipse at bottom, rgba(255, 160, 0, 0.8) 0%, rgba(255, 120, 0, 0.5) 60%, transparent 100%)',
            borderRadius: '50% 50% 10% 10% / 80% 80% 20% 20%',
            transform: `rotate(${Math.random() * 360}deg)`,
            filter: 'blur(2px)',
            opacity: 0.8,
          }}
        />
      )}
      
      {/* Informační panel, pokud je zapnutý detail */}
      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 z-50 rounded-b-full">
          <h3 className="text-lg font-bold">{star.name}</h3>
          <p className="text-sm">Typ: G - Žlutý trpaslík</p>
          <p className="text-xs">{starTypeG_Specifics.sunspotConfig.maxActiveSpots} aktivních oblastí</p>
        </div>
      )}
      
      {/* CSS pro animace */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        @keyframes granulation {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
};

export default StarTypeG;
