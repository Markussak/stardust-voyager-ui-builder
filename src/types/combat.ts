
import { FactionId } from "./diplomacy";
import { ShipModuleData } from "./ship-editor";

// Basic combat types
export enum DamageType {
  Kinetic = "Kinetic",           // Projectiles, physical damage
  Energy_Laser = "Energy_Laser",
  Energy_Plasma = "Energy_Plasma",
  Explosive_Area = "Explosive_Area",
  EMP_SystemDisable = "EMP_SystemDisable", // Disables systems, not hull damage
  Thermal_Heat = "Thermal_Heat",
  Radiation = "Radiation",
  Acid_Corrosive = "Acid_Corrosive", // For some exotic weapons/environments
  Psionic_Mental = "Psionic_Mental"  // For Nexus Cult or unique entities
}

export interface DamageInstance {
  amount: number;
  type: DamageType;
  sourceEntityId?: string; // Who caused the damage
  criticalHitChance?: number; // 0-1
  criticalHitMultiplier?: number; // e.g. 1.5x, 2x
  armorPenetrationFactor?: number; // 0-1 (0 = no penetration, 1 = full armor penetration)
  shieldBypassChance?: number; // 0-1 (chance to ignore shields)
}

// Animation params for visual effects
export interface AnimationParams {
  frameCount: number;
  speed: number; // frames per second or normalized speed (0-1)
  loop: boolean;
  spritesheetUrl?: string;
  soundEffect_Loop?: string;
  soundEffect_OneShot?: string;
}

// Combat component for entities capable of combat
export interface CombatComponent {
  entityId: string;
  health_Hull_Current: number;
  health_Hull_Max: number;
  shield_Current?: number;
  shield_Max?: number;
  shield_RegenRatePerSec?: number;
  shield_RechargeDelaySec?: number; // Time without hits before shield starts recharging
  armor_Rating?: number; // Absolute damage reduction or % reduction
  targetEntityId?: string; // Currently targeted entity
  isHostileToPlayer: boolean;
  factionId: FactionId; // From Prompt 12
  // References to equipped weapons and defense systems (will be defined as modules)
  equippedWeaponSlots: Array<{ 
    slotId: string; 
    weaponModuleId: string; 
    currentAmmo?: number; 
    currentHeat?: number; 
  }>;
  equippedDefenseSlots: Array<{ 
    slotId: string; 
    defenseModuleId: string; 
  }>;
  equippedAbilitySlots?: Array<{ 
    slotId: string; 
    abilityModuleId: string; 
    cooldownRemainingSec?: number; 
  }>;
  aiBehaviorProfileId?: string; // For NPCs, reference to combat behavior profile
}

// Targeting system configuration
export interface TargetingSystemConfig {
  defaultLockOnType: 'SoftLock_ClosestHostile' | 'Manual_CycleTargets' | 'PlayerAim_Free';
  lockOnRange_Base_Units: number; // Base targeting range
  lockOnAngle_Cone_Deg?: number; // Cone angle for automatic targeting in front of the ship
  targetLeadPrediction: boolean; // Whether the system calculates lead for projectiles
  targetSwitchDelayMs?: number; // Minimum delay between target switching
  targetInfoDisplay_HUD_ElementId: string; // Reference to HUD element (from Prompt 9)
}

// Weapon energy configuration
export interface WeaponEnergyConfig {
  sharedShipEnergyPool_StoreKey: string; // Reference to the ship's global energy
  weaponOverheatMechanic?: {
    heatPerShot: number; // How much heat a shot generates
    maxHeatCapacity: number;
    cooldownRate_HeatPerSec: number; // How quickly the weapon cools down
    visualEffect_Overheating_Asset: string; // e.g. red weapon glow, escaping steam
    soundEffect_Overheating_Loop?: string;
    soundEffect_CooldownComplete?: string;
  };
}

// Ammunition system configuration
export interface AmmunitionSystemConfig {
  // Ammo type definitions will be part of weapon/module definitions
  lowAmmoWarning_ThresholdPercent: number; // When to display low ammo warning
  lowAmmoWarning_HUD_Indicator: string; // How the warning is displayed on the HUD
  reloadMechanic_IfApplicable?: 'Automatic_From_Cargo' | 'Manual_At_Station' | 'Per_Weapon_Clip';
}

// Main combat system configuration
export interface CombatSystemConfig {
  id: string;
  systemName: string;
  targetingSystem: TargetingSystemConfig;
  weaponEnergySystem?: WeaponEnergyConfig; // If energy weapons share ship's energy
  ammunitionSystem?: AmmunitionSystemConfig; // If weapons with ammo exist
  damageCalculationModel: string; // Description of the damage model
  criticalHitSystem: {
    baseCritChance: number; // Can be modified by skills/modules
    baseCritMultiplier: number;
    visualEffect_CritHit: AnimationParams; // Special flash/sound for critical hits
  };
  firingArcs_Enabled: boolean; // Whether weapons (especially turrets) have limited firing arcs
}

// Weapon definitions
export interface ProjectileVisuals {
  assetUrl_SpritesheetOrTexture: string; // Projectile sprite or spritesheet for animated projectile
  animation_Flight?: AnimationParams; // For rotating projectiles, plasma pulses
  trailEffect?: { // Trail behind the projectile
    type: 'Particle_Stream' | 'Ribbon_Distortion' | 'Solid_Line';
    particleAsset?: string;
    color: string;
    lengthFactor: number; // Multiple of projectile length
    durationMs: number; // How long the trail is visible
  };
  lightEmission?: { color: string; intensity: number; radiusPx: number; }; // Light emitted by the projectile
}

export interface BeamVisuals {
  beamTexture_AssetUrl: string; // Texture for continuous beam
  beamWidth_Px: number;
  beamColor: string;
  startEffect_MuzzleFlash: AnimationParams; // Effect at barrel when starting to fire
  endEffect_ImpactOnTarget: AnimationParams; // Effect on target, while beam lasts
  beamFluctuationAnimation?: AnimationParams; // Gentle waving/pulsing of the beam
}

export interface WeaponModuleDefinition extends ShipModuleData {
  weaponType: 'Laser_Pulse' | 'Laser_Beam_Continuous' | 'PlasmaCannon_Projectile' | 
              'Kinetic_Autocannon' | 'Kinetic_HeavyCannon' | 'Railgun_HighVelocity' | 
              'MissileLauncher_Homing' | 'TorpedoLauncher_Unguided' | 'MineLayer' | 
              'EMP_PulseEmitter' | 'Laser_PointDefense' | 'Kinetic_PointDefense_Flak';
  damageOutput: DamageInstance; // Base damage per hit/second
  rateOfFire_PerSec?: number; // For pulse weapons/projectiles
  projectileSpeed_UnitsPerSec?: number; // For projectile weapons
  range_Effective_Units: number; // Effective range
  energyCost_PerShotOrSec?: number;
  heatGenerated_PerShotOrSec?: number;
  ammoCapacity_PerClip?: number; // If it has a clip
  ammoType_ItemId?: string; // ID of ammo type (from BaseItemData)
  homingFactor_ForMissiles?: number; // 0-1, how well the missile tracks the target
  explosionRadius_ForExplosives_Units?: number;
  areaOfEffect_Shape?: 'Circle' | 'Cone';
  firingArc_Deg?: number; // For turrets, e.g. 180, 360
  turnSpeed_Turret_DegPerSec?: number; // Turret rotation speed
  projectileVisuals?: ProjectileVisuals; // For projectile weapons
  beamVisuals?: BeamVisuals; // For beam weapons
  muzzleFlash_OnShip_Animation: AnimationParams; // Flash on ship when firing
  soundEffect_Fire: string; // Sound of firing
  soundEffect_Impact?: string; // Sound of impact (may also be in damage definition)
  soundEffect_ProjectileFlight_Loop?: string; // For missiles, plasma
  targetingLogic?: 'Automatic_ClosestMissile_Or_Fighter'; // For point defense
  fireRate_High?: boolean; // For point defense
  damage_Low_PerShot?: boolean; // For point defense
}

// Shield visual effects
export interface ShieldVisualEffects {
  activeIdle_Animation: AnimationParams; // Translucent bubble, hexagonal grid
  activeIdle_TextureAsset: string;
  activeIdle_Color: string;
  impact_Animation: AnimationParams; // Ripple, sparking at impact location
  impact_GlowColor: string;
  failure_Animation: AnimationParams; // Breaking, power failure
  failure_SoundEffect: string;
  recharge_Animation?: AnimationParams; // Visual recharge effect
  recharge_SoundEffect_Loop?: string;
}

// Shield module definition
export interface ShieldModuleDefinition extends ShipModuleData {
  shieldCapacity_Base: number;
  shieldRegenRate_Base_PerSec: number;
  shieldRechargeDelay_Base_Sec: number;
  damageResistances?: Partial<Record<DamageType, number>>; // e.g. { Energy_Laser: 0.25 } (25% resistance)
  visualEffects: ShieldVisualEffects;
}

// Armor module definition
export interface ArmorModuleDefinition extends ShipModuleData {
  armorValue_Added: number; // How many armor points it adds
  damageReductionFactor?: number; // Alternatively, % damage reduction
  kineticResistanceFactor?: number;
  energyResistanceFactor?: number;
  weight_Added_Tonnes: number; // Armor adds weight
  visualChangeToShipSprite?: string; // "Adds visible armor plates to ship model" (advanced)
}

// Combat ability definition
export interface CombatAbilityDefinition extends ShipModuleData {
  abilityId: string;
  abilityNameKey: string;
  defaultAbilityName: string;
  abilityDescriptionKey: string;
  defaultAbilityDescription: string;
  abilityType: 'EMP_Burst' | 'Shield_Overcharge' | 'Cloaking_Device' | 
               'Micro_Jump_Drive' | 'Repair_Drones_Combat' | 'Target_Painter' | 
               'Weapon_Power_Boost';
  durationSec?: number; // Duration of effect
  cooldownSec: number;
  energyCost_Activation?: number;
  areaOfEffect_Units?: number; // For AoE abilities like EMP
  visualEffect_Activation: AnimationParams; // Unique visual effect upon activation
  visualEffect_Active_Loop?: AnimationParams; // Effect while the ability is active
  soundEffect_Activation: string;
  // Specific parameters for each ability type:
  emp_SystemDisableDurationSec?: number;
  shield_BoostAmountPercent?: number;
  cloaking_DetectionDifficultyFactor?: number; // How difficult it is to detect the cloaked ship
  microJump_RangeUnits?: number;
}

// AI combat profile definition
export interface CombatAIProfileDefinition {
  profileId: string;
  description: string;
  preferredRange_Units: 'Close' | 'Medium' | 'Long';
  aggressionLevel: number; // 0-1
  maneuveringStyle: 'Evasive_Dodging' | 'Strafe_Orbiting' | 'Direct_Approach' | 'Keep_Distance';
  weaponUsagePriority: Array<{
    weaponType: WeaponModuleDefinition['weaponType'];
    priority: number;
    targetPreference?: 'Shields' | 'Hull' | 'Engines';
  }>;
  abilityUsage_Triggers: Array<{
    abilityId: string;
    condition: string;
    chanceToUse_Percent?: number;
  }>;
  retreatCondition: string;
  coordination_WithAllies?: 'Focus_Same_Target' | 'Protect_HighValue_Ally' | 'Flanking_Maneuvers';
  skillLevel_Aiming: number; // 0-1
  skillLevel_Evasion: number; // 0-1
}
