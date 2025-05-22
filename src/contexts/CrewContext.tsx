
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CrewContextType, CrewMemberData, CrewSkillId, CrewPersonalityTrait, CrewMemberStatusEffect } from '@/types/crew';
import { uniqueCrewMembers, crewSystemConfig, crewGenerationTemplates } from '@/data/crewConfig';
import { useGameContext } from './GameContext';

// Create context with default values
const CrewContext = createContext<CrewContextType>({
  crewMembers: [],
  selectedCrewMemberId: null,
  recruitCandidates: [],
  
  selectCrewMember: () => {},
  hireCrewMember: () => false,
  dismissCrewMember: () => {},
  assignStation: () => {},
  updateMorale: () => {},
  addSkillPoints: () => {},
  addStatusEffect: () => {},
  removeStatusEffect: () => {},
  refreshRecruitCandidates: () => {},
  
  getCrewSkillLevel: () => 0,
  getShipStationBonus: () => ({}),
  getTotalCrewSalary: () => 0,
  getCrewMemberById: () => undefined,
});

// Random ID generator helper
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper function to generate random crew member
const generateRandomCrewMember = (roleId?: string): CrewMemberData => {
  // Select a random role if none provided
  if (!roleId) {
    const roles = crewSystemConfig.crewRoles;
    roleId = roles[Math.floor(Math.random() * roles.length)].roleId;
  }
  
  // Get skill template for this role
  const skillTemplate = crewGenerationTemplates.skillDistribution_Templates_ByRole[roleId as keyof typeof crewGenerationTemplates.skillDistribution_Templates_ByRole];
  
  // Generate skills based on template
  const skills = skillTemplate.map(template => {
    const levelRange = template.levelRange;
    const level = Math.floor(Math.random() * (levelRange[1] - levelRange[0] + 1)) + levelRange[0];
    
    return {
      skillId: template.skillId,
      level,
      experiencePoints: 0,
      xpToNextLevel: level * 100, // Simple formula for XP needed
      descriptionKey_Template: `skill.${template.skillId.toLowerCase()}.level{level}.desc`,
      defaultDescription_Template: `Level {level}: Provides bonuses related to ${template.skillId}`
    };
  });
  
  // Generate personality traits
  const traitCount = Math.floor(Math.random() * 2) + 1; // 1-2 traits
  const traits: CrewPersonalityTrait[] = [];
  
  // Always have higher chance for common traits
  for (let i = 0; i < traitCount; i++) {
    if (Math.random() < 0.7) { // 70% chance for common trait
      const randomTrait = crewGenerationTemplates.traitPool_Common[Math.floor(Math.random() * crewGenerationTemplates.traitPool_Common.length)];
      if (!traits.includes(randomTrait)) {
        traits.push(randomTrait);
      }
    } else { // 30% chance for rare trait
      const randomTrait = crewGenerationTemplates.traitPool_Rare[Math.floor(Math.random() * crewGenerationTemplates.traitPool_Rare.length)];
      if (!traits.includes(randomTrait)) {
        traits.push(randomTrait);
      }
    }
  }
  
  // Generate random name
  const raceId = "Human_TerranDescendants"; // Default race for now
  const nameGen = crewGenerationTemplates.nameGenerators[raceId];
  const isMale = Math.random() < 0.5;
  const gender = isMale ? "male" : "female";
  
  // Select from appropriate name list
  const firstName = nameGen[gender as keyof typeof nameGen][Math.floor(Math.random() * nameGen[gender as keyof typeof nameGen].length)];
  const lastName = nameGen.surnames[Math.floor(Math.random() * nameGen.surnames.length)];
  
  // Get the role object
  const role = crewSystemConfig.crewRoles.find(r => r.roleId === roleId);
  
  // Base salary calculation based on skill levels
  const baseSalary = 100;
  const skillBonus = skills.reduce((sum, skill) => sum + (skill.level * 20), 0);
  const salary = Math.round(baseSalary + skillBonus);
  
  // Determine portrait (in a real implementation, this would be more sophisticated)
  const portraitIndex = Math.floor(Math.random() * 3) + 1; // Just using 3 variations for demo
  
  return {
    crewMemberId: `crew_${generateId()}`,
    name: `${firstName} ${lastName}`,
    raceId: raceId,
    portraitUrl: `assets/images/factions/portraits/player_crew/${gender}_${roleId.toLowerCase()}_${portraitIndex}.png`,
    age: 20 + Math.floor(Math.random() * 40), // 20-60 years
    genderOrEquivalent: gender,
    skills,
    personalityTraits: traits,
    currentMorale: crewSystemConfig.crewMorale_System.baseMorale_Default,
    moraleTrend: 'Stable' as const,
    loyaltyToPlayer: 50,
    salary_CreditsPerCycle: salary,
    backgroundStory_Key: undefined,
    defaultBackgroundStory: `${firstName} is an experienced ${role?.defaultDisplayName?.toLowerCase()} looking for work aboard a ship.`
  };
};

export const CrewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { gameState, updateGameState } = useGameContext();
  
  const [crewMembers, setCrewMembers] = useState<CrewMemberData[]>([]);
  const [selectedCrewMemberId, setSelectedCrewMemberId] = useState<string | null>(null);
  const [recruitCandidates, setRecruitCandidates] = useState<CrewMemberData[]>([]);
  
  // Initial setup
  useEffect(() => {
    // Check if we already have crew data in game state
    if (gameState.crew && gameState.crew.length) {
      setCrewMembers(gameState.crew);
    } else {
      // Start with 1 default crew member for new games
      const startingCrew = [uniqueCrewMembers[0]]; // Use the predefined first crew member
      setCrewMembers(startingCrew);
      
      // Save to game state
      updateGameState({
        ...gameState,
        crew: startingCrew
      });
    }
    
    // Generate initial recruit candidates
    refreshRecruitCandidates();
  }, []);
  
  // Save crew changes to game state
  useEffect(() => {
    if (crewMembers.length > 0) {
      updateGameState({
        ...gameState,
        crew: crewMembers
      });
    }
  }, [crewMembers]);
  
  // Select crew member
  const selectCrewMember = (crewMemberId: string | null) => {
    setSelectedCrewMemberId(crewMemberId);
  };
  
  // Hire crew member
  const hireCrewMember = (crewMember: CrewMemberData): boolean => {
    // Check if player has enough credits
    if (gameState.player.credits < crewMember.salary_CreditsPerCycle * 2) {
      toast.error("Nedostatek kreditů pro nábor člena posádky");
      return false;
    }
    
    // Get current ship's max crew capacity
    const playerShip = gameState.player.currentShip;
    const maxCrew = playerShip?.crewCapacity || 4; // Default fallback
    
    // Check if ship has space
    if (crewMembers.length >= maxCrew) {
      toast.error("Vaše loď nemá kapacitu pro další členy posádky");
      return false;
    }
    
    // Update player credits (pay initial salary)
    updateGameState({
      ...gameState,
      player: {
        ...gameState.player,
        credits: gameState.player.credits - crewMember.salary_CreditsPerCycle
      }
    });
    
    // Add crew member
    setCrewMembers([...crewMembers, crewMember]);
    
    // Remove from candidates
    setRecruitCandidates(
      recruitCandidates.filter(c => c.crewMemberId !== crewMember.crewMemberId)
    );
    
    toast.success(`${crewMember.name} se připojil k vaší posádce!`);
    return true;
  };
  
  // Dismiss crew member
  const dismissCrewMember = (crewMemberId: string) => {
    const crewMember = crewMembers.find(c => c.crewMemberId === crewMemberId);
    if (!crewMember) return;
    
    setCrewMembers(crewMembers.filter(c => c.crewMemberId !== crewMemberId));
    setSelectedCrewMemberId(null);
    
    toast.info(`${crewMember.name} opustil vaši posádku`);
  };
  
  // Assign station
  const assignStation = (crewMemberId: string, stationId: string) => {
    setCrewMembers(crew => crew.map(c => {
      if (c.crewMemberId === crewMemberId) {
        return { ...c, assignedStation_OnShip: stationId };
      }
      return c;
    }));
  };
  
  // Update morale
  const updateMorale = (crewMemberId: string, moraleChange: number) => {
    setCrewMembers(crew => crew.map(c => {
      if (c.crewMemberId === crewMemberId) {
        const newMorale = Math.max(0, Math.min(100, c.currentMorale + moraleChange));
        let moraleTrend: 'Improving' | 'Stable' | 'Worsening' = c.moraleTrend;
        
        if (moraleChange > 0) moraleTrend = 'Improving';
        else if (moraleChange < 0) moraleTrend = 'Worsening';
        
        return { ...c, currentMorale: newMorale, moraleTrend };
      }
      return c;
    }));
  };
  
  // Add skill points
  const addSkillPoints = (crewMemberId: string, skillId: CrewSkillId, points: number) => {
    setCrewMembers(crew => crew.map(c => {
      if (c.crewMemberId === crewMemberId) {
        const updatedSkills = c.skills.map(s => {
          if (s.skillId === skillId) {
            return {
              ...s,
              level: s.level + points,
              xpToNextLevel: (s.level + points) * 100 // Simple formula for next level XP
            };
          }
          return s;
        });
        
        return { ...c, skills: updatedSkills };
      }
      return c;
    }));
  };
  
  // Add status effect
  const addStatusEffect = (crewMemberId: string, effect: CrewMemberStatusEffect, duration?: number) => {
    setCrewMembers(crew => crew.map(c => {
      if (c.crewMemberId === crewMemberId) {
        const currentEffects = c.statusEffects || [];
        const newEffect = { effect, duration_GameTurns: duration };
        
        return {
          ...c, 
          statusEffects: [...currentEffects.filter(e => e.effect !== effect), newEffect]
        };
      }
      return c;
    }));
  };
  
  // Remove status effect
  const removeStatusEffect = (crewMemberId: string, effect: CrewMemberStatusEffect) => {
    setCrewMembers(crew => crew.map(c => {
      if (c.crewMemberId === crewMemberId && c.statusEffects) {
        return {
          ...c, 
          statusEffects: c.statusEffects.filter(e => e.effect !== effect)
        };
      }
      return c;
    }));
  };
  
  // Refresh recruit candidates
  const refreshRecruitCandidates = () => {
    // Get a random recruitment location type
    const locationType = crewSystemConfig.recruitmentLocations[
      Math.floor(Math.random() * crewSystemConfig.recruitmentLocations.length)
    ];
    
    // Generate random number of candidates
    const candidateCount = Math.floor(Math.random() * 
      (locationType.candidatePool_SizeRange[1] - locationType.candidatePool_SizeRange[0] + 1)) + 
      locationType.candidatePool_SizeRange[0];
    
    // Generate candidates
    const candidates: CrewMemberData[] = [];
    for (let i = 0; i < candidateCount; i++) {
      candidates.push(generateRandomCrewMember());
    }
    
    setRecruitCandidates(candidates);
  };
  
  // Get crew skill level (totaled from all crew members for a specific skill)
  const getCrewSkillLevel = (skillId: CrewSkillId): number => {
    // Calculate total skill level from all crew members assigned to stations
    let totalLevel = 0;
    
    crewMembers.forEach(crew => {
      // Only count crew assigned to stations
      if (crew.assignedStation_OnShip) {
        const skill = crew.skills.find(s => s.skillId === skillId);
        if (skill) {
          totalLevel += skill.level;
        }
      }
    });
    
    return totalLevel;
  };
  
  // Get ship station bonus
  const getShipStationBonus = (stationId: string): Record<string, number> => {
    const bonuses: Record<string, number> = {};
    
    // Find crew assigned to this station
    const assignedCrew = crewMembers.find(c => c.assignedStation_OnShip === stationId);
    if (!assignedCrew) return bonuses;
    
    // Find what role this station corresponds to
    const role = crewSystemConfig.crewRoles.find(r => r.shipStation_Associated === stationId);
    if (!role) return bonuses;
    
    // Apply bonuses based on primary skills for this role
    role.primarySkills.forEach(skillId => {
      const skill = assignedCrew.skills.find(s => s.skillId === skillId);
      if (skill) {
        // Apply bonuses based on skill
        switch (skillId) {
          case CrewSkillId.Piloting:
            bonuses.maneuverability = skill.level * 5; // 5% per level
            bonuses.evasion = skill.level * 3; // 3% per level
            break;
          case CrewSkillId.Gunnery:
            bonuses.weapon_accuracy = skill.level * 5; // 5% per level
            bonuses.weapon_reload_speed = skill.level * 3; // 3% per level
            break;
          case CrewSkillId.Engineering:
            bonuses.repair_speed = skill.level * 10; // 10% per level
            bonuses.engine_efficiency = skill.level * 5; // 5% per level
            break;
          case CrewSkillId.Science_Scanning:
            bonuses.scan_range = skill.level * 8; // 8% per level
            bonuses.scan_detail = skill.level * 10; // 10% per level
            break;
          // ... add other skills as needed
        }
      }
    });
    
    return bonuses;
  };
  
  // Get total crew salary
  const getTotalCrewSalary = (): number => {
    return crewMembers.reduce((total, crew) => total + crew.salary_CreditsPerCycle, 0);
  };
  
  // Get crew member by ID
  const getCrewMemberById = (crewMemberId: string): CrewMemberData | undefined => {
    return crewMembers.find(c => c.crewMemberId === crewMemberId);
  };
  
  // Create value object for context provider
  const contextValue: CrewContextType = {
    crewMembers,
    selectedCrewMemberId,
    recruitCandidates,
    
    selectCrewMember,
    hireCrewMember,
    dismissCrewMember,
    assignStation,
    updateMorale,
    addSkillPoints,
    addStatusEffect,
    removeStatusEffect,
    refreshRecruitCandidates,
    
    getCrewSkillLevel,
    getShipStationBonus,
    getTotalCrewSalary,
    getCrewMemberById,
  };
  
  return (
    <CrewContext.Provider value={contextValue}>
      {children}
    </CrewContext.Provider>
  );
};

export const useCrewContext = () => useContext(CrewContext);
