
import React from 'react';
import { useCrewContext } from '@/contexts/CrewContext';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGameContext } from '@/contexts/GameContext';

// Define ship stations
const shipStations = [
  { id: "bridge_pilot", name: "Můstek (Pilotáž)", icon: "🎮" },
  { id: "weapons_control", name: "Zbraňové systémy", icon: "🎯" },
  { id: "engine_room", name: "Strojovna", icon: "⚙️" },
  { id: "science_lab", name: "Vědecká laboratoř", icon: "🔬" },
  { id: "med_bay", name: "Ošetřovna", icon: "🩺" },
  { id: "comms_center", name: "Komunikační centrum", icon: "📡" },
  { id: "security_deck", name: "Bezpečnostní sekce", icon: "🛡️" },
  { id: "mining_bay", name: "Těžební sekce", icon: "⛏️" },
];

export default function ShipStationAssignment() {
  const { crewMembers, assignStation, selectedCrewMemberId } = useCrewContext();
  const { gameState } = useGameContext();
  
  const selectedCrew = crewMembers.find(crew => crew.crewMemberId === selectedCrewMemberId);
  
  // Get crew member assigned to a specific station
  const getAssignedCrew = (stationId: string) => {
    return crewMembers.find(crew => crew.assignedStation_OnShip === stationId);
  };
  
  // Handle station assignment
  const handleAssign = (stationId: string) => {
    if (!selectedCrew) return;
    
    // If crew is already assigned to this station
    if (selectedCrew.assignedStation_OnShip === stationId) {
      // Unassign
      assignStation(selectedCrew.crewMemberId, "");
      return;
    }
    
    // If another crew member is already assigned to this station
    const currentlyAssigned = getAssignedCrew(stationId);
    if (currentlyAssigned) {
      if (!window.confirm(`${currentlyAssigned.name} je již přiřazen(a) k tomuto stanovišti. Chcete ho/ji nahradit?`)) {
        return;
      }
      
      // Unassign the current crew member
      assignStation(currentlyAssigned.crewMemberId, "");
    }
    
    // Assign the selected crew member to this station
    assignStation(selectedCrew.crewMemberId, stationId);
  };
  
  return (
    <Card className="p-4 bg-space-dark border border-space-border">
      <h3 className="font-pixel text-lg mb-4 text-space-ui-text">Stanoviště na lodi</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {shipStations.map(station => {
          const assignedCrew = getAssignedCrew(station.id);
          
          return (
            <div 
              key={station.id}
              className={`
                p-3 rounded-md border cursor-pointer transition-all
                ${assignedCrew 
                  ? (assignedCrew.crewMemberId === selectedCrewMemberId 
                    ? 'bg-space-selected border-space-accent' 
                    : 'bg-space-card border-space-accent/30')
                  : 'bg-space-card-dark border-space-border hover:border-space-border-hover'}
              `}
              onClick={() => handleAssign(station.id)}
            >
              <div className="flex items-center mb-1">
                <span className="text-lg mr-2">{station.icon}</span>
                <span className="font-medium text-space-ui-text">{station.name}</span>
              </div>
              
              <Separator className="my-2" />
              
              {assignedCrew ? (
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={assignedCrew.portraitUrl} alt={assignedCrew.name} />
                    <AvatarFallback className="bg-space-card text-space-ui-text">
                      {assignedCrew.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-space-ui-text">{assignedCrew.name}</div>
                    <div className="text-xs text-space-ui-subtext">
                      {assignedCrew.skills[0]?.skillId.replace('_', ' ')} Lvl {assignedCrew.skills[0]?.level}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-space-ui-subtext italic">Neobsazeno</div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-space-card-dark rounded-md">
        <p className="text-sm text-space-ui-subtext mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="underline decoration-dotted">Aktivní bonusy posádky</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tyto bonusy jsou poskytovány členy posádky přiřazenými ke stanovištím</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-space-card rounded">
            <span className="text-space-ui-subtext">Manévrovatelnost:</span>{' '}
            <span className="text-space-accent">+10%</span>
          </div>
          <div className="p-2 bg-space-card rounded">
            <span className="text-space-ui-subtext">Přesnost zbraní:</span>{' '}
            <span className="text-space-accent">+5%</span>
          </div>
          <div className="p-2 bg-space-card rounded">
            <span className="text-space-ui-subtext">Rychlost oprav:</span>{' '}
            <span className="text-space-accent">+15%</span>
          </div>
          <div className="p-2 bg-space-card rounded">
            <span className="text-space-ui-subtext">Dosah senzorů:</span>{' '}
            <span className="text-space-accent">+20%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
