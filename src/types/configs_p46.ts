// src/types/configs_p46.ts

import { 
    SideMissionArchetype, // Not directly used in config, but SideMissionTemplate is
    SideMissionTemplate, // For sideMissionTemplates_DatabasePath_cz
    RandomMiniEventDefinition, // For eventDefinitions_DatabasePath_cz (random mini events)
    GalacticEventDefinition // For eventDefinitions_DatabasePath_cz (galactic events)
} from './missions_events_p46'; // Adjust path as needed

// --- From Prompt 46 ---

// Section 1: Rozšířený Systém Misí (ExtendedMissionSystemConfig)
export interface ExtendedMissionSystemConfig {
    id: "ExtendedMissionSystem"; // Literal type
    sideMission_Generation_System?: {
        useArchetypes_ForVariety: boolean;
        sideMissionTemplates_DatabasePath_cz: string; // Path to JSON: Array of SideMissionTemplate
        maxConcurrent_SideMissions_Player: number;
        missionBoard_Availability_OnStations: boolean;
        missionGiver_NPC_Interaction_ForUniqueSideQuests: boolean;
        proceduralStoryHook_Generation_ForRepetitiveArchetypes_cz?: {
            enabled: boolean;
            useLorePlaceholders_From_Prompt32: boolean; // Assuming Prompt 32 defined these placeholders
            variationFactor_High_cz: string; // Descriptive
        };
        difficultyScaling_SideMissions_Logic?: {
            basedOn_PlayerLevel_And_ShipTier: boolean;
            enemyLevel_Range_Modifier_cz: string; // Descriptive
            rewardScaling_Matches_Difficulty: boolean;
            systemSecurityLevel_Influence_OnDifficulty: boolean;
        };
    };
    loreIntegration_InMissions_Enhanced_cz?: string; // Descriptive
    missionFailure_Consequences_Varied_cz?: string[]; // Descriptive array of consequences
}

// Section 2: Vylepšení Misijního Logu (MissionLogEnhancementsConfig_UI)
export interface MissionLogEnhancementsConfig_UI {
    id: "MissionLogEnhancements_UI"; // Literal type
    baseMissionLog_Config_Reference: string; // e.g., "REF_MissionLogScreenConfig_From_Prompt20"
    visuals_PerMission_InLog?: {
        mainIllustration_PixelArt_For_KeyStoryMissions_AssetPath_Template?: string;
        genericIcon_ByMissionType_For_SideQuests_AssetPath_Template?: string;
        factionLogo_Of_Giver_Visible?: boolean;
        rewardPreview_Icons_And_Text_Clear?: boolean;
    };
    technologicalProcessing_And_StoryConsistency?: {
        missionAvailability_BasedOn_PlayerProgress_StoryFlags_Reputation: boolean;
        prerequisiteMission_Completion_Required_For_ChainQuests: boolean;
        chronologicalOrder_Of_MainStoryMissions_Enforced: boolean;
        sideQuest_LevelRange_Indication_Optional_cz?: string; // Descriptive
        dialogueHistory_ForMission_Accessible_InLog_Optional_cz?: string; // Descriptive
    };
    ui_Layout_And_Filters_Enhanced_cz?: {
        tabs_For_MainStory_FactionStory_SideQuests_RandomEvents: boolean;
        advancedFilters_By_System_FactionGiver_RewardType_Status: boolean;
        sort_By_DateAccepted_Difficulty_ProximityToPlayer: boolean;
        mapIntegration_ShowAllActiveQuestMarkers_OnGalaxyMap_Toggle: boolean;
    };
    randomMiniEvents_LogSection_TitleKey_cz?: string;
    defaultRandomMiniEvents_LogSection_Title_cz?: string;
}

// Section 3: Systém Náhodných "Mini-Událostí" (RandomMiniEventsConfig)
export interface RandomMiniEventsConfig {
    id: "RandomMiniEventSystem"; // Literal type
    targetEventCount: number; // e.g., 200
    eventDefinitions_DatabasePath_cz: string; // Path to JSON: Array of RandomMiniEventDefinition
    triggerMechanisms_Varied: string[]; // Descriptive array of trigger mechanisms
    playerResponse_Simplicity_cz: string; // Descriptive
    rewardOrPenalty_Scale_Small_cz: string; // Descriptive
    uniqueness_Through_ProceduralTextVariation_cz: string; // Descriptive
    visualCue_InSpace_Subtle_BlinkingIcon_Or_SignalWave?: boolean;
    hud_Notification_BriefText_OptionalSound?: boolean;
    logging_In_MissionLog_As_QuickAction_Optional?: boolean;
}

// Section 4: Systém Galaktických Eventů (GalacticEventsConfig)
export interface GalacticEventsConfig {
    id: "GalacticEventSystem"; // Literal type
    targetEventCount_Major: [number, number]; // e.g., [5, 10]
    eventDefinitions_DatabasePath_cz: string; // Path to JSON: Array of GalacticEventDefinition
    firstEvent_Trigger_After_GameTimeHours_Played?: number;
    eventPacing_MinTimeBetweenEvents_GameDays?: number;
    difficultyScaling_BasedOn_PlayerProgress_And_GalaxyState?: boolean;
    playerAgency_In_EventResolution_High?: boolean;
    eventStorylines_MultiPhase_With_PlayerMissions?: boolean;
    visualImpact_On_GalaxyMap_Major?: {
        affectedRegions_OverlayColor_Or_Effect_AssetPath?: string;
        newIcons_For_EventFleets_Or_Anomalies?: boolean;
        dynamicChange_Of_FactionBorders_Or_SystemControl?: boolean;
        newsFeed_GNN_Updates_Frequent?: boolean;
    };
    visualImpact_In_SystemView_Major?: {
        newEnemyTypes_Or_FactionUnits_SpecificToEvent?: boolean;
        environmentalChanges_InAffectedSystems_cz?: string[]; // Descriptive
        specialParticleEffects_Or_SkyboxChanges?: boolean;
    };
    missionLog_Integration_EventTrackerUI?: {
        eventTitle_And_Icon: boolean;
        currentPhase_Description_cz: boolean;
        mainObjectives_ForPlayer_InCurrentPhase_cz: boolean;
        progressIndicator_Overall_Optional: boolean;
    };
    exampleGalacticEvents_cz?: Array<{ // This is example data, not strictly part of config structure usually
        eventId: string;
        eventName_cz: string;
        description_Short_cz: string;
    }>;
}
