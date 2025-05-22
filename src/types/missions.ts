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
  Tutorial = "Tutorial",
  // Add the missing mission types that are used in components
  MainStory_Nexus = "MainStory_Nexus",
  FactionStory_Major = "FactionStory_Major",
  BountyHunt = "BountyHunt",
  Exploration_Survey = "Exploration_Survey",
  Delivery_Transport = "Delivery_Transport",
  Mining_ResourceCollection = "Mining_ResourceCollection",
  PersonalCrewQuest = "PersonalCrewQuest",
  SideQuest_Generic = "SideQuest_Generic",
  // Add the missing mission types referenced in factions.ts
  CaptureOutpost = "CaptureOutpost", 
  DefendBase = "DefendBase",
  TradeAgreement = "TradeAgreement",
  InvestigateAnomaly = "InvestigateAnomaly"
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

// Add the missing MissionStatus enum needed by the components
export enum MissionStatus {
  Available_NotAccepted = "Available_NotAccepted",
  Active_InProgress = "Active_InProgress",
  Active_TrackedByPlayer = "Active_TrackedByPlayer",
  Completed_Success = "Completed_Success",
  Completed_Failed = "Completed_Failed",
  Completed_Expired = "Completed_Expired"
}

// Add the MissionObjective interface that's used in MissionDetails.tsx
export interface MissionObjective {
  objectiveId: string;
  descriptionKey?: string;
  defaultDescription: string;
  status: 'Pending' | 'InProgress' | 'Completed';
  targetLocation_SystemId?: string;
  targetLocation_CelestialBodyId?: string;
  targetLocation_Coordinates?: Vector2D;
  targetNPC_Id?: string;
  targetItem_Id?: string;
  isHiddenUntilPreviousCompleted?: boolean;
  isOptional?: boolean;
  showOnMap_Button_Enabled?: boolean;
  quantityRequired?: number;
  quantityCurrent?: number;
}

// Add MissionData interface that's used in the contexts and components
export interface MissionData {
  missionId: string;
  missionTitleKey?: string;
  defaultMissionTitle: string;
  missionType: MissionType;
  status: MissionStatus;
  missionGiver_NPC_Id_Or_FactionId?: string;
  missionGiver_DisplayNameKey?: string;
  defaultMissionGiver_DisplayName?: string;
  missionGiver_PortraitAsset?: string;
  briefingDialog_Key?: string;
  defaultBriefingDialog?: string;
  fullDescription_Lore_Key?: string;
  defaultFullDescription_Lore?: string;
  objectives: MissionObjective[];
  rewards_OnFinalCompletion: any[];
  suggestedPlayerLevel_Or_ShipTier?: number;
  timeLimit_GameDays?: number;
  chainQuest_NextMissionId?: string;
}

// Update MissionsContextType to match implementation in MissionsContext.tsx
export interface MissionsContextType {
  activeMissions: MissionData[];
  completedMissions: MissionData[];
  selectedMissionId: string | null;
  trackedMissionId: string | null;
  selectMission: (missionId: string) => void;
  trackMission: (missionId: string | null) => void;
  getMissionById: (missionId: string) => MissionData | null;
  completeObjective: (missionId: string, objectiveId: string) => void;
  completeMission: (missionId: string, success: boolean) => void;
  addMission: (mission: MissionData) => void;
  abandonMission: (missionId: string) => void;
  filterMissionType: MissionType | null;
  setFilterMissionType: (type: MissionType | null) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}
