import { Vector2D, PlanetType, StarType, StarSystem as BaseStarSystem } from './galaxy'; // Assuming path to existing types
import { FactionId } from './diplomacy'; // Assuming path, or use the one from ships-extended
// If AnimationParams, ColorPalette are not globally available or imported in galaxy.ts, they might need to be imported here too.
// For now, assume they are accessible if SceneObjectInstance needs them directly or indirectly.

// Basic GameTime definition
export type GameTime = number; // Represents elapsed game time, e.g., in seconds or turns

// Orbital Parameters for celestial bodies
export interface OrbitalParameters {
    semiMajorAxis: number; // kilometers or astronomical units
    eccentricity: number; // 0 for circular, <1 for elliptical
    inclination: number; // degrees
    longitudeOfAscendingNode: number; // degrees
    argumentOfPeriapsis: number; // degrees
    meanAnomalyAtEpoch?: number; // degrees, at a specific reference time
    period?: number; // time units, e.g., game days or seconds
    // Add more parameters if needed, e.g., for specific orbital calculations
}

// Extended data for Celestial Bodies
export interface CelestialBodyData_Extended {
    id: string;
    name: string;
    type: PlanetType | StarType; // From './galaxy'
    radius: number; // kilometers
    mass: number; // kilograms or solar masses
    orbitalParameters?: OrbitalParameters; // Optional for central stars, required for orbiting bodies
    orbitingBodyIds?: string[]; // IDs of moons or other satellites
    atmosphereType?: string; // e.g., "Breathable", "Toxic", "None"
    temperature?: number; // Kelvin or Celsius
    resources?: Array<{ resourceId: string; abundance: number; accessibility: number; }>; // From inventory/resource types
    controllingFactionId?: FactionId;
    isScanned_Full: boolean; // Has the player fully scanned this body?
    // Visual properties for rendering if not covered by SceneObjectInstance directly
    textureAsset_Main?: string;
    textureAsset_DetailMap?: string;
    // ... any other specific data from Prompt 42 or other relevant prompts
}

// Full data for a Star System, likely used when player is "in" the system
export interface StarSystemData_Full extends BaseStarSystem {
    // Inherits id, name, position, starType, explored, controllingFaction, planets (count), anomalyPresent, resources, specialStatus from BaseStarSystem
    description?: string;
    celestialBodies: CelestialBodyData_Extended[]; // Detailed list of all stars, planets, moons in the system
    asteroidBelts?: Array<{
        id: string;
        name: string;
        orbitalParameters: OrbitalParameters;
        resourceTypes: string[]; // List of resource IDs
        density: number;
    }>;
    stations?: Array<{ // Simplified station data for now, could be SceneObjectInstance later
        id: string;
        name: string;
        factionId: FactionId;
        orbitalParameters?: OrbitalParameters; // if orbiting
        position_Static?: Vector2D; // if static relative to a point
        services: string[]; // e.g., "Trade", "Repair", "Refuel"
    }>;
    // Other system-specific details like jump points, anomalies, etc.
    hyperlaneAccessPoints?: Array<{ hyperlaneId: string; position: Vector2D; targetSystemId: string; }>;
    navigationalHazards?: Array<{ type: string; area: Vector2D[]; intensity: number; }>;
}

// General object instance in the game scene
export interface SceneObjectInstance {
    instanceId: string; // Unique ID of this instance in the scene
    definitionId: string; // ID of the base definition (e.g., ShipClassId, CelestialBodyId, ItemId)
    objectType: 'Ship_Player' | 'Ship_NPC' | 'CelestialBody_Star' | 'CelestialBody_Planet' | 'CelestialBody_Moon' | 'CelestialBody_Asteroid' | 'Projectile' | 'Debris' | 'Station' | 'WarpSignature' | 'Anomaly_Visual';
    currentPosition_World: Vector2D; // Global coordinates in the galaxy or relative in the system
    currentRotation_Deg: number;
    currentVelocity_World?: Vector2D; // For dynamic objects
    pixiSprite_Or_Container_Reference?: any; // Reference to a PixiJS object or similar rendering library object
    isActive_InRenderBubble: boolean; // Whether it's currently active and rendered
    lastUpdateTime_Game: GameTime;

    // Ship specific data (if objectType is Ship_*)
    currentHealth?: number;
    maxHealth?: number;
    currentShield?: number;
    maxShield?: number;
    factionId?: FactionId;
    // Add other ship-specific or type-specific dynamic data as needed
}

// Configuration for the "render bubble" around the player
export interface RenderBubbleConfig {
    shape: 'Circular_AroundPlayer';
    radius_NormalFlight_Units: number;
    radius_WarpFlight_Units: number;
    objectActivation_Threshold_Factor: number;
    objectDeactivation_Threshold_Factor: number;
    updateFrequency_ObjectStatus_ms: number;
}

// Data for transitioning between systems
export interface SystemTransitionData {
    targetSystemId: string;
    entryPoint_InTargetSystem_Coordinates?: Vector2D;
    transitionType: 'HyperlaneJump_Map' | 'InSystemWarp_To_SystemEdge_And_Jump';
}

// Placeholder for WarpDriveModule_Stats (structure unknown without JSON)
export interface WarpDriveModule_Stats {
    moduleId: string;
    moduleNameKey: string;
    defaultModuleName: string;
    baseChargeTime_Seconds?: number;
    warpSpeedFactor_Multiplier?: number;
    fuelCapacity_Units?: number;
    fuelConsumptionRate_PerSecond?: number;
    // ... other stats from assets/data/modules/ship_warp_drives_cz.json
}

// Placeholder for PopUpEventNotification_Style (structure unknown from Prompt 40)
export interface PopUpEventNotification_Style {
    styleId: string;
    fontKey?: string;
    backgroundColor?: string;
    borderColor?: string;
    // ... other style properties
}

// Placeholder for HUDLayoutConfig (structure unknown from Prompt 40)
export interface HUDLayoutConfig {
    configId: string;
    version: string;
    // Define structure based on actual HUD elements and their configurations
    // e.g., showSpeedometer: boolean, minimapPosition: 'TopRight' | 'BottomRight', etc.
    elements: Array<{
        elementId: string; // e.g., "SpeedIndicator", "ShieldBar", "WarpButton"
        position: Vector2D; // Relative to screen or a panel
        styleKey?: string;
        // other config for this element
    }>;
}

// Section 1: Konfigurace Hlavní Herní Scény (InSystemSceneConfig)
export interface InSystemSceneConfig {
    id: "InSystemScene_MainGameplay"; // Literal type
    sceneName_cz: string;
    background_Reference: string; // e.g., "REF_InSystemViewBackground_From_Prompt9_Enhanced"
    camera_Reference: string; // e.g., "REF_CameraConfig_From_Prompt9"
    hud_Layout_Reference: string; // e.g., "REF_HUDLayoutConfig_From_Prompt40" -> HUDLayoutConfig
    playerSpawn_Logic: {
        initialSpawn_OnNewGame_SystemId_Key: string;
        initialSpawn_Position_InSystem_cz: string;
        onLoadGame_SpawnAt_LastSavedPosition: boolean;
        onEnterSystem_ViaHyperlane_SpawnAt_HyperlaneExitNode: boolean;
        onEnterSystem_ViaInSystemWarp_SpawnAt_SystemEdge_FromArrivalVector: boolean;
    };
    worldCoordinateSystem_Type: "LargeScale_FloatingOrigin_Or_GridCells";
    renderCulling_And_AreaManagement_Config: string; // Refers to RenderCullingAndAreaManagementConfig.id
    persistence_Of_Changes_Config: string; // Refers to PersistenceOfChangesConfig.id
    inSystemWarpDrive_Mechanics_Config: string; // Refers to InSystemWarpDriveMechanicsConfig.id
    interactionSystem_Config: string; // Refers to InteractionSystemConfig_InScene.id
    eventNotification_PopUp_Config_Reference: string; // Refers to a PopUpEventNotification_Style config or similar
    timeSystem_Integration_Reference: string; // Refers to GameTime system integration logic/config
    sound_AmbientSystem_Loop_AssetPath: string;
}

// Section 2: Render Culling a Správa Oblastí (RenderCullingAndAreaManagementConfig)
export interface RenderCullingAndAreaManagementConfig {
    id: "RenderCullingAndAreaManagementSystem"; // Literal type
    renderBubble_Config: RenderBubbleConfig; // Defined in previous step
    galaxyGrid_For_Streaming_Enabled: boolean;
    galaxyCell_Size_Units: number;
    galaxyCell_LoadUnload_Logic_cz: {
        activeCells_AroundPlayer_Count: "3x3_Grid_Centered_On_PlayerCell";
        cellLoading_Process_cz: string;
        cellUnloading_Process_cz: string;
    };
    celestialBody_LOD_System_BeyondBubble_cz: {
        stars_AlwaysVisible_As_BrightPoints_WithParallax: boolean;
        planets_Moons_VisibleAs_SimplifiedIcons_Or_ColoredDots_IfScanned: boolean;
        stations_VisibleAs_FactionColoredIcons_IfKnown: boolean;
    };
    npcShip_Behavior_Offscreen_SimplifiedSimulation: {
        enabled: boolean;
        simulationLevel: "Abstract_PositionUpdate_BasedOnTask";
        reEnterBubble_With_PlausibleState: boolean;
    };
}

// Section 3: Perzistence Světových Změn (PersistenceOfChangesConfig)
export interface PersistentChange_DestroyedAsteroid {
    dataType: "DestroyedAsteroid";
    asteroidId: string;
    destructionTime: GameTime;
    remainingFragments?: Array<{ resourceId: string; quantity: number }>;
}
export interface PersistentChange_MinedResourceNode {
    dataType: "MinedOutResourceNode";
    resourceNodeId: string;
    depletionLevel: number; // 0-1
}
export interface PersistentChange_PlayerPlanetaryBase {
    dataType: "PlayerBuilt_PlanetaryBase";
    baseId: string;
    planetId: string;
    modules: Array<{ moduleId: string; level: number; }>;
    productionState?: any; // Define more clearly if possible
    maintenanceState?: any; // Define more clearly if possible
}
export interface PersistentChange_PlayerOrbitalStructure {
    dataType: "PlayerBuilt_OrbitalStructure";
    structureId: string;
    orbitalParameters: OrbitalParameters; // Defined in previous step
    structureType: string;
    status: string;
}
export interface PersistentChange_ShipWreck {
    dataType: "PersistentShipWreck_PlayerOrSignificantNPC";
    wreckId: string;
    shipClassId: string;
    position: Vector2D;
    cargoContent?: Array<{ itemId: string; quantity: number }>;
    decayTime: GameTime; // Time until it disappears
}
export interface PersistentChange_CompletedSystemEvent {
    dataType: "CompletedSystemSpecific_EventsOrQuests";
    eventId: string;
    playerChoices?: any; // Record of player choices
    outcome: string;
}
export interface PersistentChange_PlanetarySurfaceChange {
    dataType: "PlanetarySurface_MajorChanges_FromPlayerAction";
    planetId: string;
    changeType: string; // e.g., "NuclearCrater"
    coordinates: Vector2D; // On planet surface
    size: number;
}
export interface PersistentChange_PointOfInterestStatus {
    dataType: "Discovered_PointsOfInterest_Status";
    poiId: string;
    status: "Explored" | "Looted" | "Scanned";
}

export type AnyPersistentChangeData =
    | PersistentChange_DestroyedAsteroid
    | PersistentChange_MinedResourceNode
    | PersistentChange_PlayerPlanetaryBase
    | PersistentChange_PlayerOrbitalStructure
    | PersistentChange_ShipWreck
    | PersistentChange_CompletedSystemEvent
    | PersistentChange_PlanetarySurfaceChange
    | PersistentChange_PointOfInterestStatus;

export interface PersistenceOfChangesConfig {
    id: "WorldChangePersistenceSystem"; // Literal type
    persistenceScope_Per_GalaxyCell_Or_StarSystem: "Per_StarSystem";
    dataToPersist_Detailed_cz: Array<{ dataType: string; keys_cz: string[] }>; // This is descriptive, actual types are above
    maxPersistentWrecks_PerSystem: number;
    saveTrigger_Persistence: "OnPlayer_ExitingSystem_Or_ManualSave";
    loadTrigger_Persistence: "OnPlayer_EnteringSystem_ForFirstTime_Or_LoadingSave";
    dataStorage_Format_Persistence: "OptimizedJSON_Or_BinaryFragment_In_SaveFile";
    conflictResolution_IfSaveDataMismatch_WithProceduralGeneration: "Prioritize_SaveData";
}

// Section 4: Mechanika Warp Pohonu v Rámci Systému (InSystemWarpDriveMechanicsConfig)
// Placeholders for detailed visual effect structures. These would typically be more complex
// or refer to specific shader/asset configurations if not just paths.
export interface WarpVisualEffect_BlackHoleInspired_ChargeUp {
    referenceId: "REF_WarpChargeUp_VisualEffect_BlackHoleInspired";
    // Potentially add more specific fields here if needed by rendering system,
    // e.g. shaderName: string, particleEffectName: string etc.
    // For now, referenceId is enough as per prompt.
}
export interface WarpVisualEffect_BlackHoleInspired_Active {
    referenceId: "REF_WarpActive_VisualEffect_BlackHoleInspired";
}

export interface InSystemWarpDriveMechanicsConfig {
    id: "InSystemWarpDriveSystem_V2"; // Literal type
    warpDriveModule_DefinitionPath: string; // Path to JSON like "assets/data/modules/ship_warp_drives_cz.json"
                                            // The actual stats are in WarpDriveModule_Stats (defined previously)
    activation_Button_HUD_Id: string;
    activation_Button_Icon_AssetPath_ByState: {
        Ready: string;
        Charging: string; // Animated
        Active: string;
        Cooldown_Or_NoFuel: string;
    };
    chargeUp_Sequence_Detailed: {
        baseDuration_Seconds: number;
        playerCanMove_DuringChargeUp: boolean;
        playerCanBeAttacked_DuringChargeUp: boolean;
        interruption_OnHullDamage_ThresholdPercent: number;
        interruption_OnEMP_Effect: boolean;
        playerCanCancel_ChargeUp_Manually: boolean;
        visualEffect_BlackHoleFormation_AroundShip: WarpVisualEffect_BlackHoleInspired_ChargeUp; // Reference defined above
        soundEffect_ChargeUp_Progressive_Loop: string;
        soundEffect_ChargeComplete_Ready: string;
        ui_ProgressBar_OnHUD_ChargeUp: { styleKey: string; labelText_cz: string; }; // e.g. "Nabíjení Warpu: {percent}%"
    };
    warpFlight_Engaged_Parameters: {
        speedFactor_RelativeToNormalMaxSpeed: number;
        accelerationToWarpSpeed_Profile: "Exponential_Fast";
        decelerationFromWarpSpeed_Profile: "Exponential_Controlled";
        playerMaintains_FullDirectionalControl_DuringWarp: boolean;
        collisionDetection_DuringWarp_With_Stars_And_BlackHoles_Only: boolean;
        autoDisengage_OnCollision_Or_NearHazard: boolean;
        manualDisengage_Instantaneous: boolean;
        visualEffect_ActiveWarp_AroundShip: WarpVisualEffect_BlackHoleInspired_Active; // Reference defined above
        visualEffect_Environment_DuringWarp: {
            starStreaking_ExtremeLength_And_ColorShift_BlueRed: boolean;
            spaceDistortion_FishEyeLens_Or_TunnelEffect_Subtle: boolean;
            nebulaColors_Become_StreakedAndIntense: boolean;
        };
        soundEffect_WarpFlight_DeepThrum_DistortedSpace_Loop: string;
        soundEffect_WarpDisengage_PowerDown: string;
    };
    warpEnergySystem: {
        fuelType_Enum_Or_ItemId: "ExoticWarpFuel_XylosCrystal" | "StandardShipEnergy_VeryHighDrain"; // Consider making this a string[] or use an enum if more types
        ui_WarpEnergyBar_OnHUD: { styleKey: string; labelText_cz: string; }; // e.g. "Warp Energie: {value}/{max}"
        baseFuelCapacity_WarpUnits_StartGame: number;
        fuelConsumption_PerDistanceUnit_InWarp_Or_PerSecond: number;
        rechargeMethods_cz: Array<{
            method: "Slow_SelfRecharge_OverTime" | "Consume_ExoticFuel_Item" | "StationService_Recharge";
            rate_UnitsPerMinute?: number;
            requires_SolarPanels_Or_ReactorOnline?: boolean;
            itemId_Fuel?: string;
            unitsRecharged_PerItem?: number;
            serviceName_cz?: string;
            cost_CreditsPerUnit?: number;
            description_cz: string;
        }>;
        lowEnergyWarning_ThresholdPercent: number;
        lowEnergyWarning_Sound_Asset: string;
        warpJump_Impossible_If_InsufficientFuel_For_EstimatedDistance: boolean;
    };
    systemExitAndEntry_WithWarp: {
        cannotLeaveSystem_WithNormalEngines_Rule: boolean;
        attemptToLeave_NormalEngines_PopUp_Config: { // This could be a specific PopUpEventNotification_Style or a unique structure
            messageTitleKey_cz: string; defaultMessageTitle_cz: string;
            messageTextKey_cz: string; defaultMessageText_cz: string;
            button_ActivateWarp_TextKey_cz: string; defaultButton_ActivateWarp_Text_cz: string;
            button_ActivateWarp_Action: "INITIATE_WARP_CHARGE_UP";
            button_Cancel_TextKey_cz: string; defaultButton_Cancel_Text_cz: string;
            button_Cancel_Action: "CLOSE_POPUP";
            popupStyle_Key: string; // e.g. "StandardInfoDialog_WithTwoButtons_SystemEdge"
        };
        interstellarSpace_Navigation_To_OtherSystems_DuringWarp: {
            targetSystem_Selection_Method_cz: string;
            targetSystem_Beacon_Visual_Distant_AssetPath: string;
            autoDisengageWarp_On_TargetSystem_Proximity: boolean;
            distanceToTarget_Display_OnHUD_DuringWarp: boolean;
        };
    };
    warpDrive_Upgrades_ViaResearchAndModules: boolean;
}

// Section 6: Systém Interakcí ve Scéně (InteractionSystemConfig_InScene)
export interface InteractionMappingItem {
    objectType: SceneObjectInstance['objectType'] | string; // Allow more specific object types if needed e.g. "CelestialBody_Planet_Populated"
    interactionType: string; // e.g., "Hail_AttemptContact", "Start_MiningBeam"
    actionTrigger_SystemEvent: string; // e.g., "DIPLOMACY_INITIATE_HAIL"
    requiredPlayerState_cz?: string;
    requiredPlayerModule?: string; // e.g., "MiningLaser_Equipped"
    requiredPlayerRange?: boolean;
}

export interface InteractionSystemConfig_InScene {
    id: "InSceneInteractionManager"; // Literal type
    playerInteraction_Range_Units: number;
    contextualInteraction_Prompt_UI: {
        displayCondition_cz: string;
        text_Template_cz: string; // e.g., "[{Klávesa_Interakce}] {PopisAkce_cz}"
        fontStyleKey: string;
        icon_ForActionType_AssetPath_Prefix?: string;
    };
    interactionMapping: InteractionMappingItem[];
    popUpEvent_Trigger_InScene_Integration: boolean; // For Prompt 32/40 events
}

