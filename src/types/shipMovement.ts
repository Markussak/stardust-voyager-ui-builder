
import { Vector2D } from './galaxy';

// Basic physics configurations
export interface ShipMovementPhysicsConfig {
  physicsModel: 'Newtonian_With_Dampening' | 'Arcade_Simplified';
  thrustBasedAcceleration: boolean;
  inertiaEnabled: boolean;
  activeBrakingMechanism: 'ReverseThrusters' | 'TurnAndBurn';
  passiveSpaceDragFactor: number;
  flightAssistModule_Effect?: {
    autoStopOnZeroInput: boolean;
    stabilizationFactor: number;
  };
  rotationModel: {
    thrustBased: boolean;
    turnRate_FromShipStats: boolean;
    rotationalInertiaFactor: number;
  };
  maxSafeSpeed_GlobalMultiplier?: number;
  collisionResponse: 'Elastic_Bounce' | 'Inelastic_Damage_MomentumTransfer';
  forwardMovementFix_Priority: boolean;
  smoothnessAndResponsiveness_Goal: string;
}

// Ship control configurations
export interface KeyBinding {
  actionId: string;
  defaultPC_Key: string;
  defaultGamepad_Button: string;
  defaultMobile_ControlElementId?: string;
  isHoldAction?: boolean;
}

export interface ControlScheme {
  schemeName: 'KeyboardMouse_Relative' | 'KeyboardMouse_AbsoluteTurn' | 'Gamepad_TwinStick' | 'Mobile_VirtualJoystickAndButtons' | 'Mobile_TapToMove';
  bindings: KeyBinding[];
  mouseSensitivity_PC_StoreKey?: string;
  gamepad_StickSensitivity_StoreKey?: string;
  gamepad_Deadzone_StoreKey?: string;
  mobile_JoystickSensitivity_StoreKey?: string;
}

export interface ShipControlSchemes {
  availableSchemes: ControlScheme[];
  defaultScheme_PC: 'KeyboardMouse_Relative';
  defaultScheme_Gamepad: 'Gamepad_TwinStick';
  defaultScheme_Mobile: 'Mobile_VirtualJoystickAndButtons';
  allowPlayerToSwitchScheme: boolean;
  allowKeyRebindingScreenId: string;
}

// Visual and audio effects for ship movement
export interface SpeedVisualEffect {
  type: 'MotionBlur_Subtle_Background' | 'StarStreaking_Background' | 'SpaceDust_Particles_Foreground';
  intensityFactor_BySpeed: number;
  particleSystem_SpaceDust?: {
    particleSpriteAsset: string;
    countPerSecond_AtMaxSpeed: number;
    lifespanMs: number;
    velocityRelativeToShip: Vector2D;
  };
  shader_MotionBlur?: any;
}

export interface CollisionEffect {
  impactForceThreshold: number;
  visual_Sparks: {
    frameCount: number;
    speed: number;
    loop: boolean;
    spritesheetUrl?: string;
  };
  visual_Debris?: Array<{ 
    assetUrl: string; 
    count: [number, number]; 
    velocityRange: [number, number]; 
  }>;
  sound_Impact_AssetPrefix: string;
  cameraShake?: { 
    intensity: number; 
    durationMs: number; 
  };
  shipDamage_Hull_Factor: number;
}

export interface ShipMovementEffects {
  speedVisualEffects: SpeedVisualEffect[];
  collisionEffects: CollisionEffect[];
}

// Environmental interactions
export interface GravitySourceParams {
  celestialBodyType: string;
  gravityWellRadiusFactor: number;
  maxGravityForce: number;
  falloffCurve: 'Linear' | 'InverseSquare' | 'Custom';
  visualIndicator_OnHUD?: {
    assetUrl: string;
    colorByStrength?: boolean;
  };
  slingshotManeuver_Possible: boolean;
}

export interface NebulaInteractionParams {
  nebulaTypeKey: string;
  dragFactor?: number;
  sensorInterferenceFactor?: number;
  visibilityReductionFactor?: number;
  electricalDischargeDamageChance?: number;
}

export interface AsteroidFieldInteractionParams {
  fieldDensity: 'Low' | 'Medium' | 'High' | 'VeryHigh_Dangerous';
  smallAsteroidCollision_DamageRange: [number, number];
  largeAsteroidCollision_IsStandardCollision: boolean;
  debrisObscurityFactor?: number;
}

export interface WarpTravelParams {
  chargeUpTime_Seconds_Base: number;
  chargeUp_VulnerabilityFactor: number;
  chargeUp_VisualEffect_OnShip: {
    frameCount: number;
    speed: number;
    loop: boolean;
    spritesheetUrl?: string;
  };
  chargeUp_SoundEffect_Loop: string;
  jumpSequence_VisualEffect_Tunnel: {
    animation: {
      frameCount: number;
      speed: number;
      loop: boolean;
    };
    spritesheetUrl_TunnelEffect: string;
    distortionShader?: any;
  };
  jumpSequence_SoundEffect_Enter: string;
  jumpSequence_SoundEffect_TravelLoop: string;
  jumpSequence_SoundEffect_Exit: string;
  interruptionConditions: Array<'HeavyDamageReceived' | 'StrongGravityField' | 'EMP_Effect'>;
  interruption_VisualEffect: {
    frameCount: number;
    speed: number;
    loop: boolean;
    spritesheetUrl?: string;
  };
  interruption_SoundEffect: string;
  fuelCost_PerLightYear_Base: number;
}

export interface EnvironmentalInteractionPhysics {
  gravitySources: GravitySourceParams[];
  nebulaInteractions: NebulaInteractionParams[];
  asteroidFieldInteractions: AsteroidFieldInteractionParams[];
  warpTravel: WarpTravelParams;
}

export interface MovementModuleEffect {
  moduleId_Pattern: string;
  statModifiers: Array<{
    statKey: string;
    baseValue_Override?: number;
    multiplier?: number;
    addition?: number;
  }>;
  newAbilitiesGranted?: string[];
  visualEffect_Override_EngineExhaust?: any;
}

export interface MovementModuleEffects {
  moduleEffects: MovementModuleEffect[];
}

export interface ShipMovementState {
  position: Vector2D;
  rotation: number;
  velocity: Vector2D;
  rotationalVelocity: number;
  thrusting: boolean;
  strafingLeft: boolean;
  strafingRight: boolean;
  braking: boolean;
  boosting: boolean;
  rotatingLeft: boolean;
  rotatingRight: boolean;
  flightAssistActive: boolean;
  inWarp: boolean;
  chargingWarp: boolean;
}

export interface ShipMovementContextType {
  movementPhysicsConfig: ShipMovementPhysicsConfig;
  controlSchemes: ShipControlSchemes;
  movementEffects: ShipMovementEffects;
  environmentalInteractions: EnvironmentalInteractionPhysics;
  movementModuleEffects: MovementModuleEffects;
  currentMovementState: ShipMovementState;
  
  setThrusting: (isThrusting: boolean) => void;
  setBraking: (isBraking: boolean) => void;
  setStrafeLeft: (isStrafing: boolean) => void;
  setStrafeRight: (isStrafing: boolean) => void;
  setRotatingLeft: (isRotating: boolean) => void;
  setRotatingRight: (isRotating: boolean) => void;
  setBoosting: (isBoosting: boolean) => void;
  setFlightAssist: (isActive: boolean) => void;
  initiateWarpCharge: () => void;
  cancelWarpCharge: () => void;
  
  applyExternalForce: (force: Vector2D) => void;
  applyCollision: (objectMass: number, impactVelocity: Vector2D) => void;
  enterGravityField: (sourceParams: GravitySourceParams, distance: number) => void;
  exitGravityField: () => void;
  enterNebula: (nebulaParams: NebulaInteractionParams) => void;
  exitNebula: () => void;
}
