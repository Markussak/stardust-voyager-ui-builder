
import { useEffect, useRef } from 'react';
import Assets from '../../assets/game';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create space dust particles
    if (containerRef.current) {
      const container = containerRef.current;
      for (let i = 0; i < 50; i++) {
        createDustParticle(container);
      }
    }

    return () => {
      // Clean up
      if (containerRef.current) {
        const particles = containerRef.current.querySelectorAll('.space-dust');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);

  const createDustParticle = (container: HTMLDivElement) => {
    const dust = document.createElement('div');
    dust.className = 'space-dust';
    
    // Random positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    dust.style.left = `${x}%`;
    dust.style.top = `${y}%`;
    
    // Random size (1-3px)
    const size = 1 + Math.random() * 2;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    
    // Random opacity
    dust.style.opacity = (0.3 + Math.random() * 0.7).toString();
    
    // Random animation
    const duration = 20 + Math.random() * 80;
    dust.style.animation = `float ${duration}s linear infinite`;
    
    container.appendChild(dust);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      {/* Deep space background with stars */}
      <div className="absolute inset-0 bg-space-dark">
        <div className="absolute inset-0 bg-cover bg-center opacity-70 animate-stars-scroll" 
             style={{ backgroundImage: `url(${Assets.backgrounds.stars})` }} />
      </div>
      
      {/* Nebula layer */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-screen animate-nebula-scroll"
           style={{ backgroundImage: `url(${Assets.backgrounds.nebula})` }} />
      
      {/* Star cluster */}
      <div className="absolute inset-0 bg-cover bg-center opacity-70" 
           style={{ backgroundImage: `url(${Assets.backgrounds.starCluster})` }} />
      
      {/* Distant Planet */}
      <div className="absolute top-[10%] right-[15%] w-[150px] h-[150px] animate-float">
        <img 
          src={Assets.backgrounds.planet} 
          alt="Distant Planet" 
          className="w-full h-full pixel-art object-contain animate-[spin_120s_linear_infinite]" 
        />
      </div>

      {/* Add specific styling for space dust using standard style element without jsx property */}
      <style>
        {`
        .space-dust {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          pointer-events: none;
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(0) translateX(10px); }
          75% { transform: translateY(10px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        `}
      </style>
    </div>
  );
};

export default SpaceBackground;
