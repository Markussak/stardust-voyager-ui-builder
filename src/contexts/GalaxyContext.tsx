
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Galaxy, GalaxyShape, StarSystem, MapFilterDefinition } from '../types/galaxy';
import { generateGalaxy } from '../services/GalaxyGenerator';
import { defaultMapFilters } from '../config/galaxyConfig';

interface GalaxyProviderProps {
  children: ReactNode;
}

interface GalaxyContextType {
  galaxy: Galaxy | null;
  selectedSystem: StarSystem | null;
  setSelectedSystem: (system: StarSystem | null) => void;
  generateNewGalaxy: (shape?: GalaxyShape) => void;
  mapFilters: MapFilterDefinition[];
  toggleMapFilter: (filterId: string) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  panOffset: { x: number, y: number };
  setPanOffset: (offset: { x: number, y: number }) => void;
}

const GalaxyContext = createContext<GalaxyContextType | undefined>(undefined);

export const GalaxyProvider = ({ children }: GalaxyProviderProps) => {
  const [galaxy, setGalaxy] = useState<Galaxy | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<StarSystem | null>(null);
  const [mapFilters, setMapFilters] = useState<MapFilterDefinition[]>(defaultMapFilters);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  // Při prvním načtení vygenerujeme galaxii
  useEffect(() => {
    generateNewGalaxy();
  }, []);

  const generateNewGalaxy = (shape?: GalaxyShape) => {
    const newGalaxy = generateGalaxy(shape);
    setGalaxy(newGalaxy);
    setSelectedSystem(null); // Reset výběru systému
    setPanOffset({ x: 0, y: 0 }); // Reset pozice mapy
    setZoomLevel(1); // Reset úrovně přiblížení
  };

  const toggleMapFilter = (filterId: string) => {
    setMapFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.id === filterId 
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
  };

  const value = {
    galaxy,
    selectedSystem,
    setSelectedSystem,
    generateNewGalaxy,
    mapFilters,
    toggleMapFilter,
    zoomLevel,
    setZoomLevel,
    panOffset,
    setPanOffset
  };

  return (
    <GalaxyContext.Provider value={value}>
      {children}
    </GalaxyContext.Provider>
  );
};

export const useGalaxy = (): GalaxyContextType => {
  const context = useContext(GalaxyContext);
  if (context === undefined) {
    throw new Error('useGalaxy must be used within a GalaxyProvider');
  }
  return context;
};
