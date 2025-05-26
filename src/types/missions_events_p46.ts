// src/types/missions_events_p46.ts

// Assuming FactionId, CodexEntryId, ItemId are defined elsewhere and can be imported or are globally available.
// For now, using placeholders if direct imports are complex for the subtask.
export type FactionId_Placeholder = string;
export type CodexEntryId_Placeholder = string;
export type ItemId_Placeholder = string;
export type MissionId_Placeholder = string;

// Placeholder for MissionData (base type from Prompt 20)
export interface MissionData_Placeholder {
    missionId: MissionId_Placeholder;
    missionTitleKey_cz: string;
    defaultMissionTitle_cz: string;
    missionDescription_Brief_Key_cz: string;
    defaultMissionDescription_Brief_cz: string;
    missionGiver_FactionId?: FactionId_Placeholder;
    // ... other common mission properties like status, objectives, rewards from P20
}

// Placeholder for DynamicEventDefinition (base type from Prompt 32/40)
export interface DynamicEventDefinition_Placeholder {
    eventId: string;
    eventType: string; // Should be an enum like DynamicEventType from P32/40
    eventNameKey: string;
    // ... other properties
}


// --- From Prompt 46, Section 0 ---

export enum SideMissionArchetype {
    InvestigateSignal_Anomaly = "InvestigateSignal_Anomaly",
    Rescue_StrandedShip_Or_Crew = "Rescue_StrandedShip_Or_Crew",
    Escort_VIP_Or_Cargo = "Escort_VIP_Or_Cargo",
    BountyHunting_SpecificTarget = "BountyHunting_SpecificTarget",
    Smuggling_IllegalGoods_Stealth = "Smuggling_IllegalGoods_Stealth",
    ResourceCollection_RareMaterials = "ResourceCollection_RareMaterials",
    Exploration_ChartUnknownSector = "Exploration_ChartUnknownSector",
    DiplomaticCourier_DeliverMessage = "DiplomaticCourier_DeliverMessage",
    Sabotage_EnemyFactionAsset = "Sabotage_EnemyFactionAsset",
    ArchaeologicalDig_FindArtifact = "ArchaeologicalDig_FindArtifact",
    PestControl_SpaceCreatures = "PestControl_SpaceCreatures"
}

export interface SideMissionTemplate extends MissionData_Placeholder { // Extends base MissionData
    archetype: SideMissionArchetype;
    storyHook_Templates_cz: string[];
    objective_Variations_cz: Array<{
        descriptionKey_Template_cz: string;
        defaultDescription_Template_cz: string;
        targetType_Options?: string[]; // e.g., types of anomalies, ship types
        locationContext_Tags?: string[]; // e.g., "NearNebula", "AsteroidField"
    }>;
    rewardVariations_BasedOnDifficulty: boolean;
    loreIntegration_ChanceToLinkTo_CodexEntry: number; // 0-1
    difficultyScaling_Parameters: {
        playerLevel_Range: [number, number];
        enemyShipLevel_Modifier?: number;
        requiredSkillCheck_DC_Modifier?: number;
        reward_Credits_Multiplier?: number;
    };
    maxRepetitions_InRegion_BeforeVariationChange: number;
}

export enum RandomMiniEventType {
    DistressCall_NearbyShipAttacked = "DistressCall_NearbyShipAttacked",
    FloatingCargoPod_Opportunity = "FloatingCargoPod_Opportunity",
    SuddenPirateAmbush_Small = "SuddenPirateAmbush_Small",
    SpaceAnomaly_BriefScan = "SpaceAnomaly_BriefScan",
    TradeOffer_PassingMerchant = "TradeOffer_PassingMerchant",
    DerelictSignal_QuickLoot = "DerelictSignal_QuickLoot"
}

export interface RandomMiniEventDefinition {
    eventId: string;
    eventType: RandomMiniEventType;
    triggerCondition: 'ProximityToLocationType' | 'RandomChance_InSpace' | 'AfterCombat' | string; // Allow custom
    triggerParams?: any; // e.g., { locationType: "AsteroidField" }
    titleKey_cz: string;
    defaultTitle_cz: string;
    descriptionKey_cz: string;
    defaultDescription_cz: string;
    playerAction_Options_cz: Array<{
        text_cz: string;
        outcome_Key: string; // Odkaz na možný výsledek
        soundEffect?: string;
    }>;
    duration_MaxSeconds_ToReact: number;
    visualCue_InSpace_AssetPath?: string;
    logAs_QuickAction_InMissionLog: boolean;
}

export enum GalacticEventPhase {
    Warning_Signs_And_Rumors = "Warning_Signs_And_Rumors",
    Initial_Impact_Localized = "Initial_Impact_Localized",
    Escalation_Spreading_Threat = "Escalation_Spreading_Threat",
    Galactic_Response_FactionMobilization = "Galactic_Response_FactionMobilization",
    Player_KeyRole_Intervention = "Player_KeyRole_Intervention",
    Climax_MajorConfrontation = "Climax_MajorConfrontation",
    Resolution_Or_NewStatusQuo = "Resolution_Or_NewStatusQuo"
}

export interface GalacticEventDefinition {
    eventId: string; // např. "HiveInvasion_TheSwarm"
    eventNameKey_cz: string;
    defaultEventName_cz: string;
    description_Long_CodexKey_cz: CodexEntryId_Placeholder | string;
    triggerCondition_GameTimeHours_AfterStart: number;
    triggerCondition_PlayerProgress_Milestone?: string; // e.g., "NexusFragment_Count_3_Found"
    difficultyClass: 'Medium' | 'Hard' | 'EndGame_Threat';
    phases: Array<{
        phase: GalacticEventPhase;
        phaseNameKey_cz: string;
        defaultPhaseName_cz: string;
        duration_GameDays_Approx: number;
        description_PhaseImpact_cz: string;
        playerMissionChain_StartMissionId: MissionId_Placeholder | string;
        visuals_GalaxyMap_Changes_cz: string[];
        visuals_InSystem_Changes_cz: string[];
        sound_AmbientMusic_Theme_Override?: string;
    }>;
    resolution_PossibleOutcomes_cz: Array<{
        outcomeId: string;
        description_cz: string;
        permanentChanges_To_GalaxyState_cz: string[];
    }>;
    visualIcon_EventTracker_HUD_AssetPath: string;
}
