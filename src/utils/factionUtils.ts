
import { DiplomaticStatus, FactionId } from '@/types/diplomacy';
import { AlienCulturalEthos, AlienGovernmentType } from '@/types/aliens';
import { getFactionById } from '@/data/factions';

// Translate relationship status to readable text
export const getDiplomaticStatusText = (status: DiplomaticStatus, compact = false): string => {
  switch (status) {
    case DiplomaticStatus.War: return "Válka";
    case DiplomaticStatus.Hostile: return "Nepřátelský";
    case DiplomaticStatus.Neutral: return "Neutrální";
    case DiplomaticStatus.Amity_NonAggressionPact: return compact ? "Pakt" : "Pakt o neútočení";
    case DiplomaticStatus.Friendly_TradeAgreement: return compact ? "Obchod" : "Obchodní dohoda";
    case DiplomaticStatus.Ally_DefensivePact: return compact ? "Spojenec" : "Obranný spojenec";
    case DiplomaticStatus.Vassal: return "Vazal";
    case DiplomaticStatus.Overlord: return "Suzerén";
    default: return "Neznámý";
  }
};

// Get color for diplomatic status
export const getDiplomaticStatusColor = (status: DiplomaticStatus): string => {
  switch (status) {
    case DiplomaticStatus.War: return "#CC0000"; // Bright red
    case DiplomaticStatus.Hostile: return "#FF4500"; // Orange-red
    case DiplomaticStatus.Neutral: return "#888888"; // Gray
    case DiplomaticStatus.Amity_NonAggressionPact: return "#4682B4"; // Steel blue
    case DiplomaticStatus.Friendly_TradeAgreement: return "#32CD32"; // Lime green
    case DiplomaticStatus.Ally_DefensivePact: return "#008000"; // Green
    case DiplomaticStatus.Vassal: return "#9370DB"; // Medium purple
    case DiplomaticStatus.Overlord: return "#8A2BE2"; // Blue violet
    default: return "#888888"; // Default gray
  }
};

// Get description for relationship value
export const getRelationshipValueDescription = (value: number): string => {
  if (value < -75) return "Nenávidí vás";
  if (value < -50) return "Silně nepřátelský";
  if (value < -25) return "Nepřátelský";
  if (value < 0) return "Obezřetný";
  if (value === 0) return "Neutrální";
  if (value < 25) return "Přátelský";
  if (value < 50) return "Velmi přátelský";
  if (value < 75) return "Spojenecký";
  return "Loajální";
};

// Translate alien government type to readable text
export const getGovernmentTypeText = (type: AlienGovernmentType): string => {
  return type.split('_').join(' ');
};

// Translate cultural ethos to readable text
export const getEthosText = (ethos: AlienCulturalEthos): string => {
  return ethos.replace(/_/g, ' ');
};

// Get faction primary and secondary colors
export const getFactionColors = (factionId: FactionId): { primary: string, secondary: string } => {
  const faction = getFactionById(factionId);
  
  if (faction) {
    return {
      primary: faction.visualIdentity.primaryColor,
      secondary: faction.visualIdentity.secondaryColor || faction.visualIdentity.primaryColor
    };
  }
  
  // Default colors
  return {
    primary: '#888888',
    secondary: '#666666'
  };
};

// Generate CSS gradient based on faction colors
export const getFactionGradient = (factionId: FactionId, opacity = 0.2): string => {
  const { primary, secondary } = getFactionColors(factionId);
  const primaryWithOpacity = `${primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  const secondaryWithOpacity = `${secondary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  return `linear-gradient(135deg, ${primaryWithOpacity} 0%, ${secondaryWithOpacity} 100%)`;
};

// Check if two factions are at war
export const areFactionsAtWar = (faction1: FactionId, faction2: FactionId): boolean => {
  const faction1Data = getFactionById(faction1);
  if (!faction1Data) return false;
  
  return faction1Data.diplomacyAI.initialRelations_WithOtherFactions.some(
    relation => relation.factionId === faction2 && relation.status === DiplomaticStatus.War
  );
};

// Get factions that are allies with the given faction
export const getFactionAllies = (factionId: FactionId): FactionId[] => {
  const faction = getFactionById(factionId);
  if (!faction) return [];
  
  return faction.diplomacyAI.initialRelations_WithOtherFactions
    .filter(relation => 
      relation.status === DiplomaticStatus.Ally_DefensivePact || 
      relation.status === DiplomaticStatus.Friendly_TradeAgreement ||
      relation.status === DiplomaticStatus.Amity_NonAggressionPact
    )
    .map(relation => relation.factionId);
};

// Get factions that are enemies with the given faction
export const getFactionEnemies = (factionId: FactionId): FactionId[] => {
  const faction = getFactionById(factionId);
  if (!faction) return [];
  
  return faction.diplomacyAI.initialRelations_WithOtherFactions
    .filter(relation => 
      relation.status === DiplomaticStatus.War || 
      relation.status === DiplomaticStatus.Hostile
    )
    .map(relation => relation.factionId);
};
