import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ShipModuleData, ShipModuleInstance, ShipEditorState, ShipStats, ShipModuleType, ShipHardpointDefinition } from '../types/ship-editor';
import { useInventory } from './InventoryContext';
import { toast } from "sonner";
import { ItemRarity } from '@/types/inventory';

// Mock ship modules data
const mockShipModules: Record<string, ShipModuleData> = {
  'laser_cannon_mk1': {
    itemId: 'laser_cannon_mk1',
    itemNameKey: 'modules.laser_cannon_mk1.name',
    defaultItemName: 'Laserový kanon Mk1',
    itemDescriptionKey: 'modules.laser_cannon_mk1.description',
    defaultItemDescription: 'Standardní laserový kanón pro menší lodě. Spolehlivý a s přiměřeným výkonem.',
    itemIconKey: 'module_weapon_laser_mk1',
    itemTypeKey: 'item.type.ship_module',
    defaultItemType: 'Lodní modul',
    isStackable: false,
    baseValue_Credits: 1500,
    weightPerUnit: 8,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.Weapon_Laser_Small,
    slotTypeRequired: 'Weapon_Small',
    statModifiers: [
      { statKey: 'weaponPower_Combined', changeAbsolute: 15, description: '+15 Výkon zbraně' }
    ],
    powerConsumption_MW: 5,
    cpuLoad: 2,
    installationCost_Credits: 150
  },
  'shield_generator_basic': {
    itemId: 'shield_generator_basic',
    itemNameKey: 'modules.shield_generator_basic.name',
    defaultItemName: 'Základní generátor štítu',
    itemDescriptionKey: 'modules.shield_generator_basic.description',
    defaultItemDescription: 'Vytváří energetické pole, které chrání loď před poškozením.',
    itemIconKey: 'module_defense_shield_basic',
    itemTypeKey: 'item.type.ship_module',
    defaultItemType: 'Lodní modul',
    isStackable: false,
    baseValue_Credits: 2200,
    weightPerUnit: 12,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.Defense_ShieldGenerator,
    slotTypeRequired: 'Defense',
    statModifiers: [
      { statKey: 'shieldPoints_Base', changeAbsolute: 50, description: '+50 Body štítu' },
      { statKey: 'shieldRegenRate_PerSec_Base', changeAbsolute: 1, description: '+1 Regenerace štítu/s' }
    ],
    powerConsumption_MW: 8,
    cpuLoad: 3,
    installationCost_Credits: 220
  },
  'engine_basic': {
    itemId: 'engine_basic',
    itemNameKey: 'modules.engine_basic.name',
    defaultItemName: 'Základní motor',
    itemDescriptionKey: 'modules.engine_basic.description',
    defaultItemDescription: 'Standardní pohonná jednotka s průměrným výkonem a spolehlivostí.',
    itemIconKey: 'module_system_engine_basic',
    itemTypeKey: 'item.type.ship_module',
    defaultItemType: 'Lodní modul',
    isStackable: false,
    baseValue_Credits: 1800,
    weightPerUnit: 15,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.System_Engine,
    slotTypeRequired: 'System',
    statModifiers: [
      { statKey: 'mobility.maxSpeed_unitsPerSec', changeAbsolute: 20, description: '+20 Maximální rychlost' },
      { statKey: 'mobility.acceleration_unitsPerSec2', changeAbsolute: 5, description: '+5 Zrychlení' }
    ],
    powerConsumption_MW: 10,
    cpuLoad: 2,
    installationCost_Credits: 180
  },
  'reactor_mk1': {
    itemId: 'reactor_mk1',
    itemNameKey: 'modules.reactor_mk1.name',
    defaultItemName: 'Reaktor Mk1',
    itemDescriptionKey: 'modules.reactor_mk1.description',
    defaultItemDescription: 'Základní energetický reaktor pro napájení systémů lodi.',
    itemIconKey: 'module_system_reactor_mk1',
    itemTypeKey: 'item.type.ship_module',
    defaultItemType: 'Lodní modul',
    isStackable: false,
    baseValue_Credits: 2500,
    weightPerUnit: 20,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.System_Reactor,
    slotTypeRequired: 'System',
    statModifiers: [
      { statKey: 'energy_Production_MW', changeAbsolute: 25, description: '+25 MW Výroba energie' }
    ],
    cpuLoad: 1,
    installationCost_Credits: 250
  },
  'armor_plating_basic': {
    itemId: 'armor_plating_basic',
    itemNameKey: 'modules.armor_plating_basic.name',
    defaultItemName: 'Základní pancéřování',
    itemDescriptionKey: 'modules.armor_plating_basic.description',
    defaultItemDescription: 'Přidává další vrstvu ochrany trupu lodi.',
    itemIconKey: 'module_defense_armor_basic',
    itemTypeKey: 'item.type.ship_module',
    defaultItemType: 'Lodní modul',
    isStackable: false,
    baseValue_Credits: 1200,
    weightPerUnit: 25,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.Defense_ArmorPlating,
    slotTypeRequired: 'Defense',
    statModifiers: [
      { statKey: 'hullPoints_Base', changeAbsolute: 40, description: '+40 Body trupu' }
    ],
    installationCost_Credits: 120,
    installationCost_Materials: [
      { resourceId: 'iron_ore', quantity: 10 },
      { resourceId: 'titanium_alloy', quantity: 5 }
    ]
  }
};

// Mockup ship hardpoints definition
const mockShipHardpoints: ShipHardpointDefinition[] = [
  {
    id: 'weapon_slot_front_small_01',
    slotType: 'Weapon_Small',
    positionOnShipSprite: { x: 0, y: -40 },
    orientation_deg: 0,
    visualRepresentation_Empty: { color: '#3388ff', textLabel: 'W1' }
  },
  {
    id: 'weapon_slot_front_small_02',
    slotType: 'Weapon_Small',
    positionOnShipSprite: { x: 0, y: -20 },
    orientation_deg: 0,
    visualRepresentation_Empty: { color: '#3388ff', textLabel: 'W2' }
  },
  {
    id: 'defense_slot_01',
    slotType: 'Defense',
    positionOnShipSprite: { x: -30, y: 0 },
    visualRepresentation_Empty: { color: '#33cc33', textLabel: 'D1' }
  },
  {
    id: 'defense_slot_02',
    slotType: 'Defense',
    positionOnShipSprite: { x: 30, y: 0 },
    visualRepresentation_Empty: { color: '#33cc33', textLabel: 'D2' }
  },
  {
    id: 'system_slot_01',
    slotType: 'System',
    positionOnShipSprite: { x: -20, y: 30 },
    visualRepresentation_Empty: { color: '#ffcc00', textLabel: 'S1' }
  },
  {
    id: 'system_slot_02',
    slotType: 'System',
    positionOnShipSprite: { x: 20, y: 30 },
    visualRepresentation_Empty: { color: '#ffcc00', textLabel: 'S2' }
  }
];

// Initialize mock ship editor state
const initializeShipEditorState = (): ShipEditorState => {
  // Create some initial modules
  const initialModules: ShipModuleInstance[] = [
    {
      moduleInstanceId: 'instance-laser-1',
      baseModuleId: 'laser_cannon_mk1',
      equippedInSlotId: 'weapon_slot_front_small_01'
    },
    {
      moduleInstanceId: 'instance-shield-1',
      baseModuleId: 'shield_generator_basic',
      equippedInSlotId: 'defense_slot_01'
    },
    {
      moduleInstanceId: 'instance-engine-1',
      baseModuleId: 'engine_basic',
      equippedInSlotId: 'system_slot_01'
    },
    {
      moduleInstanceId: 'instance-reactor-1',
      baseModuleId: 'reactor_mk1',
      equippedInSlotId: 'system_slot_02'
    }
  ];

  return {
    currentShipId: 'player_ship_nomad',
    originalModuleInstances: [...initialModules],
    modifiedModuleInstances: [...initialModules],
    hasUnsavedChanges: false,
    installationCost_Credits: 0,
    installationCost_Materials: []
  };
};

// Calculate ship stats based on base stats and equipped modules
const calculateShipStats = (baseStats: ShipStats, modules: ShipModuleInstance[]): ShipStats => {
  // Start with base stats
  const stats: ShipStats = { ...baseStats };
  
  // Initialize energy and CPU metrics
  stats.energy_Production_MW = 0;
  stats.energy_Consumption_MW = 0;
  stats.cpu_Used = 0;
  stats.weaponPower_Combined = 0;
  
  // Apply modifiers from modules
  modules.forEach(moduleInstance => {
    const moduleData = mockShipModules[moduleInstance.baseModuleId];
    if (!moduleData || !moduleInstance.equippedInSlotId) return;
    
    // Apply stat modifiers
    moduleData.statModifiers.forEach(modifier => {
      const statPath = modifier.statKey.split('.');
      let target: any = stats;
      
      // Navigate to the correct nested property
      for (let i = 0; i < statPath.length - 1; i++) {
        target = target[statPath[i]];
      }
      
      // Apply the modification
      const finalProperty = statPath[statPath.length - 1];
      if (modifier.changeAbsolute) {
        target[finalProperty] += modifier.changeAbsolute;
      }
      if (modifier.changePercent) {
        target[finalProperty] *= (1 + modifier.changePercent);
      }
    });
    
    // Track energy consumption/production
    if (moduleData.powerConsumption_MW) {
      stats.energy_Consumption_MW += moduleData.powerConsumption_MW;
    }
    if (moduleData.moduleType === ShipModuleType.System_Reactor) {
      // This is handled by the stat modifiers now, but keeping this comment for clarity
      // stats.energy_Production_MW += /* reactor output */;
    }
    
    // Track CPU usage
    if (moduleData.cpuLoad) {
      stats.cpu_Used += moduleData.cpuLoad;
    }
  });
  
  // Calculate energy balance
  stats.energy_Balance_MW = stats.energy_Production_MW - stats.energy_Consumption_MW;
  
  return stats;
};

// Base ship stats for the Nomad ship
const baseShipStats: ShipStats = {
  hullPoints_Base: 100,
  hullPoints_Current: 100,
  shieldPoints_Base: 0, // Base shield is 0, needs a shield generator
  shieldPoints_Current: 0,
  shieldRegenRate_PerSec_Base: 0,
  energy_Production_MW: 0, // Base energy production is 0, needs a reactor
  energy_Consumption_MW: 0,
  energy_Balance_MW: 0,
  cpu_Capacity: 20,
  cpu_Used: 0,
  mobility: {
    turnRate_degPerSec: 45,
    maxSpeed_unitsPerSec: 50,
    acceleration_unitsPerSec2: 10,
    strafeSpeedFactor: 0.5
  },
  cargoCapacity_Units: 100,
  weaponPower_Combined: 0,
  sensorRange_Units: 500
};

interface ShipEditorProviderProps {
  children: ReactNode;
}

interface ShipEditorContextType {
  editorState: ShipEditorState;
  shipStats: ShipStats;
  moduleDatabase: Record<string, ShipModuleData>;
  shipHardpoints: ShipHardpointDefinition[];
  selectModule: (moduleInstanceId?: string) => void;
  selectSlot: (slotId?: string) => void;
  equipModule: (moduleInstanceId: string, slotId: string) => void;
  unequipModule: (slotId: string) => void;
  compareModule: (moduleInstanceId?: string) => void;
  applyChanges: () => void;
  revertChanges: () => void;
  setFilter: (filterType?: string) => void;
  setSort: (sortKey?: string) => void;
  setSearchText: (text?: string) => void;
  getModuleById: (moduleId: string) => ShipModuleData | undefined;
  getModuleByInstanceId: (instanceId: string) => ShipModuleInstance | undefined;
  getModuleDataByInstanceId: (instanceId: string) => ShipModuleData | undefined;
  getModuleEquippedInSlot: (slotId: string) => ShipModuleInstance | undefined;
  getHardpointById: (hardpointId: string) => ShipHardpointDefinition | undefined;
  isSlotCompatibleWithModule: (slotId: string, moduleInstanceId: string) => boolean;
}

const ShipEditorContext = createContext<ShipEditorContextType | undefined>(undefined);

export const ShipEditorProvider: React.FC<ShipEditorProviderProps> = ({ children }) => {
  const [editorState, setEditorState] = useState<ShipEditorState>(initializeShipEditorState);
  const [shipStats, setShipStats] = useState<ShipStats>(calculateShipStats(baseShipStats, editorState.modifiedModuleInstances));
  
  // Recalculate stats when modules change
  useEffect(() => {
    const updatedStats = calculateShipStats(baseShipStats, editorState.modifiedModuleInstances);
    setShipStats(updatedStats);
  }, [editorState.modifiedModuleInstances]);
  
  // Calculate installation costs when changes are made
  useEffect(() => {
    if (!editorState.hasUnsavedChanges) {
      setEditorState(prev => ({
        ...prev,
        installationCost_Credits: 0,
        installationCost_Materials: []
      }));
      return;
    }
    
    // Compare original and modified module instances to determine costs
    const originalEquipped = new Set(
      editorState.originalModuleInstances
        .filter(m => m.equippedInSlotId)
        .map(m => `${m.baseModuleId}-${m.equippedInSlotId}`)
    );
    
    const modifiedEquipped = new Set(
      editorState.modifiedModuleInstances
        .filter(m => m.equippedInSlotId)
        .map(m => `${m.baseModuleId}-${m.equippedInSlotId}`)
    );
    
    let totalCost = 0;
    const materials: Record<string, number> = {};
    
    // Check newly added modules
    editorState.modifiedModuleInstances
      .filter(m => m.equippedInSlotId)
      .forEach(module => {
        const key = `${module.baseModuleId}-${module.equippedInSlotId}`;
        if (!originalEquipped.has(key)) {
          // This is a new module or a module moved to a different slot
          const moduleData = mockShipModules[module.baseModuleId];
          if (moduleData) {
            totalCost += moduleData.installationCost_Credits || 0;
            
            // Add material costs
            if (moduleData.installationCost_Materials) {
              moduleData.installationCost_Materials.forEach(material => {
                materials[material.resourceId] = (materials[material.resourceId] || 0) + material.quantity;
              });
            }
          }
        }
      });
    
    // Update state with calculated costs
    setEditorState(prev => ({
      ...prev,
      installationCost_Credits: totalCost,
      installationCost_Materials: Object.entries(materials).map(([resourceId, quantity]) => ({
        resourceId,
        quantity
      }))
    }));
  }, [editorState.hasUnsavedChanges, editorState.modifiedModuleInstances, editorState.originalModuleInstances]);
  
  // Select a module
  const selectModule = (moduleInstanceId?: string) => {
    setEditorState(prev => ({
      ...prev,
      selectedModuleInstanceId: moduleInstanceId,
      selectedSlotId: undefined
    }));
  };
  
  // Select a slot
  const selectSlot = (slotId?: string) => {
    setEditorState(prev => ({
      ...prev,
      selectedSlotId: slotId,
      selectedModuleInstanceId: undefined
    }));
  };
  
  // Get module by ID
  const getModuleById = (moduleId: string): ShipModuleData | undefined => {
    return mockShipModules[moduleId];
  };
  
  // Get module instance by ID
  const getModuleByInstanceId = (instanceId: string): ShipModuleInstance | undefined => {
    return editorState.modifiedModuleInstances.find(m => m.moduleInstanceId === instanceId);
  };
  
  // Get module data by instance ID
  const getModuleDataByInstanceId = (instanceId: string): ShipModuleData | undefined => {
    const moduleInstance = getModuleByInstanceId(instanceId);
    if (moduleInstance) {
      return getModuleById(moduleInstance.baseModuleId);
    }
    return undefined;
  };
  
  // Get module equipped in a slot
  const getModuleEquippedInSlot = (slotId: string): ShipModuleInstance | undefined => {
    return editorState.modifiedModuleInstances.find(m => m.equippedInSlotId === slotId);
  };
  
  // Get hardpoint by ID
  const getHardpointById = (hardpointId: string): ShipHardpointDefinition | undefined => {
    return mockShipHardpoints.find(h => h.id === hardpointId);
  };
  
  // Check if a slot is compatible with a module
  const isSlotCompatibleWithModule = (slotId: string, moduleInstanceId: string): boolean => {
    const module = getModuleByInstanceId(moduleInstanceId);
    if (!module) return false;
    
    const moduleData = getModuleById(module.baseModuleId);
    if (!moduleData) return false;
    
    const hardpoint = getHardpointById(slotId);
    if (!hardpoint) return false;
    
    return hardpoint.slotType === moduleData.slotTypeRequired;
  };
  
  // Equip a module to a slot
  const equipModule = (moduleInstanceId: string, slotId: string) => {
    // Check if the module exists
    const module = getModuleByInstanceId(moduleInstanceId);
    if (!module) {
      toast.error("Modul nenalezen");
      return;
    }
    
    // Check if the slot exists
    const hardpoint = getHardpointById(slotId);
    if (!hardpoint) {
      toast.error("Slot nenalezen");
      return;
    }
    
    // Check compatibility
    const moduleData = getModuleById(module.baseModuleId);
    if (!moduleData || hardpoint.slotType !== moduleData.slotTypeRequired) {
      toast.error("Modul není kompatibilní s tímto slotem");
      return;
    }
    
    // Check if the slot is occupied
    const occupyingModule = getModuleEquippedInSlot(slotId);
    if (occupyingModule) {
      // Unequip the current module
      unequipModule(slotId);
    }
    
    // Unequip the module from its current slot if it's equipped elsewhere
    if (module.equippedInSlotId) {
      setEditorState(prev => ({
        ...prev,
        modifiedModuleInstances: prev.modifiedModuleInstances.map(m => 
          m.moduleInstanceId === moduleInstanceId ? { ...m, equippedInSlotId: undefined } : m
        ),
        hasUnsavedChanges: true
      }));
    }
    
    // Equip the module to the new slot
    setEditorState(prev => ({
      ...prev,
      modifiedModuleInstances: prev.modifiedModuleInstances.map(m => 
        m.moduleInstanceId === moduleInstanceId ? { ...m, equippedInSlotId: slotId } : m
      ),
      hasUnsavedChanges: true
    }));
    
    toast.success(`${moduleData?.defaultItemName} připojen do slotu ${hardpoint.visualRepresentation_Empty.textLabel}`);
  };
  
  // Unequip a module from a slot
  const unequipModule = (slotId: string) => {
    const module = getModuleEquippedInSlot(slotId);
    if (!module) {
      toast.error("V tomto slotu není žádný modul");
      return;
    }
    
    const moduleData = getModuleById(module.baseModuleId);
    const hardpoint = getHardpointById(slotId);
    
    setEditorState(prev => ({
      ...prev,
      modifiedModuleInstances: prev.modifiedModuleInstances.map(m => 
        m.moduleInstanceId === module.moduleInstanceId ? { ...m, equippedInSlotId: undefined } : m
      ),
      hasUnsavedChanges: true
    }));
    
    toast.info(`${moduleData?.defaultItemName} odpojen ze slotu ${hardpoint?.visualRepresentation_Empty.textLabel}`);
  };
  
  // Compare a module with the selected module
  const compareModule = (moduleInstanceId?: string) => {
    setEditorState(prev => ({
      ...prev,
      compareModuleInstanceId: moduleInstanceId
    }));
  };
  
  // Apply changes
  const applyChanges = () => {
    // Check if there's enough energy
    if (shipStats.energy_Balance_MW < 0) {
      toast.error("Nedostatek energie! Přidejte reaktor nebo odeberte některé moduly.");
      return;
    }
    
    // Check if there's enough CPU capacity
    if (shipStats.cpu_Used > shipStats.cpu_Capacity) {
      toast.error("Překročena CPU kapacita! Odeberte některé moduly.");
      return;
    }
    
    // Apply changes
    setEditorState(prev => ({
      ...prev,
      originalModuleInstances: [...prev.modifiedModuleInstances],
      hasUnsavedChanges: false
    }));
    
    toast.success("Změny uloženy, moduly úspěšně nainstalovány.");
  };
  
  // Revert changes
  const revertChanges = () => {
    setEditorState(prev => ({
      ...prev,
      modifiedModuleInstances: [...prev.originalModuleInstances],
      hasUnsavedChanges: false
    }));
    
    toast.info("Změny vráceny do původního stavu.");
  };
  
  // Set filter for module display
  const setFilter = (filterType?: string) => {
    setEditorState(prev => ({
      ...prev,
      filterType
    }));
  };
  
  // Set sort method for module display
  const setSort = (sortKey?: string) => {
    setEditorState(prev => ({
      ...prev,
      sortKey
    }));
  };
  
  // Set search text
  const setSearchText = (searchText?: string) => {
    setEditorState(prev => ({
      ...prev,
      searchText
    }));
  };
  
  const value = {
    editorState,
    shipStats,
    moduleDatabase: mockShipModules,
    shipHardpoints: mockShipHardpoints,
    selectModule,
    selectSlot,
    equipModule,
    unequipModule,
    compareModule,
    applyChanges,
    revertChanges,
    setFilter,
    setSort,
    setSearchText,
    getModuleById,
    getModuleByInstanceId,
    getModuleDataByInstanceId,
    getModuleEquippedInSlot,
    getHardpointById,
    isSlotCompatibleWithModule
  };
  
  return (
    <ShipEditorContext.Provider value={value}>
      {children}
    </ShipEditorContext.Provider>
  );
};

export const useShipEditor = (): ShipEditorContextType => {
  const context = useContext(ShipEditorContext);
  if (context === undefined) {
    throw new Error('useShipEditor must be used within a ShipEditorProvider');
  }
  return context;
};
