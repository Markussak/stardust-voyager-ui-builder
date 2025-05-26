// src/types/exploration_extended.ts

import { Vector2D, AnimationParams } from './visuals_core'; // Adjust path if needed
import { FactionId } from './diplomacy'; // Adjust path if needed
// Assuming PlanetType, ItemId, MinableResourceData are defined elsewhere (e.g., galaxy.ts, inventory.ts)
// For now, use placeholders if direct imports are problematic for the subtask.

export enum PlanetType_Placeholder { // Placeholder if not imported from galaxy.ts
    EarthLike = "EarthLike", Desert = "Desert", Jungle = "Jungle", IceWorld = "IceWorld", Volcanic = "Volcanic",
    Barren = "Barren", GasGiant = "GasGiant", Toxic = "Toxic", Gaia = "Gaia"
}
export type ItemId_Placeholder = string; // Placeholder for ItemId
export interface MinableResourceData_Placeholder { // Placeholder
    itemId: ItemId_Placeholder;
    name: string;
}


export interface PlanetaryBiomeDefinition {
    biomeId: string; // např. "earthlike_temperate_forest_day"
    biomeNameKey_cz: string;
    defaultBiomeName_cz: string;
    planetTypes: Array<PlanetType_Placeholder | string>; // Referencing placeholder or actual PlanetType
    descriptionKey_cz: string;
    defaultDescription_cz: string;
    visuals_Panorama_Key?: string; // Odkaz na PlanetaryLandingPanorama (Prompt 37/40)
    ambientSound_Loop: string;
    uniqueFlora_Fauna_Signatures?: Array<{
        signatureId: string; // např. "flora_glowing_moss"
        displayNameKey_cz: string;
        defaultDisplayName_cz: string;
        scan_ResearchPoints?: number;
        collectible_ItemId?: ItemId_Placeholder | string;
        spawnChance: number; // 0-1
        visualHint_InPanorama_cz?: string;
        iconAsset?: string;
    }>;
    environmentalHazards_Present?: string[]; // Odkazy na klíče nebezpečí
    resourceDeposits_Surface_Rare_Chance?: Array<{
        resourceId: ItemId_Placeholder | string; // MinableResourceData["itemId"]
        chance: number; // 0-1
    }>;
}

export interface SurfaceVehicle_Rover_Stats {
    vehicleId: string; // např. "rover_mk1_scout"
    vehicleNameKey_cz: string;
    defaultVehicleName_cz: string;
    spriteSheet_AssetPath: string;
    dimensionsPx: Vector2D;
    maxSpeed_mps: number; // Metrů za sekundu na povrchu
    armor_Points?: number;
    cargoCapacity_Units_Samples: number;
    equipmentSlots?: Array<{
        slotType: 'Drill' | 'Scanner_Surface' | 'ManipulatorArm' | 'StorageUpgrade' | string;
        currentModuleId?: ItemId_Placeholder | string;
    }>;
    powerSource_Duration_GameHours?: number;
    deploymentMethod_FromShip_cz: string;
    controlScheme_MiniGame: 'TopDown_DirectControl' | 'SideScroller_Platformer';
}

export interface SurfaceDrone_Scout_Stats {
    droneId: string; // např. "drone_scout_wasp"
    vehicleNameKey_cz: string; // Reusing from Rover for consistency, or can be droneNameKey_cz
    defaultVehicleName_cz: string;
    spriteSheet_AssetPath: string;
    dimensionsPx: Vector2D;
    maxSpeed_mps: number;
    armor_Points?: number;
    cargoCapacity_Units_Samples: number; // Drones might have smaller capacity
    equipmentSlots?: Array<{ // Drones might have different/fewer slots
        slotType: 'Scanner_Surface_Light' | 'Camera_HighRes' | 'SignalBooster' | string;
        currentModuleId?: ItemId_Placeholder | string;
    }>;
    powerSource_Duration_GameHours?: number;
    deploymentMethod_FromShip_cz: string;
    controlScheme_MiniGame: 'TopDown_DirectControl' | 'Follow_Path_AI';
    flightCeiling_m?: number;
    scanRange_m_Surface: number;
}

export interface AmbientNPCDialogueLine {
    dialogueId: string;
    characterArchetype_Tags: string[]; // např. ["Trader", "Guard", "Technician"]
    factionAffiliation_Tags?: FactionId[];
    locationContext_Tags: string[]; // např. ["SpaceStation_TradeHub", "PlanetSurface_City"]
    eventContext_Tags?: string[]; // např. ["War_Ongoing", "Festival"]
    dialogueText_cz: string;
    rarity_Weight?: number; // How often it appears
    soundEffect_VoiceType_Generic?: string;
    linkedDialogue_FollowUp_Chance?: Array<{ dialogueId: string; chance: number; }>;
}

export interface ProceduralNameGeneratorConfig {
    nameType: 'Planet' | 'StarSystem' | 'Star' | 'Moon' | 'AsteroidBelt' | 'NPC_Character' | 'Ship_Player' | 'Ship_NPC' | 'Station_Orbital' | 'Station_Planetary' | 'GeographicFeature_Mountain' | 'GeographicFeature_River' | 'Flora_Alien' | 'Fauna_Alien' | string;
    culture_Or_Race_Affinity?: string; // např. "KrallEmpire_Names"
    syllableSets_Path?: string; // "assets/data/names/syllables_{culture_or_race}.json"
    namePattern_Templates: string[]; // např. ["{prefix}{middle}{suffix}"]
    lengthConstraints_Chars?: [number, number];
    allowDuplicates_InGalaxy: boolean;
    postProcessing_Rules_cz?: string[];
}
