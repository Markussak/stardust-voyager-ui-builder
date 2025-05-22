
import React from 'react';
import { useCrewContext } from '@/contexts/CrewContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CrewMemberStatusEffect } from '@/types/crew';

export default function CrewList() {
  const { crewMembers, selectedCrewMemberId, selectCrewMember } = useCrewContext();
  
  const getStatusEffectColor = (effect: CrewMemberStatusEffect) => {
    switch (effect) {
      case CrewMemberStatusEffect.Injured_Light:
      case CrewMemberStatusEffect.Injured_Heavy:
        return "bg-red-500";
      case CrewMemberStatusEffect.Sick:
        return "bg-yellow-500";
      case CrewMemberStatusEffect.Fatigued:
      case CrewMemberStatusEffect.Stressed:
        return "bg-orange-400";
      case CrewMemberStatusEffect.Inspired:
        return "bg-green-500";
      case CrewMemberStatusEffect.Drunk:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getStatusEffectName = (effect: CrewMemberStatusEffect) => {
    return effect.replace('_', ' ');
  };
  
  const getMoraleColor = (morale: number) => {
    if (morale >= 75) return "text-green-500";
    if (morale >= 50) return "text-yellow-500";
    if (morale >= 25) return "text-orange-500";
    return "text-red-500";
  };
  
  return (
    <div className="space-y-1">
      <h3 className="font-pixel text-lg mb-4 text-space-ui-text">Posádka</h3>
      
      {crewMembers.length === 0 ? (
        <p className="text-sm text-space-ui-subtext">Zatím nemáte žádné členy posádky.</p>
      ) : (
        <div className="space-y-2">
          {crewMembers.map(crew => (
            <div 
              key={crew.crewMemberId}
              className={`
                flex items-center p-2 rounded-md cursor-pointer
                transition-colors duration-200
                ${selectedCrewMemberId === crew.crewMemberId 
                  ? 'bg-space-selected border border-space-selected-border'
                  : 'bg-space-card hover:bg-space-card-hover border border-space-border'}
              `}
              onClick={() => selectCrewMember(crew.crewMemberId)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={crew.portraitUrl} alt={crew.name} />
                <AvatarFallback className="bg-space-card-dark text-space-ui-text">
                  {crew.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-space-ui-text">{crew.name}</span>
                  <span className={`text-xs ${getMoraleColor(crew.currentMorale)}`}>
                    {crew.currentMorale}/100 {
                      crew.moraleTrend === 'Improving' ? '↑' :
                      crew.moraleTrend === 'Worsening' ? '↓' : '='
                    }
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-space-ui-subtext">
                    {crew.skills[0]?.skillId} Lvl {crew.skills[0]?.level}
                    {crew.skills.length > 1 && `, ${crew.skills[1]?.skillId} Lvl ${crew.skills[1]?.level}`}
                  </div>
                  
                  {crew.statusEffects && crew.statusEffects.length > 0 && (
                    <div className="flex space-x-1">
                      <TooltipProvider>
                        {crew.statusEffects.map((status, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger>
                              <div className={`w-2 h-2 rounded-full ${getStatusEffectColor(status.effect)}`} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{getStatusEffectName(status.effect)}</p>
                              {status.duration_GameTurns && (
                                <p className="text-xs">{status.duration_GameTurns} turns remaining</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  )}
                </div>
                
                {crew.assignedStation_OnShip && (
                  <Badge variant="outline" className="mt-1 text-xs bg-space-accent/10">
                    {crew.assignedStation_OnShip.replace('_', ' ')}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
