
import React from 'react';
import { DiplomaticStatus } from '@/types/diplomacy';
import { Badge } from '@/components/ui/badge';
import { FactionId } from '@/types/diplomacy';
import { useDiplomacy } from '@/contexts/DiplomacyContext';

interface FactionRelationshipStatusProps {
  factionId: FactionId | string;
  showText?: boolean;
  showBadge?: boolean;
  showValue?: boolean;
  compact?: boolean;
  className?: string;
}

const FactionRelationshipStatus: React.FC<FactionRelationshipStatusProps> = ({
  factionId,
  showText = true,
  showBadge = true,
  showValue = false,
  compact = false,
  className = ''
}) => {
  const { diplomacyState } = useDiplomacy();
  
  if (!diplomacyState || !diplomacyState.playerRelations[factionId]) {
    return <span className="text-space-ui-subtext text-xs">Neznámý vztah</span>;
  }
  
  const relation = diplomacyState.playerRelations[factionId];
  const relationStatus = relation.status;
  const relationValue = relation.relationValue;
  
  // Helper function to get status text
  const getStatusText = (status: DiplomaticStatus): string => {
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
  
  // Helper function to get status color
  const getStatusColor = (status: DiplomaticStatus): string => {
    switch (status) {
      case DiplomaticStatus.War: return "bg-red-700";
      case DiplomaticStatus.Hostile: return "bg-red-500";
      case DiplomaticStatus.Neutral: return "bg-gray-500";
      case DiplomaticStatus.Amity_NonAggressionPact: return "bg-blue-400";
      case DiplomaticStatus.Friendly_TradeAgreement: return "bg-green-400";
      case DiplomaticStatus.Ally_DefensivePact: return "bg-green-600";
      case DiplomaticStatus.Vassal: return "bg-purple-500";
      case DiplomaticStatus.Overlord: return "bg-purple-700";
      default: return "bg-gray-500";
    }
  };
  
  // Helper function to get attitude description
  const getAttitudeDescription = (value: number): string => {
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
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Status indicator dot or badge */}
      {showBadge ? (
        <Badge className={`mr-2 ${getStatusColor(relationStatus)}`}>
          {getStatusText(relationStatus)}
        </Badge>
      ) : (
        <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(relationStatus)}`}></div>
      )}
      
      {/* Status text */}
      {showText && (
        <span className="text-space-ui-subtext text-xs">
          {getAttitudeDescription(relationValue)}
        </span>
      )}
      
      {/* Relation value */}
      {showValue && (
        <span className={`ml-1 text-xs ${relationValue >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {relationValue > 0 ? '+' : ''}{relationValue}
        </span>
      )}
    </div>
  );
};

export default FactionRelationshipStatus;
