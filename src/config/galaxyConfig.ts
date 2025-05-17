
import { GalaxyMapVisuals, GalaxyShape, StarType, MapFilterDefinition } from '../types/galaxy';

// Vizuální nastavení galaktické mapy
export const galaxyMapVisuals: GalaxyMapVisuals = {
  background: {
    textureAssetUrl: "../assets/game/stars.png", // Dočasně použijeme existující asset
    colorTint: "#101520"
  },
  starIcon: {
    baseSizePx: [6, 12],
    colorByStarType: {
      [StarType.M_RedDwarf]: "#FF6666",
      [StarType.G_YellowMainSequence]: "#FFFF99",
      [StarType.A_White]: "#DDDDFF",
      [StarType.O_BlueGiant]: "#99CCFF",
      [StarType.NeutronStar]: "#FFFFFF",
      [StarType.BlackHole]: "#333333",
      [StarType.BinarySystem]: "#FFCC99",
      [StarType.TrinarySystem]: "#CCFF99"
    },
    animation: { frameCount: 4, speed: 1, loop: true }
  },
  hyperlaneStyle: {
    lineColor_Safe: "#3388FF80",
    lineColor_Dangerous: "#FF336680",
    lineColor_Unexplored: "#88888840",
    lineThicknessPx: 1,
    style_Discovered_Unvisited: "Dashed"
  },
  factionTerritoryOverlay: {
    alpha: 0.15,
    edgeSoftnessPx: 10
  },
  playerLocationMarker: {
    assetUrl: "../assets/game/nebula.png", // Dočasně použijeme existující asset
    sizePx: 16,
    animation: { frameCount: 8, speed: 1.5, loop: true }
  },
  plannedRouteMarker: {
    lineColor: "#00FF00",
    lineThicknessPx: 2,
    targetSystemHighlightColor: "#00FF00"
  },
  fogOfWarStyle: {
    color: "#000000",
    alpha: 0.7
  }
};

// Konfigurace generování galaxie
export const galaxyGenerationConfig = {
  galaxyShapeOptions: [
    GalaxyShape.Spiral_2Arm,
    GalaxyShape.Spiral_4Arm,
    GalaxyShape.Elliptical,
    GalaxyShape.Irregular_Cluster
  ],
  defaultGalaxyShape: GalaxyShape.Spiral_2Arm,
  starSystemCountRange: [100, 200],
  starTypeDistribution: [
    { type: StarType.M_RedDwarf, probabilityWeight: 40 },
    { type: StarType.G_YellowMainSequence, probabilityWeight: 25 },
    { type: StarType.A_White, probabilityWeight: 15 },
    { type: StarType.O_BlueGiant, probabilityWeight: 5 },
    { type: StarType.NeutronStar, probabilityWeight: 3 },
    { type: StarType.BlackHole, probabilityWeight: 2 },
    { type: StarType.BinarySystem, probabilityWeight: 10 }
  ],
};

// Filtry mapy
export const defaultMapFilters: MapFilterDefinition[] = [
  { 
    id: "filter_show_system_names", 
    labelKey: "mapFilter.systemNames", 
    defaultText: "Názvy Systémů", 
    iconAsset: "text-icon", 
    filterLogic: "Zobrazí/skryje textové názvy hvězdných systémů.",
    active: true
  },
  { 
    id: "filter_show_hyperlanes", 
    labelKey: "mapFilter.hyperlanes", 
    defaultText: "Hyperprostorové Trasy", 
    iconAsset: "route-icon", 
    filterLogic: "Zobrazí/skryje hyperprostorové trasy.",
    active: true
  },
  { 
    id: "filter_show_faction_territories", 
    labelKey: "mapFilter.factionTerritories", 
    defaultText: "Území Frakcí", 
    iconAsset: "faction-icon", 
    filterLogic: "Zobrazí/skryje barevné označení území frakcí.",
    active: true
  },
  { 
    id: "filter_highlight_quest_systems", 
    labelKey: "mapFilter.questSystems", 
    defaultText: "Misijní Systémy", 
    iconAsset: "quest-icon", 
    filterLogic: "Zvýrazní systémy relevantní pro aktivní mise hráče.",
    active: false
  }
];

// Konfigurace funkcí mapy
export const galaxyMapFunctionality = {
  zoomLevels: { min: 0.2, max: 3.0, default: 1.0 },
  panSpeed: 1.5,
  pathPlanningAlgorithm: "A_Star",
  pathPlanningOptions: ["Shortest", "Safest"],
  systemSelectionAction: "OpenSystemInfoPanel",
  searchFunctionality: true
};

// Tooltip obsah
export const tooltipContent = {
  systemName: true,
  starType: true,
  planetCount: true,
  controllingFaction: true,
  systemStatus: ["Bohatý na zdroje", "Pirátská aktivita", "Probíhá bitva", "Nezkoumaný"],
  distanceToPlayer: true
};
