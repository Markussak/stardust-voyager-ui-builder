// src/types/destruction_planetary_interaction.ts

import { Vector2D, ColorPalette, AnimationParams } from './visuals_core'; // Adjust path if needed
import { FactionId } from './diplomacy'; // Assuming FactionId is in diplomacy.ts, adjust if it's elsewhere (e.g. visuals_core or ships-extended)
import { OrbitalParameters } from './celestial_visuals'; // Adjust path if needed
import { DamageType, DamageInstance } from './physics_core'; // Adjust path if needed
import { NuclearMissileVisuals, NuclearDetonationEffect_Space_Visuals, NuclearDetonationEffect_Surface_Visuals } from './ship_visuals'; // Adjust path

// --- From Prompt 37, Section 0: Základní Typy a Rozhraní (Nové nebo rozšířené typy) ---

export enum PlanetSurfaceCondition {
    Pristine = "Pristine",
    LightlyDamaged_Craters = "LightlyDamaged_Craters",
    HeavilyDamaged_Ruins = "HeavilyDamaged_Ruins",
    Irradiated_Wasteland = "Irradiated_Wasteland",
    Glassed_Surface = "Glassed_Surface"
}

export interface PlanetaryDefenseAsset {
    assetId: string; // např. "planetary_shield_generator_mk3"
    assetNameKey: string;
    defaultAssetName: string;
    type: 'PlanetaryShield' | 'OrbitalStation_Defense' | 'GroundBased_MissileSilo' | 'Orbital_Minefield' | 'DefenseSatellite_Swarm';
    strengthIndicator: number; // 0-100
    coverage?: 'Global' | 'Regional_Capital' | 'SpecificPoint';
    visualAsset_SystemMap?: string; // Visual representation on system map
    visualAsset_OrbitalView?: string; // Visual representation in orbital view
    operationalStatus: 'Active' | 'Damaged' | 'Destroyed' | 'Offline_NoPower';
    attackPlayer_IfHostile: boolean;
    weaponTypes_IfArmed?: string[]; // Array of WeaponTypeDefinition IDs or similar
}

// Assuming TerrestrialPlanetInstanceData would be a base type for planets, not explicitly defined in prior P35/36 type files.
// For now, InhabitedPlanetDetails_Extended will stand alone or conceptually extend a base planet data type.
export interface InhabitedPlanetDetails_Extended {
    planetId: string; // ID of the planet this data applies to
    controllingFaction_Id: FactionId;
    dominantRace_Id: string; // Odkaz na AlienRaceDefinition (Prompt 27)
    populationCount: number;
    populationDensity_VisualKey?: 'Sparse_Rural' | 'Medium_Towns' | 'High_UrbanCenters' | 'VeryHigh_Ecumenopolis';
    developmentLevel: 'Primitive_Tribal' | 'EarlyIndustrial' | 'SpaceFaring_Local' | 'Interstellar_Advanced' | 'HighlyAdvanced_Type1Civilization';
    visibleCityCount_FromOrbit_Range?: [number, number];
    cityStyle_Key?: string; // Odkaz na styl města (z Promptu 27)
    surfaceCondition: PlanetSurfaceCondition;
    planetaryDefenses?: PlanetaryDefenseAsset[];
    playerInteractionOptions: Array<'Hail_AttemptContact' | 'Scan_DetailedSurface' | 'Infiltrate_EspionageMission' | 'Attack_OrbitalBombardment' | 'Attack_GroundInvasion_Abstracted' | 'Deploy_Nuke' | string>;
    aiReaction_ToPlayerHostility_ProfileKey: string;
    // ... other existing data from a base planet type if applicable
}

// Placeholder for WeaponTypeDefinition (base for all weapons, from Prompt 22)
// This is needed for WeaponType_NuclearWarhead to extend.
export interface BaseWeaponTypeDefinition_Placeholder {
    weaponId: string;
    displayNameKey: string;
    defaultDisplayName: string;
    descriptionKey: string;
    defaultDescription: string;
    weaponCategory: string; // e.g., 'Laser', 'Kinetic', 'Missile'
    iconAsset: string;
    shipModule_SlotType: string; // e.g., 'Weapon_Small', 'Weapon_Medium'
    muzzleFlash_OnShipEffect?: AnimationParams; // Visual effect on ship when firing
    projectileVisuals?: any; // Define more specific type if possible, e.g., ProjectileVisualsBase
    impactEffectVisuals?: { // Visual effect on impact
        animation_Main: AnimationParams;
        soundEffectAsset: string;
    };
    stats: {
        damagePerShot_Or_PerSecond?: number;
        damageType?: DamageType | string; // Allow custom strings or use enum
        areaOfEffectRadiusPx?: number;
        projectileSpeed_UnitsPerSec?: number;
        range_MaxUnits?: number;
        ammoType_RequiredId?: string;
        ammoCost_PerShot?: number;
        cooldownTime_Seconds?: number;
        // other common weapon stats
    };
    firingSound_OneShot?: string;
    // ... other common weapon properties
}


// WeaponType_NuclearWarhead (extends a base weapon definition)
export interface WeaponType_NuclearWarhead extends BaseWeaponTypeDefinition_Placeholder {
    weaponCategory: 'Missile_Strategic_Nuclear'; // Override
    // projectileVisuals should match NuclearMissileVisuals from ship_visuals.ts
    projectileVisuals?: NuclearMissileVisuals; // More specific type
    stats: BaseWeaponTypeDefinition_Placeholder['stats'] & { // Extend base stats
        // Damage is primarily through detonation effects, not direct stats.damagePerShot
    };
    yield_KilotonEquivalent: number;
    deliverySystem: 'ShipLaunched_Torpedo' | 'GroundLaunched_ICBM';
    detonationEffect_Visual_Space: NuclearDetonationEffect_Space_Visuals; // From ship_visuals.ts
    detonationEffect_Visual_PlanetSurface: NuclearDetonationEffect_Surface_Visuals; // From ship_visuals.ts
    planetSurface_ResultingCondition: PlanetSurfaceCondition;
    soundEffect_Detonation_Space: string;
    soundEffect_Detonation_Atmosphere: string;
}


// --- From Prompt 37, Section 1: Vylepšená Destrukce, Dopady a Efekty ---
export interface EnhancedDestructionAndEffectsConfig {
    id: "EnhancedDestructionAndEffectsSystem"; // Literal type
    shipDestruction_Advanced: {
        multiStageExplosions_Enabled: boolean;
        explosionStages_Definition: Array<{
            stageName_cz: string;
            trigger_HullIntegrityPercent_Below: number;
            visualEffect_Key: string; // Key to a predefined visual effect (e.g., AnimationParams or more complex)
            soundEffect_Key: string;
            durationMs: number;
        }>;
        persistentDebrisField_AfterDestruction: {
            enabled: boolean;
            debrisLifetime_Seconds_Range: [number, number];
            debrisTypes_FromShipComponents: boolean;
            debris_CanBeScavenged_ForResources: boolean;
            visual_SpinningBurningChunks_AnimationKey: string; // Key to an AnimationParams
        };
        chainReaction_Explosions_Chance: number; // 0-1
    };
    stationDestruction_Advanced: {
        structuralCollapse_Animation_Enabled: boolean;
        moduleExplosions_Individual: boolean;
        visualEffect_Key_StationCollapse: string;
        soundEffect_Key_StationCollapse: string;
    };
    weaponImpact_OnSurfaces_Enhanced: {
        dynamicDecals_Enabled: boolean;
        decalTypes_ByDamageType: Record<string, { // Key is DamageType or weapon category
            assetPath_Prefix: string;
            variantCount: number;
            maxLifetimeSeconds: number;
        }>;
        materialSpecific_ImpactEffects_Enabled: boolean;
        shieldImpact_PixelArt_DetailLevel: "High_EnergyRipple_ParticleSparks" | "Medium_SimpleFlash" | string;
        armorPenetration_VisualCue_Enabled: boolean;
    };
    environmentalEffects_OnCombat: {
        nebula_ReducesSensorRange_And_Visibility_Factor: number;
        nebula_ElectricalDischarges_DamageChance_PerSecond: number;
        damageInstance_Key: string; // Key to a DamageInstance definition
        asteroidField_ProjectileObstruction_Chance: number;
        blackHole_GravitationalPull_OnProjectiles_VisualOnly: boolean;
    };
}

// --- From Prompt 37, Section 3: Detailnější Obydlené Planety a Jejich Obrana ---
export interface InhabitedPlanetGameplayConfig {
    id: "InhabitedPlanetGameplaySystem"; // Literal type
    planetData_Extended_StoreKey: string; // Path in state, e.g., "galaxyData.systems.{systemId}.planets.{planetId}.extendedInhabitedInfo"
    ui_PlanetInteractionPanel: {
        screenId: string; // e.g., "PlanetInteractionPanel_Inhabited"
        layoutElements_cz: string[];
        mapButton_TextKey_cz: string;
        defaultMapButton_Text_cz: string;
        mapDisplay_Style: {
            widthPx: number; heightPx: number;
            backgroundColor: string;
            gridOverlay_AssetPath?: string;
            populationDensity_HeatmapColors: [string, string, string]; // Low, Medium, High
            cityMarker_AssetPath_Template: string;
            ruinsMarker_AssetPath: string;
            defenseAsset_Marker_AssetPath_Template: string;
        };
    };
    planetaryDefense_AI_Behavior: {
        activationCondition_HostilePlayerInOrbit: boolean;
        responsePriority_cz: string[];
        escalationLogic_BasedOnPlayerThreatLevel: boolean;
        communication_WarningsToPlayer_BeforeAttack_cz: string[];
        nuclearRetaliation_Conditions_cz: string[];
    };
    planetaryBombardment_Effects: {
        conventionalWeapons_DamageToPopulation_Factor: number;
        conventionalWeapons_SurfaceConditionChange_Chance: number;
        nuclearWeapons_DamageToPopulation_Factor: number;
        nuclearWeapons_SurfaceConditionChange_To: PlanetSurfaceCondition;
        visualEffect_OnPlanetSprite_OrbitalView_Ruins_AssetPath_Template: string;
        visualEffect_OnPlanetSprite_OrbitalView_Irradiated_AssetPath: string;
        diplomaticPenalty_ForBombardment_Major: number;
        diplomaticPenalty_ForNukeUsage_Extreme: number;
    };
    infiltration_Espionage_Mechanics: {
        requires_StealthShip_Or_SpecialModule: boolean;
        missionTypes_Examples_cz: string[];
        successChance_Factors: string[];
    };
}

// --- From Prompt 37, Section 4: Vylepšená Interakce s Planetou – Orbitální Pohled ---
export interface EnhancedPlanetOrbitViewConfig {
    id: "EnhancedPlanetOrbitViewSystem"; // Literal type
    enterOrbit_Button_PlanetInteractionPanel_TextKey_cz: string;
    defaultEnterOrbit_Button_Text_cz: string;
    enterOrbit_Action_Requirements_cz: string;
    transitionToOrbitalView_Animation: {
        type: 'ZoomIn_With_PerspectiveShift' | string; // Allow custom types
        durationMs: number;
        soundEffect: string;
    };
    orbitalView_Camera: {
        distanceFromPlanetSurface_Factor: number;
        allowPlayer_FreeFlight_AroundPlanet_InOrbit: boolean;
        planetRotation_Visible_And_AffectsLighting: boolean;
        skybox_Starfield_With_Sun_And_Moons_Visible: boolean;
    };
    orbitalView_PlanetSurface_DetailLevel: "VeryHigh_ProceduralTerrain_PixelArt" | string;
    orbitalView_VisibleElements: {
        playerShip_Rendered_InDetail: boolean;
        orbitalStations_AroundPlanet_Rendered: boolean;
        satellites_Defense_And_Civilian_Rendered: boolean;
        otherShips_InOrbit_NPC_Traffic_Rendered: boolean;
        surfaceCities_As_Detailed_LightClusters_Or_TextureAreas: boolean;
        majorGeographicalFeatures_Visible_FromOrbit_cz: string[];
    };
    orbitalView_UI_Elements: {
        exitOrbit_Button_TextKey_cz: string;
        defaultExitOrbit_Button_Text_cz: string;
        exitOrbit_Action_ReturnsTo_SystemView: boolean;
        landOnSurface_Button_TextKey_cz: string;
        defaultLandOnSurface_Button_Text_cz: string;
        landOnSurface_Action_Triggers_SurfaceInteractionEvent: boolean;
        landOnSurface_Requires_LandingModule_Or_Shuttle: boolean;
        scanSurfacePoint_Button_TextKey_cz: string;
        defaultScanSurfacePoint_Button_Text_cz: string;
        scanSurfacePoint_Action_Reveals_Resources_Or_Anomalies: boolean;
    };
    sound_Ambient_OrbitalView_Loop: string;
}
