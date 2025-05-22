
import React from 'react';
import { useCrewContext } from '@/contexts/CrewContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CrewPersonalityTrait, CrewMemberStatusEffect } from '@/types/crew';

export default function CrewDetail() {
  const { selectedCrewMemberId, crewMembers, dismissCrewMember, addSkillPoints } = useCrewContext();
  
  const selectedCrew = crewMembers.find(crew => crew.crewMemberId === selectedCrewMemberId);
  
  if (!selectedCrew) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-space-ui-subtext">Vyberte člena posádky pro zobrazení detailů</p>
      </div>
    );
  }
  
  const getPersonalityTraitDescription = (trait: CrewPersonalityTrait) => {
    const descriptions: Record<CrewPersonalityTrait, string> = {
      [CrewPersonalityTrait.Optimist]: "Zvyšuje morálku okolní posádky a lépe snáší těžké situace.",
      [CrewPersonalityTrait.Pessimist]: "Může snižovat morálku okolní posádky, ale je lépe připraven na problémy.",
      [CrewPersonalityTrait.Hot_Headed]: "Vznětlivá povaha, větší šance na konflikty, ale bonus v bojových situacích.",
      [CrewPersonalityTrait.Calm_Under_Pressure]: "Zachovává klid i v krizových situacích, bonus k výkonu během nebezpečných misí.",
      [CrewPersonalityTrait.Skilled_Mechanic_Natural]: "Přirozený talent pro mechaniku, bonus k Engineering dovednosti.",
      [CrewPersonalityTrait.Kleptomaniac]: "Může krást zásoby, způsobovat konflikty a negativní události.",
      [CrewPersonalityTrait.Loyal]: "Vysoká loajalita ke kapitánovi, menší šance na vzpouru i při nízké morálce.",
      [CrewPersonalityTrait.Greedy]: "Vyžaduje vyšší plat a snadno se cítí nedoceněný.",
      [CrewPersonalityTrait.Xenophobe_Crew]: "Špatné vztahy s mimozemskými členy posádky a NPC.",
      [CrewPersonalityTrait.Tech_Savvy]: "Přirozený talent pro technologie, bonus k Science a Crafting dovednostem.",
      [CrewPersonalityTrait.Brave]: "Odvážný, menší šance na útěk z boje, bonus v nebezpečných situacích.",
      [CrewPersonalityTrait.Cowardly]: "Zbabělý, větší šance na útěk z boje, ale také na vyhýbání se zbytečnému riziku."
    };
    
    return descriptions[trait] || "Neznámý rys osobnosti.";
  };
  
  const getMoraleDescription = (morale: number) => {
    if (morale >= 80) return "Výborná";
    if (morale >= 60) return "Dobrá";
    if (morale >= 40) return "Průměrná";
    if (morale >= 20) return "Nízká";
    return "Kritická";
  };
  
  const getMoraleColor = (morale: number) => {
    if (morale >= 80) return "text-green-500";
    if (morale >= 60) return "text-teal-500";
    if (morale >= 40) return "text-yellow-500";
    if (morale >= 20) return "text-orange-500";
    return "text-red-500";
  };
  
  const getStatusEffectDescription = (effect: CrewMemberStatusEffect) => {
    const descriptions: Record<CrewMemberStatusEffect, string> = {
      [CrewMemberStatusEffect.Injured_Light]: "Lehké zranění, snižuje výkon o 10%",
      [CrewMemberStatusEffect.Injured_Heavy]: "Těžké zranění, snižuje výkon o 30%, potřebuje ošetření",
      [CrewMemberStatusEffect.Sick]: "Nemoc, snižuje výkon o 20% a může nakazit ostatní",
      [CrewMemberStatusEffect.Fatigued]: "Únava, snižuje výkon o 15%",
      [CrewMemberStatusEffect.Stressed]: "Stres, snižuje morálku i výkon",
      [CrewMemberStatusEffect.Inspired]: "Inspirace, zvyšuje výkon o 20%",
      [CrewMemberStatusEffect.Drunk]: "Opilost, nepředvídatelné efekty na výkon"
    };
    
    return descriptions[effect] || "Neznámý stav.";
  };
  
  const handleDismiss = () => {
    if (window.confirm(`Opravdu chcete propustit člena posádky ${selectedCrew.name}?`)) {
      dismissCrewMember(selectedCrew.crewMemberId);
    }
  };
  
  return (
    <Card className="p-4 h-full bg-space-dark border border-space-border overflow-y-auto">
      <div className="flex items-center mb-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={selectedCrew.portraitUrl} alt={selectedCrew.name} />
          <AvatarFallback className="bg-space-card-dark text-space-ui-text">
            {selectedCrew.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="text-xl font-pixel text-space-ui-text">
            {selectedCrew.name}
            {selectedCrew.callsign && <span className="text-space-accent ml-2">''{selectedCrew.callsign}''</span>}
          </h2>
          <div className="text-space-ui-subtext">
            {selectedCrew.raceId.replace('_', ' ')} • Věk: {selectedCrew.age || 'Neznámý'} • 
            {selectedCrew.genderOrEquivalent && ` ${selectedCrew.genderOrEquivalent.charAt(0).toUpperCase() + selectedCrew.genderOrEquivalent.slice(1)}`}
          </div>
        </div>
      </div>
      
      {selectedCrew.defaultBackgroundStory && (
        <div className="mb-4 p-3 bg-space-card rounded-md">
          <p className="text-sm text-space-ui-text italic">{selectedCrew.defaultBackgroundStory}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-pixel mb-2 text-space-ui-text">Morálka</h3>
          <div className="flex items-center">
            <Progress value={selectedCrew.currentMorale} className="flex-grow mr-2" />
            <span className={`text-sm ${getMoraleColor(selectedCrew.currentMorale)}`}>
              {getMoraleDescription(selectedCrew.currentMorale)}
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="font-pixel mb-2 text-space-ui-text">Plat</h3>
          <div className="flex items-center">
            <Badge className="bg-space-accent text-black">
              {selectedCrew.salary_CreditsPerCycle} kreditů / den
            </Badge>
          </div>
        </div>
      </div>
      
      <h3 className="font-pixel mt-4 mb-2 text-space-ui-text">Dovednosti</h3>
      <div className="space-y-3">
        {selectedCrew.skills.map((skill, index) => (
          <div key={index} className="bg-space-card p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-space-ui-text">{skill.skillId.replace('_', ' ')}</span>
              <span className="text-sm text-space-accent">Úroveň {skill.level}</span>
            </div>
            <Progress value={(skill.experiencePoints / skill.xpToNextLevel) * 100} className="h-1" />
            <p className="text-xs text-space-ui-subtext mt-1">
              {skill.experiencePoints}/{skill.xpToNextLevel} XP do další úrovně
            </p>
          </div>
        ))}
      </div>
      
      <h3 className="font-pixel mt-4 mb-2 text-space-ui-text">Rysy osobnosti</h3>
      <div className="space-y-2">
        {selectedCrew.personalityTraits.map((trait, index) => (
          <div key={index} className="bg-space-card p-2 rounded-md">
            <p className="text-sm font-medium text-space-ui-text">{trait.replace('_', ' ')}</p>
            <p className="text-xs text-space-ui-subtext">{getPersonalityTraitDescription(trait)}</p>
          </div>
        ))}
      </div>
      
      {selectedCrew.statusEffects && selectedCrew.statusEffects.length > 0 && (
        <>
          <h3 className="font-pixel mt-4 mb-2 text-space-ui-text">Aktuální stavy</h3>
          <div className="space-y-2">
            {selectedCrew.statusEffects.map((status, index) => (
              <div key={index} className="bg-space-card-dark p-2 rounded-md border border-space-border">
                <p className="text-sm font-medium text-space-ui-text">
                  {status.effect.replace('_', ' ')}
                  {status.duration_GameTurns && <span className="text-xs ml-2">({status.duration_GameTurns} dnů)</span>}
                </p>
                <p className="text-xs text-space-ui-subtext">{getStatusEffectDescription(status.effect)}</p>
              </div>
            ))}
          </div>
        </>
      )}
      
      {selectedCrew.personalQuest_ChainId && (
        <>
          <h3 className="font-pixel mt-4 mb-2 text-space-ui-text">Osobní mise</h3>
          <div className="bg-space-accent/20 p-2 rounded-md">
            <p className="text-sm text-space-ui-text">Tento člen posádky má osobní příběh k prozkoumání.</p>
            <Button variant="outline" className="mt-2 text-xs w-full">Prozkoumejte osobní misi</Button>
          </div>
        </>
      )}
      
      <Separator className="my-4" />
      
      <div className="flex justify-between">
        <Button variant="outline" className="text-space-ui-text" onClick={handleDismiss}>
          Propustit
        </Button>
        <Button variant="default" className="bg-space-accent text-black hover:bg-space-accent/80">
          Přiřadit k stanovišti
        </Button>
      </div>
    </Card>
  );
}
