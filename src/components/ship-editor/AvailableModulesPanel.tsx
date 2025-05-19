
import React from 'react';
import { useShipEditor } from "@/contexts/ShipEditorContext";
import { ShipModuleType } from "@/types/ship-editor";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AvailableModulesPanel = () => {
  const { 
    moduleDatabase, 
    editorState, 
    selectModule, 
    getModuleDataByInstanceId 
  } = useShipEditor();
  
  // Mock available modules (in reality, this would come from inventory/shop)
  const availableModules = Object.values(moduleDatabase).map((moduleData, index) => ({
    moduleInstanceId: `available-${moduleData.itemId}-${index}`,
    baseModuleId: moduleData.itemId,
  }));
  
  // Filter modules based on filter settings
  const filteredModules = availableModules.filter(module => {
    const moduleData = moduleDatabase[module.baseModuleId];
    
    // Filter by type if a filter is active
    if (editorState.filterType && !moduleData.moduleType.toString().includes(editorState.filterType)) {
      return false;
    }
    
    // Filter by search text if search is active
    if (editorState.searchText) {
      const searchLower = editorState.searchText.toLowerCase();
      return (
        moduleData.defaultItemName.toLowerCase().includes(searchLower) ||
        moduleData.defaultItemDescription.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Sort modules based on sort settings
  const sortedModules = [...filteredModules].sort((a, b) => {
    const moduleA = moduleDatabase[a.baseModuleId];
    const moduleB = moduleDatabase[b.baseModuleId];
    
    switch (editorState.sortKey) {
      case 'Name_AZ':
        return moduleA.defaultItemName.localeCompare(moduleB.defaultItemName);
      case 'Type':
        return moduleA.moduleType.toString().localeCompare(moduleB.moduleType.toString());
      case 'Value_Desc':
        return moduleB.baseValue_Credits - moduleA.baseValue_Credits;
      case 'Value_Asc':
        return moduleA.baseValue_Credits - moduleB.baseValue_Credits;
      case 'PowerConsumption_Desc':
        return (moduleB.powerConsumption_MW || 0) - (moduleA.powerConsumption_MW || 0);
      case 'PowerConsumption_Asc':
        return (moduleA.powerConsumption_MW || 0) - (moduleB.powerConsumption_MW || 0);
      default:
        return 0;
    }
  });
  
  const handleModuleClick = (moduleInstanceId: string) => {
    selectModule(moduleInstanceId);
  };
  
  const getModuleTypeName = (moduleType: ShipModuleType): string => {
    switch (moduleType) {
      case ShipModuleType.Weapon_Laser_Small:
      case ShipModuleType.Weapon_Projectile_Medium:
      case ShipModuleType.Weapon_Missile_Large:
        return 'Zbraň';
      case ShipModuleType.Defense_ShieldGenerator:
      case ShipModuleType.Defense_ArmorPlating:
      case ShipModuleType.Defense_ECM:
        return 'Obrana';
      case ShipModuleType.System_Engine:
      case ShipModuleType.System_Reactor:
      case ShipModuleType.System_Sensor:
      case ShipModuleType.System_CargoBayExtension:
      case ShipModuleType.System_MiningLaser:
        return 'Systém';
      case ShipModuleType.Utility_TractorBeam:
      case ShipModuleType.Utility_RepairDrones:
        return 'Utilita';
      default:
        return 'Jiné';
    }
  };
  
  const getModuleTypeColor = (moduleType: ShipModuleType): string => {
    if (moduleType.toString().includes('Weapon')) return 'bg-red-600';
    if (moduleType.toString().includes('Defense')) return 'bg-green-600';
    if (moduleType.toString().includes('System')) return 'bg-blue-600';
    if (moduleType.toString().includes('Utility')) return 'bg-yellow-600';
    if (moduleType.toString().includes('Cosmetic')) return 'bg-purple-600';
    return 'bg-gray-600';
  };
  
  return (
    <div className="space-y-2">
      {sortedModules.map((module) => {
        const moduleData = moduleDatabase[module.baseModuleId];
        const isSelected = editorState.selectedModuleInstanceId === module.moduleInstanceId;
        
        return (
          <TooltipProvider key={module.moduleInstanceId}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`p-2 border rounded flex items-center cursor-pointer transition-colors ${
                    isSelected 
                      ? 'border-space-buttons-glow bg-space-dark' 
                      : 'border-space-buttons-border hover:bg-space-buttons hover:bg-opacity-20'
                  }`}
                  onClick={() => handleModuleClick(module.moduleInstanceId)}
                >
                  {/* Module icon placeholder */}
                  <div className={`w-10 h-10 ${getModuleTypeColor(moduleData.moduleType)} rounded-sm flex items-center justify-center text-white font-bold mr-3`}>
                    {moduleData.defaultItemName.substring(0, 2)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-pixel text-sm">{moduleData.defaultItemName}</div>
                    <div className="text-xs text-space-ui-subtext">{getModuleTypeName(moduleData.moduleType)}</div>
                  </div>
                  
                  {/* Power consumption indicator */}
                  {moduleData.powerConsumption_MW ? (
                    <div className="text-right text-xs">
                      <span className="text-yellow-400">{moduleData.powerConsumption_MW} MW</span>
                    </div>
                  ) : moduleData.moduleType === ShipModuleType.System_Reactor ? (
                    <div className="text-right text-xs">
                      <span className="text-green-400">+{moduleData.statModifiers.find(m => m.statKey === 'energy_Production_MW')?.changeAbsolute || 0} MW</span>
                    </div>
                  ) : null}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-space-dark border-space-buttons-border">
                <div className="max-w-xs">
                  <p className="text-sm font-medium">{moduleData.defaultItemName}</p>
                  <p className="text-xs text-gray-400">{getModuleTypeName(moduleData.moduleType)}</p>
                  <p className="text-xs mt-1">{moduleData.defaultItemDescription}</p>
                  
                  {moduleData.statModifiers.length > 0 && (
                    <div className="mt-1 border-t border-gray-700 pt-1">
                      {moduleData.statModifiers.map((modifier, idx) => (
                        <p key={idx} className="text-xs text-space-ui-text">{modifier.description}</p>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs mt-1 border-t border-gray-700 pt-1">
                    <span>{moduleData.baseValue_Credits} kreditů</span>
                    {moduleData.powerConsumption_MW && (
                      <span className="text-yellow-400">{moduleData.powerConsumption_MW} MW</span>
                    )}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
      
      {sortedModules.length === 0 && (
        <div className="text-center p-4 text-space-ui-subtext">
          <p>Žádné moduly odpovídající filtrům</p>
        </div>
      )}
    </div>
  );
};

export default AvailableModulesPanel;
