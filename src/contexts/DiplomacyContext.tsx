
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types from the specification
export enum FactionId {
  Player = "player",
  SolarConfederacy = "solar_confederacy",
  KrallEmpire = "krall_empire",
  CultOfTheNexus = "cult_of_the_nexus",
  FreeTradersSyndicate = "free_traders_syndicate",
  PirateClan_RedMasks = "pirate_clan_red_masks",
  Guardians_AncientAI = "guardians_ancient_ai",
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
  type: string;
  startTurn: number;
  duration: number; // -1 for indefinite
  iconAsset: string;
}

export interface Faction {
  id: FactionId;
  name: string;
  governmentType: string;
  description: string;
  color: string;
  logoAsset: string;
  leaderPortraitAsset?: string;
  power: {
    military: number; // 0-100
    economic: number; // 0-100
    technological: number; // 0-100
  };
  discovered: boolean;
}

export interface FactionRelation {
  factionId: FactionId;
  status: DiplomaticStatus;
  relationValue: number; // -100 to +100
  treaties: Treaty[];
}

interface DiplomacyState {
  factions: Record<FactionId, Faction>;
  playerRelations: Record<FactionId, FactionRelation>;
  selectedFactionId: FactionId | null;
  aiRelations: Record<string, DiplomaticStatus>; // Key format: "faction1Id_faction2Id"
}

interface DiplomacyContextType {
  diplomacyState: DiplomacyState;
  selectFaction: (factionId: FactionId) => void;
  updateRelation: (factionId: FactionId, status: DiplomaticStatus, relationChange?: number) => void;
  addTreaty: (factionId: FactionId, treaty: Treaty) => void;
  removeTreaty: (factionId: FactionId, treatyType: string) => void;
}

// Initial mock data
const initialDiplomacyState: DiplomacyState = {
  factions: {
    [FactionId.SolarConfederacy]: {
      id: FactionId.SolarConfederacy,
      name: "Solar Confederacy",
      governmentType: "Democratic Federation",
      description: "The Solar Confederacy is a democratic alliance of human colonies centered around the original solar system. They value peace, trade, and technological advancement.",
      color: "#3388ff",
      logoAsset: "/placeholder.svg",
      leaderPortraitAsset: "/placeholder.svg",
      power: {
        military: 70,
        economic: 85,
        technological: 80,
      },
      discovered: true
    },
    [FactionId.KrallEmpire]: {
      id: FactionId.KrallEmpire,
      name: "Krall Empire",
      governmentType: "Militaristic Autocracy",
      description: "The Krall Empire is a militaristic regime that values strength and conquest. Their society is hierarchical and focused on expansion.",
      color: "#cc2200",
      logoAsset: "/placeholder.svg",
      leaderPortraitAsset: "/placeholder.svg",
      power: {
        military: 90,
        economic: 60,
        technological: 65,
      },
      discovered: true
    },
    [FactionId.CultOfTheNexus]: {
      id: FactionId.CultOfTheNexus,
      name: "Cult of the Nexus",
      governmentType: "Theocratic Order",
      description: "The Cult of the Nexus is a secretive organization that worships ancient stellar phenomena. They seek to understand and harness cosmic energy.",
      color: "#9b87f5",
      logoAsset: "/placeholder.svg",
      leaderPortraitAsset: "/placeholder.svg",
      power: {
        military: 40,
        economic: 50,
        technological: 90,
      },
      discovered: true
    },
    [FactionId.FreeTradersSyndicate]: {
      id: FactionId.FreeTradersSyndicate,
      name: "Free Traders Syndicate",
      governmentType: "Mercantile Coalition",
      description: "The Free Traders Syndicate is a loose coalition of merchants, entrepreneurs, and independent traders who value free commerce and profit.",
      color: "#ffaa00",
      logoAsset: "/placeholder.svg",
      leaderPortraitAsset: "/placeholder.svg",
      power: {
        military: 50,
        economic: 95,
        technological: 70,
      },
      discovered: true
    },
    [FactionId.PirateClan_RedMasks]: {
      id: FactionId.PirateClan_RedMasks,
      name: "Red Masks Pirate Clan",
      governmentType: "Criminal Syndicate",
      description: "The Red Masks are a notorious pirate clan operating in the fringes of civilized space. They prey on merchant vessels and raid unprotected colonies.",
      color: "#cc0000",
      logoAsset: "/placeholder.svg",
      leaderPortraitAsset: "/placeholder.svg",
      power: {
        military: 60,
        economic: 40,
        technological: 50,
      },
      discovered: false
    },
    [FactionId.Guardians_AncientAI]: {
      id: FactionId.Guardians_AncientAI,
      name: "Ancient AI Guardians",
      governmentType: "Autonomous Collective",
      description: "The Guardians are remnants of an ancient civilization, now existing as sentient AI systems that protect certain regions of space and ancient technology.",
      color: "#00ccaa",
      logoAsset: "/placeholder.svg",
      leaderPortraitAsset: "/placeholder.svg",
      power: {
        military: 85,
        economic: 20,
        technological: 100,
      },
      discovered: false
    },
    [FactionId.Player]: {
      id: FactionId.Player,
      name: "Your Faction",
      governmentType: "Independent",
      description: "Your faction of independent explorers and traders, seeking fortune and adventure in the galaxy.",
      color: "#00ff88",
      logoAsset: "/placeholder.svg",
      power: {
        military: 30,
        economic: 40,
        technological: 50,
      },
      discovered: true
    },
  },
  playerRelations: {
    [FactionId.SolarConfederacy]: {
      factionId: FactionId.SolarConfederacy,
      status: DiplomaticStatus.Neutral,
      relationValue: 20,
      treaties: [],
    },
    [FactionId.KrallEmpire]: {
      factionId: FactionId.KrallEmpire,
      status: DiplomaticStatus.Hostile,
      relationValue: -30,
      treaties: [],
    },
    [FactionId.CultOfTheNexus]: {
      factionId: FactionId.CultOfTheNexus,
      status: DiplomaticStatus.Neutral,
      relationValue: 0,
      treaties: [],
    },
    [FactionId.FreeTradersSyndicate]: {
      factionId: FactionId.FreeTradersSyndicate,
      status: DiplomaticStatus.Friendly_TradeAgreement,
      relationValue: 50,
      treaties: [
        {
          type: "trade_agreement",
          startTurn: 10,
          duration: -1,
          iconAsset: "/placeholder.svg",
        }
      ],
    },
    [FactionId.PirateClan_RedMasks]: {
      factionId: FactionId.PirateClan_RedMasks,
      status: DiplomaticStatus.War,
      relationValue: -80,
      treaties: [],
    },
    [FactionId.Guardians_AncientAI]: {
      factionId: FactionId.Guardians_AncientAI,
      status: DiplomaticStatus.Neutral,
      relationValue: 10,
      treaties: [],
    },
  },
  selectedFactionId: null,
  aiRelations: {
    "solar_confederacy_krall_empire": DiplomaticStatus.Hostile,
    "solar_confederacy_cult_of_the_nexus": DiplomaticStatus.Neutral,
    "solar_confederacy_free_traders_syndicate": DiplomaticStatus.Friendly_TradeAgreement,
    "krall_empire_cult_of_the_nexus": DiplomaticStatus.Hostile,
    "krall_empire_free_traders_syndicate": DiplomaticStatus.Neutral,
    "cult_of_the_nexus_free_traders_syndicate": DiplomaticStatus.Neutral,
  }
};

const DiplomacyContext = createContext<DiplomacyContextType | undefined>(undefined);

export const DiplomacyProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [diplomacyState, setDiplomacyState] = useState<DiplomacyState>(initialDiplomacyState);

  const selectFaction = (factionId: FactionId) => {
    setDiplomacyState(prevState => ({
      ...prevState,
      selectedFactionId: factionId
    }));
  };

  const updateRelation = (factionId: FactionId, status: DiplomaticStatus, relationChange: number = 0) => {
    setDiplomacyState(prevState => {
      const currentRelation = prevState.playerRelations[factionId];
      if (!currentRelation) return prevState;

      const newRelationValue = Math.max(-100, Math.min(100, currentRelation.relationValue + relationChange));
      
      return {
        ...prevState,
        playerRelations: {
          ...prevState.playerRelations,
          [factionId]: {
            ...currentRelation,
            status,
            relationValue: newRelationValue
          }
        }
      };
    });
  };

  const addTreaty = (factionId: FactionId, treaty: Treaty) => {
    setDiplomacyState(prevState => {
      const currentRelation = prevState.playerRelations[factionId];
      if (!currentRelation) return prevState;
      
      // Remove any existing treaty of the same type
      const filteredTreaties = currentRelation.treaties.filter(t => t.type !== treaty.type);
      
      return {
        ...prevState,
        playerRelations: {
          ...prevState.playerRelations,
          [factionId]: {
            ...currentRelation,
            treaties: [...filteredTreaties, treaty]
          }
        }
      };
    });
  };

  const removeTreaty = (factionId: FactionId, treatyType: string) => {
    setDiplomacyState(prevState => {
      const currentRelation = prevState.playerRelations[factionId];
      if (!currentRelation) return prevState;
      
      return {
        ...prevState,
        playerRelations: {
          ...prevState.playerRelations,
          [factionId]: {
            ...currentRelation,
            treaties: currentRelation.treaties.filter(t => t.type !== treatyType)
          }
        }
      };
    });
  };

  return (
    <DiplomacyContext.Provider value={{
      diplomacyState,
      selectFaction,
      updateRelation,
      addTreaty,
      removeTreaty
    }}>
      {children}
    </DiplomacyContext.Provider>
  );
};

export const useDiplomacy = (): DiplomacyContextType => {
  const context = useContext(DiplomacyContext);
  if (!context) {
    throw new Error("useDiplomacy must be used within a DiplomacyProvider");
  }
  return context;
};
