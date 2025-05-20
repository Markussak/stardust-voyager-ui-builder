
import { Vector2D } from './galaxy';
import { FactionId } from './diplomacy';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  factionId?: FactionId;
  reward: {
    credits?: number;
    items?: { itemId: string; quantity: number; }[];
    xp?: number;
    reputation?: number;
  };
  requirements: MissionRequirement[];
  progress: number;
  isCompleted: boolean;
  location?: Vector2D;
  timeLimit?: number;
  startDate?: number;
  endDate?: number;
  isFailed?: boolean;
  failureReason?: string;
}

export enum MissionType {
  Story = "Story",
  Faction = "Faction",
  Exploration = "Exploration",
  Combat = "Combat",
  Delivery = "Delivery",
  Mining = "Mining",
  Salvage = "Salvage",
  Diplomacy = "Diplomacy",
  Tutorial = "Tutorial"
}

export interface MissionRequirement {
  type: RequirementType;
  target: string;
  quantity?: number;
  isCompleted: boolean;
}

export enum RequirementType {
  VisitStarSystem = "VisitStarSystem",
  CollectItem = "CollectItem",
  DefeatEnemies = "DefeatEnemies",
  DeliverItem = "DeliverItem",
  ReachReputation = "ReachReputation",  // Fixed the Cyrillic characters
  ScanObject = "ScanObject",
  TalkToNPC = "TalkToNPC",
  CompleteMissions = "CompleteMissions",
  ExploreLocation = "ExploreLocation",
  CraftItem = "CraftItem",
  UpgradeShipModule = "UpgradeShipModule",
  BuildStructure = "BuildStructure",
  ResearchTechnology = "ResearchTechnology",
  EstablishTradeRoute = "EstablishTradeRoute",
  FormAlliance = "FormAlliance",
  InfiltrateBase = "InfiltrateBase",
  SabotageOperation = "SabotageOperation",
  RescuePersonnel = "RescuePersonnel",
  EscortConvoy = "EscortConvoy",
  SurveyPlanet = "SurveyPlanet",
  NegotiateTreaty = "NegotiateTreaty",
  WinRace = "WinRace",
  SurviveEncounter = "SurviveEncounter",
  ActivateArtifact = "ActivateArtifact",
  SolvePuzzle = "SolvePuzzle",
  FindTreasure = "FindTreasure",
  ClearAsteroidField = "ClearAsteroidField",
  DisableSecuritySystem = "DisableSecuritySystem",
  RepairDamagedComponent = "RepairDamagedComponent",
  EvadePatrols = "EvadePatrols",
  CaptureOutpost = "CaptureOutpost",
  DefendBase = "DefendBase",
  EliminateTarget = "EliminateTarget",
  GatherIntel = "GatherIntel",
  SecureArea = "SecureArea",
  ExtractResources = "ExtractResources",
  InvestigateAnomaly = "InvestigateAnomaly",
  EstablishColony = "EstablishColony",
  DiplomaticMeeting = "DiplomaticMeeting",
  TradeAgreement = "TradeAgreement",
  NonAggressionPact = "NonAggressionPact",
  DefensiveAlliance = "DefensiveAlliance",
  DeclareWar = "DeclareWar",
  SignTreaty = "SignTreaty",
  DeliverCargo = "DeliverCargo"
}
