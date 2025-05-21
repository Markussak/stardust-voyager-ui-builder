
import { Vector2D } from './galaxy';
import { FactionId } from './diplomacy';
import { PlanetType } from './galaxy';

export enum AlienPhysiologyType {
  Humanoid_Mammalian = "Humanoid_Mammalian",
  Humanoid_Reptilian = "Humanoid_Reptilian",
  Humanoid_Avian = "Humanoid_Avian",
  Humanoid_Aquatic = "Humanoid_Aquatic",
  Insectoid_Arachnid = "Insectoid_Arachnid",
  Insectoid_Coleopteran = "Insectoid_Coleopteran",
  Amorphous_Gelatinous = "Amorphous_Gelatinous",
  Crystalline_SiliconBased = "Crystalline_SiliconBased",
  EnergyBeing_NonCorporeal = "EnergyBeing_NonCorporeal",
  Flora_SentientPlant = "Flora_SentientPlant",
  GasGiant_Floater = "GasGiant_Floater",
  Rock_Lithovore = "Rock_Lithovore"
}

export enum AlienCulturalEthos {
  Militaristic_Expansionist = "Militaristic_Expansionist",
  Pacifist_Harmonious = "Pacifist_Harmonious",
  Spiritual_Mystical = "Spiritual_Mystical",
  Materialistic_Industrial = "Materialistic_Industrial",
  Xenophobic_Isolationist = "Xenophobic_Isolationist",
  Xenophilic_Trader = "Xenophilic_Trader",
  Collectivist_HiveMind = "Collectivist_HiveMind",
  Individualistic_Anarchic = "Individualistic_Anarchic",
  Ancient_Enigmatic = "Ancient_Enigmatic"
}

export enum AlienTechLevel {
  Primitive_PreFTL = "Primitive_PreFTL",
  Early_FTL_BasicShips = "Early_FTL_BasicShips",
  Established_Interstellar = "Established_Interstellar",
  Advanced_SpecializedTech = "Advanced_SpecializedTech",
  Ancient_NearAscended = "Ancient_NearAscended"
}

export enum AlienGovernmentType {
  Democracy_Republic = "Democracy_Republic",
  Monarchy_Feudal = "Monarchy_Feudal",
  Oligarchy_Corporate = "Oligarchy_Corporate",
  Dictatorship_MilitaryJunta = "Dictatorship_MilitaryJunta",
  Theocracy_ReligiousCouncil = "Theocracy_ReligiousCouncil",
  HiveMind_CollectiveConsciousness = "HiveMind_CollectiveConsciousness",
  Anarchy_TribalChiefdoms = "Anarchy_TribalChiefdoms"
}

export enum AlienShipDesignLanguage {
  Organic_BioMechanical_LivingShips = "Organic_BioMechanical_LivingShips",
  Crystalline_Geometric_EnergyFocused = "Crystalline_Geometric_EnergyFocused",
  EnergyBased_NonCorporeal_ShiftingShapes = "EnergyBased_NonCorporeal_ShiftingShapes",
  Asymmetrical_Abstract_Unconventional = "Asymmetrical_Abstract_Unconventional",
  FloraBased_GrownShips_Photosynthetic = "FloraBased_GrownShips_Photosynthetic",
  Ancient_Sleek_Minimalist_Powerful = "Ancient_Sleek_Minimalist_Powerful",
  JunkBuilt_Scavenged_Chaotic = "JunkBuilt_Scavenged_Chaotic"
}

// Interface for generating alien race names
export interface AlienNamingConvention {
  syllables_Prefix: string[];
  syllables_Middle: string[];
  syllables_Suffix: string[];
  nameLengthRange_Syllables: [number, number];
}

// Interface for color palettes
export interface AlienColorPalette {
  [name: string]: string | string[];
}

// Interface for animation parameters
export interface AlienAnimationParams {
  frameCount: number;
  speed: number;
  loop: boolean;
  spritesheetUrl?: string;
  soundEffect?: string;
}

// Interface for alien portraits
export interface AlienPortraitDefinition {
  baseSprite_AssetPath_Template: string;
  variantCount_PerGenderOrRole: number;
  dimensionsPx: Vector2D;
  animated_Subtle?: AlienAnimationParams;
  clothingStyle_KeyElements: string[];
  accessory_Types?: string[];
  emotionalExpression_Range?: string[];
}

// Interface for full body sprites
export interface AlienFullBodySpriteDefinition {
  assetPath_Template: string;
  dimensionsPx_Approx: Vector2D;
  idleAnimation: AlienAnimationParams;
  walkAnimation?: AlienAnimationParams;
  keyPoses?: string[];
}

// Interface for visual design
export interface AlienRaceVisualDesign {
  primaryPhysiology: AlienPhysiologyType;
  secondaryPhysiologicalTraits: string[];
  skinOrSurface_ColorPalette: AlienColorPalette;
  eye_ColorPalette: AlienColorPalette;
  clothing_ColorPalette: AlienColorPalette;
  portraits: AlienPortraitDefinition;
  fullBodySprites_Optional?: AlienFullBodySpriteDefinition;
  culturalSymbols_AssetPath_Prefix?: string;
}

// Interface for technology and style
export interface AlienTechAndStyle {
  overallTechLevel: AlienTechLevel;
  preferredWeaponTypes?: string[];
  preferredDefenseTypes?: Array<string>;
  shipDesignLanguage: AlienShipDesignLanguage;
  shipColorPalette_Primary: AlienColorPalette;
  shipTextureStyle_Primary: string;
  shipEngineExhaust_EffectKey: string;
  uniqueShipClasses_Ids: string[];
  spaceStation_ArchitecturalStyle: string;
  spaceStation_ModuleStyle_AssetPathPrefix?: string;
  planetaryCityscape_FromOrbit_VisualDescription: string;
  planetaryCityscape_LightColor_Night: string;
  planetaryCityscape_StructureAsset_Day_Template?: string;
  preferredPlanetTypes_ForColonization: PlanetType[];
  uniqueTerraforming_Visuals?: string;
}

// Interface for combat tactics
export interface AlienCombatTactics {
  preferredEngagementRange: 'Long_Sniping' | 'Medium_Kiting' | 'Short_Brawling';
  formationPreference_Fleet?: 'Tight_Formation' | 'Loose_Swarm' | 'Line_Abreast';
  commonManeuvers: string[];
  specialAbilityPrioritization?: Array<{ abilityId: string; priority: 'High' | 'Medium' | 'Low'; conditions?: string; }>;
  retreatCondition_Override?: string;
  focusTargetPriority: Array<string>;
}

// Interface for diplomatic profile
export interface AlienDiplomaticProfile {
  baseEthos: AlienCulturalEthos;
  trustworthinessFactor: number;
  aggressionFactor: number;
  expansionismFactor: number;
  preferredAllies_Ethos?: AlienCulturalEthos[];
  hatedEnemies_Ethos?: AlienCulturalEthos[];
  tradeWillingness_Factor?: number;
  reactionToPlayer_Initial: string;
  dialogueStyle_PersonalityKey: string;
}

// Interface for strategic AI
export interface AlienStrategicAI {
  expansionPriorities: Array<string>;
  warDeclarationTriggers: string[];
  allianceFormationTriggers: string[];
  economicFocus: 'ResourceExtraction' | 'Manufacturing' | 'Trade_Interstellar' | 'Research_Innovation';
  responseToPlayerActions_Sensitivity?: number;
}

// Interface for AI behavior
export interface AlienRaceAIBehavior {
  shipAndFleet_CombatTactics: AlienCombatTactics;
  diplomaticProfile: AlienDiplomaticProfile;
  strategicAI_FactionLevel: AlienStrategicAI;
}

// Complete alien race definition
export interface AlienRaceDefinition {
  raceId: string;
  raceName: string;
  isPlayable: boolean;
  visualDesign: AlienRaceVisualDesign;
  techAndStyle: AlienTechAndStyle;
  aiBehavior: AlienRaceAIBehavior;
  loreEntry_CodexKey?: string;
}
