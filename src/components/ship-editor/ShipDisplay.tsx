
import React from 'react';
import { useShipEditor } from "@/contexts/ShipEditorContext";
import { ShipHardpointDefinition } from '@/types/ship-editor';

const ShipDisplay = () => {
  const { 
    shipHardpoints, 
    getModuleEquippedInSlot, 
    getModuleDataByInstanceId, 
    selectSlot, 
    editorState 
  } = useShipEditor();
  
  const handleSlotClick = (slotId: string) => {
    selectSlot(slotId);
  };
  
  // Center position for the ship
  const centerX = 200;
  const centerY = 200;
  
  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      {/* Ship body */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-80 bg-space-dark border-2 border-gray-600 rounded-md opacity-80"
        style={{
          clipPath: "polygon(50% 0%, 90% 20%, 100% 60%, 85% 95%, 15% 95%, 0% 60%, 10% 20%)"
        }}
      />
      
      {/* Ship hardpoints */}
      {shipHardpoints.map((hardpoint) => {
        const moduleInSlot = getModuleEquippedInSlot(hardpoint.id);
        const moduleData = moduleInSlot ? getModuleDataByInstanceId(moduleInSlot.moduleInstanceId) : undefined;
        const isSelected = editorState.selectedSlotId === hardpoint.id;
        
        return (
          <div
            key={hardpoint.id}
            className={`absolute cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isSelected ? 'ring-2 ring-space-buttons-glow' : ''
            } ${moduleInSlot ? 'bg-space-buttons bg-opacity-80' : 'border border-dashed border-opacity-70'}`}
            style={{
              left: `${centerX + hardpoint.positionOnShipSprite.x - 24}px`,
              top: `${centerY + hardpoint.positionOnShipSprite.y - 24}px`,
              borderColor: hardpoint.visualRepresentation_Empty.color,
              backgroundColor: moduleInSlot ? hardpoint.visualRepresentation_Occupied_HighlightColor : 'transparent',
            }}
            onClick={() => handleSlotClick(hardpoint.id)}
          >
            {moduleInSlot ? (
              <div className="text-center">
                <div className="text-xs font-pixel">{moduleData?.defaultItemName.substring(0, 10)}</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="font-bold text-sm text-space-ui-text">{hardpoint.visualRepresentation_Empty.textLabel}</div>
                <div className="text-xs text-space-ui-subtext">{getSlotTypeName(hardpoint.slotType)}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Helper function to get a readable name for slot types
const getSlotTypeName = (slotType: string): string => {
  switch (slotType) {
    case 'Weapon_Small': return 'Zbraň (S)';
    case 'Weapon_Medium': return 'Zbraň (M)';
    case 'Weapon_Large': return 'Zbraň (L)';
    case 'Defense': return 'Obrana';
    case 'System': return 'Systém';
    case 'Utility': return 'Utilita';
    case 'Cosmetic_Paint': return 'Barva';
    case 'Cosmetic_Decal': return 'Decal';
    default: return slotType;
  }
};

export default ShipDisplay;
