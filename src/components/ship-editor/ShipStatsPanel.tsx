import React from 'react';
import { useShipEditor } from "@/contexts/ShipEditorContext";
import { Progress } from "@/components/ui/progress";

const ShipStatsPanel = () => {
  const { shipStats, editorState } = useShipEditor();
  
  const getEnergyBalanceColor = () => {
    if (shipStats.energy_Balance_MW > 10) return "text-green-400";
    if (shipStats.energy_Balance_MW > 0) return "text-yellow-400";
    return "text-red-500";
  };
  
  const getCpuUsageColor = () => {
    const cpuPercentage = (shipStats.cpu_Used / shipStats.cpu_Capacity) * 100;
    if (cpuPercentage >= 90) return "text-red-500";
    if (cpuPercentage >= 75) return "text-yellow-400";
    return "text-green-400";
  };
  
  return (
    <div className="space-y-4">
      {/* Defense stats */}
      <div>
        <h3 className="text-sm font-pixel mb-1">Obrana</h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs">
              <span>Trup:</span>
              <span>{shipStats.hullPoints_Current} / {shipStats.hullPoints_Base}</span>
            </div>
            <Progress value={(shipStats.hullPoints_Current / shipStats.hullPoints_Base) * 100} className="h-2 bg-gray-700">
              <div className="bg-blue-500 h-full"/>
            </Progress>
          </div>
          
          <div>
            <div className="flex justify-between text-xs">
              <span>Štít:</span>
              <span>{shipStats.shieldPoints_Current} / {shipStats.shieldPoints_Base}</span>
            </div>
            <Progress value={shipStats.shieldPoints_Base > 0 ? (shipStats.shieldPoints_Current / shipStats.shieldPoints_Base) * 100 : 0} className="h-2 bg-gray-700">
              <div className="bg-cyan-500 h-full"/>
            </Progress>
            {shipStats.shieldPoints_Base > 0 && (
              <div className="text-xs text-right text-cyan-300">
                +{shipStats.shieldRegenRate_PerSec_Base}/s
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Energy balance */}
      <div>
        <h3 className="text-sm font-pixel mb-1">Energie</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Výroba:</span>
            <span className="text-green-400">{shipStats.energy_Production_MW} MW</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Spotřeba:</span>
            <span className="text-red-400">-{shipStats.energy_Consumption_MW} MW</span>
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span>Bilance:</span>
            <span className={getEnergyBalanceColor()}>
              {shipStats.energy_Balance_MW > 0 ? '+' : ''}{shipStats.energy_Balance_MW} MW
            </span>
          </div>
          
          <Progress 
            value={50 + (shipStats.energy_Balance_MW / Math.max(shipStats.energy_Production_MW, 1)) * 50} 
            className="h-2 bg-gray-700"
          >
            <div className={`h-full ${shipStats.energy_Balance_MW >= 0 ? 'bg-green-500' : 'bg-red-500'}`}/>
          </Progress>
        </div>
      </div>
      
      {/* CPU usage */}
      <div>
        <h3 className="text-sm font-pixel mb-1">Výpočetní Systémy</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>CPU využito:</span>
            <span className={getCpuUsageColor()}>{shipStats.cpu_Used} / {shipStats.cpu_Capacity}</span>
          </div>
          <Progress 
            value={(shipStats.cpu_Used / shipStats.cpu_Capacity) * 100} 
            className="h-2 bg-gray-700"
          >
            <div className={`h-full ${getCpuUsageColor().replace('text-', 'bg-')}`}/>
          </Progress>
        </div>
      </div>
      
      {/* Mobility */}
      <div>
        <h3 className="text-sm font-pixel mb-1">Mobilita</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Max. rychlost:</div>
          <div className="text-right">{shipStats.mobility.maxSpeed_unitsPerSec} j/s</div>
          
          <div>Zrychlení:</div>
          <div className="text-right">{shipStats.mobility.acceleration_unitsPerSec2} j/s²</div>
          
          <div>Otáčení:</div>
          <div className="text-right">{shipStats.mobility.turnRate_degPerSec}°/s</div>
        </div>
      </div>
      
      {/* Other stats */}
      <div>
        <h3 className="text-sm font-pixel mb-1">Další Systémy</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Zbraně celkem:</div>
          <div className="text-right">{shipStats.weaponPower_Combined} jednotek</div>
          
          <div>Dosah senzorů:</div>
          <div className="text-right">{shipStats.sensorRange_Units} jednotek</div>
          
          <div>Kapacita nákladu:</div>
          <div className="text-right">{shipStats.cargoCapacity_Units} jednotek</div>
        </div>
      </div>
      
      {editorState.hasUnsavedChanges && (
        <div className="text-center text-yellow-400 text-xs mt-2 animate-pulse">
          Neuložené změny! Potvrďte instalaci.
        </div>
      )}
    </div>
  );
};

export default ShipStatsPanel;
