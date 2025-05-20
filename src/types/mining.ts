
import { BaseItemData, ItemRarity } from './inventory';
import { DamageInstance, DamageType } from './combat';

// Basic types
export interface Vector2D { 
  x: number; 
  y: number; 
}

export interface ColorPalette { 
  [name: string]: string | string[]; 
}

export interface AnimationParams {
  frameCount: number;
  speed: number; // frames per second or normalized speed (0-1)
  loop: boolean;
  spritesheetUrl?: string;
  soundEffect_Loop?: string;
  soundEffect_OneShot?: string;
}

// Resource definitions
export enum ResourceCategory {
  Metal_Common = 'Metal_Common',
  Metal_Rare = 'Metal_Rare',
  Silicate = 'Silicate',
  Gas_Fuel = 'Gas_Fuel',
  Gas_Industrial = 'Gas_Industrial',
  Crystal_Energy = 'Crystal_Energy',
  Crystal_Gem = 'Crystal_Gem',
  Exotic_Material = 'Exotic_Material',
  Organic_Compound = 'Organic_Compound'
}

export interface MinableResourceData extends BaseItemData {
  resourceCategory: ResourceCategory;
  miningDifficultyFactor?: number; // 0.5 (easy) - 2.0 (difficult) - affects mining speed
  isSolid: boolean; // True for ores/crystals, False for gases
  refiningRequired?: boolean; // Whether the resource needs to be processed in a refinery
  refinedTo_ItemId?: string; // ID of the processed material
  refiningRatio?: number; // How much raw resource is needed for 1 unit of processed material
}

export interface ResourceDeposit {
  resourceType: string; // Resource ID (e.g., "IronOre", "Helium3Gas")
  abundance: number; // 0-1
  visualIndicator?: { 
    type: 'Vein' | 'CrystalCluster' | 'SurfaceGlow'; 
    color?: string; 
    textureAsset?: string; 
  };
}

// Mining system configuration interfaces
export interface ResourceScanningConfig {
  baseScannerModuleId: string; // ID of the basic ship scanner module
  scanModes: Array<{
    modeId: 'GeneralComposition' | 'DetailedVeinAnalysis' | 'GasCloudDensity';
    scanTimeMs: number;
    rangeUnits: number;
    accuracyFactor: number; // 0-1 (how accurately it determines composition/quantity)
    uiDisplay_ResultFormat: string; // How results are displayed on HUD/UI (e.g., "PercentageList", "HeatmapOverlay")
    requiredScannerUpgrade_ModuleId?: string; // For advanced modes
  }>;
  visualCues_OnResourceNode: { // Visual indicators on minable objects (supplements ResourceDeposit.visualIndicator)
    glowAnimation_RichDeposit?: AnimationParams;
    particleEmission_UnstableDeposit?: AnimationParams;
  };
}

export type MiningTargetType = 'Solid_Asteroid' | 'Solid_PlanetarySurface' | 'Gas_NebulaCloud' | 'Gas_GiantAtmosphere';

export interface MiningToolTypeDefinition {
  toolModuleId_Base: string; // e.g., "mining_laser_mk1", "gas_collector_basic"
  targetResourceType: MiningTargetType;
  baseMiningRate_UnitsPerSec: number; // Base mining rate
  powerConsumption_MW_PerSec: number;
  effectiveRange_Units: number;
  beamOrCollector_VisualEffect: MiningToolVisualEffect;
  beamOrCollector_SoundEffect_Loop: string;
  upgradeTiers: Array<{
    moduleId_Upgrade: string; // e.g., "mining_laser_mk2"
    miningRate_Multiplier?: number;
    powerConsumption_Multiplier?: number;
    range_Multiplier?: number;
    unlock_TechId?: string; // Technology needed for this upgrade
    newVisualEffectKey?: string; // Reference to another MiningToolVisualEffect
  }>;
  canDamageShip_IfOverheated?: boolean;
  overheatMechanic?: any; // From Prompt 22, weaponFiringMechanics.overheatMechanic
}

export interface MiningDroneConfig {
  enabled: boolean;
  droneBayModuleId: string; // Ship module for launching drones
  maxActiveDrones_PerBayLevel: number[]; // e.g., [1, 2, 3] based on module level
  droneVisuals: {
    spriteAsset_Template: string; // e.g., "assets/images/drones/mining_drone_{level}_{variant}.png"
    sizePx: Vector2D;
    movementAnimation: AnimationParams;
    miningBeamEffect_Small: MiningToolVisualEffect; // Smaller effect for drones
  };
  droneAI_Behavior: {
    targetSelectionLogic: 'NearestResource' | 'RichestResource_InScannerRange';
    returnToShip_Condition: 'CargoFull' | 'LowEnergy' | 'PlayerRecall';
    collisionAvoidance_Factor: number;
  };
  droneCargoCapacity_Units: number;
  droneMiningRate_Factor: number; // Multiplier of base mining rate (e.g., 0.5x compared to ship laser)
  droneTravelSpeed_UnitsPerSec: number;
  soundEffect_Launch: string;
  soundEffect_ReturnDock: string;
  soundEffect_Mining_Loop_Drone: string;
}

export interface MiningProcessConfig {
  extractionType: 'Continuous_BeamOrCollector' | 'Chunk_Based_Solid' | 'Cycle_Based_Gas';
  targetLockRequired: boolean; // Whether resource must be targeted
  resourceDepletion_VisualCue: 'NodeShrinks' | 'NodeTextureChanges' | 'NodeGlowFades';
  cargoFull_Action: 'StopMining_NotifyPlayer' | 'DropExcessResources_AsCollectible';
  resourceTransferToCargo_VisualEffect?: AnimationParams; // E.g., particles flying to the ship
}

export interface MiningRiskConfig {
  unstableResource_ExplosionChance: number; // 0-1 when mining certain resources
  unstableResource_ExplosionDamage: DamageInstance;
  unstableResource_ExplosionVisualEffect: AnimationParams; // Big asteroid explosion
  pirateAttack_TriggerCondition: 'HighValueCargoPresent' | 'ProlongedMiningInUnsecuredSystem';
  pirateAttack_ChancePerMinute: number;
  environmentalHazard_DamagePerSecond_InField?: Record<string, { damageType: DamageType; amount: number; }>;
}

export interface MiningSystemConfig {
  resourceScanning: ResourceScanningConfig;
  miningTools: MiningToolTypeDefinition[];
  miningDrones: MiningDroneConfig;
  miningProcess: MiningProcessConfig;
  miningRisks: MiningRiskConfig;
  minableResourceDatabase_Path: string; // e.g., "assets/data/resources/minable_resources.json"
}

// Visual and sound effects for mining tools
export interface MiningBeamEffect {
  beamColorPalette: ColorPalette;
  beamThicknessPx_Range: [number, number];
  beamTextureStyle: 'Solid_Energy' | 'Pulsating_Wave' | 'Particle_Stream_Dense';
  beamAnimation_Idle?: AnimationParams;
  beamAnimation_Active: AnimationParams;
  impactEffect_OnTarget: {
    animation_SparksAndDebris: AnimationParams;
    glowEffect_Hotspot: { color: string; radiusPx: number; intensityAnimation: AnimationParams; };
    decalOnAsteroid_BurnMark_Asset?: string;
    soundEffect_Impact_Loop: string;
  };
  extractedChunks_Visual?: {
    spriteAsset_Template: string;
    sizeVariants: string[];
    animation_EjectionFromNode: AnimationParams;
    animation_CollectionBeamToShip?: AnimationParams;
  };
}

export interface GasCollectorEffect {
  intakeVisual_AssetPath?: string;
  intakeAnimation?: AnimationParams;
  particleFlow_ToShip: {
    particleSprite_Template: string;
    particleColor_ByGasType: Record<string, string>;
    density: number;
    speed: number;
    animation: AnimationParams;
  };
}

export type MiningToolVisualEffect = MiningBeamEffect | GasCollectorEffect;
