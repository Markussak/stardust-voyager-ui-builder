// src/types/configs_p47.ts

import { ColorPalette, AnimationParams } from './visuals_core'; // Adjust path as needed
import { 
    AlienLanguageFont,
    InteractiveCodexElement,
    GalacticLibraryPlanetData, // For planetData_Definition
    StarSystem_GalacticLibrary // For starSystem_Definition
} from './codex_library_p47'; // Adjust path as needed
// Assuming PopulatedPlanetData_Extended and StarSystemData_Full are base types used by the above.

// --- From Prompt 47 ---

// Section 1: Vylepšení UI Obrazovky Knižnice Znalostí (KnowledgeLibraryScreenConfig_Enhanced)
export interface KnowledgeLibraryScreenConfig_Enhanced {
    id: "KnowledgeLibraryScreen_Enhanced"; // Literal type
    screenNameKey: string; // e.g., "screen.codex.title_enhanced_cz"
    defaultScreenName: string; // e.g., "Galaktická Knižnice Vědomostí"
    panelStyle: {
        backgroundImageAsset?: string;
        backgroundColor: string; // Hex color with alpha
        borderColor: string; // Hex color
        borderWidthPx: number;
        widthPercentOfScreen: number;
        heightPercentOfScreen: number;
        paddingPx: number;
    };
    layout_Enhanced?: {
        categoryList_Style_cz?: string; // Descriptive
        entryList_Style_cz?: string; // Descriptive
        entryDetailView_Style_cz?: string; // Descriptive
        interactiveHologramArea_Position_cz?: string; // Descriptive
    };
    fontStyles_Thematic_cz?: {
        header_AncientGlyphs_cz?: { fontFamily: string; fontSizePx: number; color: string; };
        bodyText_HolographicScript_cz?: { fontFamily: string; fontSizePx: number; color: string; lineSpacingPx?: number; };
        alienScript_DisplayFont_Key_Template?: string; // e.g., "Font_{languageId}_Codex"
    };
    interactiveElements_InCodex?: Array<{ // Configuration for how these elements are used
        elementType: InteractiveCodexElement['elementType']; // From codex_library_p47.ts
        displayTrigger_CodexCategory_Or_EntryId: string[]; // Category keys or Entry IDs
        description_cz: string;
        asset_ForHologramBase_Path?: string; // If it's a hologram type
        placeholder_IfModelNotAvailable_AssetPath?: string; // If it's a 3D model type
        backgroundTexture_Scroll_AssetPath?: string; // If it's a scroll type
    }>;
    newOrUpdatedEntry_VisualIndicator_Enhanced_AssetPath?: string;
    soundEffects_Enhanced?: {
        openScreen_AncientTome_HolographicBoot?: string;
        pageTurn_HolographicScroll_Sound?: string;
        interactiveElement_Activate_Sound?: string;
        alienScript_Display_SubtleWhisper_Or_EnergySound_Loop?: string;
    };
}

// Section 2: Rozšíření Obsahu Knižnice Znalostí (CodexContentExpansionConfig)
export interface CodexContentExpansionConfig {
    id: "CodexContentExpansion"; // Literal type
    autoGenerateEntries_For_NewContent?: {
        races_From_AlienRaceDefinition_Prompt27?: boolean;
        ships_From_ShipClassDefinition_Prompt26?: boolean;
        modules_From_ShipModuleData_Prompt15?: boolean;
        technologies_From_ResearchTechnologyDefinition_Prompt16?: boolean;
        dynamicEvents_From_DynamicEventDefinition_Prompt32?: boolean;
        galacticEvents_From_GalacticEventDefinition_Prompt46?: boolean;
        planetaryBiomes_From_PlanetaryBiomeDefinition_Prompt41?: boolean;
        floraFauna_From_ScanData_Prompt41?: boolean;
        celestialBodyTypes_All_Prompts5_6_7_8_10_11_12?: boolean; // Assuming these prompts define various celestial body types
    };
    visuals_For_NewEntries?: {
        illustrationRequirement_ForAllMajorEntries?: boolean;
        illustrationStyle_ConsistentWith_Prompt35?: boolean; // Descriptive, refers to P35
        proceduralPortrait_For_RaceEntries_And_KeyNPCs?: boolean;
        shipSprite_TopDownOrIsometric_For_ShipEntries?: boolean;
        techIcon_Or_Schematic_For_TechnologyEntries?: boolean;
    };
    alienLanguage_Integration_In_Codex?: {
        enabled: boolean;
        alienFontDatabase_Path: string; // Path to JSON: Array of AlienLanguageFont
        displayIn_RaceEntries_cz?: string; // Descriptive
        displayIn_ArtifactEntries_cz?: string; // Descriptive
        decipheringMechanic_LinkTo_Research_Or_Quests?: boolean;
    };
    unlistedDiscoveries_HiddenCodexEntries_cz?: {
        enabled: boolean;
        trigger_By_Finding_ObscureLoreTablets_Or_SecretLocations?: boolean;
        content_CouldBe_Myths_DeveloperEasterEggs_UltraRareTechHints_cz?: string[]; // Descriptive
    };
}

// Section 3: Planeta "Velká Galaktická Knihovna" (GalacticLibraryPlanetConfig)
export interface GalacticLibraryPlanetConfig {
    id: "GalacticLibraryPlanetSystem"; // Literal type
    planetData_Definition: GalacticLibraryPlanetData; // Defined in codex_library_p47.ts
    starSystem_Definition: StarSystem_GalacticLibrary; // Defined in codex_library_p47.ts
    visualDescription_Planet_ArchivumMagnus_cz: string[]; // Array of descriptive strings
    interaction_With_GalacticLibrary_Planet_cz?: {
        docking_At_SpecificArchivePortals?: boolean;
        ui_LibraryNavigation_TreeStructure_cz?: string; // Descriptive
        noDirectTechUnlocks_OnlyLoreAndHints?: boolean;
        guardianAI_Interaction_DialogueTree_Key_cz?: string; // Key to a dialogue tree
    };
}
