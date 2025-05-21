
import { 
  AlienCulturalEthos, AlienGovernmentType, AlienTechLevel,
  AlienPhysiologyType 
} from './aliens';
import { DiplomaticStatus, FactionId } from './diplomacy';
import { Vector2D } from './galaxy';
import { MissionType } from './missions';

// Diplomacy-related types
export enum DiplomaticActionType {
  OfferTradeAgreement = "OfferTradeAgreement",
  OfferNonAggressionPact = "OfferNonAggressionPact",
  OfferDefensiveAlliance = "OfferDefensiveAlliance",
  OfferMilitaryAccess = "OfferMilitaryAccess",
  ShareStarCharts = "ShareStarCharts",
  DeclareWar = "DeclareWar",
  RequestPeace = "RequestPeace",
  DemandTribute = "DemandTribute",
  SecureBorderAgreement = "SecureBorderAgreement",
  JointResearchPact = "JointResearchPact",
  RequestAid = "RequestAid"
}

// Ship role definitions
export enum ShipRole {
  Explorer_LongRange = "Explorer_LongRange",
  Frigate_MultiRole = "Frigate_MultiRole",
  Cruiser_FleetCommand = "Cruiser_FleetCommand",
  ResearchLab_Scientific = "ResearchLab_Scientific",
  Destroyer_HeavyWeaponPlatform = "Destroyer_HeavyWeaponPlatform",
  Special_Unique_Story = "Special_Unique_Story",
  Corvette_FastAttack = "Corvette_FastAttack",
  Battleship_LineVessel = "Battleship_LineVessel",
  Carrier_FighterPlatform = "Carrier_FighterPlatform",
  Transport_HeavyFreighter = "Transport_HeavyFreighter",
  Mining_ResourceExtraction = "Mining_ResourceExtraction"
}

// Animation parameters
export interface AnimationParams {
  frameCount: number;
  speed: number;
  loop: boolean;
  spritesheetUrl?: string;
  soundEffect?: string;
}

// Color palette definition
export interface ColorPalette {
  [name: string]: string | string[];
}

// Logo definition
export interface FactionLogoDefinition {
  assetUrl_Small: string;
  assetUrl_Large: string;
  descriptionKeyFeatures: string[];
}

// Leader definition
export interface FactionLeaderDefinition {
  leaderId: string;
  nameKey: string;
  defaultName: string;
  portraitAsset_Template: string;
  portraitVariantCount: number;
  personalityTraits: string[];
  dialogueStyle_Key: string;
  voiceAsset_Greeting?: string;
}

// Visual identity
export interface FactionVisualIdentity {
  logo: FactionLogoDefinition;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  shipHullPattern_AssetPrefix?: string;
  shipEngineGlowColor?: string;
  shipSpecialEffect_VisualKey?: string;
  stationArchitecturalStyle_Description: string;
  leaderPortraitStyle_Reference?: string;
}

// Tech profile
export interface FactionTechProfile {
  overallTechLevel: AlienTechLevel;
  preferredShipClasses_Roles: ShipRole[];
  uniqueOrSignatureShipClass_Ids?: string[];
  preferredWeaponTypes: Array<string>;
  preferredDefenseTypes: Array<'Shields_HighCapacity' | 'Armor_Heavy' | 'Evasion_HighSpeed' | 'EnergyShield_NexusPowered' | 'PhaseCloaking_ShortTerm' | 'RegenerativeHull_BioTech'>;
  researchFocusAreas?: string[];
  uniqueTechnologies_Keys?: string[];
}

// Diplomacy AI
export interface FactionDiplomacyAI {
  baseEthos: AlienCulturalEthos;
  governmentType: AlienGovernmentType;
  coreGoals: string[];
  initialRelations_WithPlayer: DiplomaticStatus;
  initialRelations_WithOtherFactions: Array<{ factionId: FactionId; status: DiplomaticStatus; }>;
  reactionToPlayerActions_Profile: 'Forgiving' | 'Neutral' | 'Unforgiving' | 'Opportunistic' | 'Unpredictable';
  tradeOffer_GenerosityFactor: number;
  warWeariness_Factor: number;
  preferredTreatyTypes: DiplomaticActionType[];
  dialogueStyle_Key: string;
}

// Economic profile
export interface FactionEconomicProfile {
  primaryExports: string[];
  primaryImports: string[];
  wealthLevel: 'Poor' | 'Average' | 'Rich' | 'ExtremelyWealthy';
}

// Military profile
export interface FactionMilitaryProfile {
  fleetStrength_Descriptor: 'Small_Militia' | 'Medium_DefenseForce' | 'Large_ExpeditionaryFleet' | 'Overwhelming_Armada';
  preferredCombatTactics_Key: string;
}

// Mission profile
export interface FactionMissionProfile {
  mainStoryline_QuestChain_StartMissionId?: string;
  radiantQuest_TypesAvailable: MissionType[];
  uniqueRewardTypes?: Array<'FactionSpecific_ShipModule' | 'FactionSpecific_ShipBlueprint' | 'UniqueCrewMember' | 'TerritoryAccessPermit'>;
}

// Complete faction definition
export interface FactionDefinition {
  factionId: FactionId;
  factionNameKey: string;
  defaultFactionName: string;
  factionDescription_ShortKey: string;
  defaultFactionDescription_Short: string;
  factionLore_Detailed_CodexKey: string;
  visualIdentity: FactionVisualIdentity;
  dominantAlienRace_Id?: string;
  leaders?: FactionLeaderDefinition[];
  techProfile: FactionTechProfile;
  diplomacyAI: FactionDiplomacyAI;
  economicProfile: FactionEconomicProfile;
  militaryProfile: FactionMilitaryProfile;
  controlledSystems_Initial_CountRange?: [number, number];
  homeSystem_Id?: string;
  homePlanet_Id?: string;
  missionProfile: FactionMissionProfile;
  isMajorFaction: boolean;
  isPlayableOrigin?: boolean;
  specialGameplayMechanics?: string[];
}

// General design principles for factions
export interface FactionGeneralDesignPrinciples {
  uniquenessEmphasis: string;
  visualIdentity: {
    logoStandardSizePx_Small: Vector2D;
    logoStandardSizePx_Large: Vector2D;
    colorSchemeConsistency: string;
    architecturalStyleGuideline: string;
  };
  shipAndTechPreference: string;
  territoryDynamics: string;
  aiBehaviorConsistency: string;
  missionLineIntegration: string;
  proceduralLoreGeneration_Scope: string;
  interFactionRelations_InitialSetup: 'Predefined_Matrix' | 'Procedural_BasedOnEthos';
}
