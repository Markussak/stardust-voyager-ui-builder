
import { Vector2D } from './galaxy';

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

export interface HeatHazeEffect {
  shaderAsset: string;
  intensityFactor: number;
  animationSpeed: number;
}

export enum StarType {
  M_RedDwarf = "M_RedDwarf",
  G_YellowMainSequence = "G_YellowMainSequence",
  A_White = "A_White", 
  O_BlueGiant = "O_BlueGiant",
  NeutronStar = "NeutronStar",
  BlackHole = "BlackHole",
  BinarySystem = "BinarySystem",
  TrinarySystem = "TrinarySystem"
}

export interface StarGeneralDesignPrinciples {
  scaleAndSize_SystemMap_Px: [number, number];
  dynamicAppearance: string;
  systemLightingSource: string;
  hazardProximity: {
    enabled: boolean;
    damageType: 'Heat' | 'Radiation';
    damageIncreaseFactor: number;
    visualEffect_HeatHaze?: HeatHazeEffect;
    specialProtectionRequired?: string;
  };
  resourceCollection?: {
    type: 'SolarWindParticles' | 'ExoticEnergy';
    collectionModuleRequired: string;
    riskFactor: number;
  };
  layeredPixelArtStructure: {
    core_Photosphere: string;
    chromosphere: string;
    corona: string;
    surfaceDetails: string[];
  };
  soundDesign_Ambient: string;
}

// Specifické typy pro hvězdu třídy G
export enum StarG_SunspotType {
  Simple_Round_Small = "Simple_Round_Small",
  Simple_Round_Large_WithPenumbra = "Simple_Round_Large_WithPenumbra",
  Elongated_Oval = "Elongated_Oval",
  Group_Multiple_Small_Spots = "Group_Multiple_Small_Spots",
  Complex_MultiCore_Irregular = "Complex_MultiCore_Irregular",
  Fibrous_Penumbra_Detailed = "Fibrous_Penumbra_Detailed",
  Decaying_Fading = "Decaying_Fading",
  NewlyForming_LowContrast = "NewlyForming_LowContrast",
  Overlapped_By_Faculae = "Overlapped_By_Faculae",
  MagneticallyActive_LoopConnections = "MagneticallyActive_LoopConnections",
  Old_Faint_LowContrast = "Old_Faint_LowContrast"
}

export interface StarG_Sunspot {
  type: StarG_SunspotType;
  sizePxRange: [number, number];
  position: { lat: number; lon: number };
  animation_Movement: AnimationParams;
  animation_ShapeChange?: AnimationParams;
  textureAsset_Template: string;
  variantCount: number;
  penumbraColor: string;
  umbraColor: string;
}

export enum StarG_FaculaeType {
  Reticulated_Network = "Reticulated_Network",
  Linear_Bands = "Linear_Bands",
  Compact_BrightPatch = "Compact_BrightPatch",
  Limb_Prominent = "Limb_Prominent",
  Pulsating_Bright = "Pulsating_Bright"
}

export interface StarG_Faculae {
  type: StarG_FaculaeType;
  areaCoveragePercent: number;
  brightnessFactor: number;
  animation_ShapeIntensity: AnimationParams;
  textureAsset_Template: string;
  variantCount: number;
  color: string;
}

export enum StarG_SolarFlareType {
  Arch_Symmetrical = "Arch_Symmetrical",
  Loop_Interconnected = "Loop_Interconnected",
  Columnar_Jet_Short = "Columnar_Jet_Short",
  Detached_Ejection = "Detached_Ejection",
  Quick_Brief_Flare = "Quick_Brief_Flare",
  Quiescent_LongLived_Prominence = "Quiescent_LongLived_Prominence",
  Multiple_From_ActiveRegion = "Multiple_From_ActiveRegion",
  Spiral_Twisting_Prominence = "Spiral_Twisting_Prominence",
  Fragmenting_Eruption = "Fragmenting_Eruption",
  Dancing_Dynamic_Shape = "Dancing_Dynamic_Shape"
}

export interface StarG_SolarFlare {
  type: StarG_SolarFlareType;
  sizeScaleRelativeToStarDiameter: [number, number];
  animation: AnimationParams;
  colorPalette: ColorPalette;
  textureStyle: 'Fibrous_Plasma' | 'Smooth_MagneticLoop';
  spawnChancePerTimeUnit: number;
  durationRangeSeconds: [number, number];
  soundEffect_Eruption: string;
}

export enum StarG_CME_Type {
  Halo_Symmetrical = "Halo_Symmetrical",
  Directional_Jet = "Directional_Jet",
  Complex_Filamentary = "Complex_Filamentary"
}

export interface StarG_CoronalMassEjection {
  type: StarG_CME_Type;
  animation: AnimationParams;
  color: string;
  sizeScaleAtMax: number;
  speed: number;
  gameEffect?: string;
  spawnChance_Rare: number;
  soundEffect_Blast: string;
}

export interface StarG_CoronaDetails {
  textureStyle: 'Irregular_Rays' | 'Fibrous_Loops' | 'Dynamic_Streamers';
  animation: AnimationParams;
  colorRange: [string, string];
  extentFactor: number;
  densityVariation: boolean;
}

export interface StarTypeG_Specifics {
  photosphere: {
    granulationTexture: {
      cellSizePxRange: [number, number];
      animation: AnimationParams;
      colorPalette: ColorPalette;
    };
    limbDarkeningFactor: number;
  };
  sunspotConfig: {
    maxActiveSpots: number;
    spotGenerationRules: string;
    spots: StarG_Sunspot[];
  };
  faculaeConfig: {
    appearanceChanceNearSunspots: number;
    faculaeTypes: StarG_Faculae[];
  };
  solarFlareConfig: {
    maxActiveFlares: number;
    flareGenerationRules: string;
    flareTypes: StarG_SolarFlare[];
  };
  cmeConfig?: {
    cmeTypes: StarG_CoronalMassEjection[];
  };
  coronaDetails: StarG_CoronaDetails;
  lensflareEffect?: {
    shaderAsset: string;
    color: string;
    intensity: number;
    shapeElements: Array<'Halo' | 'Streaks' | 'PolygonalGhosts'>;
  };
}

export interface StarLoreEntry {
  title: string;
  generalDescription: string;
  lifeSupportingPotential: string;
  activityCycleInfo?: string;
  explorerNotes?: string[];
}

export interface StarData {
  id: string;
  name: string;
  type: StarType;
  sizePx: number;
  position?: Vector2D;
  loreEntry?: StarLoreEntry;
  activityLevel?: number; // 0-1, ovlivňuje četnost skvrn, erupcí atd.
}

export interface StarDataTypeG extends StarData {
  type: StarType.G_YellowMainSequence;
  specificParams: StarTypeG_Specifics;
  activeFeatures?: {
    sunspots: StarG_Sunspot[];
    solarFlares: StarG_SolarFlare[];
    activeCME?: StarG_CoronalMassEjection;
  };
}
