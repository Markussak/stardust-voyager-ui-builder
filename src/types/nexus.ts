
import { Vector2D } from './game';

// Nexus Fragment IDs as defined in the specification
export enum NexusFragmentId {
    Fragment_Alpha_Mind = "Fragment_Alpha_Mind", // Ovlivňuje mysl, psionika
    Fragment_Beta_Matter = "Fragment_Beta_Matter", // Ovlivňuje hmotu, terraformace, výroba
    Fragment_Gamma_Energy = "Fragment_Gamma_Energy", // Ovlivňuje energii, zbraně, štíty
    Fragment_Delta_Time = "Fragment_Delta_Time",   // Ovlivňuje čas, vnímání, možná krátké skoky
    Fragment_Epsilon_Space = "Fragment_Epsilon_Space", // Ovlivňuje prostor, warp, červí díry
    Fragment_Zeta_Life = "Fragment_Zeta_Life",     // Ovlivňuje život, biologii, léčení
    Fragment_Omega_Void = "Fragment_Omega_Void"    // Ovlivňuje nicotu, anomálie, temnou energii
}

// Nexus Fragment Ability
export interface NexusFragmentAbility {
    abilityId: string;
    abilityNameKey: string; 
    defaultAbilityName: string;
    descriptionKey: string; 
    defaultDescription: string;
    visualEffect_AssetPath?: string;
    soundEffect_OnUse?: string;
    gameplayEffect_Description: string;
    cooldown_Seconds?: number;
    energy_Cost?: number;
}

// Nexus Fragment Data
export interface NexusFragmentData {
    fragmentId: NexusFragmentId;
    fragmentNameKey: string; 
    defaultFragmentName: string;
    iconAsset: string;
    visualDescription_InWorld_Key: string; 
    defaultVisualDescription_InWorld: string;
    associatedNexusAbility?: NexusFragmentAbility;
    lore_CodexEntryId: string;
    discoveryMission_Id?: string;
}

// Player's Final Choice regarding the Nexus
export enum PlayerFinalChoice_Nexus {
    Destroy_Nexus_SaveGalaxy = "Destroy_Nexus_SaveGalaxy",
    Control_Nexus_RuleGalaxy = "Control_Nexus_RuleGalaxy",
    Transform_Nexus_AscendGalaxy = "Transform_Nexus_AscendGalaxy",
    Study_Nexus_ContainAndLearn = "Study_Nexus_ContainAndLearn"
}

// Nexus Story Phase
export interface NexusStoryPhase {
    phaseId: string;
    phaseNameKey: string;
    defaultPhaseName: string;
    descriptionKey: string;
    defaultDescription: string;
    triggerCondition_ToStartPhase: string;
    keyMissions_Ids: string[];
    keyEvents_Or_Choices: Array<{
        eventId_Or_ChoiceId: string;
        descriptionKey: string;
        defaultDescription: string;
        impact_OnStoryProgression: string;
    }>;
    factionInvolvement_Summary: Record<string, string>;
}

// Nexus Storyline Configuration
export interface NexusStorylineConfig {
    id: string;
    mainTitleKey: string;
    defaultMainTitle: string;
    storySynopsis_ShortKey: string;
    defaultStorySynopsis_Short: string;
    totalNexusFragmentsToFind: number;
    nexusFragmentDefinitions_Path: string;
    storylinePhases: NexusStoryPhase[];
    playerFinalChoice: {
        triggerMissionId: string;
        choiceOptions: Array<{
            choiceId: PlayerFinalChoice_Nexus;
            choiceTextKey: string;
            defaultChoiceText: string;
            consequenceSummaryKey: string;
            defaultConsequenceSummary: string;
        }>;
        associatedEnding_Key_Template: string;
    };
    multipleEndings_Count: number;
    endGameEpilogue_Format: string;
    epilogueSlides_AssetPath_Prefix: string;
}

// Nexus Context Type
export interface NexusContextType {
    discoveredFragments: NexusFragmentData[];
    currentStoryPhase: NexusStoryPhase | null;
    nexusAbilities: NexusFragmentAbility[];
    hasDiscoveredFragment: (fragmentId: NexusFragmentId) => boolean;
    unlockFragment: (fragmentId: NexusFragmentId) => void;
    activateAbility: (abilityId: string) => boolean;
    makeStoryChoice: (choiceId: string) => void;
    viewNexusLore: (fragmentId: NexusFragmentId | null) => void;
    makeFinalChoice: (choice: PlayerFinalChoice_Nexus) => void;
    playerChoices: Record<string, string>;
}
