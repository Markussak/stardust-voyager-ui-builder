
export enum GalaxyShape {
  Spiral_2Arm = "Spiral_2Arm",
  Spiral_4Arm = "Spiral_4Arm",
  Elliptical = "Elliptical",
  Irregular_Cluster = "Irregular_Cluster",
  Ring = "Ring"
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

export interface Vector2D {
  x: number;
  y: number;
}

export interface AnimationParams {
  frameCount: number;
  speed: number;
  loop: boolean;
  spritesheetUrl?: string;
}

export interface ParallaxLayer {
  assetUrl: string;
  depth: number;
  scrollSpeed: { x: number; y: number; };
  blendMode?: string;
  alpha?: number;
  animation?: AnimationParams;
}

export interface StarSystem {
  id: string;
  name: string;
  position: Vector2D;
  starType: StarType;
  explored: boolean;
  controllingFaction?: string;
  planets: number;
  anomalyPresent: boolean;
  resources: string[];
  specialStatus?: string[];
}

export interface Hyperlane {
  fromSystemId: string;
  toSystemId: string;
  danger: 'Safe' | 'Dangerous' | 'Unexplored';
}

export interface Galaxy {
  systems: StarSystem[];
  hyperlanes: Hyperlane[];
  shape: GalaxyShape;
  playerPosition?: string; // ID systému, kde se hráč nachází
  playerRoute?: string[]; // Naplánovaná trasa hráče (ID systémů)
}

export interface GalaxyMapVisuals {
  background: {
    textureAssetUrl: string;
    layers?: ParallaxLayer[];
    colorTint?: string;
  };
  starIcon: {
    baseSizePx: [number, number]; // min-max velikost
    colorByStarType: Record<StarType, string>;
    animation?: AnimationParams;
    assetVariantsPerType?: number;
  };
  hyperlaneStyle: {
    lineColor_Safe: string;
    lineColor_Dangerous: string;
    lineColor_Unexplored: string;
    lineThicknessPx: number;
    animation?: AnimationParams;
    style_Discovered_Unvisited: 'Dashed' | 'Faded';
  };
  factionTerritoryOverlay: {
    alpha: number;
    borderColor?: string;
    borderThicknessPx?: number;
    edgeSoftnessPx?: number;
  };
  playerLocationMarker: {
    assetUrl: string;
    animation?: AnimationParams;
    sizePx: number;
  };
  plannedRouteMarker: {
    lineColor: string;
    lineThicknessPx: number;
    targetSystemHighlightColor: string;
  };
  fogOfWarStyle?: {
    color: string;
    alpha: number;
    textureAssetUrl?: string;
  };
}

export interface MapFilterDefinition {
  id: string;
  labelKey: string;
  defaultText: string;
  iconAsset: string;
  filterLogic: string;
  active: boolean;
}
