
import { GeneralShipDesignPrinciples, ShipClassDefinition, FactionId } from "@/types/ships-extended";

// General ship design principles
export const shipDesignPrinciples: GeneralShipDesignPrinciples = {
  modularityConcept: "Každá třída lodi má unikátní základní trup, design umožňuje vizuální reprezentaci různých nainstalovaných modulů jako jsou zbraně na hardpointech, typy motorů, senzorové antény. Změna modulu by se měla viditelně projevit na spritu lodi.",
  visualClassDistinction: "Hráč musí být schopen rychle identifikovat třídu lodi (stíhač, fregata, křižník atd.) na základě její siluety, velikosti, typického rozmístění motorů a zbraní. Žádné dvě třídy by neměly být snadno zaměnitelné.",
  pixelArtDetailLevel: "Každá loď, bez ohledu na velikost, musí působit jako komplexní stroj s viditelnými panely, nýty, potrubím, anténami, osvětlením, stopami opotřebení a dalšími mikro-detaily. Povrchy nesmí být ploché nebo monotónní.",
  factionalDesignInfluence: "Lodě patřící specifickým frakcím by měly nést jejich charakteristické designové prvky: barevná schémata, specifické tvary trupu, a technologický styl.",
  roleSpecializationImpact: "Design lodi by měl vizuálně naznačovat její primární roli. Průzkumné lodě mohou mít velké senzorové talíře, bojové lodě více viditelných zbraní, transportní lodě objemné nákladové sekce.",
  sizeCategories_Px: {
    SmallCraft_FightersExplorers: "30-70px (délka nebo nejdelší rozměr)",
    MediumShips_CorvettesFrigatesTransports: "71-150px",
    LargeShips_DestroyersCruisersCarriers: "151-300px",
    CapitalShips_BattleshipsDreadnoughts: "301-500px (nebo i více pro unikátní lodě)"
  },
  shipSprite_Perspective: "TopDown_SlightAngledForDetail",
  animationRequirements: [
    "Detailní animace výfuků hlavních motorů (idle, thrust, boost)",
    "Krátké animace zášlehů manévrovacích trysek",
    "Animace rotujících sekcí (pokud má loď např. rotační habitat modul)",
    "Animace vysouvání/zasouvání zbraňových systémů (pokud jsou skryté)",
    "Postupné vizuální poškození trupu",
    "Detailní animace exploze při zničení"
  ]
};

// Ship class definitions
export const shipClasses: ShipClassDefinition[] = [
  // Explorer Class - Nomad (already defined in the game)
  {
    classId: "explorer_scout_nomad",
    classNameKey: "shipclass.nomad.name",
    defaultClassName: "Nomad",
    category: "Exploration",
    roleDescriptionKey: "shipclass.nomad.desc",
    defaultRoleDescription: "Lehký průzkumník, univerzální startovní loď. Ideální pro počáteční průzkum, sběr dat a občasné bojové střety nízkého rizika.",
    sizeCategory: "SmallCraft",
    pixelSize_ApproxRange_Px: { x: 60, y: 120 },
    baseSprite_AssetPath_Template: "assets/ships/nomad_ship.png",
    baseSpriteVariantCount: 1,
    visualDesignCues: [
      "Kompaktní, aerodynamický trup s rozpoznatelnými panely",
      "Velké výfuky motorů pro dobrou manévrovatelnost",
      "Malé senzorové antény na přídi",
      "Několik malých hardpointů pro základní obranné systémy"
    ],
    baseStats: {
      hullPoints_Range: [100, 150],
      shieldPoints_Base_Range: [50, 100],
      armorRating_Base_Range: [10, 20],
      maxSpeed_UnitsPerSec_Range: [120, 150],
      acceleration_UnitsPerSec2_Range: [40, 60],
      turnRate_DegPerSec_Range: [90, 120],
      cargoCapacity_Units_Range: [20, 40],
      sensorRange_Units_Range: [3000, 4500],
      powerOutput_MW_Range: [40, 60],
      baseMass_Tonnes_Range: [60, 80],
      crewCapacity_MinMax: [1, 3],
      fuelCapacity_Range: [100, 150],
      hardpointSlots: {
        weapon_small_Range: [2, 3],
        weapon_medium_Range: [0, 1],
        weapon_large_Range: [0, 0],
        defense_Range: [1, 2],
        system_Range: [1, 2],
        utility_Range: [1, 1]
      },
      cost_Credits_ApproxRange: [25000, 50000],
      requiredTechTier_ToUnlock: 1
    },
    factionStyleOverrides: [
      {
        factionId: FactionId.SolarConfederacy,
        baseColorPalette_Override: { primary: "#336699", secondary: "#B0D0FF", accent: "#FFFFFF", glow: "#33AAFF" },
        decal_FactionLogo_AssetPath: "assets/images/factions/logos/solar_confederacy_logo_small.png"
      },
      {
        factionId: FactionId.KrallEmpire,
        baseColorPalette_Override: { primary: "#504040", secondary: "#703030", accent: "#FF0000", glow: "#FF3300" },
        decal_FactionLogo_AssetPath: "assets/images/factions/logos/krall_empire_logo_small.png"
      }
    ],
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/small_ship_explorer_idle_loop.wav",
      engine_Thrust_Loop: "sfx/engines/small_ship_explorer_thrust_loop.wav",
      engine_Boost_Loop: "sfx/engines/small_ship_explorer_boost_loop.wav",
      hyperdrive_Charge_Loop: "sfx/ship_systems/hyperdrive_charge_small_loop.wav"
    },
    predefinedModels: [
      {
        modelId: "nomad_mk1_player_start",
        modelNameKey: "shipmodel.nomad_mk1.name",
        defaultModelName: "Nomad Mk.I",
        defaultModules_Equipped: [
          { hardpointId: "weapon_slot_front_small_01", moduleId: "laser_cannon_mk1" },
          { hardpointId: "defense_slot_01", moduleId: "shield_generator_basic" },
          { hardpointId: "system_slot_01", moduleId: "engine_basic" }
        ],
        costModifierFactor: 1.0,
        descriptionKey: "shipmodel.nomad_mk1.desc",
        defaultDescription: "Základní model třídy Nomad, dostupný novým pilotům. Spolehlivý a snadno ovladatelný."
      }
    ]
  },

  // Explorer Class - Pathfinder
  {
    classId: "explorer_pathfinder_deepscan",
    classNameKey: "shipclass.pathfinder.name",
    defaultClassName: "Pathfinder",
    category: "Exploration",
    roleDescriptionKey: "shipclass.pathfinder.desc",
    defaultRoleDescription: "Větší průzkumná loď s pokročilými senzory dlouhého dosahu a palubní laboratoří pro analýzu anomálií a vzorků. Vhodná pro dlouhé mise do neznámého vesmíru.",
    sizeCategory: "MediumShip",
    pixelSize_ApproxRange_Px: { x: 70, y: 140 },
    baseSprite_AssetPath_Template: "assets/images/ships/generic/exploration/pathfinder_base_{variant}.png",
    baseSpriteVariantCount: 3,
    visualDesignCues: [
      "Výrazný přední senzorový talíř nebo sada antén",
      "Prosklená sekce pro laboratoř/observatoř",
      "Efektivní, ale ne přehnaně silné motory",
      "Sloty pro vědecké moduly a sondy"
    ],
    baseStats: {
      hullPoints_Range: [150, 250],
      shieldPoints_Base_Range: [100, 200],
      armorRating_Base_Range: [10, 30],
      maxSpeed_UnitsPerSec_Range: [100, 130],
      acceleration_UnitsPerSec2_Range: [25, 35],
      turnRate_DegPerSec_Range: [60, 80],
      cargoCapacity_Units_Range: [50, 100],
      sensorRange_Units_Range: [5000, 8000],
      powerOutput_MW_Range: [60, 90],
      baseMass_Tonnes_Range: [120, 180],
      crewCapacity_MinMax: [3, 6],
      fuelCapacity_Range: [200, 300],
      hardpointSlots: {
        weapon_small_Range: [1, 2],
        weapon_medium_Range: [0, 1],
        weapon_large_Range: [0, 0],
        defense_Range: [1, 2],
        system_Range: [2, 3],
        utility_Range: [1, 2]
      },
      cost_Credits_ApproxRange: [75000, 150000],
      requiredTechTier_ToUnlock: 2
    },
    factionStyleOverrides: [
      {
        factionId: FactionId.SolarConfederacy,
        baseColorPalette_Override: { primary: "#B0D0FF", accent: "#FFFFFF", glow: "#33AAFF" },
        hullTexture_Variant_AssetPath_Template: "assets/images/ships/solar_confederacy/exploration/pathfinder_hull_sleek_{index}.png",
        uniqueVisualEffect: { type: "Glow_Aura", color: "#33AAFF80" },
        decal_FactionLogo_AssetPath: "assets/images/factions/logos/solar_confederacy_logo_small.png"
      }
    ],
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/medium_ship_explorer_idle_loop.wav",
      engine_Thrust_Loop: "sfx/engines/medium_ship_explorer_thrust_loop.wav",
      hyperdrive_Charge_Loop: "sfx/ship_systems/hyperdrive_charge_medium_loop.wav",
      ship_Ambient_Interior_Loop: "sfx/ambient/ship_interior_lab_hum_loop.wav"
    }
  },

  // Combat Class - Frigate
  {
    classId: "combat_frigate_versatile",
    classNameKey: "shipclass.frigate.name",
    defaultClassName: "Fregata",
    category: "Combat_Frigate",
    roleDescriptionKey: "shipclass.frigate.desc",
    defaultRoleDescription: "Univerzální bojová loď, dobrá rovnováha mezi palebnou silou, rychlostí a obranou. Schopná plnit eskortní úkoly, hlídkovat a zapojit se do menších flotilových střetů.",
    sizeCategory: "MediumShip",
    pixelSize_ApproxRange_Px: { x: 60, y: 130 },
    baseSprite_AssetPath_Template: "assets/images/ships/generic/combat_frigate/frigate_base_{variant}.png",
    baseSpriteVariantCount: 4,
    visualDesignCues: [
      "Protáhlý, vojensky vypadající trup",
      "Několik středních a malých zbraňových slotů", 
      "Viditelné štítové emitory",
      "Dostatečně silné motory pro manévrování v boji"
    ],
    baseStats: {
      hullPoints_Range: [300, 500], 
      shieldPoints_Base_Range: [250, 450], 
      armorRating_Base_Range: [40, 70],
      maxSpeed_UnitsPerSec_Range: [90, 120], 
      acceleration_UnitsPerSec2_Range: [30, 45], 
      turnRate_DegPerSec_Range: [70, 95],
      cargoCapacity_Units_Range: [30, 60], 
      sensorRange_Units_Range: [2500, 4000],
      powerOutput_MW_Range: [100, 150], 
      baseMass_Tonnes_Range: [200, 350], 
      crewCapacity_MinMax: [5, 15],
      fuelCapacity_Range: [120, 200],
      hardpointSlots: {
        weapon_small_Range: [2, 4], 
        weapon_medium_Range: [1, 2], 
        weapon_large_Range: [0, 1], 
        weapon_turret_Range: [0, 2],
        defense_Range: [2, 3], 
        system_Range: [1, 2], 
        utility_Range: [1, 1]
      },
      cost_Credits_ApproxRange: [120000, 250000],
      requiredTechTier_ToUnlock: 3
    },
    factionStyleOverrides: [
      {
        factionId: FactionId.KrallEmpire,
        baseColorPalette_Override: { primary: "#504040", secondary: "#703030", accent: "#FF0000" },
        hullTexture_Variant_AssetPath_Template: "assets/images/ships/krall_empire/combat_frigate/frigate_hull_rugged_{index}.png",
        uniqueVisualEffect: { 
          type: "Spark_Emissions_DamagedLook", 
          color: "#FFA500", 
          animation: { frameCount: 8, speed: 5, loop: true } 
        },
        structuralVariations_AssetPath_Prefix: "assets/images/ships/krall_empire/combat_frigate/parts_spikes_armor_",
        decal_FactionLogo_AssetPath: "assets/images/factions/logos/krall_empire_logo_small.png"
      }
    ],
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/medium_ship_combat_idle_loop.wav",
      engine_Thrust_Loop: "sfx/engines/medium_ship_combat_thrust_loop.wav",
      hyperdrive_Charge_Loop: "sfx/ship_systems/hyperdrive_charge_medium_loop.wav",
      ship_Ambient_Interior_Loop: "sfx/ambient/ship_interior_combat_bridge_loop.wav"
    }
  },

  // Combat Fighter
  {
    classId: "combat_fighter_interceptor",
    classNameKey: "shipclass.interceptor.name",
    defaultClassName: "Interceptor",
    category: "Combat_Fighter",
    roleDescriptionKey: "shipclass.interceptor.desc",
    defaultRoleDescription: "Rychlý lehký bojový stíhač určený pro průzkum, doprovod a rychlé útoky. Nedisponuje silným pancířem, spoléhá na rychlost a manévrovatelnost.",
    sizeCategory: "SmallCraft",
    pixelSize_ApproxRange_Px: { x: 40, y: 60 },
    baseSprite_AssetPath_Template: "assets/images/ships/generic/combat_fighter/interceptor_base_{variant}.png",
    baseSpriteVariantCount: 3,
    visualDesignCues: [
      "Kompaktní aerodynamický profil",
      "Tenký trup s malou čelní siluetou",
      "Vysoce výkonné motory",
      "Dvojice primárních zbraňových hardpointů"
    ],
    baseStats: {
      hullPoints_Range: [50, 100],
      shieldPoints_Base_Range: [30, 80],
      armorRating_Base_Range: [5, 15],
      maxSpeed_UnitsPerSec_Range: [150, 200],
      acceleration_UnitsPerSec2_Range: [60, 90],
      turnRate_DegPerSec_Range: [120, 180],
      cargoCapacity_Units_Range: [5, 10],
      sensorRange_Units_Range: [2000, 3000],
      powerOutput_MW_Range: [30, 50],
      baseMass_Tonnes_Range: [20, 35],
      crewCapacity_MinMax: [1, 1],
      fuelCapacity_Range: [50, 80],
      hardpointSlots: {
        weapon_small_Range: [2, 3],
        weapon_medium_Range: [0, 0],
        weapon_large_Range: [0, 0],
        defense_Range: [0, 1],
        system_Range: [1, 1],
        utility_Range: [0, 1]
      },
      cost_Credits_ApproxRange: [15000, 35000],
      requiredTechTier_ToUnlock: 1
    },
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/fighter_idle_high_pitch_loop.wav",
      engine_Thrust_Loop: "sfx/engines/fighter_thrust_high_pitch_loop.wav",
      engine_Boost_Loop: "sfx/engines/fighter_boost_high_pitch_loop.wav",
      hyperdrive_Charge_Loop: "sfx/ship_systems/hyperdrive_charge_small_loop.wav"
    }
  },

  // Transport Freighter
  {
    classId: "transport_freighter_medium",
    classNameKey: "shipclass.freighter.name",
    defaultClassName: "Nákladní transportér",
    category: "Transport_Freighter",
    roleDescriptionKey: "shipclass.freighter.desc",
    defaultRoleDescription: "Střední transportní loď určená pro převoz nákladu mezi systémy. Velkým nákladním prostorem vykupuje slabší manévrovatelnost a minimální výzbroj.",
    sizeCategory: "MediumShip",
    pixelSize_ApproxRange_Px: { x: 80, y: 160 },
    baseSprite_AssetPath_Template: "assets/images/ships/generic/transport/freighter_base_{variant}.png",
    baseSpriteVariantCount: 3,
    visualDesignCues: [
      "Robustní široký trup s velkými nákladovými sekcemi",
      "Viditelné nákladové dveře a jeřáby",
      "Méně výkonné ale spolehlivé motory",
      "Minimální bojové hardpointy spíše na obranu"
    ],
    baseStats: {
      hullPoints_Range: [200, 300],
      shieldPoints_Base_Range: [100, 150],
      armorRating_Base_Range: [20, 40],
      maxSpeed_UnitsPerSec_Range: [70, 90],
      acceleration_UnitsPerSec2_Range: [15, 25],
      turnRate_DegPerSec_Range: [40, 60],
      cargoCapacity_Units_Range: [200, 400],
      sensorRange_Units_Range: [1500, 2500],
      powerOutput_MW_Range: [70, 100],
      baseMass_Tonnes_Range: [300, 500],
      crewCapacity_MinMax: [2, 5],
      fuelCapacity_Range: [150, 250],
      hardpointSlots: {
        weapon_small_Range: [1, 2],
        weapon_medium_Range: [0, 0],
        weapon_large_Range: [0, 0],
        weapon_turret_Range: [0, 1],
        defense_Range: [1, 2],
        system_Range: [1, 2],
        utility_Range: [1, 3]
      },
      cost_Credits_ApproxRange: [50000, 120000],
      requiredTechTier_ToUnlock: 1
    },
    soundProfile: {
      engine_Idle_Loop: "sfx/engines/freighter_idle_deep_loop.wav",
      engine_Thrust_Loop: "sfx/engines/freighter_thrust_deep_loop.wav",
      hyperdrive_Charge_Loop: "sfx/ship_systems/hyperdrive_charge_medium_loop.wav",
      ship_Ambient_Interior_Loop: "sfx/ambient/ship_interior_cargo_hum_loop.wav"
    }
  }
];
