
import { useGalaxy } from '../../contexts/GalaxyContext';
import { Button } from '../ui/button';

const SystemInfoPanel = () => {
  const { galaxy, selectedSystem, setSelectedSystem } = useGalaxy();
  
  if (!selectedSystem) return null;
  
  const isPlayerLocation = galaxy?.playerPosition === selectedSystem.id;
  
  return (
    <div className="absolute right-0 top-0 h-full w-72 bg-space-dark bg-opacity-80 border-l border-space-buttons-border p-4 text-space-ui-text font-pixel-mono overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{selectedSystem.name}</h2>
        <button 
          onClick={() => setSelectedSystem(null)} 
          className="text-space-ui-subtext hover:text-space-ui-text"
        >
          X
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div 
            className="w-4 h-4 rounded-full mr-2"
            style={{ 
              backgroundColor: selectedSystem.starType === "M_RedDwarf" ? "#FF6666" :
                              selectedSystem.starType === "G_YellowMainSequence" ? "#FFFF99" :
                              selectedSystem.starType === "A_White" ? "#DDDDFF" :
                              selectedSystem.starType === "O_BlueGiant" ? "#99CCFF" :
                              selectedSystem.starType === "NeutronStar" ? "#FFFFFF" :
                              selectedSystem.starType === "BlackHole" ? "#333333" :
                              selectedSystem.starType === "BinarySystem" ? "#FFCC99" : "#FFFFFF",
              boxShadow: `0 0 4px ${selectedSystem.starType === "M_RedDwarf" ? "#FF6666" :
                          selectedSystem.starType === "G_YellowMainSequence" ? "#FFFF99" :
                          selectedSystem.starType === "A_White" ? "#DDDDFF" :
                          selectedSystem.starType === "O_BlueGiant" ? "#99CCFF" :
                          selectedSystem.starType === "NeutronStar" ? "#FFFFFF" :
                          selectedSystem.starType === "BlackHole" ? "#333333" :
                          selectedSystem.starType === "BinarySystem" ? "#FFCC99" : "#FFFFFF"}`
            }}
          />
          <span>Typ hvězdy: {selectedSystem.starType.replace('_', ' ')}</span>
        </div>
        
        <div className="mb-2">
          <span>Počet planet: {selectedSystem.planets}</span>
        </div>
        
        {selectedSystem.explored ? (
          <div className="mb-2 text-green-400">Prozkoumaný systém</div>
        ) : (
          <div className="mb-2 text-yellow-400">Neprozkoumaný systém</div>
        )}
        
        {isPlayerLocation && (
          <div className="mb-2 text-blue-400">Aktuální pozice</div>
        )}
        
        {selectedSystem.anomalyPresent && (
          <div className="mb-2 text-purple-400">Detekována anomálie</div>
        )}
      </div>
      
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full border-space-buttons-border text-space-ui-text hover:bg-space-buttons-hover"
        >
          Nastavit jako cíl
        </Button>
        
        {isPlayerLocation ? (
          <Button className="w-full">
            Vstoupit do systému
          </Button>
        ) : selectedSystem.explored ? (
          <Button className="w-full">
            Zahájit warp
          </Button>
        ) : (
          <Button disabled className="w-full">
            Neprozkoumaný systém
          </Button>
        )}
      </div>
    </div>
  );
};

export default SystemInfoPanel;
