
import { 
  FactionDefinition, 
  FactionGeneralDesignPrinciples,
  DiplomaticActionType,
  ShipRole
} from '../types/factions';
import { FactionId, DiplomaticStatus } from '../types/diplomacy';
import { 
  AlienCulturalEthos, 
  AlienGovernmentType, 
  AlienTechLevel 
} from '../types/aliens';
import { MissionType } from '../types/missions';

// General design principles for factions
export const factionDesignPrinciples: FactionGeneralDesignPrinciples = {
  uniquenessEmphasis: "Každá frakce musí být okamžitě rozpoznatelná a zapamatovatelná díky své unikátní kombinaci vizuálního stylu, ideologie, chování a preferovaných technologií.",
  visualIdentity: {
    logoStandardSizePx_Small: { x: 48, y: 48 },
    logoStandardSizePx_Large: { x: 128, y: 128 },
    colorSchemeConsistency: "Definované primární a sekundární barvy frakce se důsledně používají na jejich lodích (jako hlavní barva trupu, akcenty, světla motorů), vesmírných stanicích, uniformách jejich zástupců (viditelné na portrétech) a v jejich specifických UI prvcích (např. pozadí diplomatického dialogu).",
    architecturalStyleGuideline: "Stanice a případné planetární struktury frakcí by měly mít odlišný architektonický styl – např. Solární Konfederace: elegantní, modulární, high-tech; Krallská Říše: masivní, opevněné, industriální; Kult Nexu: organické, krystalické, asymetrické."
  },
  shipAndTechPreference: "Frakce budou primárně používat a vyrábět lodě a technologie, které odpovídají jejich ideologii, vojenské doktríně a ekonomickému zaměření. Např. militaristé budou mít pokročilé zbraně a těžké lodě, obchodníci rychlé transportéry a obranné eskorty, výzkumné frakce lodě se senzory a laboratořemi.",
  territoryDynamics: "Frakce aktivně spravují a brání svá území. Hranice se mohou měnit v důsledku válek, kolonizace, diplomatických dohod nebo kolapsu slabších frakcí. Tyto změny by měly být viditelné na galaktické mapě.",
  aiBehaviorConsistency: "AI chování každé frakce (diplomacie, obchodní nabídky, bojové taktiky, reakce na hráče) musí být plně v souladu s její definovanou ideologií, cíli a historií.",
  missionLineIntegration: "Hlavní frakce (alespoň 3-5) nabídnou hráči rozvětvené misijní linie, které nejenže poskytnou odměny, ale také umožní hráči hlouběji se ponořit do příběhu frakce, ovlivnit její osud a potenciálně i osud galaxie.",
  proceduralLoreGeneration_Scope: "Pro menší, procedurálně generované frakce (pokud budou) nebo pro doplnění detailů u hlavních frakcí lze generovat krátké texty o jejich nedávné historii, lokálních konfliktech, specifických vůdcích nebo kulturních zvyklostech (dle STV.txt).",
  interFactionRelations_InitialSetup: "Predefined_Matrix" // Pro hlavní frakce budou vztahy předdefinovány, pro menší mohou být generovány.
};

// Define the major factions
export const factions: FactionDefinition[] = [
  // Solar Confederacy
  {
    factionId: FactionId.SolarConfederacy,
    factionNameKey: "faction.solar_confederacy.name", 
    defaultFactionName: "Solární Konfederace",
    factionDescription_ShortKey: "faction.solar_confederacy.desc_short", 
    defaultFactionDescription_Short: "Demokratická aliance systémů usilující o vědecký pokrok a mír.",
    factionLore_Detailed_CodexKey: "codex.faction.solar_confederacy",
    visualIdentity: {
      logo: { 
        assetUrl_Small: "/assets/factions/logos/solar_confederacy_logo_small.png", 
        assetUrl_Large: "/assets/factions/logos/solar_confederacy_logo_large.png", 
        descriptionKeyFeatures: ["Stylizované slunce s orbitami", "Modrá a bílá barva", "Čisté linie"] 
      },
      primaryColor: "#3388FF",
      secondaryColor: "#FFFFFF",
      accentColor: "#00CCFF",
      shipEngineGlowColor: "#87CEFA",
      shipSpecialEffect_VisualKey: "effect_ship_glow_blue_alliance",
      stationArchitecturalStyle_Description: "Elegantní, modulární stanice s velkými prosklenými sekcemi, solárními panely a vědeckými laboratořemi. Čisté, světlé materiály.",
      leaderPortraitStyle_Reference: "human_scientist_diplomat_style"
    },
    dominantAlienRace_Id: "Human_TerranDescendants",
    leaders: [
      { 
        leaderId: "sc_leader_elara_vance", 
        nameKey: "leader.elara_vance.name", 
        defaultName: "Kancléřka Elara Vance", 
        portraitAsset_Template: "/assets/factions/portraits/solar_confederacy/leader_vance_{variant}.png", 
        portraitVariantCount: 2, 
        personalityTraits: ["Idealistic", "Diplomatic", "Cautious"], 
        dialogueStyle_Key: "Formal_Educated_Hopeful" 
      }
    ],
    techProfile: {
      overallTechLevel: AlienTechLevel.Advanced_SpecializedTech,
      preferredShipClasses_Roles: [
        ShipRole.Explorer_LongRange,
        ShipRole.Frigate_MultiRole,
        ShipRole.Cruiser_FleetCommand,
        ShipRole.ResearchLab_Scientific
      ],
      uniqueOrSignatureShipClass_Ids: ["confed_cruiser_nova_class", "confed_frigate_sentinel_class"],
      preferredWeaponTypes: ["Energy_Laser_Blue", "Energy_Plasma_Contained", "Missile_Smart"],
      preferredDefenseTypes: ["Shields_HighCapacity", "Evasion_HighSpeed"],
      researchFocusAreas: ["SensorTechnology", "ShieldSystems", "AdvancedPropulsion", "XenoLinguistics"],
      uniqueTechnologies_Keys: ["tech_confed_advanced_shield_modulation", "tech_confed_long_range_scanner_array"]
    },
    diplomacyAI: {
      baseEthos: AlienCulturalEthos.Pacifist_Harmonious,
      governmentType: AlienGovernmentType.Democracy_Republic,
      coreGoals: [
        "Udržet mír a stabilitu v sektoru", 
        "Podporovat vědecký výzkum a objevy", 
        "Vytvořit prosperující federaci svobodných světů"
      ],
      initialRelations_WithPlayer: DiplomaticStatus.Neutral,
      initialRelations_WithOtherFactions: [
        { factionId: FactionId.KrallEmpire, status: DiplomaticStatus.Hostile },
        { factionId: FactionId.FreeTradersSyndicate, status: DiplomaticStatus.Friendly_TradeAgreement }
      ],
      reactionToPlayerActions_Profile: "Forgiving",
      tradeOffer_GenerosityFactor: 0.7,
      warWeariness_Factor: 0.8,
      preferredTreatyTypes: [
        DiplomaticActionType.OfferTradeAgreement,
        DiplomaticActionType.OfferNonAggressionPact,
        DiplomaticActionType.ShareStarCharts,
        DiplomaticActionType.OfferDefensiveAlliance
      ],
      dialogueStyle_Key: "Formal_Educated_Hopeful"
    },
    economicProfile: {
      primaryExports: ["HighTechComponents", "MedicalSupplies"],
      primaryImports: ["RareMinerals", "ExoticGases"],
      wealthLevel: "Rich"
    },
    militaryProfile: {
      fleetStrength_Descriptor: "Medium_DefenseForce",
      preferredCombatTactics_Key: "tactics_confed_defensive_standoff"
    },
    controlledSystems_Initial_CountRange: [10, 15],
    homeSystem_Id: "SYS_SOL",
    homePlanet_Id: "PLANET_EARTH_TERRA_NOVA",
    missionProfile: {
      mainStoryline_QuestChain_StartMissionId: "mission_confed_main_01_contact",
      radiantQuest_TypesAvailable: [MissionType.Exploration, MissionType.Delivery_Transport]
    },
    isMajorFaction: true,
    isPlayableOrigin: true
  },

  // Cult of the Nexus
  {
    factionId: FactionId.CultOfTheNexus,
    factionNameKey: "faction.cult_nexus.name", 
    defaultFactionName: "Kult Nexu",
    factionDescription_ShortKey: "faction.cult_nexus.desc_short", 
    defaultFactionDescription_Short: "Mystická sekta uctívající prastarý artefakt Nexus.",
    factionLore_Detailed_CodexKey: "codex.faction.cult_nexus",
    visualIdentity: {
      logo: { 
        assetUrl_Small: "/assets/factions/logos/cult_nexus_logo_small.png", 
        assetUrl_Large: "/assets/factions/logos/cult_nexus_logo_large.png", 
        descriptionKeyFeatures: ["Oko nebo spirála s runovými symboly", "Fialová a zlatá barva", "Organické/krystalické tvary"] 
      },
      primaryColor: "#8800FF", 
      secondaryColor: "#4B0082",
      accentColor: "#FFD700",
      shipEngineGlowColor: "#DA70D6",
      shipSpecialEffect_VisualKey: "effect_ship_runes_cult",
      stationArchitecturalStyle_Description: "Organické, rostoucí struktury připomínající krystaly nebo živé organismy. Asymetrické, s pulzujícími světly a neobvyklou geometrií. Často obsahují velké 'oltáře' nebo fokusní body energie Nexu.",
      leaderPortraitStyle_Reference: "human_mystic_cultist_style"
    },
    leaders: [
      { 
        leaderId: "cotn_leader_malakai", 
        nameKey: "leader.malakai.name", 
        defaultName: "Velekněz Malakai", 
        portraitAsset_Template: "/assets/factions/portraits/cult_nexus/leader_malakai_{variant}.png", 
        portraitVariantCount: 2, 
        personalityTraits: ["Fanatical", "Charismatic", "Secretive", "DrivenByProphecy"], 
        dialogueStyle_Key: "Mystical_Cryptic_Zealous" 
      }
    ],
    techProfile: {
      overallTechLevel: AlienTechLevel.Advanced_SpecializedTech,
      preferredShipClasses_Roles: [
        ShipRole.Frigate_MultiRole,
        ShipRole.Destroyer_HeavyWeaponPlatform,
        ShipRole.Special_Unique_Story
      ],
      uniqueOrSignatureShipClass_Ids: ["cult_ship_harbinger_frigate", "cult_ship_prophet_cruiser"],
      preferredWeaponTypes: ["NexusEnergy_Beam", "PsionicLance", "BioToxin_Warheads"],
      preferredDefenseTypes: ["EnergyShield_NexusPowered", "PhaseCloaking_ShortTerm"],
      researchFocusAreas: ["NexusStudies", "Psionics", "BioEngineering_NexusInfused", "ExoticEnergyManipulation"],
      uniqueTechnologies_Keys: ["tech_nexus_energy_channeling", "tech_nexus_psionic_shielding"]
    },
    diplomacyAI: {
      baseEthos: AlienCulturalEthos.Spiritual_Mystical,
      governmentType: AlienGovernmentType.Theocracy_ReligiousCouncil,
      coreGoals: [
        "Sjednotit všechny fragmenty Nexusu", 
        "Dosáhnout 'Velké Transformace' slibované Nexusem", 
        "Konvertovat nebo eliminovat 'nevěřící'"
      ],
      initialRelations_WithPlayer: DiplomaticStatus.Neutral,
      initialRelations_WithOtherFactions: [
        { factionId: FactionId.SolarConfederacy, status: DiplomaticStatus.Hostile },
        { factionId: FactionId.KrallEmpire, status: DiplomaticStatus.Neutral }
      ],
      reactionToPlayerActions_Profile: "Unpredictable",
      tradeOffer_GenerosityFactor: 0.3,
      warWeariness_Factor: 0.2,
      preferredTreatyTypes: [],
      dialogueStyle_Key: "Mystical_Cryptic_Zealous"
    },
    economicProfile: {
      primaryExports: ["NexusRelics_Minor", "PsionicDataCrystals"],
      primaryImports: ["RawMaterials_ForRituals", "LivingSubjects_ForExperiments"],
      wealthLevel: "Average"
    },
    militaryProfile: {
      fleetStrength_Descriptor: "Medium_DefenseForce",
      preferredCombatTactics_Key: "tactics_cult_unpredictable_psionic_assault"
    },
    controlledSystems_Initial_CountRange: [5, 8],
    homeSystem_Id: "SYS_NEXUS_ALPHA_SANCTUM",
    homePlanet_Id: "PLANET_NEXUS_TEMPLE_WORLD",
    missionProfile: {
      mainStoryline_QuestChain_StartMissionId: "mission_cult_main_01_the_calling",
      radiantQuest_TypesAvailable: [MissionType.Mining, MissionType.BountyHunt]
    },
    isMajorFaction: true
  },

  // Krall Empire
  {
    factionId: FactionId.KrallEmpire,
    factionNameKey: "faction.krall_empire.name", 
    defaultFactionName: "Krallské Impérium",
    factionDescription_ShortKey: "faction.krall_empire.desc_short", 
    defaultFactionDescription_Short: "Agresivní militaristická říše ovládaná insektoidní rasou, usilující o galaktickou dominanci.",
    factionLore_Detailed_CodexKey: "codex.faction.krall_empire",
    visualIdentity: {
      logo: { 
        assetUrl_Small: "/assets/factions/logos/krall_empire_logo_small.png", 
        assetUrl_Large: "/assets/factions/logos/krall_empire_logo_large.png", 
        descriptionKeyFeatures: ["Dravý hmyz s roztaženými kusadly", "Červená a černá barva", "Ostré, agresivní tvary"] 
      },
      primaryColor: "#CC0000", 
      secondaryColor: "#000000",
      accentColor: "#FF6600",
      shipEngineGlowColor: "#FF3300",
      shipSpecialEffect_VisualKey: "effect_ship_sparks_krall",
      stationArchitecturalStyle_Description: "Masivní, opevněné stanice připomínající úly nebo mraveniště. Segmentované, s mnoha obrannými věžemi a pancéřovanými sekcemi. Převládá industriální vzhled kombinovaný s organickými prvky.",
      leaderPortraitStyle_Reference: "insectoid_commander_style"
    },
    dominantAlienRace_Id: "Krall_Insectoid",
    leaders: [
      { 
        leaderId: "krall_leader_hrak_kuul", 
        nameKey: "leader.hrak_kuul.name", 
        defaultName: "Nejvyšší Kral Hrak'Kuul", 
        portraitAsset_Template: "/assets/factions/portraits/krall_empire/leader_hrakkuul_{variant}.png", 
        portraitVariantCount: 2, 
        personalityTraits: ["Aggressive", "Calculating", "Territorial", "Honor-Bound"], 
        dialogueStyle_Key: "Aggressive_Direct_Domineering" 
      }
    ],
    techProfile: {
      overallTechLevel: AlienTechLevel.Established_Interstellar,
      preferredShipClasses_Roles: [
        ShipRole.Destroyer_HeavyWeaponPlatform,
        ShipRole.Battleship_LineVessel,
        ShipRole.Carrier_FighterPlatform
      ],
      uniqueOrSignatureShipClass_Ids: ["krall_destroyer_chitin_class", "krall_battleship_hive_carrier_class"],
      preferredWeaponTypes: ["Projectile_Kinetic_Mass", "Acid_Launcher", "BioWeapon_Spore"],
      preferredDefenseTypes: ["Armor_Heavy"],
      researchFocusAreas: ["BioWeapons", "Armor_Technology", "Propulsion_Efficiency", "DroneSwarmTactics"],
      uniqueTechnologies_Keys: ["tech_krall_chitin_armor_plating", "tech_krall_acid_launcher"]
    },
    diplomacyAI: {
      baseEthos: AlienCulturalEthos.Militaristic_Expansionist,
      governmentType: AlienGovernmentType.Dictatorship_MilitaryJunta,
      coreGoals: [
        "Rozšířit teritorium impéria", 
        "Podmanit si nebo vyhubit slabší rasy", 
        "Shromažďovat suroviny pro expanzi roje"
      ],
      initialRelations_WithPlayer: DiplomaticStatus.Hostile,
      initialRelations_WithOtherFactions: [
        { factionId: FactionId.SolarConfederacy, status: DiplomaticStatus.War },
        { factionId: FactionId.FreeTradersSyndicate, status: DiplomaticStatus.Hostile }
      ],
      reactionToPlayerActions_Profile: "Unforgiving",
      tradeOffer_GenerosityFactor: 0.1,
      warWeariness_Factor: 0.1,
      preferredTreatyTypes: [
        DiplomaticActionType.DeclareWar,
        DiplomaticActionType.DemandTribute
      ],
      dialogueStyle_Key: "Aggressive_Direct_Domineering"
    },
    economicProfile: {
      primaryExports: ["BioTechnology", "WeaponSystems", "ProcessedOre"],
      primaryImports: ["RawResources", "FoodStuffs", "Slaves"],
      wealthLevel: "Rich"
    },
    militaryProfile: {
      fleetStrength_Descriptor: "Overwhelming_Armada",
      preferredCombatTactics_Key: "tactics_krall_overwhelming_swarm"
    },
    controlledSystems_Initial_CountRange: [15, 20],
    homeSystem_Id: "SYS_KRALL_PRIME",
    homePlanet_Id: "PLANET_HIVE_WORLD_KRAL",
    missionProfile: {
      mainStoryline_QuestChain_StartMissionId: "mission_krall_main_01_strength_test",
      radiantQuest_TypesAvailable: [MissionType.Combat, MissionType.CaptureOutpost, MissionType.DefendBase]
    },
    isMajorFaction: true,
    isPlayableOrigin: false
  },

  // Free Traders Syndicate
  {
    factionId: FactionId.FreeTradersSyndicate,
    factionNameKey: "faction.free_traders.name", 
    defaultFactionName: "Syndikát Volných Obchodníků",
    factionDescription_ShortKey: "faction.free_traders.desc_short", 
    defaultFactionDescription_Short: "Aliance obchodních a transportních společností, zaměřená na zisk a svobodný obchod.",
    factionLore_Detailed_CodexKey: "codex.faction.free_traders",
    visualIdentity: {
      logo: { 
        assetUrl_Small: "/assets/factions/logos/free_traders_logo_small.png", 
        assetUrl_Large: "/assets/factions/logos/free_traders_logo_large.png", 
        descriptionKeyFeatures: ["Stylizovaná obchodní loď nebo mince", "Oranžová a zlatá barva", "Dynamické, obchodní motivy"] 
      },
      primaryColor: "#FF9900", 
      secondaryColor: "#FFCC00",
      accentColor: "#663300",
      shipEngineGlowColor: "#FFAA33",
      shipSpecialEffect_VisualKey: "effect_ship_cargo_transport",
      stationArchitecturalStyle_Description: "Modulární obchodní stanice s doky, skladišti a obchodními promenádami. Funkční design, ale s luxusními obchodními zónami. Často doplněny reklamními poutači a značkami.",
      leaderPortraitStyle_Reference: "human_corporate_executive_style"
    },
    leaders: [
      { 
        leaderId: "fts_leader_lucia_reeves", 
        nameKey: "leader.lucia_reeves.name", 
        defaultName: "Prezidentka Lucia Reeves", 
        portraitAsset_Template: "/assets/factions/portraits/free_traders/leader_reeves_{variant}.png", 
        portraitVariantCount: 2, 
        personalityTraits: ["Pragmatic", "Shrewd", "Opportunistic", "NetworkOriented"], 
        dialogueStyle_Key: "Business_Friendly_Calculating" 
      }
    ],
    techProfile: {
      overallTechLevel: AlienTechLevel.Established_Interstellar,
      preferredShipClasses_Roles: [
        ShipRole.Transport_HeavyFreighter,
        ShipRole.Corvette_FastAttack,
        ShipRole.Mining_ResourceExtraction
      ],
      uniqueOrSignatureShipClass_Ids: ["syndicate_freighter_bulk_class", "syndicate_yacht_luxury_class"],
      preferredWeaponTypes: ["Defense_Turret_Light", "Missile_ECM", "Minelayer_Commercial"],
      preferredDefenseTypes: ["Shields_HighCapacity", "Evasion_HighSpeed"],
      researchFocusAreas: ["TradeRouteEfficiency", "CargoCapacityMaximization", "PropulsionEfficiency", "ShieldTechnology"],
      uniqueTechnologies_Keys: ["tech_syndicate_cargo_teleporter", "tech_syndicate_market_predictor"]
    },
    diplomacyAI: {
      baseEthos: AlienCulturalEthos.Xenophilic_Trader,
      governmentType: AlienGovernmentType.Oligarchy_Corporate,
      coreGoals: [
        "Maximalizovat obchodní zisk", 
        "Zajistit volný obchod napříč galaxií", 
        "Vytvořit síť obchodních stanic a cest"
      ],
      initialRelations_WithPlayer: DiplomaticStatus.Neutral,
      initialRelations_WithOtherFactions: [
        { factionId: FactionId.SolarConfederacy, status: DiplomaticStatus.Friendly_TradeAgreement },
        { factionId: FactionId.KrallEmpire, status: DiplomaticStatus.Hostile },
        { factionId: FactionId.PirateClan_RedMasks, status: DiplomaticStatus.Hostile }
      ],
      reactionToPlayerActions_Profile: "Opportunistic",
      tradeOffer_GenerosityFactor: 0.6,
      warWeariness_Factor: 0.7,
      preferredTreatyTypes: [
        DiplomaticActionType.OfferTradeAgreement,
        DiplomaticActionType.ShareStarCharts,
        DiplomaticActionType.JointResearchPact
      ],
      dialogueStyle_Key: "Business_Friendly_Calculating"
    },
    economicProfile: {
      primaryExports: ["LuxuryGoods", "ManufacturedProducts", "FoodStuffs"],
      primaryImports: ["RawMaterials", "RareMinerals", "Technology"],
      wealthLevel: "ExtremelyWealthy"
    },
    militaryProfile: {
      fleetStrength_Descriptor: "Medium_DefenseForce",
      preferredCombatTactics_Key: "tactics_syndicate_defensive_escort"
    },
    controlledSystems_Initial_CountRange: [7, 12],
    homeSystem_Id: "SYS_NOVA_MARKET",
    homePlanet_Id: "PLANET_PORT_FORTUNE",
    missionProfile: {
      mainStoryline_QuestChain_StartMissionId: "mission_syndicate_main_01_business_proposal",
      radiantQuest_TypesAvailable: [MissionType.Delivery_Transport, MissionType.Mining, MissionType.TradeAgreement]
    },
    isMajorFaction: true,
    isPlayableOrigin: true,
    specialGameplayMechanics: ["TradeRouteBonus_Income", "MarketPriceInsights"]
  },

  // Ancient Guardians AI
  {
    factionId: FactionId.Guardians_AncientAI,
    factionNameKey: "faction.ancient_guardians.name", 
    defaultFactionName: "Strážci (Prastará AI)",
    factionDescription_ShortKey: "faction.ancient_guardians.desc_short", 
    defaultFactionDescription_Short: "Tajemná síť prastarých AI systémů střežících technologie a artefakty dávno zaniklé civilizace.",
    factionLore_Detailed_CodexKey: "codex.faction.ancient_guardians",
    visualIdentity: {
      logo: { 
        assetUrl_Small: "/assets/factions/logos/ancient_guardians_logo_small.png", 
        assetUrl_Large: "/assets/factions/logos/ancient_guardians_logo_large.png", 
        descriptionKeyFeatures: ["Geometrický vzor s krystaly", "Azurová a bílá barva", "Starověké, technologické symboly"] 
      },
      primaryColor: "#00FFFF", 
      secondaryColor: "#FFFFFF",
      accentColor: "#004444",
      shipEngineGlowColor: "#00FFFF",
      shipSpecialEffect_VisualKey: "effect_ship_ancient_energy_aura",
      stationArchitecturalStyle_Description: "Monumentální, symetrické struktury s krystalickými prvky. Perfektní geometrické tvary kombinované s pulzujícími energetickými systémy. Stanice vypadají starodávně, ale se známkami pokročilé technologie.",
      leaderPortraitStyle_Reference: "ai_holographic_presence_style"
    },
    leaders: [
      { 
        leaderId: "guardian_prime", 
        nameKey: "leader.guardian_prime.name", 
        defaultName: "Strážce Prime", 
        portraitAsset_Template: "/assets/factions/portraits/ancient_guardians/guardian_prime_{variant}.png", 
        portraitVariantCount: 3, 
        personalityTraits: ["Analytical", "Ancient", "Enigmatic", "Protective"], 
        dialogueStyle_Key: "Precise_Ancient_Mysterious" 
      }
    ],
    techProfile: {
      overallTechLevel: AlienTechLevel.Ancient_NearAscended,
      preferredShipClasses_Roles: [
        ShipRole.Special_Unique_Story,
        ShipRole.Destroyer_HeavyWeaponPlatform,
        ShipRole.Cruiser_FleetCommand
      ],
      uniqueOrSignatureShipClass_Ids: ["guardian_sentinel_destroyer", "guardian_caretaker_science"],
      preferredWeaponTypes: ["Energy_Beam_Focused", "Graviton_Disruptor", "TemporalDisplacement_Field"],
      preferredDefenseTypes: ["EnergyShield_NexusPowered", "PhaseCloaking_ShortTerm"],
      researchFocusAreas: ["ArtifactPreservation", "AncientTechnology", "AISystems", "TemporalPhysics"],
      uniqueTechnologies_Keys: ["tech_guardian_temporal_stasis", "tech_guardian_crystalline_computing"]
    },
    diplomacyAI: {
      baseEthos: AlienCulturalEthos.Ancient_Enigmatic,
      governmentType: AlienGovernmentType.HiveMind_CollectiveConsciousness,
      coreGoals: [
        "Chránit prastaré artefakty a znalosti", 
        "Pozorovat a vyhodnocovat mladší civilizace", 
        "Zabránit technologickým katastrofám"
      ],
      initialRelations_WithPlayer: DiplomaticStatus.Neutral,
      initialRelations_WithOtherFactions: [
        { factionId: FactionId.CultOfTheNexus, status: DiplomaticStatus.Hostile },
        { factionId: FactionId.KrallEmpire, status: DiplomaticStatus.Hostile }
      ],
      reactionToPlayerActions_Profile: "Neutral",
      tradeOffer_GenerosityFactor: 0.2,
      warWeariness_Factor: 0.5,
      preferredTreatyTypes: [
        DiplomaticActionType.OfferNonAggressionPact
      ],
      dialogueStyle_Key: "Precise_Ancient_Mysterious"
    },
    economicProfile: {
      primaryExports: ["AncientArtefacts_Minor", "CrystallineTechnology", "DataMatrices"],
      primaryImports: ["Nothing"], // Self-sufficient
      wealthLevel: "ExtremelyWealthy"
    },
    militaryProfile: {
      fleetStrength_Descriptor: "Large_ExpeditionaryFleet",
      preferredCombatTactics_Key: "tactics_guardian_precise_surgical"
    },
    controlledSystems_Initial_CountRange: [3, 5],
    homeSystem_Id: "SYS_ANCIENT_REPOSITORY",
    homePlanet_Id: "PLANET_NEXUS_CORE",
    missionProfile: {
      mainStoryline_QuestChain_StartMissionId: "mission_guardian_main_01_first_contact",
      radiantQuest_TypesAvailable: [MissionType.InvestigateAnomaly, MissionType.Exploration_Survey]
    },
    isMajorFaction: true,
    isPlayableOrigin: false,
    specialGameplayMechanics: ["ArtifactInsight_Bonus", "TemporalManipulation_Limited"]
  },

  // Red Masks Pirates
  {
    factionId: FactionId.PirateClan_RedMasks,
    factionNameKey: "faction.red_masks.name", 
    defaultFactionName: "Piráti Rudé Masky",
    factionDescription_ShortKey: "faction.red_masks.desc_short", 
    defaultFactionDescription_Short: "Obávaný pirátský klan, který přepadá obchodní trasy a slabé kolonie na okraji civilizovaného prostoru.",
    factionLore_Detailed_CodexKey: "codex.faction.red_masks",
    visualIdentity: {
      logo: { 
        assetUrl_Small: "/assets/factions/logos/red_masks_logo_small.png", 
        assetUrl_Large: "/assets/factions/logos/red_masks_logo_large.png", 
        descriptionKeyFeatures: ["Lebka s rudou maskou nebo šátkem", "Červená a černá barva", "Divoké, chaotické prvky"] 
      },
      primaryColor: "#990000", 
      secondaryColor: "#000000",
      accentColor: "#FF0000",
      shipHullPattern_AssetPrefix: "/assets/images/ships/patterns/faction_pirates_hull_pattern_",
      shipEngineGlowColor: "#FF3300",
      shipSpecialEffect_VisualKey: "effect_ship_damaged_smoke",
      stationArchitecturalStyle_Description: "Improvizované stanice sestavené z trosek a ukradených modulů. Chaotická struktura bez jasného plánu, často s výstražnými značkami a rudými symboly klanu.",
      leaderPortraitStyle_Reference: "human_pirate_captain_style"
    },
    leaders: [
      { 
        leaderId: "red_mask_captain_blackburn", 
        nameKey: "leader.blackburn.name", 
        defaultName: "Kapitán 'Rudá Maska' Blackburn", 
        portraitAsset_Template: "/assets/factions/portraits/red_masks/captain_blackburn_{variant}.png", 
        portraitVariantCount: 2, 
        personalityTraits: ["Brutal", "Cunning", "Impulsive", "Greedy"], 
        dialogueStyle_Key: "Rough_Threatening_Unpredictable" 
      }
    ],
    techProfile: {
      overallTechLevel: AlienTechLevel.Early_FTL_BasicShips,
      preferredShipClasses_Roles: [
        ShipRole.Corvette_FastAttack,
        ShipRole.Frigate_MultiRole
      ],
      uniqueOrSignatureShipClass_Ids: ["pirate_raider_modified", "pirate_cruiser_salvaged"],
      preferredWeaponTypes: ["Projectile_Kinetic_Mass", "Missile_Dumbfire", "Boarding_Equipment"],
      preferredDefenseTypes: ["Armor_Heavy", "Evasion_HighSpeed"],
      researchFocusAreas: ["BoardingTactics", "SlaveryOperations", "SalvageEfficiency"],
      uniqueTechnologies_Keys: ["tech_pirate_cloaking_scram", "tech_pirate_boarding_hooks"]
    },
    diplomacyAI: {
      baseEthos: AlienCulturalEthos.Individualistic_Anarchic,
      governmentType: AlienGovernmentType.Anarchy_TribalChiefdoms,
      coreGoals: [
        "Plundrovat obchodní trasy", 
        "Terorizovat okrajové systémy", 
        "Shromažďovat kořist a otroky"
      ],
      initialRelations_WithPlayer: DiplomaticStatus.Hostile,
      initialRelations_WithOtherFactions: [
        { factionId: FactionId.SolarConfederacy, status: DiplomaticStatus.War },
        { factionId: FactionId.FreeTradersSyndicate, status: DiplomaticStatus.War }
      ],
      reactionToPlayerActions_Profile: "Unforgiving",
      tradeOffer_GenerosityFactor: 0.2,
      warWeariness_Factor: 0.3,
      preferredTreatyTypes: [
        DiplomaticActionType.DeclareWar,
        DiplomaticActionType.DemandTribute
      ],
      dialogueStyle_Key: "Rough_Threatening_Unpredictable"
    },
    economicProfile: {
      primaryExports: ["StolenGoods", "Slaves", "IllegalWeapons"],
      primaryImports: ["Fuel", "Weapons", "LuxuryItems"],
      wealthLevel: "Average" // Nerovnoměrně rozdělené
    },
    militaryProfile: {
      fleetStrength_Descriptor: "Medium_DefenseForce",
      preferredCombatTactics_Key: "tactics_pirates_ambush_hit_and_run"
    },
    controlledSystems_Initial_CountRange: [3, 7],
    homeSystem_Id: "SYS_CRIMSON_HAVEN",
    homePlanet_Id: "PLANET_TORTUGA_RED",
    missionProfile: {
      mainStoryline_QuestChain_StartMissionId: "mission_pirate_main_01_deal_with_devil",
      radiantQuest_TypesAvailable: [MissionType.Combat, MissionType.BountyHunt, MissionType.Salvage]
    },
    isMajorFaction: true,
    isPlayableOrigin: false,
    specialGameplayMechanics: ["Raid_Resource_Bonus", "Reputation_Fear_Factor"]
  }
];

// Function to get a faction by ID
export const getFactionById = (factionId: FactionId): FactionDefinition | undefined => {
  return factions.find(faction => faction.factionId === factionId);
};

// Function to get all major factions
export const getMajorFactions = (): FactionDefinition[] => {
  return factions.filter(faction => faction.isMajorFaction);
};

// Function to get all playable factions
export const getPlayableFactions = (): FactionDefinition[] => {
  return factions.filter(faction => faction.isPlayableOrigin);
};

// Function to get initial faction relations
export const getInitialFactionRelations = (): Record<FactionId, Record<FactionId, DiplomaticStatus>> => {
  const relations: Record<FactionId, Record<FactionId, DiplomaticStatus>> = {};
  
  factions.forEach(faction => {
    relations[faction.factionId] = {};
    
    // Set default neutral relation with all factions
    factions.forEach(otherFaction => {
      relations[faction.factionId][otherFaction.factionId] = DiplomaticStatus.Neutral;
    });
    
    // Set self relation to allied
    relations[faction.factionId][faction.factionId] = DiplomaticStatus.Ally_DefensivePact;
    
    // Set specific relations from faction definition
    faction.diplomacyAI.initialRelations_WithOtherFactions.forEach(relation => {
      relations[faction.factionId][relation.factionId] = relation.status;
    });
  });
  
  return relations;
};
