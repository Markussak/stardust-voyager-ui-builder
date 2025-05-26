// src/types/configs_p40.ts

import { Vector2D, AnimationParams } from './visuals_core'; // Adjust path as needed
import { 
    DiplomaticAction_Advanced,
    ShipEditor_AdvancedFeature,
    TradeSystem_AdvancedFeature,
    ResearchSystem_AdvancedFeature
} from './gameplay_mechanics_extended'; // Adjust path
import { 
    GalaxyMap_PlanetOrbitVisual,
    PopUpEventNotification_Style, // This is the Style, the Config below will use it
    ShipRepairMechanics // This is the base mechanics, the Config below will use it
} from './ui_enhancements_p40'; // Adjust path
import { 
    GameTime,
    PlayerHomeTime,
    GalacticStandardTimeLore,
    HUD_CrewStatusElement, // Definition of the element, config will specify where/how it's used on HUD
    HUD_EnvironmentalInfoElement, // Same as above
    ProceduralPortraitParams, // Params for generation
    PlanetaryLandingPanorama // Config for one panorama
} from './hud_extended'; // Adjust path
import { ScreenTransitionEffect } from './uiScreens'; // Adjust path

// --- From Prompt 40 ---

// Section 1: Vylepšení Herních Mechanik (GameplayMechanicsEnhancementsConfig)
export interface GameplayMechanicsEnhancementsConfig {
    id: "GameplayMechanicsEnhancements_Core"; // Literal type
    diplomacy_AdvancedOptions?: { // Optional, if not all games use advanced diplomacy
        newActionTypes_Available: DiplomaticAction_Advanced[];
        federationMechanics_cz: string;
        espionageSystem_cz: {
            introduction_MissionId: string;
            operations_Examples_cz: string[];
            riskFactor_Detection_And_Consequences_cz: string;
            ui_EspionageManagementScreen_Id: string; // ID for a new UI screen
        };
        reputationImpact_MoreGranular_cz: string;
    };
    shipAndBaseEditor_AdvancedOptions?: {
        newModuleTypes_Path: string; // Path to JSON file
        componentTuning_Mechanic_cz: string;
        visualCustomization_Ship_MoreOptions: string[]; // Example: ["CustomDecal_Upload_Or_PixelEditor_Simple", ...]
        baseModule_Synergies_cz: string;
    };
    tradeSystem_AdvancedOptions?: {
        smuggling_Mechanics_cz: {
            illegalGoods_Types_Path: string; // Path to JSON file
            riskOf_CustomsScan_InSecureSystems_Factor: number; // 0-1
            shieldedCargoHold_ModuleId: string; // ItemId
            consequences_IfCaught_cz: string[]; // Example: ["Pokuta", "Konfiskace zboží"]
        };
        factionSpecific_TradeContracts_LongTerm_cz: string;
        dynamicMarketEvents_InfluenceOnPrices_Enhanced: boolean;
    };
    researchAndDevelopment_AdvancedOptions?: {
        reverseEngineering_AlienTech_Mechanic_cz: string;
        breakthrough_Technologies_Rare_Randomized_cz: string;
        factionSpecific_MiniResearchTrees_Enabled: boolean;
        nexusTech_ResearchTree_UniqueBranch_Path: string; // Path to JSON/config file
    };
}

// Section 2: Vylepšení Galaktické Mapy (GalaxyMapEnhancementsConfig_V2)
export interface GalaxyMapEnhancementsConfig_V2 {
    id: "GalaxyMapEnhancements_V2"; // Literal type
    visuals_PlanetOrbits_OnSystemNode_Enhanced?: {
        enabled_IfSystemScanned_Level_PlanetDetails: boolean;
        orbitLineStyle_PerPlanetType_cz?: Record<string, { color: string; style: string; }>; // Key: PlanetType
        orbitLineThicknessPx?: number;
        planetMarker_OnOrbit_Asset_Template?: string;
        planetMarker_SizePx?: [number, number];
        animation_PlanetMarker_OnOrbit?: AnimationParams;
        showMoonOrbits_IfZoomedIn_Max_OnSystemNode?: boolean;
    };
    visuals_GalaxyMap_Aesthetics_PixelArtFocus_cz?: string; // Descriptive, refers to P35
    systemInfoPanel_Extended_DataFields_cz?: Array<{ // Describes what to show in system info panel
        fieldKey: string; // Key to access data, e.g., "dominantRace_NameAndPortrait"
        label_cz: string;
        displayType: 'Text' | 'TextWithSmallPortrait' | 'TextWithIcon' | 'IconList_WithTooltips' | 'ColoredText_WithIcon' | 'IconList_Clickable_ToEventDetails' | 'DateTimeText' | 'MultilineTextInput_Small';
    }>;
    mapFilters_Advanced?: Array<{ // New filters for the map
        id: string;
        labelKey_cz: string;
        options_cz?: string[]; // For dropdown/multi-select filters
        filterLogic_Description_cz?: string; // How this filter should work
    }>;
    warfareVisualization_OnGalaxyMap_Enhanced?: {
        frontlineStyle_Animated_cz: string; // Descriptive
        fleetMovement_Icons_Visible_cz: string; // Descriptive
        systemControl_Change_Animation_cz: string; // Descriptive
        battleReport_Access_FromMap_cz: string; // Descriptive
        majorBattle_Icons_Animated_AssetPath?: string; // From P37, confirmed here
        systemOccupation_Indicator_FactionLogoOverlay?: boolean; // From P37, confirmed here
    };
}

// Section 3: Pokročilé Generování Grafických Assetů (AdvancedGraphicsGenerationConfig)
export interface AdvancedGraphicsGenerationConfig {
    id: "AdvancedGraphicsGenerationSystem"; // Literal type
    proceduralPortrait_Generation_Enhanced?: {
        enabled_For_Crew_And_GenericNPCs: boolean;
        componentLibrary_Path_PerRace: string; // "assets/data/portraits/components/{raceId}/"
        componentList_Definition_Path: string; // Path to JSON with ProceduralPortraitComponentList array
        layering_And_Masking_Logic_cz: string; // Descriptive
        personalityTrait_Influence_On_Expression_And_Accessories_cz: string; // Descriptive
        outputFormat_PixelArt_WithAlpha: boolean;
        ai_StyleAdherence_To_Prompt35: string; // Descriptive, refers to P35
        // ProceduralPortraitParams (from hud_extended.ts) would be used as input to a generation function
    };
    planetaryLanding_Panorama_Backgrounds_System?: {
        enabled_For_KeyLocations_And_BiomeTypes: boolean;
        panoramaDatabase_Path_cz: string; // Path to JSON with PlanetaryLandingPanorama array
        generationLogic_CombiningLayers_And_Elements_cz: string; // Descriptive
        dynamicTimeOfDay_And_Weather_Variants_IfPossible: boolean;
        pixelArtStyle_ConsistentWith_GameWorld: boolean;
    };
    alienCity_Visuals_Enhanced_For_Panoramas_And_OrbitView?: {
        architecturalStyle_Definition_Path_PerRace_cz: string; // Path to JSON
        cityElement_SpriteSheet_Path_Template: string;
        proceduralCityLayout_ForPanorama_Simplified_cz: string; // Descriptive
        orbitView_CityLights_And_Structures_MoreVariety_cz: string; // Descriptive
    };
}

// Section 4: Pop-up Informace Významných Událostí (EventPopUpNotificationConfig_Enhanced)
export interface EventPopUpNotificationConfig_Enhanced {
    id: "EventPopUpNotificationSystem_V2"; // Literal type
    triggerEvents_ForPopUp_Reference: string; // e.g., "DynamicEventSystemConfig.triggerEvents_ForPopUp"
    popUpStyle_Definition_PerEventType?: Record<string, PopUpEventNotification_Style>; // Key: EventType string
    default_PopUpStyle: PopUpEventNotification_Style; // Fallback style
    content_Structure_Enhanced: {
        title_EventName_cz: boolean;
        icon_EventType_Large_Animated?: AnimationParams;
        shortDescription_ImpactOnPlayer_FormattedText_cz: boolean; // FormattedTextElement would be used here
        factionInvolved_Portraits_Or_Logos_IfApplicable: boolean;
        timer_ForTimedResponse_Optional_Display?: string;
        actionButtons_Contextual: Array<{
            buttonId: string;
            textKey_cz: string;
            defaultText_cz: string;
            action: string; // e.g., "ClosePopup", "Navigate_To_GalaxyMap_HighlightEventLocation"
            styleKey: string;
            condition_EventHasLocation?: boolean;
            condition_EventIsDiplomatic?: boolean;
            condition_EventOffersQuest?: boolean;
            // Add more conditions as needed
        }>;
    };
    pauseGame_WhenPopUp_Appears_Configurable: boolean;
    soundEffect_OnAppear_PerEventType: boolean;
}

// Section 5: Detailní Systém Oprav Lodi (ShipRepairSystemConfig_Enhanced)
export interface ShipRepairSystemConfig_Enhanced {
    id: "ShipRepairSystem_V2"; // Literal type
    repairLocations_Reference: string; // e.g., "ShipRepairSystemConfig.repairLocations_From_Prompt37"
    // ShipRepairMechanics (from ui_enhancements_p40.ts) defines the core rules.
    // This config object might hold specific data paths or UI integration details if not in ShipRepairMechanics.
    stationRepair_UI_Enhanced: {
        screenId_ToIntegrateWith: string; // e.g., "StationServicesScreen_RepairBayTab"
        repairPanel_TitleKey_cz: string;
        defaultRepairPanel_Title_cz: string;
        elements_cz_Enhanced: string[]; // Descriptive list of UI elements
        // Example of how detailed module repair data might be structured if passed to UI
        // This would be generated dynamically by the game logic.
        // detailedDamagedModuleInfoExample?: Array<{ 
        //     moduleId: string; currentDamagePercent: number; repairCost_Credits: number; 
        //     repairCost_Materials: Array<{itemId: string; qty: number}>; repairTime_Sec: number; 
        //     button_RepairModule_cz: string; 
        // }>;
        materialCosts_ForModuleRepair_SpecificComponents_Enabled: boolean;
        componentSalvage_From_DestroyedModules_Chance: number; // 0-1
    };
    fieldRepair_Consumables_Enhanced: {
        repairKit_Items_Path_Reference: string; // e.g., "ShipRepairMechanics.fieldRepair_Consumables.repairKit_Items_Path_From_Prompt37"
        naniteRepairCloud_VisualEffect_OnShip_AssetPath: string;
        repairPrioritization_IfMultipleDamagedModules_UI_Optional: boolean;
        temporaryPatch_Vs_FullRepair_Distinction: boolean;
    };
    crewSkill_Influence_Engineering_Enhanced: { // Extends ShipRepairMechanics
        enabled: boolean;
        skillId_Reference: string; // e.g., "Engineering"
        effectOn_RepairSpeed_PercentPerLevel: number;
        effectOn_RepairCost_ReductionPercentPerLevel: number;
        effectOn_FieldRepair_EffectivenessPercentPerLevel: number;
        unlocks_SpecialRepairAbilities_AtHighLevel_cz: string[];
    };
    shipWearAndTear_Accumulation_OverTime_And_Damage: {
        enabled: boolean;
        visualDecals_Accumulate_BasedOn_TimeSinceLastMaintenance_And_DamageTaken: boolean;
        maintenanceService_AtStation_ToRestorePristineLook_Cost: number;
    };
    soundEffects_Repair_Enhanced: {
        module_BeingRepaired_Sparks_Wrenches_Loop: string;
        nanite_Cloud_Active_Hum_Swirl: string;
    };
}

// Section 1 (HUD Expansion): EnhancedHUDConfig
export interface EnhancedHUDConfig {
    id: "EnhancedHUDSystem"; // Literal type
    baseHUDLayout_Reference: string; // e.g., "REF_HUDLayoutConfig_From_Prompt9"
    newElements_And_Positions: Array<{
        elementId: string; // e.g., "hud_game_time_display"
        positionAnchor: 'TopCenter' | 'TopLeft' | 'TopRight' | 'BottomCenter' | 'BottomLeft' | 'BottomRight' | string;
        offsetX_px: number;
        offsetY_px: number;
        displayFormat_cz_Template?: string; // For game time
        fontStyleKey?: string;
        tooltip_OnHover_cz?: string;
        layoutType?: 'HorizontalRow_MicroPortraits' | 'VerticalStack_TextAndIcons'; // For crew/env info
        maxVisibleCrew_MicroPortraits?: number;
        microPortrait_SizePx?: number;
        spacingPx_BetweenPortraits?: number;
        maxWidthPx?: number;
        elementDefinition_Path?: string; // Path to JSON for HUD_CrewStatusElement / HUD_EnvironmentalInfoElement
    }>;
    gameTimeSystem: {
        galacticStandardTime_Lore: GalacticStandardTimeLore; // Defined in hud_extended.ts
        playerHomeTime_Calculation: {
            basedOn_PlayerOriginChoice_InNewGame: boolean;
            defaultHomePlanet_OrbitalPeriod_EarthDays: number;
            defaultHomePlanet_DayLength_EarthHours: number;
        };
        timeProgression_SpeedFactor_InGame: number; // e.g., 60 (1 real min = 1 game hour)
        timeProgression_Paused_InMenus_And_Dialogues: boolean;
        timeDisplay_UpdateFrequency_Seconds_RealTime: number;
    };
    hudRefreshRate_Ms: number;
}
