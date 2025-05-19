
import { ResearchTechnologyDefinition, ResearchCategoryDefinition, ResearchPointDefinition } from "@/types/research";

export const RESEARCH_CATEGORIES: ResearchCategoryDefinition[] = [
  {
    categoryKey: "PROPULSION",
    displayNameKey: "research.category.propulsion",
    defaultDisplayName: "Pohonné Systémy",
    iconAsset: "assets/images/icons/research_categories/category_propulsion.png",
    defaultDescription: "Vylepšení pohonných systémů, motorů a hyperpohonu.",
    colorTheme: "#33C3F0"
  },
  {
    categoryKey: "WEAPONRY",
    displayNameKey: "research.category.weaponry",
    defaultDisplayName: "Zbraňové Systémy",
    iconAsset: "assets/images/icons/research_categories/category_weaponry.png",
    defaultDescription: "Energetické a balistické zbraně pro vaši loď.",
    colorTheme: "#E84855"
  },
  {
    categoryKey: "DEFENSE",
    displayNameKey: "research.category.defense",
    defaultDisplayName: "Obranné Systémy",
    iconAsset: "assets/images/icons/research_categories/category_defense.png",
    defaultDescription: "Štíty, pancéřování a protiopatření.",
    colorTheme: "#4CBB17"
  },
  {
    categoryKey: "UTILITY",
    displayNameKey: "research.category.utility",
    defaultDisplayName: "Užitkové Systémy",
    iconAsset: "assets/images/icons/research_categories/category_utility.png",
    defaultDescription: "Senzory, skanerové systémy a další užitečné moduly.",
    colorTheme: "#9B87F5"
  }
];

export const RESEARCH_POINTS: ResearchPointDefinition[] = [
  {
    id: "ResearchPoints_General",
    displayNameKey: "research.points.general",
    defaultDisplayName: "Základní Výzkumné Body",
    iconAsset: "assets/images/icons/resources/research_points_general.png",
    currentValue: 300,
    defaultGenerationInfo: "Získáváte je z průzkumu neznámých systémů a nalezišť."
  },
  {
    id: "ResearchPoints_Propulsion",
    displayNameKey: "research.points.propulsion",
    defaultDisplayName: "Body Pohonného Výzkumu",
    iconAsset: "assets/images/icons/resources/research_points_propulsion.png",
    currentValue: 150,
    defaultGenerationInfo: "Získáváte je z analýzy výkonných motorových systémů a anomálií."
  }
];

export const TECHNOLOGIES: ResearchTechnologyDefinition[] = [
  {
    techId: "propulsion.basic_thrusters",
    techNameKey: "tech.prop_basic_thrusters.name",
    defaultTechName: "Základní Trysky",
    techDescriptionKey: "tech.prop_basic_thrusters.desc",
    defaultTechDescription: "Zlepšuje základní manévrovatelnost a rychlost lodních motorů.",
    iconAsset: "assets/images/tech_icons/propulsion/engine_basic.png",
    categoryKey: "PROPULSION",
    tier: 1,
    researchCosts: [{ resourceId: "ResearchPoints_General", quantity: 50 }],
    prerequisites_TechIds: [],
    unlocks: [
      { 
        type: "StatUpgrade_Global", 
        statModification: { 
          statKey: "ship.baseThrustFactor", 
          changePercent: 0.05, 
          descriptionKey: "tech.prop_basic_thrusters.effect",
          defaultDescription: "+5% k Základnímu Tahu Motorů" 
        }, 
        descriptionKey: "tech.prop_basic_thrusters.unlock",
        defaultDescription: "Všechny lodě získají +5% k tahu." 
      }
    ],
    nodePosition_InTree: { x: 100, y: 200 }
  },
  {
    techId: "propulsion.improved_fuel_efficiency_1",
    techNameKey: "tech.prop_fuel_eff_1.name",
    defaultTechName: "Zlepšená Palivová Účinnost I",
    techDescriptionKey: "tech.prop_fuel_eff_1.desc",
    defaultTechDescription: "Snižuje spotřebu paliva pro hyperprostorové skoky.",
    iconAsset: "assets/images/tech_icons/propulsion/fuel_efficiency_1.png",
    categoryKey: "PROPULSION",
    tier: 2,
    researchCosts: [
      { resourceId: "ResearchPoints_General", quantity: 120 },
      { resourceId: "Titanium", quantity: 10 }
    ],
    prerequisites_TechIds: ["propulsion.basic_thrusters"],
    unlocks: [
      { 
        type: "StatUpgrade_Global", 
        statModification: { 
          statKey: "ship.hyperdriveFuelConsumptionModifier", 
          changePercent: -0.1, 
          descriptionKey: "tech.prop_fuel_eff_1.effect",
          defaultDescription: "-10% Spotřeba Paliva Hyperpohonu" 
        }, 
        descriptionKey: "tech.prop_fuel_eff_1.unlock",
        defaultDescription: "Snížení spotřeby paliva pro warp." 
      }
    ],
    nodePosition_InTree: { x: 250, y: 200 }
  },
  {
    techId: "propulsion.warp_drive_1",
    techNameKey: "tech.prop_warp_1.name",
    defaultTechName: "Warp Pohon Mk1",
    techDescriptionKey: "tech.prop_warp_1.desc",
    defaultTechDescription: "První zkonstruovaný warp pohon schopný překonat rychlost světla.",
    iconAsset: "assets/images/tech_icons/propulsion/warp_drive_1.png",
    categoryKey: "PROPULSION",
    tier: 2,
    researchCosts: [
      { resourceId: "ResearchPoints_General", quantity: 150 },
      { resourceId: "ResearchPoints_Propulsion", quantity: 75 }
    ],
    prerequisites_TechIds: ["propulsion.basic_thrusters"],
    unlocks: [
      { 
        type: "NewBlueprint_ShipModule", 
        targetId: "engine.warp_drive_mk1",
        descriptionKey: "tech.prop_warp_1.unlock",
        defaultDescription: "Umožňuje vyrábět a instalovat Warp Pohon Mk1." 
      }
    ],
    nodePosition_InTree: { x: 250, y: 100 }
  },
  {
    techId: "weaponry.basic_laser",
    techNameKey: "tech.weapon_basic_laser.name",
    defaultTechName: "Základní Laser",
    techDescriptionKey: "tech.weapon_basic_laser.desc",
    defaultTechDescription: "Základní laserová technologie pro lodní zbraňové systémy.",
    iconAsset: "assets/images/tech_icons/weapons/laser_basic.png",
    categoryKey: "WEAPONRY",
    tier: 1,
    researchCosts: [{ resourceId: "ResearchPoints_General", quantity: 50 }],
    prerequisites_TechIds: [],
    unlocks: [
      { 
        type: "NewBlueprint_ShipModule", 
        targetId: "weapon.laser_cannon_mk1",
        descriptionKey: "tech.weapon_basic_laser.unlock",
        defaultDescription: "Umožňuje vyrábět a instalovat Laserový Kanón Mk1." 
      }
    ],
    nodePosition_InTree: { x: 400, y: 200 }
  },
  {
    techId: "defense.basic_shields",
    techNameKey: "tech.defense_basic_shields.name",
    defaultTechName: "Základní Štíty",
    techDescriptionKey: "tech.defense_basic_shields.desc",
    defaultTechDescription: "Základní štítová technologie pro ochranu lodí.",
    iconAsset: "assets/images/tech_icons/defense/shield_basic.png",
    categoryKey: "DEFENSE",
    tier: 1,
    researchCosts: [{ resourceId: "ResearchPoints_General", quantity: 50 }],
    prerequisites_TechIds: [],
    unlocks: [
      { 
        type: "NewBlueprint_ShipModule", 
        targetId: "defense.shield_generator_mk1",
        descriptionKey: "tech.defense_basic_shields.unlock",
        defaultDescription: "Umožňuje vyrábět a instalovat Štítový Generátor Mk1." 
      }
    ],
    nodePosition_InTree: { x: 550, y: 200 }
  },
  {
    techId: "utility.basic_scanner",
    techNameKey: "tech.utility_basic_scanner.name",
    defaultTechName: "Základní Skener",
    techDescriptionKey: "tech.utility_basic_scanner.desc",
    defaultTechDescription: "Základní skenovací technologie pro průzkum vesmíru.",
    iconAsset: "assets/images/tech_icons/utility/scanner_basic.png",
    categoryKey: "UTILITY",
    tier: 1,
    researchCosts: [{ resourceId: "ResearchPoints_General", quantity: 50 }],
    prerequisites_TechIds: [],
    unlocks: [
      { 
        type: "NewBlueprint_ShipModule", 
        targetId: "utility.scanner_mk1",
        descriptionKey: "tech.utility_basic_scanner.unlock",
        defaultDescription: "Umožňuje vyrábět a instalovat Základní Skener." 
      }
    ],
    nodePosition_InTree: { x: 700, y: 200 }
  }
];
