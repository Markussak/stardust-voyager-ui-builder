import React, { createContext, useContext, useState } from 'react';
import { DiplomaticStatus, Faction, FactionId, DiplomacyContextType, Treaty } from '../types/diplomacy';

// Initial factions setup
const initialFactions: Faction[] = [
  {
    id: FactionId.SolarConfederacy,
    name: "Solární Konfederace",
    governmentType: "Republika",
    description: "Dominantní lidská frakce, zaměřená na obchod a expanzi.",
    color: "#0077CC",
    government: "Republika",
    primaryColor: "#0077CC",
    secondaryColor: "#003366",
    logoUrl: "/assets/factions/solar_confederacy_logo.png",
    discovered: true,
    power: {
      military: 80,
      economic: 90,
      tech: 70
    },
    homeSystemId: "Sol",
    controlledSystems: ["Sol", "Alpha Centauri", "Sirius"],
    diplomacy: {
      attitudeTowardsPlayer: 0,
      status: DiplomaticStatus.Neutral,
      treaties: [] // Ensure treaties is always an array
    }
  },
  {
    id: FactionId.KrallEmpire,
    name: "Krallské Impérium",
    governmentType: "Diktatura",
    description: "Agresivní a militaristická rasa, usilující o nadvládu nad galaxií.",
    color: "#CC0000",
    government: "Diktatura",
    primaryColor: "#CC0000",
    secondaryColor: "#660000",
    logoUrl: "/assets/factions/krall_empire_logo.png",
    discovered: true,
    power: {
      military: 95,
      economic: 60,
      tech: 50
    },
    homeSystemId: "Krall Prime",
    controlledSystems: ["Krall Prime", "Vega", "Proxima Centauri"],
    diplomacy: {
      attitudeTowardsPlayer: -50,
      status: DiplomaticStatus.Hostile,
      treaties: [] // Ensure treaties is always an array
    }
  },
  {
    id: FactionId.CultOfTheNexus,
    name: "Kult Nexu",
    governmentType: "Theokracie",
    description: "Záhadná a fanatická organizace, uctívající prastarou entitu známou jako Nexus.",
    color: "#663399",
    government: "Theokracie",
    primaryColor: "#663399",
    secondaryColor: "#331A4D",
    logoUrl: "/assets/factions/cult_of_nexus_logo.png",
    discovered: false,
    power: {
      military: 60,
      economic: 40,
      tech: 85
    },
    homeSystemId: "Nexus Shrine",
    controlledSystems: ["Nexus Shrine"],
    diplomacy: {
      attitudeTowardsPlayer: -20,
      status: DiplomaticStatus.Neutral,
      treaties: [] // Ensure treaties is always an array
    }
  },
  {
    id: FactionId.FreeTradersSyndicate,
    name: "Syndikát Volných Obchodníků",
    governmentType: "Korporátní",
    description: "Volná aliance obchodních korporací, zaměřená na maximalizaci zisku a minimalizaci regulací.",
    color: "#FF9933",
    government: "Korporátní",
    primaryColor: "#FF9933",
    secondaryColor: "#995C1A",
    logoUrl: "/assets/factions/free_traders_logo.png",
    discovered: true,
    power: {
      military: 40,
      economic: 95,
      tech: 60
    },
    homeSystemId: "Epsilon Eridani",
    controlledSystems: ["Epsilon Eridani", "Tau Ceti"],
    diplomacy: {
      attitudeTowardsPlayer: 30,
      status: DiplomaticStatus.Neutral,
      treaties: [] // Ensure treaties is always an array
    }
  },
  {
    id: FactionId.PirateClan_RedMasks,
    name: "Klan Pirátů Rudé Masky",
    governmentType: "Anarchie",
    description: "Skupina pirátských klanů, terorizujících okrajové systémy a obchodní cesty.",
    color: "#990000",
    government: "Anarchie",
    primaryColor: "#990000",
    secondaryColor: "#4D0000",
    logoUrl: "/assets/factions/pirate_clan_logo.png",
    discovered: true,
    power: {
      military: 70,
      economic: 30,
      tech: 30
    },
    homeSystemId: "Tortuga",
    controlledSystems: ["Tortuga", " lawless systems"],
    diplomacy: {
      attitudeTowardsPlayer: -70,
      status: DiplomaticStatus.Hostile,
      treaties: [] // Ensure treaties is always an array
    }
  },
  {
    id: FactionId.Guardians_AncientAI,
    name: "Strážci (Prastará AI)",
    governmentType: "Technokracie",
    description: "Prastará umělá inteligence, která se vyvinula v ochránce zapomenutých technologií a znalostí.",
    color: "#009999",
    government: "Technokracie",
    primaryColor: "#009999",
    secondaryColor: "#004D4D",
    logoUrl: "/assets/factions/ancient_ai_logo.png",
    discovered: false,
    power: {
      military: 85,
      economic: 50,
      tech: 95
    },
    homeSystemId: "Sigma Octantis",
    controlledSystems: ["Sigma Octantis"],
    diplomacy: {
      attitudeTowardsPlayer: 0,
      status: DiplomaticStatus.Neutral,
      treaties: [] // Ensure treaties is always an array
    }
  },
  {
    id: FactionId.Player,
    name: "Průzkumník",
    governmentType: "Nezávislý",
    description: "Váš vlastní průzkumnický sbor, malý ale ambiciózní.",
    color: "#00FF00",
    government: "Nezávislý",
    primaryColor: "#00FF00",
    secondaryColor: "#004400",
    logoUrl: "/assets/factions/player_logo.png",
    discovered: true,
    power: {
      military: 10,
      economic: 5,
      tech: 15
    },
    diplomacy: {
      attitudeTowardsPlayer: 100,
      status: DiplomaticStatus.Ally_DefensivePact,
      treaties: [] // Ensure treaties is always an array
    }
  },
];

const DiplomacyContext = createContext<DiplomacyContextType>({
  factions: [],
  selectedFactionId: null,
  selectFaction: () => {},
  getRelationWithPlayer: () => DiplomaticStatus.Neutral,
  updateRelation: () => {},
  addTreaty: () => {},
  getFactionById: () => undefined
});

export const DiplomacyProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [factions, setFactions] = useState<Faction[]>(initialFactions);
  const [selectedFactionId, setSelectedFactionId] = useState<string | null>(null);

  const selectFaction = (factionId: string | null) => {
    setSelectedFactionId(factionId);
  };

  const getFactionById = (factionId: string): Faction | undefined => {
    return factions.find(faction => faction.id === factionId);
  };

  const getRelationWithPlayer = (factionId: string): DiplomaticStatus => {
    const faction = getFactionById(factionId);
    return faction ? faction.diplomacy.status : DiplomaticStatus.Neutral;
  };

  // Update relation function with proper type safety
  const updateRelation = (factionId: string, newStatus: DiplomaticStatus, relationChange?: number) => {
    setFactions(prevFactions => 
      prevFactions.map(faction => 
        faction.id === factionId 
          ? { 
              ...faction, 
              diplomacy: { 
                ...faction.diplomacy, 
                status: newStatus,
                attitudeTowardsPlayer: relationChange !== undefined 
                  ? faction.diplomacy.attitudeTowardsPlayer + relationChange 
                  : faction.diplomacy.attitudeTowardsPlayer
              } 
            } 
          : faction
      )
    );
  };

  // Add treaty function with proper Treaty type
  const addTreaty = (factionId: string, treaty: Treaty) => {
    setFactions(prevFactions => 
      prevFactions.map(faction => 
        faction.id === factionId 
          ? { 
              ...faction, 
              diplomacy: { 
                ...faction.diplomacy, 
                treaties: [...(faction.diplomacy.treaties || []), treaty] // Ensure treaties exists
              } 
            } 
          : faction
      )
    );
  };

  // Create a more robust diplomacy state object
  const createDiplomacyState = () => {
    const factionsMap = factions.reduce((acc, faction) => {
      acc[faction.id] = faction;
      return acc;
    }, {} as Record<string, Faction>);
    
    const relationsMap = factions.reduce((acc, faction) => {
      acc[faction.id] = {
        status: faction.diplomacy.status,
        relationValue: faction.diplomacy.attitudeTowardsPlayer,
        treaties: faction.diplomacy.treaties || [] // Ensure treaties exists
      };
      return acc;
    }, {} as Record<string, any>);
    
    return {
      factions: factionsMap,
      playerRelations: relationsMap,
      selectedFactionId
    };
  };

  const value: DiplomacyContextType = {
    factions,
    selectedFactionId,
    selectFaction,
    getRelationWithPlayer,
    updateRelation,
    addTreaty,
    getFactionById,
    diplomacyState: createDiplomacyState()
  };

  return (
    <DiplomacyContext.Provider value={value}>
      {children}
    </DiplomacyContext.Provider>
  );
};

export const useDiplomacy = () => {
  const context = useContext(DiplomacyContext);
  if (context === undefined) {
    throw new Error('useDiplomacy must be used within a DiplomacyProvider');
  }
  return context;
};

export { DiplomaticStatus, FactionId };
