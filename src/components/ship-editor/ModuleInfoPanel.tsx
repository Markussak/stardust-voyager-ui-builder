
import React from 'react';
import { useShipEditor } from "@/contexts/ShipEditorContext";
import { Button } from "@/components/ui/button";
import { ShipModuleType } from "@/types/ship-editor";
import { Puzzle, Zap, Shield, Cpu } from "lucide-react";

const ModuleInfoPanel = () => {
  const { 
    editorState, 
    getModuleDataByInstanceId,
    getModuleByInstanceId,
    getHardpointById,
    equipModule,
    unequipModule,
    shipHardpoints
  } = useShipEditor();
  
  const selectedModule = editorState.selectedModuleInstanceId 
    ? getModuleByInstanceId(editorState.selectedModuleInstanceId) 
    : undefined;
    
  const selectedModuleData = selectedModule 
    ? getModuleDataByInstanceId(selectedModule.moduleInstanceId) 
    : undefined;
    
  const selectedSlot = editorState.selectedSlotId
    ? getHardpointById(editorState.selectedSlotId)
    : undefined;
    
  const moduleInSelectedSlot = editorState.selectedSlotId
    ? getModuleByInstanceId(editorState.selectedModuleInstanceId || '')
    : undefined;
  
  // Handle module installation
  const handleEquip = () => {
    if (selectedModule && selectedSlot) {
      equipModule(selectedModule.moduleInstanceId, selectedSlot.id);
    }
  };
  
  // Handle module removal
  const handleUnequip = () => {
    if (selectedSlot) {
      unequipModule(selectedSlot.id);
    }
  };
  
  // Get compatible slots for the selected module
  const getCompatibleSlots = () => {
    if (!selectedModuleData) return [];
    
    return shipHardpoints.filter(
      hardpoint => hardpoint.slotType === selectedModuleData.slotTypeRequired
    );
  };
  
  // If nothing is selected
  if (!selectedModuleData && !selectedSlot) {
    return (
      <div className="h-full flex items-center justify-center text-space-ui-subtext">
        <p>Vyberte modul nebo slot pro zobrazení detailů</p>
      </div>
    );
  }
  
  // If a slot is selected but has no module
  if (selectedSlot && !moduleInSelectedSlot && !selectedModuleData) {
    const compatibleModuleTypes = getSlotCompatibleTypes(selectedSlot.slotType);
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-md font-pixel">Slot: {selectedSlot.visualRepresentation_Empty.textLabel}</h3>
          <p className="text-sm text-space-ui-subtext">Typ: {getSlotTypeName(selectedSlot.slotType)}</p>
        </div>
        
        <div className="text-sm">
          <p>Tento slot je prázdný.</p>
          <p className="mt-2">Kompatibilní typy modulů:</p>
          <ul className="list-disc list-inside mt-1 text-space-ui-subtext">
            {compatibleModuleTypes.map((type, i) => (
              <li key={i}>{type}</li>
            ))}
          </ul>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-space-ui-subtext">Vyberte modul ze seznamu pro instalaci</p>
        </div>
      </div>
    );
  }
  
  // If a slot with module is selected
  const slotModuleData = moduleInSelectedSlot 
    ? getModuleDataByInstanceId(moduleInSelectedSlot.moduleInstanceId) 
    : undefined;
    
  if (selectedSlot && slotModuleData) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-md font-pixel">{slotModuleData.defaultItemName}</h3>
          <p className="text-sm text-space-ui-subtext">Instalovaný v: {selectedSlot.visualRepresentation_Empty.textLabel}</p>
        </div>
        
        <div className="text-sm">
          <p>{slotModuleData.defaultItemDescription}</p>
          
          <div className="mt-3 space-y-2">
            {slotModuleData.statModifiers.map((modifier, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-xs mr-1 text-green-400">+</span>
                <span className="text-xs">{modifier.description}</span>
              </div>
            ))}
            
            {slotModuleData.powerConsumption_MW && (
              <div className="flex items-center text-yellow-400">
                <Zap size={12} className="mr-1" />
                <span className="text-xs">Spotřeba: {slotModuleData.powerConsumption_MW} MW</span>
              </div>
            )}
            
            {slotModuleData.cpuLoad && (
              <div className="flex items-center text-blue-400">
                <Cpu size={12} className="mr-1" />
                <span className="text-xs">CPU: {slotModuleData.cpuLoad} jednotek</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={handleUnequip}
          >
            Odinstalovat Modul
          </Button>
        </div>
      </div>
    );
  }
  
  // If only a module is selected
  if (selectedModuleData) {
    const compatibleSlots = getCompatibleSlots();
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-md font-pixel">{selectedModuleData.defaultItemName}</h3>
          <p className="text-sm text-space-ui-subtext">{getModuleTypeName(selectedModuleData.moduleType)}</p>
        </div>
        
        <div className="text-sm">
          <p>{selectedModuleData.defaultItemDescription}</p>
          
          <div className="mt-3 space-y-2">
            {selectedModuleData.statModifiers.map((modifier, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-xs mr-1 text-green-400">+</span>
                <span className="text-xs">{modifier.description}</span>
              </div>
            ))}
            
            {selectedModuleData.powerConsumption_MW && (
              <div className="flex items-center text-yellow-400">
                <Zap size={12} className="mr-1" />
                <span className="text-xs">Spotřeba: {selectedModuleData.powerConsumption_MW} MW</span>
              </div>
            )}
            
            {selectedModuleData.cpuLoad && (
              <div className="flex items-center text-blue-400">
                <Cpu size={12} className="mr-1" />
                <span className="text-xs">CPU: {selectedModuleData.cpuLoad} jednotek</span>
              </div>
            )}
          </div>
        </div>
        
        {compatibleSlots.length > 0 && editorState.selectedSlotId && (
          <div className="pt-2">
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              onClick={handleEquip}
            >
              <Puzzle size={16} className="mr-2" />
              Instalovat do Slotu {getHardpointById(editorState.selectedSlotId)?.visualRepresentation_Empty.textLabel}
            </Button>
          </div>
        )}
        
        {!editorState.selectedSlotId && (
          <div>
            <p className="text-xs text-space-ui-subtext mb-2">Kompatibilní sloty:</p>
            <div className="flex flex-wrap gap-2">
              {compatibleSlots.map(slot => (
                <Button 
                  key={slot.id}
                  variant="outline" 
                  size="sm"
                  onClick={() => equipModule(selectedModule!.moduleInstanceId, slot.id)}
                >
                  {slot.visualRepresentation_Empty.textLabel}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

// Helper functions
const getSlotTypeName = (slotType: string): string => {
  switch (slotType) {
    case 'Weapon_Small': return 'Zbraň (Malá)';
    case 'Weapon_Medium': return 'Zbraň (Střední)';
    case 'Weapon_Large': return 'Zbraň (Velká)';
    case 'Defense': return 'Obranný systém';
    case 'System': return 'Lodní systém';
    case 'Utility': return 'Nástroj';
    case 'Cosmetic_Paint': return 'Barva';
    case 'Cosmetic_Decal': return 'Dekorace';
    default: return slotType;
  }
};

const getModuleTypeName = (moduleType: ShipModuleType): string => {
  switch (moduleType) {
    case ShipModuleType.Weapon_Laser_Small: return 'Laserová zbraň (S)';
    case ShipModuleType.Weapon_Projectile_Medium: return 'Projektilová zbraň (M)';
    case ShipModuleType.Weapon_Missile_Large: return 'Raketová zbraň (V)';
    case ShipModuleType.Defense_ShieldGenerator: return 'Generátor štítu';
    case ShipModuleType.Defense_ArmorPlating: return 'Pancéřování';
    case ShipModuleType.Defense_ECM: return 'ECM systém';
    case ShipModuleType.System_Engine: return 'Motor';
    case ShipModuleType.System_Reactor: return 'Reaktor';
    case ShipModuleType.System_Sensor: return 'Senzory';
    case ShipModuleType.System_CargoBayExtension: return 'Rozšíření nákladu';
    case ShipModuleType.System_MiningLaser: return 'Těžební laser';
    case ShipModuleType.Utility_TractorBeam: return 'Traktorový paprsek';
    case ShipModuleType.Utility_RepairDrones: return 'Opravné drony';
    default: return moduleType.toString();
  }
};

const getSlotCompatibleTypes = (slotType: string): string[] => {
  switch (slotType) {
    case 'Weapon_Small':
      return ['Laserová zbraň (S)', 'Projektilová zbraň (S)'];
    case 'Weapon_Medium':
      return ['Projektilová zbraň (M)'];
    case 'Weapon_Large':
      return ['Raketová zbraň (V)'];
    case 'Defense':
      return ['Generátor štítu', 'Pancéřování', 'ECM systém'];
    case 'System':
      return ['Motor', 'Reaktor', 'Senzory', 'Rozšíření nákladu'];
    case 'Utility':
      return ['Traktorový paprsek', 'Opravné drony', 'Těžební laser'];
    default:
      return [];
  }
};

export default ModuleInfoPanel;
