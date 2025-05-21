
import { Vector2D } from './galaxy';
import { ItemRarity } from './inventory';
import { ShipModuleType, ShipSlotType } from './ship-editor';

// Basic ship types
export interface ColorPalette {
  [name: string]: string | string[];
}

export interface AnimationParams {
  frameCount: number;
  speed: number;
  loop: boolean;
  spritesheetUrl?: string;
  soundEffect?: string;
}

export enum FactionId {
  SolarConfederacy = "SolarConfederacy",
  KrallEmpire = "KrallEmpire",
  NexusCult = "NexusCult",
  FreeMerchants = "FreeMerchants",
  AncientPrecursors = "AncientPrecursors",
  CorpAlliance = "CorpAlliance",
  Neutral = "Neutral",
  Pirates = "Pirates",
  XenoSwarm = "XenoSwarm"
}

// Faction ship style override
export interface FactionShipStyleOverride {
  factionId: FactionId;
  baseColorPalette_Override?: ColorPalette;
  hullTexture_Variant_AssetPath_Template?: string;
  engineExhaust_ColorGradient_Override?: { from: string; to: string; };
  uniqueVisualEffect?: {
    type: 'Glow_Aura' | 'Runic_Markings_Animated' | 'Spark_Emissions_DamagedLook' | 'Organic_Pulsation';
    color?: string;
    animation?: AnimationParams;
  };
  structuralVariations_AssetPath_Prefix?: string;
  decal_FactionLogo_AssetPath: string;
}

// Hull details
export interface HullPanelDetail {
  shape: string;
  sizeVariation: string;
  textureStyle: 'Clean_New' | 'Slightly_Worn' | 'Scratched_Dented' | 'Patched_Repaired';
  rivetScrewPattern?: 'Visible_Edges' | 'Scattered' | 'None';
  colorShadeOffset?: number;
}

export interface HullDetails {
  primaryMaterial: string;
  baseColorPalette: {
    primary: string;
    panelVariants: string[];
    accentPiping?: string;
    accentLights?: string;
  };
  panelingDescription: string;
}

// Ship mobility and functional stats
export interface BaseShipStats {
  hullPoints_Range: [number, number];
  shieldPoints_Base_Range: [number, number];
  armorRating_Base_Range: [number, number];
  maxSpeed_UnitsPerSec_Range: [number, number];
  acceleration_UnitsPerSec2_Range: [number, number];
  turnRate_DegPerSec_Range: [number, number];
  cargoCapacity_Units_Range: [number, number];
  sensorRange_Units_Range: [number, number];
  powerOutput_MW_Range: [number, number];
  baseMass_Tonnes_Range: [number, number];
  crewCapacity_MinMax: [number, number];
  fuelCapacity_Range: [number, number];
  hardpointSlots: {
    weapon_small_Range: [number, number];
    weapon_medium_Range: [number, number];
    weapon_large_Range: [number, number];
    weapon_turret_Range?: [number, number];
    defense_Range: [number, number];
    system_Range: [number, number];
    utility_Range: [number, number];
  };
  cost_Credits_ApproxRange: [number, number];
  requiredTechTier_ToUnlock?: number;
}

export interface ShipMobility {
  turnRate_degPerSec: number;
  maxSpeed_unitsPerSec: number;
  acceleration_unitsPerSec2: number;
  strafeSpeedFactor?: number;
}

export interface ShipFunctionalStats {
  mobility: ShipMobility;
  hullPoints_Base: number;
  shieldPoints_Base: number;
  shieldRegenRate_PerSec_Base: number;
  sensorRange_Base_Units: number;
  cargoCapacity_BaseUnits: number;
}

// Ship lore
export interface ShipLoreEntry {
  title: string;
  entryText: string;
  originStoryHint?: string;
  knownModifications_Common?: string[];
  quote?: {
    text: string;
    author: string;
  };
}

// Ship class definition
export interface ShipClassDefinition {
  classId: string;
  classNameKey: string;
  defaultClassName: string;
  category: 'Exploration' | 'Combat_Fighter' | 'Combat_Corvette' | 'Combat_Frigate' | 'Combat_Destroyer' | 'Combat_Cruiser' | 'Combat_Carrier' | 'Combat_Battleship' | 'Transport_Freighter' | 'Industrial_Mining' | 'Special_Unique_Alien' | 'Special_Unique_Ancient';
  roleDescriptionKey: string;
  defaultRoleDescription: string;
  sizeCategory: 'SmallCraft' | 'MediumShip' | 'LargeShip' | 'CapitalShip';
  pixelSize_ApproxRange_Px: Vector2D;
  baseSprite_AssetPath_Template: string;
  baseSpriteVariantCount: number;
  visualDesignCues: string[];
  baseStats: BaseShipStats;
  factionStyleOverrides?: FactionShipStyleOverride[];
  loreEntry_CodexKey?: string;
  soundProfile: {
    engine_Idle_Loop: string;
    engine_Thrust_Loop: string;
    engine_Boost_Loop?: string;
    hyperdrive_Charge_Loop?: string;
    ship_Ambient_Interior_Loop?: string;
  };
  predefinedModels?: Array<{
    modelId: string;
    modelNameKey: string;
    defaultModelName: string;
    specificSpriteAsset?: string;
    defaultModules_Equipped?: Array<{ hardpointId: string; moduleId: string; }>;
    costModifierFactor?: number;
    descriptionKey?: string;
    defaultDescription?: string;
  }>;
}

// Ship design principles
export interface GeneralShipDesignPrinciples {
  modularityConcept: string;
  visualClassDistinction: string;
  pixelArtDetailLevel: string;
  factionalDesignInfluence: string;
  roleSpecializationImpact: string;
  sizeCategories_Px: {
    SmallCraft_FightersExplorers: string;
    MediumShips_CorvettesFrigatesTransports: string;
    LargeShips_DestroyersCruisersCarriers: string;
    CapitalShips_BattleshipsDreadnoughts: string;
  };
  shipSprite_Perspective: 'TopDown_Strict' | 'TopDown_SlightAngledForDetail';
  animationRequirements: string[];
}

// Main ship configuration interface
export interface PlayerShipConfig_Nomad {
  id: string;
  className: string;
  role: string;
  appearancePhilosophy: string;
  dimensionsPx: {
    width: number;
    length: number;
  };
  baseSpriteAsset: string;
  visualDetails: {
    hull: HullDetails;
  };
  functionalStats: ShipFunctionalStats;
  internalLayout_Conceptual: string[];
  loreEntry: ShipLoreEntry;
  galaxyMapIcon: {
    assetUrl: string;
    sizePx: { width: number; length: number };
  };
}
