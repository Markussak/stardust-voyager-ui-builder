
import React, { useState, useEffect } from 'react';
import { AlienRaceDefinition } from '@/types/aliens';
import { getAlienRaceById } from '@/data/alienRaces';

interface AlienPortraitDisplayProps {
  raceId?: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  variant?: number;
}

const AlienPortraitDisplay: React.FC<AlienPortraitDisplayProps> = ({ 
  raceId = 'sylvans_flora_based', 
  size = 'md', 
  showName = true,
  variant = 1
}) => {
  const [alienRace, setAlienRace] = useState<AlienRaceDefinition | undefined>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");
  
  useEffect(() => {
    const race = getAlienRaceById(raceId);
    if (race) {
      setAlienRace(race);
      
      // Generate portrait image URL with variant
      const variantIndex = variant <= race.visualDesign.portraits.variantCount_PerGenderOrRole 
        ? variant 
        : 1;
      
      const portraitPath = race.visualDesign.portraits.baseSprite_AssetPath_Template
        .replace('{variant}', variantIndex.toString());
      
      setImagePath(portraitPath);
    }
  }, [raceId, variant]);
  
  // Check if image exists
  useEffect(() => {
    if (!imagePath) return;
    
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.warn(`Failed to load alien portrait: ${imagePath}, using fallback`);
      setImagePath("/assets/aliens/portraits/unknown_alien.png");
      setImageLoaded(true);
    };
    img.src = imagePath;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath]);
  
  if (!alienRace) {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-space-dark rounded-full border border-space-buttons-border flex items-center justify-center text-space-ui-subtext">
          Neznámá rasa
        </div>
      </div>
    );
  }
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-48 h-48';
      default: return 'w-32 h-32';
    }
  };
  
  const bgColor = alienRace.visualDesign.skinOrSurface_ColorPalette.primary 
    ? Array.isArray(alienRace.visualDesign.skinOrSurface_ColorPalette.primary) 
      ? alienRace.visualDesign.skinOrSurface_ColorPalette.primary[0] 
      : alienRace.visualDesign.skinOrSurface_ColorPalette.primary as string
    : '#556B2F';

  return (
    <div className="flex flex-col items-center">
      {/* Portrait with background color matching alien species */}
      <div 
        className={`${getSizeClass()} rounded-full overflow-hidden border-2 border-space-buttons-border flex items-center justify-center transition-all duration-300`}
        style={{ backgroundColor: bgColor }}
      >
        {!imageLoaded && (
          <div className="animate-pulse text-space-ui-text">Načítání...</div>
        )}
        {imageLoaded && (
          <div 
            className="w-full h-full bg-contain bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${imagePath})` }}
          />
        )}
      </div>
      
      {/* Race name */}
      {showName && (
        <div className="mt-2 text-center">
          <div className="font-pixel text-space-ui-text">{alienRace.raceName}</div>
          <div className="text-xs text-space-ui-subtext">{alienRace.aiBehavior.diplomaticProfile.baseEthos.split('_').join(' ')}</div>
        </div>
      )}
    </div>
  );
};

export default AlienPortraitDisplay;
