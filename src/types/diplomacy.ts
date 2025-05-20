
export enum FactionId {
  Player = "player",
  SolarConfederacy = "solar_confederacy",
  KrallEmpire = "krall_empire",
  CultOfTheNexus = "cult_of_the_nexus",
  FreeTradersSyndicate = "free_traders_syndicate",
  PirateClan_RedMasks = "pirate_clan_red_masks",
  Guardians_AncientAI = "guardians_ancient_ai"
}

export enum DiplomaticStatus {
  War = "War",
  Hostile = "Hostile",
  Neutral = "Neutral",
  Amity_NonAggressionPact = "Amity_NonAggressionPact",
  Friendly_TradeAgreement = "Friendly_TradeAgreement",
  Ally_DefensivePact = "Ally_DefensivePact",
  Vassal = "Vassal",
  Overlord = "Overlord"
}

export interface Treaty {
  id: string;
  type: string;
  name: string;
  description: string;
  factionId: FactionId;
  startDate: number;
  endDate?: number;
  benefits: string[];
}

export interface Faction {
  id: FactionId;
  name: string;
  description: string;
  governmentType: string;
  leaderName?: string;
  leaderPortrait?: string;
  logo: string;
  homeSystem?: string;
  mainColor: string;
  secondaryColor: string;
  power: {
    military: number;
    economic: number;
    tech: number;
    overall: number;
  };
  traits: string[];
  relationWithPlayer: DiplomaticStatus;
  relationValue: number;
  treaties: Treaty[];
  isDiscovered: boolean;
}

export interface DiplomaticAction {
  actionId: string;
  label: string;
  iconAsset: string;
  tooltipText?: string;
  cost?: Array<{ resourceId: 'Credits' | 'InfluencePoints' | string; quantity: number; }>;
  prerequisites: Array<{
    type: 'RelationshipLevel_Min' | 'RelationshipLevel_Max' | 'Not_At_War' | 'Is_At_War' | 'Player_Tech_Unlocked' | 'Faction_Trait_Allows';
    statusValue?: DiplomaticStatus;
    techIdValue?: string;
    traitValue?: string;
  }>;
  aiReactionLogicKey: string;
  cooldownTurns?: number;
  soundEffect_Execute?: string;
}

export interface DiplomacyContextType {
  factions: Faction[];
  knownFactions: Faction[];
  selectedFactionId: FactionId | null;
  selectFaction: (factionId: FactionId | null) => void;
  getRelationshipStatus: (factionId: FactionId) => DiplomaticStatus;
  getRelationshipValue: (factionId: FactionId) => number;
  getDiplomaticActions: (factionId: FactionId) => DiplomaticAction[];
  executeDiplomaticAction: (actionId: string, factionId: FactionId) => Promise<boolean>;
  updateRelation: (factionId: FactionId, amount: number) => void;
  addTreaty: (treaty: Treaty) => void;
}
