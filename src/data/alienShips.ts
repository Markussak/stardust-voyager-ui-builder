
import { ShipClassDefinition } from '@/types/ships-extended';
import { AlienShipDesignLanguage } from '@/types/aliens';
import { getAlienRaceById } from './alienRaces';

// Define alien ship classes
export const alienShipClasses: ShipClassDefinition[] = [
  // Sylvan ships
  {
    classId: "sylvan_seedling_fighter",
    classNameKey: "shipclass.sylvan_seedling.name",
    defaultClassName: "Seedling Fighter",
    category: "Combat_Fighter",
    roleDescriptionKey: "shipclass.sylvan_seedling.desc",
    defaultRoleDescription: "Rychlý organický bojový stroj, využívající fotosyntézu k regeneraci energie a biotoxiny jako zbraně.",
    sizeCategory: "SmallCraft",
    pixelSize_ApproxRange_Px: { x: 40, y: 60 },
    baseSprite_AssetPath_Template: "/assets/ships/aliens/sylvans/seedling_fighter_{variant}.png",
    baseSpriteVariantCount: 3,
    visualDesignCues: [
      "Organický trup připomínající semeno nebo list",
      "Bioluminiscenční prvky podél celé konstrukce",
      "Pohyblivé výrůstky jako listeny schopné odrážet energii",
      "Výdechy pylového pohonu zanechávající svítivou stopu"
    ],
    baseStats: {
      hullPoints_Range: [60, 100],
      shieldPoints_Base_Range: [30, 60],
      armorRating_Base_Range: [10, 25],
      maxSpeed_UnitsPerSec_Range: [140, 180],
      acceleration_UnitsPerSec2_Range: [50, 70],
      turnRate_DegPerSec_Range: [90, 120],
      cargoCapacity_Units_Range: [5, 10],
      sensorRange_Units_Range: [1500, 2000],
      powerOutput_MW_Range: [20, 35],
      baseMass_Tonnes_Range: [15, 25],
      crewCapacity_MinMax: [1, 1],
      fuelCapacity_Range: [50, 80],
      hardpointSlots: {
        weapon_small_Range: [1, 2],
        weapon_medium_Range: [0, 1],
        weapon_large_Range: [0, 0],
        defense_Range: [1, 1],
        system_Range: [1, 2],
        utility_Range: [1, 1]
      },
      cost_Credits_ApproxRange: [15000, 25000]
    },
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/aliens/sylvan_photosynthetic_hum_loop.wav",
      engine_Thrust_Loop: "sfx/engines/aliens/sylvan_pollen_boost_loop.wav"
    }
  },
  {
    classId: "sylvan_grovekeeper_frigate",
    classNameKey: "shipclass.sylvan_grovekeeper.name",
    defaultClassName: "Grovekeeper Frigate",
    category: "Combat_Frigate",
    roleDescriptionKey: "shipclass.sylvan_grovekeeper.desc",
    defaultRoleDescription: "Středně velká bioorganická loď kombinující schopnosti podpory a regenerace s obrannou silou starých stromů.",
    sizeCategory: "MediumShip",
    pixelSize_ApproxRange_Px: { x: 80, y: 140 },
    baseSprite_AssetPath_Template: "/assets/ships/aliens/sylvans/grovekeeper_frigate_{variant}.png",
    baseSpriteVariantCount: 3,
    visualDesignCues: [
      "Masivní kmen jako hlavní část trupu",
      "Silné větve nesoucí obranné systémy a senzory",
      "Kořenové výběžky pro manipulaci s předměty",
      "Bioluminiscenční květy jako energetické zdroje",
      "Kůra na povrchu fungující jako pancéřování"
    ],
    baseStats: {
      hullPoints_Range: [300, 450],
      shieldPoints_Base_Range: [150, 250],
      armorRating_Base_Range: [40, 60],
      maxSpeed_UnitsPerSec_Range: [80, 100],
      acceleration_UnitsPerSec2_Range: [20, 30],
      turnRate_DegPerSec_Range: [40, 60],
      cargoCapacity_Units_Range: [50, 80],
      sensorRange_Units_Range: [2500, 3500],
      powerOutput_MW_Range: [80, 120],
      baseMass_Tonnes_Range: [180, 250],
      crewCapacity_MinMax: [5, 10],
      fuelCapacity_Range: [120, 180],
      hardpointSlots: {
        weapon_small_Range: [2, 4],
        weapon_medium_Range: [1, 2],
        weapon_large_Range: [0, 1],
        defense_Range: [2, 3],
        system_Range: [2, 3],
        utility_Range: [1, 2]
      },
      cost_Credits_ApproxRange: [100000, 180000]
    },
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/aliens/sylvan_deep_forest_hum_loop.wav",
      engine_Thrust_Loop: "sfx/engines/aliens/sylvan_growth_surge_loop.wav",
      ship_Ambient_Interior_Loop: "sfx/ambient/aliens/sylvan_rustling_leaves_interior_loop.wav"
    }
  },
  // Shard Collective ships
  {
    classId: "shard_crystal_interceptor",
    classNameKey: "shipclass.shard_interceptor.name",
    defaultClassName: "Crystal Interceptor",
    category: "Combat_Fighter",
    roleDescriptionKey: "shipclass.shard_interceptor.desc",
    defaultRoleDescription: "Rychlá krystalická stíhačka s vysokou manévrovatelností a energetickými zbraněmi.",
    sizeCategory: "SmallCraft",
    pixelSize_ApproxRange_Px: { x: 35, y: 50 },
    baseSprite_AssetPath_Template: "/assets/ships/aliens/shard_collective/crystal_interceptor_{variant}.png",
    baseSpriteVariantCount: 3,
    visualDesignCues: [
      "Ostrá, geometrická konstrukce z průhledných krystalů",
      "Pulzující energetické jádro viditelné skrz trup",
      "Zbraňové systémy integrované přímo do krystalické struktury",
      "Trup bez viditelných spojů, jako by byl vybroušen z jednoho kusu"
    ],
    baseStats: {
      hullPoints_Range: [40, 80],
      shieldPoints_Base_Range: [100, 160],
      armorRating_Base_Range: [10, 20],
      maxSpeed_UnitsPerSec_Range: [160, 200],
      acceleration_UnitsPerSec2_Range: [60, 85],
      turnRate_DegPerSec_Range: [100, 130],
      cargoCapacity_Units_Range: [5, 10],
      sensorRange_Units_Range: [2000, 2500],
      powerOutput_MW_Range: [40, 60],
      baseMass_Tonnes_Range: [10, 18],
      crewCapacity_MinMax: [1, 1],
      fuelCapacity_Range: [40, 60],
      hardpointSlots: {
        weapon_small_Range: [2, 3],
        weapon_medium_Range: [0, 0],
        weapon_large_Range: [0, 0],
        defense_Range: [1, 1],
        system_Range: [1, 1],
        utility_Range: [0, 1]
      },
      cost_Credits_ApproxRange: [18000, 30000]
    },
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/aliens/shard_crystal_resonance_idle_loop.wav",
      engine_Thrust_Loop: "sfx/engines/aliens/shard_energy_surge_loop.wav"
    }
  },
  // Krall Hegemony ships
  {
    classId: "krall_hive_fighter",
    classNameKey: "shipclass.krall_fighter.name",
    defaultClassName: "Hive Fighter",
    category: "Combat_Fighter",
    roleDescriptionKey: "shipclass.krall_fighter.desc",
    defaultRoleDescription: "Agresivní bojová stíhačka s organickým designem inspirovaným hmyzem, zaměřená na boj zblízka.",
    sizeCategory: "SmallCraft",
    pixelSize_ApproxRange_Px: { x: 45, y: 65 },
    baseSprite_AssetPath_Template: "/assets/ships/aliens/krall_hegemony/hive_fighter_{variant}.png",
    baseSpriteVariantCount: 4,
    visualDesignCues: [
      "Segmentovaný trup připomínající hmyzí tělo",
      "Ostré, drapákovité výstupky jako zbraně",
      "Červené světelné prvky připomínající složené oči",
      "Výdechy motorů zanechávající zelenkavou stopu"
    ],
    baseStats: {
      hullPoints_Range: [100, 150],
      shieldPoints_Base_Range: [20, 40],
      armorRating_Base_Range: [40, 60],
      maxSpeed_UnitsPerSec_Range: [140, 170],
      acceleration_UnitsPerSec2_Range: [45, 65],
      turnRate_DegPerSec_Range: [80, 100],
      cargoCapacity_Units_Range: [5, 10],
      sensorRange_Units_Range: [1200, 1800],
      powerOutput_MW_Range: [25, 40],
      baseMass_Tonnes_Range: [20, 30],
      crewCapacity_MinMax: [1, 2],
      fuelCapacity_Range: [60, 90],
      hardpointSlots: {
        weapon_small_Range: [2, 3],
        weapon_medium_Range: [0, 1],
        weapon_large_Range: [0, 0],
        defense_Range: [0, 1],
        system_Range: [1, 1],
        utility_Range: [0, 0]
      },
      cost_Credits_ApproxRange: [12000, 22000]
    },
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/aliens/krall_chittering_idle_loop.wav",
      engine_Thrust_Loop: "sfx/engines/aliens/krall_rapid_wing_buzz_loop.wav"
    }
  }
];

// Helper function to get alien ship by ID
export const getAlienShipById = (shipId: string): ShipClassDefinition | undefined => {
  return alienShipClasses.find(ship => ship.classId === shipId);
};

// Helper function to get all ships for a specific alien race
export const getShipsByAlienRace = (raceId: string): ShipClassDefinition[] => {
  const race = getAlienRaceById(raceId);
  if (!race) return [];
  
  const shipIds = race.techAndStyle.uniqueShipClasses_Ids;
  return alienShipClasses.filter(ship => shipIds.includes(ship.classId));
};

// Ensure alien ship classes are included in imported ship classes
export const extendShipClasses = (existingClasses: ShipClassDefinition[]): ShipClassDefinition[] => {
  return [...existingClasses, ...alienShipClasses];
};
