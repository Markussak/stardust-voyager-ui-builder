// src/types/configs_p41.ts

import { Vector2D, AnimationParams } from './visuals_core'; // Adjust path as needed
import { 
    PlanetaryBiomeDefinition, // For biomeDatabase_Path
    SurfaceVehicle_Rover_Stats, // For deployableVehicle_Rover_DefinitionPath
    SurfaceDrone_Scout_Stats, // For deployableDrone_Scout_DefinitionPath
    ProceduralNameGeneratorConfig // For namingRuleSets
} from './exploration_extended'; // Adjust path as needed
// AmbientNPCDialogueLine is used within LivingWorldDetailsConfig

// --- From Prompt 41 ---

// Section 1: Rozšířený Průzkum a Objevování (ExtendedExplorationDiscoveryConfig)
export interface ExtendedExplorationDiscoveryConfig {
    id: "ExtendedExplorationDiscoverySystem"; // Literal type
    planetarySurface_Exploration_Via_VehiclesDrones?: {
        enabled: boolean;
        deployableVehicle_Rover_DefinitionPath: string; // Path to JSON array of SurfaceVehicle_Rover_Stats
        deployableDrone_Scout_DefinitionPath: string; // Path to JSON array of SurfaceDrone_Scout_Stats
        deploymentCondition_cz: string; // Descriptive
        miniGame_SurfaceOperation_Type: "TopDown_TileBased_Exploration" | string; // Allow other types
        miniGame_Objective_Examples_cz: string[];
        miniGame_Controls_Rover_cz: string; // Descriptive
        miniGame_Visuals_PixelArt_Style: string; // Descriptive
        miniGame_MapSize_Tiles_Range: [[number, number], [number, number]]; // Min [width,height], Max [width,height]
        miniGame_ProceduralGeneration_TerrainFeatures_BasedOnBiome: boolean;
        miniGame_ResourceNodes_ScannableCollectable: boolean;
        miniGame_Hazards_Environmental_And_Fauna_SimpleAI: boolean;
        miniGame_ReturnToShip_Condition_Or_Teleport: boolean;
        soundEffects_MiniGame_Rover?: { // Optional sound config block
            engine_loop?: string;
            tool_drill_loop?: string;
            sample_collected?: string;
        };
    };
    uniquePlanetaryBiomes_And_Ecosystems?: {
        enabled: boolean;
        biomeDatabase_Path: string; // Path to JSON array of PlanetaryBiomeDefinition
        maxBiomes_PerPlanetType_Range: [number, number];
        biomeDistribution_Logic_OnPlanetSurface_cz: string; // Descriptive
        floraFauna_Scanning_Mechanic?: {
            scannerModule_Required_ShipOrVehicle: string; // ItemId
            scanTime_Seconds_PerSpecimen: number;
            scanResult_DataForCodex_Id_Template: string; // e.g., "codex_entry_flora_{planetId}_{floraId}"
            scanResult_ResearchPoints_Range: [number, number];
            visualFeedback_ScanInProgress_Animation: string; // Asset path or animation key
            soundEffect_ScanComplete_DataAcquired: string;
        };
        floraFauna_Collection_Mechanic?: {
            collectionTool_Required_VehicleOrCrew: string; // ItemId or capability key
            collectibleItem_Generated_ItemId_Template: string; // e.g., "resource_bio_sample_{planetId}_{floraFaunaId}"
            visualFeedback_SampleCollected_Effect: string; // Asset path or animation key
        };
        proceduralFloraFauna_NameGeneration_Key: string; // Reference to a ProceduralNameGeneratorConfig nameType
    };
}

// Section 2: Živoucí Svět – Drobné Detaily (LivingWorldDetailsConfig)
export interface LivingWorldDetailsConfig {
    id: "LivingWorldDetailsService"; // Literal type
    ambientNPCDialogues_OnStations?: {
        enabled: boolean;
        dialogueDatabase_Path_cz: string; // Path to JSON array of AmbientNPCDialogueLine
        triggerRadius_AroundPlayer_Units: number;
        maxConcurrentDialogues_OnScreen: number;
        displayMethod_SpeechBubbles_PixelArt: {
            fontStyleKey: string;
            backgroundColor: string; // Hex color with alpha
            textColor: string; // Hex color
            tailPointer_To_Speaker: boolean;
            disappearAfter_Seconds: number;
        };
        npcArchetypes_ForDialogue_Path: string; // Path to JSON defining NPC archetypes on stations
    };
    proceduralNameGeneration_System?: {
        enabled: boolean;
        nameGeneratorConfig_Path_Prefix: string; // e.g., "assets/data/names/name_generator_config_"
        // The actual configurations (ProceduralNameGeneratorConfig[]) would be loaded based on this prefix or a manifest file.
        // For this config, we just state that it's enabled and where to find the individual configs.
        // Alternatively, could embed namingRuleSets directly if preferred:
        // namingRuleSets?: ProceduralNameGeneratorConfig[];
        fallback_IfGenerationFails_cz: string;
    };
    visualNPCVariety_Generic?: {
        enabled: boolean;
        baseArchetype_SpriteSheet_Path_Template: string; // "assets/images/characters/generic_npcs/{archetype}_{race}_{gender}_base_sheet.png"
        customizableParts_ForVariety: string[]; // e.g., ["Head_Variant", "Hair_Or_HeadFeature_Variant"]
        numberOfVariants_PerArchetype_PerRace: [number, number];
        portraitGeneration_Uses_ProceduralSystem: boolean; // Refers to AdvancedGraphicsGenerationConfig
        portraitParams_ForGenericNPCs: { // Subset of ProceduralPortraitParams
            outputAsset_SizePx: Vector2D;
            // other fixed params if any for generic NPCs
        };
    };
}
