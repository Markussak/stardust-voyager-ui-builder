
import { Vector2D } from './galaxy';

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
