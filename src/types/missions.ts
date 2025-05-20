
import { Vector2D } from "./galaxy";
import { FactionId } from "./diplomacy";

export enum MissionType {
  MainStory_Nexus = "MainStory_Nexus",
  FactionStory_Major = "FactionStory_Major",
  SideQuest_Generic = "SideQuest_Generic",
  BountyHunt = "BountyHunt",
  Exploration_Survey = "Exploration_Survey",
  Delivery_Transport = "Delivery_Transport",
  Mining_ResourceCollection = "Mining_ResourceCollection",
  PersonalCrewQuest = "PersonalCrewQuest"
}

export enum MissionStatus {
  Inactive_NotYetAvailable = "Inactive_NotYetAvailable",
  Available_NotAccepted = "Available_NotAccepted",
  Active_InProgress = "Active_InProgress",
  Active_TrackedByPlayer = "Active_TrackedByPlayer",
  Completed_Success = "Completed_Success",
  Completed_Failed = "Completed_Failed",
  Completed_Expired = "Completed_Expired"
}

export interface MissionObjective {
  objectiveId: string;
  descriptionKey: string;
  defaultDescription: string;
  status: 'Pending' | 'InProgress' | 'Completed' | 'Failed';
  targetLocation_SystemId?: string;
  targetLocation_CelestialBodyId?: string;
  targetLocation_Coordinates?: Vector2D;
  targetItem_Id?: string;
  targetNPC_Id?: string;
  quantityRequired?: number;
  quantityCurrent?: number;
  isHiddenUntilPreviousCompleted?: boolean;
  isOptional?: boolean;
  rewardOnCompletion?: MissionReward[];
  showOnMap_Button_Enabled: boolean;
}

export interface MissionReward {
  type: 'Credits' | 'ExperiencePoints_Player' | 'ResearchPoints_SpecificType' | 'Item_Specific' | 'Item_RandomFromLootTable' | 'ReputationChange_Faction' | 'Unlock_CodexEntry' | 'Unlock_NewLocation';
  itemId_Or_LootTableKey?: string;
  researchPointType?: string;
  quantity?: number;
  factionId_ForReputation?: FactionId;
  reputationChangeAmount?: number;
  codexEntryId_ToUnlock?: string;
  descriptionKey: string;
  defaultDescription: string;
  iconAsset: string;
}

export interface MissionData {
  missionId: string;
  missionTitleKey: string;
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
  rewards_OnFinalCompletion: MissionReward[];
  suggestedPlayerLevel_Or_ShipTier?: number;
  timeLimit_GameDays?: number;
  isRepeatable?: boolean;
  failureConditions_DescriptionKey?: string;
  defaultFailureConditions?: string;
  completionDialog_Key?: string;
  defaultCompletionDialog?: string;
  turnInLocation_DescriptionKey?: string;
  defaultTurnInLocation?: string;
  isHiddenUntilTriggered?: boolean;
  chainQuest_NextMissionId?: string;
}

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
  setFilterMissionType: (type: MissionType | null) => void;
  filterMissionType: MissionType | null;
  setSortOption: (option: string) => void;
  sortOption: string;
}
