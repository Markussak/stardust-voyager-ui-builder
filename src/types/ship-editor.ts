import { Vector2D } from './galaxy';
import { BaseItemData, ItemRarity } from './inventory';

export enum ShipModuleType {
  Weapon_Laser_Small = "Weapon_Laser_Small",
  Weapon_Projectile_Medium = "Weapon_Projectile_Medium",
  Weapon_Missile_Large = "Weapon_Missile_Large",
  Defense_ShieldGenerator = "Defense_ShieldGenerator",
  Defense_ArmorPlating = "Defense_ArmorPlating",
  Defense_ECM = "Defense_ECM",
  System_Engine = "System_Engine",
  System_Reactor = "System_Reactor",
  System_Sensor = "System_Sensor",
  System_CargoBayExtension = "System_CargoBayExtension",
  System_MiningLaser = "System_MiningLaser",
  Utility_TractorBeam = "Utility_TractorBeam",
  Utility_RepairDrones = "Utility_RepairDrones",
  Cosmetic_PaintJob = "Cosmetic_PaintJob",
  Cosmetic_Decal = "Cosmetic_Decal",
  Cosmetic_AntennaVariant = "Cosmetic_AntennaVariant"
}

export type ShipSlotType = 
  'Weapon_Small' | 
  'Weapon_Medium' | 
  'Weapon_Large' | 
  'Defense' | 
  'System' | 
  'Utility' | 
  'Cosmetic_Paint' | 
  'Cosmetic_Decal';

// Add a BaseItemData interface if it doesn't exist
export interface BaseItemData {
  id: string;
  name: string;
  type: string;
  description?: string;
  rarity?: ItemRarity;
  value?: number;
}

export interface ShipModuleData extends BaseItemData {
  moduleType: ShipModuleType;
  slotTypeRequired: ShipSlotType;
  sizeUnits?: number;
  statModifiers: Array<{ 
    statKey: string; 
    changeAbsolute?: number; 
    changePercent?: number; 
    description: string; 
  }>;
  powerConsumption_MW?: number;
  cpuLoad?: number;
  blueprintRequired_ToCraft?: string;
  installationCost_Credits?: number;
  installationCost_Materials?: Array<{ resourceId: string; quantity: number; }>;
  // Adding these properties for compatibility
  itemId?: string;
  defaultItemName?: string;
  defaultItemDescription?: string;
  baseValue_Credits?: number;
}

export interface ShipHardpointDefinition {
  id: string;
  slotType: ShipSlotType;
  positionOnShipSprite: Vector2D;
  orientation_deg?: number;
  maxModuleSizeUnits?: number;
  visualRepresentation_Empty: { 
    spriteAsset?: string; 
    textLabel?: string; 
    color: string; 
  };
  visualRepresentation_Occupied_HighlightColor?: string;
}

export interface ShipModuleInstance {
  moduleInstanceId: string;
  baseModuleId: string;
  equippedInSlotId?: string;
  durabilityPercent?: number;
  customizationOptions?: Record<string, any>;
}

export interface ShipEditorState {
  currentShipId: string;
  originalModuleInstances: ShipModuleInstance[];
  modifiedModuleInstances: ShipModuleInstance[];
  selectedModuleInstanceId?: string;
  selectedSlotId?: string;
  compareModuleInstanceId?: string;
  filterType?: string;
  sortKey?: string;
  searchText?: string;
  hasUnsavedChanges: boolean;
  installationCost_Credits: number;
  installationCost_Materials: Array<{ resourceId: string; quantity: number; }>;
}

export interface ShipStats {
  // Basic stats
  hullPoints_Base: number;
  hullPoints_Current: number;
  shieldPoints_Base: number;
  shieldPoints_Current: number;
  shieldRegenRate_PerSec_Base: number;
  
  // Energy
  energy_Production_MW: number;
  energy_Consumption_MW: number;
  energy_Balance_MW: number;
  
  // CPU
  cpu_Capacity: number;
  cpu_Used: number;
  
  // Mobility
  mobility: {
    turnRate_degPerSec: number;
    maxSpeed_unitsPerSec: number;
    acceleration_unitsPerSec2: number;
    strafeSpeedFactor: number;
  };
  
  // Cargo
  cargoCapacity_Units: number;
  
  // Weapons
  weaponPower_Combined: number;
  
  // Misc
  sensorRange_Units: number;
  jumpDriveRange_Units?: number;
}
