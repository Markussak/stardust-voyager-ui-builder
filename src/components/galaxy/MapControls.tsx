
import { useGalaxy } from '../../contexts/GalaxyContext';
import { Button } from '../ui/button';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Search, ZoomIn, ZoomOut, Filter } from 'lucide-react';

const MapControls = () => {
  const { 
    mapFilters, 
    toggleMapFilter, 
    zoomLevel,
    setZoomLevel,
    generateNewGalaxy
  } = useGalaxy();

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.1, 3.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.1, 0.2));
  };

  return (
    <div className="absolute left-4 bottom-4 flex flex-col gap-2">
      {/* Zoom ovládání */}
      <div className="flex gap-2 bg-space-dark bg-opacity-80 rounded p-1">
        <Button 
          size="icon" 
          variant="outline" 
          className="border-space-buttons-border h-8 w-8"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="flex items-center px-2 text-space-ui-text font-pixel-mono text-xs">
          {Math.round(zoomLevel * 100)}%
        </div>
        <Button 
          size="icon" 
          variant="outline" 
          className="border-space-buttons-border h-8 w-8"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Filtry mapy */}
      <div className="bg-space-dark bg-opacity-80 rounded p-2">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-1" />
          <span className="text-space-ui-text font-pixel-mono text-xs">Filtry</span>
        </div>
        
        <div className="space-y-1">
          {mapFilters.map(filter => (
            <div 
              key={filter.id} 
              className="flex items-center"
              onClick={() => toggleMapFilter(filter.id)}
            >
              <div 
                className={`w-3 h-3 mr-2 border border-space-buttons-border cursor-pointer ${
                  filter.active ? 'bg-space-buttons-glow' : 'bg-transparent'
                }`}
              />
              <span className="text-space-ui-text font-pixel-mono text-xs cursor-pointer">
                {filter.defaultText}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Regenerace galaxie */}
      <Button 
        variant="outline"
        className="border-space-buttons-border text-space-ui-text hover:bg-space-buttons-hover text-xs"
        onClick={() => generateNewGalaxy()}
      >
        Nová Galaxie
      </Button>
    </div>
  );
};

export default MapControls;
