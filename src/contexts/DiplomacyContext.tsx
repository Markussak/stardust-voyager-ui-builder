import React, { createContext, useContext, useState } from 'react';
import { DiplomaticStatus, Faction, Treaty, DiplomacyContextType } from '@/types/diplomacy';

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

export interface FactionRelation {
  factionId: FactionId;
  status: DiplomaticStatus;
  relationValue: number; // -100 to +100
  treaties: Treaty[];
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
    government: "Player Faction",
    primaryColor: "#33AAFF",
    secondaryColor: "#1177CC",
    logoUrl: "assets/images/factions/player_logo.png",
    discovered: true,
    power: {
      military: 50,
      economic: 50,
      tech: 50,
      technological: 50
    }
  },
  [FactionId.SolarConfederacy]: {
    id: FactionId.SolarConfederacy,
    name: "Solární Konfederace",
    governmentType: "Democratic Alliance",
    government: "Democratic Alliance",
    description: "A coalition of democratic planets promoting peace and trade.",
    color: "#3366FF",
    primaryColor: "#3366FF",
    secondaryColor: "#2255DD",
    logoUrl: "assets/images/factions/solar_confederacy_logo.png",
    leaderName: "Prezident Aaren Solus",
    leaderPortraitUrl: "assets/images/factions/portraits/solar_confederacy_leader_01.png",
    discovered: true,
    power: {
      military: 70,
      economic: 80,
      tech: 75,
      technological: 75
    }
  },
  [FactionId.KrallEmpire]: {
    id: FactionId.KrallEmpire,
    name: "Impérium Krall",
    governmentType: "Militaristic Empire",
    government: "Militaristic Empire",
    description: "A warrior empire focused on conquest and honor.",
    color: "#CC3333",
    primaryColor: "#CC3333",
    secondaryColor: "#992222",
    logoUrl: "assets/images/factions/krall_empire_logo.png",
    leaderName: "Imperátor Drakk III",
    leaderPortraitUrl: "assets/images/factions/portraits/krall_empire_leader_01.png",
    discovered: true,
    power: {
      military: 90,
      economic: 60,
      tech: 65,
      technological: 65
    }
  },
  [FactionId.CultOfTheNexus]: {
    id: FactionId.CultOfTheNexus,
    name: "Kult Nexusu",
    governmentType: "Theocratic Order",
    government: "Theocratic Order",
    description: "Mysterious cult worshipping ancient technology and cosmic entities.",
    color: "#9933CC",
    primaryColor: "#9933CC",
    secondaryColor: "#772299",
    logoUrl: "assets/images/factions/cult_nexus_logo.png",
    leaderName: "Velký Hierarcha Zorak",
    leaderPortraitUrl: "assets/images/factions/portraits/cult_nexus_leader_01.png",
    discovered: true,
    power: {
      military: 60,
      economic: 50,
      tech: 85,
      technological: 85
    }
  },
  [FactionId.FreeTradersSyndicate]: {
    id: FactionId.FreeTradersSyndicate,
    name: "Syndikát Volných Obchodníků",
    governmentType: "Mercantile Network",
    government: "Mercantile Network",
    description: "An alliance of traders and merchants controlling key trade routes.",
    color: "#FFCC33",
    primaryColor: "#FFCC33",
    secondaryColor: "#DDAA22",
    logoUrl: "assets/images/factions/free_traders_logo.png",
    leaderName: "Velkoobchodník Sylla",
    leaderPortraitUrl: "assets/images/factions/portraits/free_traders_leader_01.png",
    discovered: true,
    power: {
      military: 40,
      economic: 95,
      tech: 65,
      technological: 65
    }
  },
  [FactionId.PirateClan_RedMasks]: {
    id: FactionId.PirateClan_RedMasks,
    name: "Klan Červených Masek",
    governmentType: "Pirate Collective",
    government: "Pirate Collective",
    description: "Notorious pirates preying on trade routes and isolated colonies.",
    color: "#CC0000",
    primaryColor: "#CC0000",
    secondaryColor: "#990000",
    logoUrl: "assets/images/factions/red_masks_logo.png",
    leaderName: "Kapitán Bloodclaw",
    leaderPortraitUrl: "assets/images/factions/portraits/red_masks_leader_01.png",
    discovered: false,
    power: {
      military: 55,
      economic: 40,
      tech: 30,
      technological: 30
    }
  },
  [FactionId.Guardians_AncientAI]: {
    id: FactionId.Guardians_AncientAI,
    name: "Strážci",
    governmentType: "Advanced AI Collective",
    government: "Advanced AI Collective",
    description: "Ancient AI entities guarding remnants of a long-lost civilization.",
    color: "#00CCAA",
    primaryColor: "#00CCAA",
    secondaryColor: "#009988",
    logoUrl: "assets/images/factions/guardians_logo.png",
    discovered: false,
    power: {
      military: 85,
      economic: 20,
      tech: 100,
      technological: 100
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

  // Function to get relation with player
  const getRelationWithPlayer = (factionId: string): DiplomaticStatus => {
    const relation = mockPlayerRelations[factionId as FactionId];
    return relation ? relation.status : DiplomaticStatus.Neutral;
  };

  // Function to update relation
  const updateRelation = (factionId: string, newStatus: DiplomaticStatus, relationChange: number = 0) => {
    console.log(`Updating relation with ${factionId} to ${newStatus} with change ${relationChange}`);
    // In a real implementation, we would update the relations here
  };

  // Function to add treaty
  const addTreaty = (factionId: string, treaty: any) => {
    console.log(`Adding treaty to ${factionId}:`, treaty);
    // In a real implementation, we would add the treaty here
  };

  // Function to get faction by ID
  const getFactionById = (factionId: string): Faction | undefined => {
    return mockFactions[factionId as FactionId];
  };

  // Convert record format to array for compatibility with original DiplomacyContextType
  const factionsArray = Object.values(mockFactions);

  const value: DiplomacyContextType = {
    factions: factionsArray,
    selectedFactionId,
    selectFaction,
    getRelationWithPlayer,
    updateRelation,
    addTreaty,
    getFactionById,
    diplomacyState: {
      factions: mockFactions,
      playerRelations: mockPlayerRelations,
      selectedFactionId
    }
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
