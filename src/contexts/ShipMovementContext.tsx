
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  ShipMovementPhysicsConfig, 
  ShipControlSchemes, 
  ShipMovementEffects, 
  EnvironmentalInteractionPhysics, 
  MovementModuleEffects,
  ShipMovementState,
  ShipMovementContextType,
  GravitySourceParams,
  NebulaInteractionParams,
  WarpTravelParams
} from '../types/shipMovement';
import { Vector2D } from '../types/galaxy';
import { useToast } from '../components/ui/use-toast';

// Default configurations
const DEFAULT_PHYSICS_CONFIG: ShipMovementPhysicsConfig = {
  physicsModel: 'Newtonian_With_Dampening',
  thrustBasedAcceleration: true,
  inertiaEnabled: true,
  activeBrakingMechanism: 'TurnAndBurn',
  passiveSpaceDragFactor: 0.02,
  flightAssistModule_Effect: {
    autoStopOnZeroInput: true,
    stabilizationFactor: 0.8
  },
  rotationModel: {
    thrustBased: true,
    turnRate_FromShipStats: true,
    rotationalInertiaFactor: 0.2
  },
  maxSafeSpeed_GlobalMultiplier: 1.0,
  collisionResponse: 'Inelastic_Damage_MomentumTransfer',
  forwardMovementFix_Priority: true,
  smoothnessAndResponsiveness_Goal: "Pohyb musí být plynulý, s jasnou odezvou na hráčov vstup."
};

const DEFAULT_SHIP_MOVEMENT_STATE: ShipMovementState = {
  position: { x: 0, y: 0 },
  rotation: 0,
  velocity: { x: 0, y: 0 },
  rotationalVelocity: 0,
  thrusting: false,
  strafingLeft: false,
  strafingRight: false,
  braking: false,
  boosting: false,
  rotatingLeft: false,
  rotatingRight: false,
  flightAssistActive: true,
  inWarp: false,
  chargingWarp: false
};

const DEFAULT_CONTROL_SCHEMES: ShipControlSchemes = {
  availableSchemes: [
    {
      schemeName: 'KeyboardMouse_Relative',
      bindings: [
        { actionId: "THRUST_FORWARD", defaultPC_Key: "W", defaultGamepad_Button: "LeftStickY_Up", isHoldAction: true },
        { actionId: "THRUST_BACKWARD_BRAKE", defaultPC_Key: "S", defaultGamepad_Button: "LeftStickY_Down", isHoldAction: true },
        { actionId: "STRAFE_LEFT", defaultPC_Key: "Q", defaultGamepad_Button: "LeftBumper", isHoldAction: true },
        { actionId: "STRAFE_RIGHT", defaultPC_Key: "E", defaultGamepad_Button: "RightBumper", isHoldAction: true },
        { actionId: "ROTATE_TARGET_MOUSE", defaultPC_Key: "MouseMovement", defaultGamepad_Button: "RightStickX_Y" },
        { actionId: "BOOST_AFTERBURNER", defaultPC_Key: "ShiftLeft", defaultGamepad_Button: "B_Button", isHoldAction: true },
        { actionId: "HYPERDRIVE_JUMP", defaultPC_Key: "J", defaultGamepad_Button: "Y_Button" }
      ],
      mouseSensitivity_PC_StoreKey: "settings.controls.mouseSensitivity"
    },
    {
      schemeName: 'KeyboardMouse_AbsoluteTurn',
      bindings: [
        { actionId: "THRUST_FORWARD", defaultPC_Key: "W", defaultGamepad_Button: "LeftStickY_Up", isHoldAction: true },
        { actionId: "THRUST_BACKWARD_BRAKE", defaultPC_Key: "S", defaultGamepad_Button: "LeftStickY_Down", isHoldAction: true },
        { actionId: "ROTATE_LEFT", defaultPC_Key: "A", defaultGamepad_Button: "LeftStickX_Left", isHoldAction: true },
        { actionId: "ROTATE_RIGHT", defaultPC_Key: "D", defaultGamepad_Button: "LeftStickX_Right", isHoldAction: true },
        { actionId: "BOOST_AFTERBURNER", defaultPC_Key: "ShiftLeft", defaultGamepad_Button: "B_Button", isHoldAction: true },
        { actionId: "HYPERDRIVE_JUMP", defaultPC_Key: "J", defaultGamepad_Button: "Y_Button" }
      ],
      mouseSensitivity_PC_StoreKey: "settings.controls.mouseSensitivity"
    }
  ],
  defaultScheme_PC: 'KeyboardMouse_Relative',
  defaultScheme_Gamepad: 'Gamepad_TwinStick',
  defaultScheme_Mobile: 'Mobile_VirtualJoystickAndButtons',
  allowPlayerToSwitchScheme: true,
  allowKeyRebindingScreenId: "controlsTab.keybindingList"
};

const DEFAULT_MOVEMENT_EFFECTS: ShipMovementEffects = {
  speedVisualEffects: [
    {
      type: "StarStreaking_Background",
      intensityFactor_BySpeed: 0.005
    },
    {
      type: "SpaceDust_Particles_Foreground",
      intensityFactor_BySpeed: 1.0,
      particleSystem_SpaceDust: {
        particleSpriteAsset: "assets/images/particles/space_dust_mote_fast_white.png",
        countPerSecond_AtMaxSpeed: 100,
        lifespanMs: 500,
        velocityRelativeToShip: { x: 0, y: -200 }
      }
    }
  ],
  collisionEffects: [
    {
      impactForceThreshold: 10,
      visual_Sparks: {
        frameCount: 8,
        speed: 15,
        loop: false,
        spritesheetUrl: "assets/images/fx/collisions/sparks_small_sheet.png"
      },
      sound_Impact_AssetPrefix: "sfx/collisions/hull_impact_metal_light",
      cameraShake: { intensity: 0.1, durationMs: 100 },
      shipDamage_Hull_Factor: 0.05
    }
  ]
};

const DEFAULT_ENVIRONMENTAL_INTERACTIONS: EnvironmentalInteractionPhysics = {
  gravitySources: [
    {
      celestialBodyType: "Planet_Terrestrial_Large",
      gravityWellRadiusFactor: 3.0,
      maxGravityForce: 1.5,
      falloffCurve: "InverseSquare",
      slingshotManeuver_Possible: true,
      visualIndicator_OnHUD: {
        assetUrl: "assets/images/icons/hud/gravity_indicator_planet.png",
        colorByStrength: true
      }
    }
  ],
  nebulaInteractions: [],
  asteroidFieldInteractions: [],
  warpTravel: {
    chargeUpTime_Seconds_Base: 5.0,
    chargeUp_VulnerabilityFactor: 1.5,
    chargeUp_VisualEffect_OnShip: {
      frameCount: 32,
      speed: 1.0,
      loop: false,
      spritesheetUrl: "assets/images/fx/warp/hyperdrive_chargeup_ship_anim.png"
    },
    chargeUp_SoundEffect_Loop: "sfx/warp/hyperdrive_charge_loop.wav",
    jumpSequence_VisualEffect_Tunnel: {
      animation: {
        frameCount: 60,
        speed: 15,
        loop: false
      },
      spritesheetUrl_TunnelEffect: "assets/images/fx/warp/hyperspace_tunnel_colorshift_anim_sheet.png"
    },
    jumpSequence_SoundEffect_Enter: "sfx/warp/hyperdrive_jump_enter.wav",
    jumpSequence_SoundEffect_TravelLoop: "sfx/warp/hyperdrive_travel_loop.wav",
    jumpSequence_SoundEffect_Exit: "sfx/warp/hyperdrive_jump_exit.wav",
    interruptionConditions: ["HeavyDamageReceived", "StrongGravityField"],
    interruption_VisualEffect: {
      frameCount: 16,
      speed: 10,
      loop: false,
      spritesheetUrl: "assets/images/fx/warp/hyperdrive_interrupt_fail_sheet.png"
    },
    interruption_SoundEffect: "sfx/warp/hyperdrive_interrupt_fail.wav",
    fuelCost_PerLightYear_Base: 10
  }
};

const DEFAULT_MODULE_EFFECTS: MovementModuleEffects = {
  moduleEffects: []
};

const ShipMovementContext = createContext<ShipMovementContextType | undefined>(undefined);

export const ShipMovementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movementPhysicsConfig] = useState<ShipMovementPhysicsConfig>(DEFAULT_PHYSICS_CONFIG);
  const [controlSchemes] = useState<ShipControlSchemes>(DEFAULT_CONTROL_SCHEMES);
  const [movementEffects] = useState<ShipMovementEffects>(DEFAULT_MOVEMENT_EFFECTS);
  const [environmentalInteractions] = useState<EnvironmentalInteractionPhysics>(DEFAULT_ENVIRONMENTAL_INTERACTIONS);
  const [movementModuleEffects] = useState<MovementModuleEffects>(DEFAULT_MODULE_EFFECTS);
  const [currentMovementState, setCurrentMovementState] = useState<ShipMovementState>(DEFAULT_SHIP_MOVEMENT_STATE);
  
  const { toast } = useToast();

  // Basic ship control functions
  const setThrusting = useCallback((isThrusting: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, thrusting: isThrusting }));
  }, []);

  const setBraking = useCallback((isBraking: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, braking: isBraking }));
  }, []);

  const setStrafeLeft = useCallback((isStrafing: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, strafingLeft: isStrafing }));
  }, []);

  const setStrafeRight = useCallback((isStrafing: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, strafingRight: isStrafing }));
  }, []);

  const setRotatingLeft = useCallback((isRotating: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, rotatingLeft: isRotating }));
  }, []);

  const setRotatingRight = useCallback((isRotating: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, rotatingRight: isRotating }));
  }, []);

  const setBoosting = useCallback((isBoosting: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, boosting: isBoosting }));
  }, []);

  const setFlightAssist = useCallback((isActive: boolean) => {
    setCurrentMovementState(prev => ({ ...prev, flightAssistActive: isActive }));
    toast({
      title: isActive ? "Flight Assist Enabled" : "Flight Assist Disabled",
      description: isActive 
        ? "Automatic stabilization system active." 
        : "Manual control mode active. Watch your inertia!",
      duration: 3000
    });
  }, [toast]);

  // Warp functions
  const initiateWarpCharge = useCallback(() => {
    setCurrentMovementState(prev => ({ ...prev, chargingWarp: true }));
    
    // Start the warp sequence - this would be expanded with actual implementation
    const warpConfig = environmentalInteractions.warpTravel;
    
    // Simulate charging sequence
    toast({
      title: "Hyperdrive Charging",
      description: `Initiating warp sequence. Ready in ${warpConfig.chargeUpTime_Seconds_Base} seconds.`,
      duration: 3000
    });
    
    // In a real implementation, you would start actual audio/visual effects here
    
    // Simulate warp after charge time
    setTimeout(() => {
      setCurrentMovementState(prev => ({ ...prev, chargingWarp: false, inWarp: true }));
      
      toast({
        title: "Entering Hyperspace",
        description: "Warp jump initiated.",
        duration: 2000
      });
      
      // Simulate warp duration
      setTimeout(() => {
        setCurrentMovementState(prev => ({ ...prev, inWarp: false }));
        
        toast({
          title: "Hyperspace Exit Complete",
          description: "Arrived at destination.",
          duration: 3000
        });
      }, 5000); // Simulate 5 second warp duration
    }, warpConfig.chargeUpTime_Seconds_Base * 1000);
  }, [environmentalInteractions.warpTravel, toast]);

  const cancelWarpCharge = useCallback(() => {
    if (currentMovementState.chargingWarp) {
      setCurrentMovementState(prev => ({ ...prev, chargingWarp: false }));
      
      toast({
        title: "Warp Charge Cancelled",
        description: "Hyperdrive sequence aborted.",
        duration: 3000
      });
    }
  }, [currentMovementState.chargingWarp, toast]);

  // Environment interaction functions
  const applyExternalForce = useCallback((force: Vector2D) => {
    setCurrentMovementState(prev => ({
      ...prev,
      velocity: {
        x: prev.velocity.x + force.x,
        y: prev.velocity.y + force.y
      }
    }));
  }, []);

  const applyCollision = useCallback((objectMass: number, impactVelocity: Vector2D) => {
    // This would be expanded with actual collision physics
    toast({
      title: "Collision Detected",
      description: "Ship hull integrity compromised.",
      variant: "destructive"
    });
    
    // Apply impact force to ship velocity
    applyExternalForce({
      x: impactVelocity.x * objectMass * 0.01,
      y: impactVelocity.y * objectMass * 0.01
    });
  }, [applyExternalForce, toast]);

  const enterGravityField = useCallback((sourceParams: GravitySourceParams, distance: number) => {
    toast({
      title: "Entering Gravity Field",
      description: `${sourceParams.celestialBodyType} gravity well detected.`,
      duration: 3000
    });
    
    // In a real implementation, would apply actual gravity physics
  }, [toast]);

  const exitGravityField = useCallback(() => {
    toast({
      title: "Exited Gravity Field",
      description: "Ship has returned to zero-g space.",
      duration: 3000
    });
  }, [toast]);

  const enterNebula = useCallback((nebulaParams: NebulaInteractionParams) => {
    toast({
      title: "Entering Nebula",
      description: "Sensor interference detected. Navigation may be impaired.",
      duration: 3000
    });
    
    // In a real implementation, apply nebula effects to ship systems
  }, [toast]);

  const exitNebula = useCallback(() => {
    toast({
      title: "Exited Nebula",
      description: "Sensor systems returning to normal.",
      duration: 3000
    });
  }, [toast]);

  // Update physics simulation - this would be expanded in a real implementation
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentMovementState(prev => {
        // In a real implementation, this would contain the full Newtonian physics
        // with thrust, rotation, inertia, etc. based on movementPhysicsConfig
        
        // Simple placeholder implementation
        let velocityX = prev.velocity.x;
        let velocityY = prev.velocity.y;
        let posX = prev.position.x;
        let posY = prev.position.y;
        let rotation = prev.rotation;
        
        // Apply thrust
        if (prev.thrusting) {
          // Calculate thrust vector based on ship rotation
          const thrustX = Math.sin(rotation) * 0.1;
          const thrustY = -Math.cos(rotation) * 0.1;
          velocityX += thrustX;
          velocityY += thrustY;
        }
        
        // Apply braking
        if (prev.braking) {
          velocityX *= 0.95;
          velocityY *= 0.95;
        }
        
        // Apply rotation
        if (prev.rotatingLeft) {
          rotation -= 0.05;
        }
        if (prev.rotatingRight) {
          rotation += 0.05;
        }
        
        // Apply strafe
        if (prev.strafingLeft) {
          const strafeX = Math.sin(rotation - Math.PI/2) * 0.05;
          const strafeY = -Math.cos(rotation - Math.PI/2) * 0.05;
          velocityX += strafeX;
          velocityY += strafeY;
        }
        if (prev.strafingRight) {
          const strafeX = Math.sin(rotation + Math.PI/2) * 0.05;
          const strafeY = -Math.cos(rotation + Math.PI/2) * 0.05;
          velocityX += strafeX;
          velocityY += strafeY;
        }
        
        // Apply boost
        if (prev.boosting) {
          velocityX *= 1.05;
          velocityY *= 1.05;
        }
        
        // Apply flight assist
        if (prev.flightAssistActive && !prev.thrusting && !prev.braking && !prev.strafingLeft && !prev.strafingRight) {
          velocityX *= 0.98;
          velocityY *= 0.98;
        }
        
        // Apply passive drag
        velocityX *= (1 - movementPhysicsConfig.passiveSpaceDragFactor);
        velocityY *= (1 - movementPhysicsConfig.passiveSpaceDragFactor);
        
        // Update position
        posX += velocityX;
        posY += velocityY;
        
        return {
          ...prev,
          position: { x: posX, y: posY },
          rotation,
          velocity: { x: velocityX, y: velocityY }
        };
      });
    }, 16); // ~60fps
    
    return () => clearInterval(updateInterval);
  }, [movementPhysicsConfig.passiveSpaceDragFactor]);

  // Set up keyboard event listeners for controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code;
      
      // Get KeyboardMouse_Relative scheme bindings
      const scheme = controlSchemes.availableSchemes.find(
        s => s.schemeName === 'KeyboardMouse_Relative'
      );
      
      if (!scheme) return;
      
      // Map keys to actions
      switch (key) {
        case 'KeyW':
          setThrusting(true);
          break;
        case 'KeyS':
          setBraking(true);
          break;
        case 'KeyQ':
          setStrafeLeft(true);
          break;
        case 'KeyE':
          setStrafeRight(true);
          break;
        case 'KeyA':
          setRotatingLeft(true);
          break;
        case 'KeyD':
          setRotatingRight(true);
          break;
        case 'ShiftLeft':
          setBoosting(true);
          break;
        case 'KeyJ':
          initiateWarpCharge();
          break;
        case 'KeyX':
          setFlightAssist(!currentMovementState.flightAssistActive);
          break;
        case 'Escape':
          if (currentMovementState.chargingWarp) {
            cancelWarpCharge();
          }
          break;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.code;
      
      switch (key) {
        case 'KeyW':
          setThrusting(false);
          break;
        case 'KeyS':
          setBraking(false);
          break;
        case 'KeyQ':
          setStrafeLeft(false);
          break;
        case 'KeyE':
          setStrafeRight(false);
          break;
        case 'KeyA':
          setRotatingLeft(false);
          break;
        case 'KeyD':
          setRotatingRight(false);
          break;
        case 'ShiftLeft':
          setBoosting(false);
          break;
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      // Remove event listeners
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    controlSchemes.availableSchemes, 
    currentMovementState.chargingWarp, 
    currentMovementState.flightAssistActive, 
    setBoosting, 
    setBraking, 
    cancelWarpCharge, 
    initiateWarpCharge, 
    setFlightAssist, 
    setRotatingLeft, 
    setRotatingRight, 
    setStrafeLeft, 
    setStrafeRight, 
    setThrusting
  ]);

  const value = {
    movementPhysicsConfig,
    controlSchemes,
    movementEffects,
    environmentalInteractions,
    movementModuleEffects,
    currentMovementState,
    
    setThrusting,
    setBraking,
    setStrafeLeft,
    setStrafeRight,
    setRotatingLeft,
    setRotatingRight,
    setBoosting,
    setFlightAssist,
    initiateWarpCharge,
    cancelWarpCharge,
    
    applyExternalForce,
    applyCollision,
    enterGravityField,
    exitGravityField,
    enterNebula,
    exitNebula
  };

  return (
    <ShipMovementContext.Provider value={value}>
      {children}
    </ShipMovementContext.Provider>
  );
};

export const useShipMovement = () => {
  const context = useContext(ShipMovementContext);
  if (context === undefined) {
    throw new Error('useShipMovement must be used within a ShipMovementProvider');
  }
  return context;
};
