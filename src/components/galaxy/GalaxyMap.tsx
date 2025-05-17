
import { useEffect, useRef, useState } from 'react';
import { useGalaxy } from '../../contexts/GalaxyContext';
import { galaxyMapVisuals } from '../../config/galaxyConfig';
import { StarSystem, Hyperlane } from '../../types/galaxy';
import SystemTooltip from './SystemTooltip';
import MapControls from './MapControls';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const GalaxyMap = () => {
  const { 
    galaxy, 
    selectedSystem, 
    setSelectedSystem, 
    mapFilters,
    zoomLevel,
    setZoomLevel,
    panOffset,
    setPanOffset
  } = useGalaxy();
  
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSystem, setHoveredSystem] = useState<StarSystem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Funkce pro vykreslení hvězdných systémů
  const renderStarSystems = () => {
    if (!galaxy) return null;

    return galaxy.systems.map(system => {
      const { baseSizePx, colorByStarType } = galaxyMapVisuals.starIcon;
      const [minSize, maxSize] = baseSizePx;
      
      // Velikost závisí na typu hvězdy
      const size = minSize + (maxSize - minSize) * 
        (system.starType === "O_BlueGiant" ? 1 : 
        system.starType === "BlackHole" ? 0.8 : 
        system.starType === "NeutronStar" ? 0.7 : 0.5);
      
      const isPlayerLocation = galaxy.playerPosition === system.id;
      const isSelected = selectedSystem?.id === system.id;
      
      const showNames = mapFilters.find(f => f.id === "filter_show_system_names")?.active;

      return (
        <div 
          key={system.id}
          className={`absolute rounded-full cursor-pointer transition-all duration-300
            ${isSelected ? 'ring-2 ring-white' : ''}
            ${isPlayerLocation ? 'animate-pulse' : ''}
          `}
          style={{
            left: `${system.position.x * zoomLevel + panOffset.x}px`,
            top: `${system.position.y * zoomLevel + panOffset.y}px`,
            width: `${size * zoomLevel}px`,
            height: `${size * zoomLevel}px`,
            backgroundColor: colorByStarType[system.starType] || "#FFFFFF",
            boxShadow: `0 0 ${size * 0.8 * zoomLevel}px ${colorByStarType[system.starType] || "#FFFFFF"}`
          }}
          onClick={() => setSelectedSystem(system)}
          onMouseEnter={() => setHoveredSystem(system)}
          onMouseLeave={() => setHoveredSystem(null)}
        >
          {showNames && (
            <div 
              className="absolute whitespace-nowrap text-xs text-space-ui-text font-pixel-mono"
              style={{
                top: `${size * zoomLevel + 5}px`,
                left: `50%`,
                transform: 'translateX(-50%)',
                fontSize: `${Math.max(8, 10 * zoomLevel)}px`
              }}
            >
              {system.name}
            </div>
          )}
        </div>
      );
    });
  };

  // Funkce pro vykreslení hyperprostorových tras
  const renderHyperlanes = () => {
    if (!galaxy) return null;
    
    const showHyperlanes = mapFilters.find(f => f.id === "filter_show_hyperlanes")?.active;
    if (!showHyperlanes) return null;
    
    return galaxy.hyperlanes.map(lane => {
      const fromSystem = galaxy.systems.find(s => s.id === lane.fromSystemId);
      const toSystem = galaxy.systems.find(s => s.id === lane.toSystemId);
      
      if (!fromSystem || !toSystem) return null;
      
      const { 
        lineColor_Safe, 
        lineColor_Dangerous, 
        lineColor_Unexplored,
        lineThicknessPx,
        style_Discovered_Unvisited
      } = galaxyMapVisuals.hyperlaneStyle;
      
      // Určení barvy a stylu linky podle nebezpečí a průzkumu
      let lineColor = lineColor_Unexplored;
      let lineStyle = "";
      
      if (fromSystem.explored && toSystem.explored) {
        lineColor = lane.danger === 'Dangerous' ? lineColor_Dangerous : lineColor_Safe;
      } else if (fromSystem.explored || toSystem.explored) {
        // Jeden ze systémů je prozkoumán, druhý ne
        lineColor = lineColor_Unexplored;
        lineStyle = style_Discovered_Unvisited === 'Dashed' ? 'dashed' : '';
      }
      
      const x1 = fromSystem.position.x * zoomLevel + panOffset.x;
      const y1 = fromSystem.position.y * zoomLevel + panOffset.y;
      const x2 = toSystem.position.x * zoomLevel + panOffset.x;
      const y2 = toSystem.position.y * zoomLevel + panOffset.y;
      
      return (
        <line
          key={`${lane.fromSystemId}-${lane.toSystemId}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={lineColor}
          strokeWidth={lineThicknessPx}
          strokeDasharray={lineStyle === 'dashed' ? "4,4" : ""}
        />
      );
    });
  };

  // Funkce pro ovládání mapy
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) { // Levé tlačítko myši
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && containerRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPanOffset({ x: newX, y: newY });
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.2), 3.0);
    setZoomLevel(newZoom);
  };

  // Efekt pro nastavení počáteční pozice mapy na střed
  useEffect(() => {
    if (containerRef.current && mapRef.current && galaxy) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      
      // Centrujeme mapu na střed první hvězdy
      if (galaxy.systems.length > 0) {
        const centerSystem = galaxy.systems.find(s => s.id === galaxy.playerPosition) || galaxy.systems[0];
        const centerX = -centerSystem.position.x * zoomLevel + containerWidth / 2;
        const centerY = -centerSystem.position.y * zoomLevel + containerHeight / 2;
        setPanOffset({ x: centerX, y: centerY });
      }
    }
  }, [galaxy, zoomLevel]);

  if (!galaxy) {
    return <div className="text-space-ui-text">Generování galaxie...</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-space-dark">
      {/* Vrstva pozadí */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${galaxyMapVisuals.background.textureAssetUrl})` }}
      />
      
      {/* Hlavní kontejner mapy */}
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* SVG pro hyperlanes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {renderHyperlanes()}
        </svg>
        
        {/* Mapa s hvězdami */}
        <div ref={mapRef} className="absolute inset-0">
          {renderStarSystems()}
        </div>
        
        {/* Tooltip nad hvězdou */}
        <TooltipProvider>
          {hoveredSystem && (
            <SystemTooltip system={hoveredSystem} />
          )}
        </TooltipProvider>
      </div>
      
      {/* Ovládací prvky mapy */}
      <MapControls />
    </div>
  );
};

export default GalaxyMap;
