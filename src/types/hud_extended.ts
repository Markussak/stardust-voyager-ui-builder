// src/types/hud_extended.ts

import { Vector2D, AnimationParams, ColorPalette } from './visuals_core'; // Assuming visuals_core.ts, adjust path if necessary
import { FactionId } from './diplomacy'; // Assuming diplomacy.ts, adjust path

// --- From Prompt 40, Section 0 & 1 (HUD and Game Time) ---

export interface GameTime {
    galacticStandardYear: number; // G.S.R. (Galaktický Standardní Rok)
    galacticStandardDay: number;  // 1-360 (example, P40 says 360 for easier calcs)
    galacticStandardHour: number; // 0-23
    galacticStandardMinute: number; // 0-59
}

export interface PlayerHomeTime { // Příklad, může být specifičtější pro hráčův původ
    homePlanetYear: number;
    homePlanetDay: number;
    homePlanetCycleName_cz?: string; // Název cyklu/měsíce na domovské planetě
}

export interface GalacticStandardTimeLore {
    epochEvent_NameKey_cz: string;
    defaultEpochEvent_Name_cz: string; // "Sjednocení Kolonií", "Objev Prvního Nexusu"
    epochEvent_Description_CodexKey: string; // Odkaz na záznam v Knižnici
    yearZero_Definition_cz: string;
    standardDayLength_EarthHours: number; // např. 24
    standardYearLength_StandardDays: number; // např. 360
}

export interface HUD_CrewStatusElement {
    crewMemberId: string; // Odkaz na CrewMemberData ID
    portrait_Micro_AssetPath: string; // Velmi malý portrét (např. 16x16px)
    health_StatusIcon_AssetPath: string; // Ikona pro zdraví (zelená/žlutá/červená)
    morale_StatusIcon_AssetPath: string; // Ikona pro morálku (smajlík)
    tooltip_Summary_cz: string; // "Jméno: {Jméno}, Zdraví: X%, Morálka: Y%"
}

export interface HUD_EnvironmentalInfoElement {
    currentSystem_SecurityLevel_Text_cz: string; // "Bezpečnost: Vysoká / Pirátský Sektor"
    currentSystem_DominantFaction_IconAsset?: string; // Logo frakce
    nearestPlanet_Name_Distance_cz?: string; // "Nejbližší: Terra Nova (0.5 AU)"
    radiationLevel_Indicator?: { value: number; color: string; iconAsset: string; };
    cosmicStorm_Indicator?: { isActive: boolean; intensityText_cz: string; iconAsset: string; };
}

// ProceduralPortraitComponentList is also mentioned in P40 Section 0, related to graphics generation.
// It fits well with other visual component definitions.
export interface ProceduralPortraitComponentList {
    raceId: string; // e.g. "Human", "Krall", "Sylvan"
    partType: 'HeadShape' | 'Eyes' | 'Mouth' | 'Nose' | 'HairOrHeadFeature' | 'SkinPattern' | 'Clothing_Torso' | 'Accessory_Head' | 'Accessory_Face' | string; // Allow custom part types
    variants: Array<{
        assetPath: string; // Cesta k pixel art části
        tags?: string[]; // např. "male", "old", "warrior_style", "common", "rare"
        colorable_MaskAssetPath?: string; // Maska pro obarvení
        // Add constraints like "requires_part_X" or "conflicts_with_part_Y" if needed for advanced generation
    }>;
}

// ProceduralPortraitParams (from P40, also in P41)
// This defines the input parameters for generating a portrait.
export interface ProceduralPortraitParams {
    raceId: string; // Odkaz na AlienRaceDefinition (Prompt 27) nebo "Human"
    genderOrEquivalent?: string;
    ageGroup?: 'Young' | 'Adult' | 'Elderly';
    archetype?: 'Warrior' | 'Scientist' | 'Trader' | 'Diplomat' | 'Worker' | string; // Ovlivní oblečení, doplňky
    outputAsset_SizePx: Vector2D; // e.g. {x: 64, y: 64} or {x: 128, y: 128}
    colorPalette_Override_Faction?: FactionId; // Barvy oblečení dle frakce
    // Specific feature requests, e.g. hairColor_Hint: "red", eyeStyle_Hint: "narrow"
    featureHints?: Record<string, string>;
}

// PlanetaryLandingPanorama (from P40, also in P41)
// Describes a panoramic background for planet landing/surface interaction screens.
// PlanetType is assumed to be an enum defined elsewhere (e.g., in types/galaxy.ts)
export enum PlanetType_Placeholder { // Placeholder if not imported
    EarthLike = "EarthLike", Desert = "Desert", Jungle = "Jungle", IceWorld = "IceWorld", Volcanic = "Volcanic", Barren = "Barren", GasGiant = "GasGiant", Toxic = "Toxic", Gaia = "Gaia"
}

export interface PlanetaryLandingPanorama {
    panoramaId: string; // Unique ID for this panorama configuration
    planetType: PlanetType_Placeholder | string; // For what type of planet
    biomeSubType?: string; // např. "Forest_Temperate_Day", "Desert_Dunes_Night_WithTwoMoons"
    backgroundImage_Layered_AssetPaths: string[]; // Cesty k vrstvám pozadí pro paralaxu
    foregroundElements_AssetPaths?: string[]; // např. skály, stromy, mimozemské rostliny v popředí
    ambientSound_Loop: string;
    weatherEffect_Overlay_Animation?: AnimationParams; // např. déšť, sněžení, prachová bouře
    timeOfDay_Variants_Available: boolean; // Zda existují varianty pro den/noc/svítání/soumrak
}
