
import { AlienRaceDefinition, AlienPhysiologyType, AlienCulturalEthos, AlienTechLevel, AlienGovernmentType, AlienShipDesignLanguage } from '@/types/aliens';
import { PlanetType } from '@/types/galaxy';

// Sylvans - The sentient plant species
const sylvanRace: AlienRaceDefinition = {
  raceId: "sylvans_flora_based",
  raceName: "Sylvans",
  isPlayable: false,
  visualDesign: {
    primaryPhysiology: AlienPhysiologyType.Flora_SentientPlant,
    secondaryPhysiologicalTraits: ["BarkLikeSkin_GreenBrown", "BioluminescentPollenGlow", "VineLikeTendrils_ForManipulation", "FlowerBloom_HeadCrest"],
    skinOrSurface_ColorPalette: { 
      bark: ["#556B2F", "#8FBC8F"], 
      leaves: ["#228B22", "#32CD32"], 
      flowers: ["#FF00FF", "#DA70D6", "#BA55D3"] 
    },
    eye_ColorPalette: { 
      glow: ["#FFFF00", "#ADFF2F"] 
    },
    clothing_ColorPalette: { 
      woven_vines: ["#8B4513"], 
      leaf_accents: ["#006400"] 
    },
    portraits: {
      baseSprite_AssetPath_Template: "/assets/aliens/portraits/sylvans/sylvan_elder_{variant}.png",
      variantCount_PerGenderOrRole: 4,
      dimensionsPx: {x: 128, y: 128},
      animated_Subtle: { 
        frameCount: 12, 
        speed: 0.2, 
        loop: true, 
        spritesheetUrl: "/assets/aliens/portraits/sylvans/sylvan_idle_subtle_anim.png" 
      },
      clothingStyle_KeyElements: ["WovenVines", "LivingLeafArmor", "FlowerBlossomOrnaments"]
    }
  },
  techAndStyle: {
    overallTechLevel: AlienTechLevel.Advanced_SpecializedTech,
    preferredWeaponTypes: ["BioToxin_Projectiles", "SolarEnergy_Beams", "EntanglingVine_Launchers"],
    preferredDefenseTypes: ["RegenerativeHull_BioTech", "PhotosyntheticShields"],
    shipDesignLanguage: AlienShipDesignLanguage.FloraBased_GrownShips_Photosynthetic,
    shipColorPalette_Primary: { 
      hull_bark: "#556B2F", 
      energy_glow: "#ADFF2F", 
      leaf_structures: "#2E8B57" 
    },
    shipTextureStyle_Primary: "LivingBark_PhotosyntheticLeaves",
    shipEngineExhaust_EffectKey: "engineEffect_sylvan_pollen_trail",
    uniqueShipClasses_Ids: ["sylvan_seedling_fighter", "sylvan_grovekeeper_frigate", "sylvan_ancient_treant_cruiser"],
    spaceStation_ArchitecturalStyle: "Obrovské, živé stromy alebo prepletené rastlinné štruktúry, ktoré rastú a menia sa. Bioluminiscenčné kvety slúžia ako svetlá.",
    planetaryCityscape_FromOrbit_VisualDescription: "Z orbity viditeľné ako rozsiahle, geometricky usporiadané lesy alebo obrovské kvitnúce štruktúry prepojené svetelnými vláknami mycélia. Žiadne tradičné mestské svetlá, skôr bioluminiscencia.",
    planetaryCityscape_LightColor_Night: "#ADFF2F",
    preferredPlanetTypes_ForColonization: [PlanetType.EarthLike, PlanetType.Jungle, PlanetType.GaiaWorld],
    uniqueTerraforming_Visuals: "Planéty sú transformované na bujné, lesnaté svety s obrovskými, luminiscenčnými rastlinami."
  },
  aiBehavior: {
    shipAndFleet_CombatTactics: {
      preferredEngagementRange: "Medium_Kiting",
      commonManeuvers: ["RegenerativeDefense_Withdraw", "EntangleAndOverwhelm_Swarm"],
      focusTargetPriority: ["HighestThreat", "ShipsDamagingEnvironment"]
    },
    diplomaticProfile: {
      baseEthos: AlienCulturalEthos.Pacifist_Harmonious,
      trustworthinessFactor: 0.8, 
      aggressionFactor: 0.2, 
      expansionismFactor: 0.3,
      preferredAllies_Ethos: [AlienCulturalEthos.Xenophilic_Trader],
      hatedEnemies_Ethos: [AlienCulturalEthos.Materialistic_Industrial],
      reactionToPlayer_Initial: "Neutral",
      dialogueStyle_PersonalityKey: "Wise_Ancient_SlightlyAlien"
    },
    strategicAI_FactionLevel: {
      expansionPriorities: ["Colonize_Habitable", "Research_Tech"],
      warDeclarationTriggers: ["DefenseOfNature_SeverePlanetaryDamage", "AttackOnSacredSite"],
      allianceFormationTriggers: ["SharedEthos_Strong", "MutualThreat_IndustrialExploitation"],
      economicFocus: "Research_Innovation"
    }
  },
  loreEntry_CodexKey: "alien_race.sylvans.description"
};

// Shard Collective - The crystalline silicon-based entities
const shardCollectiveRace: AlienRaceDefinition = {
  raceId: "shard_collective_crystalline",
  raceName: "Shard Collective",
  isPlayable: false,
  visualDesign: {
    primaryPhysiology: AlienPhysiologyType.Crystalline_SiliconBased,
    secondaryPhysiologicalTraits: ["GeometricBody_Faceted", "InternalLuminescence", "ResonatingCrystalStructures", "ShardClusterAppendages"],
    skinOrSurface_ColorPalette: { 
      primary: ["#5F9EA0", "#4682B4", "#1E90FF"], 
      secondary: ["#ADD8E6", "#87CEEB"], 
      accents: ["#00FFFF", "#40E0D0"] 
    },
    eye_ColorPalette: { 
      glow: ["#00FFFF", "#E0FFFF"] 
    },
    clothing_ColorPalette: { 
      mineral_alloys: ["#A9A9A9", "#C0C0C0"], 
      energy_conductors: ["#4169E1", "#0000FF"] 
    },
    portraits: {
      baseSprite_AssetPath_Template: "/assets/aliens/portraits/shard_collective/crystal_entity_{variant}.png",
      variantCount_PerGenderOrRole: 5,
      dimensionsPx: {x: 128, y: 128},
      animated_Subtle: { 
        frameCount: 8, 
        speed: 0.3, 
        loop: true, 
        spritesheetUrl: "/assets/aliens/portraits/shard_collective/crystal_pulse_anim.png" 
      },
      clothingStyle_KeyElements: ["GeometricPlatings", "EnergyConduitNetworks", "FloatingCrystalShards"]
    }
  },
  techAndStyle: {
    overallTechLevel: AlienTechLevel.Advanced_SpecializedTech,
    preferredWeaponTypes: ["EnergyBeam_Focused", "CrystalShard_Launchers", "ResonanceDisruptors"],
    preferredDefenseTypes: ["CrystallineBarrier_Regenerating", "EnergyAbsorptionField"],
    shipDesignLanguage: AlienShipDesignLanguage.Crystalline_Geometric_EnergyFocused,
    shipColorPalette_Primary: { 
      hull_crystal: "#4682B4", 
      energy_flow: "#00FFFF", 
      structural_lines: "#4169E1" 
    },
    shipTextureStyle_Primary: "Faceted_Crystalline_Geometric",
    shipEngineExhaust_EffectKey: "engineEffect_shard_energy_trail",
    uniqueShipClasses_Ids: ["shard_crystal_interceptor", "shard_resonator_frigate", "shard_geode_cruiser"],
    spaceStation_ArchitecturalStyle: "Prerastajúce kryštalické štruktúry, ktoré pripomínajú masívne, geometricky presné geódy. Vnútorné svetlo pulzuje a mení sa v komplexných vzoroch.",
    planetaryCityscape_FromOrbit_VisualDescription: "Z orbitu to vyzerá ako kryštalické výrastky na povrchu planéty, ktoré sa rozširujú v striktne geometrických vzoroch. V noci sú viditeľné ako svietiace siete energie, ktoré pulzujú a preposielajú informácie.",
    planetaryCityscape_LightColor_Night: "#00FFFF",
    preferredPlanetTypes_ForColonization: [PlanetType.Desert, PlanetType.Barren, PlanetType.Alpine],
    uniqueTerraforming_Visuals: "Planéty sú pokryté rozsiahlymi kryštalickými štruktúrami, ktoré menia ich povrch na geometricky dokonalý vzor."
  },
  aiBehavior: {
    shipAndFleet_CombatTactics: {
      preferredEngagementRange: "Long_Sniping",
      formationPreference_Fleet: "Tight_Formation",
      commonManeuvers: ["GeometricFormation_Optimize", "EnergyField_Projection"],
      focusTargetPriority: ["WeakestEnemy", "HighestThreat"]
    },
    diplomaticProfile: {
      baseEthos: AlienCulturalEthos.Collectivist_HiveMind,
      trustworthinessFactor: 0.7, 
      aggressionFactor: 0.3, 
      expansionismFactor: 0.5,
      preferredAllies_Ethos: [AlienCulturalEthos.Ancient_Enigmatic],
      hatedEnemies_Ethos: [AlienCulturalEthos.Individualistic_Anarchic],
      reactionToPlayer_Initial: "Cautious",
      dialogueStyle_PersonalityKey: "Logical_Precise_Alien"
    },
    strategicAI_FactionLevel: {
      expansionPriorities: ["Colonize_Habitable", "Secure_Resources"],
      warDeclarationTriggers: ["PatternDisruption_Intolerable", "ResourceSecurityThreat"],
      allianceFormationTriggers: ["LogicalAdvantage_Calculated", "MutualDefense_Optimal"],
      economicFocus: "Research_Innovation"
    }
  },
  loreEntry_CodexKey: "alien_race.shard_collective.description"
};

// Krall Hegemony - Insectoid warrior race
const krallHegemonyRace: AlienRaceDefinition = {
  raceId: "krall_hegemony_insectoid",
  raceName: "Krall Hegemony",
  isPlayable: false,
  visualDesign: {
    primaryPhysiology: AlienPhysiologyType.Insectoid_Arachnid,
    secondaryPhysiologicalTraits: ["ChitinousExoskeleton", "CompoundEyes_Multiple", "MandibleParts_Imposing", "MultipleArmedAppendages"],
    skinOrSurface_ColorPalette: { 
      chitin: ["#8B4513", "#A52A2A", "#800000"], 
      carapace: ["#2F4F4F", "#556B2F"], 
      markings: ["#DC143C", "#B22222"] 
    },
    eye_ColorPalette: { 
      compound: ["#FF4500", "#FF8C00"] 
    },
    clothing_ColorPalette: { 
      battle_armor: ["#696969", "#2F4F4F"], 
      rank_insignia: ["#FFD700", "#DAA520"] 
    },
    portraits: {
      baseSprite_AssetPath_Template: "/assets/aliens/portraits/krall_hegemony/krall_warrior_{variant}.png",
      variantCount_PerGenderOrRole: 4,
      dimensionsPx: {x: 128, y: 128},
      animated_Subtle: { 
        frameCount: 10, 
        speed: 0.4, 
        loop: true, 
        spritesheetUrl: "/assets/aliens/portraits/krall_hegemony/krall_mandible_movement_anim.png" 
      },
      clothingStyle_KeyElements: ["ChitinousArmorPlates", "RankMarkings", "TrophyDecoration"]
    }
  },
  techAndStyle: {
    overallTechLevel: AlienTechLevel.Established_Interstellar,
    preferredWeaponTypes: ["AcidProjectile_Launchers", "PlasmaBeam_Cutters", "SwarmMissile_Pods"],
    preferredDefenseTypes: ["HeavyArmor_NoShields", "ChitinousPlating_Reinforced"],
    shipDesignLanguage: AlienShipDesignLanguage.Asymmetrical_Abstract_Unconventional,
    shipColorPalette_Primary: { 
      hull_chitin: "#8B4513", 
      weapon_acid: "#32CD32", 
      markings: "#B22222" 
    },
    shipTextureStyle_Primary: "Segmented_Chitin_Ribbed",
    shipEngineExhaust_EffectKey: "engineEffect_krall_acidic_trail",
    uniqueShipClasses_Ids: ["krall_hive_fighter", "krall_swarm_carrier", "krall_queen_dreadnought"],
    spaceStation_ArchitecturalStyle: "Masívne konštrukcie pripomínajúce mravenisko alebo úľ s početným nepravidelným rozložením, často s organickými prvkami.",
    planetaryCityscape_FromOrbit_VisualDescription: "Z orbity vidieť rozsiahle štruktúry podobné mraveniskám alebo termitištiam, ktoré sa rozširujú v koncentrických kruhoch alebo s nepravidelným rozložením podľa terénu.",
    planetaryCityscape_LightColor_Night: "#FF4500",
    preferredPlanetTypes_ForColonization: [PlanetType.Desert, PlanetType.AridRocky, PlanetType.Savannah],
    uniqueTerraforming_Visuals: "Planéty sú pretvorené na horúce, suché svety s obrovskými štruktúrami podobnými termitištiam a rozsiahlymi plodinami pre zásobovanie populácie."
  },
  aiBehavior: {
    shipAndFleet_CombatTactics: {
      preferredEngagementRange: "Short_Brawling",
      formationPreference_Fleet: "Loose_Swarm",
      commonManeuvers: ["OverwhelmWithNumbers", "SurroundAndEnvelop", "SacrificeForGreaterGood"],
      focusTargetPriority: ["HighestThreat", "PlayerShip_Always"]
    },
    diplomaticProfile: {
      baseEthos: AlienCulturalEthos.Militaristic_Expansionist,
      trustworthinessFactor: 0.3, 
      aggressionFactor: 0.9, 
      expansionismFactor: 0.8,
      preferredAllies_Ethos: [AlienCulturalEthos.Militaristic_Expansionist],
      hatedEnemies_Ethos: [AlienCulturalEthos.Pacifist_Harmonious],
      tradeWillingness_Factor: 0.2,
      reactionToPlayer_Initial: "Hostile",
      dialogueStyle_PersonalityKey: "Aggressive_CommandingTone"
    },
    strategicAI_FactionLevel: {
      expansionPriorities: ["Build_Military", "Colonize_Habitable"],
      warDeclarationTriggers: ["ExpansionOpportunity", "ResourceNeed_Critical", "PerceivedWeakness_Neighbor"],
      allianceFormationTriggers: ["MilitarySuperiorityAssured", "ConquestOpportunity_Shared"],
      economicFocus: "Manufacturing"
    }
  },
  loreEntry_CodexKey: "alien_race.krall_hegemony.description"
};

// Export all alien races
export const alienRaces: AlienRaceDefinition[] = [
  sylvanRace,
  shardCollectiveRace,
  krallHegemonyRace
];

// Helper function to get alien race by ID
export const getAlienRaceById = (raceId: string): AlienRaceDefinition | undefined => {
  return alienRaces.find(race => race.raceId === raceId);
};

// Function to generate alien race ships
export const getAlienShipClassIds = (raceId: string): string[] => {
  const race = getAlienRaceById(raceId);
  return race ? race.techAndStyle.uniqueShipClasses_Ids : [];
};
