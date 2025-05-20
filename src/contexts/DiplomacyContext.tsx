
import React, { createContext, useContext, useState } from 'react';

// Define the FactionId enum from the prompt
export enum FactionId {
  Player = "player",
  SolarConfederacy = "solar_confederacy",
  KrallEmpire = "krall_empire",
  CultOfTheNexus = "cult_of_the_nexus",
  FreeTradersSyndicate = "free_traders_syndicate",
  PirateClan_RedMasks = "pirate_clan_red_masks",
  Guardians_AncientAI = "guardians_ancient_ai",
}

// Define the DiplomaticStatus enum from the prompt
export enum DiplomaticStatus {
  War = "War",
  Hostile = "Hostile",
  Neutral = "Neutral",
  Amity_NonAggressionPact = "Amity_NonAggressionPact", // Přátelství / Pakt o neútočení
  Friendly_TradeAgreement = "Friendly_TradeAgreement", // Přátelský / Obchodní dohoda
  Ally_DefensivePact = "Ally_DefensivePact", // Spojenec / Obranný pakt
  Vassal = "Vassal", // Vazal
  Overlord = "Overlord" // Nadvládce
}

export interface Treaty {
  id: string;
  name: string;
  description: string;
  effectDescription: string;
  duration: number; // In turns or -1 for permanent
  icon: string;
}

export interface FactionRelation {
  factionId: FactionId;
  status: DiplomaticStatus;
  relationValue: number; // -100 to +100
  treaties: Treaty[];
}

export interface Faction {
  id: FactionId;
  name: string;
  governmentType: string;
  description: string;
  color: string;
  leaderName?: string;
  leaderPortrait?: string;
  discovered: boolean;
  powerLevel: {
    military: number;
    economy: number;
    technology: number;
  };
}

export interface DiplomacyContextType {
  diplomacyState: {
    factions: Record<FactionId, Faction>;
    playerRelations: Record<FactionId, FactionRelation>;
    selectedFactionId: FactionId | null;
  };
  selectFaction: (factionId: FactionId) => void;
  // Additional methods will be added as needed
}

// Create the context
const DiplomacyContext = createContext<DiplomacyContextType | undefined>(undefined);

// Dummy faction data for initial setup
const mockFactions: Record<FactionId, Faction> = {
  [FactionId.Player]: {
    id: FactionId.Player,
    name: "Star Dust Voyagers",
    governmentType: "Player Faction",
    description: "Your faction of intrepid explorers and traders.",
    color: "#33AAFF",
    discovered: true,
    powerLevel: {
      military: 50,
      economy: 50,
      technology: 50
    }
  },
  [FactionId.SolarConfederacy]: {
    id: FactionId.SolarConfederacy,
    name: "Solární Konfederace",
    governmentType: "Democratic Alliance",
    description: "A coalition of democratic planets promoting peace and trade.",
    color: "#3366FF",
    leaderName: "Prezident Aaren Solus",
    leaderPortrait: "assets/images/factions/portraits/solar_confederacy_leader_01.png",
    discovered: true,
    powerLevel: {
      military: 70,
      economy: 80,
      technology: 75
    }
  },
  [FactionId.KrallEmpire]: {
    id: FactionId.KrallEmpire,
    name: "Impérium Krall",
    governmentType: "Militaristic Empire",
    description: "A warrior empire focused on conquest and honor.",
    color: "#CC3333",
    leaderName: "Imperátor Drakk III",
    leaderPortrait: "assets/images/factions/portraits/krall_empire_leader_01.png",
    discovered: true,
    powerLevel: {
      military: 90,
      economy: 60,
      technology: 65
    }
  },
  [FactionId.CultOfTheNexus]: {
    id: FactionId.CultOfTheNexus,
    name: "Kult Nexusu",
    governmentType: "Theocratic Order",
    description: "Mysterious cult worshipping ancient technology and cosmic entities.",
    color: "#9933CC",
    leaderName: "Velký Hierarcha Zorak",
    leaderPortrait: "assets/images/factions/portraits/cult_nexus_leader_01.png",
    discovered: true,
    powerLevel: {
      military: 60,
      economy: 50,
      technology: 85
    }
  },
  [FactionId.FreeTradersSyndicate]: {
    id: FactionId.FreeTradersSyndicate,
    name: "Syndikát Volných Obchodníků",
    governmentType: "Mercantile Network",
    description: "An alliance of traders and merchants controlling key trade routes.",
    color: "#FFCC33",
    leaderName: "Velkoobchodník Sylla",
    leaderPortrait: "assets/images/factions/portraits/free_traders_leader_01.png",
    discovered: true,
    powerLevel: {
      military: 40,
      economy: 95,
      technology: 65
    }
  },
  [FactionId.PirateClan_RedMasks]: {
    id: FactionId.PirateClan_RedMasks,
    name: "Klan Červených Masek",
    governmentType: "Pirate Collective",
    description: "Notorious pirates preying on trade routes and isolated colonies.",
    color: "#CC0000",
    leaderName: "Kapitán Bloodclaw",
    leaderPortrait: "assets/images/factions/portraits/red_masks_leader_01.png",
    discovered: false,
    powerLevel: {
      military: 55,
      economy: 40,
      technology: 30
    }
  },
  [FactionId.Guardians_AncientAI]: {
    id: FactionId.Guardians_AncientAI,
    name: "Strážci",
    governmentType: "Advanced AI Collective",
    description: "Ancient AI entities guarding remnants of a long-lost civilization.",
    color: "#00CCAA",
    discovered: false,
    powerLevel: {
      military: 85,
      economy: 20,
      technology: 100
    }
  }
};

// Mock player relations data
const mockPlayerRelations: Record<FactionId, FactionRelation> = {
  [FactionId.Player]: {
    factionId: FactionId.Player,
    status: DiplomaticStatus.Neutral, // Self relation
    relationValue: 0,
    treaties: []
  },
  [FactionId.SolarConfederacy]: {
    factionId: FactionId.SolarConfederacy,
    status: DiplomaticStatus.Neutral,
    relationValue: 30,
    treaties: []
  },
  [FactionId.KrallEmpire]: {
    factionId: FactionId.KrallEmpire,
    status: DiplomaticStatus.Hostile,
    relationValue: -40,
    treaties: []
  },
  [FactionId.CultOfTheNexus]: {
    factionId: FactionId.CultOfTheNexus,
    status: DiplomaticStatus.Neutral,
    relationValue: 10,
    treaties: []
  },
  [FactionId.FreeTradersSyndicate]: {
    factionId: FactionId.FreeTradersSyndicate,
    status: DiplomaticStatus.Friendly_TradeAgreement,
    relationValue: 60,
    treaties: []
  },
  [FactionId.PirateClan_RedMasks]: {
    factionId: FactionId.PirateClan_RedMasks,
    status: DiplomaticStatus.War,
    relationValue: -80,
    treaties: []
  },
  [FactionId.Guardians_AncientAI]: {
    factionId: FactionId.Guardians_AncientAI,
    status: DiplomaticStatus.Neutral,
    relationValue: 0,
    treaties: []
  }
};

// Create the provider component
export const DiplomacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFactionId, setSelectedFactionId] = useState<FactionId | null>(null);

  // Function to select a faction
  const selectFaction = (factionId: FactionId) => {
    setSelectedFactionId(factionId);
  };

  const value: DiplomacyContextType = {
    diplomacyState: {
      factions: mockFactions,
      playerRelations: mockPlayerRelations,
      selectedFactionId
    },
    selectFaction
  };

  return (
    <DiplomacyContext.Provider value={value}>
      {children}
    </DiplomacyContext.Provider>
  );
};

// Custom hook for using the diplomacy context
export const useDiplomacy = (): DiplomacyContextType => {
  const context = useContext(DiplomacyContext);
  if (context === undefined) {
    throw new Error('useDiplomacy must be used within a DiplomacyProvider');
  }
  return context;
};
