// src/types/physics_core.ts

import { Vector2D, AnimationParams } from './visuals_core'; // Adjust path if needed
import { OrbitalParameters, CelestialBodyPhysicsProperties } from './celestial_visuals'; // Adjust path if needed

// --- From Prompt 36 ---

// Section 0: Referenced/Basic types (placeholder if not fully defined elsewhere)
// DamageInstance is mentioned as pre-existing. Let's define a basic version.
export enum DamageType { // Example damage types, expand as needed
    Kinetic = "Kinetic",
    Energy = "Energy",
    Explosive = "Explosive",
    Thermal = "Thermal",
    EMP = "EMP",
    Radiation = "Radiation",
    StructuralStress = "StructuralStress", // For tidal forces etc.
    Bio = "Bio", // From P37
    Nano = "Nano", // From P37
    Psionic = "Psionic" // From P37
}

export interface DamageInstance {
    type: DamageType;
    amount: number;
    sourceId?: string; // ID of the entity that caused the damage
    penetrationValue?: number; // For armor calculations
    areaOfEffectRadius?: number;
    // Add other relevant properties like critical hit chance, status effects applied, etc.
}

// Placeholder for ShaderEffectParams if not defined elsewhere
export interface ShaderEffectParams {
    shaderAsset_Path: string; // Path to the fragment or vertex shader
    uniforms?: Record<string, any>; // Uniform variables to pass to the shader
    durationMs?: number;
    appliesTo: 'ObjectSprite' | 'FullScreen' | 'AreaEffect';
}


// Section 1: Obecné Principy Fyzikálního Modelu Hry
export interface EnhancedPhysicsConfig {
    id: string; // e.g., "EnhancedPhysicsSystem_Main"
    timeScale_Simulation: number; // Násobitel herního času oproti reálnému času pro orbitální pohyb
    gravitationalConstant_G_GameUnits: number; // Herní ekvivalent gravitační konstanty
    distanceScale_PixelsPerAU: number; // Kolik pixelů na obrazovce odpovídá jedné AU
    celestialBodySpacing_MinAU_BetweenOrbits: number;
    celestialBodyMovement_Model: "SimplifiedKeplerianOrbits_VisualOnly" | "Simplified_NBody_ForMajorInfluencers";
    shipPhysics_InteractionWithGravity: "ContinuousForceApplication";
    collisionModel_DetailLevel: "AxisAlignedBoundingBoxes_Fast" | "SeparatingAxisTheorem_PixelPerfectPolygons" | "CircleColliders_Simple";
    physicsUpdateFrequency_Hz: number;
}

// Section 2: Orbitální Mechanika Nebeských Těles
export interface CelestialOrbitalMechanics {
    orbitCalculationMethod: 'Precomputed_PathSampling' | 'Realtime_KeplerSolver_Simplified';
    pathSampling_PointsPerOrbit?: number; // For Precomputed_PathSampling
    pathInterpolation_Method?: 'Linear' | 'CatmullRom_Smooth'; // For Precomputed_PathSampling
    keplerSolver_AccuracySteps?: number; // For Realtime_KeplerSolver_Simplified

    visualRepresentation_OrbitPath: {
        enabled: boolean;
        lineColor_Default: string; // Hex color with alpha
        lineColor_SelectedBody?: string; // Hex color with alpha
        lineThicknessPx: number;
        lineStyle: 'Solid' | 'Dashed_Fine';
        showPeriapsisApoapsisMarkers?: boolean;
        markerAsset_Periapsis?: string; // Path to image asset
        markerAsset_Apoapsis?: string; // Path to image asset
    };
    orbitalPeriod_RealismFactor: number; // Násobitel pro zrychlení/zpomalení orbitálních period
    bodyRotation_MatchesOrbitalPeriod_TidalLocking: boolean;
    multiStarSystem_OrbitComplexity: 'Stable_Hierarchical' | 'Chaotic_Unpredictable_Rare';
}

// Section 3: Vylepšená Fyzika Lodí
export interface EnhancedShipPhysics {
    gravityInteraction: {
        affectedBy_CelestialBodyTypes: Array<'Star_Any' | 'Planet_GasGiant' | 'Planet_HighMassTerran' | 'BlackHole_EventHorizon' | 'NeutronStar_HighGravity' | string>; // Allow custom strings
        forceCalculation_Formula: 'Newtonian_InverseSquare' | 'Simplified_LinearFalloff';
        maxGravitationalAcceleration_Cap: number; // m/s^2 v herních jednotkách
        escapeVelocity_Calculation_RequiredEngineThrust: boolean;
        slingshotManeuver_PhysicsSupport: {
            enabled: boolean;
            velocityBoost_MaxFactor: number;
            requiredApproachAngle_Tolerance_deg: number;
        };
        stableOrbit_Mechanics?: {
            autoPilot_EnterOrbit_ActionId?: string;
            orbitAltitude_Range_Km_GameUnits: [number, number]; // Nad povrchem planety
            visualIndicator_OrbitPath_OnHUD?: string;
            fuelConsumption_ToMaintainOrbit_Factor: number;
        };
        soundEffect_EnteringStrongGravityWell?: string;
    };
    collisionPhysics_Detailed: {
        damageCalculation_Factors: string[]; // e.g., ["RelativeVelocity", "MassOfCollidingObjects", ...]
        shipToAsteroid_Collision: {
            playerShipDamage_Multiplier: number;
            asteroidDamage_Or_DestructionThreshold_BySize: Record<'Small' | 'Medium' | 'Large', number>;
            asteroidFragment_Generation_OnDestruction: boolean;
            soundEffect_Template: string; // e.g., "sfx/collisions/ship_vs_asteroid_{asteroidType}_{impactStrength}.wav"
        };
        shipToShip_Collision: {
            damageMultiplier_BasedOnShields: number;
            moduleDamage_Chance_OnHeavyCollision: number;
            knockback_ForceFactor: number;
            soundEffect_Template: string; // e.g., "sfx/collisions/ship_vs_ship_{sizeCategory}_{impactStrength}.wav"
        };
        shipToStationOrPlanet_Collision: {
            playerShipDamage_Result: 'SevereDamage' | 'InstantDestruction_IfHighSpeed';
            structureDamage_IfApplicable?: number;
            soundEffect_MassiveImpact: string;
        };
        debris_FromCollisions?: { // Marked optional as per original prompt structure in P36 (was under collisionPhysics_Detailed in P21)
            maxDebrisObjects_PerCollision: number;
            debrisLifetime_Seconds: number;
            debrisSprite_AssetPath_Prefix: string;
            debrisPhysics_AffectedByGravity: boolean;
        };
    };
    inertiaAndMass_Effects: {
        baseShipMass_Source: string; // e.g., 'ShipClassDefinition.baseStats.baseMass_Tonnes'
        cargoMass_ImpactFactor_OnAcceleration: number;
        moduleMass_ImpactFactor_OnManeuverability: number;
        visualCue_HeavyLoad?: 'SlowerEngineResponse_Animation' | 'MoreInertialDrift_Visual';
        soundCue_StrainingEngines_IfOverloaded?: string;
    };
    atmosphericDrag_Effects_LowOrbit?: {
        enabled: boolean;
        minAltitude_ForEffect_Km_GameUnits: number;
        dragCoefficient_Factor: number;
        heatBuildup_VisualEffect_OnShip?: AnimationParams; // Reference AnimationParams from visuals_core
        heatBuildup_DamagePerSecond?: number;
        soundEffect_AtmosphericEntry_FrictionLoop?: string;
    };
}

// Section 4: Interakce s Environmentálními Fyzikálními Jevy
export interface EnvironmentalPhysicsInteractions {
    nebula_Effects?: { // Optional as not all systems might have nebulas
        densityLevels: Array<{
            densityKey: 'Thin_Wisps' | 'Moderate_Cloud' | 'Dense_Soup';
            dragFactor_Movement: number;
            sensorScattering_Factor: number;
            visibilityReduction_Visual_Factor: number;
            electricalDischarge_Chance?: number;
            electricalDischarge_Damage?: DamageInstance; // Uses DamageInstance
            visualEffect_AssetPath_Overlay?: string;
        }>;
        soundEffect_InNebula_Loop_Template?: string;
    };
    radiationBelts_Effects?: { // Optional
        intensityLevels: Array<{
            levelKey: 'Low' | 'Medium' | 'High_Deadly';
            damagePerSecond_Radiation: number;
            systemMalfunction_Chance_PerSecond: number;
        }>;
        visualEffect_Particles_AssetPath?: string;
        visualEffect_HUD_Interference?: AnimationParams; // Uses AnimationParams
        soundEffect_Radiation_Loop?: string;
        requiredShielding_ModuleId_ToMitigate?: string;
    };
    gravitationalAnomalies_Effects?: { // Optional
        anomalyType: 'Localized_GravitySpike_Push' | 'Localized_GravitySpike_Pull' | 'Trajectory_DistortionField' | 'Micro_Wormhole_UnstableJump';
        visualEffect_Shader_Or_Particle: ShaderEffectParams | AnimationParams; // Uses ShaderEffectParams or AnimationParams
        strength_Or_Radius_Range: [number, number];
        duration_Seconds_Range?: [number, number];
        effectOnShip_Description_cz: string;
        soundEffect_Anomaly_Active?: string;
    };
    blackHole_TidalForces_NearEventHorizon?: { // Optional
        damageType: DamageType.StructuralStress | string; // Allow custom string or use enum
        damageIncreaseFactor_WithProximity: number;
        visualEffect_ShipStretching_SubtleShader?: ShaderEffectParams; // Uses ShaderEffectParams
        soundEffect_HullGroaning_Intense?: string;
    };
}

// Section 5: Úvahy pro AI NPC Lodí - This is more of a behavioral spec for AI, not just types.
// We can define a config that AI systems would use.
export interface NPC_AI_PhysicsConsiderations_Config {
    pathfinding_InGravityFields: boolean;
    combatManeuvering_WithInertia: boolean;
    hazardAvoidance_Priority: 'High' | 'Medium' | 'Low_IfAggressive';
    slingshotManeuver_AttemptChance_IfSkilledAI: number; // 0-1
    atmosphericFlight_Behavior_IfApplicable: string; // "Avoid_DenseAtmosphere_NoProtection", "Use_For_Aerobraking_Advanced"
    reactionTo_GravitationalAnomalies: 'AttemptEvasion' | 'BraceForImpact_IfUnavoidable';
}
