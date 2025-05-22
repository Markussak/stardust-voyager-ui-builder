
import { Vector2D } from './galaxy';
import { FactionId } from './diplomacy';

// Crew skill identifiers
export enum CrewSkillId {
    Piloting = "Piloting",
    Gunnery = "Gunnery",
    Engineering = "Engineering",
    Science_Scanning = "Science_Scanning",
    Medical = "Medical",
    Communications_Diplomacy = "Communications_Diplomacy",
    Security_Combat = "Security_Combat",
    Mining_Operations = "Mining_Operations",
    Crafting_Fabrication = "Crafting_Fabrication"
}

// Crew skill definition
export interface CrewSkill {
    skillId: CrewSkillId;
    level: number; // 1-10
    experiencePoints: number;
    xpToNextLevel: number;
    descriptionKey_Template: string;
    defaultDescription_Template: string;
    statBonus_PerLevel?: Array<{ statKey: string; bonusValue: number; isPercentage: boolean; }>;
    unlocksAbility_AtLevel?: Array<{ level: number; abilityId: string; }>;
}

// Crew personality traits
export enum CrewPersonalityTrait {
    Optimist = "Optimist",
    Pessimist = "Pessimist",
    Hot_Headed = "Hot_Headed",
    Calm_Under_Pressure = "Calm_Under_Pressure",
    Skilled_Mechanic_Natural = "Skilled_Mechanic_Natural",
    Kleptomaniac = "Kleptomaniac",
    Loyal = "Loyal",
    Greedy = "Greedy",
    Xenophobe_Crew = "Xenophobe_Crew",
    Tech_Savvy = "Tech_Savvy",
    Brave = "Brave",
    Cowardly = "Cowardly"
}

// Status effects that can be applied to crew members
export enum CrewMemberStatusEffect {
    Injured_Light = "Injured_Light",
    Injured_Heavy = "Injured_Heavy",
    Sick = "Sick",
    Fatigued = "Fatigued",
    Stressed = "Stressed",
    Inspired = "Inspired",
    Drunk = "Drunk"
}

// Crew member data structure
export interface CrewMemberData {
    crewMemberId: string;
    name: string;
    callsign?: string;
    raceId: string;
    portraitUrl: string;
    age?: number;
    genderOrEquivalent?: string;
    backgroundStory_Key?: string;
    defaultBackgroundStory?: string;
    skills: CrewSkill[];
    personalityTraits: CrewPersonalityTrait[];
    currentMorale: number; // 0-100
    moraleTrend: 'Improving' | 'Stable' | 'Worsening';
    loyaltyToPlayer: number; // 0-100
    salary_CreditsPerCycle: number;
    assignedStation_OnShip?: string;
    statusEffects?: Array<{ 
        effect: CrewMemberStatusEffect; 
        duration_GameTurns?: number;
        severity?: number; // 0-100 for effects that have varying levels
    }>;
    personalQuest_ChainId?: string;
    relationships_WithOtherCrew?: Record<string, 'Friendly' | 'Neutral' | 'Rivalry' | 'Conflict'>;
    equipmentSlots?: Record<string, string | null>;
}

// Crew roles definition
export interface CrewRole {
    roleId: string;
    displayNameKey: string;
    defaultDisplayName: string;
    primarySkills: CrewSkillId[];
    shipStation_Associated?: string;
    descriptionKey?: string;
    defaultDescription?: string;
    iconUrl?: string;
}

// Recruitment location types
export interface RecruitmentLocation {
    locationType: 'SpaceStation_Bar' | 'SpaceStation_RecruitmentAgency' | 'DerelictShip_Rescue' | 'QuestReward_Joins';
    candidatePool_SizeRange: [number, number];
    candidateQuality_FactorRange: [number, number];
    refreshTimer_GameDays?: number;
    faction_AssociatedId?: FactionId;
    locationId?: string;
}

// Crew system configuration
export interface CrewSystemConfig {
    maxPlayerShipCrew_DependsOnShipClass: boolean;
    playerCharacter_IsPartOfCrew: boolean;
    crewRoles: CrewRole[];
    recruitmentLocations: RecruitmentLocation[];
    crewMorale_System: {
        baseMorale_Default: number;
        factors_Positive: Array<{ eventKey: string; moraleChange: number; description: string; }>;
        factors_Negative: Array<{ eventKey: string; moraleChange: number; description: string; }>;
        lowMoraleThreshold_Warning: number;
        lowMoraleThreshold_NegativeEvents: number;
        mutiny_Mechanics?: {
            triggerMoraleLevel: number;
            chancePerCycle_AtLowMorale: number;
            outcomePossibilities: string[];
        };
    };
    crewNeeds_System?: {
        supplies_FoodWaterAir_ConsumptionPerCrewPerDay: number;
        supplies_ItemId_Generic: string;
        lowSupplies_MoralePenalty: number;
        rest_RequiredAfter_LongDurationMission_Hours?: number;
        fatigue_PerformancePenaltyFactor?: number;
    };
    crewLevelUp_System: {
        xpGain_Events: Array<{ 
            eventKey: string; 
            xpAmount: number; 
            skillAppliedTo?: CrewSkillId | 'AllActive'; 
        }>;
        skillPoints_PerLevelUp?: number;
        newTrait_OnLevelUp_Chance?: number;
    };
    crewInteractions_And_Events: {
        conflictChance_BasedOnTraits_And_Morale: number;
        conflictResolution_PlayerChoice: boolean;
        personalQuest_TriggerConditions: string[];
    };
}

// Context interface for crew management
export interface CrewContextType {
    // State
    crewMembers: CrewMemberData[];
    selectedCrewMemberId: string | null;
    recruitCandidates: CrewMemberData[];
    
    // Actions
    selectCrewMember: (crewMemberId: string | null) => void;
    hireCrewMember: (crewMember: CrewMemberData) => boolean;
    dismissCrewMember: (crewMemberId: string) => void;
    assignStation: (crewMemberId: string, stationId: string) => void;
    updateMorale: (crewMemberId: string, moraleChange: number) => void;
    addSkillPoints: (crewMemberId: string, skillId: CrewSkillId, points: number) => void;
    addStatusEffect: (crewMemberId: string, effect: CrewMemberStatusEffect, duration?: number) => void;
    removeStatusEffect: (crewMemberId: string, effect: CrewMemberStatusEffect) => void;
    refreshRecruitCandidates: () => void;
    
    // Utility functions
    getCrewSkillLevel: (skillId: CrewSkillId) => number;
    getShipStationBonus: (stationId: string) => Record<string, number>;
    getTotalCrewSalary: () => number;
    getCrewMemberById: (crewMemberId: string) => CrewMemberData | undefined;
}
