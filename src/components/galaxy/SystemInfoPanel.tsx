
import { useNavigate } from 'react-router-dom';
import { useGalaxy } from '../../contexts/GalaxyContext';
import { StarSystem, StarType } from '../../types/galaxy';
import { Button } from '../ui/button';

// Mapování typů hvězd na čitelné názvy
const starTypeNames: Record<StarType, string> = {
  [StarType.M_RedDwarf]: "Červený trpaslík (M)",
  [StarType.G_YellowMainSequence]: "Žlutá hvězda hlavní posloupnosti (G)",
  [StarType.A_White]: "Bílá hvězda (A)",
  [StarType.O_BlueGiant]: "Modrý obr (O)",
  [StarType.NeutronStar]: "Neutronová hvězda",
  [StarType.BlackHole]: "Černá díra",
  [StarType.BinarySystem]: "Binární systém",
  [StarType.TrinarySystem]: "Trojhvězdný systém"
};

const SystemInfoPanel: React.FC = () => {
  const { selectedSystem } = useGalaxy();
  const navigate = useNavigate();

  if (!selectedSystem) return null;

  const handleViewSystem = () => {
    navigate(`/system/${selectedSystem.id}`);
  };

  const handleSetWaypoint = () => {
    console.log(`Waypoint set to ${selectedSystem.name}`);
    // Implementace nastavení waypointu by přišla zde
  };

  return (
    <div className="absolute right-4 top-4 w-80 bg-space-dark bg-opacity-90 border border-space-border rounded-lg p-4 text-space-ui-text font-pixel-mono">
      <h2 className="text-xl font-bold mb-3">{selectedSystem.name}</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <div className="opacity-70">Typ hvězdy:</div>
          <div>{starTypeNames[selectedSystem.starType]}</div>
        </div>
        
        <div className="flex justify-between">
          <div className="opacity-70">Počet planet:</div>
          <div>{selectedSystem.planets}</div>
        </div>
        
        <div className="flex justify-between">
          <div className="opacity-70">Status:</div>
          <div className={selectedSystem.explored ? "text-green-400" : "text-yellow-400"}>
            {selectedSystem.explored ? "Prozkoumaný" : "Neprozkoumaný"}
          </div>
        </div>
        
        {selectedSystem.controllingFaction && (
          <div className="flex justify-between">
            <div className="opacity-70">Frakce:</div>
            <div>{selectedSystem.controllingFaction}</div>
          </div>
        )}
        
        {selectedSystem.anomalyPresent && (
          <div className="text-amber-400 mt-2">
            Detekována anomálie!
          </div>
        )}
        
        {selectedSystem.resources && selectedSystem.resources.length > 0 && (
          <div className="mt-2">
            <div className="opacity-70">Zdroje:</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedSystem.resources.map(resource => (
                <span key={resource} className="bg-space-border rounded px-2 py-0.5 text-xs">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button 
          onClick={handleSetWaypoint}
          className="flex-1 bg-space-accent hover:bg-space-accent-hover"
        >
          Nastavit cíl
        </Button>
        <Button 
          onClick={handleViewSystem}
          className="flex-1 bg-space-dark-accent hover:bg-space-dark-accent-hover"
        >
          Zobrazit systém
        </Button>
      </div>
    </div>
  );
};

export default SystemInfoPanel;
