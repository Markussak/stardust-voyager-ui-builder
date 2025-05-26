// src/types/celestial_visuals.ts

import { Vector2D, ColorPalette, AnimationParams } from './visuals_core'; // Assuming visuals_core.ts is in the same directory or adjust path

// --- From Prompt 36: Core Physics/Orbital Types ---
export interface OrbitalParameters {
    semiMajorAxis_AU: number; // Velká poloosa v Astronomických Jednotkách
    eccentricity: number;     // Excentricita dráhy (0 = kruhová, <1 = eliptická)
    inclination_deg?: number;  // Sklon dráhy vůči referenční rovině systému
    longitudeOfAscendingNode_deg?: number; // Délka vzestupného uzlu
    argumentOfPeriapsis_deg?: number;   // Argument šířky periapsis
    meanAnomaly_AtEpoch_deg?: number;   // Střední anomálie v dané epoše
    orbitalPeriod_GameDays?: number; // Orbitální perioda ve herních dnech (může být vypočítána)
    direction: 'Clockwise' | 'CounterClockwise'; // Směr oběhu
    parentBodyId?: string | null; // ID tělesa, kolem kterého obíhá (null for central star or if not orbiting)
}

export interface CelestialBodyPhysicsProperties {
    mass_kg: number; // Hmotnost v kg
    gravitationalParameter_GM?: number; // GM = G * mass (může být uloženo přímo)
    radiusOfGravitationalInfluence_AU?: number; // Efektivní dosah gravitačního vlivu
}

// --- From Prompt 35, Section II: Celestial Body Visual Details ---

// II.A Detailní Reliéf Terénu
export interface TerrainReliefFeatureDefinition {
    featureTypeKey: string; // např. "MountainRange_JaggedPeaks_Alpine", "Canyon_Grand_LayeredSandstone"
    featureName_cz_Template?: string;
    description_cz: string;
    sizeScaleRange: Array<'Small_Localized_Hills_UpTo50pxHigh' | 'Medium_Regional_Mountains_UpTo200pxHigh' | 'Large_Continental_Chains_Over200pxHigh'>;
    heightVariationFactor: number; // 0.1 (nízké kopce) - 1.0 (velmi vysoké hory)
    associatedRockTextures_Keys: string[]; // Odkazy na pixel art textury skal
    snowCoverage_Conditions?: {
        minAltitudeFactor?: number;
        planetTemperatureClass?: string[]; // např. ["Arctic", "Alpine", "Temperate_HighAltitude"]
        snowTexture_Asset: string;
    };
    shadowingDetailLevel: 'High_PixelPerfect_PerSlope' | 'Medium_Dithered_GeneralShape';
    erosionFeatures_Visuals_cz: string[];
    specificDetails_PixelArt_Instructions_cz: string[];
    realWorldInspiration_Keywords?: string[];
}

// II.B Hydrosféra
export interface WaterBodyFeature {
    waterType: 'River_Meandering' | 'River_Braided' | 'River_CanyonBound' | 'Lake_Freshwater_Clear' | 'Lake_Salt_Shallow' | 'Ocean_Coastal' | 'Ocean_Deep';
    waterColor_cz_Template: string;
    surfaceEffect_Animation: AnimationParams; // Animace vln, odlesků
    shorelineDetail_cz: string;
    underwaterFeatures_Visible_cz?: string;
}

export interface IceFeature {
    iceType: 'Glacier_Mountain' | 'IceSheet_Polar' | 'SeaIce_Pack' | 'FrozenLake_Smooth' | 'Permafrost_Tundra';
    texture_Asset_Key: string; // Odkaz na texturu ledu/sněhu
    crackPattern_Density: 'None' | 'Low_Sparse' | 'Medium_Networked' | 'High_Chaotic';
    colorVariation_BlueTint_InDepth: boolean;
    surfaceDetails_cz?: string[];
}

// II.C Vulkanismus
export interface VolcanicFeature {
    volcanoType: 'ShieldVolcano_Broad_Effusive' | 'Stratovolcano_Steep_Explosive' | 'Caldera_Collapsed_Massive' | 'FissureVent_LinearEruption';
    activityLevel: 'Dormant_Smoking' | 'Intermittent_Eruptions' | 'Constantly_Active_LavaFlows';
    lavaFlow_Properties?: {
        texture_Pahoehoe_Asset: string;
        texture_Aa_Asset: string;
        color_Hot_Range: [string, string];
        color_Cooling_Range: [string, string];
        animation_Flow: AnimationParams;
        glowEffect_Intensity: number;
    };
    ashPlume_Properties?: {
        texture_AshCloud_Asset: string;
        color_Range: [string, string];
        animation_RisingSwirling: AnimationParams;
        lightning_InPlume_Animation?: AnimationParams;
    };
    geothermalFeatures_Around?: Array<'Geyser_Steam_Animated' | 'Fumarole_SulfurGas_Yellow' | 'MudPool_Bubbling'>;
    soundEffect_Eruption_Type_Key: string;
}

// II.D Impaktní Útvary
export interface ImpactCraterFeature {
    craterType: 'Simple_BowlShaped_Small' | 'Complex_CentralPeak_TerracedWalls_Medium' | 'MultiRing_Basin_VeryLarge' | 'Rayed_Young_HighContrast';
    size_DiameterPx_Range: [number, number]; // Size on the generated planet texture/map
    depthFactor: number;
    wallSteepnessFactor: number;
    floorTexture_Key: string;
    ejectaBlanket_Texture_Asset?: string;
    ejectaRay_Properties_IfRayed?: {
        rayCountRange: [number, number];
        rayLengthFactor: number; // Násobek průměru kráteru
        rayWidthPx: number;
        rayColor_Contrast: number;
    };
    ageIndication: 'Young_SharpFeatures' | 'Old_ErodedFeatures' | 'Ghost_BarelyVisible';
}

// II.E Umělé Struktury Viditelné z Orbity
export interface OrbitalCityViewFeature {
    citySize: 'Small_Outpost_FewLights' | 'Medium_Town_ClusteredLights' | 'Large_Metropolis_SprawlingLights' | 'Ecumenopolis_PlanetSpanningCity';
    lightPattern_Night: 'Grid_Modern' | 'Concentric_Ancient' | 'Organic_Irregular_Alien' | 'Chaotic_Slum';
    lightColorPalette_Night: ColorPalette;
    lightAnimation_Night?: AnimationParams;
    daytimeStructures_Hint_AssetPath_Prefix?: string;
    daytimeStructures_Density: 'Low_Scattered' | 'Medium_Districts' | 'High_DenseUrban';
    factionSpecificStyle_Key?: string;
}

// II.F Atmosférické Detaily
export interface AtmosphericPhenomenon {
    phenomenonType: 'CloudLayer_Cirrus_High' | 'CloudLayer_Cumulus_Mid' | 'CloudLayer_Stratus_Low' | 'StormSystem_Cyclone_Rotating' | 'StormSystem_DustStorm_PlanetaryScale' | 'StormSystem_Electrical_Widespread' | 'Aurora_Polar_Dynamic';
    coveragePercent_PlanetSurface: number; // 0-1
    altitudeLayer_Relative: 'Low' | 'Mid' | 'High';
    animation_Movement: AnimationParams;
    animation_Internal?: AnimationParams;
    colorPalette: ColorPalette;
    texture_Asset_Or_ProceduralKey: string;
    shadowCasting_OnSurface_Intensity?: number; // 0-1
    soundEffect_Ambient_Loop?: string;
}

// Main configuration object for a specific celestial body's visual profile
// This would be referenced by a planet/moon's data.
export interface CelestialBodyVisualsConfig {
    configId: string; // e.g., "PlanetType_EarthLike_Temperate_Visuals"
    baseSurfaceTexture_Asset?: string; // A base diffuse texture for the planet
    terrainFeatures?: TerrainReliefFeatureDefinition[];
    waterFeatures?: WaterBodyFeature[];
    iceFeatures?: IceFeature[];
    volcanicFeatures?: VolcanicFeature[];
    impactCraters?: ImpactCraterFeature[];
    orbitalCityFeatures?: OrbitalCityViewFeature[]; // For populated planets
    atmosphericPhenomena?: AtmosphericPhenomenon[];
    // This config would guide the procedural generation or selection of textures/effects
    // for rendering the planet in detail.
}

// --- From Prompt 35, Section III: Vizuální Vylepšení Hvězd ---

export interface StarSurfaceDynamics_Enhanced {
    granulation_DetailLevel: 'High_IndividualCellLifecycle' | 'Medium_AnimatedTexture' | 'Low_StaticTexture'; // Added more levels for flexibility
    sunspot_Detail?: { // Optional if not all stars show prominent spots
        umbraTexture_Key: string; // např. "sunspot_umbra_dark_textured"
        penumbraTexture_Key: string; // např. "sunspot_penumbra_fibrous_radial"
        magneticLoop_Animation?: AnimationParams; // Animované magnetické smyčky
        magneticLoop_Color: string; // Hex color or from ColorPalette
    };
    faculae_Detail?: { // Optional
        texture_Key: string; // např. "faculae_bright_networked_textured"
        limbBrightening_Factor: number; // Jak moc jsou výraznější na okraji (0-1)
        pulsationAnimation?: AnimationParams;
    };
}

export interface StarEruptionDynamics_Enhanced { // For prominences, flares, etc.
    eruptionType: 'SolarFlare_FastBright' | 'Prominence_Looping' | 'CoronalMassEjection_LargeScale';
    plasmaTexture_Key: string; // např. "plasma_filament_turbulent_animated" (spritesheet)
    colorGradient_Detail: {
        base_Hottest: string; // Hex color
        mid_Cooling: string;  // Hex color
        edge_Coolest: string; // Hex color
    };
    animation_Eruption: AnimationParams; // Main animation for the eruption event
    interactionWithCorona_Visuals_cz?: string; // "Viditelné rázové vlny a odtlačování koronální hmoty"
    soundEffect_Key?: string; // e.g., "sfx_star_flare_medium", "sfx_star_prominence_loop"
}

export interface StarCoronaDynamics_Enhanced {
    structureTypes_ToGenerate: Array<'Streamers_Polar_Long' | 'Loops_ActiveRegion_Bright' | 'CoronalHoles_Dark_Irregular' | 'HelmetStreamers_Equatorial_Stable'>;
    structureTexture_Key_Template: string; // např. "corona_structure_{type}_anim" (spritesheet)
    animation_OverallFlowAndChange: AnimationParams; // Pomalá, neustálá změna
    cme_VisualDetail?: { // Coronal Mass Ejection specific visuals if not covered by StarEruptionDynamics_Enhanced
        shockwaveFront_Asset: string; // Jasné čelo rázové vlny
        ejectedCloud_TextureKey: string; // Textura vyvrženého oblaku plazmy
        internalFilaments_Visible: boolean;
        expansionAnimation: AnimationParams;
        soundEffect_Key?: string; // e.g., "sfx_star_cme_launch"
    };
}

// Main configuration object for a specific star's visual profile
export interface StarVisualsConfig {
    configId: string; // e.g., "StarType_G_YellowMainSequence_Visuals"
    baseSurface_AnimatedTexture_Key?: string; // Main animated texture for the star's photosphere
    surfaceDynamics?: StarSurfaceDynamics_Enhanced;
    eruptionTypesPossible?: StarEruptionDynamics_Enhanced[]; // Array of possible eruption types/configs this star can have
    corona?: StarCoronaDynamics_Enhanced;
    lightColor_Primary: string; // Primary color of light emitted (e.g., "#FFFFEE")
    lightColor_Secondary_AtmosphereScatter?: string; // Color for atmospheric scattering effects on nearby planets
    lensFlare_AssetPath?: string; // Path to a lens flare sprite/effect associated with this star type
}
