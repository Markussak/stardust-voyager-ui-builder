// src/types/codex_library_p47.ts

import { Vector2D, AnimationParams, ColorPalette } from './visuals_core'; // Adjust path as needed
// Assuming PixelArtIllustration, FormattedTextElement are defined (e.g. in visuals_core or a UI types file)
// Assuming AlienRaceDefinition, ShipClassDefinition are defined (e.g. aliens.ts, ships-extended.ts)
// Assuming DynamicEventDefinition, GalacticEventDefinition (e.g. missions_events_p46.ts or events.ts)
// Assuming PopulatedPlanetData_Extended (e.g. destruction_planetary_interaction.ts)
// Assuming StarSystemData_Full (e.g. inSystemScene.ts)

// Placeholders for types from other prompts if not directly importable by the subtask
export interface PixelArtIllustration_Placeholder {
    assetUrl_HighRes: string;
    captionKey_cz?: string; defaultCaption_cz?: string;
    thumbnailAssetUrl_Small?: string;
}
export interface FormattedTextElement_Placeholder { // For rich text in codex
    elementType: 'Paragraph' | 'Header' | 'ListItem' | 'ImageRef' | 'Table';
    content_cz?: string; // For Paragraph, Header, ListItem
    imageAsset_Ref?: string; // For ImageRef
    // ... other properties for tables etc.
}
export type CodexEntryId_Placeholder = string;
export type TechId_Placeholder = string;

export interface CodexEntryData_Placeholder { // Base from Prompt 19
    id: CodexEntryId_Placeholder;
    titleKey_cz: string; defaultTitle_cz: string;
    categoryKey: string; // e.g., "FACTIONS", "SHIPS", "LORE_NEXUS"
    unlockCondition_Description_cz?: string;
    isUnlocked: boolean;
    isNew: boolean;
    // ... other base fields
}

export interface PopulatedPlanetData_Extended_Placeholder { // Base from Prompt 37
    planetId: string;
    name: string;
    // ... other base fields
}

export interface StarSystemData_Full_Placeholder { // Base from Prompt 38/42 (used in inSystemScene.ts)
    id: string;
    name: string;
    // ... other base fields
}


// --- From Prompt 47, Section 0 ---

export interface AlienLanguageFont {
    languageId: string; // např. "KrallScript", "SylvanGlyphs"
    raceId_Associated: string; // ID rasy, která toto písmo používá
    fontAsset_PixelArt_Path: string; // Cesta k pixel art fontu (TTF/OTF nebo spritesheet glyfů)
    glyphMapping_To_LatinChars?: Record<string, { x: number; y: number; width: number; height: number; }>;
    readabilityLevel_ForPlayer_Initial: 'Unreadable_Glyphs' | 'PartiallyDecipherable_Keywords' | 'FullyReadable_IfResearched';
    decipherTech_Id?: TechId_Placeholder | string; // ID technologie pro dešifrování
    sampleText_InAlienScript_ForCodex_cz: string;
}

export interface InteractiveCodexElement {
    elementId: string;
    elementType: 'Hologram_GalaxyMap_Dynamic' | '3DModel_Artifact_Rotatable' | 'AncientScroll_Zoomable_PixelArt' | string;
    assetPath_Or_DataKey: string;
    interactionPrompt_cz: string;
    animation_Idle?: AnimationParams;
    soundEffect_OnInteract?: string;
}

export interface CodexEntryData_Enhanced extends CodexEntryData_Placeholder { // Rozšíření z Promptu 19
    illustrations_Additional?: Array<PixelArtIllustration_Placeholder | any>; // Allow any for placeholder if actual type is complex
    alienLanguageSamples?: Array<{
        languageId: string;
        textSample_Key_cz: string;
        defaultTextSample_cz: string;
        translationAvailable_IfDeciphered: boolean;
    }>;
    interactiveElements?: InteractiveCodexElement[];
    audioLog_Transcript_FormattedText_Key_cz?: string; // Key to FormattedTextElement_Placeholder data
}

// Assuming PlanetType enum is available from galaxy.ts or visuals_core.ts
// Using placeholder if not directly available to this subtask.
export enum PlanetType_ForGalacticLibrary_P47 {
    Ecumenopolis_LibraryWorld = "Ecumenopolis_LibraryWorld", // Special type
    // Include other planet types if GalacticLibraryPlanetData can be on other types
    EarthLike = "EarthLike"
}

export interface GalacticLibraryPlanetData extends PopulatedPlanetData_Extended_Placeholder { // Rozšíření z Promptu 37
    isGalacticLibrary: true; // Literal type to identify this specific planet data structure
    // planetId, name etc. are inherited
    type: PlanetType_ForGalacticLibrary_P47 | string; // Override or ensure compatible with base
    libraryAccessLevel_Initial: 'Restricted_OuterArchives' | 'Partial_MainHalls' | 'Full_InnerSanctum';
    knowledgeSections_Available_cz: string[]; // např. ["Historie Galaxie", "Xenobiologie"]
    researchBonus_OnDiscovery_Type?: 'GlobalResearchSpeed_Percent' | 'SpecificTechCategory_Boost';
    researchBonus_Value?: number;
    unlockGalaxyMap_FullVisibility_OnDiscovery: boolean;
    guardianAI_Or_LibrarianNPC_Id?: string; // NPC ID
    uniqueCodexEntries_FoundOnlyHere_Ids?: Array<CodexEntryId_Placeholder | string>;
}

// Assuming StarType enum is available from galaxy.ts or celestial_visuals.ts
export enum StarType_ForGalacticLibrary_P47 {
    BlackHole_Supermassive_Ancient = "BlackHole_Supermassive_Ancient", // Special type
    // Include other star types if needed
    G_YellowMainSequence = "G_YellowMainSequence"
}

export interface StarSystem_GalacticLibrary extends StarSystemData_Full_Placeholder { // Speciální systém pro knihovnu
    // id, name etc. inherited
    containsGalacticLibraryPlanet: true; // Literal type
    primaryStar_Type: StarType_ForGalacticLibrary_P47 | string; // Override or ensure compatible with base
    systemDefenses_Unique_Ancient?: string[]; // např. "Pole neznámé energie"
    visualAppearance_FromGalaxyMap_cz: string;
    discoveryCondition_GameTimeHours_Min: number;
    discoveryHint_DialogueOrMission_Key: string;
    isNewlySpawned_AfterConditionMet: boolean;
}
