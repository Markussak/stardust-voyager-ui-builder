import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext'; // Or useGameContext

// Import core types from inSystemScene.ts
import {
    InSystemSceneConfig,
    SceneObjectInstance,
    StarSystemData_Full,
    Vector2D,
    GameTime,
    FactionId, // Added FactionId for player ship
    RenderBubbleConfig, // Added for render bubble logic
    // Import other necessary types from inSystemScene.ts or other type files as needed
    // For example, if specific config objects are typed:
    // RenderCullingAndAreaManagementConfig,
    // PersistenceOfChangesConfig,
    // InSystemWarpDriveMechanicsConfig,
    // InteractionSystemConfig_InScene
} from '../types/inSystemScene'; // Adjust path if it differs
import { StarType, PlanetType } from '../types/galaxy'; // Import enums for celestial body types

// Placeholder for the actual configuration data loaded from InSystemSceneConfig definition
// This would eventually be loaded from a JSON, or a more structured game data system.
const mainSceneConfigData: InSystemSceneConfig = {
    id: "InSystemScene_MainGameplay",
    sceneName_cz: "Pohled na Hvězdný Systém",
    background_Reference: "REF_InSystemViewBackground_From_Prompt9_Enhanced",
    camera_Reference: "REF_CameraConfig_From_Prompt9",
    hud_Layout_Reference: "REF_HUDLayoutConfig_From_Prompt40", // This implies GameHUD.tsx will be used
    playerSpawn_Logic: {
        initialSpawn_OnNewGame_SystemId_Key: "playerStartSystem.id",
        initialSpawn_Position_InSystem_cz: "Blízko hlavní hvězdy",
        onLoadGame_SpawnAt_LastSavedPosition: true,
        onEnterSystem_ViaHyperlane_SpawnAt_HyperlaneExitNode: true,
        onEnterSystem_ViaInSystemWarp_SpawnAt_SystemEdge_FromArrivalVector: true
    },
    worldCoordinateSystem_Type: "LargeScale_FloatingOrigin_Or_GridCells",
    renderCulling_And_AreaManagement_Config: "RenderCullingAndAreaManagementSystem", // ID ref
    persistence_Of_Changes_Config: "WorldChangePersistenceSystem", // ID ref
    inSystemWarpDrive_Mechanics_Config: "InSystemWarpDriveSystem_V2", // ID ref
    interactionSystem_Config: "InSceneInteractionManager", // ID ref
    eventNotification_PopUp_Config_Reference: "REF_EventPopUpNotificationConfig_From_Prompt40",
    timeSystem_Integration_Reference: "REF_GameTimeSystem_From_Prompt40",
    sound_AmbientSystem_Loop_AssetPath: "sfx/ambient/space_deep_hum_varying_loop.wav"
};

// Placeholder for other referenced configs if they were separate objects
// const renderCullingConfig: RenderCullingAndAreaManagementConfig = { ... };
// const persistenceConfig: PersistenceOfChangesConfig = { ... };
// etc.

// Define a sample RenderBubbleConfig (as per subtask instructions)
const bubbleConfigData: RenderBubbleConfig = {
    shape: 'Circular_AroundPlayer',
    radius_NormalFlight_Units: 20000, // Example value, world units
    radius_WarpFlight_Units: 100000, // Example value
    objectActivation_Threshold_Factor: 0.9,
    objectDeactivation_Threshold_Factor: 1.1,
    updateFrequency_ObjectStatus_ms: 500
};

// Cell streaming configuration constants
const GALAXY_CELL_SIZE_UNITS = 200000; // Example: World units per cell
const ACTIVE_CELL_RADIUS = 1; // For a 3x3 grid (current cell + 1 layer around)


const InSystemScene: React.FC = () => {
    const navigate = useNavigate();
    const { openModal } = useGame();

    const [currentSystemId, setCurrentSystemId] = useState<string | null>(null);
    const [currentSystemData, setCurrentSystemData] = useState<StarSystemData_Full | null>(null);
    const [playerPosition, setPlayerPosition] = useState<Vector2D>({ x: 500, y: 500 }); // Initial position
    const [playerRotation, setPlayerRotation] = useState<number>(0);
    const [sceneObjects, setSceneObjects] = useState<SceneObjectInstance[]>([]);
    const [gameTime, setGameTime] = useState<GameTime>(0);

    // State for cell streaming
    const [currentPlayerCellId, setCurrentPlayerCellId] = useState<string | null>(null);
    const [activeGridCells, setActiveGridCells] = useState<Set<string>>(new Set());
    const [debugLoadedCells, setDebugLoadedCells] = useState<string[]>([]); // For debug display


    // Ref for a potential canvas element if using direct canvas rendering or a library like PixiJS
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Keyboard listener for ESC (In-Game Menu) and M (Galaxy Map)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                openModal('InGameMenu');
            }
            if (event.key === 'm' || event.key === 'M') { // For Galaxy Map
                navigate('/galaxy-map');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [openModal, navigate]); // Add openModal and navigate to dependencies

    // Initialization: Load initial system, player data, etc.
    useEffect(() => {
        let spawnSystemId = "default_system"; // Fallback
        let spawnPosition: Vector2D = { x: 0, y: 0 }; // Fallback

        // Simulate loading saved game data
        const loadSavedGameData = (): { systemId: string; position: Vector2D } | null => {
            // For this subtask, always return null to simulate no saved game or new game start
            return null;
        };

        // Simulate resolving initial spawn system ID from key
        const getInitialSpawnSystemId = (key: string): string => {
            console.log(`Resolving system ID from key: ${key}`);
            // Placeholder: in a real scenario, this would look up the key in game config/state
            if (key === "playerStartSystem.id") return "alpha_centauri_prime"; // Example resolved ID
            return "unknown_system"; // Fallback if key not recognized
        };
        
        const savedGame = loadSavedGameData();

        if (mainSceneConfigData.playerSpawn_Logic.onLoadGame_SpawnAt_LastSavedPosition && savedGame) {
            spawnSystemId = savedGame.systemId;
            spawnPosition = savedGame.position;
            console.log(`Spawning player from saved game data in system: ${spawnSystemId} at position: X:${spawnPosition.x}, Y:${spawnPosition.y}`);
        } else {
            // New game spawn logic
            spawnSystemId = getInitialSpawnSystemId(mainSceneConfigData.playerSpawn_Logic.initialSpawn_OnNewGame_SystemId_Key);
            // Position based on initialSpawn_Position_InSystem_cz - for now, a default
            // In a real game, "Blízko hlavní hvězdy" would translate to specific coordinates for that system.
            spawnPosition = { x: 500, y: 500 }; // Example default position near system center for "Blízko hlavní hvězdy"
            console.log(`Spawning new player in system: ${spawnSystemId} at default position X:${spawnPosition.x}, Y:${spawnPosition.y} (reason: ${mainSceneConfigData.playerSpawn_Logic.initialSpawn_Position_InSystem_cz})`);
        }

        setCurrentSystemId(spawnSystemId);
        setPlayerPosition(spawnPosition);

        // TODO: Load StarSystemData_Full for spawnSystemId
        // const systemData = loadStarSystemData(spawnSystemId); // Placeholder function
        // setCurrentSystemData(systemData);
        // Example: Simulate loading basic system data
        if (spawnSystemId === "alpha_centauri_prime") {
            setCurrentSystemData({
                id: "alpha_centauri_prime",
                name: "Alpha Centauri Prime",
                position: { x: 0, y: 0 }, // Position in galaxy map
                starType: StarType.G_YellowMainSequence, // Primary star type for the system
                explored: true,
                planets: 2, // Number of planets (example)
                anomalyPresent: false,
                resources: [], // Example
                celestialBodies: [
                    {
                        id: "acp_star_a", name: "Proxima Centauri", type: StarType.M_RedDwarf,
                        radius: 200000, mass: 1.989e30 * 0.123,
                        currentPosition_World: { x: 0, y: 0 }, // System origin
                        isScanned_Full: true,
                        // orbitalParameters: undefined, // Not needed if currentPosition_World is used
                    },
                    {
                        id: "acp_planet_1", name: "Pandora", type: PlanetType.Jungle,
                        radius: 7000, mass: 5.972e24 * 1.2,
                        currentPosition_World: { x: 30000, y: 10000 }, // Further away
                        orbitalParameters: { semiMajorAxis: 30000, eccentricity: 0.05, inclination: 2, longitudeOfAscendingNode:0, argumentOfPeriapsis:0 },
                        isScanned_Full: true,
                    },
                    {
                        id: "acp_planet_2", name: "Helios", type: PlanetType.Desert,
                        radius: 5000, mass: 5.972e24 * 0.8,
                        // Positioned relative to player's initial spawn for testing LOD
                        currentPosition_World: { x: spawnPosition.x + 5000, y: spawnPosition.y - 3000 }, 
                        orbitalParameters: { semiMajorAxis: 5000, eccentricity: 0.01, inclination: 1, longitudeOfAscendingNode:0, argumentOfPeriapsis:0 },
                        isScanned_Full: true,
                    }
                ],
                // Ensure all other required fields from StarSystemData_Full are present
                // For example, if asteroidBelts, stations, hyperlaneAccessPoints, navigationalHazards are mandatory and not optional:
                asteroidBelts: [], 
                stations: [],
                hyperlaneAccessPoints: [],
                navigationalHazards: [],
                description: "A binary star system, home to diverse worlds." // Example description
            } as StarSystemData_Full); // Cast is okay for now if we are incrementally building StarSystemData_Full
        }


        const playerShipInstance: SceneObjectInstance = {
            instanceId: "player_ship_instance_001",
            definitionId: "nomad_mk1_player_start", // Example from a hypothetical shipClasses.ts
            objectType: 'Ship_Player',
            currentPosition_World: spawnPosition,
            currentRotation_Deg: 0,
            currentVelocity_World: { x: 0, y: 0 },
            isActive_InRenderBubble: true,
            lastUpdateTime_Game: 0, // Assuming gameTime starts at 0 or is set by game state
            currentHealth: 100, maxHealth: 100,
            currentShield: 50, maxShield: 50,
            factionId: FactionId.Player // Using imported FactionId
        };
        setSceneObjects([playerShipInstance]);

        console.log("InSystemScene initialized. Player spawned. Config:", mainSceneConfigData);
    }, []); // Empty dependency array means this runs once on mount

    // Main game loop placeholder (if not using a library's loop)
    useEffect(() => {
        const gameLoopInterval = setInterval(() => {
            const newGameTime = gameTime + 1; // Calculate new game time for this tick
            setGameTime(newGameTime);

            // Update scene objects - including render bubble check
            setSceneObjects(prevObjects =>
                prevObjects.map(obj => {
                    if (obj.objectType === 'Ship_Player') {
                        // Player ship's position might update elsewhere (e.g. input handling)
                        // For now, ensure its lastUpdateTime_Game is updated.
                        return { ...obj, lastUpdateTime_Game: newGameTime };
                    }

                    const distance = Math.sqrt(
                        Math.pow(obj.currentPosition_World.x - playerPosition.x, 2) +
                        Math.pow(obj.currentPosition_World.y - playerPosition.y, 2)
                    );

                    // Using radius_NormalFlight_Units for now. Warp flight radius would be a different state.
                    const activationRadius = bubbleConfigData.radius_NormalFlight_Units * bubbleConfigData.objectActivation_Threshold_Factor;
                    const deactivationRadius = bubbleConfigData.radius_NormalFlight_Units * bubbleConfigData.objectDeactivation_Threshold_Factor;

                    let isActive = obj.isActive_InRenderBubble;
                    if (isActive) {
                        if (distance > deactivationRadius) {
                            isActive = false;
                        }
                    } else {
                        if (distance < activationRadius) {
                            isActive = true;
                        }
                    }
                    
                    // TODO: Add object movement/AI placeholder update
                    // const updatedPosition = { ...obj.currentPosition_World }; // example
                    // if (isActive && obj.currentVelocity_World) {
                    //    updatedPosition.x += obj.currentVelocity_World.x;
                    //    updatedPosition.y += obj.currentVelocity_World.y;
                    // }

                    return {
                        ...obj,
                        isActive_InRenderBubble: isActive,
                        // currentPosition_World: updatedPosition, // If doing movement
                        lastUpdateTime_Game: newGameTime 
                    };
                })
            );
            // Update player position (based on input or physics) - placeholder
            // For testing bubble, let's simulate player moving slightly if needed, or objects moving
            // setPlayerPosition(prevPos => ({x: prevPos.x + 1, y: prevPos.y})); 

            // Render scene (if managing rendering manually)
            // renderGameScene(); // Render is called by its own useEffect based on state changes

        }, 1000 / 60); // ~60 FPS

        return () => clearInterval(gameLoopInterval);
    }, [playerPosition, gameTime]); // gameTime added as dependency


    // Helper function for distance calculation
    const calculateDistance = (pos1: Vector2D, pos2: Vector2D): number => {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    // Placeholder functions for cell data management
    const loadDataForCell = (cellId: string) => {
        console.log(`Placeholder: Loading data for cell ${cellId}`);
        // In a real scenario, this would fetch StarSystemData_Full for systems in this cell,
        // initialize SceneObjectInstances for NPCs, stations etc.
        // For debug:
        setDebugLoadedCells(prev => [...new Set([...prev, cellId])].sort());
    };

    const unloadDataForCell = (cellId: string) => {
        console.log(`Placeholder: Unloading data for cell ${cellId}`);
        // In a real scenario, this would remove objects associated with this cell (except persistent ones),
        // save any changes for the cell/systems within it.
        // For debug:
        setDebugLoadedCells(prev => prev.filter(id => id !== cellId).sort());
    };
    
    // useEffect for cell management based on playerPosition
    useEffect(() => {
        if (!playerPosition) return;

        const cellX = Math.floor(playerPosition.x / GALAXY_CELL_SIZE_UNITS);
        const cellY = Math.floor(playerPosition.y / GALAXY_CELL_SIZE_UNITS);
        const newCellId = `cell_${cellX}_${cellY}`;

        if (newCellId !== currentPlayerCellId) {
            setCurrentPlayerCellId(newCellId);

            const newRequiredCells = new Set<string>();
            for (let dx = -ACTIVE_CELL_RADIUS; dx <= ACTIVE_CELL_RADIUS; dx++) {
                for (let dy = -ACTIVE_CELL_RADIUS; dy <= ACTIVE_CELL_RADIUS; dy++) {
                    newRequiredCells.add(`cell_${cellX + dx}_${cellY + dy}`);
                }
            }

            // Determine cells to load and unload
            const cellsToLoad = new Set([...newRequiredCells].filter(id => !activeGridCells.has(id)));
            const cellsToUnload = new Set([...activeGridCells].filter(id => !newRequiredCells.has(id)));

            cellsToLoad.forEach(id => loadDataForCell(id));
            cellsToUnload.forEach(id => unloadDataForCell(id));

            setActiveGridCells(newRequiredCells);
        }
    }, [playerPosition, currentPlayerCellId, activeGridCells]); // Dependencies

    // Placeholder for rendering the game scene (e.g., onto a canvas)
    // This will be significantly more complex with actual rendering.
    const renderGameScene = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const canvasWidth = canvasRef.current.width;
                const canvasHeight = canvasRef.current.height;
                const scale = 10; // The divisor used for scaling world coords to canvas coords

                // Calculate camera position to keep player centered
                const cameraX = (playerPosition.x / scale) - (canvasWidth / 2);
                const cameraY = (playerPosition.y / scale) - (canvasHeight / 2);

                context.save(); // Save the default state (untransformed)

                // Clear canvas (background) - This is in screen space, before camera transform
                context.fillStyle = '#000010'; // Deep space blue/black
                context.fillRect(0, 0, canvasWidth, canvasHeight);

                // Apply camera transformation
                context.translate(-cameraX, -cameraY);

                // --- All subsequent drawing operations are now in world space (scaled) ---

                // Render player (simple circle for now) at its world position (scaled)
                context.fillStyle = 'white';
                context.beginPath();
                context.arc(playerPosition.x / scale, playerPosition.y / scale, 5, 0, Math.PI * 2);
                context.fill();
                context.font = '12px Arial'; // Ensure font is set for world space text
                context.fillText(`Player`, playerPosition.x / scale + 10, playerPosition.y / scale + 5);

                // Render other scene objects (names for now) at their world positions (scaled)
                sceneObjects.forEach((obj, index) => {
                    // Player ship is in sceneObjects, so render it here based on its properties
                    if (obj.objectType === 'Ship_Player') {
                        // Already rendered above if playerPosition directly tracks the player ship's position
                        // If playerPosition is a separate camera target, then render player ship here.
                        // For now, assume playerPosition IS the player ship's position.
                    } else {
                        context.fillStyle = obj.isActive_InRenderBubble ? 'lightgreen' : 'gray';
                        context.fillText(
                            `${obj.objectType} (${obj.definitionId})`,
                            obj.currentPosition_World.x / scale,
                            obj.currentPosition_World.y / scale // Simple positioning
                        );
                    }
                });
                
                // Example: Render system origin for reference
                context.fillStyle = 'red';
                context.beginPath();
                context.arc(0, 0, 3, 0, Math.PI * 2); // At world origin (0,0), scaled
                context.fill();
                context.fillText("Origin (0,0)", 5 / scale, 15 / scale); // Text near origin

                // Render celestial bodies with LOD
                if (currentSystemData && currentSystemData.celestialBodies) {
                    currentSystemData.celestialBodies.forEach(body => {
                        // Assuming currentPosition_World is added directly to CelestialBodyData_Extended for this step
                        const bodyWorldPos = (body as any).currentPosition_World; 
                        if (!bodyWorldPos) return; 

                        const distanceToPlayer = calculateDistance(bodyWorldPos, playerPosition);
                        const scaledBodyX = bodyWorldPos.x / scale;
                        const scaledBodyY = bodyWorldPos.y / scale;

                        if (distanceToPlayer < bubbleConfigData.radius_NormalFlight_Units) {
                            // Inside render bubble - more detail
                            let color = 'gray';
                            let size = 8; // Default planet size
                            if (Object.values(StarType).includes(body.type as StarType)) {
                                color = 'yellow';
                                size = 12; // Stars are bigger
                            } else if (Object.values(PlanetType).includes(body.type as PlanetType)) {
                                switch (body.type as PlanetType) {
                                    case PlanetType.EarthLike: color = 'blue'; break;
                                    case PlanetType.Jungle: color = 'green'; break;
                                    case PlanetType.Desert: color = 'orange'; break;
                                    case PlanetType.IceWorld: color = 'lightblue'; break;
                                    case PlanetType.GasGiant: color = 'purple'; size = 10; break; // Gas giants slightly bigger
                                    default: color = 'slateGray'; // For Volcanic, Barren, etc.
                                }
                            }
                            // Could add MoonType differentiation here if available

                            context.fillStyle = color;
                            context.beginPath();
                            context.arc(scaledBodyX, scaledBodyY, size, 0, Math.PI * 2);
                            context.fill();
                            context.fillStyle = 'white';
                            context.font = '10px Arial';
                            context.fillText(body.name, scaledBodyX + size + 2, scaledBodyY + (size / 2));
                        } else {
                            // Outside render bubble - LOD rendering
                            if (body.isScanned_Full) {
                                let lodColor = 'darkgray'; // Default for unknown distant objects
                                let lodSize = 2;
                                if (Object.values(StarType).includes(body.type as StarType)) {
                                    lodColor = 'white'; // Stars are always visible and bright
                                    lodSize = 3;
                                } else if (Object.values(PlanetType).includes(body.type as PlanetType)) {
                                    lodColor = 'darkblue'; // Generic distant planet color
                                    if (body.type === PlanetType.Jungle) lodColor = 'darkgreen';
                                    if (body.type === PlanetType.Desert) lodColor = 'darkorange';
                                }
                                // Moons could be 'dimgray'

                                context.fillStyle = lodColor;
                                context.beginPath();
                                context.arc(scaledBodyX, scaledBodyY, lodSize, 0, Math.PI * 2);
                                context.fill();
                            }
                        }
                    });
                }

                context.restore(); // Restore to default state (screen space, before camera transform)

                // --- Fixed HUD elements or text drawn AFTER restoring context ---
                // These are drawn in screen space and will not move with the camera.
                context.fillStyle = 'yellow';
                context.font = '16px Arial'; // Reset font for HUD
                if (currentSystemData) {
                    context.fillText(`System: ${currentSystemData.name}`, 20, canvasHeight - 20); // Bottom-left
                }
                context.fillText(`Time: ${gameTime}`, canvasWidth - 100, 20); // Top-right
            }
        }
    };

    // Call renderGameScene whenever relevant state changes
     useEffect(() => {
        renderGameScene();
    }, [playerPosition, sceneObjects, currentSystemData, gameTime]);


    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#000' }}>
            {/* Game Canvas for rendering the scene */}
            {/* Dimensions should ideally come from screen size or graphics settings */}
            <canvas
                ref={canvasRef}
                width={window.innerWidth * 0.8} // Example size
                height={window.innerHeight * 0.8} // Example size
                style={{ border: '1px solid #333', margin: 'auto', display: 'block' }}
            />
            {/* HUD Component will be overlaid here, e.g. <GameHUD /> */}
            {/* <GameHUD config={hudLayoutConfig} /> */} {/* Assuming GameHUD and its config */}
            <div style={{position: 'absolute', top: 10, left: 10, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px'}}>
                <p>Current System: {currentSystemId || "None"}</p>
                <p>Player Position: X: {Math.round(playerPosition.x)}, Y: {Math.round(playerPosition.y)}</p>
                <p>Player Cell ID: {currentPlayerCellId || "Calculating..."}</p>
                <p>Game Time: {gameTime}</p>
                <p>Scene Objects: {sceneObjects.length}</p>
                <p>Loaded Cells (Debug): {debugLoadedCells.join(', ')}</p>
                <button onClick={() => navigate('/galaxy-map')} style={{padding: '5px', margin: '5px', color: 'white', backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid white'}}>
                    Open Galaxy Map (M)
                </button>
            </div>
        </div>
    );
};

export default InSystemScene;
