import { CrewSkillId } from "./crew";
import { CraftingMaterial as BaseCraftingMaterial } from "./crafting";
import { FactionId } from "./diplomacy";
import { Vector2D } from "./game";

// Extend the CraftingMaterial interface to include quantityRequired
export interface CraftingMaterial extends BaseCraftingMaterial {
  quantityRequired: number;
}

export enum PlanetarySurfaceInteractionType {
    TextAdventure_ChoiceBased = "TextAdventure_ChoiceBased",
    SystemMap_POI_Interaction = "SystemMap_POI_Interaction", 
    MiniGame_SkillCheck = "MiniGame_SkillCheck" 
}

export enum PlanetType {
    Terran = "Terran",
    Desert = "Desert",
    Ocean = "Ocean",
    Ice = "Ice",
    Volcanic = "Volcanic",
    Toxic = "Toxic",
    Gas_Giant = "Gas_Giant",
    Barren = "Barren"
}

export enum PlanetaryBaseType {
    Research_Outpost = "Research_Outpost",
    Mining_Facility = "Mining_Facility",
    Trade_Depot = "Trade_Depot",
    Military_Stronghold = "Military_Stronghold",
    Nexus_Reliquary_Planetary = "Nexus_Reliquary_Planetary",
    Habitat_Colony_Small = "Habitat_Colony_Small"
}

export enum PlanetaryBaseModuleType {
    Power_SolarArray = "Power_SolarArray",
    Power_GeothermalPlant = "Power_GeothermalPlant",
    Power_FusionReactor_Small = "Power_FusionReactor_Small",
    Mining_AutomatedDrill_Tier1 = "Mining_AutomatedDrill_Tier1",
    Mining_GasExtractor_Atmospheric = "Mining_GasExtractor_Atmospheric",
    Storage_ResourceSilo_Medium = "Storage_ResourceSilo_Medium",
    Storage_Warehouse_General = "Storage_Warehouse_General",
    Research_BasicLab = "Research_BasicLab",
    Research_XenoBiologyLab = "Research_XenoBiologyLab",
    Research_NexusAnalyzer = "Research_NexusAnalyzer",
    Defense_LightTurret_AntiAir = "Defense_LightTurret_AntiAir",
    Defense_HeavyTurret_Ground = "Defense_HeavyTurret_Ground",
    Defense_ShieldGenerator_Planetary = "Defense_ShieldGenerator_Planetary",
    Habitation_CrewQuarters_Basic = "Habitation_CrewQuarters_Basic",
    Habitation_LifeSupport_Recycler = "Habitation_LifeSupport_Recycler",
    Trade_LandingPad_Small = "Trade_LandingPad_Small",
    Trade_AutomatedMarketTerminal = "Trade_AutomatedMarketTerminal",
    Sensor_EarlyWarningSystem = "Sensor_EarlyWarningSystem",
    Special_NexusContainmentField = "Special_NexusContainmentField"
}

export interface PlanetaryResource {
    resourceId: string;
    name: string;
    description: string;
    iconAsset: string;
    baseValue_Credits: number;
    extractionMethod: PlanetarySurfaceInteractionType;
    requiredTool_ItemId?: string;
    requiredCrewSkill?: { skillId: CrewSkillId; minLevel: number; };
    environmentalHazard_ResistanceNeeded?: string;
}

export interface SurfaceExplorationEvent {
    eventId: string;
    triggerCondition?: string;
    illustrationAsset?: string;
    descriptionTextKey: string;
    defaultDescriptionText: string;
    choices: Array<{
        choiceTextKey: string;
        defaultChoiceText: string;
        outcome_Success_TextKey?: string;
        defaultOutcome_Success_Text?: string;
        outcome_Failure_TextKey?: string;
        defaultOutcome_Failure_Text?: string;
        skillCheck?: { skillId: CrewSkillId; difficultyClass: number; };
        itemConsumed_ItemId?: string;
        itemGained_ItemId?: string;
        resourceGained?: { resourceId: string; quantity: number; };
        crewDamage_Or_StatusEffect?: any;
        nextEventId?: string;
        unlocksCodexEntry_Id?: string;
    }>;
    soundEffect_EventTrigger?: string;
    soundEffect_ChoiceOutcome_Success?: string;
    soundEffect_ChoiceOutcome_Failure?: string;
}

export interface PlanetaryPOI {
    poiId: string;
    poiType: 'AncientRuins' | 'CrashedShip' | 'UniqueGeologicalFormation' | 'AbandonedMine' | 'NativeSettlement_Primitive';
    iconAsset_SystemMap: string;
    interactionType: PlanetarySurfaceInteractionType;
    interactionEvent_Or_MiniGame_Key: string;
    spawnCondition_PlanetType?: PlanetType[];
    spawnChance: number;
    requiredScanLevel_ToDetect: number;
    loreEntry_CodexKey?: string;
}

export interface EnvironmentalHazard {
    hazardType: 'ExtremeTemperature_Hot' | 'ExtremeTemperature_Cold' | 'ToxicAtmosphere' | 'HighRadiation' | 'CorrosiveEnvironment' | 'AggressiveFauna_Small' | 'AggressiveFauna_Large';
    planetTypeAssociation: PlanetType[];
    requiredProtection_ItemId_Or_ShipModuleId?: string;
    damagePerTurn_Or_StatusEffect_IfUnprotected: any;
    visualCue_OnPlanetInfo?: string;
}

export interface PlanetaryBaseModuleDefinition {
    moduleId: PlanetaryBaseModuleType;
    moduleNameKey: string;
    defaultModuleName: string;
    moduleDescriptionKey: string;
    defaultDescription: string;
    iconAsset: string;
    constructionCost_Materials: CraftingMaterial[];
    constructionTime_GameHours: number;
    powerConsumption_MW?: number;
    powerGeneration_MW?: number;
    resourceGeneration_PerDay?: Array<{ resourceId: string; quantity: number; }>;
    researchPoints_Generation_PerDay?: Array<{ researchPointType: string; quantity: number; }>;
    tradeIncome_Generation_PerDay?: number;
    defenseValue_TurretStrength?: number;
    defenseValue_ShieldStrength?: number;
    habitationCapacity_Crew?: number;
    upkeepCost_CreditsPerDay?: number;
    upkeepCost_ResourcesPerDay?: Array<{ resourceId: string; quantity: number; }>;
    requiredTech_ToBuild_TechId?: string;
    maxInstances_PerBase?: number;
    visualSprite_OnBaseMap_AssetPath_Template?: string;
    upgradeLevels?: Array<{
        level: number;
        upgradeCost_Materials: CraftingMaterial[];
        upgradeTime_GameHours: number;
        newVisualSprite_AssetPath?: string;
    }>;
}

export interface PlanetaryBaseDefinition {
    baseType: PlanetaryBaseType;
    baseNameKey: string;
    defaultBaseName: string;
    baseDescriptionKey: string;
    defaultDescription: string;
    iconAsset_Map: string;
    buildConditions: {
        allowedPlanetTypes: PlanetType[];
        minPlanetSize?: number;
        factionPermissionRequired_FromControllingFaction?: boolean;
        initialResourceCost_ToEstablish: CraftingMaterial[];
        initialTechRequirement_TechId?: string;
    };
    maxModules_Initial: number;
    availableModules_ByType: PlanetaryBaseModuleType[];
    uniqueBonuses?: string[];
    visualStyle_Key: string;
    canBeAttacked: boolean;
    personalizationOptions: string[];
}

export interface PlanetaryBaseModuleInstance {
    moduleId: PlanetaryBaseModuleType;
    level: number;
    health: number;
    isPowered: boolean;
    isOperational: boolean;
    constructionProgress?: number; // 0-100%
    upgradeInProgress?: boolean;
    assignedCrew?: string[]; // IDs of assigned crew members
}

export interface PlanetaryBaseInstance {
    baseId: string;
    name: string;
    baseType: PlanetaryBaseType;
    planetId: string;
    systemId: string;
    modules: PlanetaryBaseModuleInstance[];
    powerBalance: {
        generation: number;
        consumption: number;
    };
    resources: {
        stored: Record<string, number>;
        production: Record<string, number>;
        consumption: Record<string, number>;
    };
    defenseStrength: number;
    visualStyle: string;
    underAttack?: boolean;
    attackTimer?: number;
    lastIncomeCollection?: number;
}

export interface PlanetaryConfig {
    baseBuilding_Enabled: boolean;
    maxPlayerBases_GalaxyWide: number;
    maxBasesPerPlanet: number;
}

export interface PlanetaryContextType {
    config: PlanetaryConfig;
    playerBases: PlanetaryBaseInstance[];
    baseDefinitions: PlanetaryBaseDefinition[];
    moduleDefinitions: PlanetaryBaseModuleDefinition[];
    selectedBase: PlanetaryBaseInstance | null;
    planetaryResources: PlanetaryResource[];
    environmentalHazards: EnvironmentalHazard[];
    surfaceExplorationEvents: SurfaceExplorationEvent[];
    planetaryPOIs: PlanetaryPOI[];
    setSelectedBase: (base: PlanetaryBaseInstance | null) => void;
    createNewBase: (baseType: PlanetaryBaseType, planetId: string, systemId: string, name: string) => void;
    constructModule: (baseId: string, moduleId: PlanetaryBaseModuleType) => void;
    upgradeModule: (baseId: string, moduleIndex: number) => void;
    demolishModule: (baseId: string, moduleIndex: number) => void;
    collectResources: (baseId: string) => void;
    assignCrew: (baseId: string, moduleIndex: number, crewId: string) => void;
    unassignCrew: (baseId: string, moduleIndex: number, crewId: string) => void;
}
