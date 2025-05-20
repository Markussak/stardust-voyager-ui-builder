import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CombatSystemConfig, 
  DamageInstance, 
  DamageType, 
  WeaponModuleDefinition,
  CombatComponent,
  FactionId
} from '@/types/combat';
import { toast } from "sonner";
import { useShipMovement } from './ShipMovementContext';
import { ShipModuleData, ShipModuleType } from '@/types/ship-editor';
import { ItemRarity } from '@/types/inventory';

// Default combat system configuration
const defaultCombatSystemConfig: CombatSystemConfig = {
  id: "core_combat_system",
  systemName: "Bojový Systém v Reálném Čase",
  targetingSystem: {
    defaultLockOnType: "SoftLock_ClosestHostile",
    lockOnRange_Base_Units: 4000,
    lockOnAngle_Cone_Deg: 45,
    targetLeadPrediction: true,
    targetSwitchDelayMs: 500,
    targetInfoDisplay_HUD_ElementId: "hud_target_info_panel"
  },
  weaponEnergySystem: {
    sharedShipEnergyPool_StoreKey: "playerShip.currentEnergy",
    weaponOverheatMechanic: {
      heatPerShot: 10,
      maxHeatCapacity: 100,
      cooldownRate_HeatPerSec: 20,
      visualEffect_Overheating_Asset: "assets/images/fx/weapons/overheat_steam_anim.png",
      soundEffect_Overheating_Loop: "sfx/weapons/weapon_overheating_hiss_loop.wav",
      soundEffect_CooldownComplete: "sfx/ui/weapon_cooldown_complete.wav"
    }
  },
  ammunitionSystem: {
    lowAmmoWarning_ThresholdPercent: 0.2,
    lowAmmoWarning_HUD_Indicator: "BlinkingRed_AmmoCounter",
    reloadMechanic_IfApplicable: "Automatic_From_Cargo"
  },
  damageCalculationModel: "Shields absorb damage first (with possible resistances/vulnerabilities to types). If shields fall, damage is reduced by armor (with possible penetration). Remainder goes to hull. EMP primarily damages shields/systems.",
  criticalHitSystem: {
    baseCritChance: 0.05,
    baseCritMultiplier: 1.5,
    visualEffect_CritHit: {
      frameCount: 8,
      speed: 20,
      loop: false,
      spritesheetUrl: "assets/images/fx/impacts/critical_hit_flash_sheet.png",
      soundEffect_OneShot: "sfx/impacts/critical_hit_impact.wav"
    }
  },
  firingArcs_Enabled: true
};

// Sample weapon definitions for testing
const sampleWeaponDefinitions: Record<string, WeaponModuleDefinition> = {
  "weapon_laser_pulse_mk1": {
    id: "weapon_laser_pulse_mk1",
    name: "Pulzní Laser Mk.I",
    itemId: "weapon_laser_pulse_mk1",
    defaultItemName: "Pulzní Laser Mk.I",
    defaultItemDescription: "Standardní laserový kanón pro menší lodě. Spolehlivý a s přiměřeným výkonem.",
    description: "Standardní laserový kanón pro menší lodě. Spolehlivý a s přiměřeným výkonem.",
    type: "module",
    itemIconKey: "module_weapon_laser_mk1",
    itemTypeKey: "item.type.ship_module",
    defaultItemType: "Lodní modul",
    isStackable: false,
    baseValue_Credits: 1500,
    weightPerUnit: 8,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.Weapon_Laser_Small,
    slotTypeRequired: "Weapon_Small",
    weaponType: "Laser_Pulse",
    damageOutput: {
      amount: 8,
      type: DamageType.Energy_Laser,
      criticalHitChance: 0.05,
      shieldBypassChance: 0.1
    },
    rateOfFire_PerSec: 4,
    projectileSpeed_UnitsPerSec: 2000,
    range_Effective_Units: 3000,
    energyCost_PerShotOrSec: 5,
    heatGenerated_PerShotOrSec: 3,
    projectileVisuals: {
      assetUrl_SpritesheetOrTexture: "assets/images/fx/projectiles/laser_pulse_red_small_sheet.png",
      animation_Flight: { frameCount: 4, speed: 30, loop: false },
      trailEffect: { type: "Solid_Line", color: "#FF666680", lengthFactor: 2.0, durationMs: 100 },
      lightEmission: { color: "#FF3333", intensity: 0.5, radiusPx: 50 }
    },
    muzzleFlash_OnShip_Animation: {
      frameCount: 3,
      speed: 20,
      loop: false,
      spritesheetUrl: "assets/images/fx/weapons/muzzle_flash_laser_small_sheet.png"
    },
    soundEffect_Fire: "sfx/weapons/laser_fire_pulse_small_01.wav",
    soundEffect_Impact: "sfx/impacts/laser_impact_shield_small.wav",
    statModifiers: [
      { statKey: 'weaponPower_Combined', changeAbsolute: 8, description: '+8 Výkon zbraně' }
    ]
  },
  "weapon_missile_launcher_basic_s": {
    id: "weapon_missile_launcher_basic_s",
    name: "Základní Raketomet (S)",
    itemId: "weapon_missile_launcher_basic_s",
    defaultItemName: "Základní Raketomet (S)",
    defaultItemDescription: "Jednoduchý odpalovač řízených raket. Ideální pro první úder.",
    description: "Jednoduchý odpalovač řízených raket. Ideální pro první úder.",
    type: "module",
    itemIconKey: "module_weapon_missile_small",
    itemTypeKey: "item.type.ship_module",
    defaultItemType: "Lodní modul",
    isStackable: false,
    baseValue_Credits: 2500,
    weightPerUnit: 10,
    rarity: ItemRarity.Common,
    moduleType: ShipModuleType.Weapon_Missile_Large,
    slotTypeRequired: "Weapon_Small",
    weaponType: "MissileLauncher_Homing",
    damageOutput: {
      amount: 50,
      type: DamageType.Explosive_Area,
    },
    explosionRadius_ForExplosives_Units: 30,
    rateOfFire_PerSec: 0.5,
    projectileSpeed_UnitsPerSec: 400,
    range_Effective_Units: 5000,
    ammoCapacity_PerClip: 4,
    ammoType_ItemId: "ammo_missile_basic",
    homingFactor_ForMissiles: 0.7,
    projectileVisuals: {
      assetUrl_SpritesheetOrTexture: "assets/images/fx/projectiles/missile_basic_anim_sheet.png",
      animation_Flight: { frameCount: 8, speed: 10, loop: true },
      trailEffect: {
        type: "Particle_Stream",
        particleAsset: "assets/images/particles/smoke_trail_white.png",
        color: "#FFFFFF80",
        lengthFactor: 10,
        durationMs: 2000
      }
    },
    muzzleFlash_OnShip_Animation: {
      frameCount: 6,
      speed: 15,
      loop: false,
      spritesheetUrl: "assets/images/fx/weapons/muzzle_flash_missile_launch_sheet.png"
    },
    soundEffect_Fire: "sfx/weapons/missile_launch_01.wav",
    soundEffect_Impact: "sfx/explosions/explosion_medium_01.wav",
    soundEffect_ProjectileFlight_Loop: "sfx/projectiles/missile_flight_loop.wav",
    statModifiers: [
      { statKey: 'weaponPower_Combined', changeAbsolute: 20, description: '+20 Výkon zbraně' }
    ]
  }
};

// Mock combat entities (player and enemies)
const initialPlayerCombatState: CombatComponent = {
  entityId: "player_ship",
  health_Hull_Current: 100,
  health_Hull_Max: 100,
  shield_Current: 50,
  shield_Max: 50,
  shield_RegenRatePerSec: 1,
  shield_RechargeDelaySec: 3,
  armor_Rating: 10,
  isHostileToPlayer: false,
  factionId: "player" as FactionId,
  equippedWeaponSlots: [
    { slotId: "weapon_slot_front_small_01", weaponModuleId: "weapon_laser_pulse_mk1", currentHeat: 0 }
  ],
  equippedDefenseSlots: [
    { slotId: "defense_slot_01", defenseModuleId: "shield_generator_basic" }
  ]
};

interface CombatSystemContextType {
  config: CombatSystemConfig;
  playerCombatState: CombatComponent;
  activeEnemies: CombatComponent[];
  selectedTarget: CombatComponent | null;
  weaponDefinitions: Record<string, WeaponModuleDefinition>;
  isInCombat: boolean;
  // Combat actions
  fireWeapon: (slotId: string) => void;
  selectTarget: (entityId: string) => void;
  clearTarget: () => void;
  calculateDamage: (source: CombatComponent, target: CombatComponent, weaponDef: WeaponModuleDefinition) => DamageInstance;
  applyDamage: (target: CombatComponent, damage: DamageInstance) => void;
  // Combat state handlers
  enterCombat: () => void;
  exitCombat: () => void;
  // Utility functions
  getWeaponCooldownPercentage: (slotId: string) => number;
  getWeaponReadyState: (slotId: string) => 'ready' | 'cooling' | 'overheated' | 'no_ammo' | 'no_energy';
  getDistanceToTarget: (targetId: string) => number | null;
  isTargetInWeaponRange: (weaponSlotId: string, targetId: string) => boolean;
}

const CombatSystemContext = createContext<CombatSystemContextType | undefined>(undefined);

export interface CombatSystemProviderProps {
  children: ReactNode;
}

export const CombatSystemProvider: React.FC<CombatSystemProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<CombatSystemConfig>(defaultCombatSystemConfig);
  const [playerCombatState, setPlayerCombatState] = useState<CombatComponent>(initialPlayerCombatState);
  const [activeEnemies, setActiveEnemies] = useState<CombatComponent[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<CombatComponent | null>(null);
  const [isInCombat, setIsInCombat] = useState(false);
  const [weaponCooldowns, setWeaponCooldowns] = useState<Record<string, number>>({});
  const { currentMovementState } = useShipMovement();

  // Initialize weapon cooldowns
  useEffect(() => {
    const initialCooldowns: Record<string, number> = {};
    playerCombatState.equippedWeaponSlots.forEach(slot => {
      initialCooldowns[slot.slotId] = 0;
    });
    setWeaponCooldowns(initialCooldowns);
  }, [playerCombatState.equippedWeaponSlots]);

  // Shield regeneration system
  useEffect(() => {
    if (!isInCombat) return;

    const shieldRegenInterval = setInterval(() => {
      setPlayerCombatState(prev => {
        if (prev.shield_Current === undefined || 
            prev.shield_Max === undefined || 
            prev.shield_RegenRatePerSec === undefined ||
            prev.shield_Current >= prev.shield_Max) {
          return prev;
        }

        return {
          ...prev,
          shield_Current: Math.min(
            prev.shield_Current + prev.shield_RegenRatePerSec,
            prev.shield_Max
          )
        };
      });
    }, 1000);

    return () => clearInterval(shieldRegenInterval);
  }, [isInCombat]);

  // Weapon cooldown system
  useEffect(() => {
    if (!isInCombat) return;

    const cooldownInterval = setInterval(() => {
      setWeaponCooldowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(slotId => {
          if (updated[slotId] > 0) {
            updated[slotId] = Math.max(0, updated[slotId] - (1 / 60)); // 60fps assumption
          }
        });
        return updated;
      });
    }, 16); // ~60fps

    return () => clearInterval(cooldownInterval);
  }, [isInCombat]);

  const fireWeapon = (slotId: string) => {
    // Find the weapon slot
    const weaponSlot = playerCombatState.equippedWeaponSlots.find(slot => slot.slotId === slotId);
    if (!weaponSlot) {
      console.error(`Weapon slot ${slotId} not found`);
      return;
    }

    // Get the weapon definition
    const weaponDef = sampleWeaponDefinitions[weaponSlot.weaponModuleId];
    if (!weaponDef) {
      console.error(`Weapon definition for ${weaponSlot.weaponModuleId} not found`);
      return;
    }

    // Check cooldown
    if (weaponCooldowns[slotId] > 0) {
      // Weapon is on cooldown
      return;
    }

    // Check if we have a target
    if (!selectedTarget) {
      toast.error("Žádný cíl není vybrán");
      return;
    }

    // Check if target is in range
    const distance = getDistanceToTarget(selectedTarget.entityId);
    if (distance === null || distance > weaponDef.range_Effective_Units) {
      toast.error("Cíl je mimo dosah");
      return;
    }

    // Set cooldown based on rate of fire
    const cooldownTime = weaponDef.rateOfFire_PerSec ? (1 / weaponDef.rateOfFire_PerSec) : 1;
    setWeaponCooldowns(prev => ({
      ...prev,
      [slotId]: cooldownTime
    }));

    // Apply damage to target
    const damage = calculateDamage(playerCombatState, selectedTarget, weaponDef);
    applyDamage(selectedTarget, damage);

    // Play sound effect and visual effects (would be handled by a more complex system)
    console.log(`Firing ${weaponDef.defaultItemName} at ${selectedTarget.entityId}`);
    toast.info(`Výstřel ${weaponDef.defaultItemName}`);
  };

  const selectTarget = (entityId: string) => {
    const target = activeEnemies.find(enemy => enemy.entityId === entityId);
    if (target) {
      setSelectedTarget(target);
      toast.info(`Cíl vybrán: ${entityId}`);
    } else {
      console.error(`Target ${entityId} not found`);
    }
  };

  const clearTarget = () => {
    setSelectedTarget(null);
    toast.info("Cíl zrušen");
  };

  const calculateDamage = (source: CombatComponent, target: CombatComponent, weaponDef: WeaponModuleDefinition): DamageInstance => {
    // Base damage from weapon
    const baseDamage = { ...weaponDef.damageOutput };
    
    // Apply critical hit if RNG says so
    const rollForCrit = Math.random();
    if (rollForCrit <= (baseDamage.criticalHitChance || config.criticalHitSystem.baseCritChance)) {
      baseDamage.amount *= (baseDamage.criticalHitMultiplier || config.criticalHitSystem.baseCritMultiplier);
      console.log("Critical hit!");
    }
    
    return baseDamage;
  };

  const applyDamage = (target: CombatComponent, damage: DamageInstance) => {
    // Create a copy of the target to modify
    const updatedTarget = { ...target };
    
    let damageAmount = damage.amount;
    
    // Check if damage bypasses shields
    const shieldBypass = Math.random() <= (damage.shieldBypassChance || 0);
    
    // Apply to shields first if they exist and damage doesn't bypass
    if (!shieldBypass && updatedTarget.shield_Current && updatedTarget.shield_Current > 0) {
      // Apply shield damage
      updatedTarget.shield_Current = Math.max(0, updatedTarget.shield_Current - damageAmount);
      
      // If damage exceeds shields, carry over to hull
      if (updatedTarget.shield_Current === 0) {
        damageAmount = Math.max(0, damageAmount - updatedTarget.shield_Current);
      } else {
        // All damage absorbed by shields
        damageAmount = 0;
      }
      
      console.log(`Shield damage: ${damage.amount}, Remaining shields: ${updatedTarget.shield_Current}`);
    }
    
    // If there's still damage after shields or no shields
    if (damageAmount > 0) {
      // Apply armor reduction
      if (updatedTarget.armor_Rating) {
        // Simple armor calculation - reduce by armor rating but consider penetration
        const armorEffectiveness = 1 - (damage.armorPenetrationFactor || 0);
        const damageReduction = updatedTarget.armor_Rating * armorEffectiveness;
        damageAmount = Math.max(0, damageAmount - damageReduction);
      }
      
      // Apply final damage to hull
      updatedTarget.health_Hull_Current = Math.max(0, updatedTarget.health_Hull_Current - damageAmount);
      console.log(`Hull damage: ${damageAmount}, Remaining hull: ${updatedTarget.health_Hull_Current}`);
      
      // Check if target is destroyed
      if (updatedTarget.health_Hull_Current <= 0) {
        console.log(`Target ${target.entityId} destroyed!`);
        toast.success(`Cíl zničen: ${target.entityId}`);
        // Remove target from active enemies (would be handled by a more complex system)
      }
    }
    
    // Update the target in state
    if (target === selectedTarget) {
      setSelectedTarget(updatedTarget);
    }
    
    setActiveEnemies(prev => 
      prev.map(enemy => 
        enemy.entityId === target.entityId ? updatedTarget : enemy
      )
    );
  };

  const enterCombat = () => {
    setIsInCombat(true);
    toast.warning("Vstup do bojového režimu");
    
    // Generate some test enemies
    const testEnemy: CombatComponent = {
      entityId: "enemy_ship_1",
      health_Hull_Current: 80,
      health_Hull_Max: 80,
      shield_Current: 40,
      shield_Max: 40,
      shield_RegenRatePerSec: 0.5,
      isHostileToPlayer: true,
      factionId: "pirates" as FactionId,
      equippedWeaponSlots: [
        { slotId: "weapon_slot_front_small_01", weaponModuleId: "weapon_laser_pulse_mk1" }
      ],
      equippedDefenseSlots: []
    };
    
    setActiveEnemies([testEnemy]);
  };

  const exitCombat = () => {
    setIsInCombat(false);
    setSelectedTarget(null);
    setActiveEnemies([]);
    toast.info("Opuštění bojového režimu");
  };

  const getWeaponCooldownPercentage = (slotId: string): number => {
    const weaponSlot = playerCombatState.equippedWeaponSlots.find(slot => slot.slotId === slotId);
    if (!weaponSlot) return 0;

    const weaponDef = sampleWeaponDefinitions[weaponSlot.weaponModuleId];
    if (!weaponDef || !weaponDef.rateOfFire_PerSec) return 0;

    const totalCooldown = 1 / weaponDef.rateOfFire_PerSec;
    const currentCooldown = weaponCooldowns[slotId] || 0;

    return (currentCooldown / totalCooldown) * 100;
  };

  const getWeaponReadyState = (slotId: string): 'ready' | 'cooling' | 'overheated' | 'no_ammo' | 'no_energy' => {
    const cooldown = weaponCooldowns[slotId];
    if (cooldown && cooldown > 0) return 'cooling';
    
    const weaponSlot = playerCombatState.equippedWeaponSlots.find(slot => slot.slotId === slotId);
    if (!weaponSlot) return 'no_ammo';
    
    const weaponDef = sampleWeaponDefinitions[weaponSlot.weaponModuleId];
    if (!weaponDef) return 'no_ammo';
    
    // Here we could check for ammo, energy, etc.
    // For now, just return 'ready'
    return 'ready';
  };

  const getDistanceToTarget = (targetId: string): number | null => {
    // In a real implementation, this would use actual positions
    // For now, return a mock distance
    return 2000; // 2000 units
  };

  const isTargetInWeaponRange = (weaponSlotId: string, targetId: string): boolean => {
    const weaponSlot = playerCombatState.equippedWeaponSlots.find(slot => slot.slotId === weaponSlotId);
    if (!weaponSlot) return false;
    
    const weaponDef = sampleWeaponDefinitions[weaponSlot.weaponModuleId];
    if (!weaponDef) return false;
    
    const distance = getDistanceToTarget(targetId);
    if (distance === null) return false;
    
    return distance <= weaponDef.range_Effective_Units;
  };

  const contextValue: CombatSystemContextType = {
    config,
    playerCombatState,
    activeEnemies,
    selectedTarget,
    weaponDefinitions: sampleWeaponDefinitions,
    isInCombat,
    // Combat actions
    fireWeapon,
    selectTarget,
    clearTarget,
    calculateDamage,
    applyDamage,
    // Combat state handlers
    enterCombat,
    exitCombat,
    // Utility functions
    getWeaponCooldownPercentage,
    getWeaponReadyState,
    getDistanceToTarget,
    isTargetInWeaponRange
  };

  return (
    <CombatSystemContext.Provider value={contextValue}>
      {children}
    </CombatSystemContext.Provider>
  );
};

export const useCombatSystem = () => {
  const context = useContext(CombatSystemContext);
  if (!context) {
    throw new Error('useCombatSystem must be used within a CombatSystemProvider');
  }
  return context;
};
