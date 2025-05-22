
import React from 'react';
import { useCrewContext } from '@/contexts/CrewContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameContext } from '@/contexts/GameContext';

export default function RecruitmentPanel() {
  const { recruitCandidates, hireCrewMember, refreshRecruitCandidates } = useCrewContext();
  const { gameState } = useGameContext();
  
  const playerCredits = gameState.player?.credits || 0;
  
  return (
    <Card className="p-4 bg-space-dark border border-space-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pixel text-lg text-space-ui-text">Dostupní kandidáti</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshRecruitCandidates} 
          className="text-xs"
        >
          Obnovit seznam
        </Button>
      </div>
      
      {recruitCandidates.length === 0 ? (
        <p className="text-sm text-space-ui-subtext">Žádní kandidáti nejsou momentálně k dispozici.</p>
      ) : (
        <div className="space-y-3">
          {recruitCandidates.map(candidate => (
            <div 
              key={candidate.crewMemberId}
              className="bg-space-card p-3 rounded-md hover:bg-space-card-hover transition-colors"
            >
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={candidate.portraitUrl} alt={candidate.name} />
                  <AvatarFallback className="bg-space-card-dark text-space-ui-text">
                    {candidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-space-ui-text">{candidate.name}</span>
                    <span className="text-xs text-space-accent">
                      {candidate.salary_CreditsPerCycle} kreditů/den
                    </span>
                  </div>
                  
                  <div className="text-xs text-space-ui-subtext">
                    {candidate.skills.map((skill, idx) => (
                      <span key={idx}>
                        {skill.skillId} Lvl {skill.level}
                        {idx < candidate.skills.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-space-accent text-black hover:bg-space-accent/80 text-xs"
                  disabled={playerCredits < candidate.salary_CreditsPerCycle * 2}
                  onClick={() => hireCrewMember(candidate)}
                >
                  Najmout ({candidate.salary_CreditsPerCycle * 2} kr.)
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
