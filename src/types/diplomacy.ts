
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
  type: string;  // This field is needed by the components
  name: string;
  description: string;
  startDate: number;
  endDate?: number;
  effects: any[];
}

export interface Faction {
  id: string;
  name: string;
  description: string;
  government: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  leaderName?: string;
  leaderPortraitUrl?: string;
  discovered?: boolean;  // Add this property
  power: {
    military: number;
    economic: number;
    tech: number;
    technological?: number;  // For compatibility
    economy?: number;  // Add this for compatibility
  };
  homeSystemId?: string;
  controlledSystems?: string[];
  diplomacy: {
    attitudeTowardsPlayer: number; // -100 to +100
    status: DiplomaticStatus;
    treaties: Treaty[];
  };
  color?: string; // For compatibility
  governmentType?: string; // For compatibility
}

export interface DiplomacyContextType {
  factions: Faction[];
  selectedFactionId: string | null;
  selectFaction: (factionId: string | null) => void;
  getRelationWithPlayer: (factionId: string) => DiplomaticStatus;
  updateRelation: (factionId: string, newStatus: DiplomaticStatus, relationChange?: number) => void; // Added for compatibility
  addTreaty: (factionId: string, treaty: any) => void; // Added for compatibility
  getFactionById: (factionId: string) => Faction | undefined;
  diplomacyState?: {  // Added for compatibility
    factions: Record<string, Faction>;
    playerRelations: Record<string, any>;
    selectedFactionId: string | null;
  };
}

// Export FactionId enum explicitly
export enum FactionId {
  Player = "player",
  SolarConfederacy = "solar_confederacy",
  KrallEmpire = "krall_empire",
  CultOfTheNexus = "cult_of_the_nexus",
  FreeTradersSyndicate = "free_traders_syndicate",
  PirateClan_RedMasks = "pirate_clan_red_masks",
  Guardians_AncientAI = "guardians_ancient_ai"
}
